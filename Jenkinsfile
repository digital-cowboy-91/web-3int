pipeline {
    agent {
        docker { 
            image 'docker-alpine:1.0.5' 
            args '-u root:root'
        }
    }
    environment {
        // PROJECT
        PROJECT_NAME = "web3int"
        COMMIT = "${sh(script: "echo $GIT_COMMIT | head -c7", returnStdout: true).trim()}"
        WORKDIR = "/services/${PROJECT_NAME}"
        SSH = "${DO_VPS1_USER}@${DO_VPS1_HOST}"
        
        // DO
        DO_AUTH_TOKEN = credentials('DO_AUTH_TOKEN')
        DO_CR = credentials('DO_CR')
        DO_CR_IMAGE = "${DO_CR}/${PROJECT_NAME}"

        DO_VPS1_SSH = credentials('DO_VPS1_SSH')
        DO_VPS1_HOST = credentials('DO_VPS1_HOST')
        DO_VPS1_USER = credentials('DO_VPS1_USER')
        
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
        // stage('Build') {
        //     steps {
        //         echo 'Build docker image'
        //         sh '''
        //             docker build \
        //                 -t $DO_CR_IMAGE:$COMMIT \
        //                 -t $DO_CR_IMAGE:latest \
        //                 --build-arg MONGO_URL="$WEB_MONGO_URL" \
        //                 --build-arg RECAPTCHA_SECRET_KEY="$WEB_RECAPTCHA_SECRET_KEY" \
        //                 --build-arg RECAPTCHA_SITE_KEY="$WEB_RECAPTCHA_SITE_KEY" \
        //                 .
        //         '''
        //     }
        // }
        // stage('Push') {
        //     steps {
        //         echo 'Install and authenticate doctl'
        //         sh '''
        //             apk add doctl
        //             doctl auth init -t $DO_AUTH_TOKEN
        //         '''
        //         sh 'printenv'
        //         echo 'Push image to DOCR'
        //         sh '''
        //             doctl registry login --expiry-seconds 300
        //             docker push $DO_CR_IMAGE:$COMMIT
        //             docker push $DO_CR_IMAGE:latest
        //         '''
        //     }
        // }
        stage('Deploy') {
            steps {
                echo "DO_VPS1_SSH length: ${DO_VPS1_SSH.length()}"
                echo "SSH length: ${SSH.length()} (exp 18)"
                echo 'Establish SSH connection'
                sh '''
                    eval `ssh-agent`
                    ssh-add $DO_VPS1_SSH

                    mkdir -p ~/.ssh/
                    ssh-keyscan -H $DO_VPS1_HOST >> ~/.ssh/known_hosts
                    chmod -R 600 ~/.ssh

                    ssh -T $SSH 'date'
                '''
            }
        }
    }
}
