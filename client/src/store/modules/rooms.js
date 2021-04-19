import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
const state = {
	allRooms: []
}


const actions = { // aynı şirketten olması için şirket altındaki departmanlar alınır. 
	async fetchAllRooms ({ commit }, id) {
		const response = await axios.get('/users/' + id);
		if (response && response.status === 200) {
			commit('SET_ALL_ROOM', response.data[0].Rooms)
		}
	},
	async fetchAllDepRooms ({ commit }, id) {
		const response = await axios.get('/departments/' + id);
		if (response && response.status === 200) {
			commit('SET_ALL_ROOM', response.data[0].Rooms)
		}
	},

	async pushRoom ({ commit }, pushData) {
		const response = await axios.post('/rooms', pushData);
		if (response && response.status === 200) {
			commit('ADD_ROOM', response.data)
		}
	},
	async deleteRoom ({ commit }, id) {
		const response = await axios.delete('/rooms/' + id);
		if (response && response.status === 200) {
			commit('DELETE_ROOM', id)
		}
	},
	async updateRoom ({ commit }, changedData) {
		const response = await axios.put('rooms/' + changedData._id, changedData);
		if (response && response.status === 200) {
			commit('UPDATE_ROOM', changedData)
		}
	}
}

const mutations = {
	SET_ALL_ROOM: (state, allRooms) => {
		state.allRooms = allRooms
	},
	ADD_ROOM: (state, pushData) => {
		state.allRooms.unshift(pushData)
	},
	DELETE_ROOM: (state, id) => {
		state.allRooms = state.allRooms.filter(room => room._id !== id)
	},
	UPDATE_ROOM: (state, changedData) => {
		const index = state.allRooms.findIndex(room => room._id === changedData._id);
		if (index !== -1) {
			state.allRooms.splice(index, 1, changedData)
		}
	}
}

const getters = {
	allRooms: (state) => state.allRooms

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};