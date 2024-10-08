<template>
    <div
      v-if="show"
      @mouseover="mouseover"
      @mouseout="mouseout"
      class="box"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div @click="close" class="close_img">
        <div class="close_img_box">
           <img src="../assets/images/close.png" alt="">
        </div>
      </div>
      <div class="content">
        <div class="content_box_left" v-if="detail.type == 1">
            <img :src="url + detail.image.fileUrl" alt="">
        </div>
        <div class="content_box_right" v-if="detail.type == 2">
            <img :src="url + detail.image.fileUrl" alt="">
        </div>
      </div>
    </div>
</template>
<script>
import { surveyPage } from "../api/management";
export default {
  name: 'MoveWindow',
  props: {
    content: {
      default: '友情提示：这是一个飘窗测试，鼠标悬浮停止运动。',
    },
  },
  data() {
    return {
      url:process.env.VUE_APP_WEB_URL,
      detail:{},
      show: false,
      stepX: 1,
      stepY: 1,
      timer: null,
      maxTop: 0,
      maxLeft: 0,
      top: 0,
      left: 0,
    }
  },
  mounted() {
    this.getSurveyPage()
  },
  beforeDestroy() {
    // dom 销毁前清除定时器
    clearInterval(this.timer)
  },
  methods: {
    async getSurveyPage() {
        const res = await surveyPage(
            {
                current:1,
                pageSize:-1,
                flag:1
            }
        )
        if(res.code==1) {
            if(res.data.records.length>0) {
                this.detail = res.data.records[0]
                this.show = true
                this.init()
            }
        }
    },
    init() {
      let height = null
      let width = null
      if(this.detail.type == 1) {
          height = 195
          width = 340
      } else {
          height = 360
          width = 240
      }
      this.maxTop = document.documentElement.clientHeight - height - 25 - 10
      this.maxLeft = document.documentElement.clientWidth - width - 5 - 10
      this.top = 0
      this.left = 0
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.move()
      }, 40)
      this.onresize()
    },
 
    // 移动函数
 
    move() {
      if (this.top >= this.maxTop || this.top < 0) {
        this.stepY = -this.stepY
      }
      if (this.left >= this.maxLeft || this.left < 0) {
        this.stepX = -this.stepX
      }
      this.top += this.stepY
      this.left += this.stepX
    },
 
    mouseover() {
      clearInterval(this.timer)
    },
 
    mouseout() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.move()
      }, 40)
    },
 
    close() {
      clearInterval(this.timer)
      this.show = false
    },
 
    onresize() {
      const that = this
      window.onresize = function () {
        that.init()
      }
    },
  },
  created() {
    // this.getSurveyPage()
  }
}
</script>
<style scoped lang="scss">
.box {
    // width: 200px;
    // height: 150px;
    border-radius: 5px;
    position: fixed;
    padding: 10px;
    color: #ffffff;
    top: 0;
    left: 0;
    z-index: 1000;
    .close_img {
        display: flex;
        flex-direction: row-reverse;
        cursor: pointer;
        .close_img_box {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background-color: #ffffff;
            img {
                width: 20px;
            }
        }
    }
    .content {
        .content_box_left {
            width: 340px;
            height: 195px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .content_box_right {
            width: 240px;
            height: 360px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>