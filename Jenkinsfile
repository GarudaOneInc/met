pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "your-dockerhub-username/metrackv1"
        GIT_REPO = "https://github.com/your-repo/met.git"
        GIT_BRANCH = "main"
    }
    stages {
        stage('Clone Repo') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO}"
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'eval $(minikube docker-env)'
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        stage('Deploy to Minikube') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
            }
        }
    }
}
