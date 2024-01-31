pipeline {
    agent {
        node {
            label 'docker-agent-alpine'
        }
    }
    environment {
        CMS_ADMIN_EMAIL = credentials('CMS_ADMIN_EMAIL')
        CMS_ADMIN_PWD = credentials('CMS_ADMIN_PWD')
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
        stage('Push') {
            steps {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
            }
                }
        stage('Deploy') {
            steps {
                sh '''
                    echo $CMS_ADMIN_EMAIL
                    echo $CMS_ADMIN_PWD
                '''
            }
                }
    }
}
