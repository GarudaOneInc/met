pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "garudaone/metrackv1"
        GIT_REPO = "https://github.com/GarudaOneInc/met.git"
        GIT_BRANCH = "main"
    }

    stages {
        stage('Clone Repository') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh 'git clone -b $GIT_BRANCH https://$GIT_USER:$GIT_PASS@github.com/GarudaOneInc/met.git'
                }
                dir('met') {
                    sh 'ls -la' // Verify repository contents
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('met') {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl config use-context minikube' // Adjust for your cluster
                sh 'kubectl apply -f met/deployment.yaml'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'kubectl get pods'
                sh 'kubectl get services'
            }
        }
    }
}
