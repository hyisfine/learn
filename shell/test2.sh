echo test source file

getopts 'ab:c' op
echo $op
echo $OPTARG
echo $OPTIND
getopts 'ab:c' op
echo $op
echo $OPTARG
echo $OPTIND
getopts 'ab:c' op
echo $op
echo $OPTARG
echo $OPTIND

arg='-l'

ls -- $arg
