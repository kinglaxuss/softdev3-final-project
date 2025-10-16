# ==============================
# Stage 1: Build TypeScript
# ==============================
FROM node:20 AS builder

WORKDIR /app

# Copy package files first
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY backend/ .

# Build TypeScript project
RUN npm run build

# Debugging: check if server.js exists
RUN ls -R /app


# ==============================
# Stage 2: Run the built app
# ==============================
FROM node:20

WORKDIR /app

# Copy compiled output + package files from builder
COPY --from=builder /app /app

EXPOSE 5000

CMD ["node", "dist/server.js"]
