function delmem(id) {
    let delconfirm = confirm('사용자 계정이 영구적으로 삭제됩니다.');
    if (delconfirm) {
        location.href = '/member/userremove?id=' + id;
    } else {
        alert('삭제가 취소되었습니다.');
    }
}

function winOpen() {
    let popupWidth = 500;
    let popupHeight = 500;
    let popupX = (window.screen.width / 2) - (popupWidth / 2);
    let popupY = (window.screen.height / 2) - (popupHeight / 2);

    let popupWindow = window.open("/member/password", "windowName", "resizable");

    popupWindow.resizeTo(500, 500);
    popupWindow.onresize = () => {
        popupWindow.resizeTo(500, 500);
        popupWindow.moveTo(popupX, popupY);
    };
}

async function winOpen2(a) {
    document.getElementById(a).submit();
}
