const emojiList = ['😃', '👍', '❤️', '😊', '🎉'];


document.getElementById('toggleComment').addEventListener('click', () => {
    // commentContainer 요소에 대한 참조 가져오기
    const commentContainer = document.getElementById('commentContainer');
    const tH1 = document.getElementById('tH1');
    // commentContainer 요소의 가시성(visibility) 토글
    if (commentContainer.style.display === 'none') {
        tH1.innerText= '';
        tH1.innerHTML= '댓글 ▽';
        commentContainer.style.display = 'block';
    } else {
        tH1.innerText= '';
        tH1.innerHTML= '댓글 ▷';
        commentContainer.style.display = 'none';
    }
});

const likeImg = document.getElementById('likeImg');
let liked = false;

likeImg.addEventListener('click', () => {
  liked = !liked; // 클릭할 때마다 liked 변수를 토글합니다.

  // liked 변수의 상태에 따라 하트 이모지의 색상 클래스를 toggle합니다.
  if (liked) {
    likeImg.innerText = '❤️';
    likeImg.classList.add('red-heart'); // red-heart 클래스 추가
  } else {
    likeImg.innerText = '🤍';
    likeImg.classList.remove('red-heart'); // red-heart 클래스 제거
  }
});

async function postCommentToServer(cmtData) {
    try {
        const url = '/comment/post';
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(cmtData)
        };
        const resp = await fetch(url, config);
        const result = await resp.text(); //isOK
        return result;
    } catch (err) {
        console.log(err);
    }
}
//댓글등록
document.getElementById('cmtPostBtn').addEventListener('click', (e) => {
    const cmtText = document.getElementById('cmtText').value;
    const bno = e.target.dataset.bno; // data-bno 값 가져오기
    const title = e.target.dataset.title; // data-title 값 가져오기
    const boardid = e.target.dataset.boardid; // data-boardid 값 가져오기


   
    console.log(cmtText);
    if (cmtText === "" || cmtText === null) {
        alert("내용을 입력해주세요");
        document.getElementById('cmtText').focus();
        return false;
    } else {
        let cmtData = {
            bno: bnoVal,
            id: document.getElementById('cmtWriter').innerText,
            ccontent: cmtText
        };
        console.log(cmtData);
        const pushType = 1;
        putAlarm(bno, title, boardid, sesId, sesName, pushType);
        postCommentToServer(cmtData).then(result => {
            //isOk 확인 데이터
            if (result > 0) {
                alert("댓글 등록이 완료되었습니다.");
                getCommentList(cmtData.bno);
                document.getElementById('cmtText').value = '';
            }
        });
    }
});

document.getElementById('emojiBtn').addEventListener('click', () => {
    const emojiContainer = document.getElementById('emojiContainer'); // 이모티콘 목록을 담을 요소



    emojiContainer.innerHTML = ''; // 목록을 비웁니다
    emojiList.forEach(emoji => {
        const emojiButton = document.createElement('button');
        emojiButton.classList.add('emojiItem');
        emojiButton.textContent = emoji;

        emojiButton.addEventListener('click', () => {
            const cmtText = document.getElementById('cmtText');
            cmtText.value += emoji; // 선택한 이모티콘을 댓글 텍스트 필드에 추가합니다
            emojiContainer.innerHTML = ''; // 이모티콘 목록을 숨깁니다
        });
        emojiContainer.appendChild(emojiButton);
    });
});

async function spreadCommentFromServer(bno) {
    console.log(bno);
    try {
        const resp = await fetch('/comment/' + bno);
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}
//댓글불러오기
function getCommentList(bno) {
    spreadCommentFromServer(bno).then(result => {
        console.log(result);
        
        const ul = document.getElementById('cmtListArea');
        if (result.length > 0) {
            ul.innerHTML = "";
            for (let cvo of result) {
                const li = document.createElement('li');
                li.setAttribute('data-cno', cvo.cno);

                const div = document.createElement('div');
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'cmtTextMod'; // Note: Change id to class to use multiple inputs.
                input.value = cvo.ccontent;
                div.appendChild(input);

                const writerSpan = document.createElement('span');
                writerSpan.textContent = cvo.id;

                const dateSpan = document.createElement('span');
                dateSpan.textContent = cvo.regDate;

                const modBtn = document.createElement('button');
                modBtn.type = 'button';
                modBtn.classList.add('modBtn');
                modBtn.textContent = '%';

                const delBtn = document.createElement('button');
                delBtn.type = 'button';
                delBtn.classList.add('delBtn');
                delBtn.textContent = 'x';
                console.log(cvo.id);
                console.log(sesVal);
                // cvo.id와 ses.id를 비교하여 버튼 보이기/숨기기 처리
                
                li.appendChild(div);
                li.appendChild(writerSpan);
                li.appendChild(dateSpan);
                if (cvo.id === sesVal) {
                    li.appendChild(modBtn);
                    li.appendChild(delBtn);
                }

                ul.appendChild(li);
            }
        } else {
            let li = `<li>무플 방지 will원회 출동</li>`;
            ul.innerHTML += li;
        }
        // location.reload();
    });
}



//댓글수정
async function editCommentToServer(cmtDataMod) {
    try {
        const url = '/comment/' + cmtDataMod.cno;
        const config = {
            method: 'put',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(cmtDataMod)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}
//댓글삭제
async function removeCommentToServer(cno) {
    try {
        const url = '/comment/' + cno;
        const config = {
            method: 'delete'
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener('click', e => {
    console.log(e.target);


    if (e.target.classList.contains('thImg')) {
        
      e.preventDefault();
  
      // 클릭된 thumb 엘리먼트의 ID 가져오기
      const clickedThumbID = e.target.id;
        console.log(clickedThumbID);
      // thumb 엘리먼트의 ID와 일치하는 data-bs-slide-to 값 찾기
      const slideToElements = document.querySelectorAll("[data-bs-slide-to]");
    console.log(slideToElements);
      let targetSlideTo;
      for (const slideToElement of slideToElements) {
        if (slideToElement.getAttribute("data-bs-slide-to") === clickedThumbID) {
          targetSlideTo = slideToElement;
          console.log(targetSlideTo);
          break;
        }
      }
  
      // 찾은 data-bs-slide-to의 li 엘리먼트 클릭 이벤트 발생 시키기
      if (targetSlideTo) {
        targetSlideTo.click();
      }
    }


    if (e.target.classList.contains('modBtn')) {
        console.log("수정버튼 클릭시");
        //내가 클릭한 버튼의 댓글 뭉치
        let li = e.target.closest('li');
        let cnoVal = li.dataset.cno;
        let textContent = li.querySelector('#cmtTextMod').value;
        console.log("cno / content   => " + cnoVal + "  " + textContent);

        let cmtDataMod = {
            cno: cnoVal,
            ccontent: textContent
        };
        console.log(cmtDataMod);
        //서버 연결
        editCommentToServer(cmtDataMod).then(result => {
            if (parseInt(result) > 0) {
                alert('댓글 수정이 완료되었습니다.');
            }
            getCommentList(bnoVal);
        });
    } else if (e.target.classList.contains('delBtn')) {
        console.log("삭제버튼 클릭시");
        let li = e.target.closest('li');
        let cnoVal = li.dataset.cno;
        console.log(cnoVal);
        removeCommentToServer(cnoVal).then(result => {
            if (result > 0) {
                alert('댓글 삭제가 완료되었습니다.');
            }
            getCommentList(bnoVal);
        });
    }
});

//알람
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