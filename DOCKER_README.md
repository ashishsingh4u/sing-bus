# How to use docker for Sing-Bus

## Steps for build the image

* Use command below to build the image

        $ docker-compose -f docker-compose.yaml build

* Run the application in de-attached mode

        $ docker-compose up -d

* Stop the application

        $ docker-compose down

## Push docker image to docker hub

* Login to docker hub from command line

        $ docker login --username=yourhubusername --email=youremail@company.com
        OR
        $ docker login (Prompt for both username and password)

* Check images

        $ docker images

* Tag the image

        $ docker tag imagehashkey yourhubusername/image:tagname

* In order to push the image to docker hub, the image name should be tagged with format "yourhubusername/image". Use the command below to rename the tag if this is not the case

        $ docker tag image yourhubusername/image

* Push the image

        $ docker push yourhubusername/image

## Pull docker image from docker hub

* Pull the image by running the application directly

        $ docker run --rm -p 8787:8787 yourhubusername/image:<tagname> (This will automatically pull the image if not downloaded already)

* Pull the image

        $ docker pull yourhubusername/image:<tagname>

## How to remove docker images

* Remove dangling images, containers, volumes and networks

        $ docker system prune
        WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache
        Are you sure you want to continue? [y/N]

* Remove dangling images

        $ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

* Remove all stopped containers and unused images

        $ docker system prune -a

* Remove specific image

  * List

        $ docker images -a

  * Remove

        $ docker rmi <image name or hashkey>

* Remove containers with volume

        $ docker rm -v container_name