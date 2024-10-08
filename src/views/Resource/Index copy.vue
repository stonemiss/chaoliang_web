<template>
    <div class="edu">
        <!-- <div class="edu_top animate__animated animate__fadeIn" :style="{'backgroundImage': 'url('+ backgroundFileUrl+')'}" @click="goOtherPath(bannerDetail)">
            <img v-if="bannerDetail.image" :src="url + bannerDetail.image.fileUrl" alt="" @load="bannerImgLoading">
        </div> -->
        <div class="edu_content">
            <div class="edu_section">
                <div class="edu_item wow animate__animated animate__fadeInUp" v-for="(item,index) in eduData" :key="index">
                    <div class="edu_item_odd" v-if="(index+1)%2==1">
                        <div class="edu_item_odd_left wow animate__animated animate__fadeInLeft"
                        data-wow-delay=".5s"
                         :style="index+1==isImageIndex?imageStyle:''" @mouseenter="handleMouseEnter(1,index)" @mouseleave="handleMouseLeave(1,index)">
                            <img :src="url+item.image.fileUrl" alt="">
                        </div>
                        <div class="edu_item_odd_right wow animate__animated animate__fadeInRight"
                        data-wow-delay=".3s">
                            <div class="edu_item_odd_right_top">
                                <div class="edu_item_odd_right_top_title">{{item.title}}</div>
                                <div class="edu_item_odd_right_top_go" @click="goLink(item.link)" :style="index+1==isGoToIndex?goToStyle:''" @mouseenter="handleMouseEnter(2,index)" @mouseleave="handleMouseLeave(2,index)">
                                    点击前往
                                    <img src="../../assets/images/arrow_right.png" alt="">
                                </div>
                            </div>
                            <div class="edu_item_odd_right_bottom">{{item.content}}</div>
                        </div>
                    </div>
                    <div class="edu_item_even" v-else>
                        <div class="edu_item_odd_left wow animate__animated animate__fadeInLeft"
                        data-wow-delay=".3s">
                            <div class="edu_item_odd_right_top">
                                <div class="edu_item_odd_right_top_title">{{item.title}}</div>
                                <div class="edu_item_odd_right_top_go" @click="goLink(item.link)" :style="index+1==isGoToIndex?goToStyle:''" @mouseenter="handleMouseEnter(2,index)" @mouseleave="handleMouseLeave(2,index)">
                                    点击前往
                                    <img src="../../assets/images/arrow_right.png" alt="">
                                </div>
                            </div>
                            <div class="edu_item_odd_right_bottom">{{item.content}}</div>
                        </div>
                        <div class="edu_item_odd_right wow animate__animated animate__fadeInRight" 
                        data-wow-delay=".5s"
                        :style="index+1==isImageIndex?imageStyle:''" @mouseenter="handleMouseEnter(1,index)" @mouseleave="handleMouseLeave(1,index)">
                            <img :src="url+item.image.fileUrl" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { noticePage,scenicPage } from "../../api/management.js";
export default {
    watch:{
        eduData() {
            this.$nextTick(()=>{
                new this.$wow.WOW({live:true}).init();
            })
        }
    },
    computed: {
        goToStyle() {
            return {
                transform: this.isGoToHovered ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
        imageStyle() {
            return {
                transform: this.isImageHovered ? 'scale(1.05)' : 'scale(1)',
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
            isGoToHovered:false,
            isGoToIndex:0,
            isImageHovered:false,
            isImageIndex:0,
            eduInfo:{
                current:1,
                pageSize:-1,
                flag:1
            },
            eduData:[],
            total:0,
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
                        if(item.bannerName=='算力资源') {
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
        // 获取教育数据
        async getEduData() {
            const res = await noticePage(this.eduInfo);
            if(res.code==1) {
                this.eduData = res.data.records;
                this.total = res.data.total;
            }
        },
        handleMouseEnter(item,index) {
            if(item==1) {
                this.isImageHovered = true;
                this.isImageIndex = index+1;
            } else {
                this.isGoToHovered = true;
                this.isGoToIndex = index+1;
            }
        },
        handleMouseLeave(item,index) {
            if(item==1) {
                this.isImageHovered = false;
                this.isImageIndex = index+1;
            } else {
                this.isGoToHovered = false;
                this.isGoToIndex = index+1;
            }
        },
        goLink(path) {
            if(path) {
                window.open(path);
            }
        }
    },
    created() {
        this.getScenicPage()
        this.getEduData()
    },
    mounted() {
        new this.$wow.WOW().init();
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
        background-position: center;
        img {
            width: 0;
            height: 0;
            object-fit: cover;
        }
    }
    .edu_content{
        padding: 60px 0;
        .edu_section {
            width: 1200px;
            margin: 0 auto;
            .edu_item {
                width: 100%;
                display: flex;
                .edu_item_odd {
                    width: 100%;
                    margin-bottom: 100px;
                    display: flex;
                    justify-content: space-between;
                    .edu_item_odd_left {
                        position: relative;
                        margin-top: 30px;
                        width: 468px;
                        height: 280px;
                        // 从上到下背景色渐变
                        background: linear-gradient(to bottom, #30a9f9, #211ccb);
                        // 阴影
                        box-shadow: 0 0 15px rgba(0,0,0,0.5);
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: -30px;
                            left: 30px;
                        }
                    }
                    .edu_item_odd_right {
                        width: calc(100% - 590px);
                        .edu_item_odd_right_top {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 25px;
                            .edu_item_odd_right_top_title {
                                font-size:20px;
                                font-weight: bold;
                            }
                            .edu_item_odd_right_top_go {
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                color: #0050f4;
                                cursor: pointer;
                                img {
                                    margin-top: 5px;
                                    width: 30px;
                                    margin-left: 6px;
                                }
                            }
                        }
                        .edu_item_odd_right_bottom {
                            // 文字两端对齐
                            text-align: justify;
                            text-justify: inter-ideograph;
                            text-indent: 2em;
                            line-height: 29px;
                            display: -webkit-box;
                            -webkit-line-clamp: 9;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
                .edu_item_even {
                    width: 100%;
                    margin-bottom: 100px;
                    display: flex;
                    justify-content: space-between;
                    .edu_item_odd_left {
                        width: calc(100% - 590px);
                        .edu_item_odd_right_top {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 25px;
                            .edu_item_odd_right_top_title {
                                font-size: 20px;
                                font-weight: bold;
                            }
                            .edu_item_odd_right_top_go {
                                display: flex;
                                align-items: center;
                                font-size: 16px;
                                color: #0050f4;
                                cursor: pointer;
                                img {
                                    margin-top: 5px;
                                    width: 30px;
                                    margin-left: 6px;
                                }
                            }
                        }
                        .edu_item_odd_right_bottom {
                            // 文字两端对齐
                            text-align: justify;
                            text-justify: inter-ideograph;
                            text-indent: 2em;
                            line-height: 29px;
                            display: -webkit-box;
                            -webkit-line-clamp: 9;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .edu_item_odd_right {
                        position: relative;
                        margin-top: 30px;
                        width: 468px;
                        height: 280px;
                        // 从上到下背景色渐变
                        background: linear-gradient(to bottom, #30a9f9, #211ccb);
                        // 阴影
                        box-shadow: 0 0 15px rgba(0,0,0,0.5);
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: -30px;
                            left: -30px;
                        }
                    }
                }
            }
        }
    }
}

</style>