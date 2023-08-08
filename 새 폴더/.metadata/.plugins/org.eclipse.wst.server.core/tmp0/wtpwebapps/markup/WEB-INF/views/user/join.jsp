<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<link href="../../resources/css/user/userJoin.css" rel="stylesheet">
</head>
<body >
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <div class="joinbox">
  <div class="logobox">
  <img alt="" src="../../resources/images/user/logo.png"> <br>
  </div>
  <div class="formbox">
    <form action="/member/join" method="post" enctype="multipart/form-data">
	<div id="carouselExampleDark" class="carousel carousel-dark slide">

  <div class="carousel-inner">
    <div class="carousel-item active " data-bs-interval="10000">
    <div class="centerbox" style="width: 450px; height: 200px;">
      <div class="jointitle1">아이디</div>
                <input type="text" name="id" placeholder="아이디를 입력해주세요." id="joinid" maxlength="30">
                <button type="button" id="duplicateCheck" >중복확인</button> <br>
                <div class="ment"><span id="idMent" class="spanment"></span></div>
                <div class="jointitle1">비밀번호</div>
                <input type="password" name="pw" placeholder="비밀번호를 입력해주세요." id="pw"> <br>
                <div class="ment"><span id="pwMent2" class="spanment"></span></div>
                <div class="jointitle1">비밀번호 확인</div>
                <input type="password" id="pwCheck"><br>
                <div class="ment"><span id="pwMent" class="spanment"></span></div>
                <input type="file" name="img" id="file" accept="image/png, image/jpg, image/jpeg, image/bmp, image/gif" style="display: none" onchange="previewImage(this)">
  	</div>
<div class="btnbox">
  <button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="next">다음</button>
  	</div>
    </div>
    <div class="carousel-item " data-bs-interval="2000">
    <div class="centerbox" style="width: 510px; height: 378px; ">
     <div class="imgbox">
                <div id="previewbox">
                <img alt="" src="../../resources/images/profile/물음표.png" id="preview">
                </div>
               <button type="button" class="btn btn-primary profileBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="close">
                  프로필 사진 설정
                </button>
				</div>
                
                
                <br>
                <div class="joincontainer">
                  <div class="jointitle">닉네임</div>
                  <input type="text" name="name" id="name" maxlength="15">
                </div>
                <div class="joincontainer">
                  <div class="jointitle">이메일</div>
                  <input type="email" name="email" id="email">
                </div>
                <div class="joincontainer">
                  <div class="jointitle" >소개글</div>
                  <textarea rows="3" cols="30" name="ucontent" placeholder="안녕하세요 :)" id="content"></textarea>
                  </div>
    </div>
                  <div class="btnbox">
         <button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="prev">이전</button>
 		 <button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="next">다음</button>
 		 </div>
    </div>
    <div class="carousel-item ">
    <div class="centerbox" >
    <div class="tagment">
    <h4>관심사를 선택해주세요.(1개 이상)</h4>
    </div>
     <div class="tagbox">
              <label for="checkbox1">
                <input type="checkbox" value="광물" id="checkbox1" name="utag" class="tags">광물</label>
                 <label for="checkbox2">
                <input type="checkbox" value="pvp" id="checkbox2" name="utag" class="tags">pvp</label>
                 <label for="checkbox3">
                <input type="checkbox" value="야생" id="checkbox3" name="utag" class="tags">야생</label>
                 <label for="checkbox4">
                <input type="checkbox" value="건축" id="checkbox4" name="utag" class="tags">건축</label>
                 <label for="checkbox5">
                <input type="checkbox" value="모드" id="checkbox5" name="utag" class="tags">모드</label>
                 <label for="checkbox6">
                <input type="checkbox" value="플러그인" id="checkbox6" name="utag" class="tags">플러그인</label>
                 <label for="checkbox7">
                <input type="checkbox" value="스킨" id="checkbox7" name="utag" class="tags">스킨</label>
                 <label for="checkbox8">
                <input type="checkbox" value="텍스쳐팩" id="checkbox8" name="utag" class="tags">텍스쳐팩</label>
                 <label for="checkbox9">
                <input type="checkbox" value="쉐이더" id="checkbox9" name="utag" class="tags">쉐이더</label>
               <label for="checkbox10">
                <input type="checkbox" value="레드스톤" id="checkbox10" name="utag" class="tags">레드스톤</label>
               <label for="checkbox11">
                <input type="checkbox" value="몹" id="checkbox11" name="utag" class="tags">몹</label>
               <label for="checkbox12">
                <input type="checkbox" value="일상" id="checkbox12" name="utag" class="tags">일상</label>
               <label for="checkbox13">
                <input type="checkbox" value="인챈트" id="checkbox13" name="utag" class="tags">인챈트</label>
               <label for="checkbox14">
                <input type="checkbox" value="일러스트" id="checkbox14" name="utag" class="tags">일러스트</label>
               <label for="checkbox15">
                <input type="checkbox" value="풍경" id="checkbox15" name="utag" class="tags">풍경</label>
                </div>
    </div>
                <div class="btnbox">
                 <button type="button" class="btncss" data-bs-target="#carouselExampleDark" data-bs-slide="prev">이전</button>
                 <button type="submit" class="btncss" disabled="disabled" id="formBtn">완료</button>
                 </div>
    </div>
    
  </div>

</div>
     
    </form>
  </div>
</div>
  
  
<div class="modal fade hidePrevented.bs.modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">프로필 사진 설정</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div id="choiceImg">
                          <img class="profile_img" src="../../resources/images/profile/zombie.png"  onclick="showPreview('../../resources/images/profile/zombie.png')">
                          <img class="profile_img" src="../../resources/images/profile/villager.png"  onclick="showPreview('../../resources/images/profile/villager.png')">
                          <img class="profile_img" src="../../resources/images/profile/enderman.jpg"  onclick="showPreview('../../resources/images/profile/enderman.jpg')">
                          <img class="profile_img" src="../../resources/images/profile/pig.jpg"  onclick="showPreview('../../resources/images/profile/pig.jpg')">
                          <img class="profile_img" src="../../resources/images/profile/steve.jpg"  onclick="showPreview('../../resources/images/profile/steve.jpg')">
                          <img id="mypic" src="../../resources/images/profile/물음표.png" alt="Preview" >
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
</body>

<!-- HTML 코드 -->



<script type="text/javascript" src="../../resources/js/user/userJoin.js"></script>


</html>