import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module

import auth from './modules/auth'
import departments from './modules/departments'
import requests from './modules/rooms'
import firms from './modules/firms'
import rooms from './modules/rooms'
import users from './modules/users'
import messages from './modules/messages'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
	  auth,
	  departments,
	  requests,
	  firms,
	  rooms,
	  users,
	  messages
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  return Store
}