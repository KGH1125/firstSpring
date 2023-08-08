package com.markup.www.repository;

import java.util.List;

import com.markup.www.domain.UserVO;

public interface UserDAO {

	UserVO getUser(String id);

	int insertUser(UserVO uvo);

	int modifyUser(UserVO uvo);

	int modifyPw(UserVO uvo);

	List<UserVO> getList();

	int following(UserVO uvo);

	int follower(UserVO uvo);

	List<UserVO> followingList(String id);

	List<UserVO> followerList(String id);

	int updateFollowing(UserVO uvo);

	int updateFollowers(UserVO uvo);

	int deleteUser(String id);

	List<UserVO> getUserList(List<String> idList);

}
