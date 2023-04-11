FROM node:16.13.0 as build
ARG ENV
COPY package.json /app
#RUN npm install -g yarn
WORKDIR /opt/ng
COPY package.json  ./
RUN npm install --legacy-peer-deps
COPY . ./

RUN npm run build:$ENV

FROM nginx:alpine
COPY ngnix.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/ng/dist /usr/share/nginx/html
