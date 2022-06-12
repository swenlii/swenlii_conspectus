<template>
  <div id="app">
    <div class="little-mobile" v-if="this.litMob">
      <h4>Предупреждение!</h4>
      <p>Сайт не оптимизирован под ваше устройство</p>
      <button @click="litMob = false">Мне все равно</button>
    </div>
    <Header @upgrade-menu="upgradeMenu" @upgrade-search="upgradeSearch" :menu-open="menuOpen"></Header>
    <main class="main-page">
      <div :class="searchOpen ? 'conspectus' : 'conspectus close'" cont-text="Conspectus" id="conspectus">
        Conspectus
      </div>
      <div id="search-block" :class="searchOpen ? '' : 'close'">
        <input type="text" placeholder="Поиск по сайту" @keydown="(event) => searchInp(event)">
      </div>
      <div class="mobile-menu">
        <button @click="menuOpen = true">Меню</button>
        <button id="art-aside" style="display: none;" @click="asideMenMob ()">Доп. по статье</button>
      </div>
      <Nuxt @upgrade-search="upgradeSearch" ref="m725"/>
    </main>
  </div>
</template>

<script>
import Header from "../components/header";
export default {
  components: {Header},
  data: function () {
    return {
      litMob: false,
      searchOpen: true,
      menuOpen: true,
      articles: []
    }
  },
  methods: {
    upgradeMenu (v) {
      this.menuOpen = v;
    },
    upgradeSearch (v) {
      this.menuOpen = !this.menuOpen;
      this.searchOpen = v;
    },
    asideMenMob () {
      document.querySelector('.aside-art').style.display = 'flex';
      document.querySelector('.aside-art').classList.add('open-aside');
      console.log(this.$refs.m725.$children[0].showAside);
      this.$refs.m725.$children[0].showAside = 1;
    },
    searchInp (event) {
      if (event.keyCode === 13) {
        this.$router.push({path: '/search', query: {search: event.target.value}});
      }
    },
    pathWatch (to) {
      this.menuOpen = to.fullPath === '/' && window.innerWidth > 1100
      this.searchOpen = to.fullPath === '/'
      if (to.fullPath.includes('/article/') || to.fullPath.includes('/article-')) {
        document.getElementById('art-aside').style.display = 'block';
      } else {
        document.getElementById('art-aside').style.display = 'none';
      }
    }
  },
  watch: {
    '$route'(to) {
      this.pathWatch (to);
    }
  },
  mounted() {
    this.pathWatch(this.$router.currentRoute);

    if (window.outerWidth < 500) {
      this.litMob = true;
    }
  },
};
</script>

<style lang="scss">
.conspectus {
  font-size: 7em;
  margin-top: 0;
  position: relative;

  &.close {
    font-size: 3em;
    margin-top: -2.2em;
  }
}

#search-block {
  margin-top: 0;
  &.close {
    margin-top: -3em;
  }
}
</style>
