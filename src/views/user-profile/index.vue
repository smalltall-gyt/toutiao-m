<template>
  <div class="user-profile-container">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      class="nav-bar"
    />
    <van-cell-group v-if="userProfile">
      <input
        type="file"
        hidden ref="file"
        accept="image/*"
        @change="handleFileChange"
      >
      <van-cell title="头像" is-link class="avatar-cell" @click="selectFile">
        <van-image
          round
          :src="userProfile.photo"
          fit="cover"
          class="avatar"
        />
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="userProfile.name"
        @click="isEditNameShow = true"
      />
      <van-cell
        title="性别"
        is-link
        :value="userProfile.gender === 0 ? '男' : '女'"
        @click="isEditGenderShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="userProfile.birthday"
        @click="isEditBirthdayShow = true"
      />
    </van-cell-group>
    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
      v-if="userProfile"
    >
      <EditName
        @closeEditNamePopup="isEditNameShow = false"
        v-model="userProfile.name"
        v-if="isEditNameShow"
      />
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
      class="gender-popup"
    >
      <EditGender
        @close="isEditGenderShow = false"
        v-model="userProfile.gender"
        v-if="isEditGenderShow"
      />
    </van-popup>
    <!-- 修改生日弹出层 -->
     <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
      class="birthday-popup"
    >
      <EditBirthday
        @close="isEditBirthdayShow = false"
        v-if="isEditBirthdayShow"
        v-model="userProfile.birthday"
      />
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup
      v-model="isEditAvatarShow"
      position="bottom"
      :style="{height: '100%'}"
      class="avatar-popup"
    >
      <EditAvatar
        :previewImage="imageBlob"
        :file="fileObj"
        @close="isEditAvatarShow = false"
        @update-avatar="userProfile.photo = $event"
        v-if="isEditAvatarShow"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import EditName from './components/EditName'
import EditGender from './components/EditGender'
import EditBirthday from './components/EditBirthday'
import EditAvatar from './components/EditAvatar'

export default {
  components: {
    EditName,
    EditGender,
    EditBirthday,
    EditAvatar
  },
  created () {
    this.loadUserProfile()
  },
  data () {
    return {
      userProfile: {},
      isEditNameShow: false, // 修改昵称的弹出框状态
      isEditGenderShow: false, // 修改性别的弹出框状态
      isEditBirthdayShow: false, // 修改生日的弹出层状态
      isEditAvatarShow: false, // 修改用户头像弹出层状态
      imageBlob: null, // 预览图片内容
      fileObj: null // 选择的文件对象
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 加载用户个人信息
    async loadUserProfile () {
      const res = await getUserProfile()
      console.log(res)
      this.userProfile = res.data
    },
    // 点击头像选择文件
    selectFile () {
      const { file } = this.$refs
      file.click()
    },
    // 选择图片时
    handleFileChange () {
      const { file } = this.$refs
      const blob = window.URL.createObjectURL(file.files[0])
      this.fileObj = file.files[0]
      this.imageBlob = blob
      this.isEditAvatarShow = true
      file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
  .user-profile-container {
    .nav-bar {
      background-color: #3296fa;
      /deep/ .van-nav-bar__title {
        color: #fff;
      }
      /deep/ .van-icon {
        color: #fff;
      }
    }
    .avatar-cell {
      align-items: center;
      .avatar {
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
  .gender-popup,
  .birthday-popup {
    height: 308px;
  }
  .avatar-popup {
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
