<template>
  <div class="guide-page" onclick="searchClick()" v-if="guide">
    <div class="content-header">
      <div>
        <h1 :first-word="guide.title">{{ guide.title }}</h1>
        <p>{{ guide.info }}</p>
      </div>
      <div>{{ countArts }} / {{ guide.arts.length }}</div>
    </div>

    <ol>
      <li v-for="art in guide.arts" :key="'g-art-' + art.id">
        <router-link :to="'/article/' + art.art_id" @click.native="clickLink(art.art_id)">
          <h2>{{ art.title }}</h2>
          <p>{{ art.description }}</p>
        </router-link>
      </li>
    </ol>
  </div>
  <div v-else>
    <div class="empty">
      <img src="/images/error.webp" alt="не найдено">
      <h2>Руководство не найдено.</h2>
      <p>Возможно запрос устарел или вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
        <router-link to="/about">"О нас"</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guide",
  data: function () {
    return {
      guide: null,
    }
  },
  head() {
    if (this.guide)
      return {
        title: this.guide.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.guide.info
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.guide.keywords
          },
          { hid: 'og:title', name: 'og:title', content: this.guide.title },
          { hid: 'og:type', name: 'og:title', content: 'article'},
          { hid: 'og:description', name: 'og:description', content:  this.guide.info }
        ],
      };
    else
      return {
        title: 'Руководство',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Описание руководства (Ошибка: не прогрузилась)'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'блог, гайд, руководство, разработка, обучение'
          },
          { hid: 'og:title', name: 'og:title', content: 'Гайд к обучению в блоге Conspectus'},
          { hid: 'og:type', name: 'og:title', content: 'article'},
          { hid: 'og:description', name: 'og:description', content: 'Научитесь всему, что нужно для начала работы в профессии веб-разработчик и начните зарабатывать.'}
        ],
      };
  },
  computed: {
    countArts () {
      let studied = this.$cookies.get('studied');
      let count = 0;

      if (studied) {
        this.guide.arts.forEach(el => {
          if (studied.includes(el.art_id)) {
            count++;
          }
        });
      }

      return count;
    }
  },
  methods: {
    async clickLink (id) {
      let study = this.$cookies.get('studied');
      if (!study) {
        study = id;
        this.$cookies.set('studied', study, {expires: '1Y', domain: '/'});
      }
      else if (!study.includes(id)) {
        study += ',' + id;
        this.$cookies.set('studied', study, {expires: '1Y', domain: '/'});
      }

      let visited = this.$cookies.get('visited');
      if (!visited) {
        visited = id;
        this.$cookies.set('visited', visited, {expires: '1Y', domain: '/'});
        await this.$api('articles', 'addPopularity', {id: id});
      }
      else if (!visited.includes(id)) {
        visited += ',' + id;
        this.$cookies.set('visited', visited, {expires: '1Y', domain: '/'});
        await this.$api('articles', 'addPopularity', {id: id});
      }
    }
  },
  async fetch() {
    if (this.$route.fullPath === '/guide-template') {
      this.guide = await this.$api('guides', 'get', {id: 'template'});
    } else {
      this.guide = await this.$api('guides', 'get', {id: this.$route.params.id});
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';
.guide-page {
  ol {
    list-style: none;
    counter-reset: my-awesome-counter;
    margin: 0;
    padding: 0;

    > li {
      counter-increment: my-awesome-counter;
      display: flex;
      margin-bottom: 2em;

      &:before {
        content: counter(my-awesome-counter) ;
        padding: 0.5em;
        background-color: $black;
        color: $white2;
        font-weight: bold;
        font-size: 1rem;
        text-align: center;
        display: flex;
        justify-content: left;
        flex-direction: column;
      }

      > a {
        flex: 1;
        &:hover {
          background-color: $white3;
          color: inherit;
          text-decoration: none;

        }
      }
    }
  }

  > .content-header > div:nth-child(2) {
    width: 3em;
    height: 3em;
    font-size: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $black;
    color: $white1;
    box-shadow: 20px 20px $black;
    cursor: pointer;
    transition: 0.5s all ease;
    border: 5px solid $white2;

    &:hover {
      box-shadow:  -20px -20px $black;
    }
  }

  ol {
    padding: 4em;
  }

  li {
    max-width: 1200px;
    margin: 0 0 0.5em 0;
    transition: 0.6s all ease;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  li > a {
    background: $white3;
    color: $black;
    padding: 1em;
    transition: 0.5s all ease;
    text-decoration: none;

    &.read {
      background: $white3;
      color: $black;
    }
  }

  > ol > li:before {
    font-size: 4em;
  }

  h2 {
    font-size: 1.6em !important;
    margin: 0;
    padding: 0;
  }
}
</style>
