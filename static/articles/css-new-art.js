let code = `<h2 id="art-point-1">Transition</h2>
<code class="inline-code">transition</code> свойство задает что как и сколько времени будет меняться. Например поменять высоту элемента в течении 3 секунд переход - линеен (то есть скорость перехода не меняется со временем):

<pre><code>transition: height 3s linear;</code></pre>

Так уже можно догадаться, что это только сжатое значение. На самом деле оно распределяеться на:

<h5 id="art-point-2">Состав свойства <code class="inline-code">transition</code></h5>
<ul>
  <li><code class="inline-code">transition-property</code> - какое свойство меняется</li>
  <li><code class="inline-code">transition-duration</code> - время перехода</li>
  <li><code class="inline-code">transition-timing-function</code> - как будет меняться скорость изменения со временем (например, сначала быстро, в конце медленно)</li>
  <li><code class="inline-code">transition-delay</code> - задержка перед переходом</li>
</ul>

Подробней о <code class="inline-code">transition-timing-function</code>. Он задается функцией <code class="inline-code">cubic-bezier(0,0,1,1)</code> (почитайте о ней) и имеет несколько предустановленных переходов:

<h5 id="art-point-3">Функции <code class="inline-code">transition-timing-function</code></h5>
<ul>
  <li><b>ease</b> - сначала медленно, потом ускоряется</li>
  <li><b>ease-in</b> - начинается медленно, ускоряется и резко останавливается</li>
  <li><b>ease-out</b> - начинается быстро и замедляется до полной остановки</li>
  <li><b>ease-in-out</b> - похоже на ease но с более тонким ускорением и замедлением</li>
  <li><b>linear</b> - скорость не меняется</li>
</ul>

<h2 id="art-point-4">Transform</h2>

Свойство изменяющее элемент. Например, вращение, сдвиг, изменение размера и др.

<ul>
  <li><code class="inline-code">rotate (градусы)</code> - повернуть по часовой (с минусом против)</li>
<li><code class="inline-code">translate (x, y)</code> - поменять позицию на x по X и на y по Y. (разбивается на <code class="inline-code">translateX</code> и <code class="inline-code">translateY</code>)</li>
<li><code class="inline-code">scale</code> - поменять размер в X раз. Разбивается на <code class="inline-code">scaleX</code> и <code class="inline-code">scaleY</code></li>
<li><code class="inline-code">scew(x,y)</code> - наклоняет елемент вдоль одной оси на заданный угол x по X и y по Y.</li>
</ul>

Трансформаций у одного элемента может быть несколько. Просто перечислите их через пробел!

<code class="inline-code">transform-origin</code> задает позицию трансформации (то есть <code class="inline-code">transform</code>). Это точка относительно которой будет, например, вращаться элемент. По умолчанию в центре.

<code class="inline-code">perspective</code> определяет глубину 3Д сцены

<h2 id="art-point-5">Настоящая анимация</h2>

@keyframes определяет правила анимации. Для большей понятности код:

<pre><code>@keyframes animName {
 0% {
		height: 0;
    //или любое другое свойство
 }
 50% {
		height: 80%;
 }
 100% {
		height: 100%;
 }
}
</code></pre>
Вместо процентов вы можете использовать слова from и to. 

Подключают анимацию с помощью свойства animation у нужного селектора:
<pre><code>div.red {
	animation: animName 2s;
}</code></pre>

подобно transition свойство animation так же распределяется на свойства: 

<h5 id="art-point-6">Состав свойства animation</h5>
<ul>
  <li>animation-name - имя анимации (определено в keyframes)</li>
<li>animation-duration - продолжительность</li>
<li>animation-timing-function - тоже что и transition-timing-function</li>
<li>animation-delay - задержка</li>
<li>animation-iteration-count - сколько раз повторить, например infinite зациклит ее</li>
<li>animation-direction - направление выполнения анимации: normal от 0 до 100, reverse от 100 до 0, alternate от 0 до 100 и до 0 (туда-сюда), alternate reverse - то же но наоборот</li>
</ul>

`; export {code}