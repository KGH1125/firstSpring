document.addEventListener('DOMContentLoaded', function() {
  let asc1 = true; // 신고횟수 열 오름차순으로 시작
  let asc2 = true; // regDate 열 오름차순으로 시작

  const obyHeaders = document.querySelectorAll("#comment-table th.oby");
  obyHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      const table = this.closest("table");
      const rows = Array.from(table.querySelectorAll("tr:not(:first-child)")).sort(comparer(this.cellIndex));

      if (this.classList.contains("black")) {
        asc1 = !asc1; // 클릭할 때마다 반대로 변경
        if (!asc1) {
          rows.reverse();
        }
        // 현재 클릭한 헤더 셀의 화살표 클래스를 변경하고, 다른 헤더 셀의 화살표 클래스를 제거합니다.
        obyHeaders.forEach(function(h) {
          h.classList.remove("asc", "desc");
        });
        this.classList.add(asc1 ? "asc" : "desc");
      } else if (this.classList.contains("regDate")) {
        asc2 = !asc2; // 클릭할 때마다 반대로 변경
        if (!asc2) {
          rows.reverse();
        }
        // 현재 클릭한 헤더 셀의 화살표 클래스를 변경하고, 다른 헤더 셀의 화살표 클래스를 제거합니다.
        obyHeaders.forEach(function(h) {
          h.classList.remove("asc", "desc");
        });
        this.classList.add(asc2 ? "asc" : "desc");
      }

      for (let i = 0; i < rows.length; i++) {
        table.appendChild(rows[i]);
      }
    });
  });

  function comparer(index) {
    return function(a, b) {
      let valA = getCellValue(a, index);
      let valB = getCellValue(b, index);
      if (index === 4 ||index === 5) { // 신고횟수 열의 인덱스는 4
        return isNumeric(valA) && isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
      } else if (index === 6) { // 작성일 열의 인덱스는 6
        valA = new Date(valA).getTime(); // 날짜 값을 밀리초로 변환하여 비교
        valB = new Date(valB).getTime();
        return valA - valB;
      }
    };
  }

  function getCellValue(row, index) {
    return row.querySelectorAll("td")[index].innerText;
  }

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }
});
