package com.markup.www.repository;

import java.util.List;

import com.markup.www.domain.AlarmVO;

public interface AlarmDAO {

	int pushalarm(AlarmVO avo);

	List<AlarmVO> getAlarm(String id);

	int updateIsCheck(int ano);

}
