#!/usr/bin/env bash

eval `docker-machine env ezplanner-sandbox`

docker container stop ezplanner-planner-service
docker rm -f ezplanner-planner-service

docker rmi ezplanner-planner-service

docker image prune

docker volume prune

docker build -t ezplanner-planner-service .

docker run --name ezplanner-planner-service -l=apiRoute='/plan' -p 5000:5000 -d ezplanner-planner-service
