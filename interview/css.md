1. 层叠上下文
2. 重排和重绘。关键渲染路径上，分为dom解析，cssom解析，render树，layout，paint。layout 决定元素的宽高、位置。paint渲染像素。重排指浏览器由于元素的大小位置发生了变化，重新计算元素的大小位置的过程。重绘指元素的样式发生变化，导致浏览器重新绘制的过程。由于在关键渲染路径中 重排在重绘前面。所以重排会导致重绘。调用某些获取元素大小位置的API会导致重拍。将复杂的变化用于脱离了文档流的绝对定位元素或者fixed中，使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。但是过多使用会占大量内存。
3. bfc
4. display。外部显示类型，inline- block。内部flex、grid、table、flow- root。list item。某种布局的子元素，table-cel。控制显示的none。两者结合的inline- block，inline- flex。
5. 
6. position。static trbl 无效，relative 有效，保留位置，未脱离文档流。absolute，脱离文档流，根据最近的非static的祖先元素进行定位。fixed脱离文档流，创建新的层叠上下文，如果祖先元素有transform 、filter ，则会根据祖先元素定位。sticky，没有脱离文档流，但是创建了新的层叠上下文，将会固定在最近的祖先元素的overflow为非visible上。
7. 

