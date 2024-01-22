# Use Node.js runtime base image
# Set the working directory in the container
#Copy package.json and package-lock.json to working directory in the container
#install app dependencies
#copy all files to the working directory in the container
#expose port that app runs on
#comand to run application using Node.js // npm run start:backend

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 5000
CMD ["npm", "start"]

#Build backend image: docker build -t backend-image .
# Run backend container: docker run -p 5000:5000 backend-image
# List running containers: docker ps
# Stop a running container: docker stop container-id
# docker build --build-arg NODE_ENV=prod -t <image name> .