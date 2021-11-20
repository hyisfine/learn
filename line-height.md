**以下垂直居中的方法大家肯定都是见过的，甚至写了无数次：**

```html
<body>
    <div class="line">
		<span>垂直居中</span>
	</div>
</body>	

<style>
	.line {
		width: 200px;
  	  	height: 100px;
  	  	text-align: center;
   	 	line-height: 100px;
  	  	background-color: tomato;
	}
</style>
```

![line.png](/Users/admin/Desktop/hyis/learn/line.png)

**我在写的时候想到了这些问题**

1. 这是完美的居中吗
2. 如何实现改造代码实现完美的居中
3. 为什么这样写可以实现伪居中



显然这并不是完美的居中，通过如下动图可以看出来

那为什么看起来是居中的呢？

根据[W3C的定义](https://drafts.csswg.org/css2/#propdef-line-height)，line-height 指定元素内行框的最小高度。最小高度由baseline上方的最小高度和基线下方的最小深度组成。换句话说，就是指两行文本的baseline之间的距离，再换句话说，就是以文本baseline为分界线，上下各有一半距离。

那什么是baseline？**简单来说，baseline是小写字母x下面的一条线。**

根据vertical-align 的各个值，大家可以比对出baseline的意义。

推荐大家去看看

说个题外话，css中小写字母x是一个特殊的字符，甚至有专门以x大小为单位的单位类型ex，有兴趣的可以去了解一下。



于是根绝以文本baseline为分界线，上下各有一半距离。的理解，我们不难解释为了设置line-height===height可以实现伪垂直居中了：

此时文本上区域仅比是一个文本的高度。当整体高度大时，差距小看不出来