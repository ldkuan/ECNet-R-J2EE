package com.ecm.keyword.test;

import com.ecm.keyword.model.EvidenceType;
import jdk.nashorn.internal.parser.JSONParser;
import net.sf.json.JSONObject;
import net.sf.json.JSONString;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by dongyixuan on 2017/12/5.
 */
public class Test {
    public static void main(String[] args)  {
       String type="勘验、检查笔录";

        System.out.println(EvidenceType.getTpeByName(type).getIndex());
    }
}