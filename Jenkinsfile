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
    echo '🔍 Running SonarCloud analysis (manual method)...'
    dir('jukebox-backend') {
      withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
        bat '''
          curl -Lo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-windows.zip
          powershell -Command "Expand-Archive -Path sonar-scanner.zip -DestinationPath . -Force"
          .\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner.bat -Dsonar.login=%SONAR_TOKEN%
        '''
      }
    }
  }
}
stage('Security') {
  steps {
    echo '🔐 Running security scan using npm audit...'
    dir('jukebox-backend') {
      bat 'npm audit --audit-level=low'
    }
  }
}
stage('Deploy') {
  steps {
    echo '🚀 Deploying Docker container as test environment...'
    // Remove any existing container
    bat 'docker rm -f jukebox-test || echo "No container to remove"'
    // Run the new container from the built image
    bat 'docker run -d --name jukebox-test -p 3000:3000 jukebox-app'
  }
}
  }
  
}
