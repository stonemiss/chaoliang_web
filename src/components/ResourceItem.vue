<template>
    <div class="resourse">
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
                            <img class="half_image" src="../assets/images/arrow_half_right.png" alt="">
                            <div class="center_section_left_top_view_text">查看更多</div>
                        </div>
                    </div>
                    <swiper :options="swiperOptionResourse" ref="mySwiperResourse" v-if="resourse.list.length"
                    >
                        <swiper-slide
                            class="swiper-slide"
                            v-for="(item) in resourse.list"
                            :key="item.id"
                        >
                            <div class="resourse_image" @click="goLink(item.link)">
                            <img class="resourse_image_img" v-if="item.image" :src="url+item.image.fileUrl" />
                            </div>
                            <div class="resourse_title_box" @click="goLink(item.link)">
                                <div class="item_title">
                                    <!-- <el-tooltip :content="item.title" popper-class="pop-class-title" placement="bottom" effect="light">
                                        <span>{{item.title}}</span>
                                    </el-tooltip> -->
                                    <div v-overflow-tooltip="{effect:'light'}" class="tooltip_overflow">
                                        {{item.title}}
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { noticePage } from "../api/management.js";
export default {
    computed:{
        mySwiperResourse() {
            return this.$refs.mySwiperResourse.swiper
        },
        centerLeftStyle() {
            return {
                transform: this.isHoverCenterLeft ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
    },
    data() {
        return {
            url:process.env.VUE_APP_WEB_URL,
            isHoverCenterLeft:false,
            // 算力资源
            resourse:{
                chineseName:'算力资源',
                englishName:'center Resources',
                list:[]
            },
            swiperOptionResourse: {
                loop: false, //是否循环轮播
                autoplay: false, //可选选项，自动滑动
                autoplayDisableOnInteraction: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                spaceBetween: 30,
                slidesPerView: 3,
                // on: {
                //     slideChangeTransitionEnd() {
                //         this.autoplay.start();//拖拽之后继续轮播
                //     },
                // },
            },
        }
    },
    created() {
        this.getNoticePage();
    },
    methods:{
        // 算力资源
        async getNoticePage() {
            const res = await noticePage(
                {
                    current:1,
                    pageSize:-1,
                    flag:1
                }
            );
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.resourse.list = res.data.records;
                }
            }
        },
        onMouseEnter(id) {
            if(id==1) {
                // this.mySwiperResourse.autoplay.stop()
            }
        },
        onMouseLeave(id) {
            if(id==1) {
                // this.mySwiperResourse.autoplay.start()
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
        goResourse() {
            this.$router.push('/resource')
        },
        goLink(path) {
            if(path) {
                window.open(path);
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.resourse {
    .resourse_in {
            background: url('../assets/images/index/in_bgc_5.png') no-repeat center bottom;
            background-size: 100% 100%;
            .title {
                padding: 74px 0 50px 0;
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
                height: 480px;
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
                                // height: 275px;
                                background-color: #FFFFFF;
                                .resourse_image {
                                    width: 100%;
                                    height: 260px;
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
                                        width: 100%;
                                        .tooltip_overflow {
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                        }
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

}
@media (max-width: 1320px) {
    .resourse {
        .team_in {
            .team_content {
                .team_section {
                    width: 1180px;
                }
            }
        }
    }
}
</style>