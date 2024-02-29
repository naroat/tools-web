<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { Md5 } from 'ts-md5'
import 'element-plus/theme-chalk/display.css'
// import router from '@/router';
//visible
const visible = ref(false)
const reSendCount = ref(0)
const reForgetSendCount = ref(0)
//login select: 0 login; 1 reg; 2 forget
const loginSelect = ref(0)
//store
const userStore = useUserStore()
//interface
interface loginFormRule {
  email: string,
  password: string
}

interface registerFormRule {
  email: string,
  code: string,
  password: string,
  password_confirmation: string,
}

interface forgetFormRule {
  email: string,
  code: string,
  password: string,
  password_confirmation: string,
}
//ref
const ruleLoginFormRef = ref<FormInstance>()
const ruleRegisterFormRef = ref<FormInstance>()
const ruleForgetFormRef = ref<FormInstance>()
//login from data
const loginFrom = reactive<loginFormRule>({
  email: '',
  password: ''
})
//register from data
const registerFrom = reactive({
  email: '',
  code: '',
  password: '',
  password_confirmation: '',
})
//forget from data
const forgetFrom = reactive({
  email: '',
  code: '',
  password: '',
  password_confirmation: '',
})

//keep login check
const keepLogin = ref(true)

//显示弹窗
const show = () => {
  visible.value = true
}

//关闭弹窗
const close = () => {
  visible.value = false
}

