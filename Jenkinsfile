pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building Docker image from jukebox-backend/Dockerfile...'
        bat 'docker build -t jukebox-app -f jukebox-backend/Dockerfile .'
      }
    }
  }
}
