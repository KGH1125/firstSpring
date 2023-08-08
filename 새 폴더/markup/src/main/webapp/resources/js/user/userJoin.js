
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile_img')) {
    var url = e.target.src;
    var startIndex = url.indexOf("/resources/");
    var imgUrl = url.substring(startIndex);
      console.log(imgUrl);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imgUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = this.response;
        var filename = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
        var file = new File([blob], filename, { type: blob.type });

        var input = document.getElementById('file');
        var fileInput = new DataTransfer();
        fileInput.items.add(file);
        input.files = fileInput.files;
      }
    };

    xhr.send();
  }
});

document.getElementById('mypic').addEventListener('click',()=>{
  document.getElementById('file').click();
})

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

function showPreview(imageSrc) {
  document.getElementById('previewbox').innerHTML = `<img alt="" src="${imageSrc}" id="preview" >`;
 document.getElementById('close').click(); // 모달 창 닫기
}


function previewImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('preview').src = e.target.result;
      document.getElementById('close').click(); // 모달 창 닫기
    };
    reader.readAsDataURL(input.files[0]);
  }

}

document.getElementById('joinid').addEventListener('input',()=>{
  document.getElementById('idMent').innerHTML='';
  document.getElementById('formBtn').disabled=true;
  //checkFormValidity();

})

document.getElementById('joinid').addEventListener('input',()=>{
  const id=document.getElementById('joinid').value;
  const regex=/^[a-z0-9]+$/;

  if(regex.test(id)){
    document.getElementById('idMent').innerHTML='';
  }else{
    document.getElementById('idMent').style.color='red';
    document.getElementById('idMent').innerHTML='아이디는 소문자 영어와 숫자만 가능합니다.<br>';
  
  }
})

let idcheck=0;
document.getElementById('duplicateCheck').addEventListener('click',()=>{

  const id=document.getElementById('joinid').value;
  console.log(id);
  duplicateCheckId(id).then(result=>{
    if(result>0){
      document.getElementById('idMent').style.color='green';
      document.getElementById('idMent').innerHTML='사용 가능한 아이디입니다. <br>';
      idcheck=1;
      checkFormValidity();
     
    }else{
      document.getElementById('idMent').style.color='red';
      document.getElementById('idMent').innerHTML='사용 불가능한 아이디입니다. <br>';
      idcheck=0;
     
    
    }
  })
})



async function duplicateCheckId(id){
  try{
    const url='/member/'+id;
    const config={
      method:'get'
    };
    const resp=await fetch(url, config);
    const result=await resp.text();
    return result;
  }catch(err){
    console.log(err);
  }
}

document.getElementById('pw').addEventListener('input',()=>{
  const password=document.getElementById('pw').value;
  const regex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-])[A-Za-z\d!@#$%^*+=-]{8,}$/;

  if(regex.test(password)){
    document.getElementById('pwMent2').innerHTML='';
    checkFormValidity();
  }else{
    document.getElementById('pwMent2').style.color='red';
    document.getElementById('pwMent2').innerHTML='비밀번호는 영어, 숫자, 특수문자(!,@,#,$,%,^,*,+,=,-)를 포함한 8자 이상이어야 합니다.';
    document.getElementById('formBtn').disabled=true;
  }
})

document.getElementById('pwCheck').addEventListener('input',()=>{
const pw=document.getElementById('pw').value;
console.log(pw);
const check=document.getElementById('pwCheck').value;
console.log(check);
if(pw==check){
  document.getElementById('pwMent').style.color='green';
  document.getElementById('pwMent').innerHTML=`비밀번호가 일치합니다.`;
  checkFormValidity();
  
}else{
  document.getElementById('pwMent').style.color='red';
  document.getElementById('pwMent').innerHTML=`비밀번호가 일치하지 않습니다.`;
  document.getElementById('formBtn').disabled=true;
  

}
if(check==''){
  document.getElementById('pwMent').innerText='';
}
})


document.getElementById('name').addEventListener('input',()=>{
checkFormValidity();
})
document.getElementById('email').addEventListener('input',()=>{
checkFormValidity();
})
document.getElementById('file').addEventListener('input',()=>{
checkFormValidity();
})
document.getElementById('content').addEventListener('input',()=>{
checkFormValidity();
})
document.getElementById('name').addEventListener('input',()=>{
checkFormValidity();
})

const tags = document.querySelectorAll('.tags');

tags.forEach(tag => {
tag.addEventListener('change', () => {
  checkFormValidity();
});
});


function checkFormValidity() {
const id = document.getElementById('joinid').value;
const pw = document.getElementById('pw').value;
const pwCheck = document.getElementById('pwCheck').value;
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const file = document.getElementById('file').value;
const content = document.getElementById('content').value;
const tags = document.querySelectorAll('.tags:checked');

console.log(id, pw, pwCheck, name, email, file, content, tags);

if (id===''|| pw === '' || pwCheck === '' || name === '' || email === '' || file === '' ||
  content === '' || tags.length === 0|| idcheck===0) {
  document.getElementById('formBtn').disabled=true;
} else {
  document.getElementById('formBtn').disabled=false;
}

}
document.querySelector('.logobox').addEventListener('click',()=>{
  console.log('로고박스 클릭');
  window.location.href="/";
})






