package com.markup.www.service;

import java.util.List;

import com.markup.www.domain.UserVO;

public interface UserService {

	int join(UserVO uvo);

	int modify(UserVO uvo);

	int update(UserVO uvo);

	UserVO duplicateCheck(String id);

	List<UserVO> getList();

	int follow(UserVO uvo);

	List<UserVO> followingList(String id);

	List<UserVO> followerList(String id);

	int unfollowUser(UserVO uvo, String userid);

	int signUp(UserVO user);

	UserVO isUser(String id, String pw);

	int deleteuser(String id);

	List<UserVO> getUserList(List<String> idList);

}
