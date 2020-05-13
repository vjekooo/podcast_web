
FROM node as build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d 
COPY --from=build /app/dist usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]