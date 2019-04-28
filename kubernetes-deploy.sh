#!/usr/bin/env bash
# sh ./kubernetes-deploy.sh [RUN|DELETE]
mode=$1
if [[ "${mode}" == "RUN" ]]; then
    kubectl apply -f singbus-deployment.yaml --record
    # Port forwarding is not required as NodePort is used
    # kubectl port-forward svc/sing-bus-svc 8080:8080
elif [[ "${mode}" == "DELETE" ]]; then
    kubectl delete deploy/sing-bus svc/sing-bus-svc
else
    echo "Only RUN & DELETE modes are supported"
fi
