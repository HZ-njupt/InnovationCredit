<template>
   <div>
    <div style="background-color:white;text-align:right">
      <h2 style="float:left;margin-left:10px;">{{$store.state.kindoflist}} List</h2>
     <el-button type="primary" @click="manageit()" class="managebtn"><i class="el-icon-setting"></i>Manage</el-button>
      <el-button type="primary" :loading="loadclass" @click="manageclass()" class="managebtn"><i class="el-icon-setting"></i>Class Manage</el-button>
    </div> 
      <el-table row-key="id" ref="multipleTable" :data="$store.state.List" tooltip-effect="dark" @selection-change="handleSelectionChange" stripe>
       <el-table-column type="index" width="60">
       </el-table-column>
       <el-table-column type="selection" width="50" v-if="manage">
       </el-table-column>
        <el-table-column prop="number" label="Number" width="150">
        </el-table-column>
        <el-table-column prop="name" label="Name" width="110">
        </el-table-column>
        <el-table-column prop="competition" :label="$store.state.kindoflist" width="400">
        </el-table-column>
        <el-table-column prop="credit" label="Credit" width="200">
        </el-table-column>
        <el-table-column prop="audit" label="AuditStatus">
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <kt-button @click="editlist(scope.$index, scope.row)" :label='editbtn' v-if="manage"></kt-button>
            <kt-button @click="deletelist(scope.$index, scope.row)" v-if="manage" style="background-color:#dc4747;border-color:red" :label='delbtn'></kt-button>
          </template>
        </el-table-column>
      </el-table>
     
     
      <div class="btn-group" v-if="manage">
        <kt-button @click="addStudent()" :label='addbtn'></kt-button>
        <kt-button @click="delelteAll()" style="background-color:#dc4747;border-color:red" :label='delallbtn' ></kt-button>
      </div>
       <!-- 编辑对话框 -->
       <el-dialog title="编辑" :visible.sync="editvisible" width="400px" >
         <el-form :model="editForm" status-icon :label-position='labelposition' ref="editForm">
         <el-form-item label="Name:" prop="editname">
         <el-input type="text" v-model="editForm.editname" autocomplete="off" clearable></el-input>
         </el-form-item>
         <el-form-item label="Number:" prop="editnumber">
         <el-input type="text" v-model="editForm.editnumber" autocomplete="off" clearable></el-input>
         </el-form-item>
         <el-form-item :label="$store.state.kindoflist+':'" prop="editobject">
         <el-input type="text" v-model="editForm.editobject" autocomplete="off" clearable></el-input>
         </el-form-item>
         <el-form-item label="Credit:" prop="editcredit">
         <el-input type="text" v-model="editForm.editcredit" autocomplete="off" clearable></el-input>
         </el-form-item>
         <el-form-item>
         <el-button type="primary" @click="submitForm('editForm')">Submit</el-button>
         <el-button @click="resetForm('editForm')">Reset</el-button>
         </el-form-item>
         </el-form>
       </el-dialog>
       <!-- 编辑对话框 -->
      
      </div>
</template>


<style lang='scss'>
.el-dialog{
 
      .el-form-item{
        text-align: left;
        width: 80%;
        margin:auto;
      }
      
      .el-button{
       margin-top:30px;
      }  
}
.btn-group{
    float: left;
    margin-top: 20px;
}
.el-table__row{
  height: 63px;
}
.managebtn{
  margin:10px;
}

</style>
  
<script>
import Ktbutton from './Ktbutton'
   export default {
     props:['keyword'],
      name:'creditlist',
      components: {
     'kt-button': Ktbutton
      },
      data() {
      return {
        editForm:{
           editname:'',
           editnumber:'',
           editobject:'',
           editcredit:'',
        },
        labelposition : 'top',
        tableData:this.content,
        multipleSelection: [],
        editvisible:false,
        editbtn: 'Edit',delbtn:'Delete',addbtn:'Add',delallbtn:'Delete',
        manage:false,
        loadclass:false,
      }
    },
    methods:{
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection.length);
      },
    deletelist(index,row){
      console.log(index, row);
      this.$confirm('Are you sure to delete the record?', 'Attention', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancle',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete it!'
          });
        }).catch(() => {
        });
    },
    editlist(index,row){
      this.editvisible=true;
      this.$set(this.editForm,'editnumber',row.number)
      this.$set(this.editForm,'editname',row.name)
      this.$set(this.editForm,'editobject',row.competition)
      this.$set(this.editForm,'editcredit',row.credit)
    },
    
    addStudent(){
      this.editvisible=true;
      this.$set(this.editForm,'editnumber','')
      this.$set(this.editForm,'editname','')
      this.$set(this.editForm,'editobject','')
      this.$set(this.editForm,'editcredit','')
    },
    
    delelteAll(){
      if(this.multipleSelection.length != 0){
       this.$confirm('Are you sure to delete these records?', 'Attention', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancle',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete it!'
          });
        }).catch(() => {
        });
      }else{
         this.$message({
            showClose: true,
            message: "You didn't choose any information",
            type: 'warning' 
        })
      }
    },
    manageit(){
         if(this.manage){
           this.manage=false;
         }
         else{
           this.manage=true;
         }
      },
      manageclass(){
        if(this.manage){
           this.manage=false;
         }
         else{
           this.manage=true;
         }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
            showClose: true,
            message: 'Information Saved',
            type: 'success' 
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
         this.editvisible = false;
        
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    }
    

</script>