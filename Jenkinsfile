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

        CMS_PUBLIC_URL="https://cms.3int.uk"
        WEB_PUBLIC_URL="https://3int.uk"
        
        // DO
        DO_AUTH_TOKEN = credentials('DO_AUTH_TOKEN')
        DO_CR = credentials('DO_CR')
        DO_CR_IMAGE = "${DO_CR}/${PROJECT_NAME}"

        DO_VPS1_SSH = credentials('DO_VPS1_SSH')
        DO_VPS1_HOST = credentials('DO_VPS1_HOST')
        DO_VPS1_USER = credentials('DO_VPS1_USER')

        DO_VPS1_GIT_PAT = credentials('DO_VPS1_GIT_PAT')

        DO_SPACES_B1_KEY = credentials('DO_SPACES_B1_KEY')
        DO_SPACES_B1_SECRET = credentials('DO_SPACES_B1_SECRET')
        DO_SPACES_B1_ENDPOINT = credentials('DO_SPACES_B1_ENDPOINT')
        DO_SPACES_B1_BUCKET = credentials('DO_SPACES_B1_BUCKET')
        DO_SPACES_B1_REGION = credentials('DO_SPACES_B1_REGION')
        
        // CMS
        CMS_DRAFT_TOKEN = credentials('CMS_DRAFT_TOKEN')

        CMS_KEY = credentials('CMS_KEY')
        CMS_SECRET = credentials('CMS_SECRET')

        CMS_ADMIN_EMAIL = "dev@uniss.uk"
        CMS_ADMIN_PASSWORD = "Init123*"

        CMS_ZEPTOMAIL_URL = credentials('CMS_ZEPTOMAIL_URL')
        CMS_ZEPTOMAIL_TOKEN = credentials('CMS_ZEPTOMAIL_TOKEN')

        // WEB
        REVOLUT_MERCHANT_HOST = credentials('REVOLUT_MERCHANT_HOST')
        REVOLUT_MERCHANT_SECRET = credentials('REVOLUT_MERCHANT_SECRET')
        
        WEB_MONGO_URL = credentials('WEB_MONGO_URL')
        WEB_RECAPTCHA_SECRET_KEY = credentials('WEB_RECAPTCHA_SECRET_KEY')
        WEB_RECAPTCHA_SITE_KEY = credentials('WEB_RECAPTCHA_SITE_KEY')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Build docker image'
                sh '''
                    docker build \
                        -t $DO_CR_IMAGE:$COMMIT \
                        -t $DO_CR_IMAGE:latest \
                        --build-arg MONGO_URL="$WEB_MONGO_URL" \
                        --build-arg RECAPTCHA_SECRET_KEY="$WEB_RECAPTCHA_SECRET_KEY" \
                        --build-arg RECAPTCHA_SITE_KEY="$WEB_RECAPTCHA_SITE_KEY" \
                        --build-arg REVOLUT_MERCHANT_HOST="$REVOLUT_MERCHANT_HOST" \
                        --build-arg REVOLUT_MERCHANT_SECRET="$REVOLUT_MERCHANT_SECRET" \
                        .
                '''
            }
        }
        stage('Push') {
            steps {
                echo 'Install and authenticate doctl'
                sh '''
                    apk add doctl
                    doctl auth init -t $DO_AUTH_TOKEN
                '''
                sh 'printenv'
                echo 'Push image to DOCR'
                sh '''
                    doctl registry login --expiry-seconds 300
                    docker push $DO_CR_IMAGE:$COMMIT
                    docker push $DO_CR_IMAGE:latest
                '''
            }
        }
        stage('Deploy') {
            steps {
                sshagent(credentials : ['DO_VPS1_SSH']) {
                    sh ''' # Create master SSH connection
                        ssh \
                            -o ControlMaster=auto \
                            -o ControlPersist=10 \
                            -o ControlPath=ctrl-socket \
                            -o StrictHostKeyChecking=no \
                            $SSH true
'''
                    sh ''' # (re)Create workdir structure
                        ssh -S ctrl-socket -T $SSH <<-EOF
                            mkdir -p $WORKDIR
                            mkdir -p $WORKDIR/persist
EOF
'''
                    sh ''' # Stop existing stack
                        ssh -S ctrl-socket -T $SSH <<-EOF
                            cd $WORKDIR

                            if [ -f "docker-compose.yml" ] \
                            && [ -f ".env" ]; then
                                docker compose down
                            fi
EOF
'''
                    sh ''' # Clear directory
                        ssh -S ctrl-socket -T $SSH <<-EOF
                            cd $WORKDIR

                            find . -mindepth 1 -not -name 'persist' -not -path './persist/*' -exec rm -rf {} +

EOF
'''
                    sh ''' # Transfer compose file
                        scp -o ControlPath=ctrl-socket ./dc.prod.yml $SSH:$WORKDIR/docker-compose.yml
'''
                    sh ''' # Generate and transfer .env file
                        cat <<-EOF > .temp.env
                            # Project
                            PROJECT_NAME=$PROJECT_NAME
                            WORKDIR=$WORKDIR
                            PROJECT_KEY=$GIT_COMMIT

                            # DO
                            DO_CR_IMAGE=$DO_CR_IMAGE
                            
                            DO_SPACES_B1_KEY=$DO_SPACES_B1_KEY
                            DO_SPACES_B1_SECRET=$DO_SPACES_B1_SECRET
                            DO_SPACES_B1_ENDPOINT=$DO_SPACES_B1_ENDPOINT/$PROJECT_NAME
                            DO_SPACES_B1_BUCKET=$DO_SPACES_B1_BUCKET
                            DO_SPACES_B1_REGION=$DO_SPACES_B1_REGION

                            # CMS
                            CMS_PUBLIC_URL=$CMS_PUBLIC_URL
                            CMS_DRAFT_TOKEN=$CMS_DRAFT_TOKEN

                            KEY=$CMS_KEY
                            SECRET=$CMS_SECRET

                            ADMIN_EMAIL=$CMS_ADMIN_EMAIL
                            ADMIN_PASSWORD=$CMS_ADMIN_PASSWORD

                            ZEPTOMAIL_URL=$CMS_ZEPTOMAIL_URL
                            ZEPTOMAIL_TOKEN=$CMS_ZEPTOMAIL_TOKEN

                            CMS_FRAME_SRC=$WEB_PUBLIC_URL

                            # WEB
                            WEB_PUBLIC_URL=$WEB_PUBLIC_URL

                            # REVOLUT
                            REVOLUT_MERCHANT_HOST=$REVOLUT_MERCHANT_HOST
                            REVOLUT_MERCHANT_SECRET=$REVOLUT_MERCHANT_SECRET
                            REVOLUT_MERCHANT_MODE=prod
EOF

                        scp -o ControlPath=ctrl-socket ./.temp.env $SSH:$WORKDIR/.env
                        rm ./.temp.env
'''
                    sh ''' # Download extensions
                        ssh -S ctrl-socket -T $SSH <<-EOF
                            cd $WORKDIR

                            mkdir -p extensions && cd extensions

                            git clone https://pticon91:$DO_VPS1_GIT_PAT@github.com/pticon91/directus-extension-uniss-zeptomail.git
                            
                            cd .. && chown -R 1000:1000 extensions
EOF
'''
                    sh ''' # Compose stack
                        ssh -S ctrl-socket -T $SSH <<-EOF
                            cd $WORKDIR

                            doctl auth init -t $DO_AUTH_TOKEN
                            doctl registry login --expiry-seconds 100

                            docker compose pull
                            docker compose up -d --build
                            chown -R 1000:1000 persist
EOF
'''
                    sh ''' # Close master SSH connection
                        ssh -S ctrl-socket -O exit $SSH
'''
                }
            }
        }
    }
}
