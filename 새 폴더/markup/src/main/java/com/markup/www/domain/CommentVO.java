package com.markup.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CommentVO {

	private int cno;
	private int bno;
	private String id;
	private String ccontent;
	private String regDate;
	private int isDel;
	private int black;

}
