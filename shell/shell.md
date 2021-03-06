##### Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。



##### **#!** 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

```sh
#!/bin/bash
echo "Hello World !"
```

##### 运行shell 脚本的方式有三种

1. 添加解释器：#!/bin/bash
2. 文件添加.sh标志类型 : ./test.sh
3. 执行是添加解释器 ：  /bin/bash ./test



##### 定义变量

```shell
your_name="runoob.com"
```

- 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。

- 中间不能有空格，可以使用下划线 **_**。

- 不能使用标点符号。

- 不能使用bash里的关键字（可用help命令查看保留关键字）。

    

##### 原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。expr 是一款表达式计算工具，使用它能完成表达式的求值操作。



##### read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量。

```sh
#!/bin/sh
read name 
echo "$name It is a test"
```

##### 显示结果定向至文件

```sh
echo "It is a test" > myfile
```



##### 使用的是反引号 **`**,包裹命令。



##### 代码中的 **[]** 执行基本的算数运算.



##### 如果变量的值本身也是变量，可以使用`${!varname}`的语法，读取最终的值。

```sh
$ myvar=USER
$ echo ${!myvar}
ruanyf
```

##### 判断脚本参数

```sh
filename=${1:?"filename missing."}
```

##### 获取文件名

```sh
$ path=/home/cam/book/long.file.name

$ echo ${path##*/}
long.file.name
```

