pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            sh 'npm run test'
          }
        }

        stage('Deliver') {
          steps {
            sh '''npm start > .logs 2>&1 &
'''
            sh '''cat .logs
'''
            sh 'pkill -f server.js'
          }
        }

      }
    }

  }
  environment {
    HOME = '.'
  }
}