<template>
  <div class="changes" @click="$emit('upgrade-search', false)">
    <div class="content-header">
      <div>
        <h1 first-word="Изменения на">Изменения на сайте</h1>
        <p>Отслеживайте новые функции сайта, новые статьи и руководства</p>
      </div>
      <div>
        <img src="/images/work-in-it2.jpg" alt="">
      </div>
    </div>

    <div class="cont">
      <div v-for="ch in changes">
        <h2>{{ ch.title }}</h2>
        <p>{{ ch.date2 }}</p>
        <p v-html="ch.html"></p>
      </div>
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
          content: 'Отслеживайте новые функции сайта Conspectus, новые статьи и руководства',
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
  async mounted () {
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
