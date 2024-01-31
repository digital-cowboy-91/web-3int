pipeline {
    agent { 
        node {
            label 'docker-agent-alpine'
            }
      }
    stages {
        stage('Build') {
            steps {
                sh 'printenv'
            }
        }
        // stage('Test') {
        //     steps {
        //         echo "Testing.."
        //         sh '''
        //         echo "doing test stuff..."
        //         '''
        //     }
        // }
        // stage('Deliver') {
        //     steps {
        //         echo 'Deliver....'
        //         sh '''
        //         echo "doing delivery stuff.."
        //         '''
        //     }
        // }
    }
}