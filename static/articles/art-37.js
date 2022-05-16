let code = `
<blockquote>
  <p>Цитата</p>
  <cite>Откуда</cite>
</blockquote>

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
`; export {code}