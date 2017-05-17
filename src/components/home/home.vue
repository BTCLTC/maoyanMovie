<template>
	<div id="home">
		<keep-alive>
			<router-view :global="global"></router-view>
		</keep-alive>

		<div id="footerNav">
			<router-link to="/home/">
				<dl>
					<dt>
						<img v-if="footerNav===0" src="./movieA.png" alt="">
						<img v-else src="./movie.png" alt="">
					</dt>
					<dd v-bind:style="footerNav===0?'color:#ef4238;':''">电影</dd>
				</dl>
			</router-link>
			<router-link to="/home/cinema">
				<dl>
					<dt>
						<img v-if="footerNav===1" src="./cinemaA.png" alt="">
						<img v-else src="./cinema.png" alt="">
					</dt>
					<dd v-bind:style="footerNav===1?'color:#ef4238;':''">影院</dd>
				</dl>
			</router-link>
			<router-link to="/home/userInfo">
				<dl>
					<dt>
						<img v-if="footerNav===2" src="./userInfoA.png" alt="">
						<img v-else src="./userInfo.png" alt="">
					</dt>
					<dd v-bind:style="footerNav===2?'color:#ef4238;':''">我的</dd>
				</dl>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		props:['global'],
		data: function () {
			return {

			}
		},
		computed: {
			footerNav: function () {
				var temp = this.$route.path;
				if (temp.indexOf('userInfo') > 0) {
					return 2;
				} else if (temp.indexOf('cinema') > 0) {
					return 1;
				} else {
					return 0;
				}
			}
		}
	}

</script>

<style>
	#home{
		margin-top: 1.15rem;
		margin-bottom: 1.3rem;
	}

	#footerNav {
		z-index: 99;
		background-color: #f7f7fa;
		border-top: 1px solid #dcdcdc;
		width: 10rem;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 1.3rem;
	}

	#footerNav>a {
		float: left;
		display: block;
		width: 3.333333rem;
		height: 1.3rem;
		color:#737373;
	}

	#footerNav dl {

		margin: .18rem auto 0 auto;
	}

	#footerNav dt>img {
		width: .66rem;
		margin: 0 auto;
	}

	#footerNav dd {
		margin-top: .08rem;
		font-size: .26rem;
		line-height: .39rem;
		color: 737373;
		text-align: center;
	}
</style>