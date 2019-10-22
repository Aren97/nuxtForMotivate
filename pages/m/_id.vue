<template>
  <div>
    asd
    {{url}}
    <button @click="redirectToRandomUrl">click</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: "phrase",
    data () {
      return {
        currentItem: {},
        teacherUrl: false,
        teacherPhrase: false,
        url: this.$route.params.id || '',
        currentColor: '',
        colors: [
          '#C62828',
          '#AD1457',
          '#6A1B9A',
          '#4527A0',
          '#283593',
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
          '#D84315',
          '#4E342E',
          '#424242',
          '#37474F'
        ]
      }
    },
    computed: {
      phrases () {
        return this.$store.state.phrases.data
      },
      randomPhrase () {
        if (this.phrases) {
          return this.randomNoRepeats(this.phrases)
        }
        return null
      }
    },
    methods: {
      ...mapActions({ getPhrases: 'phrases/getPhrases'}),
      // Перебор по массиву, не повторяющиейся
      randomNoRepeats(array) {
        if (!array) return
        let copy = array.slice(0)

        return function() {
          if (copy.length < 1) { copy = array.slice(0); }
          let index = Math.floor(Math.random() * copy.length)
          let item = copy[index]
          copy.splice(index, 1)
          return item
        }
      },

      // Получение случайного объекта фразы и Редирект на его урл
      redirectToRandomUrl () {
        this.currentItem = this.randomPhrase()

        this.randomColor()

        const url = this.currentItem.url
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
      // Получаем фразы
      if (!this.phrases || !this.phrases.length) {
        this.getPhrases()
          .then(() => {
            console.log(this.phrases)
            this.currentItem = this.phrases.find( value => value.url === this.url ) || {}

            if (!this.url || (this.url && !Object.keys(this.currentItem).length)) {
              this.redirectToRandomUrl()
            } else {
              this.randomColor()
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
