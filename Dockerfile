FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine

# install SSL certificates for HTTPS 
RUN apk add --no-cache ca-certificates

# Limpa e copia os arquivos do build Angular
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/personal-browser/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
