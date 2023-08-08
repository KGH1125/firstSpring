getFollowList(id,ses);

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('followBtn')) {
    console.log(e.target);
    let userId = e.target.dataset.id;
    let sessionId = e.target.dataset.ses;

    console.log('userId', userId, 'sessionId', sessionId);
    if (e.target.classList.contains('unfollowBtn')) {
      unfollowUser(userId, sessionId).then(result => {
        e.target.textContent = '팔로우';
      });
    } else {
      followUser(userId, sessionId).then(result => {
        e.target.textContent = '언팔로우';
      });
    }
    e.target.classList.toggle('unfollowBtn');
  }
});

async function followUser(userId, sessionId) {
  let followData = {
    following: userId,
    follower: sessionId
  }

  try {
    const url = '/member/follow';
    const config = {
      method: "post",
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(followData)
    }
    const resp = await fetch(url, config);
    const result = await resp.text();
  } catch (err) {
    console.log(err);
  }
}

//팔로잉 리스트
async function spreadFollowingList(id) {
  console.log(id);
  try {
    const resp = await fetch('/member/followinglist/' + id);
    const result = await resp.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

function getFollowList(id, ses) {
  console.log('id',id,'ses',ses);
  let sesfollowingList = [];
  spreadFollowingList(ses).then(result => {
    const followzone = document.getElementById('followZone');
    for (let user of result) {
      if (user.id == ses) {
        sesfollowingList = user.following.split(",");
        console.log('ses의 팔로잉 리스트' + sesfollowingList);
        for (let following of sesfollowingList) {
          if (following == id) {
            document.querySelector('.followBtn').classList.add('unfollowBtn');
            document.querySelector('.followBtn').textContent = '언팔로우';
          }
        }
      }
    }
  })

  spreadFollowingList(id).then(result => {
    console.log('페이지 >>>>', id);
    const followingbody = document.getElementById('followingtable');
    let followingCnt = 0;
    let followingList = [];
    for (let user of result) {
      if (user.follower != null && user.follower !== '') {
        let list1 = user.follower.split(",");
        console.log(list1);

        for (let following of list1) {
          if (following == id) {
            followingList.push(following);
            let table = `<tr class="followbox"><td class="followimg"><img alt="" src="/upload/profile/${user.imgFile }"></td>`;
            table += `<td class="followname"><a href="/member/mypage?id=${user.id}">${user.name }</a></td>`;
            if (user.id != ses) {
              table += `<td class="followbutton"><button type="button" class="followBtn unfollowBtn" data-id="${user.id}" data-ses="${ses}">언팔로우</button></td>`;
            }
            table += `</tr>`;

            followingbody.innerHTML += table;
            followingCnt++;
          }
        }
      }
    }
    if (followingCnt === 0) {
      followingbody.innerHTML = '<h3>팔로잉 목록이 없습니다.</h3>';
    }
    document.getElementById('followingCnt').innerHTML = `팔로잉&nbsp;&nbsp;&nbsp;&nbsp;${followingCnt}명`;
    console.log(id,'팔로잉리스트', followingList);

    const followerbody = document.getElementById('followertable');
    let followerCnt = 0;
    let followerList = [];
    for (let user of result) {
      if (user.following != null && user.following !== '') {
        let list2 = user.following.split(",");
        console.log(list2);

        for (let follower of list2) {
          if (follower == id) {
            followerList.push(follower);
            let table = `<tr class="followbox"><td class="followimg"><img alt="" src="/upload/profile/${user.imgFile }"</td>`;
            table += `<td class="followname"><a href="/member/mypage?id=${user.id}">${user.name }</a></td>`;
            if (user.id != ses) {
              if (sesfollowingList.includes(user.id)) {
                table += `<td class="followbutton"><button type="button" class="followBtn unfollowBtn" data-id="${user.id}" data-ses="${ses}">언팔로우</button></td>`;
              } else {
                table += `<td class="followbutton"><button type="button" class="followBtn" data-id="${user.id}" data-ses="${ses}">팔로우</button></td>`;
              }
            }
            table += `</tr>`;
            followerbody.innerHTML += table;
            followerCnt++;
          }
        }
      }
    }
    if (followerCnt === 0) {
      followerbody.innerHTML = '<h4>팔로워 목록이 없습니다.</h4>';
    }
    document.getElementById('followerCnt').innerHTML = `팔로워&nbsp;&nbsp;&nbsp;&nbsp;${followerCnt}명`;
    console.log(id,'팔로워리스트', followerList);
  })
}


async function unfollowUser(id, ses) {
  let followData = {
    following: id,
    follower: ses
  }
  console.log('id',id, 'ses',ses);
  try {
    const url = '/member/';
    const config = {
      method: "delete",
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(followData)
    }
    const resp = await fetch(url, config);
    const result = await resp.text();
  } catch (err) {
    console.log(err);
  }
}

// 페이지 가지고오기
let selectPorL = 0;

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('myPostTab').style.display = 'none';
  document.querySelector('.mylike').classList.add('selected');
  document.querySelector('.mylike .underline').classList.add('underlinedeco');

  const tabItems = document.querySelectorAll('.ulbutton li');
  tabItems.forEach(function(item) {

    item.addEventListener('click', function() {

      // 선택된 탭의 클래스를 변경하고 나머지 탭의 클래스를 제거합니다.
      tabItems.forEach(function(tab) {
        if (tab === item) {
          tab.classList.add('selected');
          tab.querySelector('.underline').classList.add('underlinedeco');
        } else {
          tab.classList.remove('selected');
          tab.querySelector('.underline').classList.remove('underlinedeco');
          if (item.classList.contains('mylike')) {
            selectPorL = 0;
          } else if (item.classList.contains('mypost')) {
            selectPorL = 1;
          }
        }
      });
      console.log(selectPorL);

      if (item.classList.contains('mypost')) {
        document.getElementById('myLikeTab').style.display = 'none';
        document.getElementById('myPostTab').style.display = 'block';
      } else if (item.classList.contains('mylike')) {
        document.getElementById('myPostTab').style.display = 'none';
        document.getElementById('myLikeTab').style.display = 'block';
      }
    });

  });
});


