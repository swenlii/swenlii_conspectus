<template>
  <div class="articles" @click="$emit('upgrade-search', false)">
    <div class="content">
      <div class="arts-header">
        <h1 :first-word="this.search ? 'Поиск по запросу «' + this.search + '»' : this.category ? this.category : 'Все статьи'">{{ this.search ? 'Поиск по запросу «' + this.search + '»' : this.category ? this.category : 'Все статьи' }}</h1>
        <span>Найдено {{ artLength }} статей</span>
      </div>
      <div class="all-content">
        <div class="sort-block">
        <div class="filters-1">
          <div class="search-arts">
            <input type="text" ref="input" placeholder="Поиск" @keydown="(event) => { if (event.key === 'Enter') searchClick() }" id="search-inp" :value="this.search">
            <span class="link" @click="searchClick()"><img src="/images/icons/find.webp" alt="search"></span>
          </div>
          <div class="select-box">
            <button id="select-button" v-on:click="sortOpen === 1 ? sortOpen = 0 : sortOpen = 1" :style="this.sortOpen === 1 ? 'border-bottom: none' : ''">{{ this.sorting[this.sort] ? this.sorting[this.sort] : 'Сортировка' }}</button>
            <div class="options" id="sort-select-cont" v-show="this.sortOpen === 1">
              <div v-for="(val, name) in this.sorting" :key="'sort' + name">
                <input type="radio" name="sort-arts" :value="val" :id="'sort-op-' + name">
                <label for="'sort-op-' + name" v-on:click="() => sortOpClick(name)">{{ val }}</label>
              </div>
            </div>
          </div>

          <div class="select-box">
            <button id="cat-button" v-on:click="catOpen === 1 ? catOpen = 0 : catOpen = 1" :style="this.catOpen === 1 ? 'border-bottom: none' : ''">{{ searchCategory(this.category) }}</button>
            <div class="options" id="cat-select-cont" v-show="this.catOpen === 1">
              <div v-for="(cat, ind) in categories" :key="'xnjnj' + ind">
                <input type="radio" name="sort-arts" :value="cat.link" :id="'cat-op-' + cat.link" :checked="category === cat.link">
                <label :for="'cat-op-' + cat.link" v-on:click="catOpClick(cat.link)">{{ cat.text }}</label>
              </div>
            </div>
          </div>

          <div>
            <div class="checkbox" v-if="this.pagePath !== 'tags'">
              <input type="checkbox" id="show-tags" v-model="showTags">
              <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
              </svg>
              <label for="show-tags">Показать теги</label>
            </div>

          </div>
          <div class="checkbox" v-if="this.search">
            <input type="checkbox" @change="searchInsClick ()" id="in-art" v-model="searchInside">
            <svg viewBox="0 0 21 21">
              <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
            </svg>
            <label for="in-art">Искать в статье</label>
          </div>


        </div>
        <div class="filters-2" v-if="(this.pagePath && this.pagePath === 'tags') || this.showTags">
          <div v-for="(tag, ind) in this.avalTags" :key="'tags' + ind">
            <input v-model="tagsArr" @change="tagClick ()" :value="tag" type="checkbox" :id="'tag' + ind">
            <label :for="'tag' + ind">{{tag}}</label>
          </div>
        </div>

      </div>
      <div class="empty" v-if="this.selArts.length === 0">
        <img src="/images/empty.webp" alt="не найдено">
        <h2>Ничего не найдено.</h2>
        <p>Возможно вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
          <router-link to="/about">"О нас"</router-link>
        </p>
      </div>
      <div class="articles-list" v-if="this.selArts.length > 0">
        <div :class="(art.description && art.description.length < 220) || !art.img ? 'one-article' : 'one-article full'" v-for="(art, ind) in this.selArts" :key="'art' + ind">
          <div class="photo" v-if="art.img">
            <img :src="'/images/articles/' + art.img" alt="">
          </div>
          <div>
            <h2 v-html="art.title"></h2>
            <div v-if="(pagePath && pagePath === 'tags') || showTags" style="margin: 1em 0 0.3em 0">
              <span class="tag" v-for="tag in art.tags" :key="'arttag' + tag">{{tag}}</span>
            </div>
            <p v-html="art.description"></p>
            <router-link :to="'/article/' + art.art_id" @click.native="clickLink(art.art_id)">Читать</router-link>
          </div>
        </div>
        <div class="learn-more">
          <button  v-if="artCount >= 15 && artCount <= artLength" @click="learnMore()">Загрузить больше</button>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlesList",
  data: function () {
    return {
      pagePath: '',
      artCount: 0,
      artLength: 0,
      search: null,
      sort: null,
      category: null,
      tags: null,
      sorting: {
        'pop': 'По популярности',
        'old': 'Старые',
        'new': 'Новые',
        'az': 'По алфавиту (А-Я)',
        'za': 'По алфавиту (Я-А)'
      },
      sortOpen: 0,

      categories: {
        'html': 'HTML',
        'css': 'CSS',
        'server': 'Сервер',
        'bd': 'Базы данных'
      },
      catOpen: 0,

      showTags: false,
      tagsArr: [], // выбранные теги
      searchInside: false,
      articles: [], // все статьи (сортировка происходит на месте)
    }
  },
  head() {
    return {
      title: this.search ? 'Поиск по запросу «' + this.search + '»' : this.category ? this.category : 'Все статьи',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Все статьи блога, посвященного программированию. ' + this.search ? 'Поиск по запросу «' + this.search + '»' : '' + this.category ? 'В категории ' + this.category : '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'блог, статьи, разработка, обучение, программирование' + this.category ? ', ' + this.category : ''
        }
      ],
    };
  },
  async fetch() {
    this.pagePath = this.$route.path.slice(1);
    if (this.$route.query.search)
      this.search = this.$route.query.search;
    if (this.$route.query.sort)
      this.sort = this.$route.query.sort;
    if (this.$route.query.category)
      this.category = this.$route.query.category;
    if (this.$route.query.tags)
      this.tagsArr = this.$route.query.tags.split('-');
    if (this.$route.query.inside)
      this.searchInside = true;
    try {
      this.articles = await this.$api("articles", "index");
    } catch (e) {
      console.error("articles.vue: " + e);
    }
  },
  methods: {
    // переключение на сортировку
    sortOpClick (sortop) {
      this.sortOpen = 0;
      const query = Object.assign({}, this.$route.query);
      query.sort = sortop;
      this.$router.push({path: this.$route.path, query: query});
    },
    // переключение на категорию
    catOpClick (cat) {
      this.catOpen = 0;
      const query = Object.assign({}, this.$route.query);
      query.category = cat;
      this.$router.push({path: this.$route.path, query: query});
    },
    // начать поиск
    searchClick () {
      const query = Object.assign({}, this.$route.query);
      if (document.getElementById('search-inp').value.length > 0)
        query.search = document.getElementById('search-inp').value;
      else
        delete query.search;
      this.$router.push({path: this.$route.path, query: query});
    },
    // отсортировать по тегам
    tagClick () {
      const query = Object.assign({}, this.$route.query);
      query.tags = this.tagsArr.join('-');
      if (query.tags.length === 0) delete query.tags;
      this.$router.push({path: this.$route.path, query: query});
    },
    // искать в статье
    searchInsClick () {
      const query = Object.assign({}, this.$route.query);
      if (query.inside) {
        delete query.inside
      } else {
        query.inside = 'true';
      }
      this.$router.push({path: this.$route.path, query: query});
    },
    // ПЕРЕХОДИМ В СТАТЬЮ
    async clickLink (id) {
    },
    // загрузить еще статьи
    async learnMore () {
      this.artCount += 15;
    },

    artsBySearch (arts) {
      let ret = [];
      arts.forEach(el => {
        const regex = new RegExp(this.search, 'gi');
        el.title = el.title.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
        el.description = el.description.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

        if (el.title.toLowerCase().includes(this.search.toLowerCase()) || el.description.toLowerCase().includes(this.search.toLowerCase())) {
          ret.push(el);
          // выделить текст в desc или title
          el.title = el.title.replace(regex, '<mark class="highlight">$&</mark>');
          el.description = el.description.replace(regex, '<mark class="highlight">$&</mark>');

        } else if (this.searchInside && el.file.length !== 0) {
          let content = el.html;
          if (content.toLowerCase().includes(this.search.toLowerCase())) {
            ret.push(el);
          }
        }
      });
      return ret;
    },
    artsByCat (arts) {
      let ret = [];
      arts.forEach(el => {
        if (el.categories && el.categories.length !== 0) {
          if (el.categories.includes(this.category))
            ret.push(el);
        }
      });
      return ret;
    },
    artsByTag (arts) {
      let ret = [];

      arts.forEach(el => {
        let inclTag = this.tagsArr.some ((tag) => {
          return el.tags.includes(tag)
        });
        if (inclTag) ret.push(el);
      });
      return ret;
    },
    sortArts (arts) {
      if (this.sort === 'old') {
        arts.sort(function(a,b) {
          let da = a.date2.split('.').reverse().join('');
          let db = b.date2.split('.').reverse().join('');
          return da > db ? 1 : da < db ? -1 : 0;
        });
      } else if (this.sort === 'new') {
        arts.sort(function(a,b) {
          let da = a.date2.split('.').reverse().join('');
          let db = b.date2.split('.').reverse().join('');
          return da < db ? 1 : da > db ? -1 : 0;
        });
      } else if (this.sort === 'az') {
        arts.sort(function (a,b) {
          return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
        });
      } else if (this.sort === 'za') {
        arts.sort(function (a,b) {
          return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
        });
      } else if (this.sort === 'pop') {
        arts.sort(function (a,b) {
          return a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0;
        });
      }
    },

    searchCategory (link) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].link === link) {
          return this.categories[i].text;
        }
      }
      return 'Категории'
    }
  },
  async mounted () {
    this.categories = await this.$api('info', 'categories');
  },
  computed: {
    selArts () {
      let arts = this.articles;
      if (arts.length === 0) return [];
      if (this.search && this.search.length > 0 && arts.length > 0) { // только содержащие поисковую строку
        arts = this.artsBySearch(arts);
      }
      if (this.category && this.category.length && arts.length > 0) { // только в выбранной категории
        arts = this.artsByCat(arts);
      }
      if (this.tagsArr.length > 0 && arts.length > 0) { // только содержащие хотя бы один из выбранных тегов
        arts = this.artsByTag(arts);
      }
      if (arts.length > 0)
        this.sortArts(arts);

      this.artLength = arts.length;

      if (arts.length > 15) {
        if (this.artCount === 0) this.artCount = 15;
        return arts.slice(0, this.artCount);
      }
      else return arts;
    },
    avalTags () {
      let tags = [];
      let alltags = [];

      this.articles.forEach(el => {
        if (el.tags) {
          if (typeof el.tags === 'string')
            el.tags = el.tags.split(',');
          el.tags.forEach(c => {
            if (!alltags.includes(c)) alltags.push(c);
          });
        }
      });

      this.selArts.forEach(el => {
        if (el.tags) {
          if (typeof el.tags === 'string')
            el.tags = el.tags.split(',');
          el.tags.forEach(c => {
            if (!tags.includes(c)) tags.push(c);
          });
        }
      });

      if (tags.length > 0) {
        return tags;
      } else {
        return alltags;
      }
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';
.articles {
  .empty {
    max-width: 600px;
    margin: 5em auto;
    h2 {
      @extend .font-style-2;
    }
    img{
      float: right;
      width: 230px;
      filter: grayscale(100%);
    }
  }

  .content {
    padding: 3em;
    display: block;
  }

  .arts-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1em;
  }


  .sort-block {
    margin: 2em 1em;
    padding: 0.5em 1em 0.8em 1em;
    background-color: $black;
    color: $white1;
    animation: 1s to-page;

    .filters-1 {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      & > div {
        margin: 0.7em 0.7em;
      }
    }

    .filters-2 {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      input[type="checkbox"] {
        width: 0;
        height: 0;
        position: absolute;
        opacity: 0;
        &:checked + label {
          color: $black;
          &:before {
            opacity: 1;
            width: 96%;
          }
        }
      }

      label {
        padding: 0 0.3em;
        margin: 0 10px;
        display: inline-block;
        color: $white1;
        position: relative;
        border-bottom: 1px double $black;
        transition: 0.5s all ease;
        z-index: 2;
        &:before {
          content: "";
          position: absolute;
          height: 100%;
          z-index: -1;
          width: 0;
          background-color: $white1;
          border: 2px solid $black;
          display: none;
          box-shadow: 1px 1px $white1, -1px -1px $white1, -1px 1px $white1, 1px -1px $white1;
          top: 0;
          left: 0;
          transition: 0.5s all ease;
        }
      }
    }

    .checkbox {
      margin-top: 0.8em;
    }

    .search-arts {
      position: relative;
      margin-top: 0.8em;
      input[type="text"] {
        background-color:transparent;
        outline: none;
        border: 1px solid $white1;
        width: 200px;
        padding: 0.5em 0.5em;
        @extend .font-style-3;
        color: $white1;
      }
      .link {
        position: absolute;
        top: 10px;
        right: 1.3em;
        cursor: pointer;
        img {
          width: 25px;
          filter: brightness(0%) invert(100%);
        }
      }
    }

    .select-box {
      position: relative;
      margin-top: 0.8em;
      z-index: 3;

      button {
        padding: 0.5em 0.5em;
        background-color: $black;
        border: 1px solid $white1;
        color: $white1;
        width: 200px;


        &:focus ~ .options {
          display: block;
          border-bottom: 1px solid $black;
        }
      }

      .options {
        position: absolute;
        top: calc(100%);
        background-color: $black;
        color: $white1;
        width: 100%;
        border: 1px solid $white1;
        border-top: none;
        animation: 1s option-show;
        overflow: hidden;
        z-index: 5;

        input {
          display: none;
          position: absolute;

          &:checked + label:before {
            content: '✓';
            position: absolute;
            left: 5px;
            color: $white1;
          }
        }

        label{
          cursor: pointer;
          display: block;
          padding: 0.5em 1em 0.5em 1.3em;
          width: 100%;
          position: relative;

          &:hover {
            background-color: $black2;
            cursor:pointer;
          }
        }
      }
    }
  }

  .one-article {
    background-color: #c1c1c1;
    /* width: calc(50% - 2em); */
    margin: 1em 1em 1em 1em;
    padding: 1em 1.5em;
    flex-direction: row-reverse;
    justify-content: space-between;
    border: 1px solid #c1c1c1;
    transition: 0.7s all ease;
    box-shadow: 4px 4px #dedede, 8px 8px #c1c1c1, 12px 12px #dedede, 16px 16px #c1c1c1;
    flex: 1;
    min-width: 300px;

    &:hover {
      border: 1px solid $black;
      box-shadow: 4px 4px $white2, 8px 8px $black,
    }

    &.full {
      min-width: 90%;
    }

    h2 {
      @extend .font-style-4;
      margin: 0;
      font-weight: 700;
      font-size: 1.8rem;
    }

    p {
      margin: 0.7em 0;
    }

    .photo {
      float: right;
      height: max-content;
    }

    img {
      width: 300px;
      max-width: 100%;
      filter: grayscale(100%);
    }

    .tag {
      background-color: $black;
      color: $white1;
      text-decoration: none;
      padding: 0.2em 0.7em;
      font-size: 0.8em;
      margin: 0.2em;
      display: inline-block;
    }

    a {
      padding: 0.5em 1em;
      display: inline-block;
      background: $black;
      color: $white1;
      position: relative;
      text-decoration: none;
      top: 0;
      left: 0;
      box-shadow: -2px 2px $white3, -5px 5px $black;
      margin-top: 0.2em;
      &:visited {
        color: $white3;
      }
      &:hover {
        box-shadow: -2px 2px $white3, -10px 10px $black;
      }
    }
  }

  .learn-more {
    display: flex;
    padding: 2em;
    justify-content: center;
    align-content: center;
    width: 100%;
    button {
      padding: 1em 3em;
      background-color: $black;
      color: $white1;
      font-size: 1.3em;
    }
  }

  .articles-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    animation: 0.6s to-top;
    justify-content: stretch;
  }
}
</style>
