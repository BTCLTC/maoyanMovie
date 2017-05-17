<template>
	<div id="app">
		<div id="appTitle">
			<button v-show="backBtn" v-on:click="routerGo" id="appTitleL"></button>
			<button v-show="backBtn" id="appTitleR"></button>
			<h1>{{global.appTitle}}</h1>
		</div>
		<keep-alive include="home">
			<router-view v-bind:global="global"></router-view>
		</keep-alive>
		<div v-show="global.waiting" id="waiting"> </div>
		<div id="mask">123</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data: function () {
		return {
			global: {
				appTitle: '猫眼电影',
				backBtn: false,
				waiting: true
			},
		}
	},
	computed: {
		backBtn: function () {

			if (this.$route.path.indexOf('home') === 1) {
				return false;
			}
			return true;
		}
	},
	methods: {
		routerGo: function () {
			this.$router.go(-1);
		}
	}
}

</script>

<style>
html {
	font-family: "Lucida Grande", 'Lucida Sans Unicode', "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif!important;
}

button {
	font-family: "Lucida Grande", 'Lucida Sans Unicode', "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif!important;
}

body {
	width: 10rem;
}

#app {
	width: 10rem;
}

#appTitle {
	z-index: 99;
	position: fixed;
	top: 0;
	left: 0;
	width: 10rem;
	height: 1.15rem;
	background-color: #dd403b;
}

#appTitleL {
	width: 1.15rem;
	height: 1.15rem;
	float: left;
	border: 0;
	color: white;
	font-size: .36rem;
	background: #dd403b url(./left.png) no-repeat center center/0.5rem 0.5rem;
}

#appTitleR {
	width: 1.15rem;
	height: 1.15rem;
	float: right;
	border: 0;
	background-color: #dd403b;
}

#appTitle>h1 {
	font-size: .36rem;
	line-height: 1.15rem;
	text-align: center;
	color: white;
}

#waiting {
	width: 100%;
	height: 100%;
	position: fixed;
	width: 10rem;
	left: 0;
	top: 0;
	z-index: 98;
	background: white url(./wait.gif) no-repeat center center/2.5rem 3.28rem;
}

@media all and (orientation: landscape) {
	/*横屏时代码*/
	#mask {
		display: block;
		width: 100%;
		height: 100%;
		background: black url(./mask.png) no-repeat center center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
}

@media all and (orientation: portrait) {
	/*竖屏时代码*/
	#mask {
		display: none;
	}
}
</style>