package com.markup.www.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.markup.www.domain.AlarmVO;

import com.markup.www.service.AlarmService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/alarm/*")
public class AlarmController {

	@Inject
	private AlarmService asv;

	@PostMapping(value = "/push", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> pushAlarm(@RequestBody AlarmVO avo) {
		log.info("Received alarm: " + avo.toString());
		return asv.pushalarm(avo) > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/getAlarm/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<AlarmVO>> getList(@PathVariable("id") String id) {
		List<AlarmVO> list = asv.getAlarm(id);
		return new ResponseEntity<List<AlarmVO>>(list, HttpStatus.OK);
	}

	@PutMapping(value = "/updateIsCheck/{ano}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<String> updateIsCheck(@PathVariable("ano") int ano) {
		log.info("updateIsCheck : ano = " + ano);
		return asv.updateIsCheck(ano) > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

}
