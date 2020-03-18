<%-- 
    Document   : funBienNhan
    Created on : July 12, 2018, 2:40:31 PM
    Author     : Sol
--%>

<%@page import="java.text.DecimalFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.BienNhanBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    //out.print(caseName);

    if (caseName.trim().toLowerCase().equals("ndbiennhan")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));
        double idBN = Double.parseDouble(request.getParameter("idBN"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Date ngayLap = df.parse(request.getParameter("ngayLap"));

        DecimalFormat dgia = new DecimalFormat("#,###,###");

        BienNhanBusiness objBN = new BienNhanBusiness();
        ResultSet rs = objBN.ChiTietBienNhan(idBDK, ngayLap, idBN);
//    ckt."IDLop",
//    ckt."IDKT",				
//    g."NgayBD",
//    g."NgayKT",
//    g."SoTien",
//    kt."TenKhoanThu",			
//    kt."SoLan",
//    kt."BatBuoc",
//    kt."GhiChu",
//    Coalesce(ctbn."IDBN", -1) as "IDBN",
//    Coalesce(ctbn."SoTien", g."SoTien") as "SoTienCTBN",
//    Coalesce(ctbn."SoLuong", 1) as "SoLuong",				
//    Coalesce(ctbn."TiLe", 0.0) as "TiLe",
//    Coalesce(ctbn."SoTienGiam", g."SoTien") as "SoTienGiam",
//    Coalesce(ctbn."MienGiam",'-') as "MienGiam",
//    Coalesce(ctbn."GhiChu",'-') as "GhiChuCTBN"

        int soLuong = 1;
        double tienGiam = 0.0, sumTT = 0.0;
        String strChon = "", strSoTien = "-", strTienGiam = "-", strTiLe = "", strSumTT = "0", strGiam = "", strTang = "", strSoLuong = "0", strIDKT = "0", strIDBN = "0", strTemp = "";
        while (rs.next()) {
            strTiLe = rs.getString("TiLe");
            strIDKT = rs.getString("IDKT");
            strIDBN = rs.getString("IDBN");

            strGiam = "<img src='../image/32x32_ArrowDown1.png' width='20' height='20' title='Giảm -1' align='middle' onclick='giamSoLuong(" + strIDKT + "," + strIDBN + ")' />";
            strTang = "<img src='../image/32x32_ArrowUp1.png' width='20' height='20' title='Tăng +1' align='middle' onclick='tangSoLuong(" + strIDKT + "," + strIDBN + ")' />";

            try {
                soLuong = rs.getInt("SoLuong");
                strSoLuong = strGiam + "<span id='spSL" + strIDKT + "' style='margin: 1px 10px 1px 10px; padding: 3px 0px 0px 3px; color:darkblue; font-weight: bold; font-size: 16px'>" + soLuong + "</span>" + strTang;

                strSoTien = dgia.format(rs.getDouble("SoTienCTBN"));
                strSoTien = "<span id='spST" + strIDKT + "' style='padding: 3px 0px 0px 3px; color:darkblue; font-size: 16px'>" + strSoTien + "</span>";

                tienGiam = rs.getDouble("SoTienGiam");
                strTienGiam = dgia.format(tienGiam);
                strTienGiam = "<span id='spTG" + strIDKT + "' style='padding: 3px 0px 0px 3px; color:darkblue; font-size: 16px'>" + strTienGiam + "</span>";

                sumTT = sumTT + tienGiam;
                strSumTT = dgia.format(sumTT);
                strSumTT = "<span id='spSumTT' style='padding: 3px 0px 0px 3px; color:darkred; font-weight: bold; font-size: 17px'>" + strSumTT + "</span>";
            } catch (SQLException ex) {
                soLuong = 0;
                strSoLuong = "Error";

                strSoTien = "-";
                strTienGiam = "-";

                sumTT = 0.0;
                strSumTT = "Error";
            }

            strTemp = "<select class='txtInput' id='cboTiLe" + strIDKT + "'  onchange='changeMienGiam(" + strIDKT + "," + strIDBN + ")'>"
                    + "     <option value='0.0'>0%</option>"
                    + "     <option value='5.0'>5%</option>"
                    + "     <option value='10.0'>10%</option>"
                    + "     <option value='15.0'>15%</option>"
                    + "     <option value='20.0'>20%</option>"
                    + "     <option value='25.0'>25%</option>"
                    + "     <option value='30.0'>30%</option>"
                    + "     <option value='35.0'>35%</option>"
                    + "     <option value='40.0'>40%</option>"
                    + "     <option value='45.0'>45%</option>"
                    + "     <option value='50.0'>50%</option>"
                    + "     <option value='55.0'>55%</option>"
                    + "     <option value='100.0'>100%</option>"
                    + "</select>";

            if (strTemp.indexOf("'" + strTiLe + "'") != -1) {
                strTemp = strTemp.replace("'" + strTiLe + "'", "'" + strTiLe + "' selected");
            }

            if (rs.getDouble("IDBN") == -1) {
                strChon = "<input type='checkbox' id='chk" + strIDKT + "' value='" + strIDKT + "' style='margin-left:auto; margin-right:auto;' checked />";
            } else {
                strChon = "<i class='fa fa-trash-o fa-lg' title='Xóa' onclick='funKhoanThu(" + strIDKT + "," + strIDBN + ")'></i>";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td id='" + strIDKT + "'>" + rs.getString("TenKhoanThu") + "</td>");
//            + " || " + strTemp.indexOf(strTiLe)
            out.print("<td align='right' id='" + strIDBN + "'>" + strSoTien + "</td>");
            out.print("<td align='center' id='" + strIDBN + "'>" + strSoLuong + "</td>");
            out.print("<td align='center' id='" + strIDBN + "'>" + strTemp + "</td>");
            out.print("<td align='right' id='" + strIDBN + "'>" + strTienGiam + "</td>");
            out.print("<td align='center' id='" + strIDBN + "'>" + strChon + "</td>");
            out.print("</tr>");
        }
        out.print("<tr class='tomauHover'>"
                + "<td align='center' colspan='4'><span style='color:#4E1D74; font-weight: bold; font-size: 17px'>Tổng: </span></td>"
                + "<td align='right'>" + strSumTT + "</td>"
                + "<td></td>"
                + "</tr>");
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatebiennhan")) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date ngayLap = df.parse(request.getParameter("ngayLap"));

        double idBDK = Double.parseDouble(request.getParameter("idBDK"));
        String sumTT = request.getParameter("sumTT");
        String maNVLap = request.getParameter("maNVLap");
        String noiDung = request.getParameter("noiDung");
        String ndXNDeNghi = request.getParameter("ndXNDeNghi");
        String ndTaiChinh = request.getParameter("ndTaiChinh");
        String listChiTiet = request.getParameter("listChiTiet");

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
//        if (isEdit.equals("edit")) {
//            result = objBN.SuaChuyenLopDangKy(inID, ngayBD, ngayKT, ghiChu);
//        } else if (isEdit.equals("add")) {
        result = objBN.LapBienNhan(listChiTiet, noiDung, maNVLap, ngayLap, idBDK, sumTT, ndXNDeNghi, ndTaiChinh);
//        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dsbiennhan")) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Date tuNgayLap = df.parse(request.getParameter("tuNgayLap"));
        Date denNgayLap = df.parse(request.getParameter("denNgayLap"));
        String nameTab = request.getParameter("nameTab");

        BienNhanBusiness objBN = new BienNhanBusiness();
        ResultSet rs = objBN.DanhSachBienNhan(nameTab, tuNgayLap, denNgayLap);
//    bn."IDBN",	
//    bn."NoiDung",
//    bn."TongTien",
//    bn."NgayLap",
//    bn."MaNVLapPhieu",
//    nv."HoTenNV" as "NVLapPhieu",
//    bn."NgayDeNghi",
//    bn."MaNVDeNghi",
//    nv1."HoTenNV" as "NVDeNghi",
//    bn."NgayXacNhan",
//    bn."MaNVXacNhan",
//    nv2."HoTenNV" as "NVXacNhan",
//    bn."IDBDK",
//    hs."MSHS",
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh",		
//    bn."DaThu"

        int stt = 1;
        String strSumTT = "0", strIDBN = "";
        DecimalFormat dgia = new DecimalFormat("#,###,###");
        DateFormat dff = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        while (rs.next()) {
            try {
                strSumTT = dgia.format(rs.getDouble("TongTien"));
            } catch (SQLException ex) {
                strSumTT = "Error";
            }

            strIDBN = rs.getString("IDBN");
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + strIDBN + "'>" + stt + "(" + strIDBN + ")</td>");
            out.print("<td align='center' id='" + strIDBN + "'>" + dff.format(rs.getTimestamp("NgayLap")) + "</td>");
            out.print("<td id='" + rs.getString("MaNVLapPhieu") + "'>" + rs.getString("NVLapPhieu") + "</td>");
            out.print("<td id='" + rs.getString("IDBDK") + "'>" + rs.getString("HoTenHS") + "</td>");
            out.print("<td id='" + strIDBN + "'>" + rs.getString("NoiDung") + "</td>");
            out.print("<td align='right' id='" + strIDBN + "'>" + strSumTT + "</td>");
            out.print("<td align='center' id='" + strIDBN + "'><a href='#' title='Xem chi tiết' onclick='xemBienNhan(); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("infobiennhan")) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        DateFormat hf = new SimpleDateFormat("H");
        DateFormat mf = new SimpleDateFormat("m");

        double idBN = Double.parseDouble(request.getParameter("idBN"));
        BienNhanBusiness objBN = new BienNhanBusiness();
        ResultSet rs = objBN.ThongTinBienNhanTheoIDBN(idBN);
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
//    hs."GioiTinh",
//    bn."NoiDungDeNghiXacNhan",
//    bn."NoiDungTaiChinh"	

        String ngayLP = "01/01/1990", gioLP = "0", phutLP = "0", maNVLP = "", tenNVLP = "", noiDungLP = "";
        String ngayDN = "01/01/1990", gioDN = "0", phutDN = "0", maNVDN = "", tenNVDN = "", isDeNghi = "false";
        String ngayXN = "01/01/1990", gioXN = "0", phutXN = "0", maNVXN = "", tenNVXN = "", isXacNhan = "false";

        String result = "";
        while (rs.next()) {
            ngayLP = df.format(rs.getTimestamp("NgayLap"));
            gioLP = hf.format(rs.getTimestamp("NgayLap"));
            phutLP = mf.format(rs.getTimestamp("NgayLap"));
            maNVLP = rs.getString("MaNVLapPhieu");
            tenNVLP = rs.getString("NVLapPhieu");
            noiDungLP = rs.getString("NoiDung");

            ngayDN = df.format(rs.getTimestamp("NgayDeNghi"));
            gioDN = hf.format(rs.getTimestamp("NgayDeNghi"));
            phutDN = mf.format(rs.getTimestamp("NgayDeNghi"));
            maNVDN = rs.getString("MaNVDeNghi");
            tenNVDN = rs.getString("NVDeNghi");
            if (rs.getBoolean("DaDeNghi")) {
                isDeNghi = "true";
            } else {
                isDeNghi = "false";
            }

            ngayXN = df.format(rs.getTimestamp("NgayXacNhan"));
            gioXN = hf.format(rs.getTimestamp("NgayXacNhan"));
            phutXN = mf.format(rs.getTimestamp("NgayXacNhan"));
            maNVXN = rs.getString("MaNVXacNhan");
            tenNVXN = rs.getString("NVXacNhan");
            if (rs.getBoolean("DaThu")) {
                isXacNhan = "true";
            } else {
                isXacNhan = "false";
            }

            result = ngayLP + "<s>"
                    + gioLP + "<s>"
                    + phutLP + "<s>"
                    + maNVLP + "<s>"
                    + tenNVLP + "<s>"
                    + noiDungLP + "<s>"
                    + ngayDN + "<s>"
                    + gioDN + "<s>"
                    + phutDN + "<s>"
                    + maNVDN + "<s>"
                    + tenNVDN + "<s>"
                    + isDeNghi + "<s>"
                    + ngayXN + "<s>"
                    + gioXN + "<s>"
                    + phutXN + "<s>"
                    + maNVXN + "<s>"
                    + tenNVXN + "<s>"
                    + isXacNhan + "<s>"
                    + rs.getString("IDBN") + "<s>"                    
                    + rs.getString("NoiDungDeNghiXacNhan") + "<s>"  
                    + rs.getString("NoiDungTaiChinh");
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("capnhatxn")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));
        String tabName = request.getParameter("tabName");
        String maNV = request.getParameter("maNV");
        String noiDung = request.getParameter("noiDung");

        boolean isXacNhan = Boolean.parseBoolean(request.getParameter("isXacNhan"));

//        out.print(tabName + " " + maNV + " " + isXacNhan + " " + idBN);
        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.CapNhatXNBienNhan(tabName, maNV, isXacNhan, idBN, noiDung);
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delbiennhan")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.XoaBienNhan(idBN);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delchitietkhoanthu")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));
        double idKT = Double.parseDouble(request.getParameter("idKT"));

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.XoaChiTietKhoanThu(idBN, idKT);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("tangkhoanthu")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));
        double idKT = Double.parseDouble(request.getParameter("idKT"));
        double tyLe = Double.parseDouble(request.getParameter("tyLe"));

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.TangSLKhoanThu(idBN, idKT, tyLe);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("giamkhoanthu")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));
        double idKT = Double.parseDouble(request.getParameter("idKT"));
        double tyLe = Double.parseDouble(request.getParameter("tyLe"));

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.GiamSLKhoanThu(idBN, idKT, tyLe);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("tylekhoanthu")) {
        double idBN = Double.parseDouble(request.getParameter("idBN"));
        double idKT = Double.parseDouble(request.getParameter("idKT"));
        double tyLe = Double.parseDouble(request.getParameter("tyLe"));

        BienNhanBusiness objBN = new BienNhanBusiness();
        String result = "";
        result = objBN.capNhatTyLeKhoanThu(idBN, idKT, tyLe);

        out.print(result);
        return;
    }
%>
