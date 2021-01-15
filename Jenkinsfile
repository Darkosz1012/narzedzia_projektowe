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
          withEnv(["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
            sh 'npm test -- --ci --testResultsProcessor="jest-junit"'
          }
          junit 'jest-test-results.xml'
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