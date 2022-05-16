<template>
  <div class="about" @click="$emit('upgrade-search', false)">
    <section class="main-section">
      <h1 first-word="О сайте">О сайте</h1>
      <p>Задача организации, в особенности же постоянное информационно-техническое обеспечение нашей деятельности обеспечивает актуальность ключевых компонентов планируемого обновления. Таким образом, сложившаяся структура организации требует от нас системного анализа модели развития!</p>
      <h2>Немного о создателе</h2>
      <p>Дорогие друзья, консультация с профессионалами из IT способствует подготовке и реализации соответствующих условий активизации. Задача организации, в особенности же постоянное информационно-техническое обеспечение нашей деятельности обеспечивает актуальность ключевых компонентов планируемого обновления.</p>
      <h2>О создании сайта</h2>
      <p>Таким образом, реализация намеченного плана развития играет важную роль в формировании системы масштабного изменения ряда параметров. Задача организации, в особенности же дальнейшее развитие различных форм деятельности напрямую зависит от экономической целесообразности принимаемых решений. Соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности позволяет оценить значение соответствующих условий активизации!</p>
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
        <div>
          <button type="submit">Отправить</button>
        </div>
      </form>
      <!--/noindex-->
      <b>Мой email:</b> <a href="mailto:swenliw@gmail.ru">swenliw@gmail.ru</a><br>
      <b>Мой telegram:</b> <a href="https://t.me/swenlii">t.me/swenlii</a><br>
      <b>Мой вк:</b> <a href="https://vk.com/swenlii">vk.com/swenlii</a> <br>
      <b>Мой github:</b> <a href="https://github.com/swenli">github.com/swenli</a> <br>
      <b>Мой сайт:</b> <a href="https://swenlii.com">swenlii.com</a> <br>
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
          content: 'Этот сайт - личный блог разработчика. Для меня это как тетрадь, доступная всему миру. Для вас, возможно, интересный сайт, учебник.'
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
    position: relative;animation: 2s to-right;
    flex: 1;

    p {
      position: relative;
      animation: 2s to-right;
    }
    h2 {
      position: relative;
      animation: 1s to-right;
    }
  }

  .contacts {
    background-color: $black;
    padding: 2em 2em 2em 2em;
    height: 100vh;
    color: $white1;
    animation: 1.7s to-right;
    position: relative;
    flex: 1;
    max-width: 40%;
    min-width: 480px;


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
  }
}
</style>
