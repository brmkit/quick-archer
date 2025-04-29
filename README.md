# quick-archer

just a simple webapp to track scores during an archery match.
I just don’t like using weird apps from the play/app store — I just want to count faster.

### docker usage
```Dockerfile
# if you use docker
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY frontend/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ =404;
    }
}
```

```bash
docker build -t quick-archer .
docker run --rm -p 8080:80 quick-archer
```

enjoy.