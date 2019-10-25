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
  export default {
    name: "login",
    middleware: 'guest',
    head () {
      return {
        meta: [
          { name: 'robots', content: 'noindex, nofollow' }
        ]
      }
    },
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
      async login () {
        try {
          await this.$auth.loginWith('local', {
            data: {
              login: this.userSignIn.login,
              password: this.userSignIn.pass
            }
          })
          this.$router.push('/admin')
        } catch (e) {
          this.error = e
        }
      }
    }
  }
</script>

<style src="~/assets/scss/pages/admin.scss" lang="scss"></style>
