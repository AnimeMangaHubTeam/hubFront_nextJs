FROM node:21.5-alpine

WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js
RUN npm run build

# Start Next.js in development mode based on the command from docker-compose
CMD ["npm", "run", "dev"]