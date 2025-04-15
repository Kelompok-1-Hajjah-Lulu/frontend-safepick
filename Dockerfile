# Stage 1: Build
FROM node:18-alpine

# Set working directory
WORKDIR /app


# Copy package files and install dependencies
COPY . .


# Installing dependencies
RUN npm install

# Build the Vite app
RUN npm run build

# Expose port 3000 for the production server
EXPOSE 3000

# Stage 2: Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]

