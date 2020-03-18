<%-- 
    Document   : funGiaVe
    Created on : Jun 19, 2017, 10:18:00 AM
    Author     : sol
--%>

<%@page import="java.util.Date"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.GiaVeBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("danhmuc")) {
        Double idLoaiVe = Double.parseDouble(request.getParameter("idLoaiVe"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        DecimalFormat dgia = new DecimalFormat("#,###,###");
        String strGiaVe = "-", ngayBD = "01/01/1990", ngayKT = "01/01/1990";

        BusinessLogic.GiaVeBusiness objLV = new GiaVeBusiness();
        ResultSet rs = objLV.DanhMucTheoIDVe(idLoaiVe);

        //"IDGia","NgayBD","NgayKT","SoTien","GhiChu","IDKT"
        int stt = 1;
        while (rs.next()) {
            ngayBD = df.format(rs.getDate("NgayBD"));
            ngayKT = df.format(rs.getDate("NgayKT"));

            try {
                strGiaVe = dgia.format(rs.getDouble("SoTien"));
            } catch (SQLException ex) {
                strGiaVe = "-";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDGia") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDGia") + "'>" + ngayBD + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDGia") + "'>" + ngayKT + "</td>");
            out.print("<td align='right' id='" + rs.getString("IDGia") + "'><a href='#' title='Xem chi tiết giá' onclick='noiDungGiaLoaiVe(); return false;'>" + strGiaVe + "</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("add")) {
        BusinessLogic.GiaVeBusiness objLV = new GiaVeBusiness();

        Double idKT = 0.0;
        idKT = Double.parseDouble(request.getParameter("idKT"));

        String soTien = request.getParameter("soTien").replaceAll(",", "");

        Double donGia = 0.0;
        donGia = Double.parseDouble(soTien);

        Date ngayBD, ngayKT;
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        ngayBD = df.parse(request.getParameter("ngayBD"));
        ngayKT = df.parse(request.getParameter("ngayKT"));

        //out.print(idLoaiVe + " " + donGia + " " + ngayBD + " " + ngayKT);        
        out.print(objLV.Them(ngayBD, ngayKT, donGia, idKT));
        return;
    }

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("del")) {
        BusinessLogic.GiaVeBusiness objLV = new GiaVeBusiness();

        Double idGiaLoaiVe = 0.0;
        idGiaLoaiVe = Double.parseDouble(request.getParameter("idGiaLoaiVe"));

        out.print(objLV.Xoa(idGiaLoaiVe));
        return;
    }
%>
