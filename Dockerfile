FROM node:alpine
WORKDIR /home/app
COPY packege*.json ./
RUN npm install
COPY ..
CMD ["npm", "run", "start"]