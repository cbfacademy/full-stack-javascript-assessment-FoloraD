FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env.local .env.local 
COPY .env.prod .env.prod
#specify environment during build (defualt to development)
ARG NODE_ENV=development
#copy the appropriate env file based on the build argument
COPY .env.${NODE_ENV} .env
COPY . .
#Build frontend
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# switch to production
# docker build --build-arg NODE_ENV=production -t <image name>