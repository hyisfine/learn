#!/usr/bin/bash
echo "Hello World !"

for skill in $(ls); do
    echo "I am good at ${skill}Script"
done

readonly myUrl='hyis'

ad="1234${myUrl}"
add='12345${muUrl}'
addd="
    12345${muUrl}
    12345678
"

echo $ad
echo $add
echo $addd

array_name=(
    value0
    value1
    value2
    value3
)

echo ${array_name[@]}
echo ${array_name[*]}
echo ${array_name[n]}

: <<EOF
123456
123456
123456
EOF

: <<!
123456
123456
123456
!

echo "Shell 传递参数实例！"
echo "执行的文件名：$0"
echo "第一个参数为：$1"
echo "第二个参数为：$2"

echo "参数个数：$#"
echo "所有参数：$*"
echo "所有参数：$-"

a=10
b=20

val=$(expr $a + $b)
echo "a + b : $val"

val=$(expr $a - $b)
echo "a - b : $val"

val=$(expr $a \* $b)
echo "a * b : $val"

val=$(expr $b / $a)
echo "b / a : $val"

val=$(expr $b % $a)
echo "b % a : $val"

if [ $a == $b ]; then
    echo "a 等于 b"
fi
if [ $a != $b ]; then
    echo "a 不等于 b"
fi

echo 单双引号"混"'入'
read name <myfile
echo $name

echo -e "OK! \n Fine"
# -e 开启转义

echo "It is a test" >>myfile

printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876

a=5
b=6

result=$((a + b))
# 注意等号两边不能有空格
echo "result 为： $result"

for f in 1 2 3 4; do
    ls
done

funWithParam() {
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73

for str in $(<users); do
    $str
done

. ./test2.sh

echo 123 | read name
echo name

echo "12\n121"

echo ?.txt

repeat() {
    for i in $(seq $1); do
        echo $2
    done
}

repeat 4 商凡爱我
