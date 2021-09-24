<template>
  <div class="help-page" @click="$emit('upgrade-search', false)">
    <div>
      <h1 first-word="Помочь мне?">Помочь мне?</h1>
      <p class="main-p">Вам нравится сайт? Может вас заинтересовал создатель сайта? Или вы просто по доброте душевной хотите помочь? Эта страница содержит информацию о том, как вы можете мне помочь.</p>
      <ol>
        <li>
          <div>
            <h2>Донаты</h2>
            <p>На разработку и поддержание блога уходит много работы и времени, а денег он не приносит совсем. Если вам захотелось поддержать разработчика монетой, для вас есть несколько способов это сделать</p>
            <ul>
              <li>На карту банка: 9032 4098 2042 3445<img alt="copy" @click="copyText('some text here')" src="/images/icons/copy.png"></li>
              <li>Карта "Сбербанк" по номеру телефона:  +7(904)237-47-04<img alt="copy" @click="copyText('+79042374704')" src="/images/icons/copy.png"></li>
              <li>На телефон: +7(904)237-47-04<img alt="copy" @click="copyText('+79042374704')" src="/images/icons/copy.png"></li>
            </ul>
          </div>
        </li>
        <li>
          <div>
            <h2>Помощь с багами</h2>
            <p>У вас есть предложения относительно того, что нужно доработать в сайте? Вы обнаружили баг? Вы опытны в разработке и хотите предложить помочь с кодом? Или вам нужно сообщить что-то разработчику? Напишите письмо в форме ниже.</p>
            <details>
              <summary class="block-link">Свяжитесь со мной</summary>
              <!--noindex-->
              <form v-on:submit.prevent="sendMail()">
                <div class="form-str">
                  <input type="text" placeholder="Имя" autocomplete="name" v-model="m_sender" required>
                  <input type="email" placeholder="Email" autocomplete="email" v-model="m_email" required>
                </div>
                <div class="form-str">
                  <input type="text" placeholder="Заголовок" v-model="m_title" required>
                </div>
                <div class="form-str">
                  <textarea placeholder="Текст" v-model="m_mail" minlength="5" required></textarea>
                </div>
                <div>
                  <button type="submit">Отправить</button>
                </div>
              </form>
              <!--/noindex-->
            </details>
          </div>
        </li>
        <li>
          <div>
            <h2>Работа</h2>
            <p>Понравился сайт? Хотите такой же? Если у вас есть вакансия или проект, за который я могу взяться, смело переходите в мое портфолио!</p>
            <div class="link"><a href="#">В портфолио</a></div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "help-me",
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
      title: 'Помочь мне - Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Эта страница содержит информацию о том, как вы можете мне помочь.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'блог, разработчик, помочь, донат'
        }
      ],
    };
  },
  methods: {
    copyText (text) {
      let input = document.body.appendChild(document.createElement("input"));
      input.value = text;
      input.focus();
      input.select();
      document.execCommand('copy');
      input.parentNode.removeChild(input);
    },
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
.help-page {
  padding: 2em 0;
  background-color: $black;

  p {
    max-width: 1000px;
    &.main-p{
      margin: 0 auto;
      max-width: 600px;
      text-align: center;
    }
  }


  & > div {
    background-color: $white2;
    padding: 1em 5em;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    animation: 2s to-top, 3s to-page;
    position: relative;
  }

  ol {
    list-style: none;
    counter-reset: my-awesome-counter;
    margin: 0;
    padding: 0;

    > li {
      counter-increment: my-awesome-counter;
      margin-bottom: 3em;

      &:before {
        @extend .font-style-2;
        content: counter(my-awesome-counter) ".";
        padding: 0.3em;
        background-color: $black;
        color: $white1;
        height: max-content;
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
        width: 100%;
        margin-right: 5rem;
        display: flex;
        justify-content: left;
        flex-direction: column;
        margin-top: 1em;
      }

      > div {
        flex: 1;
      }
    }
  }

  h3 {
    font-size: 1.5em;
  }

  ul li {
    position: relative;

    &:hover {
      text-decoration: underline;
    }

    img {
      position: absolute;
      top: 20%;
      width: 0.8em;
      height: 0.8em;
      margin-left: 0.4em;
      cursor: pointer;
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }

    &:hover:after {

    }
  }

  a, summary {
    text-align: center;
    background-color: $white3;
    padding: 0.7em 1.5em;
    transition: 0.6s all ease;
    text-decoration: none;
    letter-spacing: 0.08em;
    cursor: pointer;

    &:hover {
      background-color: $black3;
      color: $white1;
      text-decoration: none;
      letter-spacing: 0.16em;
    }

    &:active {
      background-color: $black;
      color: $white1;
      text-decoration: none;
      letter-spacing: 0.2em;
    }
  }

  details form {
    background-color: $white3;
    padding: 0.7em 1.5em;

    .form-str {
      display: flex;
    }

    input, textarea {
      width: 100%;
      margin: 1em;
      border: none;
      border-bottom: 1px solid $black;
      padding: 0.5em 0.5em;
      background-color: transparent;
      outline: none;
      box-shadow: inset 0 0 0 50px $white3 !important;
    }

    textarea {
      min-height: 7em;
    }

    button {
      cursor: pointer;
      background-color: transparent;
      margin: 1em;
      border: 1px solid $black;
      padding: 0.5em 1.5em;
      transition: 0.6s all ease;

      &:hover {
        box-shadow: 2px 2px $white3, 3px 3px $black, 5px 5px $white3, 6px 6px $black;
      }

      &:active {
        box-shadow: 2px 2px $white3, 3px 3px $black;
        transition: 0.1s all ease;
      }
    }
  }
}
</style>
