<template>
  <div class="edit-art">
    <h2>РЕДАКТИРОВАНИЕ СТАТЬИ</h2>
    * - обязательны к заполнению
    <div>
      <label>Выбери статью*</label>
      <select @change="changeArt($event)" v-if="articles && articles.length > 0">
        <option selected disabled hidden>Статьи</option>
        <option v-for="(art, i) in articles" :value="i" :key="'art-' + art.guide_id">{{art.title}}</option>
      </select>
    </div>
    <form v-on:submit.prevent="editartnow()" v-if="artId && artId.length > 0">
      <h3>Основные данные</h3>
      <div class="first-form">
        <div>
          <label>ID статьи* (ссылка, название файла)</label>
          <input type="text" name="artId" placeholder="add-art-id-here" v-model="artId" required>
        </div>
        <div>
          <label>Название статьи*</label>
          <input type="text" name="artName" placeholder="Статья №1" v-model="artName" minlength="10" maxlength="300" required>
        </div>
        <div>
          <label>Описание статьи*</label>
          <textarea maxlength="400" name="artDesc" v-model="artDesc" minlength="50" required></textarea>
        </div>
        <div>
          <label>Ключевые слова* (для роботов)</label>
          <input type="text" name="artKeys" placeholder="ключ1, ключ2, ..." v-model="artKeys" required>
        </div>
        <div>
          <label>Теги</label>
          <input type="text" name="artTags" placeholder="tag1, тег2, ..." v-model="artTags">
        </div>
        <div>
          <label>Похожие статьи (их id)</label>
          <input type="text" name="artSim" placeholder="art-1, the-best-art, ..." v-model="artSim">
        </div>
        <div>
          <label>Выбери категорию*</label>
          <select v-model="artCat" name="artCat" required>
            <option v-for="cat in categories" :key="'cat' + cat.link" :value="cat.link">{{cat.text}} {{cat.link}}</option>
          </select>
        </div>
        <div>
          <input type="checkbox" name="artLib" v-model="artLib" id="is-lib"><label for="is-lib"></label>Внести в библиотеку
        </div>
      </div>
      
      
      <h3>Контент</h3>
      <div class="second-form">
        <div id="art-img-file">
          <label>Главная картинка (не более 700px в ширину, формат webp)</label>
          <input type="text" name="artImg" placeholder="image.webp" id="art-file">
        </div>
        <div>
          <div class="buttons-for-text">
            <label>HTML статьи*</label>
            <p>Добавить:</p>
            <button @click.prevent="add1">Абзац</button>
            <button @click.prevent="add2">Цитату</button>
            <button @click.prevent="add3">Всплывающую подсказку</button>
            <button @click.prevent="add4">Таблицу</button>
            <button @click.prevent="add5">Список</button>
            <button @click.prevent="add6">Заголовок</button>
            <button @click.prevent="add7">Блок "Внимание"</button>
            <button @click.prevent="add8">Блок "Заметка"</button>
            <button @click.prevent="add9">Блок "Информация"</button>
            <button @click.prevent="add10">Блок "Вопрос"</button>
            <button @click.prevent="add11">Inline-код</button>
            <button @click.prevent="add12">Block-код</button>
            <button @click.prevent="add13">Карточки</button>
          </div>
          <textarea id="text-art" name="artText" v-model="artText" minlength="140" required>Статья</textarea>
        </div>
      </div>
      
      
      <h3>Дополнительный контент</h3>
      <div class="third-form">
        <div>
          <input type="checkbox" name="artDop" v-model="artDop" id="is-dop"><label for="is-dop"></label>Дополнительный контент
        </div>
        <div v-if="artDop">
          <label>Код дополнительного контента</label>
          <textarea id="dop-text" name="artDopCon" v-model="artDopCon"></textarea>
        </div>
      </div>
      
      <div class="submit">
        <input type="submit">
        <div id="loading"></div>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  name: 'editArt',
  data: function () {
    return {
      articles: null,
      categories: [],
      artId: '',
      artName: '',
      artDesc: '',
      artKeys: '',
      artTags: '',
      artSim: '',
      artCat: '',
      artLib: false,
      artImg: '',
      artText: '',
      artDop: false,
      artDopCon: ''
    }
  },
  async fetch() {
    try {
      this.categories = await this.$api("info", "categories");
      this.articles = await this.$api("articles", "index");
    } catch (e) {
      console.error("editArt.vue: " + e);
    }
  },

  methods: {
    async editartnow() {
      let file = document.getElementById("art-file").files[0];
       let data = {
        artId:     this.artId,    
        artName:   this.artName,  
        artDesc:   this.artDesc,  
        artKeys:   this.artKeys,  
        artTags:   this.artTags,  
        artSim:    this.artSim,   
        artCat:    this.artCat,   
        artLib:    this.artLib, 
        artImg:    this.artImg,  
        artText:   this.artText,  
        artDop:    this.artDop,   
        artDopCon: this.artDop ? this.artDopCon : null
      }

      document.getElementById('loading').classList.add('on');
      let res = await this.$api('articles', 'edit', data);
      
      if (res === 'ok')
        alert('Статья сохранена!')
      else 
        alert(res);

      document.getElementById('loading').classList.remove('on');
    },
    changeArt(event) {
      if (this.articles && this.articles.length > 0) {
        this.artId = this.articles[event.target.value].art_id;    
        this.artName = this.articles[event.target.value].title;  
        this.artDesc = this.articles[event.target.value].description;  
        this.artKeys = this.articles[event.target.value].keywords;  
        this.artTags = this.articles[event.target.value].tags;  
        this.artSim = this.articles[event.target.value].sim_arts;   
        this.artCat = this.articles[event.target.value].categories;   
        this.artImg = this.articles[event.target.value].img ? this.articles[event.target.value].img : '';
        this.artLib = this.articles[event.target.value].lib;  
        this.artDop = this.articles[event.target.value].dopcon;   
        this.artDopCon = JSON.stringify(this.articles[event.target.value].dopconarr);

        this.artText = (require('../static/articles/' + this.articles[event.target.value].file)).code;
      }
    },
    add1 () {
      this.artText += `
<p>...</p>
`
    },
    add2 () {
      this.artText += `
<blockquote>
  <p>Цитата</p>
  <cite>Откуда</cite>
</blockquote>
`
    },
    add3 () {
      this.artText += `
<span class="tooltip" tooltip="some text">
`
    },
    add4 () {
      this.artText += `
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
`
    },
    add5 () {
      this.artText += `
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
`
    },
    add6 () {
      this.artText += `
<h2 ref="art-point-1">Первая глава</h2> <!-- главные заголовки -->
<h4 ref="art-point-2">Часть 1</h4> <!-- подзаголовок -->
<h5 ref="art-point-5">Список №1</h5> <!-- списки, таблицы -->
`
    },
    add7 () {
      this.artText += `
<div class="warning">
  <div>
    <img src="/images/icons/info.webp">
  </div>
  <div>
    <span>Внимание</span>
    <p>контент (что угодно)</p>
  </div>
</div>
`
    },
    add8 () {
      this.artText += `
<div class="note">
  <div>
    <img src="/images/icons/pencil.webp">
  </div>
  <div>
    <span>Заметка</span>
    <p>контент (что угодно)</p>
  </div>
</div>
`
    },
    add9 () {
      this.artText += `
<div class="info">
  <div>
    <img src="/images/icons/info.webp">
  </div>
  <div>
    <span>Информация</span>
    <p>контент (что угодно)</p>
  </div>
</div>
`
    },
    add10 () {
      this.artText += `
<div class="question">
  <div>
    <img src="/images/icons/question.webp">
  </div>
  <div>
    <span>Вопрос</span>
    <p>контент (что угодно)</p>
  </div>
</div>
`
    },
    add11 () {
      this.artText += `
<code class="inline-code">function</code>
`
    },
    add12 () {
      this.artText += `
<pre><code>это первая строка
переносы сохраняются
    табуляция тоже
</code></pre>
`
    },
    add13 () {
      this.artText += `
<div class="cards">
  <div class="card"><b>Название карты</b> <span>Описание карточки.</span> </div>
  <div class="card"><b>Название карты</b> <span>Описание карточки.</span> </div>
</div>
`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.edit-art {
  padding: 2em;
  flex: 1;
  select {
    padding: 0.7em 1em;
    background: transparent;
    border-radius: 0;
    border: 1px solid $black;
    font-family: $font-1;
    font-size: 1.1rem;
    letter-spacing: 0.01em;
  }
  form {
    label {
      display: block;
      width: 300px;
    }
    textarea, input {
      display: block;
      background: transparent;
      border: none;
      width: 400px;
      &:focus {
        outline: none;
      }
    }
    textarea {
      border: 1px solid $black2;
      min-height: 150px;
    }
    input {
      border-bottom: 1px solid $black2;
    }
    input[type="checkbox"] {
      display: none;
      + label {
        background: $black;
        width: 40px;
        height: 40px;
        position: relative;
        margin-right: 20px;
        top: -5px;
        margin-left: 300px;

      }
      &:checked + label::before {
        content: "✓";
        color: $white1;
        font-size: 1.7em;
        position: absolute;
        top: -5px;
        left: 10px;
      }
    }

    .buttons-for-text {
      max-width: 300px;
      button {
        background: $black;
        color: $white1;
        margin: 0.5em;
        border: none;
        padding: 0.2em 0.7em;
        cursor: pointer;
      }
    }

    #text-art {
      flex: 1;
      height: 600px

    }

    #dop-text {
      flex: 1;
      height: 600px
    }
    input[type="submit"] {
      background: $black;
      color: $white1;
      margin: 0.5em;
      border: none;
      padding: 0.2em 0.7em;
      cursor: pointer;
    }

    .submit {
      display: flex;
    }

    #loading {
      width: 30px;
      height: 30px;
      background-image: url("/images/icons/time.webp");
      background-size: contain;
      margin: 0.5em;
      opacity: 0;
      
      &.on {
        opacity: 1;
        animation: load 0.9s infinite ;
      }
    }
  }
  .first-form, .second-form, .third-form {
    > div {
      margin: 1.2em 0;
      display: flex;
    }
  }
}
</style>
