export default function ({ store, redirect }) {
  if (!store.state.user.isLoggined) {
    return redirect('/login')
  }
}
