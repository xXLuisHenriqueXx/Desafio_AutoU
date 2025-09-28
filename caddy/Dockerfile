FROM caddy:2.7.5-alpine

WORKDIR /etc/caddy

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
