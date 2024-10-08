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
                            <!-- <img :src="url+item.image.fileUrl" alt=""> -->
                            <img :src="eduData_bgimg[index].imgUrl" alt="">
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
                            <!-- <img :src="url+item.image.fileUrl" alt=""> -->
                            <img :src="eduData_bgimg[index].imgUrl" alt="">


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
            eduData_bgimg:[
              {imgUrl:require('../../assets/images/cen/resource_1.png')},
              {imgUrl:require('../../assets/images/cen/resource_2.png')},
              {imgUrl:require('../../assets/images/cen/resource_3.png')}
            ]
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

            // 模拟数据
            // this.eduData = [
            //     {
            //         title:"本源量超融合计算云平台",
            //         content:"本平台集成了本源量子自主研发的“本源悟空”系列超导量子计算机和合肥先进计算中心的“巢湖明月”超级计算机，通过量超融合计算系统解决方案，实现了量子计算机与超级计算机的高效协同工作。同时，平台还配备了完善的软件系统，包括基础软件、应用软件和云服务软件，致力于打造综合性量超融合计算服务平台，助力复杂科学计算和前沿研究的突破。",
            //         link:"",
            //         imgUrl:require('../../assets/images/cen/resource_1.png')
            //     },
            //     {
            //         title:"国盾量超融合计算云平台",
            //         content:"本平台集成了国盾量子自主研发的“骁鸿”系列超导量子计算机。“骁鸿”系列量子计算机以超导量子比特为核心，使用高性能可调耦合比特技术路线，采用了全球领先的是子计算架构。“骁鸿”系列量子计算机平台在原有的芯片，架构，测控体系上进行软硬件的技术升级，具备更高的保真度性能，更长久的比特寿命;同时实现了巢湖超算系统与量算系统的深度融合。通过该平台，用户可以使用超量混合编程体系执行变分量子计算，量子模拟等大型计算任务，还可以通过图形化编程，指令集编程等手段进行小型科研任务的探索和底层测控波形实验的探索。“骁鸿”系列量子计算机目前支持全国产QCIS量子指令集+Cqlib编程工具集，并对Qiskit等第三方编程架构进行兼容支持。国盾量子致力于为各行业带来更高效、更智能的计算解决方案，欢迎在“骁鸿”的陪...本平台集成了国盾量子自主研发的“骁鸿”系列超导量子计算机。",
            //         link:"",
            //         imgUrl:require('../../assets/images/cen/resource_2.png')

                    
            //     },
            //     {
            //         title:"国仪量超融合计算云平台",
            //         content:"本平台集成了国仪自主研发的“lon-1”系列离子阱量子计算机，具有量子比特之间连接性好、相干时间长、门操控保真度高、全同是子比特等特点。离子阱量子计算机是唯--种具有超长相干时间，同时在量子态的制备、操控及测量等关键参数上能够满足量子容错计算需求的物理系统。 本平台能够直接调用量子计算资源和量超融合计算资源，为前沿科学问题的研究和突破提供算力支持。",
            //         link:"",
            //         imgUrl:require('../../assets/images/cen/resource_3.png')
                    
            //     }
            // ]
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
                    box-shadow: 0 0 15px rgba(0,0,0,0.1);
                    padding: 40px;

                    .edu_item_odd_left {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // margin-top: 30px;
                        width: 468px;
                        height: 280px;
                        // 从上到下背景色渐变
                        // background: linear-gradient(to bottom, #30a9f9, #211ccb);
                        // 阴影
                        // box-shadow: 0 0 15px rgba(0,0,0,0.5);
                        img {
                            // width: 100%;
                            height: 100%;
                            // position: absolute;
                            // top: -30px;
                            // left: 30px;
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
                            -webkit-line-clamp: 11;
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
                    box-shadow: 0 0 15px rgba(0,0,0,0.1);
                    padding: 40px;

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
                            -webkit-line-clamp: 11;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .edu_item_odd_right {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: 30px;
                        width: 468px;
                        height: 280px;
                        // 从上到下背景色渐变
                        // background: linear-gradient(to bottom, #30a9f9, #211ccb);
                        // 阴影
                        // box-shadow: 0 0 15px rgba(0,0,0,0.5);
                        img {
                            // width: 100%;
                            height: 100%;
                            text-align: center;
                            vertical-align: center;
                            // position: absolute;
                            // top: -30px;
                            // left: -30px;
                        }
                    }
                }
            }
        }
    }
}

</style>