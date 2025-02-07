pipeline {
    agent any
    environment {
        IMAGE_NAME = "garudaone/metrackv1"
    }
    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'git-credentials', url: 'https://github.com/GarudaOneInc/met.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
}
