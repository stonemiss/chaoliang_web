<template>
    <div class="home">
      <!-- pc端头部 -->
      <div class="top">
        <div class="top-left no-select" @click="changeMenu('/index')">
          <div class="top-left-left">
            <img src="../assets/images/logo.png" alt="">
          </div>
          <div class="top-left-right">
            <div class="top-left-right-top">
              <div class="top-left-right-top-top">合肥量超融合计算中心</div>
              <div class="top-left-right-top-bottom">QC-HPC Hybrid Computing Center</div>
            </div>
          </div>
        </div>
        <div class="top-middle no-select">
          <div class="menuItem" :class="{active:indexActive}" @click="changeMenu('/index')">
            <span class="act_btn">首页</span>
            <!-- <div class="line"></div> -->
          </div>
          <div class="menuItem" :class="{active:resourceActive}" @click="changeMenu('/resource')">
            <span class="act_btn">算力资源</span>
            <!-- <div class="line"></div> -->
          </div>
          <div class="menuItem centerItem" :class="{active:centerActive}" @click="changeMenu('/center')">
            <span class="act_btn">中心介绍
            <!-- <div class="line"></div> -->
              <div class="more" v-if="centerList.length">
                <i class="el-icon-caret-bottom"></i>
              </div>
            </span>
            <div class="subMenu centerMenu" style="display:none" v-if="centerList.length">
              <div class="subMenuItem" @click.stop="goCenterModule(item)" v-for="item in centerList" :key="item.id">
                {{item.name}}
              </div>
            </div>
          </div>
          <div class="menuItem newItem" :class="{active:newsActive}" @click="changeMenu('/news')">
            <span class="act_btn">新闻动态
            <!-- <div class="line"></div> -->
            <div class="more" v-if="newsCategory.length">
               <i class="el-icon-caret-bottom"></i>
            </div>
          </span>
            <div class="subMenu NewMenu" style="display:none" v-if="newsCategory.length">
              <div class="subMenuItem" @click.stop="goNew(item)" v-for="item in newsCategory" :key="item.id">
                {{item.name}}
              </div>
            </div>
          </div>
        
           <!-- <div class="menuItem eduItem" :class="{active:educationActive}" @click="changeMenu('/education')">
            科普教育
            <div class="line"></div>
            <div class="more" v-if="eduCategory.length">
               <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="subMenu eduMenu" style="display:none" v-if="eduCategory.length">
              <div class="subMenuItem" @click.stop="goEdu(item)" v-for="item in eduCategory" :key="item.id">
                {{item.name}}
              </div>
            </div>
          </div> -->
          <!-- <div class="menuItem moreItem" :class="{active:reservationActive}" @click="changeMenu('/reservation')">
            我要预约
            <div class="line"></div>
            <div class="more">
               <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="subMenu bookMenu" style="display:none">
               <div class="subMenuItem" @click.stop="changeMenu('/reservation')">活动报名</div>
               <div class="subMenuItem" @click.stop="changeMenu('/resource')">我要上机</div>
            </div>
          </div> -->
          <div class="menuItem" v-for="item in platform" :key="item.id" @click="goLink(item.linkUrl)">
            <span class="act_btn">{{item.linkName}}</span>
            <!-- <div class="line"></div> -->
          </div>
          <div class="menuItem"></div>
          <!-- <div class="menuItem" @click="goLink('https://www.hflzsc.com/education/cartoon')">
            双创平台
            <div class="line"></div>
          </div> -->
        </div>
        <!-- <div class="top-right">
            <el-input v-model="searchText" @keyup.enter.native="searchButton"
              @submit.native.prevent placeholder="请输入搜索内容"></el-input>
            <div class="search_button" @click="searchButton">
              <img src="../assets/images/search.png" alt="" srcset="">
            </div>
        </div> -->
      </div>
      <div class="content">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
        <!-- <div class="footer_top" :style="{borderLeft:bottomHalfWidthLeft,borderRight:bottomHalfWidthRight}"></div> -->
      </div>
      <div class="footer" ref="bottomObj">
        <div class="footer-box">
          <div class="box-top">
            <div class="box-top-left">
              <div class="contact">联系我们</div>
              <div class="top-left-box">
                <div class="top-left-box-item">地址：安徽省合肥市蜀山区大龙山路与燕子河路交口北50米合肥先进计算中心</div>
                <div class="top-left-box-item">电话：0551-65909055</div>
                <div class="top-left-box-item">邮箱：bigdatahefei-co@bigdatahefei.com</div>
              </div>
              <!-- <div class="contact-way">
                <img src="../assets/images/weixin.png" alt="">
                <img src="../assets/images/weibo.png" alt="">
                <img src="../assets/images/tuite.png" alt="">
              </div> -->
            </div>
            <!-- <div class="box-top-right">
              <div class="box-top-right-top">
                网站地图
              </div>
              <div class="box-top-right-bottom">
                <div class="box-top-right-bottom-item">
                  <div class="contact" @click="changeMenu('/index')">首页</div>
                </div>
                <div class="box-top-right-bottom-item">
                  <div class="contact" @click="changeMenu('/center')">中心介绍</div>
                </div>
                <div class="box-top-right-bottom-item">
                  <div class="contact" @click="changeMenu('/news')">新闻动态</div>
                </div>
                <div class="box-top-right-bottom-item">
                  <div class="contact" @click="changeMenu('/resource')">算力资源</div>
                </div>
                <div class="box-top-right-bottom-item" v-for="item in platform" :key="item.id">
                  <div class="contact"  @click="goLink(item.linkUrl)">{{item.linkName}}</div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="box-middle">
            <div class="box-middle-left">
              友情链接
              <div class="line"></div>
            </div>
            <div class="box-middle-right">
              <div class="box-middle-item" v-for="item in bottomLinkList" :key="item.id" @click="goLink(item.linkUrl)">
                  {{item.linkName}}
              </div>
            </div>
          </div>
          <div class="box-bottom">
            <div class="box-bottom-left">
              <div class="box-bottom-left-left" @click="goLink('https://beian.miit.gov.cn/')" v-if="websiteDetail&&websiteDetail.icpNumber">{{websiteDetail.icpNumber}}</div>
              <div class="box-bottom-left-right" v-if="websiteDetail&&websiteDetail.psNumber">{{websiteDetail.psNumber}}</div>
            </div>
            <div class="box-bottom-right"></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { repairPointPage,moduleList,restTypePage,storyTypePage,websiteNumber } from "../api/management.js";
