// const nextBtns = document.querySelectorAll(".nextb");//다음버튼
// const previousBtns = document.querySelectorAll(".previousb");//이전버튼
// const midBox = document.getElementById("NJmidbox");//움직일 박스
// let divlength = 0;//현재 위치
// const movelength = 600;//움직일 거리

// nextBtns.forEach((button) => {
//   button.addEventListener("click", () => {
//     console.log("앞으로");
//     divlength -= movelength;
//     midBox.style.transform = `translateX(${divlength}px)`;
//   });
// });

// previousBtns.forEach((button) => {
//   button.addEventListener("click", () => {
//     console.log("뒤로");
//     divlength += movelength;
//     midBox.style.transform = `translateX(${divlength}px)`;
//   });
// });

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
              // let li=`<p> 비밀번호가 일치합니다.</p>`;
              // li+=`<h4>다음 중 탈퇴사유를 선택하거나 직접 입력해주세요.</h4>`;
              // li+=`<label for="reason">탈퇴 사유</label><select id="reason"><option value="a">시스템 에러 및 서비스 속도</option>`;
              // li+=`<option value="b">사용빈도가 낮음</option><option value="c">개인정보 노출 우려</option>`;
              // li+=`<option value="d">고객 응대 부족</option><option value="e">기타</option></select><div class="guitar"><div class="form-floating">`;
              // li+=` <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" placeholder="기타 의견을 입력해주세요."></textarea>`;
              // li+=`<label for="floatingTextarea2">개선사항</label></div></div>`;
              // // li+=`<button type="button" class="exitbtn">탈퇴하기</button>`;
              // let btn=`<a href="/board/list"><button type="button" class="btncss" >진행취소</button></a>`;
              // btn+=`<button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="next">탈퇴하기</button>`;
              // document.querySelector('.resultbox').innerHTML=li;
              // document.querySelector('.btnbox').innerHTML=btn;
               // JavaScript 코드
    // resultbox에 내용 추가
    const resultbox = document.querySelector('.resultbox');
    resultbox.innerHTML = `
        <label for="reason">탈퇴 사유</label>
        <select id="reason">
            <option value="a">시스템 에러 및 서비스 속도</option>
            <option value="b">사용빈도가 낮음</option>
            <option value="c">개인정보 노출 우려</option>
            <option value="d">고객 응대 부족</option>
            <option value="e">기타</option>
        </select>
        <div class="guitar">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" placeholder="기타 의견을 입력해주세요."></textarea>
                <label for="floatingTextarea2">개선사항</label>
            </div>
        </div>
    `;

    // btnbox에 버튼 추가
    const btnbox = document.getElementById('btns');

    // "진행취소" 버튼
    const cancelBtn = document.createElement('a');
    cancelBtn.setAttribute('href', '/board/list');
    cancelBtn.innerHTML = '<button type="button" class="btncssa">진행취소</button>';
    btnbox.appendChild(cancelBtn);

    // "탈퇴하기" 버튼
    const withdrawBtn = document.createElement('button');
    withdrawBtn.setAttribute('type', 'button');
    withdrawBtn.classList.add('btncssa');
    withdrawBtn.setAttribute('data-bs-target', '#carouselExampleDark');
    withdrawBtn.setAttribute('data-bs-slide', 'next');
    withdrawBtn.innerHTML = '탈퇴하기';
    btnbox.appendChild(withdrawBtn);
          }else{
              document.querySelector('.resultbox').innerHTML=`<h3>비밀번호가 맞지않습니다.</h3>`;
          }
      })
  })

document.getElementById('exitbtn').addEventListener('click',()=>{
    alert('탈퇴되었습니다.');
})