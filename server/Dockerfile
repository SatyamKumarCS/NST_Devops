# Node image
FROM node:24-slim
WORKDIR /app
# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
# Install openssl
RUN apt-get update && apt-get install -y openssl
# Install production dependencies
COPY server/package*.json ./
RUN npm ci --omit=dev
# Generate prisma client
COPY server/prisma ./prisma/
COPY server/prisma.config.ts ./
RUN npm run db:generate
# Copy built files
COPY --chown=appuser:appgroup server/ .
# Change user
USER appuser
# Start the app
CMD ["npm", "run", "start"]

