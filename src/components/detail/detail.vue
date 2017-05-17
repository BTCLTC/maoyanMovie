<template>
    <div id="detail" v-if="detail.images">
        <div id="movieBg">
            <img v-bind:src="detail.images.large" alt=""> </div>
        <div id="movieBox" class="row">
            <div id="movieImg">
                <img v-bind:src="detail.images.large" alt=""> </div>
            <div id="movieText">
                <h1>{{detail.title}}</h1>
                <h2>{{detail.original_title}}</h2>
                <div class="row">
                    <div>
                        <h1>评分</h1>
                        <h2 style="color:#ffd100;">{{detail.rating.average}}</h2>
                    </div>
                </div>
                <h3 style="color:#cac8c4;">
                    <template v-for="items in detail.genres"> {{items}} </template>
                </h3>
                <h4 style="color:#cac8c4;">
                    <template v-for="items in detail.durations"> {{items}} </template>
                </h4>
                <h5 style="color:#cac8c4;">
                    <template v-for="items in detail.pubdates"> {{items}} </template>
                </h5>
            </div>
            <div id="movieBtn" class="row">
                <button id="movieBtnL">想看</button>
                <button id="movieBtnR">评分</button>
            </div>
        </div>
        <div id="movieDes" class="block">
            <p v-bind:class="{movieDesP:movieDesP}">{{detail.summary}}</p>
            <button v-show="movieDesP" v-on:click="movieDesBtnFn">﹀</button>
        </div>
        <div id="moviePerformer" class="block">
            <h1>演职人员</h1>
            <div>
                <div v-bind:style="'width:'+(detail.casts.length+detail.directors.length)*2.08+'rem;'" class="row">
                    <dl v-for="items in detail.directors">
                        <dt>
                            <img v-bind:src="items.avatars.medium" alt=""> </dt>
                        <dd>
                            <div>{{items.name}}</div>
                            <div style="color:#dcdcdc;">导演</div>
                        </dd>
                    </dl>
                    <dl v-for="items in detail.casts">
                        <dt>
                            <img v-bind:src="items.avatars.medium" alt=""> </dt>
                        <dd>
                            <div>{{items.name}}</div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div id="popularComments" class="block">
            <h1>观众评论</h1>
            <div v-for="items in detail.popular_comments">
                <div class="headImg">
                    <img v-bind:src="items.author.avatar" alt=""> </div>
                <div> {{items.author.name}} </div>
                <div v-bind:style="'backgroundSize:'+items.rating.value*20+'% 100%;'">
                    <img src="./stars.png" alt=""> </div>
                <div>
                    <p>{{items.content}}</p>
                </div>
                <div> {{items.created_at}} </div>
            </div>
        </div>
        <!--<div id="boxOffice">
    <h1>票房</h1>
    <div class="row">
    <dl>
    <dt>1</dt>
    <dd>昨日票房排行</dd>
    </dl>
    <dl>
    <dt>1</dt>
    <dd>昨日票房排行</dd>
    </dl>
    <dl>
    <dt>1</dt>
    <dd>昨日票房排行</dd>
    </dl>
    </div>
    </div>-->
        <!--<div id="imgBox">
            <h1>视频和剧照</h1>
            <div>
                <div class="row">

                    <template v-for="items in movieImg">
                        <div v-bind:style="'background-image:url('+items.image+')'"></div>
                    </template>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    name: 'detail',
    props: ['global'],
    data: function () {
        return {
            movieDesP: true,
            detail: {},
            movieImg: []
        }
    },
    methods: {
        movieDesBtnFn: function () {
            this.movieDesP = false;
        }
    },
    created: function () {
        this.global.waiting = true;
        this.$http.get('http://121.196.214.248:8081/v2/movie/subject/' + this.$route.params.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b').then(function (d) {
            this.detail = d.data;
            this.global.waiting = false;
        })
        this.$http.get('http://121.196.214.248:8081/v2/movie/subject/' + this.$route.params.id + '/photos?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=10').then(function (d) {
            console.log(d.data);
            this.movieImg=d.data.photos;
        })
    }
}
</script>

<style scoped lang="less">
.block {
    border-top: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    margin-bottom: 27px;
    background-color: white;
}

#detail {
    margin-top: 1.15rem;
    position: relative;
    background-color: #f5f5f5;
}

