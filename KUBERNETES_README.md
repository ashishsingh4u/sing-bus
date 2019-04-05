# How to setup Kubernetes on macbook

## Install docker desktop on Mac

``` text
Find installer and installation procedures at:
https://docs.docker.com/docker-for-mac/install/
```

## Activate Kubernetes once docker installation is completed

``` text
Find complete steps at:
https://docs.docker.com/v17.12/docker-for-mac/
```

## Test Kubernetes installation

```bash
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.11", GitCommit:"637c7e288581ee40ab4ca210618a89a555b6e7e9", GitTreeState:"clean", BuildDate:"2018-11-26T14:38:32Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.11", GitCommit:"637c7e288581ee40ab4ca210618a89a555b6e7e9", GitTreeState:"clean", BuildDate:"2018-11-26T14:25:46Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}

$ kubectl config current-context
docker-for-desktop

$ kubectl cluster-info
Kubernetes master is running at https://localhost:6443
KubeDNS is running at https://localhost:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

$ kubectl get nodes
NAME                 STATUS    ROLES     AGE       VERSION
docker-for-desktop   Ready     master    9d        v1.10.11
```

## Install Kubernetes dashboard

```bash
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended/kubernetes-dashboard.yaml

$ kubectl get pods --namespace=kube-system
NAME                                         READY     STATUS    RESTARTS   AGE
etcd-docker-for-desktop                      1/1       Running   0          10d
kube-apiserver-docker-for-desktop            1/1       Running   0          10d
kube-controller-manager-docker-for-desktop   1/1       Running   0          10d
kube-dns-86f4d74b45-vxz65                    3/3       Running   0          10d
kube-proxy-dpkls                             1/1       Running   0          10d
kube-scheduler-docker-for-desktop            1/1       Running   0          10d
kubernetes-dashboard-669f9bbd46-jrvf4        1/1       Running   0          10m
```

## Port forwarding to access dashboard

```bash
$ kubectl port-forward kubernetes-dashboard-669f9bbd46-jrvf4 8443:8443 --namespace=kube-system
Launch dashboard at http://localhost:8443
OR
$ kubectl proxy
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/.
```

## Create admin user for dashboard

```bash
Prepare yaml configuration to create admin user:
dashboard-adminuser.yaml:
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system

$ kubectl apply -f dashboard-adminuser.yaml

$ kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

$ grep admin-user | awk '{print $1}')
Name:         admin-user-token-zxxnt
Namespace:    kube-system
Labels:       <none>
Annotations:  kubernetes.io/service-account.name=admin-user
              kubernetes.io/service-account.uid=489aa0be-5319-11e9-a1f6-025000000001

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  11 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLXp4eG50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI0ODlhYTBiZS01MzE5LTExZTktYTFmNi0wMjUwMDAwMDAwMDEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06YWRtaW4tdXNlciJ9.OBH6StxUGzCf_hgq7dIq8SbzaE8nE4fOtVCI0hGLAr51f-fsg-LkXorFPlXAE8ly_LkvRSNFYrBlgSDHEK3lfuSUF3emJKBZqGR9_Vn3xiZln7Lu5XFmO9lkzh87EYPPcYhGlLefL9nF8tN9lq39QZD9PIFH3ptlQlUxWOg9_COtFD1RNx6PifjTHHZT29E6W4BqPoxWzQN7P8tqpB6h1a3wHT5ucAUugyGXDOaWQrev_dCUDlkeXb3g9p_rQPrSxcdXJRGpbo69ojwfeEtsrZdIwkeXGKjoStXeN0PxCGk_W2JXSnHAzoPIkNrNgybA1nYNc87MV3KVms6OEv77eg

Use this token to login into Kubernetes dashboard
```

## Run sample sing-bus pod to test Kubernetes

```bash
Create and run sing-bus pod (Deployment):
$ kubectl run sing-bus --image=ashishsingh4u/sing-bus --port=80

Get pod details:
$ kubectl get pods
NAME                           READY     STATUS    RESTARTS   AGE
sing-bus-6f9f4fc7dd-2cpr9   1/1       Running   0          2m

Get pod description:
$ kubectl describe pod sing-bus-6f9f4fc7dd-2cpr9

Get deployment details:
$ kubectl get deployments
NAME          DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
sing-bus   1         1         1            1           4m

Expose deployment as service (Node Port):
$ kubectl expose deployment sing-bus --type=NodePort
OR as Container Port
$ kubectl expose deployment sing-bus --port=80

Get running service details:
$ kubectl get services
NAME          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
sing-bus   NodePort    10.103.74.58   <none>        80:32033/TCP   31s
kubernetes    ClusterIP   10.96.0.1      <none>        443/TCP        10d

Get service details:
$ kubectl describe service sing-bus

Replicate service:
$ kubectl scale --replicas=3 deployment/sing-bus

Get node details:
$ kubectl get nodes
NAME                 STATUS    ROLES     AGE       VERSION
docker-for-desktop   Ready     master    10d       v1.10.11

Get pod port details:
$ kubectl get pods -l run=sing-bus -o yaml | grep podIP

Get details for given service:
$ kubectl get svc sing-bus

Describe service:
$ kubectl describe svc sing-bus

Get endpoint details:
$ kubectl get ep sing-bus

Delete specific service:
$ kubectl delete service sing-bus

Delete specific deployment:
$ kubectl delete deployment sing-bus

Get replica-set details:
$ kubectl get rs

Get container port details:
$ kubectl get pods sing-bus-6f9f4fc7dd-cgqvs --template='{{(index (index .spec.containers 0).ports 0).containerPort}}{{"\n"}}'

Different ways to forward port:
$ kubectl port-forward sing-bus-6f9f4fc7dd-cgqvs 31952:31952
which is the same as
$ kubectl port-forward pods/sing-bus-6f9f4fc7dd-cgqvs 31952:31952
or
$ kubectl port-forward deployment/sing-bus 31952:31952
or
$ kubectl port-forward rs/sing-bus-6f9f4fc7dd 31952:31952
or
$ kubectl port-forward svc/sing-bus 31952:80

Test forwarded port:
curl localhost:3195

Create deployment with yaml configuration:
$ kubectl apply -f singbus-deployment.yaml --record
Forward port after deployment:
$ kubectl port-forward svc/sing-bus-svc 8080:8080
Delete both deployment and service once done with development:
$ kubectl delete deploy/sing-bus svc/sing-bus-svc
```

## References

```text
https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/
https://gardener.cloud/050-tutorials/content/howto/service-access/
https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/
```