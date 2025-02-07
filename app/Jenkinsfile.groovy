pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "garudaone/metrackv1:latest"
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/GarudaOneInc/met.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                '''
            }
        }
    }
}
