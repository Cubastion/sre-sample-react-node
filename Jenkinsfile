def registry = "harbor.cubastion.net"
def targetImage = params.targetImage
def build_num = params.build_number
def ngBuildType = params.ngBuildType
def envparams = params.envparams
def harborCred = params.harbor_cred
def argocdServer = params.argocd_server
def argocdAppName = params.argocd_appName
def argocdJenkinsDeployRole = params.argocd_jenkinsDeployRole
pipeline {
    options {
        timeout(time: 59, unit: 'MINUTES')
    }
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    cleanWs()
                    deleteDir()
                    checkout scm
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    xnet = docker.build("${registry}/${targetImage}:${build_num}","--build-arg ngBuildType=${ngBuildType} --build-arg ngEnvVars=${envparams} .")
                }
            }
        }

        stage("Push Image") {
            steps {
                retry(count: 2) {
                    script {
                        docker.withRegistry("https://${registry}", "${harborCred}") {
                            xnet.push()
                        }
                    }
                }
            }
        }

        stage("Refresh k8s container") {
            steps {
                retry(count: 2) {
                    withCredentials([string(credentialsId: "${argocdJenkinsDeployRole}", variable: 'ARGOCD_AUTH_TOKEN')]) {
                        sh """
                            # Deploy to ArgoCD
                            ARGOCD_SERVER=${argocdServer} argocd --grpc-web app sync ${argocdAppName} --force
                            ARGOCD_SERVER=${argocdServer} argocd app actions run ${argocdAppName} restart --kind Deployment
                            ARGOCD_SERVER=${argocdServer} argocd --grpc-web app wait ${argocdAppName} --timeout 600
                        """
			}
                }
            }
        }

        stage("Cleanup") {
            steps {
                script {
                    always {
               script {
                   try {
                        sh "docker rmi ${registry}/${targetImage}:${build_num}"
			sh '''docker rmi -f $(docker images -a | grep "^<none>" | awk "{print \$3}")'''
                  } catch (Exception e) {
                    echo "Docker image doesn't exist or already deleted"
                  }
              }
               cleanWs()
               deleteDir()
           }
                }
            }
        }
    }

    post {
           always {
               script {
                   try {
                        sh "docker rmi ${registry}/${targetImage}:${build_num}"
			            sh '''docker rmi -f $(docker images -a | grep "^<none>" | awk "{print \$3}")'''
                  } catch (Exception e) {
                    echo "Docker image doesn't exist or already deleted"
                  }
              }
               cleanWs()
           }
     }
}
