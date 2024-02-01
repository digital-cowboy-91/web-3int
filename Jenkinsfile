pipeline {
    agent {
        docker { 
            image 'docker-alpine:1.0.6' 
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

        DO_VPS1_GIT_PAT = credentials('DO_VPS1_GIT_PAT')
        
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
                sshagent(credentials : ['DO_VPS1_SSH']) {
                    echo 'Establish SSH connection'
                    sh 'ssh -T -o StrictHostKeyChecking=no $SSH date'
                    echo '(re)Create workdir structure'
                    sh '''
                    ssh -T $SSH << EOF
                    mkdir -p $WORKDIR
                    mkdir -p $WORKDIR/persist
                    EOF
                    '''
                    echo 'Stop existing stack'
                    sh '''
                        ssh -T $SSH << EOF
                            cd $WORKDIR

                            if [ -f "docker-compose.yml" ] \
                            && [ -f ".env" ]; then
                                docker compose down
                            fi
                        EOF
                    '''
                    echo 'Clear directory'
                    sh '''
                        ssh -T $SSH << EOF
                            cd $WORKDIR

                            find . -mindepth 1 -not -name 'persist' -not -path './persist/*' -exec rm -rf {} +
                        EOF
                    '''
                    echo 'Transfer new compose file'
                    sh 'scp ./dc.prod.yml $SSH:$WORKDIR/docker-compose.yml'
                    echo 'Generate .env file'
                    sh '''
                        ssh -T $SSH << EOF
                            cd $WORKDIR

                            // Project
                            echo PROJECT_NAME=$PROJECT_NAME >> .env
                            echo WORKDIR=$WORKDIR >> .env

                            // DO
                            echo DO_CR_IMAGE=$DO_CR_IMAGE >> .env

                            // CMS
                            echo KEY=$CMS_KEY >> .env
                            echo SECRET=$CMS_SECRET >> .env
                            echo ADMIN_EMAIL=$CMS_ADMIN_EMAIL >> .env
                            echo ADMIN_PASSWORD=$CMS_ADMIN_PASSWORD >> .env
                            echo ZEPTOMAIL_URL=$CMS_ZEPTOMAIL_URL >> .env
                            echo ZEPTOMAIL_TOKEN=$CMS_ZEPTOMAIL_TOKEN >> .env
                        EOF
                    '''
                    echo 'Download extensions'
                    sh '''
                        ssh -T $SSH << EOF
                            cd $WORKDIR

                            mkdir -p extensions && cd extensions

                            git clone https://pticon91:$DO_VPS1_GIT_PAT@github.com/pticon91/directus-extension-uniss-zeptomail.git
                            
                            cd .. && chown -R 1000:1000 extensions
                        EOF
                    '''
                    echo 'Compose stack'
                    sh '''
                        ssh -T $SSH << EOF
                            cd $WORKDIR

                            doctl auth init -t $DO_AUTH_TOKEN
                            doctl registry login --expiry-seconds 100

                            docker compose pull
                            docker compose up -d --build
                            chown -R 1000:1000 persist
                        EOF
                    '''

                }
            }
        }
    }
}
