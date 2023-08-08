<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>회원 관리</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/manager/black.css" />
</head>
<body>
    <jsp:include page="../layout/header.jsp" />
    <div class="headerSpace"></div>
    <div class="table-container">
        <table border="1">
            <thead>
                <tr>
                    <th width="20%">id</th>
                    <th width="20%">name</th>
                    <th width="20%">email</th>
                    <th width="20%">grade</th>
                    <th width="20%">관리</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach items="${list}" var="uvo" varStatus="status">
                    <tr>
                        <td>${uvo.id}</td>
                        <td>${uvo.name}</td>
                        <!-- 삭제와 비번 변경 기능 -->
                        <td>${uvo.email}</td>
                        <c:choose>
	                        <c:when test="${uvo.grade > 0}">
	                        	<td>관리자</td>
	                        </c:when>
	                       	<c:otherwise>
	                       		<td>일반회원</td>
	                        </c:otherwise>
                        </c:choose>
                     
                        <td>
                            <button onclick="delmem('${uvo.id}');" class="custom-btn btn-5">회원삭제</button>
                            <!-- 여기부터 비번변경 new -->
                            <div class="modal fade hidePrevented.bs.modal" id="exampleModal${status.index}" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel" class="custom-btn btn-5">비밀번호 변경</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label">새 비밀번호를 입력해주세요.</label>
                                                <form action="memberRegi2.do" method="post" id="${status.index}">
                                                    <input type="hidden" value="${uvo.id}" readOnly name="id"><br>
                                                    <input type="password" class="form-control" name="pw">
                                                    <button onclick="winOpen2(${status.index});" type="button" class="custom-btn btn-5">비번변경</button>
                                                </form>
                                                <span id="resultMent"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" data-bs-toggle="modal"  data-bs-target="#exampleModal${status.index}" data-bs-whatever="@mdo" class="custom-btn btn-5">비번변경</button>
                            <!-- 여기까지 -->
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
    <script type="text/javascript" src="/resources/js/manager/userList.js"></script>
</body>
</html>
