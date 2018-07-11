package com.ecm.keyword.manager;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class HeadCreator {
//    public static JSONObject getHead(JSONObject evidenceList) throws IOException {
//        JSONObject jsonObject = evidenceList;
//        URL url = new URL("http://192.168.0.23:5000/getHeadOfEvidence");
//        // 建立http连接
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        // 设置允许输出
//        conn.setDoOutput(true);
//
//        conn.setDoInput(true);
//
//        // 设置不用缓存
//        conn.setUseCaches(false);
//        // 设置传递方式
//        conn.setRequestMethod("POST");
//        // 设置维持长连接
//        conn.setRequestProperty("Connection", "Keep-Alive");
//        // 设置文件字符集:
//        conn.setRequestProperty("Charset", "UTF-8");
//        //String json="{\"evidenceList\":[{\"id\":296,\"content\":\"test\",\"type\":\"其他\",\"keyWordMap\":{\"what\":[],\"how much\":[],\"where\":[],\"when\":[],\"who\":[]},\"headList\":[]},{\"id\":297,\"content\":\"托尔斯泰\",\"type\":\"其他\",\"keyWordMap\":{\"what\":[],\"how much\":[],\"where\":[],\"when\":[],\"who\":[\"托尔斯泰\"]},\"headList\":[]}]}";
//        String json = evidenceList.toString();
//        String answer1 = json;
//        System.out.println("请求json串：" + json);
//        //answer1=answer1.substring(1,answer1.length()-1);
//        //转换为字节数组
//        byte[] data = answer1.getBytes();
//        // 设置文件长度
//        conn.setRequestProperty("Content-Length", String.valueOf(data.length));
//
//        // 设置文件类型:
//        conn.setRequestProperty("contentType", "application/json");
//        conn.connect();
//        OutputStream out1 = conn.getOutputStream();
//        // 写入请求的字符串
//        out1.write(answer1.getBytes());
//        out1.flush();
//        out1.close();
//
//        // System.out.println(conn.getResponseCode());
//        if (conn.getResponseCode() == 200) {
//            System.out.println("连接成功");
//            // 请求返回的数据
//            try {
//
//
//                String result = "";
//                BufferedReader test = new BufferedReader(
//                        new InputStreamReader(conn.getInputStream()));
//                String line;
//                while ((line = test.readLine()) != null) {
//                    result += line;
//                }
//                System.out.println(jsonObject.toString());
//
//                jsonObject = JSONObject.fromObject(result);
//
//
//            } catch (Exception e1) {
//                // TODO Auto-generated catch block
//                e1.printStackTrace();
//                return null;
//            }
//        } else if (conn.getResponseCode() == 500) {
//            System.out.println("服务器内部错误");
//            return null;
//        } else {
//            System.out.println("连接失败");
//            return null;
//        }
//        return jsonObject;
//    }


    public static JSONObject getHead(JSONArray factList) throws IOException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("factList",factList);
        URL url = new URL("http://114.212.240.10:5000/getHeadOfFactAndEvi");
        // 建立http连接
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        // 设置允许输出
        conn.setDoOutput(true);

        conn.setDoInput(true);

        // 设置不用缓存
        conn.setUseCaches(false);
        // 设置传递方式
        conn.setRequestMethod("POST");
        // 设置维持长连接
        conn.setRequestProperty("Connection", "Keep-Alive");
        // 设置文件字符集:
        conn.setRequestProperty("Charset", "UTF-8");
        conn.setConnectTimeout(100000);
        conn.setReadTimeout(100000);
        //String json="{\"evidenceList\":[{\"id\":296,\"content\":\"test\",\"type\":\"其他\",\"keyWordMap\":{\"what\":[],\"how much\":[],\"where\":[],\"when\":[],\"who\":[]},\"headList\":[]},{\"id\":297,\"content\":\"托尔斯泰\",\"type\":\"其他\",\"keyWordMap\":{\"what\":[],\"how much\":[],\"where\":[],\"when\":[],\"who\":[\"托尔斯泰\"]},\"headList\":[]}]}";
        String json = jsonObject.toString();
        String answer1 = json;
        System.out.println("请求json串：" + json);
        //answer1=answer1.substring(1,answer1.length()-1);
        //转换为字节数组
        byte[] data = answer1.getBytes();
        // 设置文件长度
        conn.setRequestProperty("Content-Length", String.valueOf(data.length));

        // 设置文件类型:
        conn.setRequestProperty("contentType", "application/json");
        conn.connect();
        OutputStream out1 = conn.getOutputStream();
        // 写入请求的字符串
        out1.write(answer1.getBytes());
        out1.flush();
        out1.close();

        // System.out.println(conn.getResponseCode());
        if (conn.getResponseCode() == 200) {
            System.out.println("************************************计算服务器连接成功********************************");
            // 请求返回的数据
            try {


                String result = "";
                BufferedReader test = new BufferedReader(
                        new InputStreamReader(conn.getInputStream()));
                String line;
                while ((line = test.readLine()) != null) {
                    result += line;
                }

                jsonObject = JSONObject.fromObject(result);


            } catch (Exception e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
                return null;
            }
        } else if (conn.getResponseCode() == 500) {
            System.out.println("************************************计算服务器内部错误********************************");
            return null;
        } else {
            System.out.println("************************************计算服务器连接失败********************************");
            return null;
        }
        return jsonObject;
    }

}
