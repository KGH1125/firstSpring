//클릭이벤트
document.addEventListener('click', (e) => {
  console.log('클릭');
  if (e.target.classList.contains('likeBtn')){ //좋아요
    console.log('좋아요');

    const div = e.target.closest('.contentBox');
    const bno = div.dataset.bno;
    const title = div.dataset.title;
    const boardid = div.dataset.boardid;

    likeToggle(e, bno);

    const pushType = 0; //좋아요는 0 ,댓글은 1
    putAlarm(bno, title, boardid, sesId, sesName, pushType);
  }else if (e.target.classList.contains('hateBtn')){//좋아요 취소
    console.log('좋아요 취소');

    const div = e.target.closest('.contentBox');
    const bno = div.dataset.bno;

    likeToggle(e, bno);
  }

});

//좋아요 토글
function likeToggle(e,bno){
  e.target.classList.toggle('likeBtn');
  e.target.classList.toggle('hateBtn');
  e.target.classList.toggle('bi-heart-fill');
  e.target.classList.toggle('bi-heart');

  DBlikeToggle(bno, sesId).then(result => {
    let tspan = e.target.closest('div').querySelector('.tspan');
    tspan.textContent = result;
  });
}

// 좋아요 변환
async function DBlikeToggle(bno, sesId) {
  try {
    const url = '/board/likeToggle/' + bno + "/" + sesId;
    const config = { method: 'put' };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
  } catch (error) {
    console.log(error);
  }
}

//마우스 오버 이벤트
function toggleClass() {
  let contentBoxes = document.querySelectorAll('.contentBox');
  console.log(contentBoxes);

  contentBoxes.forEach((contentBox) => {
    // 마우스 올렸을 때 
    contentBox.addEventListener('mouseenter', (e) => {
      const target =  e.currentTarget;
      target.querySelectorAll('.hid').forEach((element) => {
        element.classList.remove('hiddenText');
      });
    });

    // 마우스 나갔을 때
    contentBox.addEventListener('mouseleave', (e) => {
      const target =  e.currentTarget;
      target.querySelectorAll('.hid').forEach((element) => {
        element.classList.add('hiddenText');
      });
    });
  });
}

toggleClass();

// 알람 DB에 저장
async function putAlarm(bno, title, boardid, sesId, sesName, pushType) {
  try {
    const url = "/alarm/push";
    const data = {
      bno: bno,
      title: title,
      id: boardid,
      pushId: sesId,
      pushName: sesName,
      pushType: pushType
    };
    const config = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
  } catch (error) {
    console.log(error);
  }
}
