# Use the official Node.js 18 image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /backend

# copy .env file to the container
COPY .env .

# Copy the rest of the application code to the container
COPY . .

# Install project dependencies
RUN npm install

# Build the application
RUN npm run build

# Run Prisma migrations to create the database schema
RUN npm run migrate

# Start the application in production mode
CMD ["npm", "start"]