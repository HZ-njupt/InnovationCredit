import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/common/404'
import Home from '@/components/home/Home'
import Login from '@/components/Login/Login'
import Sign from '@/components/Login/Signin'
import PersonalHome from '@/components/PersonalCenter/home'
import PersonalSet from '@/components/PersonalCenter/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign',
      name: 'Signin',
      component: Sign
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/home/personalhome',
      name: 'personalhome',
      component: PersonalHome,
    },
    {
      path: '/home/personalset',
      name: 'personalset',
      component: PersonalSet,
    }
  ]
})

// router.beforeEach((to,form,next)=>{
//   let user = sessionStorage.getItem('user');
//   if(to.path =='/login'){
//     if(user){
//       next({path: '/'})
//     } else {
//       next()
//     }
//   } else{
//     if(!user){
//       next({ path: '/login'})
//     } else{
//       next()
//     }
//   }
// })

// export default router
