package com.ecm.keyword.manager;

import org.ansj.domain.Result;
import org.ansj.domain.Term;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class WordFilter {

    ArrayList<String> stopWords;

    final String stopWordUrl="/file/stopWords.txt";

    public WordFilter(){
        stopWords = getStopWords();
    }

    public void filterStopWords(Result result){
        List<Term> terms = new ArrayList<Term>();

        for(Term term : result){
            if(!stopWords.contains(term.getName())){
                terms.add(term);
            }
        }
        result.setTerms(terms);
    }

    public List<String> filterStopWords(List<String> list){
        List<String> resultList = new ArrayList<String>();

        for(String str : list){
            if (str.length() == 1){
                continue;
            }
            if(!stopWords.contains(str)){
                resultList.add(str);
            }
        }

        return resultList;
    }

    public void filterSingleWords(Result result){
        List<Term> terms = new ArrayList<Term>();

        for(Term term : result){
            if(term.getName().length()>1){
                terms.add(term);
            }
        }
        result.setTerms(terms);
    }
    public ArrayList<String> getStopWords(){
        ArrayList<String> stopWords = new ArrayList<String>();

        try {
            File f = new File("");

            FileInputStream fis = new FileInputStream(f.getAbsolutePath()+stopWordUrl);
            BufferedReader reader = new BufferedReader(new InputStreamReader(fis,"UTF-8"));
            String tempString = null;
            while ((tempString = reader.readLine())!=null) {
                stopWords.add(tempString);
            }
            reader.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return stopWords;
    }
}