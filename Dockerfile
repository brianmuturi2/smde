FROM node:10.13-alpine as build-step
RUN mkdir /src
WORKDIR /src
# COPY package.json ./
COPY . /src/
RUN npm install
RUN npm run build
FROM nginx:1.17.9-alpine as prod-stage
COPY --from=build-step /src/dist/ /home/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
# docker exec -it ngedmsfrontend sh
# docker exec -it nginxedmsfrontend sh
