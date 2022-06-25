<template>
  <div class="about" @click="$emit('upgrade-search', false)">
    <section class="main-section">
      <h1 first-word="О сайте">О сайте</h1>
      <p>Этот сайт преимущественно для начинающих разработчиков. В интернете очень много обучающих статей, но не каждая из них понятно объясняет материал. Я сама сталкивалась с такими темами, на которые не могла найти понятно объясняющую статью или документацию. Этот сайт был создан в попытке пересказать документации к фреймворкам или языкам более понятным, доступным новичкам языком.</p>
      <h2>Немного о создателе</h2>
      <p><a href="https://swenlii.up.railway.app/">Я разработчик с 3-летним стажем.</a> За свою практику я успела поработать в крупных компаниях и имею большое портфолио. В период работы я много чему училась самостоятельно. Каждый разработчик должен учится. Я люблю учится. И у меня отлично это получается. За свой период работы я накопила большое количество конспектов. В какой-то определенный момент я подумала, а почему бы мне не поделиться своими знаниями с людьми? Например, сделать свой блог. </p>
      <h2>Как работает сайт</h2>
      <p>Наш мозг работает так, что запоминает только то, что мы использовали на практике. Когда-то давно я самостоятельно изучила, как стричь коту когти. Кота у меня давно нет, но я все еще помню, как это делается. Именно поэтому мой подход к учебе - записывай все своими словами, а после примени это на практике. Так происходит двойная практика: вспомни и примени.</p>
      <p>Именно поэтому на моем сайте есть тесты и заметки. Тесты заставляют вспомнить только что прочитанный материал, все термины из статьи и скучная история вынесена в отдельную вкладку, а заметки содержат дополнительную информацию.</p>
      <h2>Возвращайтесь!</h2>
      <p>К сожалению, то, что редко используется, забывается, именно поэтому я все еще пользуюсь своими конспектами. Я снова и снова во время работы возвращаюсь к ним, чтобы вспомнить, к примеру, какую-то определенную функцию. И это нормально. Не бойтесь и вы возвращаться к своим конспектам или гуглить даже самые простые вещи.</p>
    </section>
    <section class="contacts">
      <!--noindex-->
      <form v-on:submit.prevent="sendMail()">
        <h3>Свяжитесь со мной</h3>
        <div class="form-str">
          <input type="text" placeholder="Имя" autocomplete="name" v-model="m_sender">
          <input type="text" placeholder="Email" autocomplete="email" v-model="m_email">
        </div>
        <div class="form-str">
          <input type="text" placeholder="Заголовок" v-model="m_title">
        </div>
        <div class="form-str">
          <textarea placeholder="Текст" v-model="m_mail"></textarea>
        </div>
        <div class="submit">
            <button type="submit">Отправить</button>
            <div id="loading"></div>
          </div>
      </form>
      <!--/noindex-->
      <div class="links">
        <b>Мой email:</b> <a href="mailto:ira.swenlii@gmail.com">ira.swenlii@gmail.com</a><br>
        <b>Мой telegram:</b> <a href="https://t.me/swenlii">t.me/swenlii</a><br>
        <b>Мой вк:</b> <a href="https://vk.com/swenlii">vk.com/swenlii</a> <br>
        <b>Мой github:</b> <a href="https://github.com/swenli">github.com/swenli</a> <br>
        <b>Мой twitter:</b> <a href="https://twitter.com/swenlii">twitter.com/swenlii</a> <br>
        <b>Мой linkedin:</b> <a href="https://www.linkedin.com/in/swenlii">linkedin.com/in/swenlii</a> <br></br>
        <b>Мой сайт:</b> <a href="https://swenlii.up.railway.app/">https://swenlii.up.railway.app/</a> <br>
      </div>
      
    </section>
  </div>
</template>

<script>
export default {
  name: "about",
  data: function () {
    return {
      m_sender: '',
      m_email: '',
      m_title: '',
      m_mail: ''
    }
  },
  head() {
    return {
      title: 'О сайте - Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Этот сайт - личный блог разработчика. Для меня это как тетрадь, доступная всему миру. Для вас, возможно, интересный сайт.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'личный, блог, разработка, описание, связаться'
        }
      ],
    };
  },
  methods: {
    async sendMail () {
      document.getElementById('loading').classList.add('on');
      let data = {
        name: this.m_sender,
        email: this.m_email,
        title: this.m_title,
        mail: this.m_mail,
        page: 'Помочь мне'
      }
      let res = await this.$api('info', 'sendMail', data);
      if (res === 'ok')
        alert('Письмо отправлено');
      else
        alert('Произошла ошибка' + res);

      document.getElementById('loading').classList.remove('on');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';
.about {
  display: flex;
  flex-wrap: wrap;

  .main-section {
    padding: 3em;
    position: relative;
    animation: 0.7s to-right;
    flex: 1;

    p {
      position: relative;
      animation: 0.7s to-right;
    }
    h2 {
      position: relative;
      animation: 0.7s to-right;
    }
  }

  .contacts {
    background-color: $black;
    padding: 2em 2em 2em 2em;
    height: 100vh;
    color: $white1;
    animation: 0.7s to-right;
    position: relative;
    flex: 1;
    max-width: 40%;
    min-width: 300px;

    .links {
      background-color: $black;
      color: $white1;
      padding: 1em 0;

    }


    img {
      filter: invert(100%);
      width: 0.8em;
      height: 0.8em;
      margin-left: 0.4em;
      cursor: pointer;
      opacity: .5;
      &:hover {
        opacity: 1;
      }
    }

    .contact-img {
      margin: 1em;

      z-index: 2;

      .img-box {
        display: block;
        margin: 0 auto;
        width: 30px;
        height: 30px;
        border: 1px solid $black;
        box-shadow: 7px 7px $black;
        text-align: center;
        z-index: 3;

      }

      &:before {
        content: "";
        height: 1px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        background-color: $black;
        z-index: -1;
      }
    }

    form {
      background-color: $white2;
      border: 1px solid $black;
      box-shadow: 7px 7px $white1;
      padding: 1em 2em;
      color: $black;
      margin-bottom: 2em;
    }

    h3 {
      @extend .font-style-2;
      font-size: 1.3em;
      text-align: center;
      margin: 0.75em;
      border: 1px solid $black;
      box-shadow: 7px 7px $black;
      padding: 0.2em 0.5em;
      background-color: transparent;
      min-width: max-content;
    }

    .form-str {
      display: flex;
      flex-wrap: wrap;
    }

    input, textarea {
      margin: 1em;
      border: 1px solid $black;
      box-shadow: 7px 7px $black, inset 0 0 0 50px $white2 !important;
      padding: 0.5em 0.5em;
      background-color: transparent;
      outline: none;
      min-width: 150px;
      display: block;
      flex: 1;
    }

    textarea {
      min-height: 7em;
    }

    button {
      margin: 1em;
      border: 1px solid $black;
      padding: 0.5em 1.5em;
      background-color: $black;
      box-shadow: 2px 2px $white2, 8px 8px $black;
      color: $white1;

      &:hover {
        border: 1px solid $black2;
        background-color: $black2;
        box-shadow: 2px 2px $white2, 8px 8px $black2;
      }
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
  }
}
</style>
