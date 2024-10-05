FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod init fullcycle || true

RUN CGO_ENABLED=0 GOOS=linux go build -a -ldflags="-s -w" -o main .

FROM scratch

COPY --from=builder /app/main /main

CMD ["/main"]
