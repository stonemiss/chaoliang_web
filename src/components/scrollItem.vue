<template>
  <div class="listScroll" ref="box">
    <slot></slot>
    <slot v-if="length > 8"></slot>
  </div>
</template>
 
<script>
export default {
  name: "listScroll",
  created() {
  },
  mounted() {
    //在盒子内容高度小于可视高度时不滚动
    if (this.boxHeight < this.ele0.clientHeight) {
      this.start(this.height);
      this.setEvet();
    } else {
      this.isScroll = false;
    }
  },
  props: {
    speed: {
      default: 1,
      type: Number,
    },
    length:{
        default: 2,
        type: Number,
    }
  },
  computed: {
    //第一个slot
    ele0() {
      return this.$refs.box.children[0];
    },
    //第二个slot
    ele1() {
      return this.$refs.box.children[1];
    },
    //盒子的可视高度
    boxHeight() {
      return this.$refs.box.clientHeight;
    },
  },
  data() {
    return {
      height: 0,
      isScroll: true,
    };
  },
  methods: {
    //鼠标移入停止滚动 移出继续滚动
    setEvet() {
      this.$refs.box.onmouseenter = () => {
        this.isScroll = false;
        // this.height = 0;
      };
      this.$refs.box.onmouseleave = () => {
        this.isScroll = true;
        this.$nextTick(() => {
          this.start(this.height);
        });
      };
    },
    //滚动方法
    start(height) {
      this.ele0.style = `transform:translateY(-${height}px);`;
      this.ele1.style = `height:${this.boxHeight}px;transform:translateY(-${height}px);overflow: hidden;`;
      if (height >= this.ele0.clientHeight) {
        this.height = 0;
      } else {
        this.height += this.speed;
      }
      if (!this.isScroll) return;
      window.requestAnimationFrame(() => {
        this.start(this.height);
      });
    },
  },
};
</script>
 
<style lang="scss" scoped>
.listScroll {
  overflow: hidden;
}
.hover {
  overflow-y: auto;
}
.hide {
  display: none;
}
</style>