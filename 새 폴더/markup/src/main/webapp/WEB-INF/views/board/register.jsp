<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- header 분리 -->

<title>Register Page</title>


<link href="/resources/css/board/boardRegister.css" rel="stylesheet" />

</head>
<body>

<jsp:include page="../layout/header.jsp"></jsp:include>

<form action="/board/register" method="post" enctype="multipart/form-data">

  <div class="container">
  
    <div id="dropBox" class="dropBox">
      <input type="file" class="file-input" id="file" name="files" multiple style="display: none">
      <button type="button" id="trigger">이곳에 파일을 드래그 하거나 클릭하세요</button>
      <div id="fileZone">
      </div>
    </div>

    <div class="boardBox">
      <input type="text" name="id" value="${ses.id }" readonly class="form-control-plaintext" hidden="hidden">
      <input type="text" name="title" class="titleInputBox" placeholder="제목을 입력해주세요">
      <input type="text" class="form-control-plaintext" id="staticEmail" value="작성자 : ${ses.name }" hidden="hidden">
      <textarea rows="12" cols="40" name="bcontent" class="contentInputBox" placeholder="내용을 입력해 주세요"></textarea>
      <input name='btag' id="btag" class='some_class_name tagInputBox' placeholder='# 을 입력하여 태그를 추가해 보세요' data-blacklist='.NET,PHP'>
      <button id="regBtn" class="btn btn-outline-secondary uplodbtn">등록</button>
      
    </div>
    
    <div style="clear: both;"></div>
  </div>
</form>


<script type="text/javascript" src="/resources/js/board/boardRegister.js"></script>
</body>
</html>
