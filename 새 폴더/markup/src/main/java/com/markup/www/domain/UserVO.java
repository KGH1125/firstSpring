package com.markup.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserVO {

	//id, pw, name, following, follow, grade, u_content, u_tag, email
	private String id;
	private String pw;
	private String email;
	private String name;
	private String following;
	private String follower;
	private int grade;
	private String ucontent;
	private String utag;
	private String imgFile;
	
}
