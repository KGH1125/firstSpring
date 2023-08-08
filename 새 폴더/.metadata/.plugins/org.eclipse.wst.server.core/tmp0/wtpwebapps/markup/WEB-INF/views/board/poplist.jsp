<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>인기</title>
<link rel="stylesheet" type="text/css"
	href="/resources/css/board/boardList.css">
</head>
<jsp:include page="../layout/header.jsp"></jsp:include>
<body>
	<c:set var="divid" value="0"></c:set>
	<div class="bigBox">
        <c:choose>
            <c:when test="${alist.size() == 0}">
                글을 찾을 수 없습니다
            </c:when>
            <c:otherwise>
                <c:forEach items="${alist}" var="DTO">
                    <c:set var="bvo" value="${DTO.bvo}" />
                    <c:set var="uvo" value="${DTO.uvo}" />
                    <c:set var="fList" value="${DTO.FList}" />
                    <c:set var="fvo" value="${fList[0]}" />
                    <c:set var="likeUserArr" value="${bvo.getLikeUserArr()}" />
                    <c:set var="isIt" value="false" />
				
                    <c:forEach items="${likeUserArr}" var="likeUser">
                        <c:if test="${likeUser eq sesid}">
                            <c:set var="isIt" value="true" />
                        </c:if>
                    </c:forEach>

                    <div class="pp" id="box${divid}">
                        <div class="contentBox" data-bno="${bvo.bno}" data-title="${bvo.title}" data-boardid="${bvo.id}">
                            <c:choose>
                                <c:when test="${fvo eq null}">
                                    <div class="titleBox midBox " > ${bvo.title} </div>
                                </c:when>
                                <c:otherwise>
                                    <img class="thumbnail midBox " src="/upload/${fn:replace(fvo.saveDir, '\\', '/')}/${fvo.uuid}_${fvo.fileName}" alt="이미지">
                                </c:otherwise>
                            </c:choose>
                            <div class="overlayBox" onclick="window.location.href = '/board/detail?bno=${bvo.bno}';"></div>
                            	<div class="profile hid hiddenText">
                            		<a href="/member/mypage?id=${bvo.id}"><img alt="" src="/upload/profile/${uvo.imgFile}" style="width: 30px; height: 30px;"></a>
                            		<a href="/member/mypage?id=${bvo.id}">${uvo.name }</a>
                            	</div>
                            <div class="minBox">
                                <span class="tspan hid hiddenText">${bvo.getLikeCount()}</span>
                                <c:if test="${ses.id ne bvo.id}">
                                    <c:choose>
                                        <c:when test="${isIt eq true}">
                                            <i class="bi bi-heart-fill hateBtn"></i>
                                        </c:when>
                                        <c:otherwise>
                                            <i class="bi bi-heart likeBtn"></i>
                                        </c:otherwise>
                                    </c:choose>
                                </c:if>
                            </div>
                        </div>
                    </div>
                    <c:set var="divid" value="${divid + 1}" />
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>
	<script type="text/javascript"	src="/resources/js/board/boardPopList.js"></script>
</body>
</html>
