package com.markup.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.markup.www.domain.UserVO;
import com.markup.www.repository.UserDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
	
	@Inject
	private UserDAO udao;
	
	@Inject
	BCryptPasswordEncoder passwordencoder;
	
	@Override
	public int join(UserVO uvo) {
		UserVO tmpUser=udao.getUser(uvo.getId());
		if(tmpUser != null) {
			return 0;
		}
		if(uvo.getId() == null || uvo.getId().length()==0) {
			return 0;
		}
		if(uvo.getPw()==null||uvo.getPw().length()==0) {
			return 0;
		}
		
		String pw=uvo.getPw();
		String encodePw=passwordencoder.encode(pw);
		uvo.setPw(encodePw);
		int isOk=udao.insertUser(uvo);
		return isOk;
	}

	@Override
	public int modify(UserVO uvo) {
		// TODO Auto-generated method stub
		int isOk=udao.modifyUser(uvo);
		return isOk;
	}

	@Override
	public int update(UserVO uvo) {
		String pw=uvo.getPw();
		String encodePw=passwordencoder.encode(pw);
		uvo.setPw(encodePw);
		int isOk=udao.modifyPw(uvo);
		return isOk;
	}

	@Override
	public UserVO duplicateCheck(String id) {
		// TODO Auto-generated method stub
		return udao.getUser(id);
	}

	@Override
	public List<UserVO> getList() {
		// TODO Auto-generated method stub
		return udao.getList();
	}

	@Override
	public int follow(UserVO uvo) {
		int isOk=udao.following(uvo);
		if(isOk>0) {
			isOk=udao.follower(uvo);
			
		};
		return isOk;
	}

	@Override
	public List<UserVO> followingList(String id) {
		// TODO Auto-generated method stub
		return udao.followingList(id);
	}

	@Override
	public List<UserVO> followerList(String id) {
		// TODO Auto-generated method stub
		return udao.followerList(id);
	}

	@Override
	public int unfollowUser(UserVO uvo, String userid) {
		int isOk=udao.updateFollowing(uvo);
		if(isOk>0) {
			uvo.setId(userid);
			isOk=udao.updateFollowers(uvo);
		}
		return isOk;
	}

	@Override
	public int signUp(UserVO user) {
		log.info(">>> signUp service in");
		//아이디가 중복되면 회원가입 실패
		//아이디주고 DB에서 일치하는 유저를 달라고 요청
		//일치하는 유저가 없으면 가입(1)/ 있으면(0) 
		UserVO tempUser = udao.getUser(user.getId());
		//tempUser가 null이 아니라면 이미 가입된 회원 => 아이디중복 => 회원가입 실패
		if(tempUser != null) {
			return 0;
		}
		
		//아이디 중복되지 않았다면 회원가입 진행~!!
		//passwordr가 null 이거나 값이 없으면 가입불가
		if(user.getId() == null || user.getId().length() == 0) {
			return 0;
		}
		if(user.getPw() == null || user.getPw().length() == 0) {
			return 0;
		}
		
		// 회원가입 진행
		String pw = user.getPw();
		//encode(암호화) / matches(원래 비번, 암호화된 비번)
		String encodePw = passwordencoder.encode(pw); //기존 패스워드 암호화
		//uvo의 패스워드를 암호화된 패스워드로 수정
		user.setPw(encodePw);
		//회원가입 => insert
		int isOk = udao.insertUser(user);
		
		return isOk;
	}

	@Override
	public UserVO isUser(String id, String pw) {
		log.info(">> login Service in");
		// id를 주고 해당 id에 일치하는 객체를 DB에서 호출
		UserVO user = udao.getUser(id); //앞에서 했던 메서드 호출
		//가져온 user의 비번과 입력받은 비번이 같은지 확인
		//id가 일치하는 객체가 없을경우.
		if(user == null) { return null; }
		
		//passwordencoder.matches(원래비번, 암호화된 비번) : 매치가 된다면 true
		if(passwordencoder.matches(pw, user.getPw())) {
			return user;
		}else {
			return null;			
		}
	}

	@Override
	public int deleteuser(String id) {
		log.info(">> deleteuser Service in");
		return udao.deleteUser(id);
	}

	@Override
	public List<UserVO> getUserList(List<String> idList) {
		log.info(">> getUserList Service in");
		return udao.getUserList(idList);
	}

}
