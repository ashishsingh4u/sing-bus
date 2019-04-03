#!/usr/bin/env bash
# sh ./kubernetes-deploy.sh [RUN|DELETE]
mode=$1
if [[ "${mode}" == "RUN" ]]; then
    kubectl apply -f singbus-deployment.yaml --record
    kubectl port-forward svc/hello-nginx-svc 8080:8080
elif [[ "${mode}" == "DELETE" ]]; then
    kubectl delete deploy/hello-nginx svc/hello-nginx-svc
else
    echo "Only RUN & DELETE modes are supported"
fi
