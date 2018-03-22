package com.ecm.service;

import com.ecm.model.*;
//import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.List;

public interface ModelManageService {

    public JSONObject getEvidences(int cid);

    public List<MOD_Joint> getJoints(int cid);

    public List<MOD_Arrow> getArrows(int cid);

    public void saveHeaders(List<Evidence_Head> headers);

    public void deleteHeadersByCid(int cid);

    public void saveBodies(List<Evidence_Body> bodies);

    public void deleteBodiesByCid(int cid);

    public void saveJoints(List<MOD_Joint> joints);

    public void deleteJointsByCid(int cid);

    public void saveArrows(List<MOD_Arrow> arrows);

    public void deleteArrowsByCid(int cid);

}
