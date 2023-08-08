const buttons = document.querySelectorAll('.pbutton1');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let a = e.target.closest('.pbox1').querySelector('.patchpre');
    let b = e.target.closest('.pbox1').querySelector('.pbutton1');
    
    a.classList.toggle("phide1");
    a.classList.toggle("pshow");

    setTimeout(() => {
        if (b.id == 'patchb2') {
          console.log("테스트");
          document.getElementById('patchb2').scrollIntoView({ behavior: 'smooth' });
        } 
        if (b.id == 'patchb3') {
          document.getElementById('patchb3').scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // 2초(2000밀리초) 뒤에 코드 블록이 실행됩니다.
    
  });
});

// 페이지 상단으로 이동하는 함수
function scrollToTop() {
  // 스크롤 애니메이션을 사용하여 페이지를 상단으로 이동합니다.
  // smooth behavior를 사용하여 부드러운 애니메이션 효과를 줍니다.
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}