#

up:
	sudo docker-compose up -d

down:
	sudo docker-compose down -v

restart:
	sudo docker-compose down -v
	sudo docker-compose up -d

build:
	sudo docker-compose build

re-build-server:
	sudo docker-compose down -v
	sudo docker rmi hub/server:latest
	sudo docker-compose build

re-build-client:
	sudo docker-compose down -v
	sudo docker rmi hub/client:latest
	sudo docker-compose build

clean-db:
	sudo rm -rf data-node

logs-server:
	sudo docker logs server

logs-client:
	sudo docker logs client
