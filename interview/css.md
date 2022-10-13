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
>2. smacss，将css分为几大模块样式。
> 3. bem。block、element、Modifier
> 
> css 方式
>
> 1. 规范命名
>2. css module
> 3. css in js
> 
> 样式不会有重复的，样式污染问题，便于元素快速定位。
>
> 重排与重绘。关键渲染路径是指浏览器对html解析到最终绘制在页面上的过程。在浏览器的关键渲染路径中，分为dom解析cssom解析，然后两者结合形成render tree，然后在布局阶段计算元素的位置、大小等，在绘制阶段绘制像素点。重排是指由于元素的大小、位置等发生变化，引起浏览器重新计算元素布局的过程。重绘指元素的颜色、背景、等发生变化导致浏览器重新绘制像素的过程。由于在关键路径中重排在重绘前面，所以说重排一定导致重绘。性能优化：减少dom操作。减少对dom定位、大小的查询。集中增删查改dom。使用可以开启gpu加速的css样式，比如transform、filter、opacity。
>
> css不会阻塞dom解析但会阻塞dom渲染。
>
> 浏览器遇到script标签会渲染页面，js会阻塞dom解析。但浏览器会预先下载资源。css会阻塞js下载。

