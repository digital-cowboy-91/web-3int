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

        _COMMIT = "${sh(script: "echo $GIT_COMMIT | head -c7", returnStdout: true).trim()}"
        _WORKDIR = "/services/${PROJECT_NAME}"
        _SSH = "${DO_VPS1_USER}@${DO_VPS1_HOST}"

        // Digital Ocean
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
        CMS_DOCKER_URL = credentials('CMS_DOCKER_URL')
        CMS_DOMAIN = credentials('CMS_DOMAIN')
        CMS_PUBLIC_URL =  "https://${CMS_DOMAIN}"

        CMS_KEY = credentials('CMS_KEY')
        CMS_SECRET = credentials('CMS_SECRET')

        CMS_DRAFT_TOKEN = credentials('CMS_DRAFT_TOKEN')

        CMS_ADMIN_EMAIL = credentials('CMS_ADMIN_EMAIL')
        CMS_ADMIN_PASSWORD = credentials('CMS_ADMIN_PASSWORD')

        // WEB
        WEB_DOCKER_URL = credentials('WEB_DOCKER_URL')
        WEB_DOMAIN = credentials('WEB_DOMAIN')
        WEB_PUBLIC_URL = "https://${WEB_DOMAIN}"

        // Services
        RECAPTCHA_SECRET_KEY = credentials('RECAPTCHA_SECRET_KEY')
        RECAPTCHA_SITE_KEY = credentials('RECAPTCHA_SITE_KEY')

        STRIPE_PUBLIC_KEY = credentials('STRIPE_PUBLIC_KEY')
        STRIPE_SECRET_KEY = credentials('STRIPE_SECRET_KEY')

        ZEPTOMAIL_URL = credentials('ZEPTOMAIL_URL')
        ZEPTOMAIL_SECRET_KEY = credentials('ZEPTOMAIL_SECRET_KEY')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Build docker image'
                sh '''
                    docker build \
                        -t $DO_CR_IMAGE:$_COMMIT \
                        -t $DO_CR_IMAGE:latest \
                        --build-arg CMS_DOCKER_URL="https//$CMS_DOMAIN" \
                        --build-arg WEB_DOCKER_URL="$WEB_DOCKER_URL" \
                        --build-arg RECAPTCHA_SECRET_KEY="$RECAPTCHA_SECRET_KEY" \
                        --build-arg RECAPTCHA_SITE_KEY="$RECAPTCHA_SITE_KEY" \
                        --build-arg STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
                        --build-arg ZEPTOMAIL_SECRET_KEY="$ZEPTOMAIL_SECRET_KEY" \
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
                    docker push $DO_CR_IMAGE:$_COMMIT
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
                            $_SSH true
'''
                    sh ''' # (re)Create workdir structure
                        ssh -S ctrl-socket -T $_SSH <<-EOF
                            mkdir -p $_WORKDIR
                            mkdir -p $_WORKDIR/persist
EOF
'''
                    sh ''' # Stop existing stack
                        ssh -S ctrl-socket -T $_SSH <<-EOF
                            cd $_WORKDIR

                            if [ -f "docker-compose.yml" ] \
                            && [ -f ".env" ]; then
                                docker compose down
                            fi
EOF
'''
                    sh ''' # Clear directory
                        ssh -S ctrl-socket -T $_SSH <<-EOF
                            cd $_WORKDIR

                            find . -mindepth 1 -not -name 'persist' -not -path './persist/*' -exec rm -rf {} +

EOF
'''
                    sh ''' # Transfer compose file
                        scp -o ControlPath=ctrl-socket ./dc.prod.yml $_SSH:$_WORKDIR/docker-compose.yml
'''
                    sh ''' # Generate and transfer .env file
                        cat <<-EOF > .temp.env
# Project
PROJECT_NAME=$PROJECT_NAME
WORKDIR=$_WORKDIR
PROJECT_KEY=$GIT_COMMIT

# DO
DO_CR_IMAGE=$DO_CR_IMAGE

DO_SPACES_B1_KEY=$DO_SPACES_B1_KEY
DO_SPACES_B1_SECRET=$DO_SPACES_B1_SECRET
DO_SPACES_B1_ENDPOINT=$DO_SPACES_B1_ENDPOINT/$PROJECT_NAME
DO_SPACES_B1_BUCKET=$DO_SPACES_B1_BUCKET
DO_SPACES_B1_REGION=$DO_SPACES_B1_REGION

# CMS
CMS_DOMAIN=$CMS_DOMAIN
CMS_DRAFT_TOKEN=$CMS_DRAFT_TOKEN

CMS_KEY=$CMS_KEY
CMS_SECRET=$CMS_SECRET

CMS_ADMIN_EMAIL=$CMS_ADMIN_EMAIL
CMS_ADMIN_PASSWORD=$CMS_ADMIN_PASSWORD

# WEB
WEB_DOCKER_URL=$WEB_DOCKER_URL
WEB_DOMAIN=$WEB_DOMAIN

# Services
STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY
ZEPTOMAIL_URL=$ZEPTOMAIL_URL

EOF

                        scp -o ControlPath=ctrl-socket ./.temp.env $_SSH:$_WORKDIR/.env
                        rm ./.temp.env
'''
                    sh ''' # Download extensions
                        ssh -S ctrl-socket -T $_SSH <<-EOF
                            cd $_WORKDIR

                            mkdir -p extensions && cd extensions

                            git clone https://pticon91:$DO_VPS1_GIT_PAT@github.com/pticon91/directus-extension-uniss-zeptomail.git
                            
                            cd .. && chown -R 1000:1000 extensions
EOF
'''
                    sh ''' # Compose stack
                        ssh -S ctrl-socket -T $_SSH <<-EOF
                            cd $_WORKDIR

                            doctl auth init -t $DO_AUTH_TOKEN
                            doctl registry login --expiry-seconds 100

                            docker compose pull
                            docker compose up -d --build
                            chown -R 1000:1000 persist
EOF
'''
                    sh ''' # Close master SSH connection
                        ssh -S ctrl-socket -O exit $_SSH
'''
                }
            }
        }
    }
}
