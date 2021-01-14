pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            sh 'npm run test'
          }
        }

        stage('Deliver') {
          steps {
            sh '''npm start
'''
          }
        }

      }
    }

  }
}