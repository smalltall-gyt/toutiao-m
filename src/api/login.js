import axios from './index'

export async function login (data) {
  const res = await axios.post('/app/v1_0/authorizations', data)
  return res
}

export async function getCode (mobile) {
  const res = await axios.get(`/app/v1_0/sms/codes/${mobile}`)
  return res
}
