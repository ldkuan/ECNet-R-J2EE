package com.ecm.service.impl;

import com.ecm.dao.*;
import com.ecm.keyword.manager.ChainCreator;
import com.ecm.keyword.manager.HeadCreator;
import com.ecm.keyword.manager.KeyWordCalculator;
import com.ecm.keyword.model.EvidenceModel;
import com.ecm.keyword.model.FactModel;
import com.ecm.keyword.reader.JsonReader;
import com.ecm.keyword.reader.ReaderFactory;
import com.ecm.keyword.reader.XMLReader;
import com.ecm.model.*;
import com.ecm.service.ModelManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class ModelManageServiceImpl implements ModelManageService {


    @Override
    public JSONArray getModel(String path) {

        JSONArray jsonArray = new JSONArray();


        ArrayList<FactModel> factList = new ArrayList<FactModel>();


        ChainCreator chainCreator = new ChainCreator();
        ArrayList<FactModel> fList = new ArrayList<FactModel>();
        ArrayList<EvidenceModel> eList = new ArrayList<EvidenceModel>();

        //构造证据链，中间json保存至file/result/
        chainCreator.creatChain(path, "temp.xml", fList, eList);

        //从xml获取factmodels
        List<FactModel> factModels = new ArrayList<>();
        try {
            factModels = getFactModels(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        ArrayList<EvidenceModel> evidenceModels = new ArrayList<>();
        for (FactModel factModel : factModels) {
            evidenceModels.addAll(factModel.getEvidenceList());
        }


        //拆分事实
        List<FactModel> factModelsDeposited = depositeFact(factModels);
        for (FactModel factModel : factModelsDeposited) {
            factModel.setEvidenceList(evidenceModels);

            //转json
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("content",factModel.getContent());
            jsonObject.put("keyWordMap",factModel.getKeyWordMap());
            jsonObject.put("evidenceList",factModel.getEvidenceList());
            System.out.println("JsonObject"+jsonObject.toString());
            jsonArray.add(jsonObject);
        }




        return jsonArray;
    }


    private List<FactModel> getFactModels(String folder) throws IOException {
        String factJsonPath = folder + "/result/fact/tempfact.json";

        JsonReader jsonReader = new JsonReader();
        ArrayList<FactModel> factList = jsonReader.readFactModelListFromFile(factJsonPath);

        return factList;
    }

    private List<FactModel> depositeFact(List<FactModel> factModels) {

        System.out.println("------------------------------------------deposite  fact");
        KeyWordCalculator calculator = new KeyWordCalculator();

        List<FactModel> factModelsReturn = new ArrayList<>();
        for (FactModel factModel : factModels) {
            String content = factModel.getContent();
            String[] contents = content.split("。");
            for (int i = 0; i < contents.length; i++) {
                String factContent = contents[i];
                FactModel temp = new FactModel();
                temp.setContent(factContent);
                temp.setKeyWordMap(calculator.calcKeyWord(factContent));

                System.out.println("Deposite:" + temp.getContent());
                System.out.println("Deposite:" + temp.getKeyWordMap());
                System.out.println("");

                factModelsReturn.add(temp);
            }
        }

        return factModelsReturn;


    }

//    public static void main(String args[]) throws IOException {
//        ModelManageServiceImpl modelManageService = new ModelManageServiceImpl();
//        //从xml获取factmodels;
//        List<FactModel> factModels = new ArrayList<>();
//        try {
//            factModels = modelManageService.getFactModels("C:/Users/ldk/Documents/git-space/ECNet-R-J2EE/file/xml");
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        ArrayList<EvidenceModel> evidenceModels = new ArrayList<>();
//        for (FactModel factModel : factModels) {
//            evidenceModels.addAll(factModel.getEvidenceList());
//        }
//
//        JSONArray jsonArray = new JSONArray();
//
//        //拆分事实
//        List<FactModel> factModelsDeposited = modelManageService.depositeFact(factModels);
//        for (FactModel factModel : factModelsDeposited) {
//            factModel.setEvidenceList(evidenceModels);
//
//            //转json
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("content",factModel.getContent());
//            jsonObject.put("keyWordMap",factModel.getKeyWordMap());
//            jsonObject.put("evidenceList",factModel.getEvidenceList());
//            System.out.println("JsonObject"+jsonObject.toString());
//            jsonArray.add(jsonObject);
//        }
//
//        JSONObject jsonObject = HeadCreator.getHead(jsonArray);
//        System.out.println(jsonObject.toString());
//
//
//    }


}
