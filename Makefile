
APP_NAME	= isaac

COMPOSE_DEV		= -f docker-compose.yml -f ./docker-compose.dev.yml
COMPOSE_SET		= -f docker-compose.yml -f ./docker-compose.setup.yml

DOCKER		= docker compose ${COMPOSE_DEV} -p ${APP_NAME}

all:		start

build:
			${DOCKER} build
certs:
			openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj '/C=CH/ST=Vaud/L=Renens/O=${APP_NAME}/OU=IT/CN=localhost' -keyout _build/nginx/certs/nginx.key -out _build/nginx/certs/nginx.crt

setup:
			${DOCKER} ${COMPOSE_SET} up -d --build

start:
			${DOCKER} up -d --build

ps:
			${DOCKER} ps -a

logs:
			${DOCKER} logs
flogs:
			${DOCKER} logs -f

logsfront:
			${DOCKER} logs front
logsbun:
			${DOCKER} logs bunjs
logsnginx:
			${DOCKER} logs nginx

flogsfront:
			${DOCKER} logs -f front
flogsbun:
			${DOCKER} logs -f bunjs
flogsnginx:
			${DOCKER} logs -f nginx

refront:
			${DOCKER} restart front
rebun:
			${DOCKER} restart bunjs
renginx:
			${DOCKER} restart nginx
run:
			${DOCKER} exec front sh
runbun:
			${DOCKER} exec bunjs sh
runnginx:
			${DOCKER} exec nginx bash
down:
			${DOCKER} down

clean:		down
			${DOCKER} down --volumes

re:			clean build start

.PHONY:		all build start ps logs flogs run api down clean re
