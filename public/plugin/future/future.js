    var myAjax = function(option){
    $.ajax({
        beforeSend: function (XMLHttpRequest) {
            let token = window.localStorage.getItem('token');
            if(token){
                XMLHttpRequest.setRequestHeader("token", token);
            }
            //请求前设置请求头
        },
        url:'http://localhost:8080' + option.url,
        type:'POST',
        dataType:'JSON',
        data:option.data,
        async:false,
        success:function(result){
            console.log(result);
            if (option.success) {
                option.success(result);
            }
        },
        erorr:function(err){
        }
    })
};
let future={}
future.base="http://localhost:8080"
/**
 * 前端上传文件插件封装
 * 用法
 * @param options -json对象，包含如下属性：
 *                  inputId: 上传的文件框的id
 *                  uploadUrl:文件上传的地址 uri
 *                  success:上传成功后的回调函数
 *                  error:上传失败后的回调函数
 *                eg:{
 *                    inputId:"file",
 *                    uploadUrl:"http://localhost/file/uploadImg"
 *                    success:function (data) {
 *
 *                    },
 *                    error:function () {
 *
 *                    }
 *                }
 */
future.uploadFile = function(options){
    var file = document.getElementById(options.inputId);
    var formData = new FormData();
    formData.append('file',file.files[0]);
    $.ajax({
        url: future.base + options.uploadUrl,
        type: 'POST',
        // timeout:3000,
        data: formData,
        cache: false,
        contentType: false,// 不可缺少参数
        processData: false,// 不可缺少参数
        success: function(data){
            if (options.success) {
                options.success(data);
            }
        },
        error: function(){
            if (options.error) {
                options.error();
            }
        }
    });
}
