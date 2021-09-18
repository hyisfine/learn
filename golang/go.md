##### Go 并没有提供用于删除元素的语法或接口

```golang
seq := []string{"a", "b", "c", "d", "e", "f", "g"}
index := 3
seq = append(seq[:index], seq[index+1:]...)

```

##### 打印结构体

```go
fmt.Printf("%+v\n", a)
```

##### 数组 vs 切片

- 数组创建之初确定长度，长度不可变：`var a [10]int`。
- 切片可动态生成：`a[low : high]`，包括第一个元素，但排除最后一个元素。
- 切片只是数组的一段应用，修改切片实际是修改元数组，同时会影响到数组的其他引用的值。
- 切片文法会创建一个底层数组，并返回引用它的切片： `[]bool{true, true, false}` 。
- nil 切片的长度和容量为 0 且没有底层数组。

##### 创建数组

```golang
b := [2]string{"Penn", "Teller"}
b := [...]string{"Penn", "Teller"}
```

##### 内置切片方法

- `len(slice)`，切片长度。

- `cap(slice)`，切片容量。

- `make([]type,len,cap)`，动态创建切片，返回切片实例。

- `append(slice,...slices)`，返回一个包含原切片和新加入元素的新切片，并不会改变原切片。

##### Go 的数组是值语义。 当一个数组变量被赋值或者被传递的时候，实际上会复制整个数组。

##### Go 函数可以是一个闭包。闭包是一个函数值，它引用了其函数体之外的变量。

##### golang 中为类型添加方法的方式，就是 js 中对象方法的变种。

##### **接口类型** 是由一组方法签名定义的集合。接口类型的变量可以保存任何实现了这些方法的值。

##### 默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步。

##### 信道可以是 _带缓冲的_。仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

##### 推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。也就是说，defter 函数的参数会在调用函数时确定，但是函数体调用会推迟。FILO 原则。

##### iota，自增常量。

##### 不要通过调用 Sprintf 的方式为类型构造一个 String 方法，这种方法会无限期地重复到你的 String 方法中。

```go
type MyString string
func (m MyString) String() string {
    // return fmt.Sprintf("MyString=%s", m) // Error: will recur forever.
    return fmt.Sprintf("MyString=%s", string(m)) // OK: note conversion.
}
```

##### 通过 type const 模拟枚举 enum

```go l
type ByteSize float64
const (
    _           = iota // 忽略初始0的值
    KB ByteSize = 1 << (10 * iota)
    MB
)
```

##### The init function，每个源文件的 init 函数都在引入时执行，且 init 函数可以不止一个。

##### import \_ "net/http/pprof" ，引入包执行 init 但是使用包的变量和方法。

##### interface 嵌入合并，此时的接口会包含嵌入的方法。

```go
type A interface {
	Name()
}
type B interface {
	Age()
}
type AB interface {
	A
	B
}

var ab AB
//ab: Name() Age()

```

##### struct 嵌入合并，此时的结构体会包含嵌入的结构体和其属性。但如果是合并指针，则只有结构体。

```go
type AA struct {
	name string
}
type BB struct {
	age int
}
type ABs struct {
	AA
	BB
}

abs:=ABs{}
//abs: name age AA{} BB{}

type ABs struct {
	*AA
	*BB
}
abs:=ABs{}
//abs:  &AA{} &BB{}

```



##### [组织你的代码结构](https://blog.go-zh.org/organizing-go-code)



##### [defer ，panic， recover](https://blog.go-zh.org/defer-panic-and-recover) 

1. 对 defer 语句求值时，对延迟函数的参数求值。其实是值复制，但是指针依旧共享。
2. 延迟的函数调用在周围函数返回后以后进先出的顺序执行。
3. 延迟函数可以读取并分配给返回函数的命名返回值。

**panic会停止程序流程，并向上层层返回，如果遇到recover，则程序恢复正常流程，在当前层级继续执行，否则退出程序。**
