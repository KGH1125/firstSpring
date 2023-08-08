package com.markup.www.service;

import java.util.List;

import com.markup.www.domain.AlarmVO;

public interface AlarmService {

	int pushalarm(AlarmVO avo);

	List<AlarmVO> getAlarm(String id);

	int updateIsCheck(int ano);

}
