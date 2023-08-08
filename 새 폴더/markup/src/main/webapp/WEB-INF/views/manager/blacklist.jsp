<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>신고게시판</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/manager/black.css" />
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<div class="table-container blackMain">
		<table border="1" id="comment-table" class="blacktable">
			<thead class="blackTableHead">
				<tr>
					<th>관리</th>
					<th>title</th>
					<th>내용</th>
					<th>id</th>
					<th class="oby black">신고</th>
					<th>좋아요</th>
					<th class="oby regDate">작성일</th>
					<th>상태</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${list}" var="board">
					<tr>
						<td><a href="/board/remove?bno=${board.bno}">
								<button type="button" class="custom-btn btn-5">삭제</button>
						</a> <a href="/board/restore?bno=${board.bno}">
								<button type="button" class="custom-btn btn-5">복구</button>
						</a></td>

						<td><a href="/board/detail?bno=${board.bno}">
								${board.title}-
								</a></td>
						<td>${board.bcontent}</td>
						<td>${board.id}</td>
						<td>${board.black}</td>
						<td>${board.likeCount}</td>
						<td>${board.regDate}</td>
						<c:if test="${board.isDel==1}">
							<td>삭제</td>
						</c:if>
						<c:if test="${board.isDel==0}">
							<td>정상</td>
						</c:if>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>
	<!-- 	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
	<script type="text/javascript" src="/resources/js/manager/blackList.js"></script>
</body>
</html>
