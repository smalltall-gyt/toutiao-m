<template>
  <div class="edit-birthday-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import { Toast } from 'vant'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    handleCancel () {
      this.$emit('close')
    },
    async handleConfirm (value) {
      Toast.loading({
        message: '保存中...',
        forbidClick: true
      })
      const year = value.getFullYear()
      const month = (value.getMonth() + 1 + '').padStart(2, '0')
      const date = (value.getDate() + '').padStart(2, '0')
      const dateTime = `${year}-${month}-${date}`
      await updateUserProfile({
        birthday: dateTime
      })
      this.$emit('close')
      this.$emit('input', dateTime)
      Toast.success('保存成功')
    }
  }
}
</script>

<style>

</style>
