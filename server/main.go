package main

import (
	"fmt"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

func status(rw http.ResponseWriter, r *http.Request) {
	fmt.Fprint(rw, "{\"status\": \"ok\"}")
}

func main() {
	r := mux.NewRouter()
	r.Handle("/", http.FileServer(http.Dir("public"))).Methods("GET")
	r.HandleFunc("/api/status", status).Methods("GET")

	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(":8081")
}
