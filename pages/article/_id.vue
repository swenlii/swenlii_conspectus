<template>
  <div class="article-page" @click="$emit('upgrade-search', false)" v-if="article">
    <div class="content">
      <article class="main-section">
        <h1 :first-word="article.title ? article.title.slice(0, 10) : ''">{{ article.title }}</h1>
        <section>
          <div class="photo" v-if="article.img">
            <img :src="'/images/articles/' + article.img" alt="">
          </div>
          <p v-if="article.description && article.description.length > 0" class="about-art">{{ article.description }}</p>
          <p class="path-to-art">{{ article.date2 }} / <span v-for="(cat, ind) in this.article.cats" :key="'category-' + cat + article.art_id"><NuxtLink :to="'/articles?category=' + cat">{{ categories[cat] }}</NuxtLink><span v-if="ind !== article.cats.length-1"> - </span></span></p>

          <div id="art-content" v-html="article.content"></div>

          <p class="art-tags" v-if="this.article.tags && this.article.tags.length > 0"><span v-for="(tag, ind) in this.article.tags" :key="'tag-' + ind"><nuxt-link :to="'/articles?tags=' + tag">{{ tag }}</nuxt-link></span></p>
          <div class="btn-group">
            <ShareNetwork
              network="facebook"
              :url="'https://localhost:3000' + this.$router.fullPath"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/facebook_nb.webp" alt="facebook">
            </ShareNetwork>
            <ShareNetwork
              network="twitter"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/twitter_nb.webp" alt="twitter">
            </ShareNetwork>
            <ShareNetwork
              network="vk"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
              :media="article.img ? ('https://localhost:3000/images/' + article.img) : ''"
            >
              <img src="/images/icons/vk_nb.webp" alt="vk">
            </ShareNetwork>
            <ShareNetwork
              network="email"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/email-nb.webp" alt="email">
            </ShareNetwork>
            <ShareNetwork
              network="pocket"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/pocket_nb.webp" alt="pocket">
            </ShareNetwork>
            <ShareNetwork
              network="odnoklassniki"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/odnoklassniki.webp" alt="odnoklassniki">
            </ShareNetwork>
            <ShareNetwork
              network="skype"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/skype_nb.webp" alt="skype">
            </ShareNetwork>
            <ShareNetwork
              network="telegram"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/telegram_nb.webp" alt="telegram">
            </ShareNetwork>
            <ShareNetwork
              network="whatsapp"
              :url="path"
              :title="article.title"
              :description="article.description"
              :hashtags="article.keywords"
            >
              <img src="/images/icons/whatsapp.webp" alt="whatsapp">
            </ShareNetwork>
          </div>
        </section>
      </article>
      <section class="aside-art" v-if="article.dopcon && article.dopconarr" :class="showAside === 1 ? 'open-aside' : ''" :style="this.width < 700 && showAside === 0 ? 'display: none' : ''">
        <input :id="'tab-name' + (ind + 1)" type="radio" name="tab-name" v-for="(aside, ind) in this.article.dopconarr" :key="'tab-name' + (ind + 1)" :placeholder="aside.name" :checked="ind === 0">

        <div class="tabs-menu">
          <div class="slide"></div>
          <label :for="'tab-name' + (ind + 1)" :key="'tab-label' + (ind + 1)"  @click="showAside = 1" v-for="(aside, ind) in this.article.dopconarr">{{ aside.name }}</label>
        </div>
        <div  v-for="(aside, ind) in this.article.dopconarr" :key="'tab-content' + (ind + 1)" class="tabs-content" :id="'tab-content' + (ind + 1)">
          <div v-if="showAside === 1">
            <h2>{{ aside.name }} <button class="close-aside" @click="closeAside">>></button></h2>
            <div v-if="aside.type === 'html'" v-html="aside.html"></div>
            <div v-else-if="aside.type === 'test'">
              <div class="num-quest" v-if="questNum !== (aside.quests.length + 1)">{{questNum}} / {{aside.quests.length}}</div>
              <div class="test" :ref="'quest' + (ind + 1)" v-show="questNum === (ind + 1)" v-for="(test, ind) in aside.quests" :key="'test' + ind">
                <div class="question" v-if="test.type !== 'details'">{{ test.text }}</div>
                <div v-if="test.type === 'select'">
                  <div class="answer" v-for="(answ, i) in test.answers" :key="'answ' + i + ind"><button @click="nextQuest(test.type, test.trueansw, answ)">{{ answ }}</button></div>
                </div>
                <div v-else-if="test.type === 'checkbox'">
                  <div class="answer checkbox" v-for="(answ, i) in test.answers" :key="'answ' + i + ind"><input type="checkbox" :value="answ" v-model="answers"><svg viewBox="0 0 21 21"><polyline points="5 10.75 8.5 14.25 16 6"></polyline></svg><label>{{ answ }}</label></div>
                  <div class="ready"><button @click="nextQuest(test.type, test.trueansw)">Готово</button></div>
                </div>
                <div v-else-if="test.type === 'input'">
                  <div class="answer"><input type="text" minlength="2" placeholder="ответ" v-model="answer" required></div>
                  <div class="ready"><button @click="nextQuest(test.type, test.trueansw)">Готово</button></div>
                </div>
                <div v-else-if="test.type === 'details'">
                  <details>
                    <summary>{{test.text}}</summary>
                    <div v-html="test.trueansw"></div>
                  </details>
                  <div class="ready"><button @click="nextQuest(test.type, null)">Готово</button></div>
                </div>
              </div>
              <div class="test" :ref="'quest' + (aside.quests.length + 1)" v-if="questNum === (aside.quests.length + 1)">
                <div class="question">Ваш результат</div>
                <div class="num-quest">{{ trueAnswers }}/{{ aside.quests.length }}</div>
                <div class="question" v-show="trueAnswers !== aside.quests.length">Попробуете догадаться что сделано неверно?</div>
                <div class="question" v-show="trueAnswers === aside.quests.length">Все ответы верные! Отлично!</div>
                <div class="ready"><button @click="nextQuest('final')">Еще раз</button></div>
              </div>
            </div>
            <div v-else-if="aside.type === 'contlist'" id="contlist">
              <ul>
                <li v-for="(el, ind) in aside.list" :key="'contlist' + ind" :style="'margin-left:' + el.margin + 'em'">
                  <span @click="scrollFix('#' + el.id)" :href="'#' + el.id">
                  {{ el.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>
    </div>

    <aside class="under-cont">
      <div class="comments">
        <h3>Коментарии</h3>
        <form v-on:submit.prevent="writeComment()">
          <label for="com-input2"></label>
          <input type="text" id="com-input2" v-model="userCom" placeholder="Имя..." autocomplete="name" required>
          <label for="com-input"></label>
          <textarea id="com-input" placeholder="Напиши коментарий..." required></textarea>
          <div class="submit">
            <input type="submit">
            <div id="loading"></div>
          </div>
        </form>
        <div class="one-coment" v-for="(com, ind) in comms" :key="'comment' + ind">
          <div>
            <h4>{{ com.user }}</h4>
            <p>{{ com.text }}</p>
          </div>
        </div>
      </div>
      <div class="sim-arts" v-if="article.sim_arts && article.sim_arts.length > 0">
        <h3>Похожие статьи</h3>
        <div class="one-sim-arts" v-for="(art, ind) in article.sim_arts" :key="'sim-art-'+ind">
          <div v-if="art">
            <h4>{{ art.title}}</h4>
          <p>{{ art.description}}</p>
          <div><router-link :to="'/article/' + art.art_id">Читать</router-link></div>
          </div>
        </div>
      </div>
    </aside>
  </div>
  <div v-else>
    <div class="empty">
      <img src="/images/error.webp" alt="не найдено">
      <h2>Статья не найдена.</h2>
      <p>Возможно запрос устарел или вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
        <router-link to="/about">"О нас"</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data: function () {
    return {
      article: null,
      questNum: 1, // первый вопрос в начале
      showAside: 1, // показывать или нет
      width: 800,
      heads: [],
      answer: '',
      answers: [],
      comms: [],
      trueAnswers: 0,
      categories: [],
      userCom: this.$cookies.get('comment-name')
    }
  },
  head() {
    if (this.article)
      return {
        title: this.article.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: this.article.keywords
          },
          { hid: 'og:title', name: 'og:title', content: this.article.title},
          { hid: 'og:type', name: 'og:title', content: 'article'},
          { hid: 'og:description', name: 'og:description', content: this.article.description}
        ]
      };
    else
      return {
        title: 'Статья (Ошибка: статья не прогрузилась)',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Описание статьи (Ошибка: статья не прогрузилась)'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: 'блог, статья, разработка, обучение, веб, программирование'
          },
          { hid: 'og:title', name: 'og:title', content: 'Статья в блоге Conspectus'},
          { hid: 'og:type', name: 'og:title', content: 'article'},
          { hid: 'og:description', name: 'og:description', content: 'Блог о программировании, конспектирующий многие учебники и курсы в один небольшой сайт, представил новую статью!'}
        ],
      };
  },
  methods: {
    nextQuest(type, answ, a) {
      this.questNum++;
      // get length quests
      let length = 0;
      for (let i = 1; i < this.article.dopconarr.length; i++) {
        if (this.article.dopconarr[i].type === 'test')
          length = this.article.dopconarr[i].quests.length + 1;
      }
      this.questNum > length ? this.questNum = 1 : '';

      if (type === 'select') {
        if (answ === a) {
          this.trueAnswers++;
        }
      } else if (type === 'checkbox') {
        if (this.answers.length === answ.length) {
          let aCount = 0;
          this.answers.forEach(getan => {
            answ.forEach(tran => {
              if (getan === tran) aCount++;
            });
          });
          if (aCount === answ.length) {
            this.trueAnswers++;
          }
        }
        this.answers = [];
      } else if (type === 'input') {
        if (this.answer === answ) {
          this.trueAnswers++;
        }
        this.answer = '';
      } else if (type === 'details') {
        this.trueAnswers++;
      } else if (type === 'final') {
        this.trueAnswers = 0;
      } else {
        console.error('i can\'t understand type of question');
      }
    },
    closeAside() {
      this.showAside = 0;
      if (window.innerWidth < 700) {
        document.querySelector('.aside-art').style.display = 'none';
      }
    },
    createTooltips () {
      let elems = document.querySelectorAll('article .tooltip');

      let tool71 = document.createElement('div');
      tool71.id = 'tool71';
      tool71.style.position = 'fixed';
      tool71.style.visibility = "hidden";
      tool71.style.color = '#eeeeee';
      tool71.style.backgroundColor = '#1f1f1f';
      tool71.style.border = '1px solid #dedede';
      tool71.style.padding = '0.3em 0.8em';
      tool71.style.maxWidth = '450px';
      tool71.style.width = 'max-content';
      tool71.style.top = '0.5em';
      tool71.style.left = '0.5em';

      document.body.appendChild(tool71);

      for (let i = 0; i < elems.length; i++){
        elems[i].addEventListener('mouseover', (evt) => {

          const boundBox = evt.target.getBoundingClientRect();
          const coordX = boundBox.left;
          const coordY = boundBox.top;
          let myEvent = evt.target || evt.currentTarget ;
          // myEvent - это элемент в котором мы создаем tooltip

          tool71.innerHTML = myEvent.getAttribute('tooltip');

          if (window.innerWidth < 500) {
            tool71.style.maxWidth = (window.innerWidth - 50) + "px";
          }
          let toolleft = (tool71.clientWidth / 2) - (myEvent.getBoundingClientRect().width / 2);
          tool71.style.left = (coordX - toolleft).toString() + "px";
          if ((coordX - toolleft) < 0) {
            // если выходит за пределы экрана влево
            tool71.style.left = "0px";
          }
          // если вышло за пределы экрана вправо
          if (tool71.getBoundingClientRect().left + tool71.getBoundingClientRect().width > window.innerWidth) {
            let n = window.innerWidth - (tool71.getBoundingClientRect().left + tool71.getBoundingClientRect().width);
            let l = tool71.getBoundingClientRect().left + n;
            tool71.style.left = l + 'px';
          }

          // здесть проверить, не слишком ли низко появится подсказка, если да - сделать ее сверху
          tool71.style.top = (coordY + 30).toString() + "px";
          let top = myEvent.getBoundingClientRect().top;
          if (top > window.innerHeight - 30 - tool71.clientHeight) {
            // если появляется низко
            tool71.style.top = (coordY - tool71.clientHeight).toString() + "px";
          }

          tool71.style.visibility = "visible";
        }, false);
        elems[i].addEventListener('mouseout', () => {
          tool71.style.visibility = "hidden";
        }, false);
        document.getElementById("tool71") . addEventListener("click", () => {tool71.style.visibility = "hidden";} , false);
      }
    },
    async writeComment () {

      document.getElementById('loading').classList.add('on');

      let text = document.getElementById('com-input').value;
      let name = this.userCom;

      this.$cookies.set('comment-name', this.userCom, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      });

      await this.$api('info', 'comment', {user: name, text: text, art_id: this.article.art_id});
      this.comms.push({
        user: name,
        text: text,
        art_id: this.article.art_id,
        date: 'just now'
      });
      document.getElementById('com-input').value = '';
      document.getElementById('com-input2').value = '';
      alert('комент написан');
      document.getElementById('loading').classList.remove('on');
    },
    scrollFix: function(hashbang) {
      if (hashbang && document.querySelector(hashbang)) {
        document.querySelector(hashbang).scrollIntoView({block: "start", behavior: "smooth"});
      }
      this.$router.push({path: this.$route.path, hash: hashbang});
    }
  },
  async fetch () {
    if (this.$route.fullPath.includes('/article-template')) {
      this.article = await this.$api('articles', 'get', { id: 'template'});
      this.comms = await this.$api('articles', 'comments', { id: 'template' });
    } else {
      this.article = await this.$api('articles', 'get', { id: this.$route.params.id});
      this.comms = await this.$api('articles', 'comments', { id: this.$route.params.id });
    }
    this.article.cats = this.article.categories.split(',');
    this.article.tags = this.article.tags && this.article.tags.length > 0 ? this.article.tags.split(',') : [];
    if (this.article.sim_arts)
    this.article.sim_arts = await this.$api('articles', 'sim_arts', {ids: this.article.sim_arts});
  
    this.article.content = (require('../../static/articles/' + this.article.file)).code;
  
    // this.$nextTick(() => {
    //   if (process.client) {
    //     this.createTooltips();
    //     hljs.highlightAll();
    //   }
    // });

  },
  async mounted() {
    this.width = window ? window.innerWidth : 800;
    setTimeout(() => this.scrollFix(this.$route.hash), 300);
    if (window.innerWidth < 1100) {
      this.showAside = 0;
    }
    let cats = await this.$api('info', 'categories');
    let thc = [];
    cats.forEach(el => {
      thc[el.link] = el.text;
    });
    this.categories = thc;
  },
  computed: {
    path () {
      return 'https://localhost:3000' + this.$route.fullPath;
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';
.article-page {
  max-width: 2700px;

  .num-quest {
    font-size: 1.4em;
    font-weight: 900;
    text-align: center;
    margin-bottom: 1em;
  }

  .art-tags {
    a {
      background-color: $black;
      color: $white1;
      text-decoration: none;
      padding: 0.2em 0.7em;
      font-size: 0.8em;
      margin: 0 0.2em;
    }
  }

  .test {
    .question {
      margin-bottom: 1em;
      font-size: 1.1em;
      font-weight: 500;
    }
    button {
      width: 100%;
      padding: 1em;
      border: 1px solid $white1;
      background-color: transparent;
      color: $white1;
      transition: 0.3s all ease;
      &:hover {
        background-color: $black2;
      }
    }
    input[type="checkbox"] {
      display: block;
      margin-right: 0.5em;
    }
    .checkbox {
      margin-bottom: 0.5em;
    }
    input[type="text"] {
      display: block;
      width: 100%;
      border: 1px solid $white1;
      background-color: transparent;
      padding: 1em;
      outline: none;
      margin-bottom: 1em;
      color: $white1;
    }

    details {
      margin-bottom: 1em;
      border: 1px solid $white1;
      padding: 1em;
    }
  }


  .content {
    border-bottom: 1px solid $black;
    display: flex;
    position: relative;
  }

  pre {
    margin: 1em;
    border: 1px solid $black2;
  }

  code {
    background-color: $white3;
    color: #444;
    margin: 0;
    font-family: monospace;
    display: inline-block;
    border: none;
    padding: 0.1em 0.3em;
    font-weight: 400;
  }

  pre code {
    width: 100%;
    padding: 1em 1.3em;
  }

  article {
    flex: 1;

    .photo {
      height: max-content;
      img {
        max-width: 100%;
        filter: grayscale(100%);
      }
    }

    section {
      max-width: 800px;
      padding: 50px;
      margin: 0 auto;
      animation: 1s to-page;
    }

    #art-content {
      div > p:nth-child(1)::first-letter {
        font-family: $font-1;
        color: $white1;
        background-color: $black;
        padding: 0.1em 0.4em;
        margin: 0 0.2em 0.1em 0;
        font-weight: 700;
        font-size: 3em;
        float: left;
      }

      h5 {
        font-size: 1.1em;
        text-align: center;
        @extend .font-style-4;
        border-bottom: 1px solid $black;
        padding-bottom: 0.2em;
        margin: 0.5em 0 0 0;
      }

      section > ul {
        margin: 0.5em 0;
        padding: 0;
        padding-bottom: 1em;
        border-bottom: 1px solid $black;

        li {
          list-style-type: none;

          &:before {
            content: '⧉';
            margin-right: 0.5em;
          }

          > ul {
            margin: 0.5em 0;

            li {
              list-style-type: none;

              &:before {
                content: '⧈';
                margin-right: 0.5em;
              }
              > ul {
                margin: 0.5em 0;

                li {
                  list-style-type: none;

                  &:before {
                    content: '▫';
                    margin-right: 0.5em;
                  }
                }

              }
            }

          }
        }
      }

      section > ol {
        padding: 0;
        list-style: none;
        margin-top: 1.5em;
        counter-reset: article-reset;
        > li {
          counter-increment: article-reset;
          border-top: 1px solid $black;
          display: flex;
          padding: 0.8rem 0.1rem 0.8rem 0;
          margin-bottom: 0.3em;
          &:before {
            display: block;
            content: counter(article-reset);
            @extend .font-style-2;
            background-color: $black;
            color: $white1;
            font-size: 1.4em;
            padding: 0 0.4em;
            margin-top: -0.8rem;
            margin-right: 0.8rem;
            min-width: 16px;
            text-align: center;
            height: max-content;
          }
          div > ol {
            margin: 0.8em 0;
          }
          div > ol > li::marker {
            font-weight: 800;
            @extend .font-style-4;
          }
          div > ol > li > ol > li {
            list-style-type: lower-latin;
            &::marker {
              font-weight: 400;
              font-style: normal;
            }
          }
        }

      }

      .warning,
      .note,
      .info,
      .question {
        display: flex;
        >div:nth-child(1){
          background-color: $black;
          padding: 1em 0.5em;
        }
        >div:nth-child(2){
          border: 1px solid $black;
          padding: 1em;
        }
        img {
          filter: brightness(0%) invert(100%);
          width: 40px;
        }
        span {
          font-size: 1.3em;
          font-weight: 600;
          font-style: italic;
        }
      }

      .warning img{
        transform:rotate(180deg);
      }

      .tooltip {
        border-bottom: 1px dashed #333;
        position: relative;
        cursor: pointer;
      }

      .cards {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .card {
          width: 210px;
          border: 1px solid $black;
          text-align: center;
          margin: 0.5em;
          b {
            padding: 0.5em 1em;
            font-size: 1.1em;
            display: block;
            background-color: $black;
            color: $white1;
            margin-bottom: 0.5em;
          }
          span {
            padding: 0 1em 1em 1em;
            display: block;
          }
        }
      }

      .lang-name {
        padding: 1em 1em;
        border: 1px solid $black;
        margin-top: 1em;
        font-family: monospace;
        font-size: 0.8em;
        text-align: right;
        background-color: $black;
        color: $white1;
      }



      table.table, .table th, .table td {
        border: 1px solid $black;
      }

      table.table {
        border-collapse: collapse;
        thead {
          background-color: $black;
          color: $white1;
          td {
            padding: 0.6em 0.6em;

          }
        }
        tfoot {
          background-color: $white3;
        }
        td {
          padding: 0.3em 0.6em;
          font-size: 0.95em;
        }
      }
    }



    .path-to-art {
      margin-bottom: 2em;
      margin-top: -0.5em;
      color: #575656;
      font-size: 0.8em;
      position: relative;

      a {
        color: #575656;
      }
    }

    h1 {

      margin: 80px 100px 20px 100px;
    }

    .about-art {
      border-bottom: 1px $black solid;
      border-top: 1px $black solid;
      padding: 1.0em 0;
      @extend .font-style-4;
    }
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    padding: 1em;
    justify-content: flex-end;
    a {
      background-color: $black;
      padding: 7px 10px 4px 10px;
      margin: 2px;
      img {
        width: 16px;
        filter: invert(100%);
      }
    }
  }

  .open-aside {
    width: 35%;
    min-width: 300px;
  }

  .aside-art {
    display: flex;
    flex-direction: row-reverse;
    max-height: 100vh;
    position: -webkit-sticky;
    position: sticky;
    top: -1px;
    right: 0;
    z-index: 2;

    h2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .close-aside {
      @extend .font-style-2;
      width: max-content;
      background: transparent;
      border: none;
      color: $white1;
      font-weight: 800;
      font-size: 1.1em;
      cursor: pointer;
      &:hover {
        background-color: $black2;
      }
    }

    input {
      display: none;
    }

    .tabs-content {
      flex-direction: column;
      overflow: auto;
      background-color: $black;
      color: $white1;

      display: none;
      border-left: 1px solid $black;
      transition: 1s all ease;
      flex: 1;
      position: sticky;
      top: 0;
      z-index: 2;
      > div {
        padding: 2em;
      }
      li {
        cursor:pointer;
        &:hover {
          text-decoration: underline;
        }
        a {
          text-decoration: none;
        }
      }
    }



    .tabs-menu {
      z-index: 3;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      color: $white1;
      background-color: $white2;
      position: sticky;
      top: 0;

      label {
        writing-mode: vertical-rl;
        text-align: center;
        flex: 1;
        padding-left: 1em;
        padding-right: 1em;
        transition: 0.3s all ease;
        color: $black;
        min-width: 60px;
        max-width: 60px;

        &:hover {
          background-color: $white3;
          transition: 0.1s all ease;
        }
      }

      .slide {
        height: 20%;
        width: 100%;
        background-color: #1f1f1f;
        transition: 1s all ease;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }
    }
  }

  #tab-name1:checked ~ .tabs-menu label[for="tab-name1"],
  #tab-name2:checked ~ .tabs-menu label[for="tab-name2"],
  #tab-name3:checked ~ .tabs-menu label[for="tab-name3"],
  #tab-name4:checked ~ .tabs-menu label[for="tab-name4"],
  #tab-name5:checked ~ .tabs-menu label[for="tab-name5"] {
    background-color: transparent;
    color: $white1;
    transition: 1s color ease;
  }

  #tab-name1:checked ~ .tabs-menu label[for="tab-name1"]:hover,
  #tab-name2:checked ~ .tabs-menu label[for="tab-name2"]:hover,
  #tab-name3:checked ~ .tabs-menu label[for="tab-name3"]:hover,
  #tab-name4:checked ~ .tabs-menu label[for="tab-name4"]:hover,
  #tab-name5:checked ~ .tabs-menu label[for="tab-name5"]:hover {
    background-color: transparent;
  }

  #tab-name1:checked ~ #tab-content1,
  #tab-name2:checked ~ #tab-content2,
  #tab-name3:checked ~ #tab-content3,
  #tab-name4:checked ~ #tab-content4,
  #tab-name5:checked ~ #tab-content5{
    display: flex;
    animation: 1s tab-c-an;
    overflow-y: auto;
  }

  #tab-name1:checked ~ .tabs-menu .slide {
    top: 0;
  }

  #tab-name2:checked ~ .tabs-menu .slide {
    top: 20%;
  }

  #tab-name3:checked ~ .tabs-menu .slide {
    top: 40%;
  }

  #tab-name4:checked ~ .tabs-menu .slide {
    top: 60%;
  }

  #tab-name5:checked ~ .tabs-menu .slide {
    top: 80%;
  }

  @keyframes tab-c-an {
    0% {
      transform: translateX(300px);
    }

    100% {
      transform: translateX(0px);
    }

  }

  .under-cont {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 4em;

    .comments {
      flex: 1;
      max-width: 600px;
      min-width: 300px;
      margin: 2rem 2rem 2rem 2rem;
      h3 {
        @extend .font-style-2;
        font-size: 1.6em;
        border: 1px solid $black;
        box-shadow: -6px 6px $black, inset 0 0 0 50px $white2;
        padding: 0 0.5em;
      }

      textarea, input {
        background: none;
        border: 1px solid $black;
        padding: 0.5em;
        width: 100%;
        min-height: 2em;
        outline: none;
        box-shadow: -6px 6px $black;
        margin-bottom: 1em;
        position: relative;
      }

      input[type="submit"] {
        width: max-content;
        transition: 0.1s all ease;
        left: 0;
        bottom: 0;

        &:hover {
          box-shadow: -4px 4px $black;
          left: -2px;
          bottom: -2px;
        }

        &:active {
          box-shadow: 0 0 $black;
          left: -6px;
          bottom: -6px;
        };
      }

      .submit {
        display: flex;
      }

      #loading {
        width: 30px;
        height: 30px;
        background-image: url("/images/icons/time.webp");
        background-size: contain;
        margin: 0.5em;
        display: none;

        &.on {
          display: block;
          animation: load 0.9s infinite ;
        }
      }

      .one-coment {
        border: 1px solid $black;
        box-shadow: -6px 6px $black;
        padding: 1em;
        margin: 1em 0;
      }

      h4 {
        font-size: 1em;
        margin: 0;
        padding: 0;
      }

      p {
        max-width: 600px;
        margin: 0;
        padding-top: 0.5em;

      }
    }

    .sim-arts {
      flex: 1;
      max-width: 600px;
      min-width: 300px;
      margin: 0 2rem 0 2rem;

      h3 {
        @extend .font-style-2;
        font-size: 1.6em;
        border: 1px solid $black;
        box-shadow: 2px 2px $white2, 3px 3px $black, 5px 5px $white2, 6px 6px $black;
        padding: 1em 1.2em;
        margin: 2rem 0 2rem 0;
      }

      .one-sim-arts{
        padding: 1em 1.2em;
        border: 1px solid $black;
        margin: 2rem 0 2rem 0;
        box-shadow: 2px 2px $white2, 3px 3px $black, 5px 5px $white2, 6px 6px $black;
        transition: 0.4s all ease;

        &:hover {
          box-shadow: 4px 4px $white2, 5px 5px $black, 9px 9px $white2, 10px 10px $black;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 0;
        }

        div {
          text-align: right;
        }

        a {
          display: inline-block;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.5em 1em;
          background-color: $black;
          color: $white1;
          box-shadow: 2px 2px $white2, 3px 3px $black, 5px 5px $white2, 6px 6px $black;
          margin-bottom: 1em;
          transition: 0.5s all ease;

          &:hover {
            box-shadow: 4px 4px $white2, 5px 5px $black2, 9px 9px $white2, 10px 10px $black2;
            background-color: $black2;
          }
        }
      }
    }
  }
}
</style>
