#!/usr/bin/env bash

eval `docker-machine env ezplanner-sandbox`

docker container stop ezplanner-planner-service
docker container rm ezplanner-planner-service

docker build -t ezplanner-planner-service .

docker run --name ezplanner-planner-service -l=apiRoute='/plan' -p 8000:5000 -d ezplanner-planner-service
