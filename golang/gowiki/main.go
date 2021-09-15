package main

import (
	"html/template"
	"io/ioutil"
	"net/http"
	"regexp"
)

type Page struct {
	Title string
	Body  []byte
}

var partten = regexp.MustCompile("^/(edit|save|view)/([a-zA-Z0-9]+)$")

func (p *Page) save() error {
	return ioutil.WriteFile(getName(p.Title), p.Body, 0600)
}

func getName(title string) string {
	return title + ".txt"
}

func loadPage(title string) (*Page, error) {
	b, err := ioutil.ReadFile(getName(title))
	if err != nil {
		return nil, err
	}
	return &Page{title, b}, nil
}

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := partten.FindStringSubmatch(r.URL.Path)
		if m == nil {
			http.NotFound(w, r)
			return
		}
		fn(w, r, m[2])
	}
}

func viewHandler(w http.ResponseWriter, r *http.Request, path string) {
	p, err := loadPage(path)
	if err != nil {
		http.Redirect(w, r, "/edit/"+path, http.StatusFound)
		return
	}

	t, _ := template.ParseFiles("v.html")
	t.Execute(w, p)
}

func main() {
	http.HandleFunc("/view/", makeHandler(viewHandler))
	http.ListenAndServe(":8080", nil)
}