//发送验证码
const sendCode = async () => {
  try {
    //发送
    await userStore.sendCodeEmail({
      email: registerFrom.email
    })
    //设置倒计时
    reSendCount.value = 180

    const intervalId = setInterval(() => {
      if (reSendCount.value == 0) {
        clearInterval(intervalId)
      } else {
        reSendCount.value--
      }
    }, 1000)
    
    ElMessage.success('发送成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

//忘记密码 - 发送验证码
const sendForgetCode = async () => {
  try {
    //发送
    await userStore.sendForgetCodeEmail({
      email: forgetFrom.email
    })
    //设置倒计时
    reForgetSendCount.value = 180

    const intervalId = setInterval(() => {
      if (reForgetSendCount.value == 0) {
        clearInterval(intervalId)
      } else {
        reForgetSendCount.value--
      }
    }, 1000)
    
    ElMessage.success('发送成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

//登录 - 提交
const loginSubmit = async (formEl: FormInstance|undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      loginSubmitCore()
    } else {
      return false
    }
  })
}

//登录core
const loginSubmitCore = async (isReg: boolean = false) => {
  try {
    //提交
    await userStore.login({
      email: loginFrom.email,
      password: Md5.hashStr(loginFrom.password),
    })
    //登录成功（通过注册调用的登录不用提示文字）
    if (isReg == false) {
      ElMessage.success('登录成功')
    }
    //关闭弹窗
    // close()
    location.reload()
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

//注册 - 提交
const registerSubmit = (formEl: FormInstance|undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      try {
        //提交注册
        await userStore.register({
          email: registerFrom.email,
          code: registerFrom.code,
          password: Md5.hashStr(registerFrom.password),
          password_confirmation: Md5.hashStr(registerFrom.password_confirmation)
        })
        ElMessage.success('注册成功')
        //模拟登录
        loginFrom.email = registerFrom.email
        loginFrom.password = registerFrom.password
        loginSubmitCore(true)
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    } else {
      return false
    }
  })
}

//忘记密码 - 提交
const forgetSubmit = (formEl: FormInstance|undefined) => {
  formEl?.validate(async (valid) => {
    if (valid) {
      try {
        //提交注册
        await userStore.forget({
          email: forgetFrom.email,
          code: forgetFrom.code,
          password: Md5.hashStr(forgetFrom.password),
          password_confirmation: Md5.hashStr(forgetFrom.password_confirmation)
        })
        ElMessage.success('操作成功')
        //模拟登录
        loginFrom.email = forgetFrom.email
        loginFrom.password = forgetFrom.password
        loginSubmitCore(true)
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    } else {
      return false
    }
  })
}

//登录 - 规则验证
const loginRules = reactive<FormRules<loginFormRule>>({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度范围6~20', trigger: 'blur'},
  ]
})


//自定义验证 - 重复密码验证
const confirmPassword = (_rule: any, value: any, callback: any) => {
  if (registerFrom.password !== value) {
    callback(new Error('重复密码不一致'))
  } else {
    callback()
  }
}

//忘记密码 - 自定义验证 - 重复密码验证
const confirmForgetPassword = (_rule: any, value: any, callback: any) => {
  if (forgetFrom.password !== value) {
    callback(new Error('重复密码不一致'))
  } else {
    callback()
  }
}

//注册 - 规则验证
const registerRules = reactive<FormRules<registerFormRule>>({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度范围6~20', trigger: 'blur'},
  ],
  password_confirmation: [
    {required: true, message: '请重复输入密码', trigger: 'blur'},
    {validator: confirmPassword, trigger: 'blur'},
  ]
})

//忘记密码 - 规则验证
const forgetRules = reactive<FormRules<forgetFormRule>>({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '邮箱格式错误', trigger: 'blur' },
  ],
  code: [
    {required: true, message: '请输入验证码', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度范围6~20', trigger: 'blur'},
  ],
  password_confirmation: [
    {required: true, message: '请重复输入密码', trigger: 'blur'},
    {validator: confirmForgetPassword, trigger: 'blur'},
  ]
})

defineExpose({
  show
})
</script>

<template>
  <!-- 登录弹窗 -->
  <el-dialog v-model="visible" title="" width="450" center class="pl-6 pr-6 pb-6" style="border-radius: 1rem">
    <!-- 登录 -->
    <el-form 
      v-if="loginSelect == 0"
      ref="ruleLoginFormRef"
      :model="loginFrom"
      :rules="loginRules"
    >
      <el-divider><div class="text-xl font-normal">邮箱登录</div></el-divider>
      <div>
        <el-form-item prop="email">
          <el-input class="" v-model="loginFrom.email" size="large" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-bottom: 0;">
          <el-input class="" v-model="loginFrom.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>
        <div class="flex items-center mt-1">
          <el-checkbox v-model="keepLogin" label="" size="large" />
          <div class="">保持长时间登录</div>
        </div>
        <el-button class="w-full" type="primary" size="large" @click="loginSubmit(ruleLoginFormRef)">登录</el-button>
        <el-divider border-style="dashed" />
        <div class="flex justify-between">
          <el-button link @click="loginSelect = 1">还没有账号？去注册</el-button>
          <!-- <el-button type="danger">忘记密码</el-button> -->
          <el-button link @click="loginSelect = 2">忘记密码</el-button>
        </div>
      </div>
    </el-form>
    
    <!-- 注册 -->
    <el-form 
      v-if="loginSelect == 1"
      ref="ruleRegisterFormRef"
      :model="registerFrom"
      :rules="registerRules"
    >
      <el-divider><div class="text-xl font-normal">邮箱注册</div></el-divider>
      <div>
        <el-form-item prop="email">
          <el-input class="" v-model="registerFrom.email" size="large" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            v-model="registerFrom.code"
            placeholder="请输入验证码"
            class=""
            size="large"
          >
            <template #append>
              <el-button v-if="reSendCount == 0" @click="sendCode">发送验证码</el-button>
              <el-button v-else>{{reSendCount}}秒后重发</el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input class="" v-model="registerFrom.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>

        <el-form-item prop="password_confirmation">
          <el-input class="" v-model="registerFrom.password_confirmation" size="large" placeholder="请重复输入密码" type="password" show-password></el-input>
        </el-form-item>
        
        <el-button class="w-full" type="primary" size="large" @click="registerSubmit(ruleRegisterFormRef)">注册</el-button>
        <el-divider border-style="dashed" />
        <div class="flex justify-between">
          <el-button link @click="loginSelect = 0">已经有账号？去登录</el-button>
        </div>
      </div>
    </el-form>
    <!-- 忘记密码 -->
    <el-form 
      v-if="loginSelect == 2"
      ref="ruleForgetFormRef"
      :model="forgetFrom"
      :rules="forgetRules"
    >
      <el-divider><div class="text-xl font-normal">忘记密码</div></el-divider>
      <div>
        <el-form-item prop="email">
          <el-input class="" v-model="forgetFrom.email" size="large" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            v-model="forgetFrom.code"
            placeholder="请输入验证码"
            class=""
            size="large"
          >
            <template #append>
              <el-button v-if="reForgetSendCount == 0" @click="sendForgetCode">发送验证码</el-button>
              <el-button v-else>{{reForgetSendCount}}秒后重发</el-button>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input class="" v-model="forgetFrom.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
        </el-form-item>

        <el-form-item prop="password_confirmation">
          <el-input class="" v-model="forgetFrom.password_confirmation" size="large" placeholder="请重复输入密码" type="password" show-password></el-input>
        </el-form-item>
        
        <el-button class="w-full" type="primary" size="large" @click="forgetSubmit(ruleForgetFormRef)">提交</el-button>
        <el-divider border-style="dashed" />
        <div class="flex justify-between">
          <el-button link @click="loginSelect = 0">已经有账号？去登录</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.fold-enter-active {
  transition: all 1s ease-out;
}

.fold-enter-from,
.fold-leave-to {
  transform: translateX(20px);
  opacity: 0;
} 
</style>