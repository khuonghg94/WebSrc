<%-- 
    Document   : funInAn
    Created on : March 17, 2016, 08:25:36 AM
    Author     : dcthang
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

<%@page import="BusinessLogic.HocSinhBusiness"%>
<%@page import="BusinessLogic.BienNhanBusiness"%>
<%@page import="DataAccess.Adapter.CacHamXuLyAdapter"%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    //request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    //return;

    if (caseName.trim().toLowerCase().equals("indenghi")) {
        Connection con = ConnectionAdapter.connectDataBase();
        try {
            if (con.isClosed()) {
                con = ConnectionAdapter.connectDataBase();
            }

            String hoTen = "", msHS = "", diaChi = "", tenLop = "", ngayNhapHoc = "", tenPhuHuynh = "", gioiTinh = "", ngaySinh = "",
                    doiTuong = "", dienThoai = "", tgThuPhi = "", hanChoThu = "", tienChu = "", tongTien = "", tienAn = "", soNgayAn = "", noiDungDeNghi = "";

            DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
            DateFormat hf = new SimpleDateFormat("H");
            DateFormat mf = new SimpleDateFormat("m");

            double idBDK = Double.parseDouble(request.getParameter("idBDK"));
            double idBN = Double.parseDouble(request.getParameter("idBN"));
            BienNhanBusiness objBN = new BienNhanBusiness();
            ResultSet rsBN = objBN.ThongTinBienNhanTheoIDBN(idBN);

            HocSinhBusiness objHS = new HocSinhBusiness();
            ResultSet rsHS = objHS.ThongTinHocSinhDangKyTheoIDBDK(idBDK);

//    l."IDLL",
//    lh."IDLop",
//    lh."IDHK",
//    bdk."MaLop", 
//    lh."TenLop",
//    bdk."MSHS", 
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh",
//    hs."DiaChi",
//    bdk."IDBDK",
//    bdk."NgayBD",
//    bdk."NgayKT",
//    bdk."GhiChu",
//    hs."GhiChu" as "GhiChuHS",
//    hs."QuocTich",
//    ph."MSPH", 
//    ph."HoTen" as "HoTenPH", 
//    ph."NgaySinh" as "NgaySinhPH", 
//    ph."GioiTinh" as "GioiTinhPH",  
//    ph."DiaChi" as "DiaChiPH",  
//    ph."NgheNghiep" as "NgheNghiepPH",  
//    ph."NoiLamViec" as "NoiLamViecPH",  
//    ph."SoDienThoai" as "SoDienThoaiPH",  
//    ph."Email" as "EmailPH",
//    ngayNhapHocDauTien as "NgayNhapHocDauTien"		           
            while (rsHS.next()) {
                if (rsHS.getBoolean("GioiTinh")) {
                    gioiTinh = "Nam";
                } else {
                    gioiTinh = "Nữ";
                }
                msHS = rsHS.getString("MSHS");
                hoTen = rsHS.getString("HoTenHS");
                ngaySinh = df.format(rsHS.getDate("NgaySinh"));

                tenLop = rsHS.getString("TenLop");
                ngayNhapHoc = df.format(rsHS.getDate("NgayNhapHocDauTien"));
                doiTuong = "Đối tượng";

                tenPhuHuynh = rsHS.getString("HoTenPH");
                diaChi = rsHS.getString("DiaChiPH");
                dienThoai = rsHS.getString("SoDienThoaiPH");
            }

//    bn."IDBN",	
//    bn."NoiDung",
//    bn."TongTien",
//    bn."NgayLap",
//    bn."MaNVLapPhieu",
//    nv."HoTenNV" as "NVLapPhieu",
//    bn."NgayDeNghi",
//    Case When date(bn."NgayDeNghi") = '1990-01-01' Then '-' Else bn."MaNVDeNghi" End as "MaNVDeNghi",
//    Case When date(bn."NgayDeNghi") = '1990-01-01' Then '-' Else nv1."HoTenNV" End as "NVDeNghi",
//    bn."DaDeNghi",
//    bn."NgayXacNhan",
//    Case When date(bn."NgayXacNhan") = '1990-01-01' Then '-' Else bn."MaNVXacNhan" End as "MaNVXacNhan",
//    Case When date(bn."NgayXacNhan") = '1990-01-01' Then '-' Else nv2."HoTenNV" End as "NVXacNhan",	 
//    bn."DaThu",
//    bn."IDBDK",
//    hs."MSHS",	
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh"
            while (rsBN.next()) {
                tgThuPhi = "Từ ngày 01/10/2017 đến 31/10/2017";
                hanChoThu = "trước ngày 11/10/2017";
                tienChu = rsBN.getString("IDBN");
                tongTien = rsBN.getString("IDBN");
                tienAn = rsBN.getString("IDBN");
                soNgayAn = rsBN.getString("IDBN");
                noiDungDeNghi = "về việc thu học phí và các khoản phí tháng 10 năm học 2017-2018 đối với bé " + hoTen;
            }

            File reportFile = new File(application.getRealPath("//reports//repPhieuDeNghi.jasper"));
            Map parameters = new HashMap();
            parameters.put("hoTen", hoTen);
            parameters.put("msHS", "NT" + msHS);
            parameters.put("tenLop", tenLop);
            parameters.put("gioiTinh", gioiTinh);
            parameters.put("ngayNhapHoc", ngayNhapHoc);
            parameters.put("tenPhuHuynh", tenPhuHuynh);
            parameters.put("diaChi", diaChi);
            parameters.put("ngaySinh", ngaySinh);
            parameters.put("doiTuong", doiTuong);
            parameters.put("dienThoai", dienThoai);
            parameters.put("tgThuPhi", tgThuPhi);
            parameters.put("hanChoThu", hanChoThu);
            parameters.put("tienChu", tienChu);
            parameters.put("tongTien", tongTien);
            parameters.put("tienAn", tienAn);
            parameters.put("soNgayAn", soNgayAn);
            parameters.put("noiDungDeNghi", noiDungDeNghi);

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

    if (caseName.trim().toLowerCase().equals("indenghithutien")) {
        try {

            String hoTen = "",
                    diaChi = "",
                    gioiTinh = "",
                    msHS = "",
                    tenLop = "",
                    ndThuTien = "",
                    tienSo = "",
                    tienChu = "",
                    ngaySinh = "",
                    ngayDeNghi = "Ngày 27 tháng 08 năm 2018",
                    ngayNopTien = "Ngày 27 tháng 08 năm 2018";

            DateFormat df = new SimpleDateFormat("dd/MM/yyyy");

            double idBDK = Double.parseDouble(request.getParameter("idBDK"));
            double idBN = Double.parseDouble(request.getParameter("idBN"));
            BienNhanBusiness objBN = new BienNhanBusiness();
            ResultSet rsBN = objBN.ThongTinBienNhanTheoIDBN(idBN);

            HocSinhBusiness objHS = new HocSinhBusiness();
            ResultSet rsHS = objHS.ThongTinHocSinhDangKyTheoIDBDK(idBDK);

//    l."IDLL",
//    lh."IDLop",
//    lh."IDHK",
//    bdk."MaLop", 
//    lh."TenLop",
//    bdk."MSHS", 
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh",
//    hs."DiaChi",
//    bdk."IDBDK",
//    bdk."NgayBD",
//    bdk."NgayKT",
//    bdk."GhiChu",
//    hs."GhiChu" as "GhiChuHS",
//    hs."QuocTich",
//    ph."MSPH", 
//    ph."HoTen" as "HoTenPH", 
//    ph."NgaySinh" as "NgaySinhPH", 
//    ph."GioiTinh" as "GioiTinhPH",  
//    ph."DiaChi" as "DiaChiPH",  
//    ph."NgheNghiep" as "NgheNghiepPH",  
//    ph."NoiLamViec" as "NoiLamViecPH",  
//    ph."SoDienThoai" as "SoDienThoaiPH",  
//    ph."Email" as "EmailPH",
//    ngayNhapHocDauTien as "NgayNhapHocDauTien"	
            while (rsHS.next()) {
                if (rsHS.getBoolean("GioiTinh")) {
                    gioiTinh = "Nam";
                } else {
                    gioiTinh = "Nữ";
                }
                msHS = rsHS.getString("MSHS");
                hoTen = rsHS.getString("HoTenHS");
                ngaySinh = df.format(rsHS.getDate("NgaySinh"));
                tenLop = rsHS.getString("TenLop");
                diaChi = rsHS.getString("DiaChi");
            }

//    bn."IDBN",	
//    bn."NoiDung",
//    bn."TongTien",
//    bn."NgayLap",
//    bn."MaNVLapPhieu",
//    nv."HoTenNV" as "NVLapPhieu",
//    bn."NgayDeNghi",
//    Case When date(bn."NgayDeNghi") = '1990-01-01' Then '-' Else bn."MaNVDeNghi" End as "MaNVDeNghi",
//    Case When date(bn."NgayDeNghi") = '1990-01-01' Then '-' Else nv1."HoTenNV" End as "NVDeNghi",
//    bn."DaDeNghi",
//    bn."NgayXacNhan",
//    Case When date(bn."NgayXacNhan") = '1990-01-01' Then '-' Else bn."MaNVXacNhan" End as "MaNVXacNhan",
//    Case When date(bn."NgayXacNhan") = '1990-01-01' Then '-' Else nv2."HoTenNV" End as "NVXacNhan",	 
//    bn."DaThu",
//    bn."IDBDK",
//    hs."MSHS",	
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh", 
//    hs."GioiTinh"
            
            CacHamXuLyAdapter objXL = new CacHamXuLyAdapter();
            double soTien = 0.0;
            DecimalFormat dgia = new DecimalFormat("#,###,###");
            while (rsBN.next()) {
                soTien = rsBN.getDouble("TongTien");
                tienSo = dgia.format(soTien);
                tienChu = objXL.docso(soTien);
            }
            //   out.print("realPathLogo : " + application.getRealPath("//image//"));
            File reportFile = new File(application.getRealPath("//reports//repDeNghiThuTien.jasper"));
            Map parameters = new HashMap();
            parameters.put("realPathLogo", application.getRealPath("//image//"));
            parameters.put("hoTen", hoTen);
            parameters.put("msHS", "NT" + msHS);
            parameters.put("tenLop", tenLop);
            parameters.put("gioiTinh", gioiTinh);
            parameters.put("diaChi", diaChi);
            parameters.put("ngaySinh", ngaySinh);

            parameters.put("tienSo", tienSo);
            parameters.put("tienChu", tienChu);
            parameters.put("ndThuTien", ndThuTien);
            parameters.put("ngayDeNghi", ngayDeNghi);
            parameters.put("ngayNopTien", ngayNopTien);

            byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath(), parameters, new JREmptyDataSource());

            response.setContentType("application/pdf");
            response.setContentLength(bytes.length);

            ServletOutputStream outStream = response.getOutputStream();
            outStream.write(bytes, 0, bytes.length);
            outStream.flush();
            outStream.close();
        } catch (Exception ex) {
            out.print("Error : " + ex.getMessage());
        }
        return;
    }
%>