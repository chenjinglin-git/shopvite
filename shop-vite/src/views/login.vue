<template>
  <el-row class="container">
    <el-col :lg="16" :md="12" class="container-left">
      <div>
        <div class="left-title">欢迎光临</div>
        <div class="left-content">《vite+typescript+elementPlus》商城后台管理系统</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="container-right">
      <h2 class="right-title">欢迎回来</h2>
      <div class="right-content">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" show-password v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-[250px]" round color="#626aef" type="primary" @click="submit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { login } from '../api/user'
import { loginForm } from '../interface/login'
import { ResponseError } from '../interface/response'

const form = reactive<loginForm>({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      min: 5,
      max: 20,
      message: '用户名长度必须大于5且小于20',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      min: 5,
      max: 20,
      message: '密码长度必须大于5且小于20',
      trigger: 'blur'
    }
  ]
})
const formRef = ref<FormInstance>()

const submit = async () => {
  formRef.value?.validate(async (valid, f) => {
    if (!valid) {
      return false
    }
    try {
      const data = await login(form)
      console.log(data)
    } catch (err: any) {
      console.log(err.response.data)
    }
  })
}
</script>

<style lang="less" scoped>
.container {
  @apply bg-indigo-500 min-h-screen;
  .container-left {
    @apply flex items-center justify-center;
    .left-title {
      @apply font-bold text-5xl text-light-50 mb-4;
    }
    .left-content {
      @apply text-gray-200 text-sm;
    }
  }
  .container-right {
    @apply bg-light-50 flex items-center justify-center flex-col;
    .right-title {
      @apply font-bold text-3xl text-gray-800;
    }
    .right-content {
      @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
  }
}
</style>
