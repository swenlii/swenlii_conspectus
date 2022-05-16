let code = `
<div class="question">
  <div>
    <img src="/images/icons/question.png">
  </div>
  <div>
    <span>Вопрос</span>
    <p>контент (что угодно)</p>
  </div>
</div>

<div class="info">
  <div>
    <img src="/images/icons/info.png">
  </div>
  <div>
    <span>Информация</span>
    <p>контент (что угодно)</p>
  </div>
</div>

<div class="note">
  <div>
    <img src="/images/icons/pencil.png">
  </div>
  <div>
    <span>Заметка</span>
    <p>контент (что угодно)</p>
  </div>
</div>

<div class="warning">
  <div>
    <img src="/images/icons/info.png">
  </div>
  <div>
    <span>Внимание</span>
    <p>контент (что угодно)</p>
  </div>
</div>

<h2 ref="art-point-1">Первая глава</h2> <!-- главные заголовки -->
<h4 ref="art-point-2">Часть 1</h4> <!-- подзаголовок -->
<h5 ref="art-point-5">Список №1</h5> <!-- списки, таблицы -->

<h5 ref="art-point-5">Список №1</h5>
<ul>
  <li>пункт 1</li>
  <li>пункт 1</li>
</ul>

<h5 ref="art-point-5">Список №2</h5>
<ol>
  <li>пункт 1</li>
  <li>пункт 1</li>
</ol>

<table class="table">
  <thead>
    <tr>
      <td>Столбец 1</td>
      <td>Столбец 2</td>
      <td>Столбец 3</td>
    </tr>
  </thead>
  <tbody>
    <tr><td> 1 </td>     <td> 2 </td>      <td> 3 </td></tr>
    <tr><td> 1 </td>     <td> 2 </td>      <td> 3 </td></tr>
    <tr><td> 1 </td>     <td> 2 </td>      <td> 3 </td></tr>
  </tbody>
  <tfoot>
    <tr><td> 1 </td>     <td> 2 </td>      <td> 3 </td></tr>
   </tfoot>
</table>

<span class="tooltip" tooltip="some text">
`; export {code}