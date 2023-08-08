package com.markup.www.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.markup.www.domain.CommentVO;
import com.markup.www.repository.CommentDAO;



@Service
public class CommentServiceImpl implements CommentService {
	
	private static final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class); 
	
	@Inject
	private CommentDAO cdao;
	
	@Override
	public int post(CommentVO cvo) {
		log.info("CommentService : post");
		return cdao.insert(cvo);
	}

	@Override
	public List<CommentVO> getList(int bno) {
		log.info("comment list service in");
		return cdao.getList(bno);
	}

	@Override
	public int edit(CommentVO cvo) {
		log.info("comment edit service in");
		return cdao.update(cvo);
	}

	@Override
	public int remove(int cno) {
		log.info("comment remove service in");
		return cdao.delete(cno);
	}

	@Override
	public int restore(int cno) {
		log.info("board restore in");
		return cdao.restoreComment(cno);
	}

	@Override
	public List<CommentVO> getblackcomment() {
		log.info("board List in");
		return cdao.getblackcomment();
	}

	@Override
	public int blackComment(int cno) {
		// TODO Auto-generated method stub
		return cdao.blackComment(cno);
	}

	@Override
	public int deleteComment(int cno) {
		log.info(">>>CommentDAO : remove");
		return cdao.deleteComment(cno);
	}

	@Override
	public int restoreComment(int cno) {
		log.info(">>>CommentDAO : restore");
		return cdao.restoreComment(cno);
	}
}
