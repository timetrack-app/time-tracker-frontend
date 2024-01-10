#!/bin/sh
RES=$(curl -sX GET "https://api.color.pizza/v1/$1")
echo $RES | jq ".colors[0].name"