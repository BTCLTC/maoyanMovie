<template>
    <div id="homeIndex">
        <div id="topNav" class="row">
            <div id="topNavL">南昌</div>
            <div id="topNavM">
                <div>
                    <span>热映</span>
                    <span>待映</span>
                </div>

            </div>
            <div id="topNavR"></div>
        </div>
        <div id="content">
            <ul>
                <li class="row" v-for="items in movieList">
                    <router-link v-bind:to="'/detail/'+items.id">
                        <div class="contentImg">
                            <img v-bind:src="items.images.medium" alt="">
                        </div>
                        <div class="contentText">
                            <h1>{{items.title}}</h1>
                            <h2>
                                <template v-for="items in items.genres">
                                    {{items}}
                                </template>
                            </h2>
                            <h3>
                                <template v-for="items in items.casts">
                                    {{items.name}}
                                </template>
                            </h3>
                            <h4>
                                <template v-for="items in items.pubdates">
                                    {{items}}
                                </template>
                            </h4>
                        </div>
                        <div class="contentBtn">
                            <span>{{items.rating.average}}<p>分</p></span>
                            <button>购票</button>
                        </div>
                    </router-link>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'index',
        props:['global'],
        data: function () {
            return {
                movieList:[]
            }
        },

        created:function(){
            this.$http.get('http://121.196.214.248:8081/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&count=22').then(function(d){
                this.movieList=d.data.subjects;
                this.global.waiting=false;
            })
        }
    }

</script>

<style scoped>
    #topNav {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: .36rem;
        border-bottom: 1px solid #dcdcdc;
    }

    #topNavL {
        width: 1.46rem;
        text-align: center;
        background: url(./66B7A27FF58C0AA7C319A5A2BD84730B_06.png) no-repeat right 0.6rem/.27rem .14rem;
    }

    #topNavM {
        width: 7.34rem;
        text-align: center
    }

    #topNavM>div {
        width: 3.17rem;
        margin:0 auto;
    }
    #topNavM>div>span:nth-child(1){
        height: 1.18rem;
        border-bottom: .06rem solid #ef3c20;
        width: 1.18rem;
        display: block;
        float: left;
    }
    #topNavM>div>span:nth-child(2){
        height: 1.18rem;
        /*border-bottom: .06rem solid #ef3c20;*/
        width: 1.18rem;
        float: right;
        display: block;
    }

    #topNavR {
        width: 1.2rem;
        height: 1.2rem;
        background: url(./66B7A27FF58C0AA7C319A5A2BD84730B_03.png) no-repeat center/.5rem .5rem;
    }


    #content>ul>li {

        border-bottom: 1px solid #dcdcdc;
        padding-top: .32rem;
        padding-bottom: .32rem;

    }

    .contentImg {
        float: left;
        width: 2.35rem;
    }

    .contentImg>img {
        width: 1.71rem;
        margin: 0 auto;
    }

    .contentText {
        float: left;
        font-size: .32rem;
        width: 5.79rem;
        color: #555555;
    }

    .contentText>h1 {
        font-size: .44rem;
        line-height: .7rem;
        color: black;
    }

    .contentText>h2 {

        line-height: .56rem;
    }

    .contentText>h3 {
        line-height: .56rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .contentText>h4 {
        line-height: .6rem;
        color: #979797;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .contentBtn {
        float: left;
        width: 1.86rem;
    }

    .contentBtn>span {
        text-align: center;
        display: block;
        padding-top: .2rem;
        font-size: .36rem;
        padding-bottom: .62rem;
        color: #ffa800;
    }

    .contentBtn>span>p {
        color: #ffa800;
        font-size: .26rem;
        display: inline;
    }

    .contentBtn>button {
        padding: .2rem .25rem;
        display: block;
        font-size: .32rem;
        color: white;
        background-color: #ef4238;
        border-radius: 7px;
        border: 0;
        margin: 0 auto;
    }
</style>