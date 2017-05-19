<template>
	<div id="cinema" v-if="movieList.length">
		<div id="movieBg">
			<img :src="movieList[movieListIndex].images.medium" alt=""> </div>
		<div id="movieListBox">
			<div id="movieList" class="row" :style="{width:(7.46+(movieList.length*2.54))+'rem',left:movieListTouch.left+'px'}"  @touchstart='movieListTouchFn' @touchmove='movieListTouchFn' @touchend='movieListTouchFn'>
				<template v-for="(items,index) in movieList">
					<img v-bind:src="items.images.medium" :class="{movieListImgTransition:index===movieListIndex}" alt=""> </template>
			</div>
		</div>
		<div id="movieTitle">
			<i></i>
			<h1>{{movieList[movieListIndex].title}}
				<span>{{movieList[movieListIndex].rating.average}}分</span>
			</h1>
			<h2>{{movieList[movieListIndex].durations[movieList[movieListIndex].durations.length-1]}}|{{movieList[movieListIndex].genres[0]}}|{{movieList[movieListIndex].casts[0].name}}</h2>
		</div>
		<div style="font-size:.3rem;margin-top:1rem;"> 无排片接口，暂无数据 </div>
	</div>
</template>

<script>
export default {
	name: 'cinema',
	props: ['global'],
	data: function () {
		return {
			movieList: [],
			movieListIndex: 0,
			movieListTouch: {
				left: 0,
				touchstart: null,
				touchstartLeft: null
			},
			moveToAutoTimer:null
		}
	},
	computed: {
		widthT: function () {
			return -(document.querySelector('#movieList').offsetWidth - document.querySelector('#movieListBox').offsetWidth);
		}
	},

	methods: {
		movieListTouchFn: function (e) {
			e.preventDefault();
			switch (e.type) {
				case 'touchstart':
					this.movieListTouch.touchstartLeft = this.movieListTouch.left;
					this.movieListTouch.touchstart = e.touches[0].clientX;
					clearInterval(this.moveToAutoTimer);
					break;
				case 'touchmove':
					var move = e.touches[0].clientX - this.movieListTouch.touchstart;
					// console.log(this.movieListTouch.left + ' ' + this.widthT + ' ' + move);
					if (this.movieListTouch.left >= 0) {
						if (move >= 0) {
							return;
						}
					} else if (this.movieListTouch.left <= -(document.querySelector('#movieList').offsetWidth - document.querySelector('#movieListBox').offsetWidth)) {
						if (move <= 0) {
							return;
						}
					}

					this.movieListTouch.left = this.movieListTouch.touchstartLeft + e.touches[0].clientX - this.movieListTouch.touchstart;

					break;
				case 'touchend':
					clearInterval(this.moveToAutoTimer);
					this.moveToAuto();
					break;

			}
		},

		moveToAuto: function () {
			// console.log(parseInt((-this.movieListTouch.left) / (1.27 * window.rem)));
			var index;
			if (this.movieListTouch.left > 0) {
				index = 0;
			}else{
				index = Math.round((-this.movieListTouch.left) / (2.54 * window.rem));
			}
			

			var coo= Math.round(-2.54 * window.rem * index);
			
			var that=this;

			this.moveToAutoTimer=setInterval(function () {
				if(Math.abs(that.movieListTouch.left-coo)<=5){
					that.movieListTouch.left=coo;
					clearInterval(that.moveToAutoTimer);
					return;
				}else if (that.movieListTouch.left > coo) {
					that.movieListTouch.left-=5;
				}else if(that.movieListTouch.left < coo){
					that.movieListTouch.left+=5;
				}else if(that.movieListTouch.left === coo){
					clearInterval(that.moveToAutoTimer);
					return;
				};
			}, 16.7);


			this.movieListIndex = index;

		}
	},

	created: function () {
		this.global.waiting=true;
		this.$http.get('http://121.196.214.248:8081/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&count=12').then(function (d) {
			this.movieList = d.data.subjects;
			this.global.waiting=false;
		})
	}
}
</script>

<style scoped lang="less">
#cinema {
	position: relative;
}

#movieBg {
	height: 3.9rem;
	z-index: 1;
	overflow: hidden;
	>img {
		-webkit-filter: blur(50px);
		-moz-filter: blur(50px);
		-o-filter: blur(50px);
		-ms-filter: blur(50px);
		filter: blur(50px);
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
	}
}

#movieListBox {
	-webkit-overflow-scrolling: touch;
	z-index: 2;
	width: 10rem;
	height: 3.9rem;
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	-webkit-transform: translateZ(0);
	-moz-transform: translateZ(0);
	-ms-transform: translateZ(0);
	-o-transform: translateZ(0);
	transform: translateZ(0);
	#movieList {
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-overflow-scrolling: touch;
		height: 3.9rem;
		position: absolute;
		left: 0;
		top: .6rem;
		padding: 0 3.73rem;
		img {
			-webkit-transform: translateZ(0);
			-moz-transform: translateZ(0);
			-ms-transform: translateZ(0);
			-o-transform: translateZ(0);
			transform: translateZ(0);
			width: 2.54rem;
			padding: 0 0.16rem;
			transform: scale(1, 1) translateY(0rem);
			transition: all 0.3s;
		}
	}
}

.movieListImgTransition {
	transform: scale(1.1, 1.1) translateY(-0.1rem)!important;
}

#movieTitle {
	z-index: 3;
	position: relative;
	i {
		width: 0;
		height: 0;
		border-top: .2rem solid transparent;
		border-right: .2rem solid transparent;
		border-left: .2rem solid transparent;
		border-bottom: .2rem solid white;
		position: absolute;
		left: 50%;
		top: -.3rem;
		margin-left: -.1rem;
	}
	h1 {
		font-size: .4rem;
		text-align: center;
		padding: .38rem 0 .18rem 0;
		span {
			font-size: .32rem;
			color: #ffaf05;
			padding-left: .1rem;
		}
	}
	h2 {
		font-size: .32rem;
		text-align: center;
		color: #979797;
	}
}
</style>