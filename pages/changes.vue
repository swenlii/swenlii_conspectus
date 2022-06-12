<template>
  <div class="changes" @click="$emit('upgrade-search', false)">
    <div class="content-header">
      <div>
        <h1 first-word="Изменения на сайте">Изменения на сайте Conspectus</h1>
        <p>Страничка для неравнодушных. Отслеживайте новые функции сайта Conspectus, новые статьи и руководства на этой странице.</p>
      </div>
      <div>
        <img src="/images/work-in-it2.webp" alt="">
      </div>
    </div>

    <div class="cont" v-if="changes && changes.length > 0">
      <div v-for="ch in changes" :key="'change' + ch.id">
        <h2>{{ ch.title }}</h2>
        <p>{{ ch.date2 }}</p>
        <p v-html="ch.html"></p>
      </div>
    </div>
    <div class="empty" v-else>
      <img src="/images/empty.webp" alt="не найдено">
        <h2>Ничего не найдено.</h2>
        <p>Возможно вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
          <router-link to="/about">"О нас"</router-link>
        </p>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'changes',
  head() {
    return {
      title: 'Изменения на сайте Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Страничка для неравнодушных. Отслеживайте новые функции сайта Conspectus, новые статьи и руководства на этой странице.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'изменения, разработка, блог, git'
        }
      ],
    };
  },
  data: function () {
    return {
      changes: []
    }
  },
  async fetch () {
    this.changes = await this.$api('info', 'changes');
  }
}
</script>

<style lang="scss" scoped>
  .changes {
    .content-header img {
      filter: grayscale(100%);
      object-fit: cover;
      height: 120%;
    }

    .cont {
      padding: 0 4em 4em;

      h2 {
        margin-top: 1.5em;
      }
    }
  }
</style>
