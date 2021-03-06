package com.ecm.keyword.writer;

import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

public class XmlWriter {

    public void write(File file, String path) {
        try {

            XMLWriter writer = new XMLWriter(OutputFormat.createPrettyPrint());
            FileOutputStream fos = new FileOutputStream(path);
            writer.setOutputStream(fos);

            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = dbf.newDocumentBuilder();
            Document doc = builder.parse(file); //编译xml

            writer.write(doc);
            System.out.println("写出完毕!");
            writer.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ByteArrayOutputStream inputToOutput(InputStream in) throws Exception {

        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        int ch;
        while ((ch = in.read()) != -1) {
            swapStream.write(ch);
        }
        return swapStream;
    }
}
