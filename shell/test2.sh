set -x -u +e
echo test source file

echo "第一个参数：${1}"

function com() {
    max=100
    min=0
    num=${1:=0}

    echo "第一个参数：${1}"

    if [[ $num =~ ^1?[0-9]+$ ]]; then
        if [[ $num -ge $min && $num -le $max ]]; then
            echo "输入的值正常"
        else
            echo "输入的值超过了范围：${min}~${max}"
        fi
    else
        echo "输入的值有误"
    fi

}

# read num && com $num

OS=$(uname -s)
echo $OS
case "$OS" in
FreeBSD)
    echo "This is FreeBSD"
    ;;
Darwin)
    echo "This is Mac OSX"
    ;;
AIX)
    echo "This is AIX"
    ;;
Minix)
    echo "This is Minix"
    ;;
Linux)
    echo "This is Linux"
    ;;
*)
    echo "Failed to identify this OS"
    ;;
esac

select brand in Samsung Sony iphone symphony Walton; do
    echo "You have chosen $brand"
    break
done

fn() {

    local foo=1
    return $foo
}

fn
# echo "foo: ${foo} || $?"

arr=(
    [2]=1
    [1]=2
    [0]=3
    [3]=4
)
arr+=(5 6 7)

echo ${arr[@]}

# declare -A colors
# colors["red"]="#ff0000"
# colors["green"]="#00ff00"
# colors["blue"]="#0000ff"
# echo ${colors[@]}

bash
