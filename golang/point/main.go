package main

import (
	"fmt"
	"time"
)

var c = 1

func println() {
	c++
	fmt.Println(c)
}

func main() {
	go println()
	time.Sleep(time.Second)
	println()
}
