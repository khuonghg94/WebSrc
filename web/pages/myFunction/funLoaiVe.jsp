<%-- 
    Document   : funLoaiVe
    Created on : Jun 19, 2017, 10:18:00 AM
    Author     : sol
--%>

<%@page import="java.text.DecimalFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.KhoanThuBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("danhmuc")) {
        DecimalFormat dgia = new DecimalFormat("#,###,###");
        String veTronGoi = "", strTenVe = "", strGiaVe = "...";

//    lv."IDKT",
//    lv."TenKhoanThu",
//    lv."SoLan", 
//    lv."BatBuoc", 
//    lv."GhiChu", 
//    Coalesce(gv."SoTien", 0) as "SoTien",
//    gv."NgayBD",
//    gv."NgayKT"  
        int stt = 1;
        BusinessLogic.KhoanThuBusiness objLV = new KhoanThuBusiness();
        ResultSet rs = objLV.DanhMuc();

        while (rs.next()) {
            strTenVe = rs.getString("TenKhoanThu");

            //VeTronGoi
            if (rs.getBoolean("BatBuoc")) {
                veTronGoi = "checked";
            } else {
                veTronGoi = "";
            }

            if (rs.getString("SoTien").equals("0")) {
                strGiaVe = "...";
            } else {
                strGiaVe = dgia.format(rs.getDouble("SoTien"));
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDKT") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDKT") + "'>" + rs.getString("IDKT") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDKT") + "'>" + strTenVe + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDKT") + "'><input type='checkbox' value='" + rs.getString("IDKT") + "' style='margin-left:auto; margin-right:auto;' disabled " + veTronGoi + "/></td>");
            out.print("<td align='right' id='" + rs.getString("IDKT") + "'><a href='#' onclick=\"showMessage_GiaLoaiVe(event, 'divGiaLoaiVe'); return false;\" title='Xem thông tin Giá'>" + strGiaVe + "</a></td>");
            out.print("<td align='center' id='" + rs.getString("IDKT") + "'><a href='#' onclick='noiDungLoaiVe(); return false;' title='Xem chi tiết'>Xem</a></td>");
            out.print("<td align='left' id='" + rs.getString("IDKT") + "'>" + rs.getString("SoLan") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDKT") + "'>" + rs.getString("GhiChu") + "</td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("capnhat")) {
        BusinessLogic.KhoanThuBusiness objLV = new KhoanThuBusiness();

//    "idLoaiVe": idLoaiVe,
//    "tenKhoanThu": tenKhoanThu,
//    "batBuoc": batBuoc,
//    "soLan": soLan,
//    "ghiChu": ghiChu,
//    "isEdit": isEdit,
        String result = "";
        Double idKT = 0.0;

        String tenKhoanThu = request.getParameter("tenKhoanThu");
        String ghiChu = request.getParameter("ghiChu");
        boolean batBuoc = Boolean.parseBoolean(request.getParameter("batBuoc"));
        Double soLan = Double.parseDouble(request.getParameter("soLan"));

        boolean isEdit = Boolean.parseBoolean(request.getParameter("isEdit"));
        if (isEdit) {//Update            
            idKT = Double.parseDouble(request.getParameter("idKT"));
            result = objLV.Sua(tenKhoanThu, soLan, batBuoc, ghiChu, idKT);
        } else {//Add
            result = objLV.Them(tenKhoanThu, soLan, batBuoc, ghiChu);
        }

        //  out.print("batBuoc: " + batBuoc + " tenKhoanThu: " + tenKhoanThu + " isEdit: " + isEdit + " idKT: " + idKT);
        out.print(result);
        return;
    }

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("xoa")) {
        BusinessLogic.KhoanThuBusiness objLV = new KhoanThuBusiness();

        Double idLoaiVe = Double.parseDouble(request.getParameter("idLoaiVe"));
        String result = objLV.Xoa(idLoaiVe);

        out.print(result);
        return;
    }
%>
