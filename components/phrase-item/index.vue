<template>
  <tr
    :class="['admin-phrases__li', `admin-phrases__li-${index}`]"
  >
    <th scope="row" class="admin-phrases__ID">{{item.ID}}</th>
    <td class="admin-phrases__text">
      <div
        v-if="editingLi === index"
        class="admin-phrases__text-change"
      >
        <textarea
          class="admin-phrases__text-input form-control"
          v-model="changingData.phrase"
        ></textarea>
      </div>
      <span
        v-else
        class="admin-phrases__text-span"
      >{{item.text}}</span>
    </td>
    <td class="admin-phrases__author">
      <div
        v-if="editingLi === index"
        class="admin-phrases__author-change"
      >
        <input
          class="admin-phrases__author-input form-control"
          placeholder="Автор"
          v-model="changingData.author"
        >
      </div>
      <span
        v-else
        class="admin-phrases__author-span"
      >{{item.author}}</span>
    </td>
    <td class="admin-phrases__source">
      <div
        v-if="editingLi === index"
        class="admin-phrases__source-change"
      >
        <input
          class="admin-phrases__source-input form-control"
          placeholder="Источник"
          v-model="changingData.source"
        >
      </div>
      <span
        v-else
        class="admin-phrases__source-span"
      >{{item.source}}</span>
    </td>
    <td class="admin-phrases__edit-save">
      <button
        v-if="editingLi === index"
        class="admin-phrases__text-save"
        @click="saveLi"
      >Save</button>
      <button
        v-else
        class="admin-phrases__text-edit"
        @click="editLi"
      >Edit</button>
    </td>
  </tr>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "phrase-item",
    props: [
      'item',
      'index'
    ],
    data () {
      return {
        editingLi: -1,
        changingData: {
          phrase: this.item.text || '',
          author: this.item.author || '',
          source: this.item.source || ''
        }
      }
    },
    methods: {
      ...mapActions('phrases', ['updatePhrase']),
      editLi () {
        this.editingLi = this.index
      },
      saveLi () {
        const localPhraseItem = {
          ID: this.item.ID,
          text: this.changingData.phrase,
          url: this.item.url,
          author: this.changingData.author,
          source: this.changingData.source
        }
        this.updatePhrase({ data: localPhraseItem, index: this.index })
          .then (() => {
            this.editingLi = -1
          })
      },
      clickOutside (event) {
        const parent = event.target.closest(`.admin-phrases__li-${this.index}`)
        if (!parent) {
          this.editingLi = -1
        }
      }
    },
    watch: {
      editingLi (val) {
        if (val > -1) {
          document.body.addEventListener('click', this.clickOutside)
        } else {
          document.body.removeEventListener('click', this.clickOutside)
        }
      }
    }
  }
</script>

<style src="./style.scss" lang="scss"></style>
