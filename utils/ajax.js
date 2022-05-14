const api = 'https://www.ycloudtech.cn:7090/lawhelp';

function requestWithAuth(opt) {
    // console.log("requestWithAuth opt", opt)
    var header = opt.header;
    if (!header) {
        header = {
            'content-type': 'application/json' // 默认值
        }
    }
    header['sessionKey'] = getApp().globalData.sessionId
    header['userId'] = getApp().globalData.userId
    // console.log("header", header)
    // console.log("opt", opt)
    // set token
    wx.request({
        method: opt.method ? 'POST' : opt.method,
        url: api + opt.url,
        header: header,
        data: opt.data,
        success: function (res) {
            // console.log("ajaxWithAuth Res", res);
            opt.success(res);
        },
        fail: err => {
            // console.log("ajaxWithAuth Err", err)
            opt.fail(res);
        }
    })
}

function requestWithoutAuth(opt) {
    // console.log("requestWithoutAuth opt", opt)

    wx.request({
        method: opt.method ? 'POST' : opt.method,
        url: api + opt.url,
        header: {
            'content-type': 'application/json' // 默认值
        },
        data: opt.data,
        success: function (res) {
            // console.log("ajaxAithoutAuth Res", res);
            opt.success(res);
        },
        fail: err => {
            // console.log("ajaxRequestWithoutAuth Err", err)
            opt.fail(res);
        }
    })
}

module.exports.api = api
module.exports.requestWithAuth = requestWithAuth
module.exports.requestWithoutAuth = requestWithoutAuth
