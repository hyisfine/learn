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

12. > css
    >
    > BFC。块格式化上下文。css渲染规则的一部分。是一个独立的渲染区域，决定了内部子元素的布局和其他元素之间的关系。常用来解决兄弟、父子元素之间的margin重叠、浮动高度塌陷问题。开启bfc的方式有，根元素、inline-block、flow-root、overflow、float、absolute、fixed、flex个grid的子元素。
    >
    > 层叠上下文。是元素的三维虚拟结构。正常的文档流中，元素平铺在一起，x轴和y轴平铺在一起，当元素发生堆叠时，我们就需要通过层叠上下文描述这种堆叠关系。通过z-index可以操控层叠上下文在z轴上的展示顺序。一个层叠上下文中，他的元素的层叠顺序依次为、background、z-index< 0、块级盒子、float、inline-box、z-index auto、0 >0/   absolute、relative且z-index不为auto，fixed、flex、grid的子元素的z-index不为auto，transform、filter、opacity等css属性。
    >
    > display。分为几大类，控制外部显示的有block、inline 。控制内部布局的table、flex、flow-root、grid。布局内部元素、list-item、table-header。参数结合的inline-block。控制显现的none。
    >
    > position。static，参数的trbl无效。relative，未脱离文档流。absolute，脱离文档流生成了一个BFC。fixed 脱离文档流，生成了BFC和层叠上下文，当祖先元素有transform或者filter时，会以组件元素定位。sticky，产生了一个层叠上下文。粘性定位，正常的文档流中，当祖先元素中有overflow不会visible时，会根据当前祖先元素定位，而不管是否产生了滚动。
    >
    > 文档流。元素从左右往右从上往下按顺序排列，块元素会另起一行且宽度为父元素100%，行内元素从左往右排列，不够重新生成一行，紧挨的元素的margin会合并。
    >
    > line-height。设置行高，即设置行盒的虚拟高度。字体的大小不仅由font-size就决定，还有字体库决定，向上和向下延伸一部分，这样子的字体高度是字体的内容高度，行盒的高度一般是字体的内容高度，当我们设置行高时，会在内容的两端平均加上一般的高度值。
    >
    > 选择器权重。通用、元素、子类、后代、兄弟。相邻。 伪元素、属性选择、伪类、class选择、id、行内样式、important。
    >
    > flex布局。flex- direction、flex- wrap、justify- content主轴上项目对齐方式，flex-flow、place- content、align- content、align-items。item：order、align- self，flex，flex-group，flex-shrink，flex- basis。
    >
    > grid布局。grid- template-、place- content。justify、items。grid-auto-flow，gap。
    >
    > link&import。link是js的元素，可以通过js操控，不会阻塞dom解析。import 是css的规则一部分，等待页面加载完后才会解析。
    >
    > css命名规则。
    >
    > 1. oocss架构，分离结构与内容，css的样式与内容无关。
    > 2. smacss，将css分为几大模块样式。
    > 3. bem。block、element、Modifier
    >
    > css 方式
    >
    > 1. 规范命名
    > 2. css module
    > 3. css in js
    >
    > 样式不会有重复的，样式污染问题，便于元素快速定位。
    >
    > 重排与重绘。关键渲染路径是指浏览器对html解析到最终绘制在页面上的过程。在浏览器的关键渲染路径中，分为dom解析cssom解析，然后两者结合形成render tree，然后在布局阶段计算元素的位置、大小等，在绘制阶段绘制像素点。重排是指由于元素的大小、位置等发生变化，引起浏览器重新计算元素布局的过程。重绘指元素的颜色、背景、等发生变化导致浏览器重新绘制像素的过程。由于在关键路径中重排在重绘前面，所以说重排一定导致重绘。性能优化：减少dom操作。减少对dom定位、大小的查询。集中增删查改dom。使用可以开启gpu加速的css样式，比如transform、filter、opacity。
    >
    > css不会阻塞dom解析但会阻塞dom渲染。
    >
    > 浏览器遇到script标签会渲染页面，js会阻塞dom解析。但浏览器会预先下载资源。css会阻塞js下载。

