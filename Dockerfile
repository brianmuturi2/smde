FROM node:10.13-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.17.9-alpine
COPY /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

