package main

import (
	"html/template"
	"net/http"
)

func authCallback(rw http.ResponseWriter, r *http.Request) error {
	t, err := template.ParseFiles("html/callback.html")
	if err != nil {
		return err
	}
	t.Execute(rw, nil)
	return nil
}
