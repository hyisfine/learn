## 垂直居中方法

**以下垂直居中的方法大家肯定都是见过的：**

```html
<style>
	.box {
		width: 200px;
        height:100px;
        font-size:16px;
  	  	text-align: center;
   	 	line-height: 100px;
  	  	background-color: tomato;
	}
</style>

<body>
    <div class="box">
		<span>垂直居中</span>
	</div>
</body>	
```

![line.png](/Users/admin/Desktop/hyis/learn/line.png)



## 为什么可以实现垂直居中

要回答这个问题，我们需要要清楚以下几个问题：

1. 什么是`baseline `

2. 什么是`line box`

    

### 什么是`baseline `

简单来说，**baseline是小写字母x下面的一条线。**css中小写字母x是一个特殊的字符，有x-height的说法，甚至有[专门以x大小为单位的单位类型ex](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units#%E7%9B%B8%E5%AF%B9%E9%95%BF%E5%BA%A6%E5%8D%95%E4%BD%8D)，其他内容可以去看看[这篇文章](https://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/)。

![](/Users/admin/Desktop/hyis/learn/s.png)

- ascender height: 上下线高度

- cap height: 大写字母高度

- median: 中线

- descender height: 下行线高度

    

    ###  什么是`line box`

    根据[W3C的定义](https://drafts.csswg.org/css2/#line-box)，在行内格式化上下文中，框一个接一个地水平排列，从包含块的顶部开始。这些框之间遵循水平边距、边框和填充。这些框可以以不同的方式垂直对齐：它们的底部或顶部可以对齐，或者它们内的文本基线可以对齐。包含形成一条线的框的矩形区域称为行盒(line box)。

    **一般来说，line box就是行内元素的实际宽高。注意⚠️：当设置了line-height时，高度由line-height决定。可以通过鼠标选择文本获取line box的高度（深白色位置）。**下图中line box高度和元素高度相等。

![](/Users/admin/Desktop/hyis/learn/line-box.png)



### 现在可以来回答为什么垂直居中这个问题了：

根据  [MDN的解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 以及[W3C的定义](https://drafts.csswg.org/css2/#propdef-line-height)，**`line-height`对于块级元素，它指定元素行盒（line boxes）的最小高度。对于非[替代](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)的 inline 元素，它用于计算行盒（line box）的高度。最小高度由baseline上方的最小高度和baseline下方的最小深度组成**。换句话说，就是**指两行文本的baseline之间的距离。**借一张图来说明：

![/Users/admin/Desktop/hyis/learn/img.png](/Users/admin/Desktop/hyis/learn/img.png)

**注意⚠️：通过上图可以看出，baseline上方的最小高度和baseline下方的最小深度并不是相等的，但是line-height的值是通过文字中线上下平分的。**



因此，当我们设置line-height=100px时，此时块级元素.box的行内元素'垂直居中'的最小高度变成了100px，而line-height的值在中线上上下平分，所以产生了垂直居中:

![](/Users/admin/Desktop/hyis/learn/l100.png)

**注意⚠️：此时line box的高度并不是其内容的高度。**



### 与padding 或border一同使用时的问题

需要注意的是，line box的顶部位置是其父元素实际内容的顶部，而不是padding、border的顶部，因此，当父元素添加了上下某一边的padding或者border时，垂直居中会有偏移：

![](/Users/admin/Desktop/hyis/learn/border-box.png)

因此最好上下都设置。



当父元素同时添加了padding或者border以及box-sizing: border-box;，也会有偏移：

![](/Users/admin/Desktop/hyis/learn/box.png)

此时最好手动修改line-height为height-2*border-heght

