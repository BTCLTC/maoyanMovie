import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home/home';
import index from '@/components/home/index/index';
import cinema from '@/components/home/cinema/cinema';
import userInfo from '@/components/home/userInfo/userInfo';

import detail from '@/components/detail/detail';



Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/home', name: 'home', component: home,
			children: [
				
				{ path: 'cinema', component: cinema },
				{ path: 'userInfo', component: userInfo },
				{ path: '*', component: index }
			]
		},
		{ path: '/detail/:id', name: 'detail', component: detail }
	]
})
