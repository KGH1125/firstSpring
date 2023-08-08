<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>list</title>
    <link rel="stylesheet" type="text/css" href="../../resources/css/board/boardList.css" />
</head>
<body>
    <jsp:include page="../layout/header.jsp" />
       <div id="fullScreenDiv">환영합니다!</div>

    <c:set var="divid" value="0" />
    <c:set var="sesid" value="${ses.id}" />

    

     <div class="bigBox">
        <c:choose>
            <c:when test="${alist.size() == 0}">
               <div class="notFoundList">글을 찾을 수 없습니다</div> 
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
                            	<%-- <c:if test="${ses.id ne bvo.id}">
                            	 <button class="hid hiddenText" type="button" id="listBlackBtn" data-bno="${bvo.bno}">신고</button>
                            	</c:if> --%>
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
    
	<script type="text/javascript">
	const msg_login='<c:out value="${msg_login}" />';
	console.log(msg_login);
	</script>
    <script type="text/javascript" src="../../resources/js/board/boardList.js"></script>

</body>
</html>
