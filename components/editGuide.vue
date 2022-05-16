<template>
  <div class="edit-guide">
    <h2>РЕДАКТИРОВАНИЕ ГАЙДА</h2>
    * - обязательны к заполнению
    <div>
      <label>Выбери гайд*</label>
      <select @change="changeGuide($event)" v-if="guides">
        <option selected disabled hidden>Гайды</option>
        <option v-for="(g, i) in guides" :value="i" :key="'g-' + g.guide_id">{{g.title}}</option>
      </select>
    </div>
    <form v-on:submit.prevent="editGuideNow()" v-if="guideId.length > 0">
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
      <div v-for="(art, ind) in guideArts" :key="'guideArt' + art.art_id" class="add-arts">
        <h3>{{art.title}}</h3>
        <div>
          <label>ID статьи* <br>(Отображается в гайде)</label>
          <div>{{art.art_id}}</div>
        </div>
        <div>
          <label>Заголовок статьи* <br>(Отображается в гайде)</label>
          <input type="text" name="guideName" v-model="art.title" placeholder="Имя для гайда" required>
        </div>
        <div>
          <label>Шаг* <br>(Порядок отображения в гайде)</label>
          <input type="number" name="guideStep" v-model="art.step" placeholder="Шаг статьи" required>
        </div>
        <div>
          <label>Описание статьи* <br>(Отображается в гайде)</label>
          <textarea name="guideDesc" v-model="art.desc" required></textarea>
        </div>
        <div>
          <button @click.delete="() => deleteArt(ind, art.id)">Удалить</button>
        </div>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'editGuide',
  data: function () {
    return {
      guides: null,
      articles: null,

      guideId: '',
      guideName: '',
      guideType: 'front',
      guideDesc: '',
      guideInfo: '',
      guideKey: '',
      guideArts: [],
      delArts: []
    }
  },
  async fetch() {
    try {
      this.guides = await this.$api("guides", "index");
      this.articles = await this.$api("articles", "index");
    } catch (e) {
      console.error("editGuide.vue: " + e);
    }
  },

  methods: {
    async editGuideNow () {
      let data = {
        guideId: this.guideId,
        guideTitle: this.guideName,
        guideDesc: this.guideDesc,
        guideInfo: this.guideInfo,
        guideType: this.guideType,
        guideKey: this.guideKey,
        guideArts: this.guideArts,
        delArts: this.delArts.length > 0 ? this.delArts : null
      }

      let res = await this.$api('guides', 'edit', data);
      console.log(res);
      if (res === 'ok')
        alert('Гайд отредактирован.')
      else 
        alert(res);
    },
    changeGuide (event) {
      this.guideId = this.guides[event.target.value].guide_id;
      this.guideName = this.guides[event.target.value].title;
      this.guideType = this.guides[event.target.value].type;
      this.guideDesc = this.guides[event.target.value].desc;
      this.guideInfo = this.guides[event.target.value].info;
      this.guideKey= this.guides[event.target.value].keywords;

      this.guideArts = this.guides[event.target.value].arts;
    },
    addArt (event) {
      console.log('add ' + this.articles[event.target.value].title);
      this.guideArts.push ({
        id: this.articles[event.target.value].art_id,
        title: this.articles[event.target.value].title,
        desc: this.articles[event.target.value].description,
        step: '0'
      })
    },
    deleteArt (ind, id) {
      this.guideArts.splice(ind, 1); 
      this.delArts.push(id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.edit-guide {
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
    input[type="submit"], 
    button {
        background: $black;
        color: $white1;
        margin: 0.5em;
        border: none;
        padding: 0.2em 0.7em;
        cursor: pointer;
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
