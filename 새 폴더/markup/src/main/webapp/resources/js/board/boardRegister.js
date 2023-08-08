let filesArr = []; // files 전역변수 설정 후 누적

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

// file upload 
const dropZone = document.getElementById('dropBox'); //dropBox = 사용자가 드랍할 박스

// 기본 동작 방지 (파일 열기 방지)
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

// 파일 드롭 처리
dropZone.addEventListener('drop', (e) => {
  let isOk = 1;
  e.preventDefault();
  dropZone.classList.remove('dragover');

  const newFiles = Array.from(e.dataTransfer.files);

  for (let file of newFiles) {  
    let validResult = fileSizeValidation(file.name, file.size);
    isOk *= validResult;
  }

  if (isOk == 1) {
    filesArr = filesArr.concat(newFiles);
    console.log(isOk);
  } else {
    alert('업로드 불가');
  }
  handleFiles(filesArr);
});

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

function handleFiles(files) {
  let imageZone = document.getElementById('fileZone');

  const dataTransfer = new DataTransfer();
  for (let file of filesArr) {
    dataTransfer.items.add(file);
  }

  const fileInput = document.getElementById('file');
  fileInput.files = dataTransfer.files;

  if (document.getElementById('carouselExampleIndicators') === null) {
    imageZone.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="false">
    <ol class="carousel-indicators" id="carousel-indicators"></ol>
    <div class="carousel-inner" id="carousel-inner"></div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev" id="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" id="next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </a>
    </div>
    <div class="thBox" id="thBox">
    </div>`;
  }

  const carouselInner = document.getElementById('carousel-inner');
  const thDiv = document.getElementById('thBox');
  const currentSlideCount = document.querySelectorAll('.carousel-item').length;

  for (const file of files) {
    if (typeof file.uuid === "undefined") {
      const reader = new FileReader();
      
      reader.onload = function (e) {
        const uniqueUUID = generateUniqueUUID();
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        carouselItem.classList.add('imgItem');
        carouselItem.setAttribute('data-uuid', uniqueUUID);
      
        file.uuid = uniqueUUID;

        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('d-block', 'w-100');
        img.alt = '...';
        img.style.height = '500px';
        img.style.width = '500px';

        const carouselIndicators = document.getElementById('carousel-indicators');
        const li = document.createElement('li');
        let currentIndex = carouselIndicators.querySelectorAll("li").length;
        li.dataset.bsSlideTo = currentIndex;
        li.dataset.bsTarget = '#carouselExampleIndicators';

        if (currentIndex === 0) {
          carouselItem.classList.add('active');
          li.setAttribute('aria-current', true);
          li.classList.add('active');
        }

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(li);

        const th = document.createElement('div');
        th.classList.add('thumb');
        th.classList.add(`${carouselInner.children.length - 1}`);
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

        th.appendChild(thImg);
        th.appendChild(xicon);
        thDiv.appendChild(th);
      };

      reader.readAsDataURL(file);
    }
  }
}

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

  if (e.target.classList.contains('delete-button')) {
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
          if (j === carouselItems.length - 1) {
            carouselItems[j - 1].classList.add('active');
            carouselItems[j].remove();

            const lastLi1 = ol.lastElementChild;
            lastLi1.classList.add('active');
            lastLi1.setAttribute('aria-current', 'true');
          } else {
            carouselItems[j + 1].classList.add('active');
            carouselItems[j].remove();
          }
        }
        carouselItems[j].remove();
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
  }
  handleFiles(filesArr);
});

// tag 
var inputElm = document.querySelector('input[name=btag]');
var whitelist = [
  "#광물",
  "#pvp",
  "#야생",
  "#건축",
  "#모드",
  "#플러그인",
  "#스킨",
  "#텍스쳐팩",
  "#쉐이더",
  "#레드스톤",
  "#몹",
  "#일상"
];

// 위의 input 요소에 Tagify 초기화
var tagify = new Tagify(inputElm, {
  enforceWhitelist: true,
  // 초기 입력 값으로부터 배열 생성
  whitelist: inputElm.value.trim().split(/\s*,\s*/)
});

// 체인 가능한 이벤트 리스너
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

var mockAjax = (function mockAjax() {
  var timeout;
  return function (duration) {
    clearTimeout(timeout); // 마지막 요청 중단
    return new Promise(function (resolve, reject) {
      timeout = setTimeout(resolve, duration || 700, whitelist);
    });
  };
})();

// 태그가 추가되었을 때 콜백
function onAddTag(e) {
  console.log("onAddTag: ", e.detail);
  console.log("original input value: ", inputElm.value);
  tagify.off('add', onAddTag); // 커스텀 Tagify 이벤트 제거하는 예시
}

// 태그가 제거되었을 때 콜백
function onRemoveTag(e) {
  console.log("onRemoveTag:", e.detail, "tagify instance value:", tagify.value);
}

// 문자가 추가/제거되었을 때 (사용자가 입력/삭제 중일 때)
function onInput(e) {
  console.log("onInput: ", e.detail);
  tagify.settings.whitelist.length = 0; // 현재 화이트리스트 초기화
  tagify.loading(true).dropdown.hide.call(tagify); // 로더 애니메이션 표시

  // 지연된 가짜 요청으로부터 새로운 화이트리스트 가져오기 (Promise)
  mockAjax().then(function (result) {
    // tagify "whitelist" 배열 값을 새 값으로 교체하고 이미 선택한 태그들을 다시 추가
    tagify.settings.whitelist.push(...result, ...tagify.value);

    // 제안 드롭다운 렌더링.
    tagify.loading(false).dropdown.show.call(tagify, e.detail.value);
  });
}

function onTagEdit(e) {
  console.log("onTagEdit: ", e.detail);
}

// 잘못된 태그가 추가되었을 때 콜백
function onInvalidTag(e) {
  console.log("onInvalidTag: ", e.detail);
}

// 태그를 클릭했을 때 콜백
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

  alert('글 작성이 완료되었습니다.');
});
