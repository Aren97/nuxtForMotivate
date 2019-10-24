<template>
  <div class="main admin">
    <div v-if="isUserDataLoading" class="admin-loading">
      Loading...
    </div>
    <div v-else class="admin-loaded">
      <div
        v-if="isLoggined"
        class="admin-logined"
      >
        <div class="form-check mb-40">
          <input class="form-check-input" type="checkbox" v-model="addPhraseTab" id="addPhraseTab">
          <label class="form-check-label" for="addPhraseTab">Добавить или Изменить фразы</label>
        </div>

        <!--Добавление фраз-->

        <form
          v-if="addPhraseTab"
          class="admin-add-phrase"
          @submit.prevent="addPhrase"
        >
          <div class="form-group">
            <label for="authorInput">Автор</label>
            <input v-model="author" type="text" class="form-control" id="authorInput">
          </div>
          <div class="form-group">
            <label for="sourceInput">Источник</label>
            <input v-model="source" type="text" class="form-control" id="sourceInput">
          </div>
          <div class="form-group">
            <label for="textareaPhrase">Фраза</label>
            <textarea
              class="form-control admin-textarea"
              id="textareaPhrase"
              name="phrase"
              rows="5"
              v-model="phrase"
            ></textarea>
          </div>

          <button class="admin-btn" type="submit">Добавить фразу</button>
        </form>

        <!--Список фраз и фильтрация-->

        <div v-else class="admin-phrases">

          <div class="flex mb-40">

            <input
              class="admin-phrases__search-input form-control mr-10"
              placeholder="Поиск по фразам"
              v-model="searchInput"
            >

            <select
              class="custom-select mr-10"
              v-model="filterValue.author"
            >
              <option selected value="Автор">Автор</option>
              <option
                v-for="(filter, index) in filters.authors"
                :key="index"
                :value="filter.author"
              >{{filter.author}}</option>
            </select>

            <select
              class="custom-select mr-10"
              v-model="filterValue.source"
            >
              <option selected value="Источник">Источник</option>
              <option
                v-for="(filter, index) in filters.sources"
                :key="index"
                :value="filter.source"
              >{{filter.source}}</option>
            </select>

            <button class="clear-filter__btn" @click="clearFilter">Clear Filter</button>
          </div>

          <table class="table table-bordered table-responsive">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Фраза</th>
              <th scope="col">Автор</th>
              <th scope="col">Источник</th>
              <th scope="col">Управление</th>
            </tr>
            </thead>
            <tbody>
            <phrase-item
              v-for="(item, index) in filteredPhrases"
              :key="item.ID"
              :item="item"
              :index="index"
            />
            </tbody>
          </table>
        </div>

      </div>

      <form
        v-else
        class="admin-sign-in"
        @submit.prevent="login"
      >
        <input
          class="admin-input"
          type="text"
          name="login"
          v-model="userSignIn.login"
        >
        <input
          class="admin-input"
          type="password"
          name="password"
          v-model="userSignIn.pass"
        >
        <button class="admin-btn" type="submit">Sign In</button>
      </form>

      <br>
      <div style="color: crimson">{{error}}</div>
    </div>

  </div>
</template>

<script>
  import PhraseItem from '~/components/phrase-item'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: "admin",
    components: {
      PhraseItem
    },
    data () {
      return {
        phrase: '',
        author: '',
        source: '',
        error: '',
        addPhraseTab: false,
        searchInput: '',
        userSignIn: {
          login: '',
          pass: ''
        },
        filterValue: {
          author: 'Автор',
          source: 'Источник'
        }
      }
    },
    methods: {
      ...mapActions('phrases', ['getPhrases', 'getFilters', 'addPhrases']),
      ...mapActions('user', ['signIn', 'autoLoginUser']),
      async addPhrase () {
        if (this.phrase) {
          const phraseObj = {
            phrase: this.phrase,
            source: this.source,
            author: this.author
          }
          try {
            await this.addPhrases(phraseObj)
            .then ((response) => {
              if (!response.dbQuery) {
                this.error = response.text
              }
            })
          } catch (e) {
            this.error = e
          }

        } else {
          this.error = 'Текст пустой'
        }
        this.phrase = ''
        this.source = ''
        this.author = ''
      },
      async login () {
        if (this.userSignIn.login && this.userSignIn.pass) {
          try {
            await this.signIn(this.userSignIn)
          } catch (e) {
            this.error = e
          }
        } else {
          this.error = 'Не введен логин или пароль'
        }
      },
      clearFilter () {
        this.filterValue = {
          author: 'Автор',
          source: 'Источник'
        }
        this.searchInput = ''
      }
    },
    computed: {
      ...mapGetters('user', ['isLoggined', 'isUserDataLoading']),
      ...mapState('phrases', { phrases: 'data', filters: 'filters' }),
      // Все фильтры работают в изоляции друг от друга. Может быть нужно будет потом добавть связка между поиском и селектами
      filteredPhrases () {
        if (!(this.searchInput || this.filterValue.author !== 'Автор' || this.filterValue.source !== 'Источник')) {
          return this.phrases
        } else {
          return this.phrases.filter((item) => {
            return (
              ((item.text.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1) && this.searchInput !== '') ||
              (item.author === this.filterValue.author) ||
              (item.source === this.filterValue.source)
            )
          })
        }
      }
    },
    mounted () {
      // Получаем фразы
      this.getPhrases()
        .then(() => {
          this.getFilters()
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
</script>

<style src="~/assets/scss/pages/admin.scss" lang="scss"></style>
