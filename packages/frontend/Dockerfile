FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#Build frontend
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# docker build -t plantain-frontend .
# docker run -p 3000:3000 plantain-frontend