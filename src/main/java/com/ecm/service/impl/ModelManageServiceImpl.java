package com.ecm.service.impl;

import com.ecm.dao.*;
import com.ecm.model.*;
import com.ecm.service.ModelManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ModelManageServiceImpl implements ModelManageService {

    @Autowired
    private MOD_HeaderDao headerDao;
    @Autowired
    private MOD_BodyDao bodyDao;
    @Autowired
    private MOD_JointDao jointDao;
    @Autowired
    private MOD_ArrowDao arrowDao;
    @Autowired
    private MOD_LinkDao linkDao;

    @Override
    @Transactional
    public void saveHeaders(List<MOD_Header> headers) {
        for(int i = 0;i<headers.size();i++){
            headerDao.save(headers.get(i));
        }
    }

    @Override
    public void saveBodys(List<MOD_Body> bodies) {
        for(int i = 0;i<bodies.size();i++){
            bodyDao.save(bodies.get(i));
        }
    }

    @Override
    public void saveJoints(List<MOD_Joint> joints) {
        for(int i = 0;i<joints.size();i++){
            jointDao.save(joints.get(i));
        }
    }

    @Override
    public void saveArrows(List<MOD_Arrow> arrows) {
        for(int i = 0;i<arrows.size();i++){
            arrowDao.save(arrows.get(i));
        }
    }

    @Override
    public void saveLinks(List<MOD_Link> links) {
        for(int i = 0;i<links.size();i++){
            linkDao.save(links.get(i));
        }
    }
}
