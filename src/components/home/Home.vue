<template>
<div> 
 <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
   <el-menu-item index="1" style="margin-left:20px;" @click="$store.commit('GETAnounceList')"><i class="el-icon-s-home"></i>Home</el-menu-item>
   <el-menu-item index="2" @click="$store.commit('GETCompetitonList')">Competition</el-menu-item>
   <el-menu-item index="3" @click="$store.commit('GETPaperList')">Paper</el-menu-item>
   <el-menu-item index="4" @click="$store.commit('GETPatentList')">Patent</el-menu-item>
   <el-menu-item index="5">About</el-menu-item>
   <el-menu-item index="6" class="percenter" @click="personalhome()"><i class="el-icon-user"></i>Personal Center</el-menu-item>
   <!-- <div class="search">
       <el-input placeholder="请输入关键字" v-model="input" clearable style="width:300px"></el-input>
       <el-button type="primary" icon="el-icon-search" @click="search(input)">搜索</el-button>
       <el-button type="primary" @click="manage()"><i class="el-icon-setting"></i>Management</el-button>
   </div>   -->
</el-menu>

<div class="list">
 <el-collapse-transition>
<creditlist v-if="$store.state.showlist" ></creditlist>
 </el-collapse-transition>
<homepage  v-if="$store.state.showhome"></homepage>
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
        input: '',
        activeIndex2: '1',
     }
  },
  mounted: function() {
 //这个是钩子函数
 //如果cartView函数要执行，必须先执行钩子函数
 //这个钩子函数完成了对cratView函数的调用
 //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入    Vue.nextTick/vm.$nextTick
   this.$nextTick(function () {
    this.$store.commit('GetAllList');
   })
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      personalhome(){
        this.$router.push('home/personalhome')
      }
      
},
}
</script>