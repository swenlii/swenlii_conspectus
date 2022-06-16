<template>
<div class="content home-page">
<div class="black-for-borders">
    <section class="main-section">
      <h2>Что нужно знать, чтобы создать свой сайт?</h2>
      <p class="about-site">В период работы я много чему училась самостоятельно и накопила большое количество конспектов. 
          В какой-то определенный момент мне пришла идея, а почему бы мне не поделиться своими знаниями с людьми?
          Делать сайт - дело не шуточное. И этому делу нужно учиться. Лучше всего начать учится всему самостоятельно.
          Я попробую помочь тебе влиться в нашу среду. Не претендую на
          уникальность своего контента, но постараюсь изложить максимально в доступной форме.</p>

      <details>
        <summary>Три главных столпа</summary>
        <div>
          <p>Самые важные языки в веб-программировании, без которых не возможна разработка сайта. 
          Не важно, какой сайт ты хочешь, какую часть сайта ты разрабатываешь. Тебе все равно нужно знать их.</p>
          <ul>
            <li><a href="/articles?category=html">HTML - разметь свою страницу</a></li>
            <li><a href="/articles?category=css">СSS - укрась страницу по своему вкусу</a></li>
            <li><a href="/articles?category=js">JavaScript - добавь сайту интерактивности</a></li>
          </ul>
        </div>
      </details>
      <details>
        <summary>Библиотеки и фреймворки</summary>
        <div>
          <p>После того, как ты научился создавать самые простые сайты, стоит приступить к более сложным
          инструментам разработки. Теперь ты должен выбрать - разработка внешней части сайта или разработка "под капотом"? </p>
          <p>Эта глава раскажет тебе о внешней части сайта. Существует множество библиотек и фреймворков, облегчающих работу front-end разработчикам. 
          Какие использовать, ты выбираешь сам. Я рассмотрю только самые важные и только те, что знаю сама.</p>
          <ul>
            <li><a href="#">GIT. Его знает каждый разработчик.</a></li>
            <li><a href="#">Webpack - инструмент для сборки проектов</a></li>
            <li><a href="#">SCSS - упрости разработку CSS</a></li>
            <li><a href="#">Vue - один из трех самых популярных фреймворков</a></li>
            <li><a href="#">БЭМ - устаревшая терминология или важная информация?</a></li>
            <li><a href="#">Bootstrap - резиновый сайт с минимумом усилий</a></li>
            <li><a href="#">JQuery устаревший? Почему он требуется в вакансиях?</a></li>
          </ul>
        </div>
      </details>
      <details>
        <summary>Создание сервера</summary>
        <div>
          <p>После изучения предыдущей главы тебя смело можно назвать front-end разработчиком. Эта глава создана для тех, кто хочет
          стать back-end разработчиков и разрабатывать серверную часть сайта. </p>
          <ul>
          <li><a href="#">Как работает интернет?</a></li>
          <li><a href="#">Websockets и REST API - два страшных слова!</a></li>
          <li><a href="#">PHP - язык для back-end</a></li>
          <li><a href="#">Node.js - как создать сервер на JavaScript?</a></li>
        </ul>
        </div>
      </details>
      <details>
        <summary>Материалы для сайта</summary>
        <div>Пока пусто. Приходи позже.</div>
      </details>

    </section>
    <section class="other-info">
      <div class="who-create">
        <h3>Кто создал сайт?</h3>
        <p>Я разработчик, имеющий более 3 лет стажа. За свою практику я работала в разных компаниях и создала более 10 проектов.
          Большую часть времени я училась самостоятельно. У меня есть опыт в обучении людей и я отлично с этим справлялась.
          Мои компетенции можно посмотреть на моем личном сайте.</p>
        <a href="https://swenlii.up.railway.app/">МОЙ САЙТ</a>
      </div>
      <div class="second-block">
        <div class="last-art" v-if="last">
          <h3>{{ last && last.title ? last.title : '' }}</h3>
          <img v-if="last.img" :src="'/images/articles/' + last.img" alt="">
          <p>{{last && last.description ? last.description : ''}}</p>

          <router-link :to="'/article/' + (last && last.art_id ? last.art_id : 'title')">Читать      ⟶</router-link>
        </div>
        <div class="changes" v-if="this.changes">
          <h3>Последние обновления</h3>
          <div v-html="changes.html"></div>
          <router-link to="/changes">Читать      ⟶</router-link>
        </div>
      </div>
      <!--noindex-->
      <form class="email-spam" v-on:mouseover="this.spamMouseOver" v-on:mouseout="this.spamMouseOut" v-on:submit.prevent="subscribe ()">
        <input type="email" placeholder="Подпишись на рассылку!" v-model="emailSpam" id="spamEmail" autocomplete="email" required>
        <div class="submit">
          <div id="loading"></div>
          <input type="submit" value="Подписаться!">
        </div>
        
        <!--/noindex-->
      </form>
    </section>
  </div>
</div>
  
</template>

<script>

