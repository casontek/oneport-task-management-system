# Node.js runtime as the base image
FROM node:20.10.0-alpine
WORKDIR /app
COPY package*.json ./

# Install Node.js dependencies
RUN npm install
COPY . .
EXPOSE 7000

# Command to run the application
CMD ["node", "server.js"]
