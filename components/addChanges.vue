<template>
  <div class="add-changes">
    <h2>СООБЩИТЬ ОБ ИЗМЕНЕНИЯХ НА САЙТЕ</h2>
    * - обязательны к заполнению
    <form v-on:submit.prevent="addCatNow()">
      <div>
        <label>Название изменений*</label>
        <input type="text" name="catLink" v-model="changesName" placeholder="Новые изменения на сайте" required>
      </div>
      <div>
        <label>Изменения*</label>
        <textarea name="catName" v-model="changesText" required></textarea>
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
      changesName: '',
      changesText: `<ul>
  <li>1</li>
  <li>2</li>
</ul>
      `
    }
  },

  methods: {
    async addCatNow() {
      let data = {
        changesName: this.changesName,
        changesText: this.changesText
      }
      document.getElementById('loading').classList.add('on');
      let res = await this.$api('info', 'addchanges', data);
      if (res === 'ok')
        alert('Изменения зафиксированны!')
      else 
        alert(res);

      document.getElementById('loading').classList.remove('on');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.add-changes {
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
    input, textarea {
      display: block;
      background: transparent;
      border: none;
      width: 400px;
      border-bottom: 1px solid $black2;
      &:focus {
        outline: none;
      }
    }
    textarea {
      border: 1px solid $black2;
      flex: 1;
      height: 300px;
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
}
</style>

