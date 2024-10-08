<template>
    <div class="edu">
        <div class="edu_top animate__animated animate__fadeIn" :style="{'backgroundImage': 'url('+ backgroundFileUrl+')'}" @click="goOtherPath(bannerDetail)">
            <img v-if="bannerDetail.image" :src="url + bannerDetail.image.fileUrl" alt="" @load="bannerImgLoading">
        </div>
        <div class="edu_content">
                <div class="edu_section">
                    <div class="edu_section_left animate__animated animate__fadeInLeft">
                        <div class="edu_section_left_item" 
                            :class="{active:item.id==activeId}" 
                            @click="handleClick(item.id)" 
                            v-for="item in eduCategoryList" :key="item.id">
                                {{item.name}}
                        </div>
                    </div>
                    <div class="edu_section_right animate__animated animate__fadeInRight"  v-if="eduData.length>0">
                       <div class="edu_section_right_content" v-show="style==1">
                            <div class="edu_item wow animate__animated animate__fadeInUp" v-for="(item,index) in eduData" :key="index"
                            data-wow-delay=".5s"
                             @click="goEduDetail(item)">
                                <div class="edu_item_left"
                                :style="index+1==isImageIndex?imageStyle:''" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
                                    <img v-if="item.image" :src="url+item.image.fileUrl" alt="">
                                </div>
                                <div class="edu_item_right">
                                    <div class="edu_item_right_left">
                                        <div class="title" v-if="item.hot">
                                            <div class="title_left">
                                                <img src="../../assets/images/hot.png" alt="" srcset="">
                                                热点新闻
                                            </div>
                                            <div class="title_right">
                                                <div v-overflow-tooltip="{effect:'light'}" class="tooltip_overflow">
                                                    {{item.title}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="title" v-else>
                                            <div class="title_right_all">
                                                <div v-overflow-tooltip="{effect:'light'}" class="tooltip_overflow">
                                                    {{item.title}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="profile">{{item.profile}}</div>
                                        <div class="time">{{item.createTime? item.createTime.slice(0,10) : ''}}</div>
                                    </div>
                                    <div class="edu_item_right_right">
                                        <div class="month">
                                            <div class="month_box">
                                                <div class="month_box_item first">{{getMonth(item.createTime)}}</div>
                                                <div class="month_box_item second">{{getDate(item.createTime)}}</div>
                                            </div>
                                        </div>
                                        <div class="view_detail">
                                            查看详情
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="edu_section_right_content edu_section_right_content_two wow animate__animated animate__fadeInUp" v-show="style==2">
                            <div class="edu_item_two_item" v-for="(item,index) in eduData" :key="index" @click="goEduDetail(item)">
                                <div class="edu_item_two_item_top">
                                    <img v-if="item.image" :src="url+item.image.fileUrl" />
                                </div>
                                <div class="edu_item_two_item_bottom">
                                    <div class="edu_item_two_item_bottom_top" v-if="item.hot">
                                        <div class="edu_item_two_item_bottom_top_left">
                                            <img src="../../assets/images/hot.png" alt="" srcset="">
                                        </div>
                                        <div class="edu_item_two_item_bottom_top_right">
                                            <div v-overflow-tooltip="{effect:'light'}" class="tooltip_overflow">
                                                {{item.title}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="edu_item_two_item_bottom_top" v-else>
                                        <div class="edu_item_two_item_bottom_top_right_all">
                                            <div v-overflow-tooltip="{effect:'light'}" class="tooltip_overflow">
                                                {{item.title}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="edu_item_two_item_bottom_middle">{{item.profile}}</div>
                                    <div class="edu_item_two_item_bottom_bottom">
                                        <div class="edu_item_two_item_bottom_bottom_left">{{item.putTime.slice(0,4)}}/{{item.putTime.slice(5,7)}}/{{item.putTime.slice(8,11)}}</div>
                                        <div class="edu_item_two_item_bottom_bottom_right"
                                          :style="index+1==isScienceId?scienceLeftStyle:''"
                                          @mouseenter="handleMouseEnters(2,index+1)" @mouseleave="handleMouseLeaves(2,index+1)"
                                          >
                                            <img class="edu_item_two_item_bottom_bottom_right_img" src="../../assets/images/arrow_half_right.png" alt="">
                                            <div class="edu_item_two_item_bottom_bottom_right_text">查看</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="edu_section_right" v-else>
                        <div style="text-align:center;margin:100px;font-size:18px;">暂无数据</div>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="edu_page">
                    <div class="page_section">
                        <div class="page_left"></div>
                        <div class="page_right">
                            <el-pagination
                                background
                                layout="prev, pager, next"
                                @current-change="handlecurrentChange"
                                :total="total"
                                :page-size="eduInfo.pageSize"
                                :current-page="eduInfo.current"
                                v-if="total>0"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { storyPage,scenicPage,storyTypePage } from "../../api/management.js";
export default {
    watch:{
        eduData() {
            this.$nextTick(()=>{
                new this.$wow.WOW({live:true}).init();
            })
        }
    },
    computed: {
        scienceLeftStyle() {
            return {
                transform: this.isHoverScienceLeft ? 'scale(1.1)' : 'scale(1)',
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
            isImageHovered:false,
            isImageIndex:0,
            eduInfo:{
                current:1,
                pageSize:''
            },
            bannerDetail:{},
            imageLoading:false,
            backgroundFileUrl:'',
            eduData:[],
            total:0,
            // 月份简称列表
            monthList:[
                {
                    index:'01',
                    name:'JAN'
                },
                {
                    index:'02',
                    name:'FEB'
                },
                {
                    index:'03',
                    name:'MAR'
                },
                {
                    index:'04',
                    name:'APR'
                },
                {
                    index:'05',
                    name:'MAY'
                },
                {
                    index:'06',
                    name:'JUN'
                },
                {
                    index:'07',
                    name:'JUL'
                },
                {
                    index:'08',
                    name:'AUG'
                },
                {
                    index:'09',
                    name:'SEP'
                },
                {
                    index:'10',
                    name:'OCT'
                },
                {
                    index:'11',
                    name:'NOV'
                },
                {
                    index:'12',
                    name:'DEC'
                }
            ],
            activeId: this.$store.state.newActiveId ? this.$store.state.newActiveId : '',
            style:'',//1为列表，2为卡片
            eduCategoryList:[],
            isFirst:false,
            isScienceId:-1,
            isHoverScienceLeft:false,
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
                        if(item.bannerName=='新闻动态') {
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
        handleClick(id) {
            if(this.isFirst) {
               $('html, body').animate({scrollTop: 200}, 500)
            }
            this.activeId = id;
            this.$store.commit("changeNewActiveId",this.activeId)
            this.getStyle()
            this.eduInfo.current = 1
            this.getEduData()
        },
        getStyle() {
            if(this.eduCategoryList.length>0) {
                this.eduCategoryList.forEach((item) => {
                    if(item.id==this.activeId) {
                        this.style = item.style;
                        this.eduInfo.pageSize = item.style==1?5:6;
                    }
                })
            }
        },
        // 新闻分类
        async getRestTypePage() {
            const res = await storyTypePage(
                {
                    current:1,
                    pageSize:-1,
                    flag:1,
                }
            )
            if(res.code==1) {
                this.eduCategoryList = res.data.records
                if(!this.activeId) {
                    this.activeId = this.eduCategoryList[0].id
                    this.handleClick(this.eduCategoryList[0].id)
                } else {
                    this.handleClick(this.activeId)
                }
            }
        },
        // 获取新闻数据
        async getEduData() {
            this.isFirst = true
            const res = await storyPage(
                {
                    current:this.eduInfo.current,
                    pageSize:this.eduInfo.pageSize,
                    type:this.activeId,
                }
            )
            if(res.code==1) {
                this.eduData = res.data.records;
                this.total = res.data.total;

            }
        },
        handlecurrentChange(value) {
            // 点击分页页面向上滚动到距离顶部500px
            $('html, body').animate({scrollTop: 200}, 500)
            setTimeout(() => {
                this.eduInfo.current = value;
                this.getEduData();
            }, 500)
        },
        goEduDetail(item) {
            if(item.link) {
                window.open(item.link)
            } else {
                this.$router.push({
                    path:'/newsDetail',
                    query:{
                        type:1,
                        id:item.id
                    }
                })
            }
        },
        getMonth(time) {
            // 截取月份，取出monthList中dui对应的name
            let month = time.slice(5,7);
            let monthName = this.monthList.find(item => item.index === month).name;
            return monthName;
        },
        getDate(time) {
            // 截取今天的日期
            let date = time.slice(8,10);
            return date;
        },
        handleMouseEnter(index) {
            this.isImageHovered = true;
            this.isImageIndex = index+1;
        },
        handleMouseLeave(index) {
            this.isImageHovered = false;
            this.isImageIndex = index+1;
        },
        handleMouseEnters(item,location) {
            if(item==2) {
                this.isHoverScienceLeft = true
                this.isScienceId = location;
            }
        },
        handleMouseLeaves(item,location) {
            if(item==2) {
                this.isHoverScienceLeft = false
                this.isScienceId = location;
            }
        },
    },
    created() {
        this.getRestTypePage()
        this.getScenicPage()
    },
    mounted() {
        this.$nextTick(()=>{
            new this.$wow.WOW().init();
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
        background-position: center;
        img {
            width: 0;
            height: 0;
            object-fit: cover;
        }
    }
    .edu_content{
        padding: 60px 0 80px 0;
        .edu_section {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .edu_section_left {
                width: 250px;
                .edu_section_left_item {
                    width: 250px;
                    height: 79px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    cursor: pointer;
                    border-bottom: 1px dashed #e9eaeb;
                }
                .edu_section_left_item:last-child {
                    border-bottom: none;
                }
                .active {
                    background-color: #0050f4;
                    transition: 0.5s ease all;
                    color: #FFFFFF;
                    border-bottom: none;
                }
            }
            .edu_section_right{
                width: calc(100% - 280px);
                .edu_section_right_content {
                    width: 100%;
                    .edu_item {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;
                        padding-bottom: 30px;
                        border-bottom: 1px solid #efefef;
                        padding-right: 10px;
                        cursor: pointer;
                        .edu_item_left {
                            width: 280px;
                            height: 180px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        .edu_item_right {
                            display: flex;
                            width: calc(100% - 310px);
                            .edu_item_right_left {
                                width: calc(100% - 110px);
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                .title {
                                    font-size: 18px;
                                    font-weight: bold;
                                    display: flex;
                                    align-items: center;
                                    .title_left {
                                        width: 100px;
                                        font-size:15px;
                                        font-weight: bold;
                                        background-color: #ffe2cb;
                                        padding: 4px 9px;
                                        border-radius: 4px;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        color: #FF7E00;
                                        margin-right: 15px;
                                        img {
                                            height: 18px;
                                            margin-right: 3px;
                                        }
                                    }
                                    .title_right {
                                        width: calc(100% - 115px);
                                        // 超出显示...
                                        .tooltip_overflow {
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                        }
                                    }
                                    .title_right_all {
                                        width: 100%;
                                        .tooltip_overflow {
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
                                        }
                                    }
                                }
                                .profile{
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    line-height: 29px;
                                    text-indent: 2em;
                                    margin-bottom: 15px;
                                }
                                .time {
                                    color: #999999;
                                    margin-bottom: 10px;
                                    font-size: 15px;
                                }
                            }
                            .edu_item_right_right{
                                width: 100px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                .month {
                                    // margin-top: 10px;
                                    display: flex;
                                    flex-direction: row-reverse;
                                    .month_box {
                                        border: 1px solid #0050f4;
                                        width: 70px;
                                        .month_box_item{
                                            width: 100%;
                                            height: 39px;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            font-weight: bold;
                                            font-size: 22px;
                                        }
                                        .first {
                                            background-color: #0050f4;
                                            color: #FFFFFF;
                                        }
                                        .second {
                                            font-size: 24px;
                                            color: #0050f4;
                                        }
                                    }
                                }
                                .view_detail {
                                    width: 100%;
                                    border: 1px solid #3a7aeb;
                                    color: #1b63f5;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    padding: 2px 0 4px 0;
                                    border-radius: 20px;
                                    cursor: pointer;
                                }
                                .view_detail:hover {
                                    background-color: #0252f4;
                                    color:#ffffff;
                                }
                            }
                        }
                    }
                }
                .edu_section_right_content_two {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    .edu_item_two_item {
                        margin-right: 30px;
                        margin-bottom: 30px;
                        width: 280px;
                        border-radius: 5px;
                        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
                        cursor: pointer;
                        .edu_item_two_item_top {
                            border-radius: 5px;
                            width: 280px;
                            height: 180px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                border-radius: 5px;
                            }
                        }
                        .edu_item_two_item_bottom {
                            padding: 10px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .edu_item_two_item_bottom_top{
                                width: 100%;
                                margin-bottom: 10px;
                                display: flex;
                                align-items: center;
                                height: 25px;
                                .edu_item_two_item_bottom_top_left{
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
                                    margin-right: 10px;
                                    img {
                                        height: 18px;
                                    }
                                }
                                .edu_item_two_item_bottom_top_right{
                                    width: calc(100% - 40px);
                                    font-weight: bold;
                                    .tooltip_overflow {
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    }
                                }
                                .edu_item_two_item_bottom_top_right_all{
                                    width: 100%;
                                    font-weight: bold;
                                    .tooltip_overflow {
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                    }
                                }
                            }
                            .edu_item_two_item_bottom_middle{
                                // 超出一行显示...
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                font-size: 15px;
                                color: #9b9fa9;
                                margin-bottom: 10px;
                                height: 40px;
                            }
                            .edu_item_two_item_bottom_bottom{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .edu_item_two_item_bottom_bottom_left{
                                    font-size: 14px;
                                    color: #9b9fa9;
                                }
                                .edu_item_two_item_bottom_bottom_right {
                                    cursor: pointer;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .edu_item_two_item_bottom_bottom_right_img {
                                        width: 25px;
                                        height: 20px;
                                        margin-right: 6px;
                                    }
                                    .edu_item_two_item_bottom_bottom_right_text{
                                        font-size: 15px;
                                        color: #0053e5;
                                    }
                                }
                            }
                        }
                    }
                    .edu_item_two_item:nth-child(3n) {
                        margin-right: 0;
                    }
                }
            }
        }
        .edu_page{
            .page_section {
                width: 1200px;
                display: flex;
                margin: 0 auto;
                .page_left {
                    width: 250px;
                }
                .page_right{
                    width: calc(100% - 250px);
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }
}

</style>