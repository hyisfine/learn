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

##### 数组vs切片

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

-  `cap(slice)`，切片容量。

- `make([]type,len,cap)`，动态创建切片，返回切片实例。

-  `append(slice,...slices)`，返回一个包含原切片和新加入元素的新切片，并不会改变原切片。

    

##### Go的数组是值语义。 当一个数组变量被赋值或者被传递的时候，实际上会复制整个数组。

