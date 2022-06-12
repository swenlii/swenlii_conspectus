<template>
  <div class="add-guide">
    <h2>ДОБАВЛЕНИЕ ГАЙДА</h2>
    * - обязательны к заполнению
    <form v-on:submit.prevent="addGuideNow()">
      <div>
        <label>ID*</label>
        <input type="text" name="guideID" v-model="guideId" placeholder="name-of-guide" required>
      </div>
      <div>
        <label>Имя*</label>
        <input type="text" name="guideName" v-model="guideName" placeholder="Имя гайда" required>
      </div>
      <div>
        <label>Ключевые слова* (для роботов)</label>
        <input type="text" name="guideKey" v-model="guideKey" placeholder="key1, ключ2, ..." required>
      </div>
      <div>
        <label>Тип*</label>
        <input type="radio" id="guideFront" name="guideType" value="front" v-model="guideType" required> <label for="guideFront">Front</label>
        <input type="radio" id="guideBack" name="guideType" value="back" v-model="guideType" required> <label for="guideBack">Back</label>
      </div>
      <div>
          <label>Описание*<br>(отображается в учебнике)</label>
          <textarea name="guideDesc" v-model="guideDesc" minlength="100" required></textarea>
      </div>
      <div>
        <label>Краткая информация*<br>(отображается на странице самого гайда)</label>
        <textarea maxlength="400" name="guideInfo" v-model="guideInfo" minlength="50" required></textarea>
      </div>
      <div>
        <label>Добавь статьи в гайд*</label>
        <select @change="addArt($event)" v-if="articles">
          <option selected disabled hidden>Статьи</option>
          <option v-for="(art, i) in articles" :value="i" :key="'op-' + art.art_id">{{art.title}}</option>
        </select>
      </div>
      <h2  v-if="guideArts && guideArts.length > 0">СТАТЬИ</h2>
      <div v-for="art in guideArts" :key="'guideArt' + art.id" class="add-arts">
        <h3>{{art.title}}</h3>
        <div>
          <label>Заголовок статьи* <br>(Отображается в гайде)</label>
          <input type="text" name="guideName" v-model="art.titleForGuide" placeholder="Имя для гайда" required>
        </div>
        <div>
          <label>Шаг* <br>(Порядок отображения в гайде)</label>
          <input type="number" name="guideStep" v-model="art.step" placeholder="Шаг статьи" required>
        </div>
        <div>
          <label>Описание статьи* <br>(Отображается в гайде)</label>
          <textarea name="guideDesc" v-model="art.descForGuide" required></textarea>
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
  name: 'addGuide',
  data: function () {
    return {
      articles: null,
      guideId: '',
      guideName: '',
      guideType: 'front',
      guideDesc: '',
      guideInfo: '',
      guideKey: '',
      guideArts: []
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
    async addGuideNow () {
      let data = {
        guideId: this.guideId,
        guideTitle: this.guideName,
        guideDesc: this.guideDesc,
        guideInfo: this.guideInfo,
        guideType: this.guideType,
        guideKey: this.guideKey,
        guideArts: this.guideArts
      }
      document.getElementById('loading').classList.add('on');
      let res = await this.$api('guides', 'add', data);
      if (res === 'ok')
        alert('Добавлен новый гайд.')
      else 
        alert(res);

      document.getElementById('loading').classList.remove('on');
    },
    addArt (event) {
      this.guideArts.push ({
        id: this.articles[event.target.value].art_id,
        title: this.articles[event.target.value].title,
        titleForGuide: this.articles[event.target.value].title,
        descForGuide: this.articles[event.target.value].description,
        step: '0'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.add-guide {
  padding: 2em;
  flex: 1;
  form {
    & > div {
      margin: 1.2em 0;
      display: flex;
    }
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

    input[type="radio"]  {
      width: 30px;
      & + label {
        width: auto;
      }
    }
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

      #loading {
      width: 30px;
      height: 30px;
      background-image: url("/images/icons/time.webp");
      background-size: contain;
      margin: 0.5em;
      opacity: 0;

      .submit {
        display: flex;
      }
      
      &.on {
        opacity: 1;
        animation: load 0.9s infinite ;
      }
    }
  }
  .add-arts {
    padding: 0.7em 1.3em;
    display: block;
    border: 1px solid $black;
    & > div {
      display: flex;
      margin: 1.2em 0;
      textarea {
        flex: 1;
      }
    }
  }
}
</style>
