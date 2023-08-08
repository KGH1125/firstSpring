package com.markup.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PagingVO {
	private int pageNo;
	private int qty;
	private String keyword;
	private String date;
	private int bno;

	public PagingVO() {
		this(1, 40);
	}

	public PagingVO(int pageNo, int qty) {
		this.pageNo = pageNo;
		this.qty = qty;
	}

	public int getPageStart() {
		return (this.pageNo - 1) * qty;
	}
	
	public String[] getKeywordArray() {
		return this.keyword==null? new String[] {} : this.keyword.split(" ");
	}

}
