<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<link href="/resources/css/user/userNJoin.css" rel="stylesheet">
</head>
<body>
<jsp:include page="../layout/header.jsp"></jsp:include>
	  <div class="joinbox">
  <div class="logobox">
  <img alt="" src="../../resources/images/user/logo.png"> <br>
  </div>
  <div class="formbox">

	<div id="carouselExampleDark" class="carousel carousel-dark slide">

  <div class="carousel-inner">
    <div class="carousel-item active " data-bs-interval="10000">
    <div class="centerbox" style="width: 450px; height: 200px;">
      <h3><img alt="" src="/upload/profile/${ses.imgFile }" style="width: 30px">${ses.name }님께서 그동안 작성하신 게시물은 ${userinfor[0]}개, 좋아요한 게시물은 ${userinfor[1]}개 입니다.</h3>
      <a href="/member/mypage?id=${ses.id }"><h4>내 게시물 보러가기</h4></a>
  	</div>
  	<div class="confirmbtn">
      정말로 탈퇴하시겠습니까? 
  	</div>
<div class="btnbox">
  <button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="next">예</button>
  <a href="/board/list"><button type="button" class="btncss">아니오</button></a>
  	</div>
    </div>
    <div class="carousel-item " data-bs-interval="2000">
    <div class="centerbox" style="width: 510px; height: 378px; ">
    <div class="pwcheckbox">
   <h3 style="text-align: left;">회원 탈퇴를 진행하시려면 비밀번호를 입력해주세요.</h3>
    <input type="hidden" value="${ses.id }" name="id" id="id"> <br>
                        <input type="password" class="form-control pwbox" id="oldPw">
                        <button type="button" id="checkBtn" class="btncss">확인</button>
    </div>
    <div class="resultbox">
   	
   	</div>
    </div>
                  <div id="btns" class="btnbox">
         
 		 </div>
    </div>
    <div class="carousel-item ">
    <div class="centerbox" >
    <div class="tagment">
    <h4>그동안 <img src="../../resources/images/user/logo.png" style="width: 130px; background-color: gray;">를 이용해주셔서 감사했습니다.</h4>
    </div>
     <div class="tagbox">
            <a href="/member/removeuser?id=${ses.id }"><button type="button" id="exitbtn">탈퇴하기</button></a>
            <p>위 버튼을 누르면 정말 탈퇴가 진행됩니다.</p>
            
                </div>
    </div>
              
    </div>
    
  </div>

</div>
     

  </div>
</div>
  

	<script type="text/javascript" src="/resources/js/user/userNJoin.js"></script>
</body>
</html>