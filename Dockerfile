FROM node:argon

MAINTAINER Astésio José <astesiojose@gmail.com>

# Create app directory
RUN mkdir -p /home/concrete-solutions-api-sing-up-sign-in
WORKDIR /home/concrete-solutions-api-sing-up-sign-in

# Install app dependencies
COPY package.json /home/concrete-solutions-api-sing-up-sign-in
RUN npm install

# Bundle app source
COPY . /home/concrete-solutions-api-sing-up-sign-in

EXPOSE 5000
CMD [ "npm", "start" ]
