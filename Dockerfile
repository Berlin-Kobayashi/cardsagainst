FROM golang:1.10 as build

WORKDIR /go/src/github.com/DanShu93/cardsagainst

COPY . .

#RUN go get ./...
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o /app app.go

FROM alpine:3.8

RUN apk add --no-cache ca-certificates

EXPOSE 80

COPY --from=build /app /go/bin/app

ENTRYPOINT /go/bin/app
