package main

import (
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.Handle("/", http.FileServer(http.Dir("public"))).Methods("GET")

	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(":8081")
}
