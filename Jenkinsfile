def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger',
]

pipeline {
    agent any

    tools {
        nodejs 'nodejs-20.11.0'
    }

    environment {
        REPO_URL = 'https://github.com/ExploreXperts/TripTribe-Frontend.git'
        VERCEL_TOKEN = credentials('vercel-token') // Create a Jenkins secret credential with the Vercel token
        VERCEL_PROJECT_ID = credentials('VERCEL_PROJECT_ID')
        VERCEL_ORG_ID = credentials('VERCEL_ORG_ID') // Set your Vercel organization ID
        AWS_REGION = 'ap-southeast-2'
        s3_bucket_name = 'www.trip-tribe.com-primary'
        build_folder = 'out'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository from GitHub
                git branch: 'dev', credentialsId: 'd6971c3a-d6f1-472d-93ad-128296085a8c', url: 'https://github.com/ExploreXperts/TripTribe-Frontend.git'
            }
        }

        stage('Install Dependencies') {
            
            steps {
            
                script {
                    sh 'npm -v'
                    sh 'node -v'
                    sh 'npm ci'
                    sh 'npm run lint'
                    sh 'npm run format'
                    sh 'rm -rf .env'
                    // sh 'cp .env.development .env'
                    // sh 'npm run lint'
                    // sh './node_modules/.bin/eslint --fix --debug .'
                    // sh 'npm run prettier'
                }
              
            }
        }

        // stage ('Test Source Code') {

        //     steps {
        //         script {
        //             sh 'npm run test'
        //             sh 'npm run test:coverage'
        //         }
        //     }
        // }

        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'sonarscanner'
            }
            steps {
                script {
                        withSonarQubeEnv('sonarqube') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=$JOB_NAME \
                            -Dsonar.projectName=$JOB_NAME \
                            -Dsonar.projectVersion=$BUILD_NUMBER \
                            -Dsonar.sources=src/
                        """
                        }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    // Just in case something goes wrong, pipeline will be killed after a timeout
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('Install Dependencies and Deploy') {
            steps {
                script {
                    // Install Node.js and npm (assuming Node.js tool is already configured)

                    // Install Vercel CLI
                    sh 'npm install -g vercel'

                    // Print Vercel token for debugging purposes
                    echo "Vercel Token: ${VERCEL_TOKEN}"

                    // Pull Vercel environment information
                    sh 'vercel pull --yes --environment=production --token=$VERCEL_TOKEN'

                    // Build project artifacts (if needed)
                    // sh 'npm ci'
                    sh 'vercel build --prod --token=$VERCEL_TOKEN'

                    // input(
                    // id: 'deployToProduction',
                    // message: 'Do you want to deploy to production?',
                    // ok: 'Deploy'
                    // )
                    sh 'vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN'
                }
            }
        }

        stage('Replace next.config file and rerun build') {
            steps {
                // Build the static files
                script {
                    sh 'mv -f next.config_s3.js next.config.js'
                    sh 'pwd'
                    sh 'ls -l src/pages/'
                    sh 'mv -f src/pages/index_s3.tsx src/pages/index.tsx'
                    sh 'npm run build'
                }
            }
        }

    //     stage('deploy to s3 bucket') {
    //         steps {
    //                 withCredentials([aws(accessKeyVariable:'AWS_ACCESS_KEY_ID', credentialsId:'aws-credential', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
    //                         sh "aws s3 cp ./${build_folder}/ s3://${S3_BUCKET_NAME}/ --recursive --region ${AWS_REGION}"
    //                 }
    //         }
    //     }
    // }

    // post {
    //     success {
    //             emailext subject: 'Build Successfully',
    //             body: 'The Jenkins build succeed. Please check the build logs for more information. $DEFAULT_CONTENT',
    //             recipientProviders: [
    //                 [$class: 'CulpritsRecipientProvider'],
    //                 [$class: 'DevelopersRecipientProvider'],
    //                 [$class: 'RequesterRecipientProvider']
    //             ],
    //             to: 'shirleyxie0101@gmail.com'
    //     }

    //     failure {
    //             emailext subject: 'Build Failed',
    //             body: 'The Jenkins build failed. Please check the build logs for more information. $DEFAULT_CONTENT',
    //             recipientProviders: [
    //                 [$class: 'CulpritsRecipientProvider'],
    //                 [$class: 'DevelopersRecipientProvider'],
    //                 [$class: 'RequesterRecipientProvider']
    //             ],
    //             to: 'shirleyxie0101@gmail.com'
    //     }

    //     always {
    //         echo 'Slack Notifications.'
    //         slackSend channel: '#jenkinscicd',
    //             color: COLOR_MAP[currentBuild.currentResult],
    //             message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
    //     }
    // }
}
}