<template>
  <header :style="menuOpen ? 'width: 250px' : 'width: auto'">
    <div id="big-menu" :class="menuOpen ? 'menu' : 'hide-menu menu'">
      <div class="name-site">
        <div class="head-show svern" tooltip="Свернуть" @click="$emit('upgrade-menu', false)"><img alt="home" src="/images/icons/right.png" style="transform: rotate(180deg)"></div>
        <div class="head-show" tooltip="Поиск" @click="$emit('upgrade-search', true)"><img alt="find" src="/images/icons/find.png"></div>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/">
              <span class="head-show">Домой</span>
            </router-link>
          </li>
          <li class="selected">
            <div @click="randomArticle">
              <span class="head-show">Рандомная статья</span>
            </div>
          </li>
          <li class="head-show">
            <router-link to="/changes">
              Изменения на сайте
            </router-link>
          </li>
          <li>
            <router-link to="/handbook">
              <span class="head-show">Учебник</span>
            </router-link>
          </li>
          <li>
            <router-link to="/articles">
              <span class="head-show">Все статьи</span>
            </router-link>
          </li>
          <li>
            <details class="head-show">
              <summary>Категории</summary>
              <ul>
                <li><router-link to="/articles?category=html">HTML</router-link></li>
                <li><router-link to="/articles?category=html">CSS</router-link></li>
                <li><router-link to="/articles?category=html">Java Script</router-link></li>
                <li><router-link to="/articles?category=html">Vue</router-link></li>
              </ul>
            </details>
          </li>
          <li class="head-show">
            <router-link to="/tags">Теги</router-link>
          </li>
          <li>
            <router-link to="/library">
              <span class="head-show">Библиотека</span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span class="head-show">О сайте</span>
            </router-link>
          </li>
