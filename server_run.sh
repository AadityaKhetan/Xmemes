#!/bin/bash
sudo mysql  <<MYSQL_SCRIPT
ALTER USER  'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin000';
FLUSH PRIVILEGES;
create database MemeStream;
MYSQL_SCRIPT
cd xmeme_backend/
 mvn clean package
java -jar target/xmeme_backend-0.0.1-SNAPSHOT.jar

