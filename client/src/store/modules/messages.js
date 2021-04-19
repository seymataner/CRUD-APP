import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
const state = {
	allMessages : []
}


const actions = { // aynı şirketten olması için şirket altındaki departmanlar alınır. 
	async fetchAllMessages ({ commit }, id) {
		const response = await axios.get('/rooms/' + id);
		if (response && response.status === 200) {
		commit('SET_ALL_MESSAGE', response.data[0].Messages)
		}
	},
	async pushMessage({ commit }, pushData) {
		const response = await axios.post('/messages', pushData);
		if (response && response.status === 200) {
		commit('ADD_MESSAGE', response.data)
		}
	},
	async deleteMessage({ commit }, id) {
		const response = await axios.delete('/messages/' + id);
		if (response && response.status === 200) {
		commit('DELETE_MESSAGE', id)
		}
	},
	async updateMessage ({ commit }, changedData) {
		const response = await axios.put('messages/' + changedData._id, changedData);
		if (response && response.status === 200) {
		commit('UPDATE_MESSAGE', changedData)
		}
	}
}

const mutations = {
	SET_ALL_MESSAGE: (state, allMessages) => {
		state.allMessages = allMessages
	},
	ADD_MESSAGE: (state, pushData) => {
		state.allMessages.push(pushData)
	},
	DELETE_MESSAGE: (state, id) => {
		state.allMessages = state.allMessages.filter(message => message._id !== id)
	},
	UPDATE_MESSAGE: (state, changedData) => {
		const index = state.allMessages.findIndex(message => message._id === changedData._id);
		if (index !== -1) {
			state.allMessages.splice(index, 1, changedData)
		}
	}
}

const getters = {
	allMessages: (state) => state.allMessages

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};