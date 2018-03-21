package com.ecm.service;

import com.ecm.model.*;

import java.util.List;

public interface ModelManageService {

    public void saveHeaders(List<MOD_Header> headers);

    public void deleteHeadersByCid(int cid);

    public void saveBodies(List<MOD_Body> bodies);

    public void deleteBodiesByCid(int cid);

    public void saveJoints(List<MOD_Joint> joints);

    public void deleteJointsByCid(int cid);

    public void saveArrows(List<MOD_Arrow> arrows);

    public void deleteArrowsByCid(int cid);

    public void saveLinks(List<MOD_Link> links);

    public void deleteLinksByCid(int cid);
}
