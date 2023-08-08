let filesArr = [];

const regExp = new RegExp("\.(exe|sh|bat|msi|dll|js)$"); // 실행파일 막기
const regExpImg = new RegExp("\.(jpg|jpeg|png|gif|bmp)$"); // 이미지파일
const maxSize = 1024 * 1024 * 20; // 20MB보다 큰지 확인

function fileSizeValidation(fileName, fileSize) {
  if (regExp.test(fileName)) {
    // 실행파일인 경우
    return 0;
  } else if (fileSize > maxSize) {
    return 0;
  } else if (!regExpImg.test(fileName)) {
    // 이미지 파일이 아닌 경우 첨부 X
    return 0;
  } else {
    return 1;
  }
}

function generateUniqueUUID() {
  // UUID 생성 로직 구현
  // 예시: UUID를 생성하는 코드
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return uuid;
}


document.getElementById('file').addEventListener('change', (e) => {
  let isOk = 1;
  const newFiles = Array.from(e.target.files);

  for (let file of newFiles) {
    let validResult = fileSizeValidation(file.name, file.size);
    isOk *= validResult;
  }

  if (isOk == 1) {
    filesArr = filesArr.concat(newFiles);
  } else {
    alert('업로드 불가능');
  }

  console.log(newFiles);
  handleFiles(filesArr);
});



function handleFiles(filesArr) {

  const dataTransfer = new DataTransfer();
  for (let file of filesArr) {
    dataTransfer.items.add(file);
  }

  const fileInput = document.getElementById('file');
  fileInput.files = dataTransfer.files;

  let i = 0; // 인덱스 변수 초기화
  const carouselInner = document.getElementById('carousel-inner');
  const carouselIndicators = document.getElementById('carousel-indicators');

  for (const file of filesArr) {
    if (typeof file.uuid === "undefined") {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(file.uuid);

        const uniqueUUID = generateUniqueUUID();
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.classList.add('imgItem');
        carouselItem.setAttribute('data-uuid', uniqueUUID);

        file.uuid = uniqueUUID;

        console.log(file.name);
        console.log(file.uuid);
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('d-block', 'w-100');
        img.alt = '...';
        img.style.height = '500px';
        img.style.width = '500px';

        const li = document.createElement('li');
        li.dataset.bsTarget = '#carouselExampleIndicators';

        let currentIndex = carouselIndicators.querySelectorAll("li").length;
        li.dataset.bsSlideTo = currentIndex;

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(li);

        if (currentIndex === 0) {
          carouselItem.classList.add('active');
          li.setAttribute('aria-current', true);
          li.classList.add('active');
        }

        const thDiv = document.getElementById('thBox');

        const th = document.createElement('div');
        th.classList.add('thumb');
        th.classList.add(`${i}`);
        th.setAttribute('data-uuid', uniqueUUID);
        th.setAttribute('data-name', file.name);

        const thImg = document.createElement('img');
        thImg.src = e.target.result;
        thImg.classList.add('thImg');
        thImg.style.height = '75px';
        thImg.style.width = '75px';
        thImg.setAttribute('id', `${carouselInner.children.length - 1}`);

        const xicon = document.createElement('i');
        xicon.classList.add('bi');
        xicon.classList.add('bi-x-circle-fill');
        xicon.classList.add('delete-button');
        xicon.setAttribute('id', 'delBtn');

        thDiv.appendChild(th);
        th.appendChild(thImg);
        th.appendChild(xicon);
        i++;
      };

      reader.readAsDataURL(file);
    } else {
      break;
    }
  }
}

