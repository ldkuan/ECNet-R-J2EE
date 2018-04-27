package com.ecm.controller;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.io.IOUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ecm.model.LogicNode;
import com.ecm.service.FileManageService;
import com.ecm.service.LogicService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by deng on 2018/3/31.
 */
@RestController
@RequestMapping(value = "/logic")
public class LogicController {
	@Autowired
	private LogicService logicService;
	@Autowired
	private FileManageService fileManageService;

	@RequestMapping(value = "getAll")
	public List<LogicNode> getAll(@RequestParam("caseID") int caseID) {
		return logicService.getAllNodesByCaseID(caseID);
	}

	@RequestMapping(value = "upload")
	@ResponseBody
	public Map<String, Object> handleFileUpload(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("path") String path) throws Exception {
		Map<String, Object> json = new HashMap<String, Object>();
		JSONObject jsonObject = new JSONObject();
		SAXReader saxReader = new SAXReader();
		Document doc = saxReader.read(new FileInputStream(new File(path)));
		String str = doc.asXML();
		// URL url = new URL("http://192.168.0.23:5000/getHeadOfFactAndEvi");

		URL url = new URL("http://127.0.0.1:5000/getRelation");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setDoOutput(true);
		conn.setDoInput(true);
		conn.setUseCaches(false);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Connection", "Keep-Alive");
		conn.setRequestProperty("Charset", "UTF-8");
		conn.setConnectTimeout(100000);
		conn.setReadTimeout(100000);
		byte[] data = str.getBytes();
		conn.setRequestProperty("Content-Length", String.valueOf(data.length));
		conn.setRequestProperty("contentType", "application/json");
		conn.connect();
		OutputStream os = conn.getOutputStream();
		os.write(str.getBytes());
		os.flush();
		os.close();
		String res = "";
		if (conn.getResponseCode() == 200) {
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			String line;
			while ((line = br.readLine()) != null) {
				res += line;
			}
			// jsonObject.put("data", JSONArray.fromObject(res));
			// jsonObject = JSONObject.fromObject(result);
			json.put("message", "文件上传成功");
			json.put("json", JSONArray.fromObject(res));
		} else if (conn.getResponseCode() == 500) {
			System.out.println("计算服务器内部错误");
			json.put("message", "文件上传失败");
			json.put("json", res);
			// jsonObject = null;
		} else {
			System.out.println("计算服务器连接失败");
			json.put("message", "文件上传失败");
			json.put("json", res);
			// jsonObject = null;
		}
		return json;
	}

	@RequestMapping(value = "getJson")
	@ResponseBody
	public Map<String, Object> handleJson(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Map<String, Object> json = new HashMap<String, Object>();
		JSONObject jsonObject = new JSONObject();
		json.put("message", "文件上传成功");
		InputStream is = new FileInputStream(new File("file/xml/result/a.json"));
		String res = IOUtils.toString(is, "UTF-8");
		json.put("json", JSONObject.fromObject(res));
		return json;
	}

	@RequestMapping(value = "generateExcel")
	@ResponseBody
	public String generateExcel(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("logicJson") String logicJson) throws Exception {
		request.setCharacterEncoding("UTF-8");
		String completePath = logicService.generateExcelFile(logicJson);
		return "";
	}

	@RequestMapping(value = "/downloadExcel")
	@ResponseBody
	public String downloadExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		File file = new File("file/excel/logic.xls");
		if (file.exists()) {
			response.setContentType("multipart/form-data");
			response.setCharacterEncoding("utf-8");
			response.addHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode("说理逻辑表.xls", "UTF-8"));// 设置文件名
			byte[] buffer = new byte[1024];
			FileInputStream fis = null;
			BufferedInputStream bis = null;
			try {
				fis = new FileInputStream(file);
				bis = new BufferedInputStream(fis);
				OutputStream os = response.getOutputStream();
				int i = bis.read(buffer);
				while (i != -1) {
					os.write(buffer, 0, i);
					i = bis.read(buffer);
				}
				os.flush();
			} catch (Exception e) {
				e.printStackTrace();
				return "failed";
			} finally {
				try {
					if (bis != null) {
						bis.close();
					}
					if (fis != null) {
						fis.close();
					}
				} catch (IOException e) {
					return "failed:" + e.getMessage();
				}
			}
		}
		return "";
	}

	@RequestMapping(value = "generateReport")
	@ResponseBody
	public String generateReport(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("modelsJson") String modelsJson, @RequestParam("logicJson") String logicJson)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		String res = logicService.generateReportFile(modelsJson, logicJson);
		return "";
	}

	@RequestMapping(value = "/downloadReport")
	@ResponseBody
	public String downloadReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		File file = new File("file/excel/report.xls");
		if (file.exists()) {
			response.setContentType("multipart/form-data");
			response.setCharacterEncoding("utf-8");
			response.addHeader("Content-Disposition",
					"attachment;fileName=" + URLEncoder.encode("证据分析报告.xls", "UTF-8"));// 设置文件名
			byte[] buffer = new byte[1024];
			FileInputStream fis = null;
			BufferedInputStream bis = null;
			try {
				fis = new FileInputStream(file);
				bis = new BufferedInputStream(fis);
				OutputStream os = response.getOutputStream();
				int i = bis.read(buffer);
				while (i != -1) {
					os.write(buffer, 0, i);
					i = bis.read(buffer);
				}
				os.flush();
			} catch (Exception e) {
				e.printStackTrace();
				return "failed";
			} finally {
				try {
					if (bis != null) {
						bis.close();
					}
					if (fis != null) {
						fis.close();
					}
				} catch (IOException e) {
					return "failed:" + e.getMessage();
				}
			}
		}
		return "";
	}
}
