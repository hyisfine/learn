package main

import (
	"fmt"
)

type AP struct {
	Name string `myTag:name`
	Age  int
}

func main() {
	fmt.Println("f func")
	f()
	fmt.Println("over")
}

func f() {
	i := 1
	// ip := &i
	defer func(i int) {
		fmt.Println(i)
		if r := recover(); r != nil {
			fmt.Println("recover for:", r)
		}
	}(i)
	i = 2
	fmt.Println("g func ")
	g(0)
	fmt.Println("f footer")
}

func g(i int) {
	if i > 3 {
		fmt.Println("panic !!!!")
		panic("panic arguments")
	}
	defer fmt.Println("g int : ", i)
	fmt.Println("g int : ", i)
	g(i + 1)
	fmt.Println("g footer")

}
