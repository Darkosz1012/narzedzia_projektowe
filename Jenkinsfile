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
      steps {
        sh 'npm run test -- --ci --testResultsProcessor="jest-junit"'
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
  environment {
    HOME = '.'
    JEST_JUNIT_OUTPUT = './jest-test-results.xml'
  }
  post {
    always {
      junit 'junit.xml'
      sh 'cat .logs'
    }

  }
}