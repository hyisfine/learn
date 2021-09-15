package main

import (
	"fmt"
)

type V struct {
	Name string `json:"name,omitempty"`
}

type Vertex struct {
	X int
	Y int
	f func()
}

func main() {
	v := &Vertex{}
	fmt.Printf("%+v\n", v)

	i := [3]int{1, 2, 3}

	i1 := i
	fmt.Println(&i == &i1)

	println(make([]int, 1, 1))

}
func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n",
		s, len(x), cap(x), x)
}
func AppendByte(slice []byte, data ...byte) []byte {
	m := len(slice)
	n := m + len(data)
	if n > cap(slice) {
		newSlice := make([]byte, (n+1)*2)
		copy(newSlice, slice)
		slice = newSlice
	}
	slice = slice[0:n]
	copy(slice[m:n], data)
	return slice
}
