<template>
  <div class="main home">
    <transition name="fade-up">
      <div class="arrow-teacher-url-wrap" v-if="teacherUrl">
        <arrow-teacher>прямыми ссылками можно поделиться!</arrow-teacher>
      </div>
    </transition>

    <div class="main-wrap container" :style="`background-color: ${currentColor}`">
      <div class="phrase" @click="redirectToRandomUrl">
        <div class="phrase-block" :key="currentItem.ID">
          <h1 class="phrase-text">{{currentItem.text}}</h1>
          <div class="phrase-info">
            <span
              v-if="currentItem.author"
              class="phrase-info__text"
            >Автор: {{currentItem.author}}</span>
            <span
              v-if="currentItem.source"
              class="phrase-info__text"
            >Источник: {{currentItem.source}}</span>
          </div>
        </div>
        <!--logo-->
        <img class="phrase-logo" src="~/assets/img/logoasargsyan.png" alt="Aren Motivate">
        <!--text-->
        <h2 class="phrase-logo-text">Aren Motivate</h2>
        <transition name="fade">
          <div class="arrow-teacher-phrase-wrap" v-if="teacherPhrase">
            <arrow-teacher>Нажми и получай новую фразу</arrow-teacher>
          </div>
        </transition>
      </div>

      <div class="footer">
        <div class="footer-adik">
          <!--место для рекламы-->
        </div>
        <div class="footer-social"></div>
        <div class="footer-copyright">
          <span>© Арен Мотивирует, 2019. <a href="mailto:aren.aren.97@mail.ru" target="_self">РЕКЛАМА&nbsp;НА&nbsp;САЙТЕ</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArrowTeacher from '~/components/arrow-teacher'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "phrase",
    head () {
      return {
        title: this.currentItem.text || 'Мотивационные фразы и призивы к действию',
        meta: [
          { hid: 'robots', name: 'robots', content: 'index, nofollow' },
          { hid: 'twitter:title', name: 'twitter:title', content: `${this.currentItem.text} - Aren Motivate`  },
          { itemprop: 'name', content: `${this.currentItem.text} - Aren Motivate`  },
          { property: 'og:title', content: `${this.currentItem.text} - Aren Motivate` }
        ]
      }
    },
    async fetch ({store}) {
      // Получаем фразы
      if (!store.state.phrases.data.length) {
        const { data } = await store.dispatch('phrases/getPhrases')
      }
    },
    data () {
      return {
        teacherUrl: false,
        teacherPhrase: false,
        url: this.$route.params.id || '',
        currentColor: '',
        colors: [
          '#C62828',
          '#AD1457',
          '#6A1B9A',
          '#574b90',
          '#4527A0',
          '#283593',
          '#778beb',
          '#3dc1d3',
          '#1565C0',
          '#0277BD',
          '#00838F',
          '#00695C',
          '#2E7D32',
          '#558B2F',
          '#9E9D24',
          '#F9A825',
          '#FF8F00',
          '#EF6C00',
          '#e15f41',
          '#D84315',
          '#e66767',
          '#4E342E',
          '#424242',
          '#37474F'
        ]
      }
    },
    components: {
      ArrowTeacher
    },
    computed: {
      ...mapState('phrases', { phrases: 'data' }),
      // currentItem меняется, когда меняется this.url
      currentItem () {
        return this.phrases.find( value => value.url === this.url ) || {}
      }
    },
    methods: {
      ...mapActions({ getPhrases: 'phrases/getPhrases'}),
      // Перебор по массиву, не повторяющиейся
      randomNoRepeats (array) {
        if (!array) return
        let copy = array.slice(0)

        return function () {
          if (copy.length < 1) { copy = array.slice(0); }
          let index = Math.floor(Math.random() * copy.length)
          let item = copy[index]
          copy.splice(index, 1)
          return item
        }
      },

      // Получение случайного объекта фразы и Редирект на его урл
      redirectToRandomUrl () {
        const currentItem = this.randomNoRepeats(this.phrases)()
        const url = currentItem.url

        this.url = url
        this.$router.push({ path: '/m/' + url })
      },

      // Получение рандомного цвета
      randomColor() {
        let index = Math.floor(Math.random() * this.colors.length)

        this.currentColor = this.colors[index]
      }
    },
    mounted () {
      if (!this.url || (this.url && !Object.keys(this.currentItem).length)) {
        this.redirectToRandomUrl()
      }

      this.randomColor()

      if (!this.$getCookie('urlTeacher')) {
        this.teacherUrl = true
        this.$setCookie('urlTeacher', true)
        setTimeout(() => {
          this.teacherUrl = false
        }, 7000)
      }

      if (!this.$getCookie('phraseTeacher')) {
        this.teacherPhrase = true
        this.$setCookie('phraseTeacher', true)
        setTimeout(() => {
          this.teacherPhrase = false
        }, 7000)
      }
    }
  }
</script>

<style src="~/assets/scss/pages/phrase.scss" lang="scss"></style>
