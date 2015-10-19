FROM golang

ADD ./server /go/src/github.com/andrewngu/sound-redux/server
WORKDIR /go/src/github.com/andrewngu/sound-redux/server
RUN go get ./...
RUN go install github.com/andrewngu/sound-redux/server

EXPOSE 8080
ENTRYPOINT /go/bin/server
