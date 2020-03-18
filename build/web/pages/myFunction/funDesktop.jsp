<%-- 
    Document   : funDesktop
    Created on : Sep 25, 2014, 8:45:34 AM
    Author     : dcthang
--%>

<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.DesktopBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");

    if (caseName.trim().toLowerCase().equals("setdesktop")) {
        String userName = request.getParameter("userName");

        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.getDesktop(userName);
//    ctpq."IDPhanQuyen",
//    ctpq."IDForm",	
//    dmcn."TenForm",
//    dmcn."ChucNang",
//    dmcn."TenThuMuc",
//    dmcn."isDesktop",
//    dmcn."Icon"

        String listDesktop = "";
        String title = "";
        String tenThuMuc = "";
        String tenForm = "";
        String idPhanQuyen = "";
        String href = "";
        String varTr = "";
        String iCon = "";

        int leftIcon = 20;
        int numRows = 1;
        int numStop = 8;
        while (rs.next()) {
//            + " numRows: " + numRows + " rs.getRow(): " + rs.getRow() + " rs.isLast(): " +  rs.isLast()
            idPhanQuyen = rs.getString("IDPhanQuyen");
            title = rs.getString("ChucNang");
            tenThuMuc = rs.getString("TenThuMuc");
            tenForm = rs.getString("TenForm") + ".jsp";

//            listDesktop = listDesktop
//                    + "<div class='desktopicon ui-draggable' title='" + title + "' tabindex='1' id='" + idPhanQuyen + "' data-type='1' style='opacity: 1; transform: scale(1, 1); left: " + leftIcon + "px; top: 20px;'>"
//                    + "     <div class='desktopicon_img'><img src='https://cdn1.airdroid.com/V3411803301051/theme/stock/images/desktopicon/photo_80.png' role='img' aria-hidden='true'></div>"
//                    + "     <div class='desktopicon_title'>"
//                    + "         <div class='l'>" + tenThuMuc + "</div><div class='r'></div>"
//                    + "     </div>"
//                    + "     <div class='desktopicon_count is-hide'>0</div>"
//                    + "     <div class='desktopicon_tinyicon is-hide'></div>"
//                    + "</div>";
//
//            leftIcon = leftIcon + 105;

            if (rs.getBoolean("isDesktop")) {
                href = "href=\"javascript:openForm('" + tenForm + "')\"";
            } else {
                href = "href=\"" + tenForm + "\" target='_blank'";
            }

            iCon = rs.getString("Icon");

            varTr = varTr
                    + "<td id='" + idPhanQuyen + "'>"
                    + "<div class='iconDesktop'>"
                    + "<a class='list'" + href + " title='" + title + "'>"
                    + "<i class='sDesktop " + iCon + " fa-2x'></i>"
                    + "<br>"
                    + "<span>" + tenThuMuc + "</span>"
                    + "</a>"
                    + "</div>"
                    + "</td>";

            if (numRows <= numStop && rs.isLast()) {
                out.print("<tr>");
                out.print(varTr);
                out.print("</tr>");
                varTr = "";
                numRows = 1;
                numStop = 8;
            } else if (numRows >= numStop && !rs.isLast()) {
                out.print("<tr>");
                out.print(varTr);
                out.print("</tr>");
                varTr = "";
                numStop = numStop + 8;
            }
            numRows++;                        
        }

        out.print(listDesktop);
        return;
    }

    if (caseName.trim().toLowerCase().equals("setmenu")) {
        String userName = request.getParameter("userName");

        DesktopBusiness objDesktop = new DesktopBusiness();
        String resRoot = objDesktop.getMenu(userName, "", 0);
        out.print(resRoot);
        return;
    }

    if (caseName.trim().toLowerCase().equals("listroot")) {
        double idRoot = 0;

        DesktopBusiness objDesktop = new DesktopBusiness();
        String resRoot = objDesktop.listRoot(idRoot);
        out.print(resRoot);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delchucnang")) {
        int idForm = Integer.parseInt(request.getParameter("idForm"));
        DesktopBusiness objDesktop = new DesktopBusiness();
        String resRoot = objDesktop.xoaChucNang(idForm);

        out.print(resRoot);
        return;
    }

    if (caseName.trim().toLowerCase().equals("timchucnang")) {
        String txtFind = request.getParameter("txtFind");
        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.timChucNang(-1, txtFind);
//    dm."IDForm",
//    dm."TenForm",
//    dm."ChucNang",
//    dm."TenThuMuc",	
//    dm."isDaKhoa",
//    dm."isDesktop",
//    dm."Icon",
//    Coalesce(cn."IDLCN", -1) as "IDLCN",
//    Coalesce(cn."TenLoai", 'Root') as "TenLoai",
//    Coalesce(cn."GhiChu", '-') as "GhiChu",
//    Coalesce(cn."Icon", '-') as "IconF"
        int ix = 1;
        String strDaKhoa = "false", strDesktop = "false";
        while (rs.next()) {

            if (rs.getBoolean("isDaKhoa")) {
                strDaKhoa = "checked";
            } else {
                strDaKhoa = "";
            }

            if (rs.getBoolean("isDesktop")) {
                strDesktop = "checked";
            } else {
                strDesktop = "";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'>" + ix + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("TenForm") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("TenThuMuc") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("ChucNang") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("Icon") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><input type='checkbox' style='margin-left:auto; margin-right:auto;' disabled " + strDaKhoa + "/></td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><input type='checkbox' style='margin-left:auto; margin-right:auto;' disabled " + strDesktop + "/></td>");
            out.print("<td align='left' id='" + rs.getString("IDLCN") + "'>" + rs.getString("TenLoai") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDLCN") + "'>" + rs.getString("GhiChu") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDLCN") + "'>" + rs.getString("IconF") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><a href='#' onclick='noiDungChucNang()' title='Xem chi tiết'>Xem</a></td>");
            out.print("</tr>");

            ix++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatechucnang")) {
        String tenForm = request.getParameter("txtTenForm");
        String chucNang = request.getParameter("txtTenChucNang");
        String tenThuMuc = request.getParameter("txtTenThuMuc");
        String iCon = request.getParameter("txtIcon");

        boolean isDaKhoa = Boolean.parseBoolean(request.getParameter("isDaKhoa"));
        boolean isDesktop = Boolean.parseBoolean(request.getParameter("isDesktop"));
        double idLCN = Double.parseDouble(request.getParameter("idLCN"));
        String isEdit = request.getParameter("isEdit");

        DesktopBusiness objDesktop = new DesktopBusiness();
        String result = "";
        if (isEdit.trim().toLowerCase().equals("edit")) {//Update  
            int idForm = Integer.parseInt(request.getParameter("idForm").trim());
//            out.print(isEdit + " " + idForm + " " + tenForm + " " + chucNang + " " + tenThuMuc + " " + iCon + " " + isDaKhoa + " " + isDesktop + " " + idLCN);
            result = objDesktop.suaChucNang(idForm, tenForm, chucNang, tenThuMuc, iCon, isDaKhoa, isDesktop, idLCN);
        } else if ((isEdit.equals("add"))) {//Add
            result = objDesktop.themChucNang(tenForm, chucNang, tenThuMuc, iCon, isDaKhoa, isDesktop, idLCN);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("timthumucchucnang")) {
        String tenThuMuc = request.getParameter("tenThuMuc");

        DesktopBusiness objDesktop = new DesktopBusiness();
        double idRoot = 0;
        String resRoot = objDesktop.timThuMucChucNang(tenThuMuc, "", idRoot);

        out.print(resRoot);
        return;
    }

    if (caseName.trim().toLowerCase().equals("getthongtinchucnang")) {
        int idForm = Integer.parseInt(request.getParameter("idForm"));

        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.getThongTinChucNang(idForm);
//    dm."IDForm",
//    dm."TenForm",
//    dm."ChucNang",
//    dm."TenThuMuc",
//    dm."isDaKhoa",
//    dm."isDesktop",
//    dm."Icon",
//    dm."IDLCN" as "IDF",
//    Coalesce(cn."IDLCN", -1) as "IDLCN",
//    Coalesce(cn."TenLoai", '-') as "TenLoai"

        String isDaKhoa = "", isDesktop = "", result = "";
        while (rs.next()) {

            if (rs.getBoolean("isDaKhoa")) {
                isDaKhoa = "checked";
            } else {
                isDaKhoa = "";
            }

            if (rs.getBoolean("isDesktop")) {
                isDesktop = "checked";
            } else {
                isDesktop = "";
            }

            result = rs.getString("IDForm") + "<s>" //0
                    + rs.getString("TenForm") + "<s>" //1
                    + rs.getString("ChucNang") + "<s>" //2
                    + rs.getString("TenThuMuc") + "<s>" //3
                    + isDaKhoa + "<s>" //4
                    + isDesktop + "<s>" //5
                    + rs.getString("Icon") + "<s>" //6
                    + rs.getString("IDF") + "<s>" //7
                    + rs.getString("IDLCN") + "<s>" //8
                    + rs.getString("TenLoai") + "<s>" //9
                    + rs.getString("Icon"); //10
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("getthongtinthumuc")) {
        double idLCN = Double.parseDouble(request.getParameter("idLCN"));

        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.getThongTinThuMuc(idLCN);
//    cn."IDLCN",
//    cn."TenLoai",
//    cn."GhiChu",
//    cn."Icon",
//    Coalesce(cn."IDF", 0) as "IDF",
//    Coalesce(cnF."TenLoai", '-') as "TenLoaiF"

        String result = "";
        while (rs.next()) {
            result = rs.getString("IDLCN") + "<s>"
                    + rs.getString("TenLoai") + "<s>"
                    + rs.getString("GhiChu") + "<s>"
                    + rs.getString("Icon") + "<s>"
                    + rs.getString("IDF") + "<s>"
                    + rs.getString("TenLoaiF");
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delthumuc")) {
        double idLCN = Double.parseDouble(request.getParameter("idLCN"));

        DesktopBusiness objDesktop = new DesktopBusiness();
        String strResult = objDesktop.xoaThuMuc(idLCN);

        out.print(strResult);
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatethumuc")) {
        String thuMuc = request.getParameter("txtThuMuc");
        String ghiChu = request.getParameter("txtGhiChu");
        String iCon = request.getParameter("txtIcon");

        double idF = Double.parseDouble(request.getParameter("idF"));

        DesktopBusiness objDesktop = new DesktopBusiness();

        String result = "";
        String isEdit = request.getParameter("isEdit");
        if (isEdit.equals("edit")) {//Update
            double idLCN = Double.parseDouble(request.getParameter("idLCN"));

            result = objDesktop.suaThuMuc(idF, thuMuc, ghiChu, iCon, idLCN);
        } else if ((isEdit.equals("add"))) {//Add
            result = objDesktop.themThuMuc(idF, thuMuc, ghiChu, iCon);
        }

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("treenhanvien")) {
        DesktopBusiness objDesktop = new DesktopBusiness();
        String strResult = objDesktop.danhSachCayNhanVien();

        out.print(strResult);
        return;
    }

    if (caseName.trim().toLowerCase().equals("timcaynhanvien")) {
        String tenNhap = request.getParameter("tenNhap");
        DesktopBusiness objDesktop = new DesktopBusiness();
        String strResult = objDesktop.timCayNhanVien(tenNhap);

        out.print(strResult);
        return;
    }

    if (caseName.trim().toLowerCase().equals("phanquyentheomanv")) {
        String maNV = request.getParameter("maNV");
        String txtFind = request.getParameter("txtFind");

        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.danhSachPhanQuyenTheoMaNV(maNV, txtFind);
//    -- u.*, 
//    -- lcn.*, 
//    ctpq."IDPhanQuyen",
//    ctpq."IDForm",	
//    dmcn."TenForm",
//    dmcn."ChucNang",
//    dmcn."TenThuMuc",
//    dmcn."isDaKhoa",
//    dmcn."isDesktop",
//    dmcn."Icon"
        int ix = 1;
        String strDaKhoa = "false", strDesktop = "false";
        while (rs.next()) {

            if (rs.getBoolean("isDaKhoa")) {
                strDaKhoa = "checked";
            } else {
                strDaKhoa = "";
            }

            if (rs.getBoolean("isDesktop")) {
                strDesktop = "checked";
            } else {
                strDesktop = "";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDPhanQuyen") + "'>" + ix + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("TenForm") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("TenThuMuc") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("ChucNang") + "</td>");
            out.print("<td align='left' id='" + rs.getString("IDForm") + "'>" + rs.getString("Icon") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><input type='checkbox' style='margin-left:auto; margin-right:auto;' disabled " + strDaKhoa + "/></td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><input type='checkbox' style='margin-left:auto; margin-right:auto;' disabled " + strDesktop + "/></td>");
            out.print("<td align='center' id='" + rs.getString("IDForm") + "'><a href='#' onclick='getNoiDungPQ(); return false' title='Xem chi tiết'>Xem</a></td>");
            out.print("</tr>");

            ix++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("thongtinnhanvien")) {
        int maDV = Integer.parseInt(request.getParameter("maDV"));
        String maNV = request.getParameter("maNV");
//        out.print("maDV : " + maDV + "  maNV: " + maNV);

        DesktopBusiness objDesktop = new DesktopBusiness();
        ResultSet rs = objDesktop.thongTinNhanVien(maNV, maDV);
//    u."IDUser",
//    u."UserName",
//    u."PassWord",	
//    u."isAdmin",
//    u."MaNV",
//    nv."HoTenNV",
//    u."MaDV",
//    dv."TenDV"

        String isAdmin = "", result = "";
        while (rs.next()) {

            if (rs.getBoolean("isAdmin")) {
                isAdmin = "checked";
            } else {
                isAdmin = "";
            }

            result = rs.getString("IDUser") + "<s>" //0
                    + rs.getString("UserName") + "<s>" //1
                    + isAdmin + "<s>" //2
                    + rs.getString("MaNV") + "<s>" //3
                    + rs.getString("HoTenNV") + "<s>" //4
                    + rs.getString("MaDV") + "<s>" //5
                    + rs.getString("TenDV"); //6
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delphanquyen")) {
        int idPQ = Integer.parseInt(request.getParameter("idPQ"));

        DesktopBusiness objDesktop = new DesktopBusiness();
        String result = objDesktop.xoaPhanQuyen(idPQ);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("addphanquyen")) {
        int idUser = Integer.parseInt(request.getParameter("idUser"));
        int idForm = Integer.parseInt(request.getParameter("idForm"));

        DesktopBusiness objDesktop = new DesktopBusiness();
        String result = objDesktop.themPhanQuyen(idUser, idForm);

        out.print(result);
        return;
    }
%>