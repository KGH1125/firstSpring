package com.markup.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.markup.www.domain.AlarmVO;
import com.markup.www.repository.AlarmDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AlarmServiceImpl implements AlarmService {

	@Inject
	private AlarmDAO adao;
	
	@Override
	public int pushalarm(AlarmVO avo) {
		log.info("AlarmServiceImpl : pushalarm");
		return adao.pushalarm(avo);
		
	}

	@Override
	public List<AlarmVO> getAlarm(String id) {
		log.info("AlarmServiceImpl : getAlarm");
		return adao.getAlarm(id);
	}

	@Override
	public int updateIsCheck(int ano) {
		log.info("AlarmServiceImpl : updateIsCheck");
		return adao.updateIsCheck(ano);
	}

}
