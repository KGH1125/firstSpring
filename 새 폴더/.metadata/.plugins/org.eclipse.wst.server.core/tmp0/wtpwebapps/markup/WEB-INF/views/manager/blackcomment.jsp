<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>댓글신고게시판</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/manager/black.css" />
</head>
<body>
    <jsp:include page="../layout/header.jsp" />
	<div class="headerSpace"></div>
    <div class="table-container">
        <table border="1" id="comment-table">
            <thead>
                <tr>
                    <th width="5%">관리</th>
                    <th width="10%">번호</th>
                    <th width="20%">title</th>
                    <th width="5%">id</th>
                    <th width="30%">댓글 내용</th>
                    <th width="10%" class="oby">regDate</th>
                    <th width="10%" class="oby">신고횟수</th>
                    <th width="10%">상태</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${CommentList}" var="cvo">
                    <tr>
                        <td>
                            <a href="/comment/remove?cno=${cvo.cno}"><button type="button" class="custom-btn btn-5">삭제</button></a>
                            <a href="/comment/restore?cno=${cvo.cno}"><button type="button" class="custom-btn btn-5">복구</button></a>
                        </td>
                        <td>${cvo.cno}</td>
                        <td>
                            <!-- bno로 게시글 타이틀 출력 -> 링크로 그 게시글로 연결 -->
                            <c:forEach items="${BoardList}" var="bvo">
                                <c:if test="${cvo.bno == bvo.bno}">
                                    <a href="/board/detail?bno=${bvo.bno}">${bvo.title}</a>
                                </c:if>
                            </c:forEach>
                        </td>
                        <td>${cvo.id}</td>
                        <td>${cvo.ccontent}</td> <!-- 두번째글자 대문자면 인식안됨. -->
                        <td>${cvo.regDate}</td>
                        <td>${cvo.black}</td>
                        <c:if test="${cvo.isDel==1}">
                            <td>삭제</td>
                        </c:if>
                        <c:if test="${cvo.isDel==0}">
                            <td>정상</td>
                        </c:if>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="../../resources/js/manager/blackComment.js"></script>
</body>
</html>