// 삭제버튼 서버로 보내기
async function removeFileToServer(uuid) {
  try {
    const url = '/board/file/' + uuid;
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

// file delete 
document.addEventListener('click', (e) => {



  if (e.target.id === 'trigger') {
    e.stopPropagation();
    document.getElementById('file').click();
  }

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


  // db에 저장 안되어 있는 파일 삭제처리 
  if (e.target.classList.contains('newBtn')) {

    

    e.preventDefault();
    const ol = document.getElementById('carousel-indicators');
    const lastLi = ol.lastElementChild;

    let thumbDiv = e.target.closest('.thumb');
    let uuid = thumbDiv.getAttribute("data-uuid");

    //이미지 안쪽 버튼삭제
    //썸네일 이미지삭제
    thumbDiv.remove();
    ol.removeChild(lastLi);

    var carouselInner = document.querySelector(".carousel-inner");
    var carouselItems = carouselInner.querySelectorAll(".carousel-item");
    // 메인이미지의 uuid와 비교하여 같으면 삭제
    for (var j = carouselItems.length - 1; j >= 0; j--) {
      if (carouselItems[j].getAttribute("data-uuid") === uuid) {
      
          if (carouselItems[j].classList.contains('active')) {
            if(j === carouselItems.length-1) {
              carouselItems[j-1].classList.add('active');
  
              const lastLi1 = ol.lastElementChild;
              lastLi1.classList.add('active');
              lastLi1.setAttribute('aria-current','true');
              carouselItems[j].remove();
             
            } else {
              carouselItems[j + 1].classList.add('active');
              carouselItems[j].remove();
            }
          }
      } 
    }

    const index = thumbDiv.classList[1]; // 이미지 파일명과 일치하는 인덱스 찾기

    if (index !== -1) {
      filesArr.splice(index, 1); // 배열에서 이미지 삭제

      const thImgs = document.querySelectorAll('.thImg');
      thImgs.forEach((thImg, i) => {
        thImg.setAttribute('id', `${i}`);
      });

      alert('이미지가 삭제되었습니다.');
    }
    handleFiles(filesArr);
  }


  // db에 저장된 file 삭제 처리
  if (e.target.classList.contains('oldBtn')) {
    e.preventDefault();
    const ol = document.getElementById('carousel-indicators');
    const lastLi = ol.lastElementChild;

    let thumbDiv = e.target.closest('.thumb');
    let uuid = thumbDiv.getAttribute("data-uuid");

    //이미지 안쪽 버튼삭제
    //썸네일 이미지삭제
    thumbDiv.remove();
    ol.removeChild(lastLi);

    var carouselInner = document.querySelector(".carousel-inner");
    var carouselItems = carouselInner.querySelectorAll(".carousel-item");
    // 메인이미지의 uuid와 비교하여 같으면 삭제
    for (var j = carouselItems.length - 1; j >= 0; j--) {
      if (carouselItems[j].getAttribute("data-uuid") === uuid) {
      
          if (carouselItems[j].classList.contains('active')) {
            if(j === carouselItems.length-1) {
              carouselItems[j-1].classList.add('active');
  
              const lastLi1 = ol.lastElementChild;
              lastLi1.classList.add('active');
              lastLi1.setAttribute('aria-current','true');
              carouselItems[j].remove();
             
            } else {
              carouselItems[j + 1].classList.add('active');
              carouselItems[j].remove();
            }
          }
      } 
    }

    removeFileToServer(uuid).then(result => {
      console.log(result);
      alert('파일삭제' + (parseInt(result) > 0 ? '성공' : '실패'));
    });
  }
});

  


var inputElm = document.querySelector('input[name=btag]');
inputElm.value = inputElm.value.replace(/\[|\]/g, '');
console.log(inputElm);

var whitelist = [
  "#arrerw",
  "#rewb",
  "#rerwtc",
  "#dfdfd",
  "#jjkke",
  "#ttf",
  "#g",
  "#h",
  "#i",
  "#j",
  "#k",
  "#l",
  "#m",
  "#no mod",
  "#ttttt",
  "#wwww",
  "#gggg",
  "#123445",
  "#마인크래프트",
  "#마크업",
  "#징징이",
  "#노치사과",
  "#채굴",
  "#ㅌㅌ",
  "#우리집"
];

var tagify = new Tagify(inputElm, {
  enforceWhitelist: true,
  whitelist: inputElm.value.trim().split(/\s*,\s*/)
});

tagify
  .on('add', onAddTag)
  .on('remove', onRemoveTag)
  .on('input', onInput)
  .on('edit', onTagEdit)
  .on('invalid', onInvalidTag)
  .on('click', onTagClick)
  .on('focus', onTagifyFocusBlur)
  .on('blur', onTagifyFocusBlur)
  .on('dropdown:hide dropdown:show', (e) => console.log(e.type))
  .on('dropdown:select', onDropdownSelect);

var mockAjax = function (duration) {
  return new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      clearTimeout(timeout);
      resolve(whitelist);
    }, duration || 700);
  });
};

function onAddTag(e) {
  console.log("onAddTag: ", e.detail);
  console.log("original input value: ", inputElm.value);
  tagify.off('add', onAddTag);
}

function onRemoveTag(e) {
  console.log("onRemoveTag:", e.detail, "tagify instance value:", tagify.value);
}

function onInput(e) {
  console.log("onInput: ", e.detail);
  tagify.settings.whitelist.length = 0;
  tagify.loading(true).dropdown.hide.call(tagify);

  mockAjax()
    .then(function (result) {
      tagify.settings.whitelist.push(...result, ...tagify.value);
      tagify.loading(false).dropdown.show.call(tagify, e.detail.value);
    });
}

function onTagEdit(e) {
  console.log("onTagEdit: ", e.detail);
}

function onInvalidTag(e) {
  console.log("onInvalidTag: ", e.detail);
}

function onTagClick(e) {
  console.log(e.detail);
  console.log("onTagClick: ", e.detail);
}

function onTagifyFocusBlur(e) {
  console.log(e.type, "event fired");
}

function onDropdownSelect(e) {
  console.log("onDropdownSelect: ", e.detail);
}

document.getElementById('regBtn').addEventListener('click', () => {
  const val = document.getElementById('btag').value;

  for (const tagValue of tagify.value) {
    console.log(tagValue);
  }
});