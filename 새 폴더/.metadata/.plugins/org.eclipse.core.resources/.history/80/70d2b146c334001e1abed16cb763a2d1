

function idClick() {
    document.getElementById('idbox').classList.add('clickAni');
    document.getElementById('idbox').classList.add('active');
    document.getElementById('idbox').innerHTML = `<div class="logintext">아이디</div> <div class="logininput"><input type="text" name="id" class="login"></div>`;
  
    document.getElementById('idbox').removeEventListener('click', idClick);
  }

  function pwClick() {
    document.getElementById('pwbox').classList.add('clickAni');
    document.getElementById('pwbox').classList.add('active');
    document.getElementById('pwbox').innerHTML = `<div class="logintext">비밀번호</div> <div class="logininput"><input type="password" name="pw" class="login"></div>`;
  
    document.getElementById('pwbox').removeEventListener('click', pwClick);
  }
  
  document.getElementById('idbox').addEventListener('click', idClick);
  document.getElementById('pwbox').addEventListener('click', pwClick);
  
  let isClicked=false;
  document.addEventListener('click',(e)=>{
if(e.target.classList.contains('inputBtn')){
    e.target.classList.add('clickAni');

    setTimeout(() => {
        e.target.classList.remove('clickAni');
      }, 1000); // 애니메이션 지속 시간
}
    
  })
  document.querySelector('.loginbtn').addEventListener('click',()=>{
    document.querySelector('.custom-button').click();
  })




