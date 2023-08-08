<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../../resources/css/layout/header.css">
</head>
<body>
    <header>
        <nav>
            <div class="hb headerContainer" onclick="window.location.href = '/board/list';">
                <div class="lidiv headerHome"></div>
                <p class="arrow_box">홈</p>
            </div>
            <div class="hb headerContainer" onclick="window.location.href = '/board/poplist?qty=100';">
                <div class="lidiv headerPopList"></div>
                <p class="arrow_box">인기</p>
            </div>
            <div class="hb headerContainer" onclick="window.location.href = '/board/register?id=${ses.id}';">
                <div class="lidiv headerRegister"></div>
                <p class="arrow_box">글쓰기</p>
            </div>
            <div class="hb headerContainer">
	      
	                <div class="lidiv headerAlarm" id="alarmBtn" data-id="${ses.id}">
	                  
	                </div>
	
                <p class="arrow_box">알람</p>
            </div>
            <div class="hb headerContainer">
                <div class="lidiv headerSerch" type="button"data-bs-toggle="collapse" href="#toggleSerch" role="button" aria-expanded="false" aria-controls="toggleSerch" id="toggleButton"></div>
                <p class="arrow_box">검색</p>
            </div>
            <div class="hb headerContainer">
                <div class="lidiv headerMenu dropdown dropend">
                    <div class="drdn-btnDiv" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,20" id = "drdnbtn"></div>
                    <ul class="dropdown-menu" style="transform: translate(0px, 62px);">
                        <li><a class="dropdown-item" href="/member/mypage?id=${ses.id}">내정보</a></li>
                        <li><a class="dropdown-item" href="/board/patch">패치노트</a></li>
                        <li><a class="dropdown-item" href="#">공지사항</a></li>
                        <li><a class="dropdown-item" id="gameBtn">체험하기</a></li>
                        <li><a class="dropdown-item" href="#">이용약관</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <c:if test="${ses.grade>0 }">
	                        <li><a class="dropdown-item" href="/board/black">글관리</a></li>
	                        <li><a class="dropdown-item" href="/comment/black">댓글관리</a></li>
	                        <li><a class="dropdown-item" href="/member/userList?isOK=-1">회원관리</a></li>
	                        <li><hr class="dropdown-divider"></li>
                        </c:if>
                        <li><a class="dropdown-item" href="/member/logout">로그아웃</a></li>
                    </ul>
                </div>
                <p class="arrow_box">메뉴</p>
            </div>

            <div class="collbox">
                <div class="alarmBox hiddenBox card" id="alarmWindow" data-bs-parent=".headerContainer"></div>

                <div class="collapse" id="toggleSerch">
                    <div class="card card-body">
                        <form action="/board/list">
                        	<div class="inputdiv">
                            	<input id="searchInput" name="keyword" type="text" value="${keyword}" data-keyword="${keyword}">
                            </div>
                            <button class="serchBtn" type="submit">검색</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
        <div class="headerSpace"><div class="headerLogo"></div></div>
    </header>

    <script src="https://unpkg.com/@yaireo/tagify"></script>
    <script type="text/javascript">
        const sesId = '<c:out value="${ses.id}" />';
        const sesName = '<c:out value="${ses.name}" />';
    </script>
    <script type="text/javascript" src="/resources/js/layout/header.js"></script>
	<script type="text/javascript" src="/resources/js/game/game.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>
