# Stage 1: Build the TypeScript code
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Copy the node_modules folder
COPY --from=builder /app/node_modules /app/node_modules

# Copy package.json (optional)
COPY package*.json ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/server.js"]
