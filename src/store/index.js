import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
 
export default new vuex.Store({
 state:{
   CompetitonList : [] ,
   PaperList : [],
   PatentList : [],
   c_amount : [{amount:0, credit:0, }],
   w_amount : [{amount:0, credit:0, }],
  },
getters:{
  
},
mutations:{
      GETCompetitonList(state){
        axios.get('http://localhost:8080/kind1')
        .then((res)=>{
           state.CompetitonList=res.data.data;
        })
      },
      GETc_amount(state){
         state.CompetitonList.map(function(item){
                if(item.author==1){
                        state.c_amount.amount++;
                        state.c_amount.credit+=item.credit; }
                else{
                        state.w_amount.amount++;
                        state.w_amount.credit+=item.credit;}
        })
                return state.c_amount;
      }
},
 actions:{
      
 }
     
})