#movieBg {
    height: 5.88rem;
    overflow: hidden;
    -webkit-filter: blur(50px);
    -moz-filter: blur(50px);
    -o-filter: blur(50px);
    -ms-filter: blur(50px);
    filter: blur(50px);
}

#movieBox {
    height: 5.88rem;
    position: absolute;
    top: 0;
    width: 10rem;
    padding: .33rem .4rem;
    overflow: hidden;
}

#movieImg {
    width: 2.96rem;
}

#movieText {
    width: 6rem;
    color: white;
    line-height: .48rem;
    font-size: .3rem;
    padding: .17rem 0 0 .4rem;
    >h1 {
        line-height: .56rem;
        font-size: .46rem;
    }
    >h2 {
        line-height: .34rem;
        font-size: .23rem;
    }
}

#movieBtn {
    width: 10rem;
    position: absolute;
    bottom: .2rem;
    >button {
        border-radius: 6px;
        border: 0;
        width: 4.46rem;
        height: .81rem;
        font-size: .34rem;
        color: white;
        text-indent: 0.5rem;
    }
    >button:nth-child(1) {
        background: rgba(255, 255, 255, 0.4) url(./heart.png) no-repeat left 1.5rem center/0.5rem 0.5rem;
    }
    >button:nth-child(2) {
        background: rgba(255, 255, 255, 0.4) url(./5star.png) no-repeat left 1.5rem center/0.5rem 0.5rem;
    }
}

#movieBtnR {
    margin-left: .28rem;
}

#movieDes {
    background-color: white;
    >p {
        padding: .27rem .4rem 0 .4rem;
        line-height: .66rem;
        font-size: .36rem;
        overflow: hidden;
    }
    >button {
        width: 100%;
        border: 0;
        background-color: white;
        font-size: .4rem;
    }
}

.movieDesP {
    display: block;
    height: 3rem;
}

#moviePerformer {
    >h1 {
        text-indent: .4rem;
        font-size: .4rem;
        line-height: 1.1rem;
    }
    >div {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-left: .4rem;
    }
    >div dl {
        width: 1.87rem;
        margin-right: .21rem;
    }
    >div dl>dd {
        text-align: center;
        line-height: .44rem;
        font-size: .3rem;
    }
}

// #boxOffice {
//     background-color: white;
//     >h1 {
//         line-height: 1.1rem;
//         font-size: .4rem;
//         text-indent: .4rem;
//     }
//     >div {
//         text-align: center;
//     }
//     >div>dl {
//         width: 3.3333333rem;
//     }
//     >div>dl>dt {
//         line-height: .86rem;
//         font-size: .45rem;
//     }
//     >div>dl>dd {
//         line-height: .66rem;
//         font-size: .30rem;
//     }
// }

// #imgBox {
//     >h1{
//         line-height: 1.1rem;
//     font-size: .4rem;
//     text-indent: .4rem;
//     }
//     >div{
//         width: 10rem;
//         overflow-x: auto;
//         -webkit-overflow-scrolling: touch;
//     }
//     >div>div{
//         width: 20rem;
//         padding-left: .4rem;
//     }
//     >div>div>div{
//         width: 3rem;
//         height: 2rem;
//         margin-right: .21rem;
//         background-size: auto 100%;
//         background-position: center center;
//     }
// }

#popularComments>h1 {
    line-height: 1.1rem;
    font-size: .4rem;
    text-indent: .4rem;
}

#popularComments>div {
    position: relative;
    margin-left: 1.52rem;
    width: 8.48rem;
    border-bottom: 1px solid #dcdcdc;
    padding: 0.37rem 0.5rem 0.37rem 0;
}

#popularComments .headImg {
    position: absolute;
    left: -1.15rem;
    top: .4rem;
    width: .8rem;
    height: .8rem;
}

#popularComments .headImg>img {
    border-radius: 50%;
}

#popularComments>div>div:nth-child(2) {
    font-size: .3rem;
}

#popularComments>div>div:nth-child(3) {
    width: 1.66rem;
    margin: .2rem 0;
    background: #dcdcdc url(./yellow.png) no-repeat;
}

#popularComments>div>div:nth-child(4) {
    font-size: .4rem;
    line-height: .6rem;
}

#popularComments>div>div:nth-child(5) {
    font-size: .24rem;
    padding-top: .3rem;
    color: #c5c5c5;
}

#popularComments>div>div:nth-child(6) {}
</style>