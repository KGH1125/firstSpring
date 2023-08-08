package com.markup.www.repository;

import java.util.List;

import com.markup.www.domain.FileVO;

public interface FileDAO {

	int insertFile(FileVO fvo);

	List<FileVO> getFileList(int bno);

	List<FileVO> getFileListToBno(FileVO fvo);

	int deleteFile(String uuid);
}
