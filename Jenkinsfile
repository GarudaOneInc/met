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
                    sh "minikube start --driver=docker --listen-address=0.0.0.0"
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl config get-contexts"
                    sh "kubectl config use-context minikube"
                    sh "kubectl get nodes -o wide"
                    sh "kubectl rollout status deployment metrack-app"
                    sh "kubectl get pods"
                    //sh "kubectl get pods --namespace=default"
                    // sh "kubectl expose deployment metrack-app --type=NodePort --port=30080 --target-port=3000"
                    sh "kubectl port-forward service/metrack-service 30080:3000 &"
                    sh "kubectl get services"
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
