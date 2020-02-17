import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex);

export default new vuex.Store ({
   state:{
    AnounceList:[],AllList:[],List:[],CompetitionList:[],PaperList:[],PatentList:[],
    showlist:false,showhome:true,kindoflist:'',
    c_amount : {'amount':0, 'credit':0},
    p_amount : {'amount':0, 'credit':0},
    t_amount : {'amount':0, 'credit':0},
    w_amount : {'amount':0, 'credit':0},
    
   },
  getters:{
   
  },
  mutations:{
    GetAllList(state){
      axios.get('http://localhost:8080/homepage')
         .then((res)=>{
            state.AnounceList=res.data.data;
         }).catch((res)=>{
           alert(res);
         });
      axios.get('http://localhost:8080/kind1')
         .then((res)=>{
            state.AllList=res.data.data;
            state.c_amount.amount=0;state.c_amount.credit=0;
            state.p_amount.amount=0;state.p_amount.credit=0;
            state.t_amount.amount=0;state.t_amount.credit=0;
            state.w_amount.amount=0;state.w_amount.credit=0;
            state.AllList.map(function(item){
              if(item.type=='competition'){
                state.CompetitionList.push(item.detail)
                state.c_amount.amount=0;state.c_amount.credit=0;
                state.CompetitionList[0].map(function(item1){
                 if(item1.audit=='通过审核'){
                         state.c_amount.amount++;
                         state.c_amount.credit+=item1.credit;
                 }else{
                         state.w_amount.amount++;
                         state.w_amount.credit+=item1.credit;}
                })
               }else if(item.type=='paper'){
                state.PaperList.push(item.detail);
                console.log(state.PaperList[0])
                state.PaperList[0].map(function(item1){
                  if(item1.audit=='通过审核'){
                          state.p_amount.amount++;
                          state.p_amount.credit+=item1.credit;
                  }else{
                          state.w_amount.amount++;
                          state.w_amount.credit+=item1.credit;}
                 })
              }else if(item.type=='patent'){
               state.PatentList.push(item.detail);
                state.PatentList[0].map(function(item1){
                  if(item1.audit=='通过审核'){
                          state.t_amount.amount++;
                          state.t_amount.credit+=item1.credit;
                  }else{
                          state.w_amount.amount++;
                          state.w_amount.credit+=item1.credit;}
                 })
             }
           })
         }).catch((res)=>{
          alert(res);
        });   
    },
       GETCompetitonList(state){
         state.List = state.CompetitionList[0];
         state.showlist = true;
         state.showhome = false;
         state.kindoflist = 'Competition';
       },
       GETPaperList(state){
         state.List = state.PaperList[0];
         state.showlist = true;
         state.showhome = false;
         state.kindoflist = 'Paper'
       } ,
       GETPatentList(state){
         state.List = state.PatentList[0];
         state.showlist = true;
         state.showhome = false;
         state.kindoflist = 'Patent'
       } ,
       GETAnounceList(state){
         axios.get('http://localhost:8080/homepage')
         .then((res)=>{
            state.AnounceList=res.data.data;
         }).catch((res)=>{
           alert(res);
         });
         state.showlist = false;
         state.showhome = true;
       } ,
     },
     actions:{
       
     } 
})

