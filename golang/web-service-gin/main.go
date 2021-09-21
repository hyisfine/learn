package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []Album{
	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func postAlbums(c *gin.Context) {
	na := &Album{}

	if err := c.BindJSON(na); err != nil {
		return
	}

	albums = append(albums, *na)
	c.IndentedJSON(http.StatusOK, albums)
}

func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	for _, n := range albums {
		if n.ID == id {
			c.IndentedJSON(http.StatusOK, n)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, nil)

}

func deleteAlbumByID(c *gin.Context) {
	id := c.Param("id")

	for i, n := range albums {
		if n.ID == id {
			albums = append(albums[:i], albums[(i+1):]...)
			c.IndentedJSON(http.StatusOK, albums)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, nil)

}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.POST("/albums", postAlbums)
	router.GET("/albums/:id", getAlbumByID)
	router.POST("/albums/:id", deleteAlbumByID)
	router.Run("localhost:8080")
}
