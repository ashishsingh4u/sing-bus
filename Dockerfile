
FROM node:alpine as builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json /app/
RUN cd /app && npm set progress=false && npm install
COPY . /app
RUN cd /app && $(npm bin)/ng build

# STEP 2 build a small nginx image with static website
FROM nginx:alpine
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]