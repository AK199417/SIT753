FROM node:18

WORKDIR /app

# ✅ Copy backend package files
COPY ./jukebox-backend/package*.json ./

# Install dependencies
RUN npm install

# ✅ Copy backend source code
COPY ./jukebox-backend .

# ✅ Copy frontend folder into the container
COPY ./jukebox-frontend ./jukebox-frontend

# Install PM2 globally
RUN npm install -g pm2

ENV STUDENT_ID=s224961108
EXPOSE 3000

CMD ["pm2-runtime", "server.js", "-i", "2"]
