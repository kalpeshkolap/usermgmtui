FROM node:22-alpine3.18 
# set Working directory
WORKDIR /app
#copy code
COPY . .
RUN npm install -f
CMD ["npm", "start"]

# Copy code
# RUN npm run build:dev
# Run application.
# CMD ["serve", "-s", "build"]