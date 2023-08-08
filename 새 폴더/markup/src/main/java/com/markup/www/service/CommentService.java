package com.markup.www.service;

import java.util.List;

import com.markup.www.domain.CommentVO;





public interface CommentService {

	int post(CommentVO cvo);

	List<CommentVO> getList(int bno);

	int edit(CommentVO cvo);

	int remove(int cno);

	int restore(int cno);

	List<CommentVO> getblackcomment();

	int blackComment(int cno);
	
	int deleteComment(int cno);

	int restoreComment(int cno);

}
