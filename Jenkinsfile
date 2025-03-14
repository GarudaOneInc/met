pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "garudaone/metrackv1"
        GIT_REPO = "https://github.com/GarudaOneInc/met.git"
        GIT_BRANCH = "main"
        REPO_DIR = "met"
    }

    stages {
        stage('Update Repository') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    script {
                        if (fileExists("${REPO_DIR}/.git")) {
                            // If repo exists, reset and pull latest changes
                            sh """
                                cd ${REPO_DIR}
                                git reset --hard
                                git pull https://$GIT_USER:$GIT_PASS@github.com/GarudaOneInc/met.git $GIT_BRANCH
                            """
                        } else {
                            // Clone only if repo doesn't exist
                            sh "git clone -b $GIT_BRANCH https://$GIT_USER:$GIT_PASS@github.com/GarudaOneInc/met.git ${REPO_DIR}"
                        }
                    }
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
                
                sh '''
                    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                    chmod +x kubectl
                    kubectl version --client

                    kubectl config view
                    kubectl apply -f met/deployment.yaml
                '''
                
            }
        }

        stage('Verify Deployment') {
            steps {
                
                sh '''
                    export KUBECONFIG=$KUBECONFIG_FILE
                    kubectl get pods
                    kubectl get services
                '''
            }
        }
    }
}
