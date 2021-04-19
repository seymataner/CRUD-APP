import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL

const state = {
	status: '',
	token: localStorage.getItem('user-token') || '',
	user: {}
};

const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status,
	user: (state) => state.user
};

const actions = {
	login ({ commit }, user) {
		axios({ url: '/auth/login', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const user = resp.data.user_name
				const id = resp.data._id
				const is_admin = resp.data.is_admin
				const is_employee = resp.data.is_employee
				const is_customer = resp.data.is_customer
				const company_id = resp.data.company_id
				const firm_id = resp.data.firm_id
				const department_id = resp.data.department_id
				localStorage.setItem('user_token', token)
				localStorage.setItem('user_name', user)
				localStorage.setItem('user_id', id)
				//yetki görünümü localden kaldırılacak
				localStorage.setItem('is_admin', is_admin)
				localStorage.setItem('is_employee', is_employee)
				localStorage.setItem('is_customer', is_customer)
				localStorage.setItem('company_id', company_id)
				localStorage.setItem('firm_id', firm_id)
				localStorage.setItem('department_id', department_id)
				axios.defaults.headers.common['Authorization'] = token
				commit('AUTH_SUCCESS', resp.data)
				this.$router.push('/account')

			})
			.catch(err => {
				resp.json(err)
				commit('AUTH_ERROR')
				localStorage.removeItem('token')
			})
	},

	logout ({ commit }) {
		commit('AUTH_LOGOUT')
		localStorage.clear();

		delete axios.defaults.headers.common['Authorization']
	}
};

const mutations = {
	AUTH_SUCCESS (state, data) {
		state.status = 'success'
		state.token = data.token
		state.user = {
			user_name: data.user_name,
			id: data._id,
			is_admin: data.is_admin,
			is_customer: data.is_customer,
			is_employee: data.is_employee,
			company_id: data.company_id,
			department_id: data.department_id
		}
	},
	AUTH_SUCCESS_REGISTER (state) {
		state.status = 'success'
	},
	AUTH_LOGOUT (state) {
		state.status = ''
		state.token = ''
		state.user = ''
	},
	AUTH_ERROR (state) {
		state.status = 'error'
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};