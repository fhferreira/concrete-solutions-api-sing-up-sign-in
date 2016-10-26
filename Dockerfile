FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/node-api-authenticator
WORKDIR /usr/src/node-api-authenticator

# Install app dependencies
COPY package.json /usr/src/node-api-authenticator
RUN npm install

# Bundle app source
COPY . /usr/src/node-api-authenticator

EXPOSE 3003
CMD [ "npm", "start" ]
