<template>
    <div class="edu">
        <div class="edu_top wow animate__animated animate__fadeIn" :style="{'backgroundImage': 'url('+ backgroundFileUrl+')'}" @click="goOtherPath(bannerDetail)">
            <img v-if="bannerDetail.image" :src="url + bannerDetail.image.fileUrl" alt="" @load="bannerImgLoading">
        </div>
        <div class="edu_content">
            <!-- 中心介绍 -->
            <div class="center_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{center.chineseName}}</div>
                    <div class="english">{{center.englishName}}</div>
                </div>
                <div class="center_content">
                    <div class="center_content_box">
                        <div class="center_section">
                            <div class="center_section_left wow animate__animated animate__fadeInLeft" data-wow-delay=".8s">
                                <div class="center_section_left_top">
                                    <div class="center_section_left_top_title">
                                        <div class="center_section_left_top_title_left">{{center.chineseName}}</div>
                                        <div class="center_section_left_top_title_line"></div>
                                    </div>
                                    <div class="center_section_left_top_view"
                                    >
                                        <!-- :style="centerLeftStyle" @mouseenter="handleMouseEnter(1,'left')" @mouseleave="handleMouseLeave(1,'left')"
                                        <img class="half_image" src="../../assets/images/arrow_half_right.png" alt="">
                                        <div class="center_section_left_top_view_text">查看</div> -->
                                    </div>
                                </div>
                                <div class="center_section_left_bottom">
                                    {{center.profile}}
                                </div>
                            </div>
                            <div class="center_section_right wow animate__animated animate__fadeInRight" data-wow-delay=".8s"
                                @mouseenter="handleMouseEnter(1,'right')" @mouseleave="handleMouseLeave(1,'right')">
                                <img class="center_section_right_img" v-if="center.imgSrc" :style="centerRightStyle" :src="url+center.imgSrc" alt="">
                                <div class="center_section_right_bottom" :style="centerRightStyle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="center_content_grey"></div>
                </div>
            </div>
            <!-- 团队管理 -->
            <div class="team_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="team">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{team.chineseName}}</div>
                    <div class="english">{{team.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section" @mouseenter="onMouseEnter(1)" @mouseleave="onMouseLeave(1)">
                        <swiper :options="swiperOption" ref="mySwiperTeam" v-if="team.list.length"
                        >
                            <swiper-slide
                                class="swiper-slide"
                                v-for="(item, index) in team.list"
                                :key="index"
                            >
                                <img v-if="item.image" :src="url+item.image.fileUrl" />
                                <div class="person">
                                    <div class="person_box">
                                        <div class="person_top">
                                            <div class="person_top_left">{{item.name}}</div>
                                            <div class="person_top_right">{{item.job}}</div>
                                        </div>
                                        <div class="person_bottom">{{item.content}}</div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-paginations" slot="pagination"></div>
                    </div>
                </div>
            </div>
            <!-- 荣誉资质 -->
            <div class="hon_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="honor">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{honor.chineseName}}</div>
                    <div class="english">{{honor.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_content_box">
                        <div class="team_section" @mouseenter="onMouseEnter(2)" @mouseleave="onMouseLeave(2)">
                            <swiper :options="swiperOptionHon" ref="mySwiperHon" v-if="honor.list.length"
                            >
                                <swiper-slide
                                    class="swiper-slide"
                                    v-for="(item, index) in honor.list"
                                    :key="index"
                                >
                                    <img v-if="item.image" :src="url+item.image.fileUrl" />
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="hon_left">
                            <div class="swiper-button-prev" slot="button-prev">
                            </div>
                        </div>
                        <div class="hon_right">
                            <div class="swiper-button-next" slot="button-next">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 发展历程 -->
            <div class="dev_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="development">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{development.chineseName}}</div>
                    <div class="english">{{development.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_content_box">
                        <div class="team_content_box_top">
                            <div class="team_section">
                                <swiper :options="swiperOptionDev" ref="mySwiperDev" v-if="development.list.length"
                                >
                                    <swiper-slide
                                        class="swiper-slide"
                                        v-for="(item, index) in development.list"
                                        :key="index"
                                    >
                                        <div class="date">{{item.time}}</div>
                                        <div class="point_box">
                                            <div class="point"></div>
                                        </div>
                                        <div class="text">{{item.content}}</div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                            <div class="hon_left">
                                <div class="swiper-button-prev swiper-button-prevs" slot="button-prev">
                                </div>
                            </div>
                            <div class="hon_right">
                                <div class="swiper-button-next swiper-button-nexts" slot="button-next">
                                </div>
                            </div>
                        </div>
                        <div class="team_content_box_bottom">
                            <div v-for="(item, index) in yearList" :key="index" class="year_item"
                            >
                                <div class="year_item_name"
                                 :class="{active:yearActive==item.id}"
                                 @click="handleYearClick(item.id)"
                                >
                                 {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dev_line"></div>
                </div>
            </div>
            <!-- 中心风采 -->
            <div class="team_in elegance_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{elegance.chineseName}}</div>
                    <div class="english">{{elegance.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section" @mouseenter="onMouseEnter(3)" @mouseleave="onMouseLeave(3)">
                        <swiper :options="swiperOptionElegance" ref="mySwiperEle" v-if="elegance.list.length"
                        >
                            <swiper-slide
                                class="swiper-slide"
                                v-for="(item, index) in elegance.list"
                                :key="index"
                            >
                                <img v-if="item.image" :src="url+item.image.fileUrl" />
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-paginationss" slot="pagination"></div>
                    </div>
                </div>
            </div>
            <!-- 合作伙伴 -->
            <div class="team_in partner_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{partner.chineseName}}</div>
                    <div class="english">{{partner.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section" @mouseenter="onMouseEnter(4)" @mouseleave="onMouseLeave(4)">
                        <swiper :options="swiperOptionPartner" ref="mySwiper" v-if="partner.list.length"
                        >
                            <swiper-slide
                                class="swiper-slide partner_slide"
                                v-for="(item, index) in partner.list"
                                :key="index"
                            >
                                <img v-if="item.image" :src="url+item.image.fileUrl" />
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { strategyPage,introGet,serviceTypePage,dishPage,playNanshanPage,suggestionsTypePage,scenicPage,moduleList,moduleDataPage } from "../../api/management.js";
export default {
    computed: {
        mySwiperTeam() {
            return this.$refs.mySwiperTeam.swiper
        },
        mySwiperHon() {
            return this.$refs.mySwiperHon.swiper
        },
        mySwiperEle() {
            return this.$refs.mySwiperEle.swiper
        },
        mySwiper() {
            return this.$refs.mySwiper.swiper
        },
        centerLeftStyle() {
            return {
                transform: this.isHoverCenterLeft ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
        centerRightStyle() {
            return {
                transform: this.isHoverCenterRight ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s ease-in-out',
            };
        },
    },
    data() {
        return {
            url:process.env.VUE_APP_WEB_URL,
            // 中心介绍
            isHoverCenterLeft:false,
            isHoverCenterRight:false,
            bannerDetail:{},
            imageLoading:false,
            backgroundFileUrl:'',
            center:{
                chineseName:'中心介绍',
                englishName:'Introduce',
                profile:'',
                imgSrc:'',
            },
            // 团队管理
            team:{
                chineseName:'管理团队',
                englishName:'IPMT',
                list:[]
            },
            swiperOption: {
                loop: true, //是否循环轮播
                autoplay: true, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 20,
                slidesPerView: 4,
                pagination: {
                    el: ".swiper-paginations",
                    clickable: true,
                },
                on: {
                    slideChangeTransitionEnd() {
                        this.autoplay.start();//拖拽之后继续轮播
                    },
                },
            },
            // 荣誉资质
            honor:{
                chineseName:'荣誉资质',
                englishName:'HONOR',
                list:[]
            },
            swiperOptionHon: {
                loop: true, //是否循环轮播
                autoplay: true, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 20,
                slidesPerView: 3,
                pagination: {
                    el: ".swiper-paginations",
                    clickable: true,
                },
                //左右切换
                navigation: {
                   nextEl: ".swiper-button-next",
                   prevEl: ".swiper-button-prev",
                },
                on: {
                    slideChangeTransitionEnd() {
                        this.autoplay.start();//拖拽之后继续轮播
                    },
                },
            },
            // 发展历程
            development:{
                chineseName:'发展历程',
                englishName:'DEVELOPMENT',
                list:[]
            },
            swiperOptionDev: {
                loop: false, //是否循环轮播
                autoplay: false, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 120,
                slidesPerView: 4,
                //左右切换
                navigation: {
                   nextEl: ".swiper-button-nexts",
                   prevEl: ".swiper-button-prevs",
                },
            },
            yearActive:0,
            yearList:[],
            //最近七年
            year:[],
            // 中心风采
            elegance:{
                chineseName:'中心风采',
                englishName:'Team Style',
                list:[]
            },
            swiperOptionElegance: {
                loop: true, //是否循环轮播
                autoplay: true, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 35,
                slidesPerView: 3,
                pagination: {
                    el: ".swiper-paginationss",
                    clickable: true,
                },
                on: {
                    slideChangeTransitionEnd() {
                        this.autoplay.start();//拖拽之后继续轮播
                    },
                },
            },
            // 合作伙伴
            partner:{
                chineseName:'合作伙伴',
                englishName:'Strategic partners',
                list:[]
            },
            swiperOptionPartner: {
                slidesPerColumn: 3,
                speed: 2000,
                loop: false, //是否循环轮播
                // autoplay: false, //可选选项，自动滑
                autoplay:{
                    delay:1,
                    desableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 40,
                slidesPerView: 4,
                on: {
                    slideChangeTransitionEnd() {
                        this.autoplay.start();//拖拽之后继续轮播
                    },
                },
            },
        }
    },
    methods:{
        bannerImgLoading(ev) {
            this.imageLoading = true
            this.backgroundFileUrl = this.url + this.bannerDetail.image.fileUrl;
        },
        // banner图
        async getScenicPage() {
            const res = await scenicPage (
                {
                    current:1,
                    pageSize:-1,
                    type:2,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    res.data.records.forEach((item) => {
                        if(item.bannerName=='中心介绍') {
                            this.bannerDetail = item;
                            this.backgroundFileUrl = this.url + item.image.thinUrl;
                        }
                    })
                }
            }
        },
        goOtherPath(item) {
            if(item.linkUrl) {
                window.open(item.linkUrl)
            }
        },
        onMouseEnter(id) {
            if(id==1) {
                this.mySwiperTeam.autoplay.stop()
            } else if(id==2) {
                this.mySwiperHon.autoplay.stop()
            } else if(id==3) {
                this.mySwiperEle.autoplay.stop()
            } else if(id==4) {
               this.mySwiper.autoplay.stop()
            }
        },
        onMouseLeave(id) {
            if(id==1) {
                this.mySwiperTeam.autoplay.start()
            } else if(id==2) {
                this.mySwiperHon.autoplay.start()
            } else if(id==3) {
                this.mySwiperEle.autoplay.start()
            } else if(id==4) {
               this.mySwiper.autoplay.start()
            }
        },
        handleMouseEnter(item,location) {
            if(item==1) {
                // 中心介绍
                if(location=='left') {
                   this.isHoverCenterLeft = true;
                } else if(location=='right') {
                   this.isHoverCenterRight = true;
                }
            }
        },
        handleMouseLeave(item,location) {
            if(item==1) {
                // 中心介绍
                if(location=='left') {
                   this.isHoverCenterLeft = false;
                } else if(location=='right') {
                   this.isHoverCenterRight = false;
                }
            }
        },
        handleYearClick(id) {
            // 清除轮播图实例，然后重建
            this.$nextTick(() => {
                if (this.$refs.mySwiperDev) {
                    this.$refs.mySwiperDev.swiper.slideTo(0, 1000, false)
                }
            });
            this.yearActive =id
            this.development.list = []
            this.year.forEach((item) => { 
                if(item.year==id) {
                    this.development.list.unshift(item)
                }
            })
        },
        // 发展历程
        async getDishPage() {
            const res =await dishPage()
            if(res.code==1) {
                if(res.data.dishList.length>0) {
                    this.year = res.data.dishList
                }
                if(res.data.yearList.length>0) {
                    res.data.yearList.forEach((item) => {
                        this.yearList.unshift(
                            {
                                id:item,
                                name:item
                            }
                        )
                    })
                    this.handleYearClick(this.yearList[0].id)
                }
            }
        },
        getJump() {
            var hash = window.location.hash;
            var index = hash.lastIndexOf("#");
            if (index != -1) {
                var id = hash.substring(index + 1, hash.length + 1);
                var div = document.getElementById(id);
                if (div) {
                    setTimeout(function () {
                    $('html, body').animate({scrollTop: $(div).offset().top - 80}, 500)
                    }, 500);
                }
            }
        },
        // 中心介绍
        async getCenterIntro() {
            const res =await introGet()
            if(res.code==1) {
                this.center.profile = res.data.intro
                if(res.data.images.length>0) {
                    this.center.imgSrc = res.data.images[0].fileUrl
                }
            }
        },
        // 管理团队
        async strategyPage() {
            const res = await strategyPage(
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                this.team.list = res.data.records
            }
        },
        // 荣誉资质
        async serviceTypePage() {
            const res = await serviceTypePage(
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                this.honor.list = res.data.records
            }
        },
        // 中心风采
        async getPlayNanshanPage() {
            const res = await playNanshanPage(
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                this.elegance.list = res.data.records
            }
        },
        // 合作伙伴
        async getSuggestionsTypePage() {
            const res = await suggestionsTypePage (
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.partner.list = res.data.records;
                }
            }
        },
        async getModuleList() {
            const res = await moduleList(
                {
                    current:1,
                    pageSize:-1,
                    flag:1
                }
            )
            console.log(res);
            

        }
    },
    created() {
        this.getModuleList()
        this.getScenicPage()
        this.strategyPage()
        this.serviceTypePage()
        this.getCenterIntro()
        this.getDishPage()
        this.getPlayNanshanPage()
        this.getSuggestionsTypePage()
    },
    mounted() {
        new this.$wow.WOW().init();
        this.getJump()
    }
}
</script>
<style lang="scss" scoped>
// 引入css
.edu {
    width: 100%;
    height: 100%;
    .edu_top {
        height: 575px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        img {
            width: 0;
            height: 0;
            object-fit: cover;
        }
    }
    .edu_content {
        width: 100%;
        .center_in {
            width: 100%;
            padding-bottom: 150px;
            background: url('../../assets/images/index/in_bgc_1.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .title {
                padding: 74px 0;
                font-size: 43px;
                color: #172b57;
                font-weight: bold;
                text-align: center;
                .english {
                    text-align: center;
                    font-size: 30px;
                    color: #6d778b;
                }
            }
            .center_content {
                width: 100%;
                height: 360px;
                position: relative;
                .center_content_grey {
                    height: 100%;
                    position: absolute;
                    height: 100%;
                    width: 1040px;
                    background-color: #f0f2f6;
                }
                .center_content_box {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 99;
                    padding-left:80px ;
                    .center_section {
                        height: 100%;
                        width: 1280px;
                        margin: 0 auto;
                        word-wrap: break-word;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .center_section_left{
                            width: 600px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .center_section_left_top {
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                margin-bottom:35px;
                                .center_section_left_top_title{
                                    position: relative;
                                    .center_section_left_top_title_left {
                                        font-size: 22px;
                                        color: #152955;
                                        font-weight: 600;
                                    }
                                    .center_section_left_top_title_line{
                                        position: absolute;
                                        top: 37px;
                                        left: 0;
                                        background-color: #0053e5;
                                        height: 4px;
                                        width: 90%;
                                    }
                                }
                                .center_section_left_top_view {
                                    display: flex;
                                    font-size: 17px;
                                    color: #0050f4;
                                    cursor: pointer;
                                    .half_image {
                                        width: 30px;
                                        margin-right: 6px;
                                    }
                                    .center_section_left_top_view_text {
                                        display: flex;
                                        align-items: center;
                                    }
                                }
                            }
                            .center_section_left_bottom{
                                // 文字两端对齐
                                text-align: justify;
                                text-justify: inter-ideograph;
                                color: #1d305b;
                                line-height: 32px;
                                text-indent: 2em;
                                font-size: 16.5px;
                            }
                        }
                        .center_section_right{
                            width: 600px;
                            height: 100%;
                            position: relative;
                            .center_section_right_img {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 999;
                            }
                            .center_section_right_bottom {
                                position: absolute;
                                top: 40px;
                                left: 40px;
                                width: 100%;
                                height: 100%;
                                background: linear-gradient(to bottom, #30a9f9, #211ccb);
                                box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
                            }
                        }
                    }
                }
            }
        }
        .team_in {
            width: 100%;
            padding-bottom: 100px;
            background: url('../../assets/images/cen/cen_bgc_2.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .title {
                padding: 74px 0 27px 0;
                font-size: 43px;
                color: #172b57;
                font-weight: bold;
                text-align: center;
                .english {
                    text-align: center;
                    font-size: 30px;
                    color: #6d778b;
                }
            }
            .team_content{
                height: 460px;
                .team_section {
                    height: 100%;
                    width: 1230px;
                    margin: 0 auto;
                    position: relative;
                    .swiper-container {
                        .swiper-wrapper {
                            .swiper-slide {
                                padding-top: 20px;
                                position: relative;
                                width: 285px;
                                height: 450px;
                                img {
                                   width: 100%;
                                   height: 315px;
                                }
                                .person {
                                    position: absolute;
                                    top:230px;
                                    left: 0;
                                    overflow: visible;
                                    .person_box {
                                        padding: 15px 10px;
                                        margin: 0 20px;
                                        color: #111111;
                                        background-color: rgba(255,255,255, 0.8); /* 白色半透明背景 */
                                        box-shadow: 0 0 4px rgba(0,0,0,0.1);
                                        .person_top {
                                            display: flex;
                                            align-items: flex-end;
                                            .person_top_left {
                                                font-size: 22px;
                                                margin-right: 13px;
                                            }
                                            .person_top_right{
                                                font-size: 17px;
                                            }
                                        }
                                        .person_bottom {
                                            // 文字两端对齐
                                            text-align: justify;
                                            text-justify: inter-ideograph;
                                            height: 120px;
                                            width: 232.5px;
                                            font-size: 15px;
                                            margin-top: 23px;
                                            line-height: 24px;
                                            // padding-bottom: 20px;
                                            // 超过四行显示...
                                            display: -webkit-box;
                                            -webkit-line-clamp: 5;
                                            -webkit-box-orient: vertical;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                        }
                                    }
                                }
                            }
                            // 鼠标移入
                            .swiper-slide:hover {
                                // 放大1.05倍
                                transform: scale(1.05);
                                transition: transform 0.4s ease-in-out;
                                .person{
                                    .person_box{
                                        color: #FFFFFF;
                                        background-color: rgba(0,83,229, 0.8); /* 白色半透明背景 */
                                        box-shadow: 0 0 4px rgba(0,0,0,0.1);
                                    }
                                }
                            }
                            // 鼠标移出
                            .swiper-slide:not(:hover) {
                                // 缩小1.1倍
                                transform: scale(1);
                                transition: transform 0.4s ease-in-out;
                                .person{
                                    .person_box{
                                        color: #111111;
                                        background-color: rgba(255,255,255, 0.8); /* 白色半透明背景 */
                                        box-shadow: 0 0 4px rgba(0,0,0,0.1);
                                    }
                                }
                            }
                        }
                    }
                    :deep .swiper-paginations {
                        text-align: center;
                        width: 100%;
                        position: absolute;
                        left: 50%;
                        bottom: -20px;
                        transform: translate(-50%, 100%);
                        .swiper-pagination-bullet {
                            width: 15px;
                            height: 15px;
                            border-radius: 8px;
                            background: #d6d7da;
                            opacity: 0.9;
                            margin-right: 30px;
                        }
                        .swiper-pagination-bullet-active {
                            background-color: #0053e5;
                        }
                    }
                }
            }
        }
        .hon_in {
            width: 100%;
            padding-bottom: 140px;
            background: url('../../assets/images/cen/cen_bgc_3.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .title {
                padding: 74px 0 27px 0;
                font-size: 43px;
                color: #172b57;
                font-weight: bold;
                text-align: center;
                .english {
                    text-align: center;
                    font-size: 30px;
                    color: #6d778b;
                }
            }
            .team_content{
                height: 360px;
                position: relative;
                .team_content_box{
                    height: 100%;
                    width: 1720px;
                    margin: 0 auto;
                    position: relative;
                    .team_section {
                        height: 100%;
                        width: 1420px;
                        margin: 0 auto;
                        position: relative;
                        .swiper-container {
                            .swiper-wrapper {
                                .swiper-slide {
                                    padding-top: 20px;
                                    position: relative;
                                    width: 460px;
                                    height: 360px;
                                    img {
                                        width: 100%;
                                        height: 325px;
                                    }
                                }
                                // 鼠标移入
                                .swiper-slide:hover {
                                    // 放大1.05倍
                                    transform: scale(1.05);
                                    transition: transform 0.4s ease-in-out;
                                }
                                // 鼠标移出
                                .swiper-slide:not(:hover) {
                                    // 缩小1.1倍
                                    transform: scale(1);
                                    transition: transform 0.4s ease-in-out;
                                }
                            }
                        }
                    }
                    .hon_left {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 80px;
                        height: 80px;
                        border-radius: 100%;
                        box-shadow: 0 0 4px rgba(0,0,0,0.2);
                        transform: translate(0,-50%);
                        .swiper-button-prev {
                            top: 0;
                            margin-top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            transform: translate(0, 0);
                            background: url('../../assets/images/left.png') no-repeat center;
                        }
                    }
                    .hon_right{
                        position: absolute;
                        top: 50%;
                        right: 0;
                        width: 80px;
                        height: 80px;
                        border-radius: 100%;
                        box-shadow: 0 0 4px rgba(0,0,0,0.2);
                        transform: translate(0,-50%);
                        .swiper-button-next{
                            top: 0;
                            margin-top: 0;
                            right: 0;
                            width: 100%;
                            height: 100%;
                            transform: translate(0, 0);
                            background: url('../../assets/images/right.png') no-repeat center center;
                        }
                    }
                    
                }
            }
        }
        .dev_in {
            width: 100%;
            .title {
                padding: 40px 0;
                font-size: 43px;
                color: #172b57;
                font-weight: bold;
                text-align: center;
                .english {
                    text-align: center;
                    font-size: 30px;
                    color: #6d778b;
                }
            }
            .team_content{
                color: #FFFFFF;
                padding-bottom:60px;
                // background-color: #0e2257;
                position: relative;
                background: url('../../assets/images/cen/cen_bgc_4.png') no-repeat center bottom;
                background-size: 100% 100%;
                // background-attachment: fixed;
                .team_content_box{
                    height: 100%;
                    width: 1360px;
                    margin: 0 auto;
                    position: relative;
                    .team_content_box_top {
                        position: relative;
                        .team_section {
                            height: 100%;
                            width: 1080px;
                            margin: 0 auto;
                            position: relative;
                            .swiper-container {
                                .swiper-wrapper {
                                    display: flex;
                                    justify-content: space-between;
                                    .swiper-slide {
                                        padding-top: 45px;
                                        position: relative;
                                        width: 180px!important;
                                        height: 400px;
                                        .date{
                                            font-size:42px;
                                            font-weight: bold;
                                            text-align: center;
                                        }
                                        .point_box{
                                            display: flex;
                                            justify-content: center;
                                            margin: 33px 0;
                                            .point{
                                                width: 20px;
                                                height: 20px;
                                                border-radius: 100%;
                                                background-color: #0e2257;
                                                border: 2px solid #FFFFFF;
                                            }
                                        }
                                        .text{
                                            font-size:17px;
                                            line-height: 29px;
                                            // 超出七行显示...
                                            display: -webkit-box;
                                            -webkit-line-clamp: 7;
                                            -webkit-box-orient: vertical;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                        }
                                    }
                                }
                            }
                        }
                        .hon_left {
                            z-index: 11;
                            position: absolute;
                            top: 117px;
                            left: 0;
                            width: 50px;
                            height: 50px;
                            border-radius: 100%;
                            background-color: #FFFFFF;
                            box-shadow: 0 0 4px rgba(0,0,0,0.2);
                            .swiper-button-prev {
                                top: 50%;
                                margin-top: 0;
                                left: 50%;
                                width: 15px;
                                height: 15px;
                                transform: translate(-50%, -50%);
                                background: url('../../assets/images/left.png') no-repeat center;
                            }
                        }
                        .hon_right{
                            z-index: 11;
                            position: absolute;
                            top: 117px;
                            right: 0;
                            width: 50px;
                            height: 50px;
                            border-radius: 100%;
                            background-color: #FFFFFF;
                            box-shadow: 0 0 4px rgba(0,0,0,0.2);
                            .swiper-button-next{
                                top: 50%;
                                margin-top: 0;
                                left: 50%;
                                width: 15px;
                                height: 15px;
                                transform: translate(-50%, -50%);
                                background: url('../../assets/images/right.png') no-repeat center center;
                            }
                        }
                    }
                    .team_content_box_bottom {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        // height: 100px;
                        // padding: 0 90px;
                        // X轴滑动
                        overflow-x: auto;
                        .year_item {
                            min-width: calc(100% / 7);
                            font-size: 22px;
                            color: #FFFFFF;
                            font-weight: bold;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .year_item_name{
                                padding-bottom: 4px;
                                border-bottom: 4px solid transparent;
                                cursor: pointer;
                            }
                            .active{
                                padding-bottom: 4px;
                                border-bottom: 4px solid #FFFFFF;
                            }
                        }
                    }
                    .team_content_box_bottom::-webkit-scrollbar {
                        height: 6px; /* 滚动条高度 */
                    }
                    .team_content_box_bottom::-webkit-scrollbar-thumb {
                        background-color: #888; /* 滚动条颜色 */
                        border-radius: 10px; /* 滚动条圆角 */
                    }
                    .team_content_box_bottom::-webkit-scrollbar-track {
                        background-color: #f0f0f0; /* 滚动条轨道颜色 */
                    }
                }
                .dev_line {
                    position: absolute;
                    top: 142px;
                    left:0;
                    width: 100%;
                    border-bottom: 2px solid #FFFFFF;
                    z-index: 10;
                }
            }
        }
        .elegance_in {
            background: url('../../assets/images/cen/cen_bgc_5.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .team_content{
                height: 340px;
                .team_section {
                    height: 100%;
                    width: 1230px;
                    margin: 0 auto;
                    position: relative;
                    .swiper-container {
                        .swiper-wrapper {
                            .swiper-slide {
                                padding-top: 20px;
                                position: relative;
                                width: 378px;
                                height: 320px;
                                img {
                                   width: 100%;
                                   height: 285px;
                                }
                            }
                            // 鼠标移入
                            .swiper-slide:hover {
                                // 放大1.05倍
                                transform: scale(1.05);
                                transition: transform 0.4s ease-in-out;
                                .person{
                                    .person_box{
                                        color: #FFFFFF;
                                        background-color: rgba(0,83,229, 0.8); /* 白色半透明背景 */
                                        box-shadow: 0 0 4px rgba(0,0,0,0.1);
                                    }
                                }
                            }
                            // 鼠标移出
                            .swiper-slide:not(:hover) {
                                // 缩小1.1倍
                                transform: scale(1);
                                transition: transform 0.4s ease-in-out;
                                .person{
                                    .person_box{
                                        color: #111111;
                                        background-color: rgba(255,255,255, 0.8); /* 白色半透明背景 */
                                        box-shadow: 0 0 4px rgba(0,0,0,0.1);
                                    }
                                }
                            }
                        }
                    }
                    :deep .swiper-paginationss {
                        text-align: center;
                        width: 100%;
                        position: absolute;
                        left: 50%;
                        bottom: -20px;
                        transform: translate(-50%, 100%);
                        .swiper-pagination-bullet {
                            width: 15px;
                            height: 15px;
                            border-radius: 8px;
                            background: #d6d7da;
                            opacity: 0.9;
                            margin-right: 30px;
                        }
                        .swiper-pagination-bullet-active {
                            background-color: #0053e5;
                        }
                    }
                }
            }
        }
        .partner_in {
            padding-bottom:80px ;
            background: url('../../assets/images/index/in_bgc_4.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .team_content{
                .team_section {
                    height: 100%;
                    width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    .swiper-container {
                        padding: 20px 0;
                        .swiper-wrapper {
                            .swiper-slide {
                                padding-top: 0;
                                position: relative;
                                width: 260px;
                                height: 100px;
                                border-radius: 5px;
                                img {
                                   width: 100%;
                                   height: 100%;
                                   border-radius: 5px;
                                }
                            }
                            .partner_slide {
                                border: 1px solid #a5b3cc;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1720px) {
    .edu {
        .edu_content {
            .hon_in {
                width: 100%;
                .team_content{
                    height: 330px;
                    .team_content_box{
                        width: 1620px;
                        .team_section {
                            width: 1320px;
                            .swiper-container {
                                .swiper-wrapper {
                                    .swiper-slide {
                                        width: 426px;
                                        height: 330px;
                                        img {
                                            width: 100%;
                                            height: 300px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1620px) {
    .edu {
        .edu_content {
            .hon_in {
                width: 100%;
                .team_content{
                    height: 300px;
                    .team_content_box{
                        width: 1420px;
                        .team_section {
                            width: 1200px;
                            .swiper-container {
                                .swiper-wrapper {
                                    .swiper-slide {
                                        width: 380px;
                                        height: 300px;
                                        img {
                                            width: 100%;
                                            height: 270px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1420px) {
    .edu {
        .edu_content {
            .hon_in {
                width: 100%;
                .team_content{
                    height: 260px;
                    .team_content_box{
                        width: 1200px;
                        .team_section {
                            width: 1020px;
                            .swiper-container {
                                .swiper-wrapper {
                                    .swiper-slide {
                                        width: 330px;
                                        height: 260px;
                                        img {
                                            width: 100%;
                                            height: 210px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1440px) {
    .edu {
        .edu_content {
            .center_in {
                .center_content {
                    height: 340px;
                    .center_content_grey {
                        width: 840px;
                    }
                    .center_content_box {
                        padding-left:40px ;
                        .center_section {
                            width: 1180px;
                            .center_section_left {
                               width: 560px;
                            }
                            .center_section_right {
                                width: 560px;
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1360px) {
    .edu {
        .edu_content {
            .dev_in {
                width: 100%;
                .team_content{
                    .team_content_box{
                        width: 1200px;
                        .team_content_box_top {
                            .team_section {
                                width: 1080px;
                                .swiper-container {
                                    .swiper-wrapper {
                                        .swiper-slide {
                                            width: 300px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1340px) {
    .edu {
        .edu_content {
            .center_in {
                .center_content {
                    height: 320px;
                    .center_content_grey {
                        width: 800px;
                    }
                    .center_content_box {
                        padding-left:0 ;
                        .center_section {
                            width: 1180px;
                            .center_section_left {
                               width: 533px;
                            }
                            .center_section_right {
                                width: 533px;
                            }
                        }
                    }
                }
            }
            .team_in {
                .team_content {
                    .team_section {
                        width: 1180px;
                        .swiper-container {
                            .swiper-wrapper {
                                .swiper-slide {
                                    .person {
                                        .person_box {
                                            .person_bottom {
                                                width:220px
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@media (max-width: 1260px) {
    .edu {
        .edu_content {
            .center_in {
                .center_content {
                    height: 320px;
                    .center_content_grey {
                        width: 800px;
                    }
                    .center_content_box {
                        padding-left:0 ;
                        .center_section {
                            width: 1080px;
                            .center_section_left {
                               width: 500px;
                            }
                            .center_section_right {
                                width: 500px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>