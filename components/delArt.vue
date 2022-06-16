<template>
   <div class="del-art">
    <h2>УДАЛЕНИЕ СТАТЬИ</h2>
    * - обязательны к заполнению
    <form v-on:submit.prevent="delArtNow()">
      
      <div>
        <label>Выбери статью*</label>
        <select @change="changeArt($event)" v-if="articles">
          <option selected disabled hidden>Статьи</option>
          <option v-for="(art, i) in articles" :value="i" :key="'art-' + art.art_id">{{art.title}}</option>
        </select>
        <div class="submit">
          <input type="submit">
          <div id="loading"></div>
        </div>
      </div>

      <div class="info-art" v-if="oneart">
        <h3>Информация о статье</h3>
        <p><b>Название:</b>{{oneart.title}}</p>
        <p><b>Описание:</b>{{oneart.description}}</p>
        <p v-if="oneart.comments > 0"><b>Количество коментариев:</b>{{oneart.comments}}</p>
        <p v-if="oneart.img"><b>Файл картинки:</b>{{oneart.img}}</p>
        <p><b>Текст статьи:</b>{{oneart.file}}<button @click.prevent="getText">Показать</button></p>
        <div :class="open ? 'art-content open' : 'art-content'">
          <pre><code v-text="conttext"></code></pre>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'delArt',
  data: function () {
    return {
      articles: null,
      oneart: null,
      conttext: null,
      open: false
    }
  },
  async fetch() {
    try {
      this.articles = await this.$api("articles", "index");
    } catch (e) {
      console.error("addGuide.vue: " + e);
    }
  },
  methods: {
    async delArtNow () {
      document.getElementById('loading').classList.add('on');
      let ret = await this.$api("articles", "delart", {id: this.oneart.art_id, img: this.oneart.img});
      if (ret === 'ok')
        alert('Статья '+ this.oneart.art_id + ' удалена');
      else 
        alert(ret);

      document.getElementById('loading').classList.remove('on');
    },
    async changeArt(event) {
      this.oneart = this.articles[event.target.value];
      let coms = await this.$api("articles", "comments", { id: this.articles[event.target.value].art_id });
      this.oneart.comments = coms.length;
      this.conttext= (require('../static/articles/' + this.oneart.file)).code;
    },
    getText() {
      this.open = !this.open;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.del-art {
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
  .info-art {
    border: 1px solid $black;
    padding: 1em;
    margin-top: 2em;
    p b{
      display: inline-block;
      width: 300px;
    }

    button {
        background: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    .art-content {
      max-height: 0;
      overflow: hidden;
      transition: 0.7s all ease;
      &.open {
        max-height: 90vh;
        overflow: scroll;
      }

      pre {
	      white-space: pre-wrap; 
        background: $white1;
      }
    }
  }
}
</style>
