<template>
<div> 
 <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
   <el-menu-item index="1" style="margin-left:20px;" @click="homeclick()"><i class="el-icon-s-home"></i>Home</el-menu-item>
   <el-menu-item index="2" @click="kind1(2016)">Competition</el-menu-item>
   <el-menu-item index="3" @click="kind2(2016)">Paper</el-menu-item>
   <el-menu-item index="4" @click="kind3(2016)">Patent</el-menu-item>
   <el-menu-item index="5">About</el-menu-item>
   <el-menu-item index="6" class="percenter" @click="personalhome()"><i class="el-icon-user"></i>Personal Center</el-menu-item>
   <!-- <div class="search">
       <el-input placeholder="请输入关键字" v-model="input" clearable style="width:300px"></el-input>
       <el-button type="primary" icon="el-icon-search" @click="search(input)">搜索</el-button>
       <el-button type="primary" @click="manage()"><i class="el-icon-setting"></i>Management</el-button>
   </div>   -->
</el-menu>
<div class="list">

<creditlist :content='list' v-if="shcompetition"  :keyword='kindoflist'></creditlist>
<creditlist :content='list' v-if="shpaper" :keyword='kindoflist'></creditlist>
<creditlist :content='list' v-if="shpatent" :keyword='kindoflist'></creditlist>
<homepage :anounlist='anounlist' v-if="shome"></homepage>

</div>
 </div>

</template>

<style scoped>
 .el-menu{
   white-space: nowrap;
   position: fixed;
   top: 0;
   width: 100%;
   z-index: 9999;
 }
 
  .percenter{
    float: right;
  }
  .search{
    float: left;
    margin: 10px;
  }
  .list{
    width:90%;
    margin:100px auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>

<script>
import axios from 'axios'
import mock from '@/mock/index.js';
import creditlist from './creditlist'
import homepage from './homepage'
export default {
  name:'Home',
  components: {
     'creditlist': creditlist,
     'homepage' : homepage,
  },
  data(){
     return {
         list : [],
         shcompetition: false,
         shome : false,
         input: '',
         shpaper: false,
        shpatent:false,
        activeIndex2: '1',
        anounlist:[],
        kindoflist:'',
     }
  },
  mounted: function() {
 //这个是钩子函数
 //如果cartView函数要执行，必须先执行钩子函数
 //这个钩子函数完成了对cratView函数的调用
 //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入    Vue.nextTick/vm.$nextTick
   this.$nextTick(function () {
    this.homeclick() 
   })
  },
  methods: {
      getUser(){
          axios.get('http://localhost:8080/user')
        .then(function(res){
            alert(JSON.stringify(res.data));
        }).catch(function(res){
            alert(res);
        });
      },
      
      kind1(grade){
          axios.get('http://localhost:8080/kind1')
        .then((res)=>{
            this.list=res.data.data;
            this.shcompetition=true;
            this.shome=false;
            this.shpaper=false;
            this.shpatent=false;
            this.kindoflist='Competition'
        }).catch(function(res){
            alert(res);
        });
        
      },
      kind2(grade){
          axios.get('http://localhost:8080/kind2')
        .then((res)=>{
          console.log(res.data.data)
            this.list=res.data.data;
            this.shcompetition=false;
            this.shome=false;
            this.shpaper=true;
            this.shpatent=false;
            this.kindoflist='Paper'
        }).catch(function(res){
            alert(res);
        });
        
      },
      kind3(grade){
          axios.get('http://localhost:8080/kind3')
        .then((res)=>{
          console.log(res.data.data)
            this.list=res.data.data;
            this.shcompetition=false;
            this.shome=false;
            this.shpaper=false;
            this.shpatent=true;
            this.kindoflist='Patent';
        }).catch(function(res){
            alert(res);
        });
        
      },
      search(keyword){

      },
      homeclick(){
        axios.get('http://localhost:8080/homepage')
        .then((res)=>{
            this.anounlist=res.data.data;
            this.shome=true;
            this.shcompetition=false; 
            this.shpaper=false;
            this.shpatent=false;
        }).catch(function(res){
            alert(res);
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      personalhome(){
        this.$router.push('home/personalhome')
      }
      
},
}
</script>