FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG NODE_ENV=local
#copy the appropriate env file based on the build argument
COPY .env.${NODE_ENV}.frontend .env
COPY . .
#Build frontend
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# switch to production
# docker build --build-arg NODE_ENV=prod -t <image name> .