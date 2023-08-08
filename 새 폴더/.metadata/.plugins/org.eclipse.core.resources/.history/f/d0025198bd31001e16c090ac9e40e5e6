package com.markup.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoardVO {

	private int bno;
	private String title;
	private String bcontent;
	private String id;
	private String btag;
	private String file;
	private int black;
	private String likeUser;
	private String regDate;
	private int isDel;

	public int getLikeCount() {
		String string = this.likeUser;
		int count = 0;

		if (string != null && !string.isEmpty()) {
			String[] splitArray = string.split("#");
			count = splitArray.length - 1;
		}
		return count;
	}

	public String[] getLikeUserArr() {
		if (likeUser == null || likeUser.isEmpty()) {
			return new String[0]; // 없다면 길이0 배열 리턴
		}
		String Stuser = this.likeUser;
		String[] arr = Stuser.split("#");
		String[] Arruser = new String[arr.length];
		int index = 0;
		for (String element : arr) {
			if (!element.isEmpty()) {
				Arruser[index] = element;
				index++;
			}
		}
		return Arruser;
	}

}