export default {
  name: 'Home',
  props: ['connect'],
  data: function () {
    return {
      emailSpam: '',
      last: null,
      changes: null
    }
  },
  async fetch() {
    this.last = await this.$api('articles', 'last');
    this.last = this.last[0];
    this.changes = await this.$api('info', 'changes');
    this.changes = this.changes[0];
  },

  head() {
    return {
      title: 'Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Блог о программировании "Conspectus". Сборник конспектов одного разработчика.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'личный, блог, разработка, обучение, программирование, веб'
        }
      ],
    };
  },
  methods: {
    spamMouseOver () {
      document.getElementById('spamEmail').placeholder = "Введи email сюда!";
    },
    spamMouseOut () {
      document.getElementById('spamEmail').placeholder = "Подпишись на рассылку!";
    },
    async subscribe () {
      document.getElementById('loading').classList.add('on');
      await this.$api('info', 'subscribe', {email: document.getElementById('spamEmail').value});
      alert('Спасибо за подписку!');
      document.getElementById('loading').classList.remove('on');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

main {
    padding: 0 2em;
  }

main > * {
    max-width: 1400px;
    margin: 0 auto;
  }

  .black-for-borders {
    background-color: $black;
     display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 1px;
  animation: 0.7s to-page;
  }
.home-page {
  margin-top: 2em;
  padding: 0 2em;
  background-color: $white2;
  

  & > * {
    margin-right: auto;
    margin-left: auto;
  }

  h2 {
    line-height: 1.5;
    font-size: 3em;
    padding: 0.5rem 0;
  }

  .main-section {
    padding: 1em 1em 3em 1em;
    flex: 1;
    position: relative;
    background-color: $white2;
  }

  h3 {
    @extend .font-style-2;
    color: $white1;
    background-color: $black;
    padding: 0 0.3em;
    border-bottom: 1px solid $black3;
    border-top:  1px solid $black3;
    font-size: 1.5rem;
  }

  .about-site {
    margin: 2em 0;
  }

  details summary {
    @extend .font-style-2;
    background-color: $black;
    color: $white1;
    padding: 1em 2em;
    box-shadow: 0 8px 6px -6px rgba(0,0,0,.2), 0 -8px 6px -6px rgba(0,0,0,.2);
    z-index: 2;
    position: relative;
    list-style: none;
    margin-bottom: 1px;
    cursor: pointer;
    transition: 0.3s top ease;
    top: 0;

    &:hover {
      top: -0.3em;
    }
  }

  details div {
    padding: 1.5em 1em 1em 1em;
    transition: 1s all ease;
    background-color: $white2;
    border: 1px solid $black;
    margin: -6.5em 2em 0 2em;
    z-index: -1;
    animation: 0.5s det-cont;
  }

  @keyframes det-cont {
    from {
      margin-top: -3em;
    }
    to {
      margin-top: -0.5em;
    }
  }

  details[open] div {
    margin: -0.5em 2em 10px 2em;
  }

  .other-info {
    background-color: $white2;
    position: relative;

    h3 {
      @extend .font-style-2;
      margin: 0.7em 0;
    }

    .who-create {
      padding: 1em 0;
      margin: 0 1em;
      text-align: center;

      p {
        margin: 1em 0;
      }

      a {
        display: inline-block;
        padding: 0.5em 2em;
        background-color: $black3;
        color: $white2;
        text-decoration: none;
        transition: 0.6s all ease;
        margin-bottom: 1em;
        box-shadow: 0 0 $black3, 0 0 $black3;
        border: 2px solid $white2;

        &:hover {
          box-shadow: 14px 14px $black2, -14px 14px $black2;
          background-color: $black2;
          color: $white1;
        }

        &:active {
          box-shadow: 2px 2px $white1, -2px 2px $white1;
          background-color: $black;
          color: $white1;
        }
      }
    }

    .second-block {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      background-color: $black;
      grid-column-gap: 1px;

    }

    .last-art {
      border-top: 1px solid $black;
      padding: 1em;
      background-color: $white2;
      img {
        background-color: $black;
        min-height: 100px;
        width: 100%;
        filter: grayscale(100%);
      }

      p {
        margin: 1.5em 0;
      }

      a {
        display: inline-block;
        padding: 0.5em 2em;
        background-color: $black3;
        color: $white2;
        text-decoration: none;
        position:relative;
        left: 0;
        transition: 0.6s all ease;
        box-shadow: 0 0 $black;
        border: 1px solid $white2;

        &:hover {
          background-color: $black2;
          box-shadow: -10px 10px $black;
          left: 10px;
          color: $white1;
        }

        &:active {
          background-color: $black;
          color: $white1;
        }
      }
    }

    .changes {
      padding: 1em;
      background-color: $white2;
      border-top: 1px solid $black;
    }

    .email-spam {
      border-top: 1px solid $black;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      flex-wrap: wrap;

      input[type="email"] {
        flex: 1;
        border: none;
        @extend .font-style-4;
        background-color: transparent;
        outline: none;
        box-shadow: inset 0 0 0 50px $white2 !important;
        border-bottom: 1px solid $black;
        padding: 0.5em 1em;
      }

      .submit {
        display: flex;
        align-items: center;
      }

      #loading {
        width: 30px;
        height: 30px;
        background-image: url("/images/icons/time.webp");
        background-size: contain;
        margin: 0.5em;
        display: none;

        &.on {
          display:block;
          animation: load 0.9s infinite ;
        }
      }

      input[type="submit"] {
        background-color: $black;
        border: none;
        color: $white1;
        padding: 0.2rem 2em;
        margin: 1em 0 1em 0;
        transition: all 0.3s ease;
        box-shadow: 0 0 $white2, 0 0 $black2;

        &:hover {
          padding: 0.2rem 3em;
          background-color: $black2;
          box-shadow: 1px 1px $white2, 6px 6px $black2;
          color: $white1;
        }
      }
    }
  }
}
</style>
