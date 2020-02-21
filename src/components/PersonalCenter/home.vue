<template>
<div class="main">
   
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#545c64" text-color="white" active-text-color="#ffd04b">
   <el-menu-item index="1" @click="$router.go(-1)"><i class="el-icon-s-home"></i>Back to Home</el-menu-item>
   <el-menu-item index="2" style="float:right" @click="$store.dispatch('LogOut()')">Log Out</el-menu-item>
   <el-menu-item index="3" style="float:right" @click="setting()"><i class="el-icon-setting"></i>{{Setting}}</el-menu-item>
  </el-menu>
    <div class="part1">
     <div class="iconhead">
       <i class="el-icon-s-custom"></i>
     </div>
     <div class="message">
         <div>
         <span class="title">HZhuo</span>
         <span class="title">|</span>
         <span class="title">B18031007</span>
         </div>
         <span class="title title2">Academy:School of Computing</span>
         <span class="title title2">Major:Infromation Security</span>
     </div>
     <div class="message">
         
         <span>E-mail:1553780451@qq.com</span> 
         <span style="color:#0076d1;cursor: pointer"><u>View class information</u></span>
     </div>
     
    </div>
    <el-collapse-transition>
    <div class="part2" v-if="!showset">
        <div class="card">
          <h2>Competition<i class="el-icon-trophy" style="color:#0076d1"></i></h2>
          <span>{{$store.state.c_amount.amount}}</span>
          <h2>Credit</h2>
          <span>{{$store.state.c_amount.credit}}</span>
          <h4>Look forward to your participation</h4>
        </div>
        <div class="card">
            <h2>Paper<i class="el-icon-copy-document" style="color:#0076d1"></i></h2>
          <span>{{$store.state.p_amount.amount}}</span>
          <h2>Credit</h2>
          <span>{{$store.state.p_amount.credit}}</span>
          <h4>Look forward to your participation</h4>
        </div>
        <div class="card">
            <h2>Patent<i class="el-icon-collection" style="color:#0076d1"></i></h2>
          <span>{{$store.state.t_amount.amount}}</span>
          <h2>Credit</h2>
          <span>{{$store.state.t_amount.credit}}</span>
          <h4>Look forward to your participation</h4>
        </div>
        <div class="card">
            <h2>Waiting for Review</h2>
            <span>{{$store.state.w_amount.amount}}</span>
            <h2>Credit</h2>
            <span>{{$store.state.w_amount.credit}}</span>
            <h4>Look forward to your participation</h4>
        </div>
    </div>
    </el-collapse-transition>
    <el-collapse-transition>
    <homeset v-if="showset"></homeset>
    </el-collapse-transition>
</div>

</template>

<style lang="scss" scoped>
   .iconhead{
    width: 120px;
    height: 120px;
    font-size: 100px;
    text-align: center;
    border-radius: 50%;
    background-color: #635464;
    margin-left: 10vw;
    margin-top: 5vh;
    color: white;
    position: relative;
    z-index: 2;
   
   }

   .part1{
    width: 100%;
    margin: 0 auto;
    background-color: rgb(250, 250, 250);
    //background-color: rgba(168, 208, 245, 0.404);
    padding-bottom: 5vh;
    //box-shadow: 0 10px 40px -8px rgba(0,0,0,.2);
    box-shadow: 0 10px 40px -8px rgba(43, 62, 102, 0.308);
    display:flex;
    flex-direction: row;
   }
   .card{
       width: 250px;
       height: 300px;
       margin:10vh 6vh;
       background-color: white;
       box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
       text-align: center;
       transition: 0.3s linear;
       h4{
           color: #0076d1;
       }
   }
   
   .card:hover{
       box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.3);
   }
  
   .part2{
       display: flex;
       flex-direction: row;
       justify-content: center ;
       flex-wrap: wrap;
   }
   .main{
       width:auto;
       margin:0;
       text-align: center;
       overflow-x: hidden;
       display: flex;
       flex-direction: column;
   }
   .message{
       display: flex;
       flex-direction: column;
       margin-top: 6vh;
       margin-left: 2vw;
       span{
           display: block;
           margin:8px;
           text-align: left;
       }
       div{
           display: flex;
           flex-direction: row;
       }
       .title{
           font-size: 28px;
           font-weight: 600;
           color: #0076d1
       }
       .title2{
           font-size: 20px;
           color:#635464
       }
   }
   

</style>

<script>
import setting from './setting'
export default {
    name:'personalhome',
    components: {
     'homeset': setting,
    },
    data(){
       return {
           number:'B18031007',
           academy:'计算机学院、软件学院、网络空间安全学院',
           showset:false,
           Setting:'Setting'
       }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      setting(){
          if(this.showset){
              this.showset=false;
              this.Setting='Setting'
          }
          else{this.showset=true;this.Setting='Personal Center'};
      }
    }
}
</script>
