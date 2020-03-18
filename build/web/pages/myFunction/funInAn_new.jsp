<%-- 
    Document   : funInAn_new
    Created on : Oct 1, 2019, 3:49:56 PM
    Author     : Administrator
--%>

<%@page import="net.sf.jasperreports.engine.JasperRunManager"%>
<%@page import="net.sf.jasperreports.engine.JREmptyDataSource"%>

<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.util.Locale"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.SQLException"%>
<%@page import="DataAccess.Adapter.ConnectionAdapter"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.io.*"%>
<%@page import="java.io.File"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>

<%@page import="BusinessLogic.HocSinhBusiness_new"%>
<%@page import="DataAccess.Adapter.CacHamXuLyAdapter"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String caseName = request.getParameter("caseName");
    if (caseName.trim().toLowerCase().equals("intdsk")) {
        Connection con = ConnectionAdapter.connectDataBase();
        try {
            if (con.isClosed()) {
                con = ConnectionAdapter.connectDataBase();
            }

            String ketLuanChung= "", canNang = "", chieuCao = "", ngayKham = "", MaSoNVLap = "", MaSoNVKL = "", hoTenHS = "", gioiTinh="", ngaySinh = "", diaChi="", tenLop="", HoTenNVLap="", HoTenNVKetLuan=""; 
            int idSTDSK = 0;
            DateFormat df = new SimpleDateFormat("dd/M/yyyy hh:mm:ss");
            DateFormat df1 = new SimpleDateFormat("dd/MM/yyyy");
            double IDSSK = Double.parseDouble(request.getParameter("IDSSK"));

            HocSinhBusiness_new objHS = new HocSinhBusiness_new();
            ResultSet rsHS = objHS.ThongTinInSTDSK_TheoIDSTDSK(IDSSK);
//        "temp3"."IDSTDSK",
//        "temp3"."NgayKham",
//	  "temp3"."CanNang",
//	  "temp3"."ChieuCao",
//	  "temp3"."MaNVLap",
//	  "temp3"."MaNVKetLuan",
//	  "temp3"."KetLuanChung",
//	  "temp3"."HoTenHS",
//	  "temp3"."GioiTinh",
//	  "temp3"."NgaySinh",
//	  "temp3"."DiaChi",
//	  "temp3"."HoTenNVLap",
//	  "temp3"."HoTenNVKetLuan",
//	  "lh"."TenLop"		           
            while (rsHS.next()) {
                if (rsHS.getBoolean("GioiTinh")) {
                    gioiTinh = "Nam";
                } else {
                    gioiTinh = "Nữ";
                }
                MaSoNVLap = rsHS.getString("MaNVLap");
                MaSoNVKL = rsHS.getString("MaNVKetLuan");
                idSTDSK = rsHS.getInt("IDSTDSK");
                ngayKham = df.format(rsHS.getTimestamp("NgayKham"));
                tenLop = rsHS.getString("TenLop");
                diaChi = rsHS.getString("DiaChi");
                HoTenNVLap = rsHS.getString("HoTenNVLap");
                HoTenNVKetLuan = rsHS.getString("HoTenNVKetLuan");
                hoTenHS = rsHS.getString("HoTenHS");
                ngaySinh = df1.format(rsHS.getDate("NgaySinh"));
                canNang = rsHS.getString("CanNang");
                chieuCao = rsHS.getString("ChieuCao");
                ketLuanChung = rsHS.getString("KetLuanChung");
            }

            File reportFile = new File(application.getRealPath("//reports//rpt_SoTDSK.jasper"));
            Map parameters = new HashMap();
            parameters.put("maSoTDSK", idSTDSK);
            parameters.put("hoTenHS", hoTenHS);
            parameters.put("tenLopHS", tenLop);
            parameters.put("gioiTinhHS", gioiTinh);
            parameters.put("ngayKham", ngayKham);
            parameters.put("ngaySinhHS", ngaySinh);
            parameters.put("HoTenNVLap", HoTenNVLap);
            parameters.put("HoTenNVKetLuan", HoTenNVKetLuan);
            parameters.put("MaSoNVLap", MaSoNVLap);
            parameters.put("MaSoNVKL", MaSoNVKL);
            parameters.put("diaChiHS", diaChi);
            parameters.put("canNang", canNang);
            parameters.put("chieuCao", chieuCao);
            parameters.put("ketLuanChung", ketLuanChung);
            
            byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath(), parameters, con);

            response.setContentType("application/pdf");
            response.setContentLength(bytes.length);

            ServletOutputStream outStream = response.getOutputStream();
            outStream.write(bytes, 0, bytes.length);
            outStream.flush();
            outStream.close();

            con.close();
        } catch (Exception ex) {
            con.close();
            out.print("Error : " + ex.getMessage());
        }
        return;
    }
    
%>
