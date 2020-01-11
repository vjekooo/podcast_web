
FROM node as build
WORKDIR /app
COPY . /app/

RUN npm config set ignore-scripts true

RUN npm install
RUN npm run build

FROM nginx
COPY /app/dist usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]