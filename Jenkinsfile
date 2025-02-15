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
                    sh 'cd met'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE ./met'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
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
