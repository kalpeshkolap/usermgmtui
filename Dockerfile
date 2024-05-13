FROM node:18-alpine3.15 as build

# set Working directory
WORKDIR /app

# install application dependencies
RUN npm install -g serve
COPY package.json .
COPY package-lock.json .

RUN npm install

# Copy code
COPY . .
# RUN npm run build:dev

# Run application.
# CMD ["serve", "-s", "build"]
CMD ["npm", "start"]
