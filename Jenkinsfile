pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "garudaone/metrackv1:latest"
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/GarudaOneInc/met.git',
                            credentialsId: 'garudaonemetapp_github' // Use new PAT credentials ID
                        ]],
                        extensions: [[$class: 'WipeWorkspace']]
                    ])
                }

                echo "Git - Success"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker --version"
                sh "docker build -t ${DOCKER_IMAGE} ."
                echo "Docker Socket - Success"

            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'garudaonemetapp_dockerhub', url: '']) {
                    sh "docker push ${DOCKER_IMAGE}"
                }
                
                echo "DockerHub - Success"

            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "minikube delete"
                    sh "minikube start --driver=docker"
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl get nodes -o wide"
                    sh "kubectl get pods"
                    sh "kubectl get services"
                    sh "kubectl port-forward service/metrack-service 3000:300080"
                }

                echo "Kubernetes - Success"
            }
        }
    }
    
    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed. Check Logs!"
        }
    }
}
