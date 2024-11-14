# Set the base image from Docker repository to build our app. In this case we want to use node image to run our node app
FROM node:22.11.0-alpine as base

# Then, we need to copy our package.json and .env file into the image root folder. 
COPY package.json ./

# Then, we need to install the dependencies inside the base image
RUN npm i --verbose --force

# After installing the dependencies, we need to copy the src folder from our local file into the base image
COPY src ./src

# Copy tsconfig.json to base image too
COPY tsconfig.json ./

# Then, run the build command, this will compile the ts files into javascript files
RUN npm run build

# Expose port 3000, and start the app.
EXPOSE 3000
CMD ["npm", "run", "start"]