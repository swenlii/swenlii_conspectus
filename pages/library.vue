<template>
  <div class="library-page"  @click="$emit('upgrade-search', false)">
    <div class="content-header">
      <div>
        <h1 first-word="Бибилеотка">Библиотека</h1>
        <p>Немного сумбурного материала, статей, не объедененных в учебники. Дополнительные материалы, учебные статьи, важная информация и так далее.</p>
      </div>
      <div>
        <img src="/images/library-2.webp" alt="">
      </div>
    </div>

    <div class="library-content" v-if="arts && arts.length > 0">
      <div style="display: none;"></div>
      <router-link :to="'/article/' + art.art_id" v-for="art in arts" :key="'library-art-' + art.id" @click.native="clickLink(art.art_id)">
        <h2>{{ art.title }}</h2>
        <p>{{ art.description }}</p>
      </router-link>

    </div>
    <div v-else>
      <div class="empty">
        <img src="/images/empty.webp" alt="не найдено">
        <h2>Ничего не найдено.</h2>
        <p>Возможно запрос устарел или вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
          <router-link to="/about">"О нас"</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Library",
  head() {
    return {
      title: 'Библиотека - Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Немного сумбурного материала, не объедененного в учебники. Дополнительные материалы, учебные статьи и так далее.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'дополнительно, материалы, конспект, статьи, программирование'
        }
      ],
    };
  },
  data: function () {
    return {
      arts: null
    }
  },
  methods: {
    async clickLink (id) {
      let visited = this.$cookies.get('visited');
      if (!visited) {
        visited = id;
        this.$cookies.set('visited', visited);
        await this.$api('articles', 'addPopularity', {id: id});
      }
      else if (!visited.includes(id)) {
        visited += ',' + id;
        this.$cookies.set('visited', visited);
        await this.$api('articles', 'addPopularity', {id: id});
      }
    }
  },
  async fetch () {
    this.arts = await this.$api('info', 'library');
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';
.library-page {
  .content-header img {
    object-fit:cover;
    filter: grayscale(100%);
  }
}
.library-content {
  padding: 1em 3em;
  position: relative;
  animation: 0.6s to-top;

  h2 {
    @extend .font-style-4;
    font-size: 2em;
    margin: 0.4em 0 0 0;
  }

  > a {
    padding: 0.5em 2em;
    margin-bottom: 2em;
    position: relative;
    box-shadow: -1px 1px $white2;
    transition: 0.5s all ease;
    top: 0;
    left: 0;
    cursor: pointer;
    background-color: $white3;
    display: block;
    text-decoration: none;

    &:visited {
      color: #5f5f5f !important;
    }

    &:hover {
      text-decoration: none;
      background-color: $white3;
      box-shadow: 0 15px 10px $white3;
      transform: scale(1.07);
    }

    &:active {
      box-shadow: 0 5px 10px $white3;
      transform: scale(1.07);
      transition: 0.1s all ease;
    }
  }
}
</style>
