<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <link href="../../resources/css/user/userMypage.css" rel="stylesheet">
    
</head>
<body>

<jsp:include page="../layout/header.jsp"></jsp:include>


<div class="mybox">
<div class="imgbox">
<div class="myuser">
    <img alt="" src="/upload/profile/${uvo.imgFile}"  id="profileimg">
<h3>${uvo.name}</h3>
<div class="username">@${uvo.id}</div>
<input type="hidden" id="id" value="${uvo.id}">
<div id="followZone">
    <c:if test="${ses.id ne uvo.id}">
        <button class="followBtn" data-id="${uvo.id}" data-ses="${ses.id}">팔로우</button>
        <br>
    </c:if>
<c:if test="${ses.id eq uvo.id}">
    <a href="/member/modify?id=${uvo.id}"><button type="button" class="editbtn">프로필 수정</button></a>
</c:if>
</div>

</div>
</div>

<div class="inforbox">

<div class="secondbox">

<div class="followcnt">
<a data-bs-toggle="modal" data-bs-target="#followerList" id="followerCnt"></a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a data-bs-toggle="modal" data-bs-target="#followingList" id="followingCnt"></a>
</div>


<div class="usercontent">
<%-- <span class="spancontent">${uvo.ucontent}</span>  --%>
${uvo.ucontent }
</div>
<div class="tagbox">
<c:forEach items="${taglist }" var="tag" varStatus="i">
<!-- <img alt="" src="../../resources/images/user/heart.png" style="width: 20px; height: 20px;"> -->
  <a href="/board/list?keyword=${tag }"> <span id="mytag">#&nbsp;${tag }</span> </a>
  <c:choose>
  <c:when test="${i.count > 0 && i.count%5==0}">
  <br>
  </c:when>
  <c:otherwise>
&nbsp;&nbsp;&nbsp;
  </c:otherwise>
  </c:choose>

</c:forEach>
</div>
</div>


</div>

<script type="text/javascript">
const id = '<c:out value="${uvo.id}" />';
</script>




<div class="btnZone">
    <ul class="ulbutton">
    <c:if test="${ses.id eq uvo.id }">
        <li class="mypost">
        <div>
        <span>내가 쓴 글</span>
        <div class="underline"></div>
        </div>
        </li>
    </c:if>
        <li class="mylike">
        <span>좋아요</span>
        <div class="underline"></div>
        </li>
    </ul>
</div>

<c:set var="likedivid" value="0"/>
<c:set var="postdivid" value="0"/>
<c:set var="sesid" value="${ses.id}"/>
<br>

<div class="contentZone">
    <div id="myPostTab">
     
         <div class="bigBox">
        <c:choose>
            <c:when test="${postlist.size() == 0}">
               <div class="nothing">
                    <h2>아직 게시한 글이 없습니다.</h2>
                   	<a href="/board/register"><button>글쓰기</button></a>
                   	</div>
            </c:when>
            <c:otherwise>
                <c:forEach items="${postlist}" var="DTO">
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

                    <div class="pp" id="pbox${postdivid}">
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
                    <c:set var="postdivid" value="${postdivid + 1}"/>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>
    </div>

    <div id="myLikeTab">
      
            <div class="bigBox">
        <c:choose>
            <c:when test="${likelist.size() == 0}">
                <div class="nothing">
                    <h2>아직 좋아요한 글이 없습니다.</h2>
                    <a href="/board/list"><button>둘러보기</button></a>
                    </div>
            </c:when>
            <c:otherwise>
                <c:forEach items="${likelist}" var="DTO">
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

                    <div class="pp" id="lbox${likedivid}">
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
                    <c:set var="likedivid" value="${likedivid + 1}"/>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>
         
    </div>
</div>
</div>

<!-- Modal -->
<div class="modal fade" id="followingList" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
     aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">팔로잉</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="followingtable">
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="followerList" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
     aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">팔로워</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="followerbody">
                <table id="followertable">
                </table>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    const ses= '<c:out value="${ses.id}" />';
    const likedivid = '<c:out value="${likedivid}" />';
    const postdivid = '<c:out value="${postdivid}" />';
    console.log(id, ses);
</script>

<script type="text/javascript" src="../../resources/js/user/userMypage.js"></script>
</body>
</html>
