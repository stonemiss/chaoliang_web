import Vue from 'vue'
import debounce from 'throttle-debounce/debounce'
import { Tooltip } from 'element-ui'
Vue.use(Tooltip)
 
/**
 * 指令功能：元素内容溢出隐藏时悬浮tooltip展示详细内容，元素内容未溢出时不展示
 * 基于element-table的show-overflow-tooltip原理与el-tooltip的功能实现
 * 使用方式：
 *   <div v-overflow-tooltip>这是一段会溢出的文本内容</div>
 *
 * 指令也可传递参数，参数内容为el-tooltip的参数配置：
 *   <div v-overflow-tooltip="{content:'啦啦啦啦~~~'}">这是一段会溢出的文本内容</div>
 * */
 
/**
 * tooltipVM —— el-tooltip的VNode实例
 * tooltipContent —— 默认提示文本内容
 * props —— el-tooltip的配置参数
 * ctx —— 命名空间
 * activateTooltip —— el-tooltip展开的防抖延迟，默认50ms
 * */
let tooltipContent
let props
const ctx = '@@store'
// 创建一个Vue实例并渲染为真实DOM,内有一个空的el-tooltip组件
const vm = new Vue({
  render (h) {
    return (<Tooltip ref="customToolTipRef" content={ tooltipContent } { ...{ props } }></Tooltip>)
  }
}).$mount()
const tooltipVM = vm.$refs.customToolTipRef
const activateTooltip = debounce(50, tooltipVM => tooltipVM.handleShowPopper())
 
const overflowHandler = (el, binding, vnode) => {
  // 获取元素文本内容，作为el-tooltip的默认content进行展示
  el[ctx].tooltipContent = el.innerText || el.textContent
  // 获取通过指令接收的绑定值
  el[ctx].props = { ...binding.value }
  const computedStyle = getComputedStyle(el)
  // 使用range对象判断文本是否有溢出，优先考虑使用range对象， 因为 scrollWidth 属性在火狐浏览器 v32 版本中有 bug。当元素的 CSS 属性中使用了 text-overflow: ellipsis 和 box-sizing: border-box 时获取到的 scrollWidth 的值会比真实值偏小
  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)
  const rangeDOM = range.getBoundingClientRect()
  const padding = parseInt(computedStyle.paddingLeft.replace('px', '')) + parseInt(computedStyle.paddingRight.replace('px', ''))
  const rangeWidth = Math.round(rangeDOM.width)
 
  if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
    // 文本溢出了，绑定鼠标事件
    el.addEventListener('mouseenter', el[ctx].handleMouseEnter)
    el.addEventListener('mouseleave', el[ctx].handleMouseLeave)
  } else {
    // 文本未溢出，移除鼠标事件
    el.removeEventListener('mouseenter', el[ctx].handleMouseEnter)
    el.removeEventListener('mouseleave', el[ctx].handleMouseLeave)
  }
}
 
Vue.directive('overflowTooltip', {
  // 只调用一次，指令第一次绑定到元素时调用。在这里进行一次初始化设置，初始化鼠标事件，控制el-tooltip的展开与收起
  bind: function (el, binding, vnode) {
    el[ctx] = {
      tooltipContent: '',
      props: {},
      handleMouseEnter: () => {
        // 展开el-tooltip方法，将el-tooltip的引用元素指向当前绑定节点，然后执行展开逻辑
        tooltipContent = el[ctx].tooltipContent
        props = el[ctx].props
        vm.$forceUpdate()
        tooltipVM.referenceElm = el
        tooltipVM.$refs.popper && (tooltipVM.$refs.popper.style.display = 'none')
        tooltipVM.doDestroy()
        tooltipVM.setExpectedState(true)
        activateTooltip(tooltipVM)
      },
      handleMouseLeave: () => {
        // 关闭el-tooltip方法，销毁内部popperJS的实例后走关闭逻辑
        tooltipVM.doDestroy()
        tooltipVM.setExpectedState(false)
        tooltipVM.handleClosePopper()
      }
    }
  },
  inserted: overflowHandler,
  componentUpdated: overflowHandler,
  unbind (el) {
    delete el[ctx]
  }
})