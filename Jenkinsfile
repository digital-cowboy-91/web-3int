pipeline {
    agent {
        docker { 
            image 'docker-alpine:1.0.1' 
            args '-u root:root'
        }
    }
    environment {
        // PROJECT
        PROJECT_NAME = "web3int"
        
        // DO
        DO_AUTH_TOKEN = credentials('DO_AUTH_TOKEN')
        DO_CR = credentials('DO_CR')
        DO_IMAGE_NAME = '${DO_CR}/${PROJECT_NAME}'
        
        // CMS
        KEY = credentials('CMS_KEY')
        SECRET = credentials('CMS_SECRET')

        ADMIN_EMAIL = "admin@xxx.com"
        ADMIN_PASSWORD = "Init123*"

        ZEPTOMAIL_URL = credentials('CMS_ZEPTOMAIL_URL')
        ZEPTOMAIL_TOKEN = credentials('CMS_ZEPTOMAIL_TOKEN')

        // WEB
        MONGO_URL = credentials('WEB_MONGO_URL')
        RECAPTCHA_SECRET_KEY = credentials('WEB_RECAPTCHA_SECRET_KEY')
        RECAPTCHA_SITE_KEY = credentials('WEB_RECAPTCHA_SITE_KEY')
    }
    stages {
        stage('Setup environment') {
            steps {
                script {
                    echo 'Set COMMIT env variable'

                    env.COMMIT = sh(script: "echo $GIT_COMMIT | head -c7", returnStdout: true).trim()
                }
                sh '''
                    echo 'Install doctl'

                    apk add doctl
                    doctl auth init -t $DO_AUTH_TOKEN
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                    echo 'Build docker image'

                    docker build \
                        -t $DO_REG_IMAGE:$COMMIT \
                        -t $DO_REG_IMAGE:latest \
                        --build-arg MONGO_URL="$WEB_MONGO_URL" \
                        --build-arg RECAPTCHA_SECRET_KEY="$WEB_RECAPTCHA_SECRET_KEY" \
                        --build-arg RECAPTCHA_SITE_KEY="$WEB_RECAPTCHA_SITE_KEY" \
                        .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                    echo 'Push image to DOCR'

                    doctl registry login --expiry-seconds 300
                    docker push $DO_REG_IMAGE:$COMMIT
                    docker push $DO_REG_IMAGE:latest
                '''
            }
        }
        // stage('Deploy') {
        //     steps {
        //         sh '''
        //             echo $CMS_ADMIN_EMAIL
        //             echo $CMS_ADMIN_PWD
        //         '''
        //     }
        // }
    }
}
