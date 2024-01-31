pipeline {
    agent { 
        node {
            label 'docker-agent-alpine'
            }
      }
    stages {
        stage('Build') {
            steps {
            withCredentials([
                string(credentialsId: 'CMS_ADMIN_EMAIL', variable: 'CMS_ADMIN_EMAIL'),
                string(credentialsId: 'CMS_ADMIN_PWD', variable: 'CMS_ADMIN_PWD'),
                ])
            {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
            }
            }
        }
        stage('Test') {
            steps {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
            }
        }
        stage('Deliver') {
            steps {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
            }
        }
    }
}