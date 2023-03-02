<script lang="ts">
export default {
  name: 'KindTip',
}
</script>
<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { TipOptions } from '@/enum'
import { onMounted, reactive } from 'vue'

interface Props {
  tipOptions: TipOptions
}

interface State {
  showContent: string[]
  btnStatus: boolean
  isShowBtn: boolean
}

const props = defineProps<Props>()
const state = reactive<State>({
  showContent: [],
  btnStatus: false,
  isShowBtn: false,
})

// 展开
const downOut = () => {
  state.showContent = props.tipOptions.content
  state.btnStatus = true
}

// 收起
const upOut = () => {
  state.showContent = props.tipOptions.content.slice(0, props.tipOptions.defaultShowNum)
  state.btnStatus = false
}

onMounted(() => {
  // 初始化 如果不展示所有并且给的数值大于等于content长度，都不展示按钮
  const {
    tipOptions: { isNotAllShow, defaultShowNum, content },
  } = props
  const status = (isNotAllShow ?? false) && (defaultShowNum ?? 0) < (content ?? []).length
  state.isShowBtn = status
  if (status) {
    state.showContent = content.slice(0, defaultShowNum)
    return
  }
  state.showContent = [...content]
})
</script>

<template>
  <div class="kind_tip" v-if="state.showContent">
    <div class="tip_icon_title">
      <div class="tip_top">
        <Icon type="cm-tishi1" class="icon"></Icon>
        <span v-if="tipOptions.title">{{ tipOptions.title }}</span>
        <span v-else>温馨提示：</span>
      </div>
      <div v-if="state.isShowBtn">
        <a-button shape="round" class="kind_btn" size="small" @click="downOut" v-if="!state.btnStatus">
          展开<down-outlined />
        </a-button>
        <a-button shape="round" class="kind_btn" size="small" @click="upOut" v-if="state.btnStatus">
          收起<up-outlined />
        </a-button>
      </div>
    </div>
    <transition-group name="tip" tag="ol">
      <li v-for="(tip, idx) in state.showContent" :key="idx">
        {{ tip }}
      </li>
    </transition-group>
  </div>
</template>

<style lang="less" scoped>
ol {
  margin-bottom: 0 !important;
}
.tip-enter-active,
.tip-leave-active {
  transition: opacity 0.3s ease;
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
}

.tip_info {
  color: #db7c22;
  margin-bottom: 0 !important;
  li {
    margin-bottom: 4px;
  }
}
.tip_icon_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #db7c22;

  .kind_btn {
    border: 1px solid #ffbb76;
    color: #db7c22;
  }

  .tip_top {
    height: 22px;
    display: flex;
    align-items: center;
  }
}
.icon {
  font-size: 18px;
  margin-right: 10px;
}
.kind_tip {
  border: 1px solid #ffbb76;
  border-radius: 5px;
  padding: 15px 25px;
  background-color: #fffcef;
  margin: 0 0 15px 0;
}
</style>
