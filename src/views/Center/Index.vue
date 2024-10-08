<template>
    <div class="edu">
        <!-- <div class="edu_top wow animate__animated animate__fadeIn" :style="{'backgroundImage': 'url('+ backgroundFileUrl+')'}" @click="goOtherPath(bannerDetail)">
            <img v-if="bannerDetail.image" :src="url + bannerDetail.image.fileUrl" alt="" @load="bannerImgLoading">
        </div> -->
        <div class="edu_content">
            <div class="content_box" v-for="(item,index) in moduleList" :key="index">
                <!-- 中心介绍模板 -->
                <div class="content_template_one" v-if="item.template==1&&item.flag==1" :id="item.alias">
                    <div class="center_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                        <!-- <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="chinese">{{item.name}}</div>
                            <div class="english">{{item.alias}}</div>
                        </div> -->
                        <div class="center_content">
                            <div class="center_content_box">
                                <div class="center_section">
                                    <div class="center_section_left wow animate__animated animate__fadeInLeft" data-wow-delay=".8s">
                                        <div class="center_section_left_top">
                                            <div class="center_section_left_top_title">
                                                <div class="center_section_left_top_title_left">ABOUT US</div>
                                                <div class="center_section_left_top_title_left">{{item.name}}</div>
                                                <div class="center_section_left_top_title_line"></div>
                                            </div>
                                            <div class="center_section_left_top_view"
                                            >
                                            </div>
                                        </div>
                                        <div class="center_section_left_bottom" v-if="item.data">
                                            {{item.data.intro}}
                                        </div>
                                    </div>
                                    <div class="center_section_right wow animate__animated animate__fadeInRight" data-wow-delay=".8s"
                                        @mouseenter="handleMouseCenterEnter(item.id,'right')" @mouseleave="handleMouseCenterLeave(item.id,'right')">
                                        <!-- <img class="center_section_right_img" v-if="item.data&&item.data.images.length>0" :style="item.id==centerIroId?centerRightStyle:''" :src="url+item.data.images[0].fileUrl" alt=""> -->
                                        <img class="center_section_right_img"  src="../../assets/images/cen/center_about2.png" alt="">

                                        <!-- <div class="center_section_right_bottom" :style="item.id==centerIroId?centerRightStyle:''"></div> -->
                                    </div>
                                </div>
                            </div>
                            <div class="center_content_grey"></div>
                        </div>
                    </div>
                </div>
                <!-- 管理团队模板 -->
                <div class="content_template_two" v-if="item.template==2&&item.flag==1" :id="item.alias">
                     <div class="team_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="team">
                        <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="chinese">{{item.name}}</div>
                            <div class="english">{{item.alias}}</div>
                        </div>
                        <div class="team_content">
                            <div class="team_section">
                                <swiper
                                :options="swiperOption"
                                ref="mySwiperTeam"
                                v-if="item.data.records.length"
                                >
                                    <swiper-slide
                                        class="swiper-slide"
                                        v-for="(items, index) in item.data.records"
                                        :key="index"
                                    >
                                        <img v-if="items.image" :src="url+items.image.fileUrl" />
                                        <div class="person">
                                            <div class="person_box">
                                                <div class="person_top">
                                                    <div class="person_top_left">{{items.name}}</div>
                                                    <div class="person_top_right">{{items.job}}</div>
                                                </div>
                                                <div class="person_bottom">{{items.content}}</div>
                                            </div>
                                        </div>
                                    </swiper-slide>
                                </swiper>
                                <div class="swiper-paginations" slot="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 荣誉资质模板 -->
                <div class="content_template_three" v-if="item.template==3&&item.flag==1" :id="item.alias">
                    <div class="hon_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="honor">
                        <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="english">{{item.alias}}</div>
                            <div class="chinese">{{item.name}}</div>
                            <div class="center_section_left_top_title_line"></div>
                            
                        </div>
                        <div class="team_content">
                            <div class="team_content_box">
                                <div class="team_section">
                                    <swiper :options="swiperOptionHon" :slides-per-view="4" ref="mySwiperHon" v-if="item.data.records.length"
                                    >
                                        <swiper-slide
                                            class="swiper-slide"
                                            v-for="(items, index) in item.data.records"
                                            :key="index"
                                        >
                                            <img v-if="items.image" :src="url+items.image.fileUrl" />
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
                </div>
                <!-- 发展历程模板 -->
                <div class="content_template_four" v-if="item.template==4&&item.flag==1" :id="item.alias">
                    <div class="dev_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" id="development">
                        <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="chinese">{{item.name}}</div>
                            <div class="english">{{item.alias}}</div>
                        </div>
                        <div class="team_content">
                            <div class="team_content_box">
                                <div class="team_content_box_top">
                                    <div class="team_section">
                                        <swiper :options="swiperOptionDev" ref="mySwiperDev" v-if="deveList.length"
                                        >
                                            <swiper-slide
                                                class="swiper-slide"
                                                v-for="(items, index) in deveList"
                                                :key="index"
                                            >
                                                <!-- <div class="date">{{items.year}}.{{items.month}}</div> -->
                                                <div class="date">{{getDevTime(items)}}</div>
                                                <div class="point_box">
                                                    <div class="point"></div>
                                                </div>
                                                <div class="text">{{items.content}}</div>
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
                                    <div v-for="(item, index) in item.data.yearList" :key="index" class="year_item"
                                    >
                                        <div class="year_item_name"
                                        :class="{active:yearActive==item}"
                                        @click="handleYearClick(item)"
                                        >
                                        {{item}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dev_line"></div>
                        </div>
                    </div>
                </div>
                <!-- 中心风采模板 -->
                <div class="content_template_five" v-if="item.template==5&&item.flag==1" :id="item.alias">
                    <div class="team_in elegance_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                        <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="english">{{item.alias}}</div>
                            <div class="chinese">{{item.name}}</div>
                            <div class="center_section_left_top_title_line"></div>
                        </div>
                        <div class="team_content">
                            <div class="team_section">
                              <div class="center_pic">
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_1.png" alt=""></div>
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_2.png" alt=""></div>
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_3.png" alt=""></div>
                             
                              </div>
                              <div class="center_pic">
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_4.png" alt=""></div>
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_5.png" alt=""></div>
                                <div class="centen_pic_img"><img src="../../assets/images/cen/cen_pic_6.png" alt=""></div>
                              </div>
                                <!-- <swiper :options="swiperOptionElegance" ref="mySwiperEle" v-if="item.data.records.length"
                                >
                                    <swiper-slide
                                        class="swiper-slide"
                                        v-for="(items, index) in item.data.records"
                                        :key="index"
                                    >
                                        <img v-if="items.image" :src="url+items.image.fileUrl" />
                                    </swiper-slide>
                                </swiper>
                                <div class="swiper-paginationss" slot="pagination"></div> -->
                            </div>
                        </div>
                    </div>

                </div>
                <!-- 合作伙伴模板 -->
                <div class="content_template_six" v-if="item.template==6&&item.flag==1" :id="item.alias">
                    <div class="partner_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                        <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                            <div class="chinese">{{item.name}}</div>
                            <div class="english">{{item.alias}}</div>
                        </div>
                        <div class="team_content">
                            <div class="team_section">
                                <swiper :options="swiperOptionPartner" ref="mySwiper" v-if="item.data.records.length"
                                >
                                    <swiper-slide
                                        class="swiper-slide partner_slide"
                                        v-for="(items, index) in item.data.records"
                                        :key="index"
                                    >
                                        <img v-if="items.image" :src="url+items.image.fileUrl" />
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { scenicPage,moduleList } from "../../api/management.js";
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
            bannerDetail:{},
            imageLoading:false,
            backgroundFileUrl:'',
            // 模块列表
            moduleList:[],
            // 中心介绍模板
            centerIroId:'',
            isHoverCenterLeft:false,
            isHoverCenterRight:false,
            // 管理团队模板
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
            // 荣誉资质模板
            swiperOptionHon: {
                loop: true, //是否循环轮播
                autoplay: true, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 20,
                slidesPerView: 4,
                // pagination: {
                //     el: ".swiper-paginations",
                //     clickable: true,
                // },
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
            // 发展历程模板
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
            year:[],
            deveList:[],
            // 中心风采模板
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
        async getBanner() {
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
        // 全部模块
        async getModuleList() {
            const res = await moduleList ({
                current:1,
                pageSize:-1,
                flag:1,
            })
            if(res.code==1) {
                this.moduleList = res.data
                if(res.data.length>0) {
                    res.data.forEach((item) => {
                        if(item.template==4) {
                            this.year = item.data.dishList
                            if(item.data.yearList.length>0) {
                                // 数组翻转
                                this.yearList = item.data.yearList.reverse()
                                this.handleYearClick(this.yearList[0])
                            }
                        }
                    })
                }
            }
        },
        // 中心介绍动画
        handleMouseCenterEnter(item,location) {
            this.centerIroId = item;
            if(location=='left') {
               this.isHoverCenterLeft = true;
            } else if(location=='right') {
               this.isHoverCenterRight = true;
            }
        },
        handleMouseCenterLeave(item,location) {
            this.centerIroId = item;
            if(location=='left') {
               this.isHoverCenterLeft = false;
            } else if(location=='right') {
               this.isHoverCenterRight = false;
            }
        },
        // 发展历程
        handleYearClick(id) {
            // 清除轮播图实例，然后重建
            this.$nextTick(() => {
                if (this.$refs.mySwiperDev&&this.$refs.mySwiperDev.swiper) {
                    this.$refs.mySwiperDev.swiper.slideTo(0, 1000, false)
                }
            });
            this.yearActive = id
            this.deveList = []
            this.year.forEach((item) => { 
                if(item.year==id) {
                    this.deveList.unshift(item)
                }
            })
        },
        getJump() {
            var hash = window.location.hash;
            var index = hash.lastIndexOf("#");
            if (index != -1) {
                var id = decodeURIComponent(hash.substring(index + 1, hash.length + 1))
                var div = document.getElementById(id);
                if (div) {
                    setTimeout(function () {
                        $('html, body').animate({scrollTop: $(div).offset().top - 80}, 500)
                    }, 100);
                }
            }
        },
        getDevTime(item) {
            if(item.year&&item.month) {
                if(item.month<10) {
                    return item.year+".0"+item.month
                } else {
                    return item.year+"."+item.month
                }
            }
        }
    },
    created() {
        this.getBanner()
        this.getModuleList()
    },
    mounted() {
        new this.$wow.WOW().init();
        this.$nextTick(() => {
            setTimeout(() => {
               this.getJump()
            }, 800);
        })
    }
}
</script>
<style lang="scss" scoped>
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
        padding-bottom: 20px;
        .content_box {
            .content_template_one {
                width: 100%;
                .center_in {
                    width: 100%;
                    padding-bottom: 150px;
                    // background: url('../../assets/images/index/in_bgc_1.png') no-repeat center bottom;
                    background-size: 100% 100%;
                    .title {
                        padding: 74px 0;
                        font-size: 46px;
                        color: #172b57;
                        text-align: center;
                        .chinese {
                            font-weight: bold;
                        }
                        .english {
                            text-align: center;
                            font-size: 32px;
                            color: #6d778b;
                            font-family: 'Roboto_Medium';
                        }
                    }
                    .center_content {
                        width: 100%;
                        height: 700px;
                        position: relative;
                        .center_content_grey {
                            height: 100%;
                            position: absolute;
                            height: 100%;
                            width: 1040px;
                            // background-color: #f0f2f6;
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
                                    // align-items: center;
                                    .center_section_left_top {
                                        width: 100%;
                                        display: flex;
                                        justify-content: space-between;
                                        margin-bottom:50px;
                                        .center_section_left_top_title{
                                            position: relative;
                                            .center_section_left_top_title_left {
                                                font-size: 48px;
                                                color: #333333;
                                                // font-weight: 600;
                                            }
                                            .center_section_left_top_title_line{
                                                position: absolute;
                                                // top: 37px;
                                                bottom: -10px;
                                                left: 0;
                                                background-color: #333333;
                                                height: 1px;
                                                width: 140%;
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
                                        // color: #1d305b;
                                        color: #666666;
                                        line-height: 32px;
                                        text-indent: 2em;
                                        font-size: 17px;
                                        //超过8行显示...
                                        // display: -webkit-box;
                                        // -webkit-line-clamp: 8;
                                        // -webkit-box-orient: vertical;
                                        // overflow: hidden;
                                        // text-overflow: ellipsis;
                                    }
                                }
                                .center_section_right{
                                    width: 600px;
                                    height: 100%;
                                    position: relative;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    .center_section_right_img {
                                        width: 80%;
                                        // height: 100%;
                                        // position: absolute;
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
            }
            .content_template_two {
                .team_in {
                    width: 100%;
                    padding-bottom: 100px;
                    background: url('../../assets/images/cen/cen_bgc_2.png') no-repeat center bottom;
                    background-size: 100% 100%;
                    // background-color: #f6f8fc;
                    .title {
                        padding: 74px 0 54px 0;
                        font-size: 46px;
                        color: #172b57;
                        text-align: center;
                        .chinese {
                            font-weight: bold;
                        }
                        .english {
                            text-align: center;
                            font-size: 32px;
                            color: #6d778b;
                            font-family: 'Roboto_Medium';
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
                                                        font-size: 24px;
                                                        margin-right: 13px;
                                                    }
                                                    .person_top_right{
                                                        font-size: 18px;
                                                        margin-bottom: 3px;
                                                    }
                                                }
                                                .person_bottom {
                                                    // 文字两端对齐
                                                    text-align: justify;
                                                    text-justify: inter-ideograph;
                                                    height: 120px;
                                                    width: 232.5px;
                                                    font-size: 14px;
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
            }
            .content_template_three {
                .hon_in {
                    width: 100%;
                    padding-bottom: 140px;
                    // background: url('../../assets/images/cen/cen_bgc_3.png') no-repeat center bottom;
                    // background-size: 100% 100%;
                    background-color: #f6f8fc;
                    .title {
                        // padding: 74px 0 54px 0;
                        font-size: 48px;
                        color: #333333;
                        position: relative;
                        width: 1420px;
                        margin: 60px auto;
                        padding-top: 60px;
                        .center_section_left_top_title_line{
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            background-color: #333333;
                            height: 1px;
                            width: 40%;
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
                                            // width: 460px;
                                            // height: 360px;

                                            width: 340px;
                                            height: 275px;
                                            //下阴影
                                            img {
                                                width: 100%;
                                                height: 255px;
                                                box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
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
                                width: 60px;
                                height: 60px;
                                border-radius: 100%;
                                box-shadow: 0 0 4px rgba(0,0,0,0.2);
                                transform: translate(10%,-50%);
                                .swiper-button-prev {
                                    top: 0;
                                    margin-top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    transform: translate(0, 0);
                                    background: url('../../assets/images/left.png') no-repeat center;
                                    background-size: 40% 40%;
                                }
                            }
                            .hon_right{
                                position: absolute;
                                top: 50%;
                                right: 0;
                                width: 60px;
                                height: 60px;
                                border-radius: 100%;
                                box-shadow: 0 0 4px rgba(0,0,0,0.2);
                                transform: translate(-10%,-50%);
                                .swiper-button-next{
                                    top: 0;
                                    margin-top: 0;
                                    right: 0;
                                    width: 100%;
                                    height: 100%;
                                    transform: translate(0, 0);
                                    background: url('../../assets/images/right.png') no-repeat center center;
                                    background-size: 40% 40%;
                                }
                            }
                            
                        }
                    }
                }
            }
            .content_template_four {
                .dev_in {
                    width: 100%;
                    .title {
                        padding: 74px 0;
                        font-size: 46px;
                        color: #172b57;
                        text-align: center;
                        .chinese {
                            font-weight: bold;
                        }
                        .english {
                            text-align: center;
                            font-size: 32px;
                            color: #6d778b;
                            font-family: 'Roboto_Medium';
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
                                                    font-size:48px;
                                                    font-weight: bold;
                                                    text-align: center;
                                                }
                                                .point_box{
                                                    display: flex;
                                                    justify-content: center;
                                                    margin: 27px 0;
                                                    .point{
                                                        width: 20px;
                                                        height: 20px;
                                                        border-radius: 100%;
                                                        background-color: #0e2257;
                                                        border: 2px solid #FFFFFF;
                                                    }
                                                }
                                                .text{
                                                    font-size:18px;
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
                                    top: 127px;
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
                                    top: 127px;
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
                                    font-size: 24px;
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
                            top: 151px;
                            left:0;
                            width: 100%;
                            border-bottom: 2px solid #FFFFFF;
                            z-index: 10;
                        }
                    }
                }
            }
            .content_template_five {
                .elegance_in {
                    width: 100%;
                    padding-bottom: 100px;
                    // background: url('../../assets/images/cen/cen_bgc_5.png') no-repeat center bottom;
                    background-size: 100% 100%;
                    .title {
                        // padding: 74px 0;
                        font-size: 48px;
                        color: #333333;
                        width: 1230px;
                        margin: 74px auto;
                        padding-left: 30px;
                        position: relative;
                        
                        .center_section_left_top_title_line{
                            position: absolute;
                            // top: 37px;
                            bottom: -10px;
                            left: 0;
                            background-color: #333333;
                            height: 1px;
                            width: 40%;
                        }
                    }
                    .team_content{
                        // height: 340px;
                        height: 600px;
                        .team_section {
                            height: 100%;
                            width: 1230px;
                            margin: 0 auto;
                            position: relative;
                            display: flex;
                            flex-flow: column;
                            justify-content: space-between;
                            .center_pic{
                              display: flex;
                              justify-content: space-between;

                              .centen_pic_img{
                                // flex: 1;
                                width: 380px;
                                height: 280px;
                                box-shadow: 0 0 8px rgba(0,0,0,0.2);
                                img{
                                  width: 100%;
                                  object-fit: cover;
                                }
                              }
                            }
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
            }
            .content_template_six {
                .partner_in {
                    width: 100%;
                    padding-bottom:80px ;
                    background: url('../../assets/images/index/in_bgc_4.png') no-repeat center bottom;
                    background-size: 100% 100%;
                    .title {
                        padding: 74px 0 54px 0;
                        font-size: 46px;
                        color: #172b57;
                        text-align: center;
                        .chinese {
                            font-weight: bold;
                        }
                        .english {
                            text-align: center;
                            font-size: 32px;
                            color: #6d778b;
                            font-family: 'Roboto_Medium';
                        }
                    }
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
    }
}
@media (max-width: 1720px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_three{
                    .hon_in {
                        width: 100%;
                        .title{
                          width: 1320px;
                        }
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
    }
}
@media (max-width: 1620px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_three{
                    .hon_in {
                        width: 100%;
                        .title{
                          width: 1200px;
                        }
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
    }
}
@media (max-width: 1420px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_three{
                    .hon_in {
                      .title{
                        width: 1020px;
                      }
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
    }
}
@media (max-width: 1440px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_one{
                    .center_in {
                        .center_content {
                            height: 680px;
                            .center_content_grey {
                                width: 840px;
                            }
                            .center_content_box {
                                padding-left:40px ;
                                .center_section {
                                    width: 1180px;
                                    .center_section_left {
                                        width: 580px;
                                        .center_section_left_top {
                                            margin-bottom: 25px;
                                        }
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
    }
}
@media (max-width: 1360px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_four{
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
    }
}
@media (max-width: 1340px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_one{
                    .center_in {
                        .center_content {
                            height: 660px;
                            .center_content_grey {
                                width: 800px;
                            }
                            .center_content_box {
                                padding-left:0 ;
                                .center_section {
                                    width: 1180px;
                                    .center_section_left {
                                        width: 580px;
                                    }
                                    .center_section_right {
                                        width: 533px;
                                    }
                                }
                            }
                        }
                    }
                }
                .content_template_two {
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
    }
}
@media (max-width: 1260px) {
    .edu {
        .edu_content {
            .content_box{
                .content_template_one{
                    .center_in {
                        .center_content {
                            height: 640px;
                            .center_content_grey {
                                width: 800px;
                            }
                            .center_content_box {
                                padding-left:0 ;
                                .center_section {
                                    width: 1080px;
                                    .center_section_left {
                                        width: 560px;
                                        .center_section_left_top {
                                            margin-bottom: 10px;
                                        }
                                        .center_section_left_bottom {
                                            line-height: 30px;
                                        }
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
    }
}
</style>