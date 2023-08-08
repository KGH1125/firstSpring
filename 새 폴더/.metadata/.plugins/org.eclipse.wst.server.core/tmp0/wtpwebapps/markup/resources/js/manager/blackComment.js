$(document).ready(function() {
    let asc1 = true; // 신고횟수 열 오름차순으로 시작
    let asc2 = true; // regDate 열 오름차순으로 시작

    $("#comment-table th").click(function() {
      const table = $(this).parents("table").eq(0);
      const rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
      
      if ($(this).index() === 6) { // 신고횟수 열의 인덱스는 6
        asc1 = !asc1; // 클릭할 때마다 반대로 변경
        if (!asc1) {
          rows.reverse();
        }
        // 현재 클릭한 헤더 셀의 화살표 클래스를 변경하고, 다른 헤더 셀의 화살표 클래스를 제거합니다.
        $("#comment-table th").removeClass("asc desc");
        $(this).addClass(asc1 ? "asc" : "desc");
      } else if ($(this).index() === 5) { // regDate 열의 인덱스는 5
        asc2 = !asc2; // 클릭할 때마다 반대로 변경
        if (!asc2) {
          rows.reverse();
        }
        // 현재 클릭한 헤더 셀의 화살표 클래스를 변경하고, 다른 헤더 셀의 화살표 클래스를 제거합니다.
        $("#comment-table th").removeClass("asc desc");
        $(this).addClass(asc2 ? "asc" : "desc");
      }
      
      for (let i = 0; i < rows.length; i++) {
        table.append(rows[i]);
      }
    });

    function comparer(index) {
      return function(a, b) {
        let valA = getCellValue(a, index),
            valB = getCellValue(b, index);
        if (index === 6) { // 신고횟수 열의 인덱스는 6
          return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        } else if (index === 5) { // regDate 열의 인덱스는 5
          valA = new Date(valA).getTime(); // 날짜 값을 밀리초로 변환하여 비교
          valB = new Date(valB).getTime();
          return valA - valB;
        }
      };
    }

    function getCellValue(row, index) {
      return $(row).children("td").eq(index).text();
    }
  });