export default {
    computed: {
      key() {
          return this.$route.path + Math.random()
      },
    },
    watch: {
        $route(to,from){
            this.changeNavStyle(to.path)
            if(from.path==='/searchResult' && to.path!==from.path) {
                this.searchText = ''
            }
        }
    },
    data() {
        return {
          indexActive:false,
          centerActive:false,
          newsActive:false,
          resourceActive:false,
          educationActive:false,
          reservationActive:false,
          searchText: this.$store.state.searchText ? this.$store.state.searchText:'',
          menuList:[
            {
              id:1,
              name:'首页',
              path:'/index'
            },
            {
              id:2,
              name:'中心介绍',
              path:'/center'
            },
            {
              id:3,
              name:'新闻动态',
              path:'/news'
            },
            {
              id:4,
              name:'算力资源',
              path:'/resource'
            },
            {
              id:5,
              name:'科普教育',
              path:'/education'
            },
            {
              id:6,
              name:'我要预约',
              path:'/reservation'
            },
            {
              id:7,
              name:'双创平台',
            },
          ],
          bottomMenu:[],
          centerList:[],
          // 平台
          platform:[],
          // bottomObj:null,
          bottomHalfWidthLeft:'',
          bottomHalfWidthRight:'',
          bottomLinkList:[],
          // 科普教育分类
          eduCategory:[],
          // 新闻分类
          newsCategory:[],
          websiteDetail:{}
        }
    },
    methods: {
      changeMenu(item) {
        if(item!=='/education'||item!=='/educationDetail') {
          this.$store.commit("changeEduActiveId",'')
        }
        if(item!=='/news'||item!=='/newsDetail') {
          this.$store.commit("changeNewActiveId",'')
        }
        this.searchText = ''
        this.$router.push(item);
        this.changeNavStyle(item)
      },
      goLink(url) {
        window.open(url)
      },
      // 去新闻页
      goNew(item) {
        this.$router.push({path:'/news',query:{id:item.id}})
        this.changeNavStyle('/news')
        this.$store.commit("changeNewActiveId",item.id)
      },
      // 去科普教育
      goEdu(item) {
        this.$router.push({path:'/education',query:{id:item.id}})
        this.changeNavStyle('/education')
        this.$store.commit("changeEduActiveId",item.id)
      },
      // 去中心介绍模块
      goCenterModule(item) {
        // 特殊字符处理
        let items = encodeURIComponent(item.alias)
        let path = '/center#'+items
        this.$router.push(path)
        this.changeNavStyle(path)
      },

      keyUpEnter() {
        this.searchButton()
      },
      searchButton() {
        if(!this.searchText) {
          return this.$message.error('请輸入蒐索内容')
        } 
        this.$store.commit("changeSearchText",this.searchText)
        this.$router.push({path:'/searchResult',query:{searchText:this.searchText}})
      },
      changeNavStyle(url){
          switch (url) {
              case "/index":
                      this.indexActive=true
                      this.centerActive=false
                      this.newsActive=false
                      this.resourceActive=false
                      this.educationActive=false
                      this.reservationActive=false
                  break;
              case "/center":
                      this.indexActive=false
                      this.centerActive=true
                      this.newsActive=false
                      this.resourceActive=false
                      this.educationActive=false
                      this.reservationActive=false
                  break;
              case "/news":
              case "/newsDetail":
                      this.indexActive=false
                      this.centerActive=false
                      this.newsActive=true
                      this.resourceActive=false
                      this.educationActive=false
                      this.reservationActive=false
                  break;
              case "/resource":
                      this.indexActive=false
                      this.centerActive=false
                      this.newsActive=false
                      this.resourceActive=true
                      this.educationActive=false
                      this.reservationActive=false
                  break;
              case "/education":
              case "/educationDetail":
                      this.indexActive=false
                      this.centerActive=false
                      this.newsActive=false
                      this.resourceActive=false
                      this.educationActive=true
                      this.reservationActive=false
                  break;
              default:
                      this.indexActive=false
                      this.centerActive=false
                      this.newsActive=false
                      this.resourceActive=false
                      this.educationActive=false
                      this.reservationActive=true
          }
      },
      initDropDown() {
        $('.centerItem').hover(
          function() {
            // 鼠标移入元素
            $('.centerMenu').stop().fadeIn(); // 淡入显示元素
            // 图片旋转180度
            $(this).find('.more').find('i').css('transform', 'rotate(180deg)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          },
          function() {
            // 鼠标移出元素
            $('.centerMenu').stop().fadeOut(); // 淡出隐藏元素
            // 图片旋转-180度
            $(this).find('.more').find('i').css('transform', 'rotate(0)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          }
        );
        $('.newItem').hover(
          function() {
            // 鼠标移入元素
            $('.NewMenu').stop().fadeIn(); // 淡入显示元素
            // 图片旋转180度
            $(this).find('.more').find('i').css('transform', 'rotate(180deg)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          },
          function() {
            // 鼠标移出元素
            $('.NewMenu').stop().fadeOut(); // 淡出隐藏元素
            // 图片旋转-180度
            $(this).find('.more').find('i').css('transform', 'rotate(0)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          }
        );
        $('.eduItem').hover(
          function() {
            // 鼠标移入元素
            $('.eduMenu').stop().fadeIn(); // 淡入显示元素
            // 图片旋转180度
            $(this).find('.more').find('i').css('transform', 'rotate(180deg)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          },
          function() {
            // 鼠标移出元素
            $('.eduMenu').stop().fadeOut(); // 淡出隐藏元素
            // 图片旋转-180度
            $(this).find('.more').find('i').css('transform', 'rotate(0)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          }
        );
        $('.moreItem').hover(
          function() {
            // 鼠标移入元素
            $('.bookMenu').stop().fadeIn(); // 淡入显示元素
            // 图片旋转180度
            $(this).find('.more').find('i').css('transform', 'rotate(180deg)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          },
          function() {
            // 鼠标移出元素
            $('.bookMenu').stop().fadeOut(); // 淡出隐藏元素
            // 图片旋转-180度
            $(this).find('.more').find('i').css('transform', 'rotate(0)');
            $(this).find('.more').find('i').css('transition', '0.3s ease all');
          }
        );
      },
      getBottomObj() {
        this.resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            const width = entry.contentRect.width;
            this.bottomHalfWidthLeft = width / 2  + 'px' + ' solid #0050f4'
            this.bottomHalfWidthRight = width / 2  + 'px' + ' solid #091227'
          }
        });
        this.resizeObserver.observe(this.$refs.bottomObj);
      },
      // 底部链接
      async repairPointPage() {
        const res = await repairPointPage(
          {
            current:1,
            size:-1
          }
        )
        if(res.code==1) {
          if(res.data.records.length>0) {
            res.data.records.forEach(item => {
              if(item.type==1) {
                this.bottomLinkList.push(item)
              } else {
                this.platform.push(item)
              }
            });
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
              if(res.data.length>0) {
                res.data.forEach(item=>{
                  this.centerList.push(
                    {
                      id:item.id,
                      name:item.name,
                      alias:item.alias,
                    }
                  )
                })
              }
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
          this.eduCategory = res.data.records
        }
      },
      // 新闻分类
      async getStoryTypePage() {
        const res = await storyTypePage(
          {
            current:1,
            pageSize:-1,
            flag:1,
          }
        )
        if(res.code==1) {
          this.newsCategory = res.data.records
        }
      },
      async getWebsiteNumber() {
        const res = await websiteNumber()
        if(res.code==1) {
          this.websiteDetail = res.data
        }
      }
    },
    created() {
      this.changeNavStyle(this.$route.path);
      this.repairPointPage()
      this.getModuleList()
      this.getRestTypePage()
      this.getStoryTypePage()
      this.getWebsiteNumber()
    },
    //消除keep-alive数据缓存
    activated(){
        document.title=this.$route.meta.title
        this.changeNavStyle(this.$route.path);
    },
    mounted() {
      this.initDropDown();
      this.getBottomObj();
    },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  position: relative;
  // font-family: 'SourceHan_Sans_SC_VF';
  .top {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    color: #FFFFFF;
    height: 78px;
    padding: 0 0.1rem;
    // 从左到右渐变
    // background: linear-gradient(to right, #161e30, #152342);
    background: #FFFFFF;
    display: flex;
    align-items: center;
    // border: 1px solid #39435c;
    // position: relative;
    // 下边灰色阴影
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    .top-left {
      display: flex;
      align-items: center;
      margin-right: 0.1rem;
      cursor: pointer;
      // font-size: 22px;
      // font-weight: bold;
      // margin-right: 0.3rem;
      // display: flex;
      // align-items: center;
      // color: #1d305b;
      // img {
      //   width: 35px;
      //   margin-right: 10px;
      // }
      .top-left-left {
        display: flex;
        align-items: center;
        img {
          width: 234px;
          margin-right: 12px;
        }
      }
      .top-left-right {
        width: 1.3rem;
        .top-left-right-top {
          .top-left-right-top-top {
            width: 100%;
            color: #0a4592;
            // text-align-last: justify;
            font-size: 16px;
            // font-weight: 600;
            // margin-bottom: -6px;
            // 文字纵向缩小
            // transform: scaleY(0.8);
          }
          .top-left-right-top-bottom {
            width: 100%;

            color: #1c4681;
            font-size: 9px;
            // text-align-last: justify;
            // font-weight: 600;
          }
        }
        // .top-left-right-bottom{
        //   color: #0042a1;
        //   text-align-last: justify;
        //   // font-weight: 600;
        //   font-size: 14px;
        //   // transform: scaleY(0.8);
        // }
      }
    }
    .top-middle {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 17px;
      .menuItem{
        color: #1D305B;
        display: flex;
        align-items: center;
        height:100%;
        padding: 0 .061rem;
        margin-right: .1rem;
        cursor: pointer;
        position: relative;
        .act_btn{
          display: flex;
          padding: 10px 20px;
          flex-wrap: nowrap;
          // background: #0053e5;
          // color: #ffffff;
          // border-radius: 10px;
        }
        .line {
          width: 100%;
          position: absolute;
          bottom: -2px;
          left: 0;
          border-bottom: 4px solid transparent;
        }
        .subMenu {
          width: 120px;
          position: absolute;
          top:78px;
          left: 0;
          z-index: 999;
          background-color: #ffffff;
          border: 1px solid #cccccc;
          border-radius: 2px;
          padding: 0.02rem 0;
          font-size: 14px;
          .subMenuItem {
            padding: 8px 0;
            padding-left: 15px;
            color: #1f1f1f;
          }
        }
      }
      .menuItem:hover {
        color: #1D305B;
      }
      .moreItem {
        display: flex;
        justify-content: center;
        align-items: center;
        .active{
          padding: 0.038rem 0.076rem;
        }
        .more {
          margin-left:8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .active {
        position: relative;
        color: #1D305B;
        .act_btn{
          display: flex;
          flex-wrap: nowrap;
          padding: 0.038rem 0.076rem;
          background: #0053e5;
          color: #ffffff;
          border-radius: 10px;
        }
        .line {
          transition: 0.5s ease all;
          border-bottom: 4px solid #0053e5;
        }
      }
    }
    .top-right {
      height: 100%;
      position: absolute;
      right: 0.24rem;
      top: 0;
      display: flex;
      align-items: center;
      :deep .el-input {
          display: flex;
          justify-content: center;
          // width: 340px;
          width: 1.32rem;
          .el-input__inner {
            width: 1.32rem;
            // width: 340px;
            -webkit-appearance: none;
            background-color: #2d3955;
            border-top-left-radius: 4px;
            border-bottom-left-radius:4px ;
            border: none;
            box-sizing: border-box;
            color: #FFFFFF;
            display: inline-block;
            font-size: 16px;
            height: 34px!important;
            line-height: 34px!important;
            outline: 0;
            padding: 0 35px 0 20px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          }
          input::-webkit-input-placeholder{
            -webkit-text-fill-color: #989ca6;
          }
        }
        .search_button {
          height: 65px;
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          img {
            width: 25px;
          }
        }
    }
  }
  .content {
    width: 100%;
    padding-top:78px;
    min-height: 1000px;
    position: relative;
    /* 页面切换动画 */
    .fade-transform-leave-active,
    .fade-transform-enter-active {
      transition: all .1s;
    }
    .fade-transform-enter {
      opacity: 1;
      transform: translateX(0px);
    }
    .fade-transform-leave-to {
      opacity: 1;
      transform: translateX(0px);
    }
    .footer_top {
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 17.5px solid transparent;
      border-bottom: 17.5px solid #091227;
    }
  }
  
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    // height: 335px;
    width: 100%;
    background: #22262e;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    // color: #6e7077;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    .footer-box {
      // height: 365px;
      width: 100%;
      max-width: 1200px;
      // background-color: #091227;
      .box-top {
        width: 100%;
        // padding: 0.085rem 0.1rem 0.06rem 0.1rem;
        padding: 21px 25px 15px;
        font-size: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        .box-top-left {
          position: relative;
          width: 50%;
          // border-right:1px solid #364059;
          .contact {
            font-size: 30px;
            margin-bottom: 34px;
          }
          .top-left-box {
            .top-left-box-item {
              margin-bottom: 13px;
            }
          }
          .contact-way {
            width: 60%;
            padding-top: 0.01rem;
            img {
              width: 33px;
              margin-right: 25px;
            }
          }
        }
        .box-top-right {
          width: 50%;
          padding: 0 50px;
          .box-top-right-top {
            font-size: 16px;
            color: #a5a7ac;
            margin-bottom: 34px;
          }
          .box-top-right-bottom {
            height: calc(100% - 56px);
            display: flex;
            flex-wrap: wrap;
            .box-top-right-bottom-item {
              display: flex;
              width: 50%;
              .contact {
                color: #6e7077;
                font-size: 16px;
                // margin-bottom: 34px;
                cursor: pointer;
              }
              .contact:hover {
                color: #a5a7ac;
              }
            }
          }
        }
      }
      .box-middle {
        width: 100%;
        font-size: 16px;
        // padding: 0.115rem 0.08rem;
        padding: 30px 20px;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.8);
        .box-middle-left {
          width: 140px;
          font-size: 24px;
          position: relative;
          .line {
            position: absolute;
            height: 100%;
            border-right: 1px solid rgba(255, 255, 255, 0.8);
            top: 2%;
            right: 20px;
          }
        }
        .box-middle-right {
          width: calc(100% - 150px);
          // 超出以横向滚动条
          // overflow-x: auto;
          display: flex;
          flex-wrap: wrap;
          .box-middle-item{
            // 不换行
            font-size: 14px;
            white-space: nowrap;
            cursor: pointer;
            margin-right: 50px;
            line-height: 30px;
          }
          .box-middle-item:last-child {
            margin-right: 0;
          }
          .box-middle-item:hover {
            color: #a5a7ac;
          }
        }
        // /* 滚动条样式 */
        // .box-middle-right::-webkit-scrollbar {
        //   width: 4px; /*  设置纵轴（y轴）轴滚动条 */
        //   height: 4px; /*  设置横轴（x轴）轴滚动条 */
        // }
        // /* 滚动条滑块（里面小方块） */
        // .box-middle-right::-webkit-scrollbar-thumb {
        //   border-radius: 10px;
        //   box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        //   background: #eeeeee;
        // }
        // /* 滚动条轨道 */
        // .box-middle-right::-webkit-scrollbar-track {
        //   border-radius: 0;
        //   box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        //   background: #434343;
        // }
      }
      .box-bottom {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #6e7077;
        // padding: 0.064rem 0.15rem;
        padding: 18px 37px;
        font-size: 14px;
        .box-bottom-left {
          display: flex;
          align-items: center;
          .box-bottom-left-left{
            cursor: pointer;
            margin-right: 38px;
          }
        }
      }
    }
  }
}
</style>