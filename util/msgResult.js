const tools = require("./tools")
/**
 * 正常响应
 * @param data
 * @return {{code: string, data: string}}
 */
let ok = (data = '')=>{
    // console.log(`[msgResult响应信息]：${tools.getDate19()}-${data}`)
    return {code: 'ok', data: data};
}

/**
 * 异常响应
 * @param data
 * @return {{code: string, data: string}}
 */
let error = (data = '异常')=>{
    // console.log(`[msgResult异常信息]：${tools.getDate19()}-${data}`)
    return {code: 'error', data: data};
}

module.exports = {ok, error};
