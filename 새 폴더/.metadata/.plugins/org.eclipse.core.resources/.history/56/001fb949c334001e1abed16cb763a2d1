const nextBtns = document.querySelectorAll(".nextb");//다음버튼
const previousBtns = document.querySelectorAll(".previousb");//이전버튼
const midBox = document.getElementById("NJmidbox");//움직일 박스
let divlength = 0;//현재 위치
const movelength = 600;//움직일 거리

nextBtns.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("앞으로");
    divlength -= movelength;
    midBox.style.transform = `translateX(${divlength}px)`;
  });
});

previousBtns.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("뒤로");
    divlength += movelength;
    midBox.style.transform = `translateX(${divlength}px)`;
  });
});