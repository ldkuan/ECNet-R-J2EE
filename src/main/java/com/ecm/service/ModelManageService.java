package com.ecm.service;

import com.ecm.model.*;

import java.util.List;

public interface ModelManageService {

    public void saveHeaders(List<MOD_Header> headers);

    public void saveBodys(List<MOD_Body> bodies);

    public void saveJoints(List<MOD_Joint> joints);

    public void saveArrows(List<MOD_Arrow> arrows);

    public void saveLinks(List<MOD_Link> links);
}
