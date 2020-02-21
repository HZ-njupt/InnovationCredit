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
    SignForm : {'name':'','number':'','password': '','email':''},
    LogForm : {'name':'','number':'','password': '','email':''},
    status :'',
    token: localStorage.getItem('token') || '',
    user: {}
   },
  getters:{
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
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
       auth_request(state) {
        state.status = 'loading';
      },
      auth_success(state, token, user) {
        state.status = 'success';
        state.token = token;
        state.user = user;
      },
      auth_error(state) {
        state.status = 'error';
      },
      logout(state) {
        state.status = ''; 
        state.token = '';
      },
     },
     actions:{
      Login({commit}, user) {
        return new Promise((resolve, reject) => {
        commit('auth_request')
        // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        axios.post('login', user)
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // 每次请求接口时，需要在headers添加对应的Token验证
            axios.defaults.headers.common['Authorization'] = token
            // 更新token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
     } ,
     LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('Logout')
          .then(response => {
            removeIsLogin()
            localStorage.removeItem('loginUsername');
            // 移除之前在axios头部设置的token,现在将无法执行需要token的事务
            delete axios.defaults.headers.common['Authorization'];
     resolve(response)
           })
          .catch(error => {
            reject(error)
          })
      })
    },
    Signin({commit}, user){
      
    }
})

