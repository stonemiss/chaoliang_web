<template>
    <div class="index">
        <div class="index_swiper wow animate__animated animate__fadeIn">
            <el-carousel :interval="3000" :autoplay="false" arrow="always">
                <el-carousel-item v-for="(item,index) in swiperList" :key="index">
                    <img v-if="item.image&&!imageLoading" style="width:100%;height:575px;object-fit: cover;" class="carousel_item_img" :src="url+item.image.thinUrl" alt="" @click="goOtherPath(item)">
                    <img v-if="item.image&&imageLoading" style="width:100%;height:575px;object-fit: cover;" class="carousel_item_img" :src="url+item.image.fileUrl" alt="" @click="goOtherPath(item)">
                    <img v-if="item.image" style="width:0;height:0;" :src="url+item.image.fileUrl" alt="" @load="bannerImgLoading">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="edu_content">
            <!-- 中心介绍 -->
            <div class="center_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" v-if="center.data">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{center.name}}</div>
                    <div class="english">{{center.alias}}</div>
                </div>
                <div class="center_content">
                    <div class="center_content_box">
                        <div class="center_section">
                            <div class="center_section_left wow animate__animated animate__fadeInLeft" data-wow-delay=".8s">
                                <div class="center_section_left_top">
                                    <div class="center_section_left_top_title">
                                        <div class="center_section_left_top_title_left">{{center.name}}</div>
                                        <div class="center_section_left_top_title_line"></div>
                                    </div>
                                    <div class="center_section_left_top_view"
                                    :style="centerLeftStyle" @mouseenter="handleMouseEnter(1,'left')" @mouseleave="handleMouseLeave(1,'left')"
                                    @click="goCenter()"
                                    >
                                        <img class="half_image" src="../../assets/images/arrow_half_right.png" alt="">
                                        <div class="center_section_left_top_view_text">查看</div>
                                    </div>
                                </div>
                                <div class="center_section_left_bottom" v-if="center.data">
                                    {{center.data.intro}}
                                </div>
                            </div>
                            <div class="center_section_right wow animate__animated animate__fadeInRight" data-wow-delay=".8s"
                                @mouseenter="handleMouseEnter(1,'right')" @mouseleave="handleMouseLeave(1,'right')">
                                <img class="center_section_right_img" v-if="center.data&&center.data.images.length>0" :style="centerRightStyle" :src="url+center.data.images[0].fileUrl" alt="">
                                <div class="center_section_right_bottom" :style="centerRightStyle"></div>
                            </div>
                        </div>
                    </div>
                    <div class="center_content_grey"></div>
                </div>
            </div>
            <!-- 科普活动 -->
            <div class="team_in science_in partner_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{news.chineseName}}</div>
                    <div class="english">{{news.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section science_section">
                        <swiper :options="swiperOptionScience" ref="mySwiperScience" v-if="news.list.length"
                        >
                            <swiper-slide
                                class="swiper-slide"
                                v-for="(item, index) in news.list"
                                :key="index"
                            >
                                <div class="swiper-slide_boxs">
                                    <div class="team_item_image">
                                        <img v-if="item.image" :src="url+item.image.fileUrl" />
                                    </div>
                                    <div class="team_item_text">
                                        <div class="team_item_text_top">
                                            <div class="team_item_text_top_hot" v-if="item.hot">
                                                <div class="team_item_text_top_hot_text">
                                                    <img src="../../assets/images/hot.png" alt="" srcset="">
                                                    热点新闻
                                                </div>
                                            </div>
                                            <div class="team_item_text_top_title">{{item.title}}</div>
                                        </div>
                                        <div class="team_item_text_profile">{{item.profile}}</div>
                                        <div class="team_item_text_bottom">
                                            <div class="team_item_text_bottom_time">{{item.putTime.slice(0,4)}}/{{item.putTime.slice(5,7)}}/{{item.putTime.slice(8,11)}}</div>
                                            <div class="team_item_text_bottom_look" @click="goEduDetail(item.id)"
                                            :style="index+1==isScienceId?scienceLeftStyle:''"
                                            @mouseenter="handleMouseEnter(2,index+1)" @mouseleave="handleMouseLeave(2,index+1)"
                                            >
                                                <img class="team_item_text_bottom_look_img" src="../../assets/images/arrow_half_right.png" alt="">
                                                <div class="team_item_text_bottom_look_left">查看</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
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
            <!-- 算力资源 -->
            <div class="team_in resourse_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{resourse.chineseName}}</div>
                    <div class="english">{{resourse.englishName}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section" @mouseenter="onMouseEnter(1)" @mouseleave="onMouseLeave(1)">
                        <div class="resourse_middle">
                            <div class="center_section_left_top_view"
                            :style="centerLeftStyle" @mouseenter="handleMouseEnter(1,'left')" @mouseleave="handleMouseLeave(1,'left')"
                            @click="goResourse()"
                            >
                                <img class="half_image" src="../../assets/images/arrow_half_right.png" alt="">
                                <div class="center_section_left_top_view_text">查看更多</div>
                            </div>
                        </div>
                        <swiper :options="swiperOptionResourse" ref="mySwiperResourse" v-if="resourse.list.length"
                        >
                            <swiper-slide
                                class="swiper-slide"
                                v-for="(item, index) in resourse.list"
                                :key="index"
                            >
                                <div class="resourse_image" @click="goLink(item.link)">
                                   <img class="resourse_image_img" v-if="item.image" :src="url+item.image.fileUrl" />
                                </div>
                                <div class="resourse_title_box" @click="goLink(item.link)">
                                    <div class="item_title">{{item.title}}</div>
                                </div>
                            </swiper-slide>
                        </swiper>
                        <!-- <div class="swiper-paginationss" slot="pagination"></div> -->
                    </div>
                </div>
            </div>
            <!-- 新闻动态 -->
            <div class="team_in news_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{science.chineseName}}</div>
                    <div class="english">{{science.englishName}}</div>
                </div>
                <div class="news_content">
                    <div class="news_section">
                        <div class="news_section_left wow animate__animated animate__fadeInLeft" @click="goNewsDetail(newsDetail)" data-wow-delay="1s">
                            <div class="news_section_left_top">
                                <img v-if="newsDetail.image" :src="url + newsDetail.image.fileUrl" alt="">
                            </div>
                            <div class="news_section_left_bottom">
                                <div class="team_item_text_top">
                                    <div class="team_item_text_top_hot" v-if="newsDetail.hot">
                                        <div class="team_item_text_top_hot_text">
                                            <img src="../../assets/images/hot.png" alt="" srcset="">
                                        </div>
                                    </div>
                                    <div class="team_item_text_top_title">{{newsDetail.title}}</div>
                                </div>
                                <div class="team_item_text_profile">{{newsDetail.profile}}</div>
                                <div class="team_item_text_bottom">
                                    <div class="team_item_text_bottom_time">{{newsDetail.putTime?newsDetail.putTime.slice(0,4):''}}/{{newsDetail.putTime?newsDetail.putTime.slice(5,7):''}}/{{newsDetail.putTime?newsDetail.putTime.slice(8,11):''}}</div>
                                    <div class="team_item_text_bottom_look">
                                        <div class="team_item_text_bottom_look_left" @click.stop="goPrevNews(newsDetail.id)">
                                            <img src="../../assets/images/left.png" alt="">
                                        </div>
                                        <div class="team_item_text_bottom_look_left team_item_text_bottom_look_right" @click.stop="goNextNews()">
                                            <img src="../../assets/images/right.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="news_section_right wow animate__animated animate__fadeInRight" data-wow-delay="1s">
                            <div class="news_section_right_top">
                                <div class="news_section_right_top_left">{{science.chineseName}}</div>
                                <div class="news_section_right_top_right" @click="goNews"
                                :style="centerLeftStyle" @mouseenter="handleMouseEnter(1,'left')" @mouseleave="handleMouseLeave(1,'left')"
                                >查看更多</div>
                            </div>
                            <div class="news_section_right_bottom">
                                <div class="news_section_right_bottom_item" 
                                v-for="(item, index) in science.list" :key="index"
                                @click="goNewsDetail(item)"
                                :class="index==activeNewsIndex?'news_section_right_bottom_item_active':''"
                                >
                                    <div class="news_section_right_bottom_item_left">
                                        <img v-if="item.image" :src="url+item.image.fileUrl" alt="">
                                    </div>
                                    <div class="news_section_right_bottom_item_right">
                                        <div class="new_item_top">{{item.title}}</div>
                                        <div class="new_item_bottom">{{item.putTime?item.putTime.slice(0,4):''}}/{{item.putTime?item.putTime.slice(5,7):''}}/{{item.putTime?item.putTime.slice(8,11):''}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 合作伙伴 -->
            <div class="team_in partner_in wow animate__animated animate__fadeInUp" data-wow-delay=".5s" v-if="partner.data&&partner.data.records.length">
                <div class="title wow animate__animated animate__fadeInDown" data-wow-delay=".8s">
                    <div class="chinese">{{partner.name}}</div>
                    <div class="english">{{partner.alias}}</div>
                </div>
                <div class="team_content">
                    <div class="team_section" @mouseenter="onMouseEnterPartner" @mouseleave="onMouseLeavePartner">
                        <swiper :options="swiperOptionPartner" ref="mySwiperPartner" v-if="partner.data&&partner.data.records.length"
                        >
                            <swiper-slide
                                class="swiper-slide partner_slide"
                                v-for="(items, index) in partner.data.records"
                                :key="index"
                            >
                                <img v-if="items.image" :src="url+items.image.fileUrl" />
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
        <div class="suspension_box">
            <div class="suspension">
                <div class="suspension_item" @click="handleSusItem(item)" v-for="(item, index) in suspension" :key="index"
                @mouseenter="handleMouseEnterSus(item.id)" @mouseleave="handleMouseLeaveSus(item.id)"
                >
                    <img v-if="item.contactChannel=='QQ客服'" src="../../assets/images/sus/QQ.png" alt="">
                    <img v-if="item.contactChannel=='微信客服'" src="../../assets/images/sus/weixin.png" alt="">
                    <img v-if="item.contactChannel=='电话咨询'" src="../../assets/images/sus/phone.png" alt="">
                    <img v-if="item.contactChannel=='返回顶部'" src="../../assets/images/sus/backTop.png" alt="">
                    <div class="title">{{item.contactChannel}}</div>
                    <div class="content_box" :style="item.id==suspensionId?susStyle:''">
                        <div class="content_item wow animate__animated animate__fadeIn" v-if="item.contactType&&item.contactType==1">
                            <div class="content_item_top">{{item.contactChannel}}:</div>
                            <div class="content_item_bottom">{{item.content}}</div>
                        </div>
                        <div class="content_item wow animate__animated animate__fadeIn" v-if="item.contactType&&item.contactType==2">
                            <div class="content_item_top">{{item.contactChannel}}:</div>
                            <img :src="url + item.image.fileUrl" alt="">
                        </div>
                        <div class="triangle"></div>
                    </div>
                </div>
            </div>
        </div>
        <MoveWindow />
    </div>
</template>
<script>
import MoveWindow from '../../components/MoveWindow.vue'
import { moduleList,onlineConsultationPage,introGet,restaurantPage,scenicPage,storyPage,suggestionsTypePage,noticePage } from "../../api/management.js";
export default {
    components: { MoveWindow },
    computed: {
        mySwiperPartner() {
            return this.$refs.mySwiperPartner.swiper
        },
        mySwiperScience() {
            return this.$refs.mySwiperScience.swiper
        },
        mySwiperResourse() {
            return this.$refs.mySwiperResourse.swiper
        },
        centerLeftStyle() {
            return {
                transform: this.isHoverCenterLeft ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
        scienceLeftStyle() {
            return {
                transform: this.isHoverScienceLeft ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
        centerRightStyle() {
            return {
                transform: this.isHoverCenterRight ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s ease-in-out',
            };
        },
        susStyle() {
            return {
                display: this.isHoverSus ? 'block' : 'none',
            };
        },
    },
    data() {
        return {
            url:process.env.VUE_APP_WEB_URL,
            swiperList:[],
            // 中心介绍
            isHoverCenterLeft:false,
            isHoverCenterRight:false,
            center:{},
            // 科普活动
            science: {
                chineseName:'科普教育',
                englishName:'Popular science',
                list:[]
            },
            swiperOptionScience: {
                // speed: 1500,
                loop: true, //是否循环轮播
                autoplay: true, //可选选项，自动滑动
                // autoplay:{
                //     delay:2000,
                //     disableOnInteraction: false,
                // },
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 80,
                slidesPerView:3,
                centeredSlides: true,
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
            isScienceId:-1,
            isHoverScienceLeft:false,
            // 算力资源
            resourse:{
                chineseName:'算力资源',
                englishName:'Computing Resources',
                list:[]
            },
            swiperOptionResourse: {
                loop: true, //是否循环轮播
                // autoplay: true, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 25,
                slidesPerView: 4,
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

            // 新闻动态
            newsInfo:{
                current:1,
                pageSize:5,
            },
            total:0,
            newsPages:0,//总页
            activeNewsIndex:null,//当前显示第几个
            news: {
                chineseName:'新闻动态',
                englishName:'Information',
                list:[]
            },
            newsDetail:{},
            isClickNextNews:true,//判断是否是点击下一页
            // 合作伙伴
            partner:{},
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
            // 悬浮
            isShowSuspension:false,
            suspension:[],
            suspensionOne: [
                {
                    id:5,
                    contactChannel:'返回顶部',
                    imgSrc:require('../../assets/images/sus/backTop.png'),
                }
            ],
            suspensionId:0,
            isHoverSus:false,
            imageLoading:false
        }
    },
    methods:{
        bannerImgLoading(ev) {
            this.imageLoading = true
        },
        // 悬浮框（联系我们）
        async getOnlineConsultationPage() {
            const res = await onlineConsultationPage(
                {
                    current: 1,
                    pageSize: 10,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.suspension = [...res.data.records,...this.suspensionOne]
                }
            }
        },
        onMouseEnterScience() {
            this.mySwiperScience.autoplay.stop()
        },
        onMouseLeaveScience() {
            this.mySwiperScience.autoplay.start()
        },
        onMouseEnterPartner() {
            this.mySwiperPartner.autoplay.stop()
        },
        onMouseLeavePartner() {
            this.mySwiperPartner.autoplay.start()
        },
        handleMouseEnter(item,location) {
            if(item==1) {
                // 中心介绍
                if(location=='left') {
                   this.isHoverCenterLeft = true;
                } else if(location=='right') {
                   this.isHoverCenterRight = true;
                }
            } else if(item==2) {
                this.isHoverScienceLeft = true
                this.isScienceId = location;
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
            } else if(item==2) {
                this.isHoverScienceLeft = false
                this.isScienceId = location;
            }
        },
        onMouseEnter(id) {
            if(id==1) {
                this.mySwiperResourse.autoplay.stop()
            }
        },
        onMouseLeave(id) {
            if(id==1) {
                this.mySwiperResourse.autoplay.start()
            }
        },
        goResourse() {
            this.$router.push('/resource')
        },
        goLink(path) {
            if(path) {
                window.open(path);
            }
        },
        goCenter() {
            let path = '/center' + '#' + this.center.alias
            this.$router.push(path)
        },
        goEduDetail(id) {
            this.$router.push({
                path:'/newsDetail',
                query:{
                    type:1,
                    id
                }
            })
        },
        // 科普教育
        async getNewsList() {
            const res = await restaurantPage(
                {
                    current:this.newsInfo.current,
                    pageSize:this.newsInfo.pageSize,
                }
            )
            if(res.code==1) {
                this.science.list = res.data.records;
                this.total = res.data.total;
                this.newsPages = res.data.pages
                // 获取第一个给newsDetail
                if(this.isClickNextNews) {
                    // 取第一条
                    this.newsDetail = res.data.records.length > 0 ? res.data.records[0] : {};
                    this.activeNewsIndex = 0;
                } else {
                    // 取最后一条
                    this.newsDetail = res.data.records.length > 0 ? res.data.records[res.data.records.length-1] : {};
                    this.activeNewsIndex = res.data.records.length-1;
                }
            }
        },
        // 上一篇新闻
        goPrevNews() {
            this.isClickNextNews = false;
            // 先找到上一条新闻id在news.list中的索引,如果存在,则取索引-1,如果不存在,判断当前页面是否等于1如果大于或等于则-1，如果小于则为总页数，重新请求数据
            this.activeNewsIndex--
            if(this.activeNewsIndex<0) {
                if(this.newsInfo.current>1) {
                    this.newsInfo.current-=1;
                    this.getNewsList();
                } else {
                    this.newsInfo.current = this.newsPages;
                    this.getNewsList();
                }
            } else {
                this.newsDetail = this.science.list[this.activeNewsIndex];
            }
        },
        // 下一篇新闻
        goNextNews() {
            this.isClickNextNews = true;
            // 先找到下一条新闻id在news.list中的索引,如果存在,则取索引+1,如果不存在,判断当前页面是否等于总页面如果小于或等于则+1，如果大于则为1，重新请求数据
            this.activeNewsIndex++
            if(this.activeNewsIndex>=this.science.list.length) {
                if(this.newsInfo.current<this.newsPages) {
                    this.newsInfo.current+=1;
                    this.getNewsList();
                } else {
                    this.newsInfo.current = 1;
                    this.getNewsList();
                }
            } else {
                this.newsDetail = this.science.list[this.activeNewsIndex];
            }
        },
        goNews() {
            this.$router.push('/education')
        },
        goNewsDetail(item) {
            this.$store.commit("changeEduActiveId",item.type)
            this.$router.push({
                path:'/educationDetail',
                query:{
                    type:2,
                    id:item.id
                }
            })
        },
        // 悬浮框事件
        handleSusItem(item) {
            if(item.contactChannel=='返回顶部') {
                // 滚回到顶部，动画效果
                $('html, body').animate({scrollTop: 0}, 800)
            }
        },
        handleMouseEnterSus(id) {
            this.suspensionId = id;
            this.isHoverSus = true;
        },
        handleMouseLeaveSus(id) {
            this.suspensionId = id;
            this.isHoverSus = false;
        },
        handleScroll() {
           let distanceToTop = window.pageYOffset || document.documentElement.scrollTop;
           if(distanceToTop>500) { 
               this.isShowSuspension = true;
               $(".suspension_box").fadeIn(500);
           } else {
               this.isShowSuspension = false;
               $(".suspension_box").fadeOut(500);
           }
        },
        // 中心介绍
        async getCenterIntro() {
            const res = await introGet()
            if(res.code==1) {
                this.center.profile = res.data.intro
                if(res.data.images.length>0) {
                    this.center.imgSrc = res.data.images[0].fileUrl
                }
            }
        },
        // 轮播图
        async getScenicPage() {
            const res = await scenicPage (
                {
                    current:1,
                    pageSize:-1,
                    type:1,
                }
            )
            if(res.code==1) {
                this.swiperList = res.data.records;
            }
        },
        // 新闻动态
        async getRestaurantPage() {
            const res = await storyPage (
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.news.list = res.data.records;
                }
            }
        },
        // 算力资源
        async getNoticePage() {
            const res = await noticePage(
                {
                    current:1,
                    pageSize:-1,
                }
            );
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.resourse.list = res.data.records;
                }
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
        goOtherPath(item) {
            if(item.linkUrl) {
               window.open(item.linkUrl)
            }
        },
        // 全部模块
        async getModuleList() {
            const res = await moduleList ({
                current:1,
                pageSize:-1,
                flage:1,
            })
            if(res.code==1) {
                if(res.data.length>0) {
                    res.data.forEach(item => {
                        if(item.name=='中心介绍') {
                            this.center = item
                        }
                        if(item.name=='合作伙伴') {
                            this.partner = item
                        }
                    })
                }
            }
        },
    },
    created() {
        this.getScenicPage();
        this.getModuleList();
        // this.getCenterIntro();
        this.getRestaurantPage();
        this.getNoticePage();
        this.getNewsList();
        this.getSuggestionsTypePage();
        this.getOnlineConsultationPage()
    },
    mounted() {
        $(".suspension_box").hide();
        new this.$wow.WOW().init();
        window.addEventListener('scroll', this.handleScroll);
    },
    deactivated() {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>
<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100%;
    .index_swiper {
        width: 100%;
        height: 575px;
        position: relative;
        .el-carousel {
            height: 575px;
            width: 100%;
            :deep .el-carousel__container {
                height: 575px!important;
                width: 100%;
                .el-carousel-item {
                    height: 575px;
                    width: 100%;
                    .carousel_item_img {
                        object-fit: cover!important;
                        width: 100%!important;
                        height: 100%!important;
                    }
                }
                .el-carousel__arrow {
                    display: none;
                }
            }
            :deep .el-carousel__indicators {
                bottom: 20px;
                .el-carousel__indicator {
                    .el-carousel__button {
                        width: 38px;
                        height: 4px;
                        background-color: #4a5a83;
                    }
                }
                .is-active {
                    .el-carousel__button {
                        background-color: #0050f4;
                    }
                }
            }
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
                                            font-size: 15px;
                                            margin-top: 23px;
                                            line-height: 24px;
                                            padding-bottom: 20px;
                                        }
                                    }
                                }
                            }
                            // 鼠标移入
                            // .swiper-slide:hover {
                            //     // 放大1.05倍
                            //     transform: scale(1.05);
                            //     transition: transform 0.4s ease-in-out;
                            //     .person{
                            //         .person_box{
                            //             color: #FFFFFF;
                            //             background-color: rgba(0,83,229, 0.8); /* 白色半透明背景 */
                            //             box-shadow: 0 0 4px rgba(0,0,0,0.1);
                            //         }
                            //     }
                            // }
                            // 鼠标移出
                            // .swiper-slide:not(:hover) {
                            //     // 缩小1.1倍
                            //     transform: scale(1);
                            //     transition: transform 0.4s ease-in-out;
                            //     .person{
                            //         .person_box{
                            //             color: #111111;
                            //             background-color: rgba(255,255,255, 0.8); /* 白色半透明背景 */
                            //             box-shadow: 0 0 4px rgba(0,0,0,0.1);
                            //         }
                            //     }
                            // }
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
        .resourse_in {
            background: url('../../assets/images/index/in_bgc_5.png') no-repeat center bottom;
            background-size: 100% 100%;
            .team_content{
                height: 385px;
                .team_section {
                    height: 100%;
                    width: 1320px;
                    margin: 0 auto;
                    position: relative;
                    .resourse_middle {
                        display: flex;
                        flex-direction: row-reverse;
                        padding-bottom: 27px;
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
                    .swiper-container {
                        .swiper-wrapper {
                            .swiper-slide {
                                padding-top: 0;
                                width: 295px;
                                height: 275px;
                                background-color: #FFFFFF;
                                .resourse_image {
                                    width: 100%;
                                    height: 200px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .resourse_title_box {
                                    height: 75px;
                                    padding: 0 20px;
                                    display: flex;
                                    align-items: center;
                                    .item_title {
                                        // 超出一行显示...
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                    }
                                }
                            }
                            // 鼠标移入
                            .swiper-slide:hover {
                                .resourse_image {
                                    overflow: hidden;
                                    .resourse_image_img {
                                        transform: scale(1.1);
                                        transition: transform 0.4s ease-in-out;
                                    }
                                }
                            }
                            // 鼠标移出
                            .swiper-slide:not(:hover) {
                                .resourse_image {
                                    overflow: hidden;
                                    .resourse_image_img {
                                        transform: scale(1);
                                        transition: transform 0.4s ease-in-out;
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
        .science_in {
            width: 100%;
            padding-bottom: 100px;
            background: url('../../assets/images/index/in_bgc_2.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .title {
                padding: 74px 0 50px 0;
            }
            .team_content{
                height: 400px;
                .science_section {
                    height: 100%;
                    width: 1660px;
                    margin: 0 auto;
                    position: relative;
                    .swiper-container {
                        padding: 20px 0;
                        .swiper-wrapper {
                            position: relative;
                            .swiper-slide {
                                position: relative;
                                width: 500px!important;
                                height: 365px;
                                .swiper-slide_boxs{
                                    width: 100%;
                                    height: 100%;
                                    position: relative;
                                    border-radius: 5px;
                                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
                                    .team_item_image{
                                        width: 100%;
                                        height: 225px;
                                        border-radius: 5px;
                                        img {
                                            border-radius: 5px;
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                    .team_item_text{
                                        height: calc(100% - 225px);
                                        width: 100%;
                                        padding: 15px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;
                                        .team_item_text_top{
                                            width: 100%;
                                            margin-bottom: 16px;
                                            display: flex;
                                            align-items: center;
                                            .team_item_text_top_hot {
                                                display: flex;
                                                align-items: center;
                                                position: relative;
                                                width: 120px;
                                                .team_item_text_top_hot_text {
                                                    position: absolute;
                                                    top: -14px;
                                                    left: 0;
                                                    font-size:15px;
                                                    font-weight: bold;
                                                    background-color: #ffe2cb;
                                                    padding: 4px 9px;
                                                    border-radius: 4px;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                    color: #FF7E00;
                                                    white-space: nowrap;
                                                    img {
                                                        height: 18px;
                                                        margin-right: 3px;
                                                    }
                                                    // img {
                                                    //     height: 18px;
                                                    // }
                                                }
                                            }
                                            .team_item_text_top_title{
                                                width: calc(100% - 120px);
                                                font-weight: bold;
                                                display: -webkit-box;
                                                -webkit-line-clamp: 1;
                                                -webkit-box-orient: vertical;
                                                overflow: hidden;
                                            }
                                        }
                                        .team_item_text_profile {
                                            // 超出一行显示...
                                            display: -webkit-box;
                                            -webkit-line-clamp: 1;
                                            -webkit-box-orient: vertical;
                                            overflow: hidden;
                                            font-size: 15px;
                                            color: #9b9fa9;
                                            margin-bottom: 24px;
                                        }
                                        .team_item_text_bottom {
                                            display: flex;
                                            justify-content: space-between;
                                            .team_item_text_bottom_time{
                                                font-size: 14px;
                                                color: #9b9fa9;
                                            }
                                            .team_item_text_bottom_look {
                                                cursor: pointer;
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: center;
                                                .team_item_text_bottom_look_img {
                                                    width: 25px;
                                                    height: 20px;
                                                    margin-right: 6px;
                                                }
                                                .team_item_text_bottom_look_left {
                                                    font-size: 15px;
                                                    color: #0053e5;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .swiper-slide-active {
                                position: relative;
                                .swiper-slide_boxs{
                                    position: absolute;
                                    top: -20px;
                                    left: -30px;
                                    width: 560px!important;
                                    height: 400px;
                                    .team_item_image{
                                        width: 100%;
                                        height: 250px;
                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }
                                    .team_item_text{
                                        height: calc(100% - 250px);
                                        width: 100%;
                                        padding: 15px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;
                                        .team_item_text_top{
                                            margin-bottom: 16px;
                                            .team_item_text_top_title{
                                                font-weight: bold;
                                            }
                                        }
                                        .team_item_text_profile {
                                            // 超出一行显示...
                                            display: -webkit-box;
                                            -webkit-line-clamp: 2;
                                            -webkit-box-orient: vertical;
                                            overflow: hidden;
                                            font-size: 15px;
                                            color: #9b9fa9;
                                            margin-bottom:0;
                                            line-height: 1.8;
                                        }
                                        .team_item_text_bottom {
                                            display: flex;
                                            justify-content: space-between;
                                            .team_item_text_bottom_time{
                                                font-size: 14px;
                                                color: #9b9fa9;
                                            }
                                            .team_item_text_bottom_look {
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: center;
                                                .team_item_text_bottom_look_img {
                                                    width: 25px;
                                                    height: 20px;
                                                    margin-right: 6px;
                                                }
                                                .team_item_text_bottom_look_left {
                                                    font-size: 15px;
                                                    color: #0053e5;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // 鼠标移入
                            .swiper-slide:hover {
                                // 放大1.05倍
                                transform: scale(1);
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
                    .hon_left {
                        z-index: 10;
                        position: absolute;
                        top: 38%;
                        left: 5%;
                        width: 80px;
                        height: 80px;
                        border-radius: 100%;
                        background-color: #FFFFFF;
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
                        z-index: 10;
                        position: absolute;
                        top: 38%;
                        right: 5%;
                        width: 80px;
                        height: 80px;
                        border-radius: 100%;
                        background-color: #FFFFFF;
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
        .news_in {
            padding-bottom: 65px;
            background: url('../../assets/images/index/in_bgc_3.png') no-repeat center bottom;
            background-size: 100% 100%;
            // background-attachment: fixed;
            .news_content {
                .news_section {
                    width: 1220px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    .news_section_left {
                        cursor: pointer;
                        .news_section_left_top{
                            width: 720px;
                            height: 370px;
                            img {
                                height: 100%;
                                width: 100%;
                                border-top-left-radius: 10px;
                                border-top-right-radius: 10px;
                            }
                        }
                        .news_section_left_bottom{
                            width: 720px;
                            padding: 30px;
                            background-color: #f3f5f9;
                            border-bottom-left-radius: 10px;
                            border-bottom-right-radius: 10px;
                            .team_item_text_top{
                                margin-bottom: 16px;
                                display: flex;
                                align-items: center;
                                .team_item_text_top_hot {
                                    display: flex;
                                    align-items: center;
                                    position: relative;
                                    width: 50px;
                                    .team_item_text_top_hot_text {
                                        position: absolute;
                                        top: -14px;
                                        left: 0;
                                        font-size:15px;
                                        font-weight: bold;
                                        background-color: #ffe2cb;
                                        padding: 4px 9px;
                                        border-radius: 4px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        color: #FF7E00;
                                        img {
                                            height: 18px;
                                        }
                                    }
                                }
                                .team_item_text_top_title{
                                    width: calc(100% - 50px);
                                    font-weight: bold;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                }
                            }
                            .team_item_text_profile {
                                // 自动换行
                                width: 100%;
                                word-wrap: break-word;
                                overflow-wrap: break-word;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                font-size: 15px;
                                color: #9b9fa9;
                                line-height: 1.8;
                                margin-bottom: 30px;
                                height: 54px;
                            }
                            .team_item_text_bottom {
                                display: flex;
                                justify-content: space-between;
                                .team_item_text_bottom_time{
                                    font-size: 14px;
                                    color: #9b9fa9;
                                }
                                .team_item_text_bottom_look {
                                    cursor: pointer;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .team_item_text_bottom_look_left {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 100%;
                                        border: 1px solid #dfdfdf;
                                        background-color: #FFFFFF;
                                        img {
                                            width: 15px;
                                        }
                                    }
                                    .team_item_text_bottom_look_right{
                                        margin-left: 30px;
                                    }
                                }
                            }
                        }
                    }
                    .news_section_right {
                        width: 450px;
                        background-color: #f3f5f9;
                        border-radius: 10px;
                        padding: 20px;
                        .news_section_right_top {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 20px;
                            .news_section_right_top_left{
                                font-weight: bold;
                                font-size: 19px;
                            }
                            .news_section_right_top_right{
                                color: #0053e5;
                                font-weight: bold;
                                font-size: 15px;
                                cursor: pointer;
                            }
                        }
                        .news_section_right_bottom{
                            display: flex;
                            flex-direction: column;
                            .news_section_right_bottom_item {
                                cursor: pointer;
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 25px;
                                border-radius: 5px;
                                .news_section_right_bottom_item_left{
                                    width: 130px;
                                    height: 80px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                        border-radius: 5px;
                                    }
                                }
                                .news_section_right_bottom_item_right{
                                    width: calc(100% - 150px);
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    .new_item_top{
                                        padding-top:4px ;
                                        font-weight: 600;
                                        font-size: 15px;
                                        line-height: 1.5;
                                        // 超过两行显示...
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                    }
                                    .new_item_bottom{
                                        margin-bottom: 4px;
                                        font-size: 14px;
                                        color: #9b9fa9;
                                    }
                                }
                            }
                            .news_section_right_bottom_item_active, .news_section_right_bottom_item:hover {
                                // 背景色半透明
                                background: linear-gradient(to right, #62c1ff, #1760f3);
                                .news_section_right_bottom_item_right{
                                    .new_item_top, .new_item_bottom{
                                        color: #FFFFFF;
                                    }
                                }
                            }
                            .news_section_right_bottom_item:nth-child(5n) {
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
        
    }
    .suspension_box {
        z-index: 999;
        position: fixed;
        right: 20px;
        top: 50%;
        background-color: #0043ce;
        border-radius: 6px;
        width: 61px;
        height: 263px;
        .suspension {
            // 背景色从上到下渐变
            background: linear-gradient(to bottom, #62c1ff, #1760f3);
            position: absolute;
            top: 0;
            left: -1px;
            border-radius: 6px;
            .suspension_item {
                cursor: pointer;
                padding: 10px 6px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #7aacf9;
                position: relative;
                img {
                    width: 24px;
                    margin-bottom: 5px;
                }
                .title {
                    font-size: 12px;
                    // 文字不换行
                    white-space: nowrap;
                    color: #FFFFFF;
                }
                .content_box {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: -20px;
                    transform: translate(-100%, -50%);
                    background-color: #FFFFFF;
                    border-radius: 5px;
                    // 阴影
                    box-shadow: 0 0 10px rgba(0,0,0,0.2);
                    .content_item{
                        // 自动换行
                        word-wrap: break-word;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        .content_item_top{
                            margin-bottom: 5px;
                        }
                        img {
                            width: 100px;
                        }
                    }
                    .triangle {
                        // 向右指的三角形
                        position: absolute;
                        top: 50%;
                        right: 0;
                        transform: translate(100%, -50%);
                        width: 0;
                        height: 0;
                        border-top: 6px solid transparent;
                        border-bottom: 6px solid transparent;
                        border-left: 6px solid #FFFFFF;
                    }
                }
            }
            .suspension_item:nth-child(4) {
                border-bottom: none;
            }
        }
    }
}
@media (max-width: 1640px) {
    .index {
        .edu_content {
            .science_in {
                .team_content{
                    .science_section {
                        width: 1460px;
                        .swiper-container {
                            .swiper-wrapper {
                                .swiper-slide {
                                    width: 433px!important;
                                }
                                .swiper-slide-active {
                                    .swiper-slide_boxs{
                                        width: 500px!important;
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
@media (max-width: 1460px) {
    .index {
        .edu_content {
            .science_in {
                .team_content{
                    .science_section {
                        width: 1260px;
                        .swiper-container {
                            .swiper-wrapper {
                                .swiper-slide {
                                    width: 366px!important;
                                }
                                .swiper-slide-active {
                                    .swiper-slide_boxs{
                                        width: 430px!important;
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
@media (max-width: 1341px) {
    .index {
        .edu_content {
            .science_in {
                .team_content{
                    .science_section {
                        width: 1200px;
                        .swiper-container {
                            .swiper-wrapper {
                                .swiper-slide {
                                    width: 340px!important;
                                }
                                .swiper-slide-active {
                                    .swiper-slide_boxs{
                                        width: 400px!important;
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
    .index {
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
@media (max-width: 1340px) {
    .index {
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
                    }
                }
            }
        }
    }
}
@media (max-width: 1260px) {
    .index {
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