export default function ({ store, redirect }) {
  if (!store.state.localStorage.loggedIn) {
    return redirect('/login')
  }
}
