<template>
  <div class="content home-page">
    <section class="main-section">
      <h2>Что нужно знать, чтобы создать свой сайт?</h2>
      <p class="about-site">Делать сайт - дело не шуточное. Может показаться, что делать сайт легко. Но это не так.
        Если хочешь зарабатывать на этом деньги, для начала придется много учится. Устраиваясь на работу,
        ты можешь просидеть в учениках год. И то если повезет. Без усидчивости о самостоятельной
        разработке сайта "с нуля" можно забыть.</p>

      <details>
        <summary>Три главных столпа</summary>
        <div>Something small enough to escape casual notice.</div>
      </details>
      <details>
        <summary>Библиотеки и фреймворки</summary>
        <div>Something small enough to escape casual notice.</div>
      </details>
      <details>
        <summary>Инструменты разработчика</summary>
        <div>Something small enough to escape casual notice.</div>
      </details>
      <details>
        <summary>Материалы для сайта</summary>
        <div>Something small enough to escape casual notice.</div>
      </details>

    </section>
    <section class="other-info">
      <div class="who-create">
        <h3>Кто создал сайт?</h3>
        <p>Привет! Я создатель этого сайта. Буду краток. Это сайт создан мной для меня. Не претендую на
          уникальность контента, но постараюсь изложить максимум информации в доступной форме. Почему мне
          можно верить? Потому что я имею опыт в программировании и разработке. Более подробно в портфолио.</p>
        <a href="https://swenlii.com">GO TO PORTFOLIO</a>
      </div>
      <div class="second-block">
        <div class="last-art">
          <h3>{{ last && last.title ? last.title : '' }}</h3>
          <img src="/images/image-2.jpg">
          <p>{{last && last.description ? last.description : ''}}</p>

          <router-link :to="'/article/' + (last && last.art_id ? last.art_id : 'title')">Читать      ⟶</router-link>
        </div>
        <div class="changes">
          <h3>Обновления на сайте</h3>
          <ul>
            <li>Новая статья на сайте: <nuxt-link to="/article/art-1">Что такое role и где пользоваться этим атрибутом</nuxt-link></li>
            <li>Добавлен новый тип поиска по вопросам. Просто введи "Как изменить css через js"</li>
            <li>Новая категория:  <nuxt-link to="/articles?category=html">Webpack</nuxt-link></li>
            <li>Добавлены теги, упрощающие поиск нужной информации</li>
            <li>Добавлена темная тема сайта</li>
          </ul>
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
</template>

<script>

export default {
  name: 'Home',
  data: function () {
    return {
      emailSpam: '',
      last: null
    }
  },
  async fetch() {
    let con = await this.$api('info','checkconection');
    if (con === 'ok') {
      this.last = await this.$api('articles', 'last');
      this.last = this.last[0];
    }
  },

  head() {
    return {
      title: 'Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Блог о программировании, конспектирующий многие учебники и курсы в один небольшой сайт, логично называемый "Conspectus".'
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
.home-page {
  margin-top: 2em;
  animation: 2s to-page;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  background-color: $black;
  grid-column-gap: 1px;

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
    padding: 2em 4em 6em 4em;
    flex: 1;
    position: relative;
    animation: 1s to-left;
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
    animation: 1s to-right;

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
        min-height: 200px;
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
        background-image: url("/images/icons/time.png");
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
