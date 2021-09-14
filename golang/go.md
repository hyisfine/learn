##### Go 并没有提供用于删除元素的语法或接口

```golang
    seq := []string{"a", "b", "c", "d", "e", "f", "g"}
    index := 3
    seq = append(seq[:index], seq[index+1:]...)

```

