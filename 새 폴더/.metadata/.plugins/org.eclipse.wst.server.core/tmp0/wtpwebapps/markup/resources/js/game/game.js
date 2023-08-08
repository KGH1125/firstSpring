function winOpen() {
	let popupWidth = window.screen.width;
	let popupHeight = window.screen.height;
  
	let popupX = window.screen.width / 2 - popupWidth / 2;
	// 만들 팝업창 width 크기의 1/2 만큼 보정값으로 빼주었음
  
	let popupY = window.screen.height / 2 - popupHeight / 2;
	// 만들 팝업창 height 크기의 1/2 만큼 보정값으로 빼주었음

	let ot = "'height=' + popupHeight  + ' width=' + popupWidth  + ' left=' + popupX + ' top=' + popupY + ' resizable=1' ";
	let winObj = window.open("https://classic.minecraft.net/", "", ot);
	winObj.resizeTo(1400, 740);
	winObj.moveTo(250, 200);
  }
  
  document.getElementById("gameBtn").addEventListener("click", winOpen);
  