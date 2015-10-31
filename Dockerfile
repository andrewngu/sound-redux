FROM golang

ADD ./server /go/src/github.com/andrewngu/sound-redux/server
ADD ./server/config/index.html /go/src/github.com/andrewngu/sound-redux/server/public/index.html
WORKDIR /go/src/github.com/andrewngu/sound-redux/server
RUN go get ./...
RUN go install github.com/andrewngu/sound-redux/server

EXPOSE 8080
ENTRYPOINT /go/bin/server
