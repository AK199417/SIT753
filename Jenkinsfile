pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo '🛠️ Building Docker image from jukebox-backend/Dockerfile...'
        bat 'docker build -t jukebox-app -f jukebox-backend/Dockerfile .'
      }
    }

    stage('Test') {
      steps {
        echo '🧪 Running backend tests...'
        dir('jukebox-backend') {
          bat 'npm install'
          bat 'npm test'
        }
      }
    }
    stage('Code Quality') {
        steps {
            echo '🔍 Running SonarCloud analysis...'
            withSonarQubeEnv('SonarCloud') { // Replace with your configured server name if different
      dir('jukebox-backend') {
        bat 'sonar-scanner'
            }
         }
     }
    }
  }
}