<!--          <li class="head-show">
            <router-link to="/help-me">Помочь мне</router-link>
          </li>-->
        </ul>
      </nav>
      <div class="theme-block">
        <div>
          <button class="head-show" @click="themeClick ()">
            <span class="head-show">Сменить тему</span>
          </button>
        </div>
      </div>
    </div>
    <div id="little-menu" :class="menuOpen ? 'hide-menu menu' : 'menu'">
      <div class="name-site">
        <div class="head-hide" tooltip="Развернуть" @click="$emit('upgrade-menu', true)"><img alt="home" src="/images/icons/right.png"></div>
        <div class="head-hide" tooltip="Поиск" @click="$emit('upgrade-search', true)"><img alt="find" src="/images/icons/find.png"></div>
      </div>
      <nav>
        <ul>
          <li class="head-hide" tooltip="Дом">
            <router-link tooltip="Дом" to="/">
              <img alt="home" src="/images/icons/home.png">
            </router-link>
          </li>
          <li class="selected">
            <div  @click="randomArticle">
              <span class="head-hide" tooltip="Рандомная статья"><img alt="random" src="/images/icons/random.png" style="height: 20px"></span>
            </div>
          </li>
          <li>
            <router-link to="/handbook">
              <span class="head-hide" tooltip="Учебник"><img alt="book" src="/images/icons/book.png"></span>
            </router-link>
          </li>
          <li>
            <router-link class="head-hide" tooltip="Все статьи" to="/articles"><img alt="category" src="/images/icons/list.png"></router-link>
          </li>
          <li>
            <router-link to="/library">
              <span class="head-hide" tooltip="Библиотека"><img alt="library" src="/images/icons/archive.png"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <span class="head-hide" tooltip="О сайте"><img alt="about" src="/images/icons/info.png" style="height: 20px"></span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="theme-block">
        <div>
          <button  @click="themeClick ()">
            <span class="head-hide" tooltip="Сменить тему"><img alt="theme"  src="/images/icons/theme.png"></span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  props: ['menuOpen'],
  methods: {
    themeClick () {
      let theme = this.$cookies.get('theme');
      if (theme && theme === 'dark') {
        document.querySelector('body').classList.remove('dark');
        document.getElementById('app').classList.remove('dark');
        this.$cookies.set('theme', 'light');
      }
      else {
        document.querySelector('body').classList.add('dark');
        document.getElementById('app').classList.add('dark');
        this.$cookies.set('theme', 'dark');
      }
    },
    async randomArticle () {
       let art_id = await this.$api('info', 'randomArt');
       await this.$router.push({path: '/article/' + art_id[0].art_id});
    }
  },
  mounted() {
    let theme = this.$cookies.get('theme');
    if (!theme) {
      this.$cookies.set('theme', 'light');
      theme = 'light';
    }

    if (theme === 'dark') {
      document.querySelector('body').classList.add('dark');
      document.getElementById('app').classList.add('dark');
    }
    else {
      document.querySelector('body').classList.remove('dark');
      document.getElementById('app').classList.remove('dark');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/l_style.scss';
header {
  z-index: 888;
  background-color: $black;
  color: $white1;
  transition: 2s all ease;
  display: flex;
  width: auto;
  position: sticky;
  top: 0;
  left: 0;
  max-height: 100vh;

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    height: 30px;
    filter: brightness(0%) invert(100%);
    cursor: pointer;
  }

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;

    .head-hide {
      position: relative;
      text-align: center;
      width: max-content;
      margin: 0 auto;
    }
  }

  .hide-menu {
    visibility: hidden;
  }

  #big-menu {
    width: 250px;
    transition: margin-left 1.7s ease, visibility 3s ease;

    &.hide-menu {
      margin-left: -250px;
    }

    .name-site {
      display: flex;
      justify-content: center;
      div {
        margin: 1em;
      }
    }
  }

  #big-menu li a:hover, details > summary:hover {
    left: 1em;
    text-shadow: -1em 0 rgba(255,255,255,.2);
  }

  #little-menu {
    z-index: 888;
    transition: opacity 0.5s ease, visibility 3s ease, width 2s ease;

    &.hide-menu {
      opacity: 0;
      width: 0;
    }

    *[tooltip]:hover {
      left: 5px;
    }

    .name-site {
      margin-top: 1em;
    }
  }

  *[tooltip] {
    position: relative;
    left: 0;
    z-index: 888;
    transition: 0.3s all ease;

    &:hover:before {
      content: attr(tooltip);
      z-index: 888;
      position: absolute;
      bottom: 0;
      left: calc(100% + 1em);
      background-color: $black;
      color: $white1;
      padding: 0.5em 1em;
      width: max-content;
      font-size: 0.9em;
      font-family: $font-3;
    }
  }

  .svern {
    transition: 0.3s all ease;
    position: relative;
    right: 0;

    &:hover {
      right: 5px;
    }
  }

  //------- Nav ----------

  nav {
    position: relative;
    @extend .font-style-5;

    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      width: max-content;
      display: flex;
      flex-direction: column;
    }

    li {
      margin: 0.5em 0;
      text-align: center;

      a {
        position: relative;
        transition: 1s all ease;
        left: 0;
        text-shadow: 0 0 rgba(255,255,255,.2);
        text-decoration: none;
      }
    }

    details {
      margin-left: 0;

      > summary {
        margin-left: -1em;
        cursor:pointer;
        position: relative;
        transition: 1s all ease;
        left: 0;

        &::marker {
          display: none;
        }
      }

      ul {
        margin-top: 1em;
        a {
          color: #616161;
          &:hover {
            left: -1em !important;
            text-shadow: 1em 0 rgba(255,255,255,.2) !important;
          }
        }
      }
    }
  }

  //------ Theme ---------

  .theme-block button {
    @extend .font-style-3;
    width: 100%;
    height: 76px;
    background-color: $black2;
    color: $white1;
    border: none;
    text-shadow: 2px 2px $black;
    padding: 1em 1.2em;
    cursor: pointer;
    position: relative;
    top:0;
    left: 0;
    transition: 0.2s all ease;

    &:hover {
      box-shadow: -1px 1px #101010, -2px 2px #101010, -3px 3px #101010, -4px 4px #101010, -5px 5px #101010, 2px -2px 12px rgba(0,0,0,.4);
      top: -5px;
      left: 5px;

      span:hover {
        left: 0 !important;

        &:before {
          background-color: $black2;
        }
      }
    }

    &:active {
      top: 0;
      left: 0;
      box-shadow: 3px -3px 10px rgba(0,0,0,.2) inset, -3px 3px 10px rgba(0,0,0,.2) inset;
    }
  }
}

@media screen and (max-width: 700px){
  header {
    width: 80px;
  }
}

@import '~assets/styles/d_style.scss';
</style>
