  // JavaScript (script.js)
  window.addEventListener('load', function() {
    // 페이지 로딩 시 디브를 숨깁니다.
    const fullScreenDiv = document.getElementById('fullScreenDiv');
    fullScreenDiv.style.display = 'none';
  
    if(msg_login==3){
     fullScreenDiv.style.display='block';     	
    }
    setTimeout(function() {
      fullScreenDiv.style.display = 'none';
    }, 3000); // 3000 밀리초 = 3초
  });
  

let lastid = 39; // 마지막으로 만들어진 div id
let isHandlingScroll = false; // 중복 실행 방지를 위한 변수
const qty = 40; // 한 번에 생성할 박스 개수
let pag = 2; // 불러올 시작 페이지

function handleScroll() {
  if (isHandlingScroll) {
    return; // 이미 실행 중인 경우, 더 이상의 처리를 하지 않고 종료
  }
  isHandlingScroll = true; // 실행 중 표시
  let myDiv = document.getElementById('box' + lastid);
  if (myDiv) {
    let rect = myDiv.getBoundingClientRect();
    let windowHeight = window.innerHeight || document.documentElement.clientHeight;
    let viewportY = (windowHeight / 4) * 3;
    if (rect.top + rect.height / 2 < viewportY) {
      console.log('div' + lastid + '가 화면의 중앙보다 위에 있습니다.');
      let keyword = document.getElementById("searchInput").getAttribute("data-keyword"); // 검색어 가져오기
      getBoardList(pag,keyword,qty).then((BoardUserDTO)=>{
        if (BoardUserDTO === null || BoardUserDTO === undefined || BoardUserDTO.length === 0) {
          console.log("BUDTO값이 없습니다.");
          return;
        }else{
          for(let i = 0; i<BoardUserDTO.length ; i++){
            let previousDiv = document.getElementById(`box${lastid}`);//마지막으로 만들어진 div
            
            const bvo = BoardUserDTO[i].bvo;
            const uvo = BoardUserDTO[i].uvo;
            let fvo;
        //     if (BoardUserDTO.flist === undefined || BoardUserDTO.flist.length  === 0) { //사진 있다면 첫번째사진 없다면 null
        //       fvo = null;
        //     } else {
        //       fvo = BoardUserDTO.flist[0];
        //     }
        if (BoardUserDTO[i].flist === undefined || BoardUserDTO[i].flist.length  === 0) { //사진 있다면 첫번째사진 없다면 null
          fvo = null;
        } else {
          fvo = BoardUserDTO[i].flist[0];
        }

        //사진 유무 따라 midBox변경
        if (fvo === null) {
          midBox = `<div class="titleBox midBox" >
            ${bvo.title}
          </div>`;
        } else {
          midBox = `<img class="thumbnail midBox" src="/upload/${fvo.saveDir.replace(/\\/g, '/')}/${fvo.uuid}_${fvo.fileName}" alt="이미지" >`;
        }

            // //사진 유무 따라 midBox변경
            // if (fvo === null) {
            //   midBox = `<div class="titleBox midBox" >
            //     ${bvo.title}
            //   </div>`;
            // } else {
            //   midBox = `<img class="thumbnail midBox" src="/upload/${fvo.saveDir.replace(/\\/g, '/')}/${fvo.uuid}_${fvo.fileName} alt="이미지" >`;
            // }

            //좋아요
            let str = bvo.likeUser; //좋아요 문자열(#aa#bb#cc)
            let likeUserArr = []; //좋아요 배열(aa, bb, cc)
            let likeCount = 0; //좋아요 개수
            let isLike = false; //좋아요 눌림상태
            let buttonStr = ""; //만들어질 좋아요 버튼
            //좋아요 문자열을 좋아요 배열로 변경
            if (str !== null) {
              likeUserArr = str.split('#').filter(function (item) {
                return item !== '';
              });
            }
            //좋아요 눌렀었나?
            for (let j = 0; j < likeUserArr.length; j++) {
              let likeUser = likeUserArr[j];
              if (likeUser === sesId) {
                isLike = true;
                break;
              }
              likeCount++;
            }
            //알맞은 좋아요 버튼 생성
            if (bvo.id != sesId) {
              if (isLike) {
                buttonStr = `<i class="bi bi-heart-fill hateBtn"></i>`;
              } else {
                buttonStr = ` <i class="bi bi-heart likeBtn"></i>`;
              }
            }

            //pp div생성
            previousDiv.insertAdjacentHTML('afterend', `
            <div class="pp" id="box${lastid+1}">
              <div class="contentBox" data-bno="${bvo.bno}" data-title="${bvo.title}" data-boardid="${bvo.id}">
                ${midBox}
                <div class="overlayBox" onclick="window.location.href = '/board/detail?bno=${bvo.bno}';"></div>
                <div class="profile hid hiddenText">
                  <a href="/member/mypage?id=${bvo.id}"><img alt="" src="/upload/profile/${uvo.imgFile}" style="width: 30px; height: 30px;"></a>
                  <a href="/member/mypage?id=${bvo.id}">${uvo.name}</a>
                </div>
                <div class="minBox">
                  <span class="tspan hid hiddenText">${likeCount}</span>
                  ${buttonStr}
              </div>
              </div>
            </div>
            `);

            console.log('div' + lastid + '생성!');
            lastid++;

          }
          pag ++;
          console.log("다음 페이지: " + pag);
          isHandlingScroll = false; // 실행 종료 표시

        }
        toggleClass();
      })
      
    } else {
      isHandlingScroll = false; // 실행 종료 표시
    }
  } else {
    console.log('요소를 찾을 수 없습니다.');
  }
}



// 스크롤 이벤트에 handleScroll 함수를 연결합니다.
window.addEventListener('scroll', handleScroll);

// 페이지All 가지고오기
async function getBoardList(pageNo, keyword, qty) {
  console.log("가지고온 페이지: " + pageNo);
  try {
    const resp = await fetch('/board/glist/' + pageNo + '-' + keyword +'-'+qty);
    const result = await resp.json();
    return result;
  } catch (err) {
    console.log(err);
  }

}


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

//신고
document.getElementById('listBlackBtn').addEventListener('click',()=>{
  let bno = document.getElementById('listBlackBtn').dataset.id;
  listBlackPlus(bno);
})
async function listBlackPlus(bno) {
  try {
    const url = '/board/listBlackPlus/' + bno;
    const config = { method: 'put' };
    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
  } catch (error) {
    console.log(error);
  }
}

