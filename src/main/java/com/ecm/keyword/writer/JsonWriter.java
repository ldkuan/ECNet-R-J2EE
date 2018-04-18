package com.ecm.keyword.writer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

/**
 * Created by dongyixuan on 2017/12/25.
 */
public class JsonWriter<T> {
    public void writeListToJson(ArrayList<T> list, String fileUrl) throws IOException{
        OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(fileUrl), StandardCharsets.UTF_8);
        Gson gson = new GsonBuilder().create();
        gson.toJson(list,writer);
        writer.close();
    }

    public void writeJsonToFile(String filePath, String sets) throws IOException {
        FileWriter fw = new FileWriter(filePath);
        PrintWriter out = new PrintWriter(fw);
        out.write(sets);
        fw.close();
        out.close();
    }
}
