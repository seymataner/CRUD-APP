import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL
const state = {
	departments: [],
	allDepartments: []
}

const actions = { // aynı şirketten olması için şirket altındaki departmanlar alınır. 
	async fetchDepartments ({ commit }, id) {
		const response = await axios.get('/companies/' + id);
		let selectDepartments = [];

		if (response && response.status === 200) {
			if (response.data[0] && response.data[0].Departments) {
				response.data[0].Departments.forEach(department => {
					selectDepartments.push({
						label: department.department_name,
						value: department._id
					});
				});
			}
		}
		commit('SET_DEPARTMENT', selectDepartments)

	},
	async fetchAllDepartments ({ commit }, id) {
		const response = await axios.get('/companies/' + id);
		if (response && response.status === 200) {
			commit('SET_ALL_DEPARTMENT', response.data[0].Departments)
		}
	},
	async pushDepartment ({ commit }, pushData) {
		const response = await axios.post('/departments', pushData);
		if (response && response.status === 200) {
		commit('ADD_DEPARTMENT', response.data)
		}
	},
	async deleteDepartment ({ commit }, id) {
		const response = await axios.delete('/departments/' + id);
		if (response && response.status === 200) {
		commit('DELETE_DEPARTMENT', id)
		}
	},
	async updateDepartment ({ commit }, changedData) {
		const response = await axios.put('departments/' + changedData._id, changedData);
		if (response && response.status === 200) {
		commit('UPDATE_DEPARTMENT', changedData)
		}
	}
}

const mutations = {
	SET_DEPARTMENT: (state, departments) => {
		state.departments = departments
	},
	SET_ALL_DEPARTMENT: (state, allDepartments) => {
		state.allDepartments = allDepartments
	},
	ADD_DEPARTMENT: (state, pushData) => {
		state.allDepartments.unshift(pushData)
	},
	DELETE_DEPARTMENT: (state, id) => {
		state.allDepartments = state.allDepartments.filter(department => department._id !== id)
	},
	UPDATE_DEPARTMENT: (state, changedData) => {
		const index = state.allDepartments.findIndex(department => department._id === changedData._id);
		if (index !== -1) {
			state.allDepartments.splice(index, 1, changedData)
		}
	}
}

const getters = {
	departments: (state) => state.departments,
	allDepartments: (state) => state.allDepartments
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
