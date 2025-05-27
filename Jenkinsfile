pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo 'Building Docker image...'
        script {
          sh 'docker build -t jukebox-app .'
        }
      }
    }
  }
}
