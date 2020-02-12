<template>
<div>
  <div style="background-color:white;text-align:left">
    <h1 style="padding:10px 40px;">Anouncements</h1>
  </div>
   <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column width="40"></el-table-column>
    <el-table-column prop="anouncement" width="580"></el-table-column>
    <el-table-column prop="date" ></el-table-column>
    </el-table>
</div>
</template>

<style lang="scss" scoped>
.el-table{
    th{
      .cell {
      font-size: 30px;
      color: black;
      margin-bottom: 40px;
    }
    }
}
  
</style>

<script>
 export default {
     props:['anounlist'],
     data(){
         return{
           tableData : this.anounlist,  
         }
     },
     methods:{

     }
 }
</script>