package com.ecm.service;

import java.util.List;

import com.ecm.model.LogicNode;

/**
 * Created by deng on 2018/3/28.
 */
public interface LogicService {
	List<LogicNode> getAllNodesByCaseID(int caseID);

	String generateExcelFile(int caseID);
}
