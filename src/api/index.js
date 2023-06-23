//当前模块 统一管理API

import requests from './request'

const appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
//获取首页轮播图banner接口
export const reqGetBanner = () => {
    let msg = {
        appkey
    }
    return requests.get(
        '/banner', {
            data: msg
        }
    )
}
//获取首页热卖咖啡接口
export const reqGetHotProduct = () => {
    return requests.get(
        '/typeProducts', {
            data: {
                key: 'isHot',
                value: 1,
                appkey
            }
        }
    )
}

//获取菜单分类类别接口
export const reqGetType = () => {
    return requests.get(
        '/type', {
            data: {
                appkey
            }
        }
    )
}

//获取对应类型咖啡接口
export const reqGetTypeProduct = (msg) => {
    msg.appkey = appkey
    msg.key = 'type'
    return requests.get(
        '/typeProducts', {
            data: msg
        }
    )
}

//获取咖啡详细接口
export const reqGetDetail = (msg) => {
    msg.appkey = appkey
    return requests.get(
        '/productDetail', {
            data: msg
        }
    )
}

//注册接口
export const register = (msg) => {
    //   请求参数： {
    //       appkey: 你的appkey,
    //       nickName: 昵称,
    //       password: 密码,
    //       phone: 手机号
    //   }
    msg.appkey = appkey

    return requests.post('/register', msg)
}
//登录接口
export const login = (msg) => {
    // 请求参数： {
    //     appkey: 你的appkey,
    //     password: 密码,
    //     phone: 手机号
    // }
    msg.appkey = appkey

    return requests.post('/login', msg)
}

//退出登录接口
export const reqLogout = (msg) => {
    msg.appkey = appkey
    return requests.post('/logout', msg)
}

//注销账号接口
export const reqDestroyAccount = (msg) => {
    msg.appkey = appkey
    return requests.post('/destroyAccount', msg)
}

//我的页面接口
export const reqFindMy = (token) => {
    return requests.get('/findMy', {
        data: {
            tokenString: token,
            appkey
        }
    })
}
//上传用户背景接口
export const requpdateUserBg = (msg) => {
    msg.appkey = appkey
    return requests.post('/updateUserBg', msg)
}

//查询订单接口
export const reqFindOrder = (msg) => {
    msg.appkey = appkey
    return requests.get('/findOrder', {
        data: msg
    })
}

//确认收货接口
export const reqReceive = (msg) => {
    msg.appkey = appkey
    return requests.post('/receive', msg)
}

//删除订单接口
export const reqRemoveOrder = (msg) => {
    msg.appkey = appkey
    return requests.post('/removeOrder', msg)
}

//查询是否收藏商品接口
export const reqFindLike = (msg) => {
    msg.appkey = appkey
    return requests.get('/findlike', {
        data: msg
    })
}

//查询用户所有收藏咖啡接口
export const reqFindAllLike = (msg) => {
    msg.appkey = appkey
    return requests.get('/findAllLike', {
        data: msg
    })
}
//收藏咖啡接口
export const reqLike = (msg) => {
    msg.appkey = appkey
    return requests.post('/like', msg)
}

//取消收藏咖啡接口
export const reqNotlike = (msg) => {
    msg.appkey = appkey
    return requests.post('/notlike', msg)
}

//  取消(删除) 收藏商品接口
export const reqremoveLike = (msg) => {
    msg.appkey = appkey
    return requests.post('/notlike', msg)
}
//搜索咖啡接口
export const search = (msg) => {
    msg.appkey = appkey
    return requests.get('/search', {
        data: msg
    })
}

//  查询地址接口
export const reqFindAddress = (msg) => {
    msg.appkey = appkey
    return requests.get('/findAddress', {
        data: msg
    })
}

//  新增地址接口
export const reqaddAddress = (msg) => {
    msg.appkey = appkey
    return requests.post('/addAddress', msg)
}
//根据地址aid查询地址接口
export const reqFindAddressByAid = (msg) => {
    msg.appkey = appkey
    return requests.get('/findAddressByAid', {
        data: msg
    })
}
// 编辑地址接口
export const reqEditAddress = (msg) => {
    msg.appkey = appkey

    return requests.post('/editAddress', msg)
}
// 删除地址接口
export const reqDeleteAddress = (msg) => {
    msg.appkey = appkey

    return requests.post('/deleteAddress', msg)
}


//添加购物车接口
export const reqAddShopcart = (msg) => {

    msg.appkey = appkey
    return requests.post('/addShopcart', msg)
}

//查询购物车商品总数量接口
export const reqShopcartCount = (msg) => {
    msg.appkey = appkey

    return requests.get('/shopcartCount', {
        data: msg
    })
}
//  修改购物车商品数量接口
export const reqModifyShopcartCount = (msg) => {
    msg.appkey = appkey
    return requests.post('/modifyShopcartCount', msg)
}


//删除 一个或者多个 购物车商品接口 该接口为：物理删除(真删除，数据不在数据库中)
export const reqDeleteShopcart = (msg) => {
    msg.appkey = appkey
    return requests.post('/deleteShopcart', msg)
}

// 查询用户所有购物车条数接口
export const reqAllShopcart = (msg) => {
    msg.appkey = appkey

    return requests.get('/findAllShopcart', {
        data: msg
    })
}

// 提交订单页面查询需要购买商品接口
export const reqCommitShopcart = (msg) => {
    msg.appkey = appkey

    return requests.get('/commitShopcart', {
        data: msg
    })
}

//  立即结算接口
export const reqPay = (msg) => {
    msg.appkey = appkey
    return requests.post('/pay', msg)
}

//个人资料接口
export const reqFindAccountInfo = (msg) => {
    msg.appkey = appkey
    return requests.get('/findAccountInfo', {
        data: msg
    })
}

//修改密码接口
export const reqUpdatePwd = (msg) => {
    msg.appkey = appkey
    return requests.post('/updatePassword', msg)
}
//  上传头像接口
export const reqUpdateAvatar = (msg) => {
    msg.appkey = appkey
    return requests.post('/updateAvatar', msg)
}
//    修改昵称接口
export const reqUpdateNickName = (msg) => {
    msg.appkey = appkey
    return requests.post('/updateNickName', msg)
}

//    修改昵称接口
export const reqUpdateDesc = (msg) => {
    msg.appkey = appkey
    return requests.post('/updateDesc', msg)
}

//搜索商品接口
export const reqSearch = (msg) => {
    msg.appkey = appkey
    return requests.get('/search', {
        data: msg
    })
}

//  获取邮箱验证码接口
export const reqEmailValidCode = (msg) => {
    msg.appkey = appkey
    return requests.post('/emailValidCode', msg)
}

//  验证码验证接口
export const reqCheckValidCode = (msg) => {
    msg.appkey = appkey
    return requests.post('/checkValidCode', msg)
}
// 找回密码接口
export const reqRetrievePassword = (msg) => {
    msg.appkey = appkey
    return requests.post('/retrievePassword', msg)
}