async function getList(apiURL, pageNo, keyword) {
  console.log("가지고온 페이지: " + pageNo);

  try {
    const resp = await fetch(apiURL + pageNo + '-' + keyword);
    const result = await resp.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

let p = postdivid - 1; // 마지막으로 만들어진 pbox
let l = likedivid - 1; // 마지막으로 만들어진 lbox
let isHandlingScroll = false; // 중복 실행 방지를 위한 변수
const boxCount = 12; // 한 번에 생성할 박스 개수
let likepag = 2; // 불러올 시작 페이지
let postpag = 2;

function handleScroll() {
  // 이미 실행 중인 경우, 더 이상의 처리를 하지 않고 종료
  if (isHandlingScroll) {
    return;
  }

  isHandlingScroll = true; // 실행 중 표시

  let myDiv;
  let rect;
  let targetPage;
  let apiURL;

  // 선택된 카테고리에 따라 처리
  if (selectPorL === 0) {
    if (likedivid > 0) {
      myDiv = document.getElementById('lbox' + l);
      rect = myDiv.getBoundingClientRect();
      targetPage = likepag;
      apiURL = '/board/likelist/';
    }
  } else if (selectPorL === 1) {
    if (postdivid > 0) {
      myDiv = document.getElementById('pbox' + p);
      rect = myDiv.getBoundingClientRect();
      targetPage = postpag;
      apiURL = '/board/postlist/';
    }
  }

  // 해당 div가 없으면 종료
  if (myDiv == null || myDiv === '') {
    isHandlingScroll = false;
    return;
  }

  // 화면 중앙을 기준으로 div가 위에 있는지 확인
  let windowHeight = window.innerHeight || document.documentElement.clientHeight;
  let viewportY = (windowHeight / 4) * 3;

  if (rect.top + rect.height / 2 < viewportY) {
    // 처리할 div가 화면의 중앙보다 위에 있을 경우
    console.log('div' + (selectPorL === 0 ? 'l' : 'p') + l + '가 화면의 중앙보다 위에 있습니다.');

    let keyword = id; // 검색어 가져오기

    getList(apiURL, targetPage, keyword)
      .then(async (BoardUserDTO) => {
        if (BoardUserDTO === null || BoardUserDTO === undefined || BoardUserDTO.length === 0) {
          console.log("BUDTO값이 없습니다.");
          return;
        } else {
          for (let i = 0; i < BoardUserDTO.length; i++) {
            // 선택된 카테고리에 따라 div 번호 증가
            if (selectPorL === 0) {
              l += 1;
              console.log('divl' + l + ' 생성!');
            } else if (selectPorL === 1) {
              p += 1;
              console.log('divp' + p + ' 생성!');
            }

            // 좋아요와 관련된 처리
            let previousDiv = document.getElementById(`${selectPorL === 0 ? 'lbox' : 'pbox'}${selectPorL === 0 ? l - 1 : p - 1}`);
            const bvo = BoardUserDTO[i].bvo;
            const uvo = BoardUserDTO[i].uvo;
            let fvo;
            if (BoardUserDTO.flist === undefined || BoardUserDTO.flist.length === 0) { // 사진 없을 경우
              fvo = null;
            } else {
              fvo = BoardUserDTO.flist[0];
            }

            // 사진 유무에 따라 midBox 변경
            let midBox;
            if (fvo === null) {
              midBox = `<div class="titleBox midBox">${bvo.title}</div>`;
            } else {
              midBox = `<img class="thumbnail midBox" src="/upload/${fvo.saveDir.replace(/\\/g, '/')}/${fvo.uuid}_${fvo.fileName}" alt="이미지">`;
            }

            // 좋아요 처리
            let str = bvo.likeUser;
            let likeUserArr = [];
            let likeCount = 0;
            let isLike = false;

            // 좋아요 문자열을 좋아요 배열로 변경
            if (str !== null) {
              likeUserArr = str.split('#').filter(function (item) {
                return item !== '';
              });
            }

            // 좋아요 눌렀었나?
            for (let j = 0; j < likeUserArr.length; j++) {
              let likeUser = likeUserArr[j];
              if (likeUser === ses) {
                isLike = true;
                break;
              }
              likeCount++;
            }

            // 알맞은 좋아요 버튼 생성
            let buttonStr = "";
            if (bvo.id !== ses) {
              if (isLike) {
                buttonStr = `<i class="bi bi-heart-fill hateBtn"></i>`;
              } else {
                buttonStr = `<i class="bi bi-heart likeBtn"></i>`;
              }
            }

            // pp div 생성
            previousDiv.insertAdjacentHTML('afterend', `
              <div class="pp" id="${selectPorL === 0 ? 'lbox' : 'pbox'}${selectPorL === 0 ? l : p}">
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

            console.log('div' + (selectPorL === 0 ? 'l' : 'p') + '생성!');
            // selectPorL === 0 ? l++ : p++;
          }
        }

        // 다음 페이지 번호 증가
        if (selectPorL === 0) {
          likepag += 1;
          console.log("다음 like 페이지: " + likepag);
        } else if (selectPorL === 1) {
          postpag += 1;
          console.log("다음 post 페이지: " + postpag);
        }

        isHandlingScroll = false; // 실행 종료 표시
        toggleClass();
      })
      .catch(error => {
        console.error(error);
        isHandlingScroll = false; // 실행 종료 표시
      });
  } else {
    isHandlingScroll = false; // 실행 종료 표시
  }
}


window.addEventListener('scroll', handleScroll);






//

// let lastid = 39; // 마지막으로 만들어진 div id
// let isHandlingScroll = false; // 중복 실행 방지를 위한 변수
// const qty = 40; // 한 번에 생성할 박스 개수
// let pag = 2; // 불러올 시작 페이지

// function handleScroll() {
//   if (isHandlingScroll) {
//     return; // 이미 실행 중인 경우, 더 이상의 처리를 하지 않고 종료
//   }
//   isHandlingScroll = true; // 실행 중 표시
//   let myDiv = document.getElementById('box' + lastid);
//   if (myDiv) {
//     let rect = myDiv.getBoundingClientRect();
//     let windowHeight = window.innerHeight || document.documentElement.clientHeight;
//     let viewportY = (windowHeight / 4) * 3;
//     if (rect.top + rect.height / 2 < viewportY) {
//       console.log('div' + lastid + '가 화면의 중앙보다 위에 있습니다.');
//       let keyword = document.getElementById("searchInput").getAttribute("data-keyword"); // 검색어 가져오기
//       getBoardList(pag,keyword,qty).then((BoardUserDTO)=>{
//         if (BoardUserDTO === null || BoardUserDTO === undefined || BoardUserDTO.length === 0) {
//           console.log("BUDTO값이 없습니다.");
//           return;
//         }else{
//           for(let i = 0; i<BoardUserDTO.length ; i++){
//             let previousDiv = document.getElementById(`box${lastid}`);//마지막으로 만들어진 div
            
//             const bvo = BoardUserDTO[i].bvo;
//             const uvo = BoardUserDTO[i].uvo;
//             let fvo;
//             if (BoardUserDTO.flist === undefined || BoardUserDTO.flist.length  === 0) { //사진 있다면 첫번째사진 없다면 null
//               fvo = null;
//             } else {
//               fvo = BoardUserDTO.flist[0];
//             }

//             //사진 유무 따라 midBox변경
//             if (fvo === null) {
//               midBox = `<div class="titleBox midBox" >
//                 ${bvo.title}
//               </div>`;
//             } else {
//               midBox = `<img class="thumbnail midBox" src="/upload/${fvo.saveDir.replace(/\\/g, '/')}/${fvo.uuid}_${fvo.fileName} alt="이미지" >`;
//             }

//             //좋아요
//             let str = bvo.likeUser; //좋아요 문자열(#aa#bb#cc)
//             let likeUserArr = []; //좋아요 배열(aa, bb, cc)
//             let likeCount = 0; //좋아요 개수
//             let isLike = false; //좋아요 눌림상태
//             let buttonStr = ""; //만들어질 좋아요 버튼
//             //좋아요 문자열을 좋아요 배열로 변경
//             if (str !== null) {
//               likeUserArr = str.split('#').filter(function (item) {
//                 return item !== '';
//               });
//             }
//             //좋아요 눌렀었나?
//             for (let j = 0; j < likeUserArr.length; j++) {
//               let likeUser = likeUserArr[j];
//               if (likeUser === sesid) {
//                 isLike = true;
//                 break;
//               }
//               likeCount++;
//             }
//             //알맞은 좋아요 버튼 생성
//             if (bvo.id != sesId) {
//               if (isLike) {
//                 buttonStr = `<i class="bi bi-heart-fill hateBtn"></i>`;
//               } else {
//                 buttonStr = ` <i class="bi bi-heart likeBtn"></i>`;
//               }
//             }

//             //pp div생성
//             previousDiv.insertAdjacentHTML('afterend', `
//             <div class="pp" id="box${lastid+1}">
//               <div class="contentBox" data-bno="${bvo.bno}" data-title="${bvo.title}" data-boardid="${bvo.id}">
//                 ${midBox}
//                 <div class="overlayBox" onclick="window.location.href = '/board/detail?bno=${bvo.bno}';"></div>
//                 <div class="profile hid hiddenText">
//                   <a href="/member/mypage?id=${bvo.id}"><img alt="" src="/upload/profile/${uvo.imgFile}" style="width: 30px; height: 30px;"></a>
//                   <a href="/member/mypage?id=${bvo.id}">${uvo.name}</a>
//                 </div>
//                 <div class="minBox">
//                   <span class="tspan hid hiddenText">${likeCount}</span>
//                   ${buttonStr}
//               </div>
//               </div>
//             </div>
//             `);

//             console.log('div' + lastid + '생성!');
//             lastid++;

//           }
//           pag ++;
//           console.log("다음 페이지: " + pag);
//           isHandlingScroll = false; // 실행 종료 표시

//         }

//       })
//       toggleClass();
//     } else {
//       isHandlingScroll = false; // 실행 종료 표시
//     }
//   } else {
//     console.log('요소를 찾을 수 없습니다.');
//   }
// }



// // 스크롤 이벤트에 handleScroll 함수를 연결합니다.
// window.addEventListener('scroll', handleScroll);

// // 페이지All 가지고오기
// async function getBoardList(pageNo, keyword, qty) {
//   console.log("가지고온 페이지: " + pageNo);
//   try {
//     const resp = await fetch('/board/glist/' + pageNo + '-' + keyword +'-'+qty);
//     const result = await resp.json();
//     return result;
//   } catch (err) {
//     console.log(err);
//   }

// }


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
    putAlarm(bno, title, boardid, ses, sesName, pushType);
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

  DBlikeToggle(bno, ses).then(result => {
    let tspan = e.target.closest('div').querySelector('.tspan');
    tspan.textContent = result;
  });
}

// 좋아요 변환
async function DBlikeToggle(bno, ses) {
  try {
    const url = '/board/likeToggle/' + bno + "/" + ses;
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
async function putAlarm(bno, title, boardid, ses, sesName, pushType) {
  try {
    const url = "/alarm/push";
    const data = {
      bno: bno,
      title: title,
      id: boardid,
      pushId: ses,
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

