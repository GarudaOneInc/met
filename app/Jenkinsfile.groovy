pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "garudaone/metrackv1:latest"
    }
    stages {
        stage('Checkout') {
            steps {
        script {
            checkout([
                $class: 'GitSCM',
                branches: [[name: '*/main']],
                userRemoteConfigs: [[
                    url: 'https://github.com/GarudaOneInc/met.git',
                    credentialsId: '5c1281dd-7ff6-4a6d-acf8-84b54326b206'
                ]],
                extensions: [[$class: 'WipeWorkspace']] // Cleans workspace
            ])
        }
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
        script {
            def k8sPath = "app/k8s/deployment.yaml"  // Correct path
            sh "ls -l ${k8sPath}"  // Debugging step to confirm file exists
            if (fileExists(k8sPath)) {
                sh "kubectl apply -f ${k8sPath}"
            } else {
                error "File ${k8sPath} not found in workspace!"
            }
        }
    }
}
    }
}
