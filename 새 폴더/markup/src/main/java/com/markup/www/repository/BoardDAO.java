package com.markup.www.repository;

import java.util.List;

import com.markup.www.domain.BoardUserDTO;
import com.markup.www.domain.BoardVO;
import com.markup.www.domain.PagingVO;

public interface BoardDAO {

	List<BoardVO> getList(PagingVO pgvo);

	List<BoardVO> getPopList(PagingVO pgvo);

	String getBoardLike(int bno);

	int updateLikeUser(BoardVO bvo);
	
	int insert(BoardVO bvo);

	int selectBno();

	BoardVO getDetail(int bno);

	int updateBoard(BoardVO bvo);

	int deleteBoard(int bno);

	List<BoardVO> getblacklist();

	int restoreBoard(int bno);

	List<BoardVO> getlikeList(PagingVO pgvo);

	List<BoardVO> getpostList(PagingVO pgvo);

	int BlackPlus(int bno);

	List<BoardVO> gettagList(PagingVO pgvo);

	int selectWrite(String id);

	List<BoardVO> selectLike(String id);



}
