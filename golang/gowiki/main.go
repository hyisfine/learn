package main

import (
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

type Page struct {
	Title string
	Body  []byte
}

func (p *Page) getName() string {
	return p.Title + ".txt"
}

func (p *Page) save() error {
	return ioutil.WriteFile(p.getName(), p.Body, 0600)
}

func loadingPage(title string) (*Page, error) {
	b, err := ioutil.ReadFile(title + ".txt")
	if err != nil {
		return nil, err
	}
	return &Page{title, b}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	p, _ := loadingPage(r.URL.Path[len("/view/"):])
	renderTemplate(w, "v", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request) {
	p, _ := loadingPage(r.URL.Path[len("/save/"):])
	renderTemplate(w, "s", p)
}

func renderTemplate(w http.ResponseWriter, path string, p interface{}) error {
	t, err := template.ParseFiles(path + ".html")
	if err != nil {
		return err
	}
	return t.Execute(w, p)
}

func main() {
	http.HandleFunc("/view/", viewHandler)
	http.HandleFunc("/save/", saveHandler)
	http.ListenAndServe(":8080", nil)
	log.Println("listen")
}
