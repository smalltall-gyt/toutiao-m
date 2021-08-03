<template>
  <div class="edit-avatar-container">
    <img :src="previewImage" alt="" ref="image" class="image">
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { updateAvatar } from '@/api/user'
import { Toast } from 'vant'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  props: {
    previewImage: {
      type: String,
      required: true
    },
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    const { image } = this.$refs
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // 裁切框是否可以拖动
      cropBoxMovable: false,
      // 裁切框是否可以改变大小
      cropBoxResizable: false,
      background: false,
      // 图片是否可以移动
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    onClickLeft () {
      this.$emit('close')
    },
    async onClickRight () {
      Toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      console.log(file)
      const formData = new FormData()
      formData.append('photo', file)
      await updateAvatar(formData)
      this.$emit('close')
      this.$emit('update-avatar', window.URL.createObjectURL(file))
      Toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-avatar-container {
    .van-nav-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: transparent;
    }
    .image {
      display: block;
      max-width: 100%;
      object-fit: cover;
    }
  }

</style>
