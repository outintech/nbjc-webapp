# pull official base image
FROM node:13.12.0-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent

# add app
COPY . ./

ARG REACT_APP_API_DOMAIN
ENV REACT_APP_API_DOMAIN ${REACT_APP_API_DOMAIN}

ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST ${REACT_APP_API_HOST}

ARG REACT_APP_AUTH0_DOMAIN
ENV REACT_APP_AUTH0_DOMAIN ${REACT_APP_AUTH0_DOMAIN}

ARG REACT_APP_AUTH0_CLIENT_ID
ENV REACT_APP_AUTH0_CLIENT_ID ${REACT_APP_AUTH0_CLIENT_ID}

# workaround for converted crlf window repos
RUN DISABLE_ESLINT_PLUGIN=true npm run build 

# production environment with reverse proxy
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# for react-route
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
