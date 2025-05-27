pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building Docker image...'
        bat 'docker build -t jukebox-app .'
      }
    }
  }
}
