import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
const state = {
	allUsers: [],
	user:{}
}

const actions = { // aynı şirketten olması için şirket altındaki departmanlar alınır. 
	async fetchAllUsers ({ commit }, id) {
		console.log(id)
		const response = await axios.get('/companies/' + id);
		if (response && response.status === 200) {
		commit('SET_ALL_USER', response.data[0].Users)
		}
	},
	async fetchUser ({ commit }, id) {
		const response = await axios.get('/users/' + id);
		if (response && response.status === 200) {
		commit('SET_USER', response.data[0])
		}
	},
	async pushUser ({ commit }, pushData) {
		const response = await axios.post('/users', pushData);
		if (response && response.status === 200) {
		commit('ADD_USER', response.data)
		}
	},
	async deleteUser ({ commit }, id) {
		const response = await axios.delete('/users/' + id);
		if (response && response.status === 200) {
		commit('DELETE_USER', id)
		}
	},
	async updateUser ({ commit }, changedData) {
		const response = await axios.put('users/' + changedData._id, changedData);
		if (response && response.status === 200) {
		commit('UPDATE_USER', changedData)
		}
	}
}

const mutations = {
	SET_ALL_USER: (state, allUsers) => {
		state.allUsers = allUsers
	},
	SET_USER: (state,user) => {
		state.user = user
	},
	ADD_USER: (state, pushData) => {
		state.allUsers.unshift(pushData)
	},
	DELETE_USER: (state, id) => {
		state.allUsers = state.allUsers.filter(user => user._id !== id)
	},
	UPDATE_USER: (state, changedData) => {
		const index = state.allUsers.findIndex(user => user._id === changedData._id);
		if (index !== -1) {
			state.allUsers.splice(index, 1, changedData)
		}
	}
}

const getters = {
	allUsers: (state) => state.allUsers,
	user: (state) => state.user
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
