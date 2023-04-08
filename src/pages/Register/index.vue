<template>
  <div class="all">
    <div class="zhuce">
      <h3>
        <span>注册</span>
      </h3>
    </div>

    <div class="form">
      <form action="" method="post">
        <!-- <div class="name">
          <input placeholder="昵称" id="demo" />
          <span></span>
        </div> -->
        <div class="password">
          <input type="password" placeholder="密码 （6-16个字符组成区分大小写）" v-model="password"/>
        </div>
        <div class="password">
          <input type="password" placeholder="确认密码" v-model="password1"/>
        </div>        

        <div class="phone">
          <div class="nation">
            <select>
              <option selected="selected">中国大陆</option>
              <option>中国香港</option>
              <option>台湾</option>
              <option>美国</option>
            </select>
          </div>
          <div class="number">
            <input placeholder="填写常用手机号" v-model="phone"/>
          </div>
        </div>

        <div class="check">
          <div class="text">
            <input placeholder="请输入短信验证码" v-model="code"/>
          </div>
          <button type="button" @click="getCode">点击获取</button>
        </div>

        <div class="buttom">
          <input type="checkbox" name="agree"  :checked="agree" />
          我已同意
          <a
            href="https://www.bilibili.com/protocal/licence.html?spm_id_from=333.1007.0.0"
            >《哔哩哔哩弹幕网使用协议》</a
          >
          和<a
            href="https://www.bilibili.com/blackboard/privacy-pc.html?spm_id_from=333.1007.0.0"
            >《哔哩哔哩隐私政策》</a
          >
        </div>

        <div class="last">
          <button type="button" id="mybtn" @click="userRegister">注册</button>
        </div>

        <div class="otherway">
          <a href="https://www.bilibili.com/">已有账号，直接登录></a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  
  data() {
    
    return {
      phone: "",//电话
      code: "",//验证码
    //   密码
    password:"",
    password1:"",
    // 是否同意
    agree:true,
    };
    
  },
  methods: {
   async getCode(){
    try {
         const {phone} =this
       phone && await this.$store.dispatch('user/getCode',phone)
       this.code=this.$store.state.user.code;
    } catch (error) {
        
    }
       
    },
    // 注册登录
    userRegister(){
        try {
             const {phone,code,password,password1}=this;

        (phone&&code&&password==password1) &&this.$store.dispatch("user/userRegister",{phone,code,password})
        &&this.$router.push("/login");
        } catch (error) {
            alert(error.message)
            
        }
       
    }
  },
};
</script>
<style>
/* 把我们所有标签的内外边距清零 */
* {
  margin: 0;
  padding: 0;
  /* css3盒子模型 */
  box-sizing: border-box;
}
/* em 和 i 斜体的文字不倾斜 */
em,
i {
  font-style: normal;
}
/* 去掉li 的小圆点 */
li {
  list-style: none;
}

img {
  /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当我们鼠标经过button 按钮的时候，鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #c81623;
}

button,
input {
  /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53",
    sans-serif;
  /* 默认有灰色边框我们需要手动去掉 */
  border: 0;
  outline: none;
}

body {
  /* CSS3 抗锯齿形 让文字显示的更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53",
    sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}
/* 清除浮动 */
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}
.all {
  margin: 0 auto;
  width: 1020px;
  height: 550px;
}
input {
  padding-left: 10px;
  vertical-align: middle;
}
button {
  vertical-align: middle;
}
.all a {
  color: #00a1d6;
}
.zhuce h3 {
  text-align: center;
  font-size: 38px;
  color: black;
  border-bottom: 1px solid #dddddd;
  height: 28px;
  margin-bottom: 60px;
}

.zhuce h3 span {
  padding: 0 20px;
  background-color: #ffffff;
}
.form {
  margin: 0 auto;
  width: 350px;
  height: 5500px;
}
.name,
.password {
  margin-top: 20px auto;
  margin-bottom: 30px;
}
.name input,
.password input {
  border: 1px solid #edeff3;
  width: 350px;
  height: 35px;
}
.form {
  margin: 20px auto;
}
.phone {
  width: 350px;
  height: 35px;
  border: 1px solid #edeff3;
  margin: 30 auto;
}
.phone .nation {
  width: 110px;
  height: 35px;
  float: left;
}
.phone .number {
  width: 238px;
  height: 35px;
  float: left;
}
.nation select {
  width: 110px;
  height: 33px;
  color: #757575;
  border: none;
  border-right: 1px solid #edeff3;
}
.number input {
  width: 238px;
  height: 33px;
}
.check {
  margin-top: 30px;
  width: 350px;
  height: 35px;
  border: 1px solid #edeff3;
}
.check .text {
  width: 238px;
  float: left;
}
.check input {
  width: 200px;
  height: 33px;
}
.check button {
  height: 33px;
  width: 110px;
  float: left;
  background-color: #00a1d6;
  border-radius: 8px;
  color: #f5f4f4;
}
.buttom {
  width: 350px;
  height: 35px;
  margin-top: 10px;
}
.last button {
  width: 350px;
  height: 35px;
  background-color: #f5f5f5;
}
.otherway {
  width: 350px;
  height: 35px;
  margin-top: 10px;
}
.otherway a {
  float: right;
}
</style>
