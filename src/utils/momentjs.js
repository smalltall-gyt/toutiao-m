import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
Vue.filter('formatRelativeTime', value => dayjs(value).from(dayjs()))
