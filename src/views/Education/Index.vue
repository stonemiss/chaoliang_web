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
                <div class="edu_section_right animate__animated animate__fadeInRight" v-if="eduData.length>0">
                    <div class="edu_section_right_content" v-show="style==1">
                        <div class="edu_section_right_content_item" 
                        v-for="(item,index) in eduData" :key="index"
                        @click="goEduDetail(item.id)"
                        >
                            <div class="edu_section_right_content_item_odd wow animate__animated animate__fadeInUp" v-if="(index+1)%2==1"
                            data-wow-delay=".5s">
                                <div class="edu_section_right_content_item_left"></div>
                                <div class="edu_section_right_content_item_right">
                                    <div class="item_right_left">
                                        <div class="item_right_left_top">{{item.putTime.slice(0,4)}}</div>
                                        <div class="item_right_left_bottom">{{item.putTime.slice(5,10)}}</div>
                                        <div class="right_arrow">
                                            <img src="../../assets/images/arrow_right.png" alt="">
                                        </div>
                                    </div>
                                    <div class="item_right_right">
                                        <div class="title" v-if="item.hot">
                                            <div class="title_left">
                                                <img src="../../assets/images/hot.png" alt="" srcset="">
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
                                        <div class="prefile">{{item.profile}}</div>
                                    </div>
                                </div>
                                <div class="item_img" 
                                :style="index+1==isImageIndex?imageStyle:''" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
                                    <img :src="url + item.image.fileUrl" alt="">
                                </div>
                            </div>
                            <div class="edu_section_right_content_item_even  wow animate__animated animate__fadeInUp" data-wow-delay=".5s" v-else>
                                <div class="edu_section_right_content_item_left">
                                    <div class="item_right_left">
                                        <div class="item_right_left_top">{{item.putTime.slice(0,4)}}</div>
                                        <div class="item_right_left_bottom">{{item.putTime.slice(5,10)}}</div>
                                        <div class="right_arrow">
                                            <img src="../../assets/images/arrow_right.png" alt="">
                                        </div>
                                    </div>
                                    <div class="item_right_right">
                                        <div class="title" v-if="item.hot">
                                            <div class="title_left">
                                                <img src="../../assets/images/hot.png" alt="" srcset="">
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
                                        <div class="prefile">{{item.profile}}</div>
                                    </div>
                                </div>
                                <div class="edu_section_right_content_item_right"></div>
                                <div class="item_img"
                                :style="index+1==isImageIndex?imageStyle:''" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
                                    <img :src="url + item.image.fileUrl" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="edu_section_right_content edu_section_right_content_two wow animate__animated animate__fadeInUp" v-show="style==2">
                        <div class="edu_item_two_item" v-for="(item,index) in eduData" :key="index">
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
                                      @click="goEduDetail(item.id)">
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
import { restaurantPage,scenicPage,restTypePage } from "../../api/management.js";
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
            backgroundFileUrl:'',
            imageLoading:false,
            eduCategoryList:[],
            activeId: this.$store.state.eduActiveId ? this.$store.state.eduActiveId : 1,
            eduData:[],
            total:0,
            isFirst:false,
            style:'',//1为列表，2为卡片
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
                        if(item.bannerName=='科普教育') {
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
            this.$store.commit("changeEduActiveId",this.activeId)
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
        // 科普教育分类
        async getRestTypePage() {
            const res = await restTypePage(
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
        // 获取教育数据
        async getEduData() {
            this.isFirst = true
            const res = await restaurantPage(
                {
                    current:this.eduInfo.current,
                    pageSize:this.eduInfo.pageSize,
                    type:this.activeId
                }
            )
            if(res.code==1) {
                this.eduData = res.data.records;
                this.total = res.data.total;
            }
        },
        handlecurrentChange(value) {
            $('html, body').animate({scrollTop: 200}, 500)
            setTimeout(() => {
                this.eduInfo.current = value;
                this.getEduData()
            }, 500)
        },
        goEduDetail(id) {
            this.$router.push({
                path:'/educationDetail',
                query:{
                    type:2,
                    id
                }
            })
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
                width: calc(100% - 300px);
                .edu_section_right_content {
                    width: 100%;
                    .edu_section_right_content_item {
                        width: 100%;
                        height: 200px;
                        margin-bottom: 50px;
                        cursor: pointer;
                        .edu_section_right_content_item_odd {
                            width: 100%;
                            height: 200px;
                            padding: 0 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border: 1px solid #e9eaeb;
                            position: relative;
                            .edu_section_right_content_item_left {
                                width: 310px;
                            }
                            .edu_section_right_content_item_right {
                                width: calc(100% - 310px);
                                // 超出换行
                                word-wrap: break-word;
                                display: flex;
                                justify-content: space-between;
                                .item_right_left {
                                    margin-right: 20px;
                                    .item_right_left_top{
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #0050f4;
                                    }
                                    .item_right_left_bottom{
                                        font-size: 18px;
                                        font-weight: bold;
                                        color: #1d5bf4;
                                    }
                                    .right_arrow {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        margin-top: 22px;
                                    }
                                }
                                .item_right_right {
                                    width: calc(100% - 75px);
                                    .title {
                                        width: 100%;
                                        font-size: 18px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                        margin-top: 2px;
                                        display: flex;
                                        align-items: center;
                                        .title_left {
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
                                            }
                                        }
                                        .title_right {
                                            width: calc(100% - 51px);
                                            // 超出显示...
                                            .tooltip_overflow {
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            }
                                        }
                                        .title_right_all {
                                            width: 100%;
                                            // 超出显示...
                                            .tooltip_overflow {
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            }
                                        }
                                    }
                                    .prefile{
                                        // 超过三行显示省略号
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        line-height: 2;
                                        text-indent: 2em;
                                    }
                                }
                            }
                            .item_img {
                                position: absolute;
                                top: 10px;
                                left: 0;
                                width: 310px;
                                height: 210px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }
                            }
                        }
                        .edu_section_right_content_item_even {
                            width: 100%;
                            height: 200px;
                            padding: 0 15px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            border: 1px solid #e9eaeb;
                            position: relative;
                            .edu_section_right_content_item_right {
                                width: 310px;
                            }
                            .edu_section_right_content_item_left {
                                width: calc(100% - 310px);
                                // 超出换行
                                word-wrap: break-word;
                                display: flex;
                                justify-content: space-between;
                                .item_right_left {
                                    margin-right: 20px;
                                    .item_right_left_top{
                                        font-size: 24px;
                                        font-weight: bold;
                                        color: #0050f4;
                                    }
                                    .item_right_left_bottom{
                                        font-size: 18px;
                                        font-weight: bold;
                                        color: #1d5bf4;
                                    }
                                    .right_arrow {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        margin-top: 22px;
                                    }
                                }
                                .item_right_right {
                                    width: calc(100% - 75px);
                                    .title {
                                        width: 100%;
                                        font-size: 18px;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                        margin-top: 2px;
                                        display: flex;
                                        align-items: center;
                                        .title_left {
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
                                            }
                                        }
                                        .title_right {
                                            width: calc(100% - 51px);
                                            // 超出显示...
                                            .tooltip_overflow {
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            }
                                        }
                                        .title_right_all {
                                            width: 100%;
                                            // 超出显示...
                                            .tooltip_overflow {
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            }
                                        }
                                    }
                                    .prefile{
                                        // 超过三行显示省略号
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        line-height: 2;
                                        text-indent: 2em;
                                    }
                                }
                            }
                            .item_img {
                                position: absolute;
                                top: 10px;
                                right: 0;
                                width: 310px;
                                height: 210px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
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
                        .edu_item_two_item_top {
                            width: 280px;
                            height: 180px;
                            border-radius: 5px;
                            img {
                                height: 100%;
                                width: 100%;
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
                                    height: 26px;
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