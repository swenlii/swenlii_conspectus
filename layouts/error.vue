<template>
  <div id="error">
    <div v-if="error.statusCode === 404">
      <img src="/images/error.png" alt="не найдено">
      <h1>Страница не найдена</h1>
      <p>Данная ссылка не верна или устарела. Возможно вам стоит изменить запрос. Если вы уверены, что это должно работать, свяжитесь с разработчиком на странице
        <router-link to="/about">"О нас"</router-link>
      </p>
      <NuxtLink to="/">Домашняя страница</NuxtLink>
    </div>
    <div v-else>
      <img src="/images/error2.png" alt="ошибка">
      <h1>Произошла ошибка №{{error.statusCode}}</h1>
      <p>Попробуйте перезагрузить страницу. Если ошибка долго не проходит, напишите нам по адресу swenliw@gmail.com,
        предоставив скриншот ошибки или отправьте в письме этот текст ошибки:</p>
      <p>{{error.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>

<style lang="scss">


#error {

  margin: 20% 5em;
  h1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  img{
    float: right;
    width: 300px;
    filter: grayscale(100%);
  }
}
</style>
