<template>
  <el-button :size="size" :type="type"
    :loading="loading"  :disabled="disabled" v-if="hasPerms(perms)"  @click="handleClick">
    {{label}}
  </el-button>
</template>

<script>
//import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtButton',
  props: {
      label: {  // 按钮显示文本
      type: String,
      default: 'Button'
    },
    size: {  // 按钮尺寸
      type: String,
      default: 'medium'
    },
    type: {  // 按钮类型
      type: String,
      default: 'primary'
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
      this.$emit('click', {})
    },
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      if(perms == "true"){
        return true
      }
      else {
        //return hasPermission(perms)
        return true
      }
    }
  },
}
</script>