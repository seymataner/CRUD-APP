
import auth from './middlewares'


const routes = [
	{

		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '/departments', meta: {
					middlewares: [auth]
				}, component: () => import('pages/PageDepartments.vue')
			},
			{ path: '/users', component: () => import('pages/PageUsers.vue') },
			{ path: '/requests', component: () => import('pages/PageRooms.vue') },
			{ path: '/rooms', component: () => import('pages/PageDepRooms.vue') },
			{ path: '/account', component: () => import('pages/PageAccount.vue') },
			{ path: '/firms', component: () => import('pages/PageFirms.vue') },
			{ path: '/analysis', component: () => import('pages/PageAnalysis.vue') },
			{ path: '/messages/:roomId', component: () => import('pages/PageMessages.vue') },
		],

	},
	{
		path: '/login',

		component: () => import('layouts/HomeLayout.vue'),
		children: [

			{ path: '/login', component: () => import('pages/PageLogin.vue') },

		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}

]

export default routes
