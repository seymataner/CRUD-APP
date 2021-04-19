
export default function auth (/* { to, from, next, store } */ { next, store }) {
	if (!store.auth.getters.user.is_admin) {
		debugger;
		return next({ name: 'account' })
	}
	return next()
}