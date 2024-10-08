<template>
    <div class="eduDetail">
        <div class="section wow animate__animated animate__fadeInUp">
            <div class="eduDetail_bar">
                <div class="eduDetail_bar_item cursor" @click="$router.push('/index')">
                    首页
                    <div class="line"></div>
                </div>
                <div class="eduDetail_bar_item cursor" @click="$router.push(barDetail.path)">
                    {{barDetail.name}}
                    <div class="line"></div>
                </div>
                <div class="eduDetail_bar_item">{{barDetail.subName}}</div>
            </div>
            <div class="eduDetail_content">
                <div class="eduDetail_content_title">
                    {{detail.title}}
                    <div class="sign" v-if="type==2&&detail.activity==1"
                     :style="signStyle"
                    @mouseenter="handleMouseEnter()" @mouseleave="handleMouseLeave()"
                    @click="goSignUp()">
                        <img src="../../assets/images/signUp.png" alt="">
                        <div class="sign_text">去报名</div>
                    </div>
                </div>
                <div class="eduDetail_content_middle">
                    <div class="eduDetail_content_middle_item">{{detail.putTime}}</div>
                    <div class="eduDetail_content_middle_item">发布人：{{detail.createUsername}}</div>
                    <div class="eduDetail_content_middle_item">信息来源：{{detail.origin?detail.origin:"暂无"}}</div>
                </div>
                <div class="eduDetail_content_content">
                    <!-- <div class="profile">{{detail.profile}}</div> -->
                    <div class="content" v-html="detail.content"></div>
                </div>
                <div class="eduDetail_content_bottom">
                    <div class="eduDetail_content_bottom_item" @click="previous">上一篇：{{previousDetail?previousDetail.title:''}}</div>
                    <div class="eduDetail_content_bottom_item" @click="next">下一篇：{{nextDetail?nextDetail.title:''}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { restaurantGet,restaurantPage,storyPage,storyGet } from "../../api/management.js";
export default {
    computed: {
        signStyle() {
            return {
                transform: this.isHoverSign ? 'scale(1.15)' : 'scale(1)',
                transition: 'transform 0.4s ease-in-out',
            };
        },
    },
    data() {
        return {
            isHoverSign:false,
            id:this.$route.query.id,
            type:this.$route.query.type,
            eduType:this.$store.state.eduActiveId,
            barDetail:{},
            detail:{},
            // 上一篇
            previousDetail: {},
            // 下一篇
            nextDetail: {},
            // 当前新闻或者科普的全部数据id
            allData:[],
        }
    },
    created() {
        if(this.$route.query.type==1) {
            this.getNewsData()
            // 新闻详情
            this.barDetail = {
                name:'新闻动态',
                path:'/news',
                subName:'新闻详情',
                subPath:'/newsDetail'
            }
        } else{
            this.getEduData(this.eduType)
            // 科普详情
            this.barDetail = {
                name:'科普教育',
                path:'/education',
                subName:'量子学习',
                subPath:'/educationDetail'
            }
        }
        if(this.$route.query.id) {
            this.getDetail();
        }
    },
    methods: {
        handleMouseEnter() {
            this.isHoverSign = true;
        },
        handleMouseLeave() {
            this.isHoverSign = false;
        },
        // 科普数据
        async getEduData(type) {
            const res = await restaurantPage(
                {
                    current:1,
                    pageSize:-1,
                    type:type
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.allData = res.data.records
                }
            }
        },
        // 新闻数据
        async getNewsData() {
            const res = await storyPage(
                {
                    current:1,
                    pageSize:-1,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    this.allData = res.data.records
                }
            }
        },
        async getDetail() {
            if(this.type==1) {
                // 新闻详情
                const res = await storyGet(this.id);
                if(res.code==1) {
                    this.detail = res.data
                    setTimeout(() => {
                       this.getPrevAndNext(res.data.id)
                    }, 500);
                }
            }else if(this.type==2) {
                // 科普详情
                const res = await restaurantGet(this.id);
                if(res.code==1) {
                    this.detail = res.data
                    setTimeout(() => {
                       this.getPrevAndNext(res.data.id)
                    }, 500);
                }
            }
        },
        // 找到当前id的上一个和下一个数据
        getPrevAndNext(id) {
            // 先找到当前id在allData中的索引
            const index = this.allData.findIndex(item => item.id == id)
            // 如果索引为0，说明当前是第一个数据，不能再往前了
            if(index == 0) {
                // 找最后一个数据
                this.previousDetail = this.allData[this.allData.length-1]
            } else {
                this.previousDetail = this.allData[index-1]
            }
            // 如果索引为allData.length-1，说明当前是最后一条数据，不能再往后了
            if(index == this.allData.length-1) {
                // 找第一条数据
                this.nextDetail = this.allData[0]
            } else {
                this.nextDetail = this.allData[index+1]
            }
        },
        previous() {
            // 先找到当前id在allData中的索引
            const index = this.allData.findIndex(item => item.id == this.id)
            // 如果索引为0，说明当前是第一个数据
            let previousId = null
            if(index == 0) {
                // 找最后一个数据
                previousId = this.allData[this.allData.length-1].id
            } else {
                previousId = this.allData[index-1].id
            }
            // 跳转到上一个数据详情页
            this.$router.push({path:this.barDetail.subPath,query:{type:this.type,id:previousId}})
        },
        next() {
            // 先找到当前id在allData中的索引
            const index = this.allData.findIndex(item => item.id == this.id)
            // 如果索引为allData.length-1，说明当前是最后一条数据
            let nextId = null
            if(index == this.allData.length-1) {
                // 找第一条数据
                nextId = this.allData[0].id
            } else {
                nextId = this.allData[index+1].id
            }
            // 跳转到下一个数据详情页
            this.$router.push({path:this.barDetail.subPath,query:{type:this.type,id:nextId}})
        },
        // 去报名
        goSignUp() {
            this.$router.push({path:'/reservation',query:{id:this.id}})
        }
    },
    mounted() {
        // 在页面中找到el-tooltip__popper元素，并给它添加display:none样式，防止el-tooltip__popper元素在页面中闪烁
        const popper = document.querySelector('.el-tooltip__popper');
        console.log(popper);
        if(popper) {
            popper.style.display = 'none';
        }
    }
}
</script>
<style lang="scss" scoped>
.eduDetail {
    padding-bottom: 50px;
    .section {
        .eduDetail_bar {
            display: flex;
            padding: 60px 0;
            .eduDetail_bar_item {
                margin-right: 20px;
                color: #1d305b;
                font-size: 15px;
                position: relative;
                .line {
                    position: absolute;
                    top: 0;
                    right:-10px;
                    height: 10px;
                    width: 1px;
                    transform: translate(0,50%);
                    border-right: 1px solid #9b9b9b;
                }
            }
            .cursor {
                cursor: pointer;
            }
        }
        .eduDetail_content {
            .eduDetail_content_title {
                text-align: center;
                font-weight: 600;
                font-size: 20px;
                color: #000000;
                margin-bottom: 26px;
                position: relative;
                .sign {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate(-50%,-50%);
                    font-size: 17px;
                    font-weight: 500;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    color:#0050f4;
                    img {
                        width: 20px;
                        margin-right: 5px;
                    }
                }
            }
            .eduDetail_content_middle{
                color: #8c8c8c;
                font-size: 14px;
                display: flex;
                border-bottom:1px solid #f0f0f0 ;
                padding-bottom: 9px;
                .eduDetail_content_middle_item{
                    margin-right: 10px;
                }
            }
            .eduDetail_content_content {
                padding: 35px 0 50px 0;
                border-bottom:1px solid #f0f0f0 ;
                font-size: 16px;
                .profile{
                    text-indent: 2em;
                    line-height: 2.5;
                    margin-bottom: 30px;
                }
                .image{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        width: 1000px;
                        height: auto;
                        margin-bottom: 26px;
                    }
                    .image_title{
                        color: #8c8c8c;
                        font-size: 14px;
                    }
                }
            }
            .eduDetail_content_bottom{
                padding: 38px 0;
                display: flex;
                justify-content: space-between;
                color: #000000;
                .eduDetail_content_bottom_item{
                    cursor: pointer;
                    width: 48%;
                }
            }
        }
    }
}

</style>