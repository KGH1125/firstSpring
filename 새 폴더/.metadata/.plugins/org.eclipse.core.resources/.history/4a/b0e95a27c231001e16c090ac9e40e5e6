
  const accordions = document.getElementsByClassName('accordion');

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
  
//페이지 상단으로 이동하는 함수
  function scrollToTop() {
      // 스크롤 애니메이션을 사용하여 페이지를 상단으로 이동합니다.
      // smooth behavior를 사용하여 부드러운 애니메이션 효과를 줍니다.
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  }