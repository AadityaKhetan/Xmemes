#!/bin/bash

sudo apt-get update -y

sudo apt-get upgrade -y

sudo apt-get install openjdk-8-jdk -y

sudo apt-get install maven -y

sudo apt install mysql-server -y

sudo apt-get install zip unzip -y

sudo curl -s https://get.sdkman.io | bash

source "/home/ubuntu/.sdkman/bin/sdkman-init.sh"

sdk install springboot