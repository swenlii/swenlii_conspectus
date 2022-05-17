<template>
  <div class="all-guides-page" @click="$emit('upgrade-search', false)">
    <div class="content-header">
      <div>
        <h1 first-word="Учебник">Учебник</h1>
        <p>В последовательном обучении помогут разбитые по группам статьи, объедененные в мини-учебники, каждый из которых посвящен определенной теме.</p>
      </div>
      <div>
        <img src="/images/book-1.jpg" alt="">
      </div>
    </div>

    <div class="guides-content" v-if="handarr && handarr.length > 0">
      <div class="front-end" v-for="(hb, ind) in handarr" :key="'hb' + ind">
        <h3>{{hb.text}}</h3>
        <p>{{hb.description}}</p>
        <div class="guide-details">
          <details v-for="g in hb.guides" :key="'front-g-' + g.id">
            <summary>
              <span class="progress" :style="'width: ' + persentRead(g.arts) + '%'"></span>
              <span>{{ g.title }}</span>
              <router-link :to="'/guide/' + g.guide_id">{{ persentRead(g.arts) > 0 ? 'Продолжить' : 'Начать обучение'}} ({{ persentRead(g.arts) }}%)</router-link>
            </summary>
            <div v-html="g.desc">
            </div>
          </details>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <img src="/images/empty.png" alt="не найдено">
        <h2>Ничего не найдено.</h2>
        <p>Возможно вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
          <router-link to="/about">"О нас"</router-link>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuidesList",
  data: function () {
    return {
      guides: null,
      handbooks: null
    }
  },
  head() {
    return {
      title: 'Учебник - Conspectus',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'В последовательном обучении помогут разбитые по группам статьи, объедененные в мини-учебники, каждый из которых посвящен определенной теме.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'обучение, блог, статьи, курсы, гайды'
        }
      ],
    };
  },
  async fetch () {
    let con = await this.$api('info','checkconection');
    if (con === 'ok') {
      this.guides = await this.$api('guides', 'index');
      this.handbooks = await this.$api('guides', 'handbook');
    }
  },
  computed: {
    handarr () {
      if (!this.guides) return [];
      if (!this.handbooks) return [];
      let hba = [];
      this.handbooks.forEach(hbel => {
        hba.push(hbel);
        hba[hba.length - 1].guides = [];
        this.guides.forEach(el => {
          if (el.type === hbel.tag)
            hba[hba.length - 1].guides.push(el);
        });
      });
      return hba;
    }
  },
  methods: {
    persentRead (arts) {
      let studied = this.$cookies.get('studied');
      let count = 0;

      if (studied && arts) {
        arts.forEach(el => {
          if (studied.includes(el.art_id)) {
            count++;
          }
        });
      }

      if (count === 0)
          return count;
      else
        return (count / arts.length * 100).toFixed(0);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';
.all-guides-page {
  .content-header img {
    object-fit:cover;
    filter: brightness(60%) grayscale(100%);
    min-height: 100%;
    min-width: 100%;
    animation: 2s to-page;
  }
}
.guides-content {
  display: flex;
  justify-content: center;
  padding: 1em 3em;
  margin: auto;
  position: relative;
  animation: 2s to-top;
  flex-wrap: wrap;

  h3 {
    @extend .font-style-2;
    margin-top: 0;
    margin-bottom: 0;
    border: 1px solid $white1;
    box-shadow: 3px 3px $black, 4px 4px $white1, 7px 7px $black, 8px 8px $white1;
    display: inline-block;
    padding: 0.2em 0.7em;
    font-size: 1.3em;
  }

  .guide-details {
    box-shadow: 3px 3px $black, 4px 4px $white1, 7px 7px $black, 8px 8px $white1;
  }

  .front-end {
    background-color: $black;
    padding: 2em;
    margin: 1em;
    color: $white1;
    flex: 1;
    min-width: 400px;
  }

  .back-end {
    background-color: $black;
    color: $white1;
    padding: 2em;
    margin: 1em;
    flex: 1;
    min-width: 400px;
  }

  details div {
    padding: 1em 3em 1em 2em;
    border: 1px solid $white1;
    animation: 3s detail-show;
    overflow: hidden;
    background-color: $black;
    z-index: 3;
  }

  summary {
    padding: 1em 3em 1em 1.5em;
    cursor: pointer;
    background-color: $black;
    border: 1px solid $white1;
    display: flex;
    justify-content: space-between;
    position: relative;
    @extend .font-style-2;
    font-weight: 400;



    &:hover .progress {
      width: 100% !important;
    }

    .progress {
      content: "";
      position: absolute;
      background-color: $black2;
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
      transition: width 0.4s ease;
      width: 0%;
    }

    &:after {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding-bottom: 0.2em;
      text-align: center;
      top: 20%;
      right: 1em;
      content: "+";
      color: inherit;
      transition: 0.6s ease all;
      font-size: 1.4em;
      transform-origin: 50% 50%;
    }

    a {
      text-decoration: none;
      color: $white1;
      position: relative;

      &:visited {
        color: $white1;
      }

      &:after {
        content: "";
        border-bottom: 1px solid $white1;
        position: absolute;
        width: 0;
        height: 1px;
        bottom: 3px;
        left: 0;
        transition: 0.7s all ease;
      }

      &:hover:after, &:hover:before {
        width: 100%;
      }

      &:before {
        content: "";
        border-bottom: 1px solid $white1;
        position: absolute;
        width: 0;
        height: 1px;
        bottom: 0;
        right: 0;
        transition: 1s all ease;
      }
    }
  }

  details[open] summary:after {
    transform: rotate(225deg);
  }

  details:nth-child(n + 4) summary, details div {
    border-top: none;
  }
}
</style>
