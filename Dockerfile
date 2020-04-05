
FROM node as build
WORKDIR /app
COPY . /app/

RUN npm config set ignore-scripts true
RUN npm install --silent
RUN npm config set ignore-scripts false

RUN npm run build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d 
COPY --from=build /app/dist usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]