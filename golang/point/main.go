package main

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

type V struct {
	Name string `json:"name,omitempty"`
}

type Vertex struct {
	X int
	Y int
}

type Scale interface {
	scale(int)
}

func main() {

	vv := &Vertex{1, 2}
	var vs interface{} = vv
	fmt.Println(vs)

	hosts := map[string]IPAddr{
		"loopback":  {127, 0, 0, 1},
		"googleDNS": {8, 8, 8, 8},
	}
	for name, ip := range hosts {
		fmt.Printf("%v: %v\n", name, ip)
	}
}

func (v *Vertex) scale(n int) {
	v.X = v.X * n
	v.Y = v.Y * n
}

type IPAddr [4]byte

func (ia IPAddr) String() string {
	ss := make([]string, len(ia))
	for i, v := range ia {
		ss[i] = strconv.Itoa(int(v))
	}
	time.Sleep(time.Millisecond * 2)
	return strings.Join(ss, ",")
}
