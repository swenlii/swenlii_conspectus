<template>
  <div class="admin" @click="$emit('upgrade-search', false)">
    <section class="main-section">
      <h1 first-word="Страничка администратора">Страничка администратора</h1>
      <div class="login" v-if="admin === 'login'">
        <p>Для cначала давай проверим, что ты администратор.</p>
        <form v-on:submit.prevent="login()">
          <input type="name" placeholder="Введи никнейм..." v-model="user">
          <input type="pasword" placeholder="Введи свой пароль..." v-model="pass">
          <input type="submit">
        </form>
      </div>
      <div class="edit" v-else-if="admin === 'ok'">
        <h2>Что хочешь изменить?</h2>
        <p>Не забудь сохранить изменения. При перезагрузке страницы все данные будут стерты.</p>
        <div class="content">
          <div class="tabs">
            <input type="radio" name="art-add" id="art-add" value="art-add" v-model="tab">
            <label for="art-add">Добавление статьи</label>
            <input type="radio" name="art-ed" id="art-ed" value="art-ed" v-model="tab">
            <label for="art-ed">Редактирование статьи</label>
            <input type="radio" name="art-del" id="art-del" value="art-del" v-model="tab">
            <label for="art-del">Удаление статьи</label>

            <input type="radio" name="gui-add" id="gui-add" value="gui-add" v-model="tab">
            <label for="gui-add">Добавление гайда</label>
            <input type="radio" name="gui-ed" id="gui-ed" value="gui-ed" v-model="tab">
            <label for="gui-ed">Редактирование гайда</label>
            <input type="radio" name="cat-add" id="cat-add" value="cat-add" v-model="tab">
            <label for="cat-add">Добавление категории</label>
            <input type="radio" name="changs" id="changs" value="changs" v-model="tab">
            <label for="changs">Сообщить об изменениях на сайте</label>
          </div>
          <keep-alive>
            <add-art v-if="tab === 'art-add'"></add-art>
            <add-changes v-if="tab === 'changs'"></add-changes>
            <add-cat v-if="tab === 'cat-add'"></add-cat>
            <add-guide v-if="tab === 'gui-add'"></add-guide>
            <edit-art v-if="tab === 'art-ed'"></edit-art>
            <del-art v-if="tab === 'art-del'"></del-art>
            <edit-guide v-if="tab === 'gui-ed'"></edit-guide>
          </keep-alive>
          </div>
      </div>
      <div v-else-if="admin === 'error'">
        <div class="empty">
          <img src="/images/error.png" alt="не найдено">
          <h2>Неправильный логин и пароль.</h2>
          <p>Вы ввели неверный логин и пароль. Перезагрузите страницу и попробуйте заново. Убедитесь, что вводите все верно.
          </p>
        </div>
      </div>
      <div v-else>
        <div class="empty">
          <img src="/images/error2.png" alt="ошибка">
          <h2>Произошла ошибка.</h2>
          <p>Сервер вернул непредсказуемый результат. Свяжитесь с разработчиком на странице
            <router-link to="/about">"О нас"</router-link>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AddArt from '../components/addArt.vue';
import AddCat from '../components/addCat.vue';
import AddChanges from '../components/addChanges.vue';
import AddGuide from '../components/addGuide.vue';
import DelArt from '../components/delArt.vue';
import editArt from '../components/editArt.vue';
import EditGuide from '../components/editGuide.vue';
export default {
  components: { editArt, AddArt, AddCat, AddGuide, DelArt, EditGuide, AddChanges },
  name: 'admin',
  data: function () {
    return {
      admin: "login",
      user: '',
      pass: '',
      tab: ''
    }
  },
  async mounted() {

  },

  head() {
    return {
      title: 'Admin page',
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex,nofollow'
        }
      ],
    };
  },
  methods: {
    async login() {
      this.admin = await this.$api('info', 'adminLogin', {name: this.user, password: this.pass});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

  .admin {
    padding: 2em;
    height: 100vh;
    section {
      height: 100%;
    }
    h1 {
      margin-bottom: 1em;
    }
    .login {
      height: 80%;
      p {
        text-align: center;
      }
      form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 80%;
        input {
          display: block;
          background: transparent;
          border: none;
          border-bottom: 1px solid $black;
          padding: 0.5em 1.5em;
          margin: 0.3em;
          &:focus {
            border-bottom: 1px solid $black;
            outline: none;
          }
        }

        input[type="submit"]{
          background: $black;
          color: $white1;
          margin-top: 1.5em;
          &:hover {
            background: $black2;
            border: 1px solid $black2;
          }
        }
      }
      
      
    }

    .edit {
      .content {
        display: flex;
        align-items: flex-start;
      }
      .tabs {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border: 1px solid $black;
        margin-top: 3em;
      }
      input[type="radio"] {
        display: none;
        & + label {
          display: block;
          padding: 0.7em 1em;
          width: 250px;
          max-width: 250px;
          position: relative;
        }

        &:checked + label {
          background: $black;
          color: $white1;
        }
      }
    }
  }
</style>
