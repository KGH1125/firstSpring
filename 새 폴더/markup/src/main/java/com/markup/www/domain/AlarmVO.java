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
public class AlarmVO {

	private int ano;
	private int bno;
	private String title;
	private String id;	
	private String pushId;
	private String pushName;
	private int pushType;
	private String pushDate;
	private int isCheck;
}