/**
 * @description 表单提交注册
 * @author wqf
 */
function submitRegister(){
    var email= document.getElementById('inputEmail').value;
    var pwd= document.getElementById('inputPassword').value;
    var imagePath= document.getElementById('inputFile').value;
    if(document.getElementById('inputCheckMeOut').checked){
        ifCheckMeOut='Y';
    }
    else{
        ifCheckMeOut='N';
    }
   // var ifCheckMeOut= document.getElementById('inputCheckMeOut').value;
    var registerInfomation = new Array();
    var registerJson = "";

	if (email ==='') {
		alert('You must input an Email!');
		document.getElementById('inputEmail').focus();
	}
	else{
        registerInfomation.push({email: email});
        registerInfomation.push({pwd:pwd});
        registerInfomation.push({imagePath:imagePath});
        registerInfomation.push({ifCheckMeOut:ifCheckMeOut});
        registerJson = JSON.stringify(registerInfomation);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                alert(xmlHttp.responseText);
            }
        }
        xmlHttp.open('POST','/', true);
        xmlHttp.send();
	}
};

/**
 * @description 设置图片预览
 * @author wqf
 * 
 * @param {file控件的值} obj 
 */
function imagePreview(obj){
	if (obj.value ==='') {
		document.getElementById('divImage').style.display='none';
	}
	else{
		document.getElementById('divImage').style.display='block';
		var reads= new FileReader();        
		file=document.getElementById('inputFile').files[0];
        reads.readAsDataURL(file);
        reads.onload=function (e) {
        	document.getElementById('imgPreview').src=this.result;
        }
	}
	
};

/**
 * @description 使用正则表达式验证email格式
 * @author wqf
 */
function validateEmail(){
	var email= document.getElementById('inputEmail').value;
	var reg = new RegExp('(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)');
	if (!reg.test(email)) {
		document.getElementById('btnSubmit').setAttribute('disabled','disabled');
		document.getElementById('btnSubmit').style.background='#eee';
		document.getElementById('btnSubmit').style.color='#888';
		document.getElementById('errorLabel').innerHTML='Incorrect email format!';
	}
	else{
		document.getElementById('btnSubmit').removeAttribute('disabled');
		document.getElementById('errorLabel').innerHTML='';
		document.getElementById('btnSubmit').style.background='#fff';
		document.getElementById('btnSubmit').style.color='black';
	}
	
};

window.onbeforeunload = function(){
    var email= document.getElementById('inputEmail').value;
    var pwd= document.getElementById('inputPassword').value;
    var imagePath= document.getElementById('inputFile').value;
    if(document.getElementById('inputCheckMeOut').checked){
        ifCheckMeOut='Y';
    }
    else{
        ifCheckMeOut='N';
    }

    window.sessionStorage.setItem('EMAIL',email);
    window.sessionStorage.setItem('PWD',pwd);
    if (imagePath !== null){
       var file=document.getElementById('inputFile').files[0];
       window.sessionStorage.setItem('IMAGEPATH',file);
    }    
    window.sessionStorage.setItem('IFCHECKMEOUT',ifCheckMeOut);
}

window.onload = function(){
        var email= window.sessionStorage.getItem('EMAIL');
        var pwd= window.sessionStorage.getItem('PWD');
        var imagePath= window.sessionStorage.getItem('IMAGEPATH');
        var ifCheckMeOut= window.sessionStorage.getItem('IFCHECKMEOUT');
    
        if(email !== '' && email !== null){
            document.getElementById('inputEmail').value = email;
        }
        if(pwd !== '' && pwd !== null){
            document.getElementById('inputPassword').value = pwd;
        }
        /*if(imagePath !== '' && imagePath !== null){
            document.getElementById('divImage').style.display='block';
		    var reads= new FileReader();        
            reads.readAsDataURL(imagePath);
            reads.onload=function (e) {
        	    document.getElementById('imgPreview').src=this.result;
            }
        }
        */
        if(ifCheckMeOut !== '' && ifCheckMeOut !== null){
            if(ifCheckMeOut === 'Y'){
                document.getElementById('inputCheckMeOut').setAttribute('checked','checked');
            }
            else{
                document.getElementById('inputCheckMeOut').removeAttribute('checked');
            }
        }
   }

   function previewOrEdit(){
        if(document.getElementById('btnPreview').innerHTML =='预览'){
            document.getElementById('inputEmail').setAttribute('disabled','disabled');
            document.getElementById('inputBirthday').setAttribute('disabled','disabled');
            document.getElementById('inputPassword').setAttribute('disabled','disabled');
            document.getElementById('inputFile').setAttribute('disabled','disabled');
            document.getElementById('btnPreview').innerHTML ='编辑';
        }
        else{
            document.getElementById('inputEmail').removeAttribute('disabled');
            document.getElementById('inputBirthday').removeAttribute('disabled');
            document.getElementById('inputPassword').removeAttribute('disabled');
            document.getElementById('inputFile').removeAttribute('disabled');
            document.getElementById('btnPreview').innerHTML ='预览';
        }
   }