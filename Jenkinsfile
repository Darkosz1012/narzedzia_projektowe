pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building image...'
        script {
          docker.build("${imageName}")
        }
      }
    }

    stage('Test') {
      agent {
        docker {
          image "${imageName}"
          args '--publish 3000:3000'
        }

      }
      post {
        always {
          junit 'junit.xml'
        }

      }
      steps {
        sh 'npm run test -- --ci --testResultsProcessor="jest-junit"'
      }
    }

    stage('Deliver') {
      agent {
        docker {
          image "${imageName}"
          args '--publish 3000:3000'
        }

      }
      steps {
        sh '''npm start > .logs 2>&1 &
'''
        sh '''cat .logs
'''
        sh 'pkill -f server.js'
      }
    }

    stage('Deploy') {
      agent any
      steps {
        echo 'Publishing created dockerimage on Dockerhub...'
        script {
          docker.withRegistry('', "${registryCredential}")
          {
            imageToDeploy = docker.image("${imageName}")
            imageToDeploy.push()
            echo 'Image pushed to your dockerhub repository'}
          }

        }
      }

      stage('Celeaning') {
        steps {
          sh 'docker image prune'
          echo 'Pruning completed'
        }
      }

    }
    environment {
      registry = 'darkosz/docker-node-np'
      registryCredential = 'dockerhub'
      imageName = "${registry}:${env.BUILD_ID}"
      HOME = '.'
      JEST_JUNIT_OUTPUT = './jest-test-results.xml'
    }
    post {
      always {
        sh "docker image rm \$(docker image ls | grep -F -e ${registry} | awk \'NR>1 {print \$3}\')"
        echo 'Finished - last build is still available in the docker:dind'
      }

    }
  }
