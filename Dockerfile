FROM node:16 AS build

WORKDIR /toyota-indonesia-fe

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use a lightweight production image
FROM nginx:alpine

# Copy the built toyota-indonesia-fe app from the previous stage to the Nginx public directory
COPY --from=build /toyota-indonesia-fe/build /usr/share/nginx/html

# Copy custom nginx.conf to the container
# when using the official Nginx images
# the default location of the configuration file is /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8081
EXPOSE 8081

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# docker build -t toyota-indonesia-fe-prod:1.0.0 .
# docker run -p 8081:8081 -d toyota-indonesia-fe-prod:1.0.0

# giving the same image a different name that match remote registry name
# docker tag toyota-indonesia-fe-prod:1.0.0 owaiskhannbs/northbaysolutions:1.0.0

# push to dockhub
# docker push owaiskhannbs/northbaysolutions:1.0.0

# Pull & Run Image
# docker pull owaiskhannbs/northbaysolutions:1.0.0
# docker run -p 8081:8081 -d owaiskhannbs/northbaysolutions:1.0.0

# ==========================
# Some common CLI that I use

# list images
# docker images

# list containers
# docker ps

# stop container
# docker stop

# remove containers
# docker rm {container_id} {container_id}

# access into container
# docker exec -it {containerID} /bin/sh