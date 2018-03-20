package com.ecm.keyword.manager;

public class TypeCalculator {

    //证人证言，被告人供述和辩解，书证，鉴定结论，勘验、检查笔录，其他
    public int calType(String evidence){
        if(evidence.contains("证人")){
            return 0;
        }
        if(evidence.contains("被告人")){
            return 1;
        }
        if(evidence.contains("？？")){
            return 2;
        }
        if(evidence.contains("鉴定")){
            return 3;
        }
        if(evidence.contains("勘验")){
            return 4;
        }else{
            return 5;
        }
    }







}
