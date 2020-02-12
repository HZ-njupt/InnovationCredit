//模拟接口模块聚合文件
import Mock from 'mockjs'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'
import * as kind1 from './modules/kind1'
import * as kind2 from './modules/kind2'
import * as kind3 from './modules/kind3'
import * as homepage from './modules/homepage'
// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
fnCreate(login, true)
fnCreate(user, true)
fnCreate(menu, true)
fnCreate(kind1, true)
fnCreate(homepage, true)
fnCreate(kind2, true)
fnCreate(kind3, true)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  if (isOpen) {
    for (var key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          Mock.mock(new RegExp(res.url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      })(mod[key]() || {})
    }
  }
}
