async function pwcheckToServer(userData){
try{
    console.log(userData);
    const url='/member/certify';
    const config={
        method:'post',
        headers:{
            'content-type':'application/json; charset=utf-8' 
        },
        body:JSON.stringify(userData)
    };
    const resp=await fetch(url, config);
    const result=await resp.text();
    return result;
}catch(err){
    console.log(err);
}
}

document.getElementById('checkBtn').addEventListener('click',()=>{
    userData={
        id: document.getElementById('id').value,
        pw: document.getElementById('oldPw').value

    }
    console.log(userData.id, userData.pw);
    pwcheckToServer(userData).then(result=>{
        if(result>0){
            let li=`<h4><span class="material-symbols-outlined">check</span> 비밀번호가 확인되었습니다.</h4>`;
            li+=`<ul class="ulbox"><li>변경할 비밀번호를 입력해주세요.</li>`;
            li +=`<li id="pwMent"><input type="password" id="newPw" class="form-control newPw"><span id="spanment"></span></li>`;
            li +=`<li>비밀번호 재확인</li><li> <input type="password" id="pwCheck" class="form-control pwCheck"><span id="checkment"></span></li>`;
            li+=`<button type="button" class="changeBtn btncss " disabled="disabled">변경</button></li></ul>`;
            document.getElementById('resultMent').innerHTML=li;
        }else{
            document.getElementById('resultMent').innerHTML=`<h3>비밀번호가 맞지않습니다.</h3>`;
        }
    })
})



let isNewPw; // 값을 저장할 변수

document.addEventListener('input', (e) => {
  document.querySelector('.changeBtn').disabled=true;
  if (e.target.classList.contains('newPw')) {
    const password = e.target.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^*+=-])[A-Za-z\d!@#$%^*+=-]{8,}$/;

    if (regex.test(password)) {
      isNewPw = password; // 조건을 충족하는 경우 변수에 값을 저장
      document.getElementById('spanment').innerText = '';
    } else {
      document.getElementById('spanment').style.color="red";
      document.getElementById('spanment').innerText = '비밀번호는 영어, 숫자, 특수문자(!,@,#,$,%,^,*,+,=,-)를 포함한 8자 이상이어야 합니다.';
    }
  }

  if (e.target.classList.contains('pwCheck')) {
    const checkpassword = e.target.value;
   
      // 첫 번째 조건을 충족하는 경우에만 실행
      if (checkpassword === isNewPw) {
        document.getElementById('checkment').style.color="green";
        document.getElementById('checkment').innerText = '비밀번호가 일치합니다.';
        document.querySelector('.changeBtn').disabled=false;
      } else {
        document.getElementById('checkment').style.color="red";
        document.getElementById('checkment').innerText = '비밀번호가 일치하지 않습니다.';
      }

  }
});



document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('changeBtn')){
        const pw=document.getElementById('newPw').value;
        const oldPw=document.getElementById('oldPw').value;
        if(pw==oldPw){
            alert('기존의 비밀번호로는 변경할 수 없습니다.');
            return;
        }

        userData={
            id : document.getElementById('id').value,
            pw: document.getElementById('newPw').value
        };
        editPwToServer(userData).then(result=>{
            if(result>0){
                alert('비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.');
                //세션끊기
                window.location.href = 'logout';
            }
        })
    }
})

function logout() {
    // 세션을 끊는 로직을 여기에 구현
    // 예를 들어, 로그아웃 API를 호출하거나 세션 관련 정보를 삭제하는 등의 작업을 수행
    
    // 세션을 끊은 후 로그인 페이지로 이동
    window.location.href = 'home';
}

async function editPwToServer(userData){
    try{
        const url='/member/';
        const config={
            method:'put',
            headers:{
                'content-type':'application/json; charset=utf-8'
            },
            body:JSON.stringify(userData)
        };
        const resp=await fetch(url, config);
        const result=await resp.text();
        return result;
    }catch(err){
        console.log(err);
    }
}



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
          console.log(input.files);
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
    document.getElementById('preview').src=imageSrc;
   document.getElementById('close').click(); // 모달 창 닫기
  }
  

  function previewImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        console.log(e.target.result);
        document.getElementById('preview').src = e.target.result;
        document.getElementById('close').click(); // 모달 창 닫기
      };
      reader.readAsDataURL(input.files[0]);
    }

  }

  