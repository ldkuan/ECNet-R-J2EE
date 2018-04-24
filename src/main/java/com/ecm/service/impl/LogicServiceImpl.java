package com.ecm.service.impl;

import com.ecm.dao.LogicNodeDao;
import com.ecm.model.LogicNode;
import com.ecm.service.LogicService;
import com.ecm.util.LogicExcelGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

/**
 * Created by deng on 2018/3/28.
 */
@Service
@PropertySource(value = { "classpath:application.properties" }, encoding = "utf-8")
public class LogicServiceImpl implements LogicService {
	@Autowired
	private LogicNodeDao logicNodeDao;
	@Value("${download.logicnode.excel}")
	private String downloadExcelPath;

	private String[] types = { "证据", "事实", "法条", "结论" };

	@Override
	public List<LogicNode> getAllNodesByCaseID(int caseID) {
		List<LogicNode> logicNodes = logicNodeDao.findByCaseID(caseID);
		return logicNodes;
	}

	@Override
	public String generateExcelFile(int caseID) {
		List<LogicNode> nodes = logicNodeDao.findByCaseID(caseID);
		new LogicExcelGenerator(downloadExcelPath, nodes).generateExcelFile();
		return downloadExcelPath;
	}
}
