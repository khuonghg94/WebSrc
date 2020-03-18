<%-- 
    Document   : ChiTietPhanQuyen_Functions
    Created on : Sep 16, 2014, 10:19:42 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.ChiTietPhanQuyenBusiness"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    ChiTietPhanQuyenBusiness objCTPQ = new ChiTietPhanQuyenBusiness();
    String iDPQ = "", iDUser = "", iDForm = "", tenForm="";
    boolean them, sua, xoa, xem;

    them = Boolean.valueOf(request.getParameter("them"));
    sua = Boolean.valueOf(request.getParameter("sua"));
    xoa = Boolean.valueOf(request.getParameter("xoa"));
    xem = Boolean.valueOf(request.getParameter("xem"));

    objCTPQ.chiTietPhanQuyenEntity.Them = them;
    objCTPQ.chiTietPhanQuyenEntity.Sua = sua;
    objCTPQ.chiTietPhanQuyenEntity.Xoa = xoa;
    objCTPQ.chiTietPhanQuyenEntity.Xem = xem;
    if (caseName.trim().toLowerCase().equals("add")) {
        iDUser = request.getParameter("iDUser");
        iDForm = request.getParameter("iDForm");
        objCTPQ.chiTietPhanQuyenEntity.IDUser = Integer.parseInt(iDUser);
        objCTPQ.chiTietPhanQuyenEntity.IDForm = Integer.parseInt(iDForm);
        out.print(objCTPQ.ThemKtTrung());
    }    
    
    if (caseName.trim().toLowerCase().equals("del")) {
        
        iDPQ = request.getParameter("IDPhanQuyen");
        objCTPQ.chiTietPhanQuyenEntity.IDPhanQuyen = Integer.parseInt(iDPQ);

        if (objCTPQ.Xoa()) {
            out.print("Đã xóa thành công");
        } else {
            out.print("Xóa không thành công thông tin này");
        }
    }

//    if (caseName.trim().toLowerCase().equals("edit")) {
//        iDPQ = request.getParameter("iDPQ");
//        iDUser = request.getParameter("iDUser");
//        iDForm = request.getParameter("iDForm");
//        objCTPQ.chiTietPhanQuyenEntity.iDPhanQuyen = Integer.parseInt(iDPQ);
//        objCTPQ.chiTietPhanQuyenEntity.iDUser = Integer.parseInt(iDUser);
//        objCTPQ.chiTietPhanQuyenEntity.iDForm = Integer.parseInt(iDForm);
//        if (objCTPQ.Sua()) {
//            out.print("Đã sửa thành công");
//        } else {
//            out.print("Sưa không thành công thông tin này");
//        }
//    }
    
    if (caseName.trim().toLowerCase().equals("ktquyen")) {        
        iDUser = request.getParameter("idUser");
        tenForm = request.getParameter("tenForm");    
        out.print(objCTPQ.KTQuyen(Integer.parseInt(iDUser), tenForm));
    }

//    if (caseName.trim().toLowerCase().equals("menu")) {
//
//        iDUser = request.getParameter("iDUser");
//        objCTPQ.chiTietPhanQuyenEntity.iDUser = Integer.parseInt(iDUser);
//        ResultSet rs = objCTPQ.TimTheoIDUser(objCTPQ.chiTietPhanQuyenEntity.iDUser);
//        int ix = 1;
//        while (rs.next()) {
//            out.print("<tr class='tomauHover' >");
//            out.print("<td id=" + rs.getInt("IDPhanQuyen") + ">" + rs.getInt("IDPhanQuyen") + "</td>");
//            out.print("<td id=" + rs.getInt("IDUser") + ">" + rs.getString("IDUser") + "</td>");
//            out.print("<td id=" + rs.getInt("IDForm") + ">" + rs.getString("TenForm") + "</td>");
//
//            Boolean add = rs.getBoolean("Them"),
//                    edit = rs.getBoolean("Sua"),
//                    del = rs.getBoolean("Xoa"),
//                    select = rs.getBoolean("Xem");        
//            String checkadd = "", checkedit = "", checkdel = "", checkselect = "";
//            if (add) {
//                checkadd = "checked";
//            }
//            out.print("<td id=" + rs.getBoolean("Them") + "><input id='iadd" + rs.getString("IDPhanQuyen") + "' type='checkbox'" + checkadd + "/>" + "</td>");
//            if (edit) {
//                checkedit = "checked";
//            }
//            out.print("<td id=" + rs.getBoolean("Sua") + "><input id='iedit" + rs.getString("IDPhanQuyen") + "' type='checkbox'" + checkedit + "/>" + "</td>");
//            if (del) {
//                checkdel = "checked";
//            }
//            out.print("<td id=" + rs.getBoolean("Xoa") + "><input id='idel" + rs.getString("IDPhanQuyen") + "' type='checkbox'" + checkdel + "/>" + "</td>");
//
//            if (select) {
//                checkselect = "checked";
//            }
//            out.print("<td id=" + rs.getBoolean("Xem") + "><input id='iselect" + rs.getString("IDPhanQuyen") + "' type='checkbox'" + checkselect + "/>" + "</td>");
//
//            out.print("</tr>");
//            ix++;
//        }
//    }


%>