1. 层叠上下文是对元素的三维虚拟结构，通过z-index设置z轴上的层叠顺序，也就是控制谁出现在用户的眼睛最前面。一般来说 元素是平铺在一起的，当产生了元素的堆叠，此时我们需要描述元素在z轴上的关系，这种关系就是层叠上下文。层叠等级，描述的是在一个层叠上下文内，他的元素在z轴上的顺序。产生层叠上下文的方法：position不为static,且absolute、relative z-inde不为auto，根元素。flex、grid子元素z-index不为auto。opacity、filter、transform、mask，使用css3gpu加速的。
2. 重排和重绘。关键渲染路径上，分为dom解析，cssom解析，render树，layout，paint。layout 决定元素的宽高、位置。paint渲染像素。重排指浏览器由于元素的大小位置发生了变化，重新计算元素的大小位置的过程。重绘指元素的样式发生变化，导致浏览器重新绘制的过程。由于在关键渲染路径中 重排在重绘前面。所以重排会导致重绘。调用某些获取元素大小位置的API会导致重拍。将复杂的变化用于脱离了文档流的绝对定位元素或者fixed中，使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是过多使用会占大量内存。
3. bfc是CSS渲染的规则之一，是一个独立的渲染区域。决定了子元素如何布局，以及和其他元素之间的关系和作用。常用来解决兄弟元素、父子元素之间的margin合并问题、浮动元素的高度塌陷问题。规则：block垂直排放，bfc不会与浮动元素重叠，计算高度是浮动元素也包含在内。产生：根元素：float、overflow、absolute、fixed、flow- root、flexgrid子元素、inline-block。
4. display。外部显示类型，inline- block。内部flex、grid、table、flow- root。list item。某种布局的子元素，table-cel。控制显示的none。两者结合的inline- block，inline- flex。
5. line-height。font-size不是文字真的大小，又向上和向下延伸的地方，一般，衍生出来的才是文字的真正内容区域，line-height在平均添加在上下，拉高了文本所在的line-box的高度。
6. position。static trbl 无效，relative 有效，保留位置，未脱离文档流。absolute，脱离文档流，根据最近的非static的祖先元素进行定位。fixed脱离文档流，创建新的层叠上下文，如果祖先元素有transform 、filter ，则会根据祖先元素定位。sticky，没有脱离文档流，但是创建了新的层叠上下文，将会固定在最近的祖先元素的overflow为非visible上。
7. 选择器权重：通用、元素伪元素、（类、伪类、属性）、id、内连、important。
8. flex：flex-direction、flex-wrap、flex-flow、flex、flex- shrink flex-grow，basis，order，。为什么设置flex1 w0，默认为内容宽度。当内容宽度超过剩余宽度时，会进行搜索，设置w为0则只会添加剩余内容宽度。
9. grid，grid- template-row，column，area，
10. link import 。link 是标签，import是语法。兼容问题。link下载完就解析。import等页面加载完后再解析。link可以通过js操作，import不行，import的样式优先级低于林肯。
11. css 架构。
    1. oocss，面向对象的css，分离结构和主题。分离容器和内容。
    2. SMACSS，为css分类。分类几大基类，元素 状态、布局，基于基类名名，类与html结构解耦。更语义化的html和css。
    3. bemBEM通过Block、Element、Modifier来描述页面。


