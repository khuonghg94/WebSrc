<%-- 
    Document   : funUser
    Created on : Sep 25, 2014, 8:45:34 AM
    Author     : dcthang
--%>

<%@page import="java.sql.SQLException"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.UserBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    String userName = "",
            passWord = "",
            hoTenNV = "",
            idUser = "",
            maNV = "",
            maDV = "",
            tenDV = "",            
            isAdmin = "";
    
    if (caseName.trim().toLowerCase().equals("clearsession")) {
        session.setAttribute("idUser", null);
        session.setAttribute("userName", null);
        session.setAttribute("hoTenNV", null);
        session.setAttribute("maNV", null);       
        session.setAttribute("maDV", null);
        session.setAttribute("tenDV", null);
        session.setAttribute("isAdmin", null);
        session.invalidate();

//        session.removeAttribute("idUser");
//        session.removeAttribute("userName");
//        session.removeAttribute("hoTenNV");
//        session.removeAttribute("maNV");
//        session.removeAttribute("maDV");
//        session.removeAttribute("tenDV");
//        session.removeAttribute("isAdmin");
        return;
    }

    if (caseName.trim().toLowerCase().equals("session")) {
        idUser = request.getParameter("idUser");
        session.setAttribute("idUser", idUser);

        userName = request.getParameter("userName");
        session.setAttribute("userName", userName);

        hoTenNV = request.getParameter("hoTenNV");
        session.setAttribute("hoTenNV", hoTenNV);

        maNV = request.getParameter("maNV");
        session.setAttribute("maNV", maNV);

        maDV = request.getParameter("maDV");
        session.setAttribute("maDV", maDV);

        tenDV = request.getParameter("tenDV");
        session.setAttribute("tenDV", tenDV);
        
        isAdmin = request.getParameter("isAdmin");
        session.setAttribute("isAdmin", isAdmin);

        //response.sendRedirect("FrmMain.jsp");
        //out.print(idUser +" "+ userName +" "+ hoTenNV + " " + maNV +" "+ maKhoa +" "+ tenKhoa);
//        out.print(session.getAttribute("idUser") +" "+ session.getAttribute("userName") +" "+ session.getAttribute("hoTenNV")
//                +" "+ session.getAttribute("maNV") +" "+ session.getAttribute("maKhoa") +" "+ session.getAttribute("tenKhoa"));
        return;
    }

    //out.print(caseName);
    if (caseName.trim().toLowerCase().equals("kiemtradangnhap")) {
        userName = request.getParameter("userName");
        passWord = request.getParameter("passWord");

        UserBusiness objUser = new UserBusiness();
        ResultSet rs = objUser.KiemTraDangNhap(userName, passWord);
//    a."IDUser",
//    a."UserName",
//    b."HoTenNV",
//    a."MaNV",
//    c."MaDV",
//    c."TenDV",
//    c."isAdmin"

        String strResult = "fail";
        while (rs.next()) {
            strResult
                    = rs.getString("IDUser") + "<sol>"
                    + rs.getString("UserName") + "<sol>"
                    + rs.getString("HoTenNV") + "<sol>"
                    + rs.getString("MaNV") + "<sol>"
                    + rs.getString("TenDV") + "<sol>"
                    + rs.getString("MaDV") + "<sol>"
                    + rs.getString("isAdmin");
        }
        out.print(strResult);

        return;
    }
%>