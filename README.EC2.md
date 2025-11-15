history
    1  ls
    2  sudo groupadd g1met
    3  sudo useradd -m -G g1met -s /bin/bash ubuntu
    4  sudo useradd -m -G g1met -s /bin/bash docker
    5  sudo usermod -aG g1met ubuntu
    6  sudo passwd docker
    7  sudo useradd -m -G g1met -s /bin/bash jenkins
    8  sudo passwd jenkins
    9  id jenkins
   10  getent group g1met
   11  sudo apt update && sudo apt upgrade -y
   12  sudo apt install openjdk-17-jdk -y
   13  wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   14  echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
   15  sudo apt update
   16  sudo apt install jenkins -y
   17  sudo systemctl enable jenkins
   18  sudo systemctl start jenkins
   19  sudo systemctl status jenkins
   20  sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   21  sudo apt install -y docker-ce docker-ce-cli containerd.io
   22  sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
   23  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   24  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   25  sudo apt update
   26  sudo apt install -y docker-ce docker-ce-cli containerd.io
   27  sudo systemctl enable --now docker
   28  sudo usermod -aG docker $USER
   29  newgrp docker
   30  docker ps
   31  sudo visudo
   32  getent group g1met
   33  docker --version
   34  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
   35  sudo install minikube-linux-amd64 /usr/local/bin/minikube
   36  minikube version
   37  minikube start --driver=docker
   38  sudo usermod -aG docker jenkins
   39  sudo systemctl restart jenkins
   40  sudo systemctl restart docker
   41  sudo su - jenkins
   42  sudo minikube start --driver=docker
   43  minikube start --driver=none
   44  minikube start --driver=docker
   45  minikube version
   46  minikube status
   47  sudo install minikube-linux-amd64 /usr/local/bin/minikube
   48  minikube config view
   49  # Stop any existing Minikube cluster
   50  minikube delete
   51  # Start Minikube with Docker driver
   52  minikube start --driver=docker
   53  sudo cp /home/ubuntu/.kube/config /var/lib/jenkins/.kube/config
   54  sudo chown jenkins:jenkins /var/lib/jenkins/.kube/config
   55  sudo chmod -R u+rw ~/.minikube
   56  chmod +x kubectl
   57  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   58  chmod +x kubectl
   59  sudo mv kubectl /usr/local/bin/
   60  kubectl version --client
   61  sudo chmod -R u+rw ~/.minikube
   62  sudo chown -R ubuntu:root /home/ubuntu/.minikube
   63  sudo chmod -R 755 /home/ubuntu/.minikube
   64  sudo chown -R jenkins:root /home/ubuntu/.minikube
   65  kubectl get services
   66  history



   IAM User name and password
   https://059415732335.signin.aws.amazon.com/console
   eks-admin
   Gayu21k@

   installed the aws cli on mac os 
   