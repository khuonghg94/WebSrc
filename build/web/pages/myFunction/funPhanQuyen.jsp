<%-- 
    Document   : funPhanQuyen
    Created on : Oct 4, 2019, 3:06:05 PM
    Author     : Administrator
--%>

<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.PhanQuyenBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    if (caseName.trim().toLowerCase().equals("cbophong")) {
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucPhong();
        out.print("<option value='-1' selected>--Tất cả--</option>");
//    "IDPhong", "TenPhong"
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDPhong") + ">" + rs.getString("TenPhong") + "</option>");
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dstk_hoten")) {
        String hoTen = request.getParameter("hoTen");
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucNhaVien_TheoHoTen(hoTen);

//    "p"."TenPhong", "nv"."MaNV", "nv"."HoTenNV"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("TenPhong") + "'>" + rs.getString("TenPhong") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MaNV") + "'>" + rs.getString("MaNV") + "</td>");
            out.print("<td align='center' id='" + rs.getString("HoTenNV") + "'>" + rs.getString("HoTenNV") + "</td>");
            out.print("<td align='center'><a href='#' title='Xem chi tiết' onclick='xemCTPQ()'>Xem</a></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dstk_hoten_idphong")) {
        String hoTen = request.getParameter("hoTen");
        double IDPhong = Double.parseDouble(request.getParameter("idPhong"));
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucNhaVien_TheoHoTen_IDPhong(hoTen, IDPhong);

//    "p"."TenPhong", "nv"."MaNV", "nv"."HoTenNV"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("TenPhong") + "'>" + rs.getString("TenPhong") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MaNV") + "'>" + rs.getString("MaNV") + "</td>");
            out.print("<td align='center' id='" + rs.getString("HoTenNV") + "'>" + rs.getString("HoTenNV") + "</td>");
            out.print("<td align='center'><a href='#' title='Xem chi tiết' onclick='xemCTPQ()'>Xem</a></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dmuc_form")) {
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucFormChucNang();

//    "IDForm", "TenForm"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'>" + rs.getString("IDForm") + "</td>");
            out.print("<td align='center'>" + rs.getString("TenForm") + "</td>");
            out.print("<td align='center'><i class='fa fa-arrow-right' title='Cấp quyền' onclick='themQuyen()'></i></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dmuc_form_ccq")) {
        String maNV = request.getParameter("maNV");
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucFormChucNang_ChuaCapQuyen(maNV);

//    "IDForm", "TenForm"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'>" + rs.getString("IDForm") + "</td>");
            out.print("<td align='center'>" + rs.getString("TenForm") + "</td>");
            out.print("<td align='center'><i class='fa fa-arrow-right' title='Cấp quyền' onclick='themQuyen()'></i></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dmuc_form_manv")) {
        String maNV = request.getParameter("maNV");
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        ResultSet rs = objPQ.DanhMucFormChucNang_TheoMaNV(maNV);

//    "a"."IDForm", "a"."TenForm", "b"."IDPhanQuyen"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDPhanQuyen") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'>" + rs.getString("IDForm") + "</td>");
            out.print("<td align='center'>" + rs.getString("TenForm") + "</td>");
            out.print("<td align='center'><i class='fa fa-arrow-left' title='Thu hồi quyền' onclick='thuhoiQuyen()'></i></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("themphanquyen")) {
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        String result = "";
        String maNV = request.getParameter("maNV");
        double idForm = Double.parseDouble(request.getParameter("idForm"));
        result = objPQ.ThemPhanQuyen(maNV, idForm);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("xoaphanquyen")) {
        PhanQuyenBusiness objPQ = new PhanQuyenBusiness();
        String result = "";
        double IDPhanQuyen = Double.parseDouble(request.getParameter("idPhanQuyen"));
        result = objPQ.XoaPhanQuyen(IDPhanQuyen);
        out.print(result);
        return;
    }

%>
