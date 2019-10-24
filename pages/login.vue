<template>
  <div class="main login">
    <form
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
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "login",
    middleware: 'guest',
    data() {
      return {
        error: null,
        userSignIn: {
          login: '',
          pass: ''
        }
      }
    },
    methods: {
      ...mapActions('user', ['signIn']),
      async login () {
        if (this.userSignIn.login && this.userSignIn.pass) {
          try {
            let result = await this.signIn(this.userSignIn)
            if (result && result.ID) {
              this.$router.push('/admin')
            }
          } catch (e) {
            this.error = e
          }
        } else {
          this.error = 'Не введен логин или пароль'
        }
      }
    }
  }
</script>

<style src="~/assets/scss/pages/admin.scss" lang="scss"></style>
