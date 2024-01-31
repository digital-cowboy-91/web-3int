pipeline {
    agent { 
        node {
            label 'docker-agent-alpine'
            withCredentials([
                string(credentialsId: 'CMS_ADMIN_EMAIL', variable: 'CMS_ADMIN_EMAIL'),
                string(credentialsId: 'CMS_ADMIN_PWD', variable: 'CMS_ADMIN_PWD'),
                ])
            }
      }
    stages {
        stage('Build') {
            steps {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
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