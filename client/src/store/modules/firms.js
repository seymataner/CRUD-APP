import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
const state = {
	firms: [],
	allFirms: []
}

const actions = {
	async fetchFirms ({ commit }, id) {
		const response = await axios.get('/companies/' + id);
		let selectFirms = [];

		if (response && response.status === 200) {
			if (response.data[0] && response.data[0].Firms) {
				response.data[0].Firms.forEach(firm => {
					selectFirms.push({
						label: firm.firm_name,
						value: firm._id
					});
				});
			}
		}
		commit('SET_FIRMS', selectFirms)

	},
	async fetchAllFirms ({ commit }, id) {
		const response = await axios.get('/companies/' + id);
		if (response && response.status === 200) {
		commit('SET_ALL_FIRMS', response.data[0].Firms)
		}
	},
	async pushFirm ({ commit }, pushData) {
		const response = await axios.post('/firms', pushData);
		if (response && response.status === 200) {
		commit('ADD_FIRM', response.data)
		}
	},
	async deleteFirm ({ commit }, id) {
		const response = await axios.delete('/firms/' + id);
		if (response && response.status === 200) {
		commit('DELETE_FIRM', id)
		}
	},
	async updateFirm ({ commit }, changedData) {
		const response = await axios.put('firms/' + changedData._id, changedData);
		if (response && response.status === 200) {
		commit('UPDATE_FIRM', changedData)
		}
	}
}

const mutations = {
	SET_FIRMS: (state, firms) => {
		state.firms = firms
	},
	SET_ALL_FIRMS: (state, allFirms) => {
		state.allFirms = allFirms
	},
	SET_ONE_FIRM: (state, allFirms) => {
		state.allFirms = allFirms
	},
	ADD_FIRM: (state, pushData) => {
		state.allFirms.unshift(pushData)
	},
	DELETE_FIRM: (state, id) => {
		state.allFirms = state.allFirms.filter(firm => firm._id !== id)
	},
	UPDATE_FIRM: (state, changedData) => {
		const index = state.allFirms.findIndex(firm => firm._id === changedData._id);
		if (index !== -1) {
			state.allFirms.splice(index, 1, changedData)
		}
	}
}

const getters = {
	firms: (state) => state.firms,
	allFirms: (state) => state.allFirms
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
