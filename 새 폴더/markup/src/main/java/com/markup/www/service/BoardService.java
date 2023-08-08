package com.markup.www.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.markup.www.domain.BoardDTO;
import com.markup.www.domain.BoardUserDTO;
import com.markup.www.domain.BoardVO;
import com.markup.www.domain.PagingVO;

@Service
public interface BoardService {
	
	List<BoardVO> getList(PagingVO pgvo);

	List<BoardUserDTO> getPopList(PagingVO pgvo);

	String getBoardLike(int bno);
	
	int register(BoardDTO bdto);

	BoardDTO getDetailFile(int bno);

	int modifyFile(BoardDTO bdto);

	int deleteBoard(int bno);

	List<BoardVO> getblackList();

	int restore(int bno);

	int updateLikeUser(BoardVO bvo);

	List<BoardUserDTO> getlikeList(PagingVO pgvo);

	List<BoardUserDTO> getpostList(PagingVO pgvo);

	int removeFile(String uuid);

	List<BoardUserDTO> getAllList(PagingVO pgvo);

	int listBlackPlus(int bno);

	List<BoardUserDTO> gettagList(PagingVO pgvo);

	int[] userinfor(String id);




}
