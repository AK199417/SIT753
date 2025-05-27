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
stage('Prepare .env') {
  steps {
    echo '📦 Copying .env file into Jenkins workspace...'
    bat 'copy /Y F:\\SIT753\\Music-Recommendation\\jukebox-backend\\.env jukebox-backend\\.env'
  }
}
stage('Deploy') {
  steps {
    echo '🚀 Deploying container with copied .env...'
    bat '''
      docker rm -f jukebox-test || echo "No container to remove"
      docker run -d --name jukebox-test -p 3000:3000 --env-file=jukebox-backend/.env jukebox-app
    '''
  }
}
  }
  
}
