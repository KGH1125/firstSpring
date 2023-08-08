package com.markup.www.domain;

import java.util.List;

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
public class BoardUserDTO {

	private BoardVO bvo;
	private UserVO uvo;
	private List<FileVO> fList;

}
