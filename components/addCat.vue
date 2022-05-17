<template>
  <div class="add-cat">
    <h2>ДОБАВЛЕНИЕ КАТЕГОРИИ</h2>
    * - обязательны к заполнению
    <form v-on:submit.prevent="addCatNow()">
      <div>
        <label>Ссылка*</label>
        <input type="text" name="catLink" v-model="catLink" placeholder="name-of-cat" required>
      </div>
      <div>
        <label>Имя*</label>
        <input type="text" name="catName" v-model="catName" placeholder="Имя категории" required>
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
  name: 'addCat',
  data: function () {
    return {
      catLink: '',
      catName: ''
    }
  },

  methods: {
    async addCatNow() {
      console.log("add category");
      let data = {
        catLink: this.catLink,
        catName: this.catName
      }
      document.getElementById('loading').classList.add('on');
      let res = await this.$api('info', 'addcat', data);
      console.log(res);
      if (res === 'ok')
        alert('Категория добавлена!')
      else 
        alert(res);

      document.getElementById('loading').classList.remove('on');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.add-cat {
  padding: 2em;
  flex: 1;
  form {
    div {
      display: flex;
      margin: 1.2em 0;
    }
    label {
      display: block;
      width: 300px;
    }
    input {
      display: block;
      background: transparent;
      border: none;
      width: 400px;
      border-bottom: 1px solid $black2;
      &:focus {
        outline: none;
      }
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
      background-image: url("/images/icons/time.png");
      background-size: contain;
      margin: 0.5em;
      opacity: 0;
      
      &.on {
        opacity: 1;
        animation: load 0.9s infinite ;
      }
    }
  }
}
</style>
