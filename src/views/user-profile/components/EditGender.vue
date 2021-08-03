<template>
  <div class="edit-gender-container">
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
      :default-index="value"
      title="性别"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { updateUserProfile } from '@/api/user'

export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      showPicker: false
    }
  },
  methods: {
    async onConfirm (value, index) {
      Toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      await updateUserProfile({
        gender: index
      })
      this.$emit('close')
      this.$emit('input', index)
      Toast.success('保存成功')
    },
    onCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
