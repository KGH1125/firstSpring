let isOn = false;

// 알림창
document.getElementById('alarmBtn').addEventListener('click', () => {
  const alarmWindow = document.getElementById('alarmWindow');
  alarmWindow.classList.toggle('hiddenBox'); // 알림창 보임/안보임

  if (!isOn) {
    const id = document.getElementById('alarmBtn').dataset.id;
    alarmWindow.innerHTML = "<div class ='alarmHead'>알람</div>";

    getAlarm(id).then(async result => {
      if (result.length > 0) {
        for (let avo of result) {
          let haertOrComment = "";
          //알람의 타입확인 후 댓글/좋아요 구분
          if (Number(avo.pushType) > 0) {
            haertOrComment = " 댓글을 남겼습니다.";
          } else {
            haertOrComment = " 하트를 눌렀습니다.";
          }
          //알람div생성
          const alarmDiv = document.createElement('div');
          //알람 확인했는지 구분
          if(avo.isCheck>0){
            alarmDiv.classList.add('okcheckBox');
          }else{
            alarmDiv.classList.add('nocheckBox');
          }
          alarmDiv.classList.add('minAlarmBox');
          alarmDiv.setAttribute('data-ano', avo.ano);
          alarmDiv.innerHTML = `
            <a href="/member/mypage?id=${avo.pushId}">${avo.pushName}</a>님이 
            <a href="/board/detail?bno=${avo.bno}">${avo.title}</a>에 ${haertOrComment}
          `;
          //알람창에 알람추가
          alarmWindow.appendChild(alarmDiv);
        }
      }else{
        const zeroAlarmDiv = document.createElement('div');
        zeroAlarmDiv.classList.add('zeroAlarm');
        zeroAlarmDiv.innerText="알람이 없습니다";
        alarmWindow.appendChild(zeroAlarmDiv);
      }
    });

    isOn = true;
  } else {
    isOn = false;
  }
});

// DB에서 알람 가져오기
async function getAlarm(id) {
  try {
    const resp = await fetch('/alarm/getAlarm/' + id);
    const result = await resp.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

// 미확인 알람 개수 띄우기
function check(id) {
  getAlarm(id).then(async result => {
    let noCheck = 0;
    if (result.length > 0) {
      for (let avo of result) {
        let isCheck = avo.isCheck;
        if (isCheck === 0) {
          noCheck++;
          console.log("노체크: " + noCheck);
        }
      }
    }
    if(noCheck>0){
      document.getElementById('alarmBtn').innerHTML = `<div class="countAlarm">${noCheck}</div>`;
    }
  });
}

check(sesId);

// 알람 확인
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nocheckBox')) {
    console.log('노체크박스');
    // 클래스 변경
    e.target.classList.remove('nocheckBox');
    e.target.classList.add('okcheckBox');

    // DB 연동
    let ano = e.target.dataset.ano;
    console.log('ano: ' + ano);
    checkAlarm(ano)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
  }
});

//알람확인했다고 db로 보내기
async function checkAlarm(ano) {
  try {
    const resp = await fetch('/alarm/updateIsCheck/' + ano, {
      method: 'put', 
    });
    const result = await resp.text();
    return result;
  } catch (err) {
    console.log(err);
  }
}

document.addEventListener('click', (e) => {
  const toggleButton = document.getElementById('toggleButton');
  const toggleSearch = document.getElementById('toggleSerch');
  const drdnbtn = document.getElementById('drdnbtn');
  const alarmBtn = document.getElementById('alarmBtn');
  const alarmWindow = document.getElementById('alarmWindow');
  console.log(e.target);
  // 다른 곳 클릭시 검색창 닫기
  if (e.target.id !== "toggleButton") {
    if (toggleSearch.classList.contains('show') && !(toggleSearch.contains(e.target))) {
      toggleButton.click();
      if (e.target.id === "drdnbtn") {
        drdnbtn.click();
      }
      if (e.target.id === "alarmBtn") {
        alarmBtn.click();
      }
    }
  }

  // 다른 곳 클릭시 알람창 닫기
  if (e.target.id !== "alarmBtn") {
    if(!(e.target.classList.contains('minAlarmBox'))){
    if (!alarmWindow.classList.contains('hiddenBox') && !(e.target.classList.contains('alramBox'))) {
      alarmBtn.click();
      if (e.target.id === "drdnbtn") {
        drdnbtn.click();
      }
    }
  }
}
});