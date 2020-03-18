<%-- 
    Document   : funHocSinh
    Created on : July 12, 2018, 2:40:31 PM
    Author     : Sol
--%>

<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.HocSinhBusiness"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    //out.print(caseName);

    if (caseName.trim().toLowerCase().equals("cbohocky")) {
        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucHocKy();

//    "IDHK", "HocKy", "NamHoc", "NgayBD", "NgayKT"
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDHK") + ">" + rs.getString("HocKy") + " (" + rs.getString("NamHoc") + ")</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("cboloailop")) {
        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucLoaiLop();

//    "IDLL", "TenLoaiLop", "GhiChu"
        out.print("<option value='-1' selected>Tất cả</option>");
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDLL") + ">" + rs.getString("TenLoaiLop") + "</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("cbolop")) {
        double idLL = Double.parseDouble(request.getParameter("idLL"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucLopTheoIDLL(idLL);

//    "IDLop", "TenLop", "GhiChu", "IDLL", "TuThangTuoi", "DenThangTuoi" 
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDLop") + ">" + rs.getString("TenLop") + "</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatelophoc")) {
        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        String tenLop = request.getParameter("tenLop");
        String ghiChu = request.getParameter("ghiChu");
        double idLop = Double.parseDouble(request.getParameter("idLop"));
        double idHK = Double.parseDouble(request.getParameter("idHK"));

        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isEdit.equals("edit")) {
            double maLop = Double.parseDouble(request.getParameter("maLop"));
            result = objHS.SuaLopHoc(tenLop, idLop, idHK, ghiChu, maLop);
        } else if (isEdit.equals("add")) {
            result = objHS.ThemLopHoc(tenLop, idLop, idHK, ghiChu);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dellophoc")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));
        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        result = objHS.XoaLopHoc(maLop);

        out.print(result);
        return;
    }

    //listRoot
    if (caseName.trim().toLowerCase().equals("listroot")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));
        String result = "";

        HocSinhBusiness objHS = new HocSinhBusiness();
        result = objHS.listRoot(maLop);
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("infolophoc")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));

        String result = "";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.ThongTinLopHocTheoMaLop(maLop);
//        "MaLop", "TenLop", "GhiChu", "IDLop", "IDHK", "IDLL"
        while (rs.next()) {
            result = rs.getString("MaLop") + "<s>" + rs.getString("TenLop") + "<s>" + rs.getString("GhiChu") + "<s>" + rs.getString("IDLop") + "<s>" + rs.getString("IDHK") + "<s>" + rs.getString("IDLL");
        }

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("infohocsinhdangky")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String ngaySinh = "01/01/1990", ngayBD = "01/01/1990", ngayKT = "01/01/1990";
        String result = "", strGT = "", strGTPH = "", nsPH = "01/01/1990";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.ThongTinHocSinhDangKyTheoIDBDK(idBDK);
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
//    ph."Email" as "EmailPH"

        while (rs.next()) {
            ngaySinh = df.format(rs.getDate("NgaySinh"));
            ngayBD = df.format(rs.getDate("NgayBD"));
            ngayKT = df.format(rs.getDate("NgayKT"));

            if (rs.getBoolean("GioiTinh")) {
                strGT = "Nam";
            } else {
                strGT = "Nữ";
            }
            
            nsPH = df.format(rs.getDate("NgaySinhPH"));
            if (rs.getBoolean("GioiTinhPH")) {
                strGTPH = "Nam";
            } else {
                strGTPH = "Nữ";
            }

            result = rs.getString("MaLop") + "<s>"
                    + rs.getString("TenLop") + "<s>"
                    + rs.getString("MSHS") + "<s>"
                    + rs.getString("HoTenHS") + "<s>"
                    + rs.getString("TenThanMat") + "<s>"
                    + ngaySinh + "<s>"
                    + strGT + "<s>"
                    + rs.getString("DiaChi") + "<s>"
                    + rs.getString("IDBDK") + "<s>"
                    + ngayBD + "<s>"
                    + ngayKT + "<s>"
                    + rs.getString("GhiChu") + "<s>"
                    + rs.getString("GhiChuHS") + "<s>"
                    + rs.getString("QuocTich") + "<s>"
                    + rs.getString("IDHK") + "<s>"
                    + rs.getString("IDLop") + "<s>"
                    + rs.getString("IDLL") + "<s>"
                    + rs.getString("MSPH") + "<s>"
                    + rs.getString("HoTenPH") + "<s>"
                    + strGTPH + "<s>"
                    + nsPH + "<s>"
                    + rs.getString("DiaChiPH") + "<s>"
                    + rs.getString("NgheNghiepPH") + "<s>"
                    + rs.getString("NoiLamViecPH") + "<s>"
                    + rs.getString("SoDienThoaiPH") + "<s>"          
                    + rs.getString("EmailPH");
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dssolienlac")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        DateFormat hf = new SimpleDateFormat("H");
        DateFormat mf = new SimpleDateFormat("m");

        String ngayGN = "01/01/1990", gioGN = "0", phutGN = "0";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhSachSoLienLacTheoIDBDK(idBDK);
//    sll."IDSLL",
//    sll."Thang",
//    sll."CanNang",
//    sll."ChieuCao",	
//    sll."GhiNhanGiaoVien",
//    sll."YKienPhuHuynh",
//    sll."NgayGhiNhan",
//    sll."MaNV",
//    nv."HoTenNV"

        int stt = 1;
        while (rs.next()) {
            ngayGN = df.format(rs.getTimestamp("NgayGhiNhan"));
            gioGN = hf.format(rs.getTimestamp("NgayGhiNhan"));
            phutGN = mf.format(rs.getTimestamp("NgayGhiNhan"));

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDSLL") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSLL") + "'>" + rs.getString("Thang") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSLL") + "'>" + rs.getString("CanNang") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSLL") + "'>" + rs.getString("ChieuCao") + "</td>");
            out.print("<td id='" + rs.getString("MaNV") + "'>" + rs.getString("HoTenNV") + "</td>");
            out.print("<td id='" + rs.getString("IDSLL") + "'>" + rs.getString("GhiNhanGiaoVien") + "</td>");
            out.print("<td id='" + rs.getString("IDSLL") + "'>" + rs.getString("YKienPhuHuynh") + "</td>");
            out.print("<td id='" + rs.getString("IDSLL") + "'>" + ngayGN + "</td>");
            out.print("<td id='" + rs.getString("IDSLL") + "'>" + gioGN + "</td>");
            out.print("<td id='" + rs.getString("IDSLL") + "'>" + phutGN + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSLL") + "'><a href='#' title='Xem chi tiết' onclick='xemSoLienLac(); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatesolienlac")) {
        String maNV = request.getParameter("maNV");
        String ghiNhanGV = request.getParameter("ghiNhanGV");
        String ghiNhanPH = request.getParameter("ghiNhanPH");

        int inThang = Integer.parseInt(request.getParameter("inThang"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date ngayGN = df.parse(request.getParameter("ngayGN"));

        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        String strTemp = "";
        strTemp = request.getParameter("canNang");
        strTemp = strTemp.replaceAll(",", "");
        double canNang = Double.parseDouble(strTemp);

        strTemp = request.getParameter("chieuCao");
        strTemp = strTemp.replaceAll(",", "");
        double chieuCao = Double.parseDouble(strTemp);

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isEdit.equals("edit")) {
            double idSLL = Double.parseDouble(request.getParameter("idSLL"));
            result = objHS.SuaSoLienLac(inThang, canNang, chieuCao, ghiNhanGV, ghiNhanPH, maNV, ngayGN, idBDK, idSLL);
        } else if (isEdit.equals("add")) {
            result = objHS.ThemSoLienLac(inThang, canNang, chieuCao, ghiNhanGV, ghiNhanPH, maNV, ngayGN, idBDK);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delsolienlac")) {
        double idSLL = Double.parseDouble(request.getParameter("idSLL"));
        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        result = objHS.XoaSoLienLac(idSLL);
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dsdiemdanh")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        DateFormat hf = new SimpleDateFormat("H");
        DateFormat mf = new SimpleDateFormat("m");

        String ngayBD = "01/01/1990", ngayKT = "01/01/1990", coPhep = "", ngayGN = "01/01/1990", gioGN = "0", phutGN = "0";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhSachDiemDanhTheoIDBDK(idBDK);
//    xpn."IDXPN",
//    xpn."NgayBD", 
//    date(xpn."NgayKT") - date(xpn."NgayBD") as "SoNgayNghi",
//    xpn."NgayKT", 
//    xpn."CoPhep",
//    xpn."GhiChu",
//    xpn."NgayGhiNhan",
//    xpn."MaNV",
//    nv."HoTenNV"

        int stt = 1;
        while (rs.next()) {
            ngayGN = df.format(rs.getTimestamp("NgayGhiNhan"));
            gioGN = hf.format(rs.getTimestamp("NgayGhiNhan"));
            phutGN = mf.format(rs.getTimestamp("NgayGhiNhan"));

            ngayBD = df.format(rs.getDate("NgayBD"));
            ngayKT = df.format(rs.getDate("NgayKT"));
            if (rs.getBoolean("CoPhep")) {
                coPhep = "<input type='checkbox' value='" + rs.getString("IDXPN") + "' style='margin-left:auto; margin-right:auto;' disabled checked />";
            } else {
                coPhep = "<input type='checkbox' value='" + rs.getString("IDXPN") + "' style='margin-left:auto; margin-right:auto;' disabled />";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'>" + ngayBD + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'>" + ngayKT + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'>" + rs.getString("SoNgayNghi") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'>" + coPhep + "</td>");
            out.print("<td id='" + rs.getString("IDXPN") + "'>" + rs.getString("GhiChu") + "</td>");
            out.print("<td id='" + rs.getString("MaNV") + "'>" + rs.getString("HoTenNV") + "</td>");
            out.print("<td id='" + rs.getString("IDXPN") + "'>" + ngayGN + "</td>");
            out.print("<td id='" + rs.getString("IDXPN") + "'>" + gioGN + "</td>");
            out.print("<td id='" + rs.getString("IDXPN") + "'>" + phutGN + "</td>");

            out.print("<td align='center' id='" + rs.getString("IDXPN") + "'><a href='#' title='Xem chi tiết' onclick='xemDiemDanh(); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatediemdanh")) {
        String maNV = request.getParameter("maNV");
        String ghiChu = request.getParameter("ghiChu");

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date ngayGN = df.parse(request.getParameter("ngayGN"));

        DateFormat dfA = new SimpleDateFormat("dd/MM/yyyy");
        Date ngayBD = dfA.parse(request.getParameter("ngayBD"));
        Date ngayKT = dfA.parse(request.getParameter("ngayKT"));

        double idBDK = Double.parseDouble(request.getParameter("idBDK"));
        boolean isPhep = Boolean.parseBoolean(request.getParameter("isPhep"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isEdit.equals("edit")) {
            double idXPN = Double.parseDouble(request.getParameter("idXPN"));
            result = objHS.SuaDiemDanh(ngayBD, ngayKT, ngayGN, ghiChu, maNV, isPhep, idBDK, idXPN);
        } else if (isEdit.equals("add")) {
            result = objHS.ThemDiemDanh(ngayBD, ngayKT, ngayGN, ghiChu, maNV, isPhep, idBDK);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("deldiemdanh")) {
        HocSinhBusiness objHS = new HocSinhBusiness();

        double idXPN = Double.parseDouble(request.getParameter("idXPN"));
        String result = "";
        result = objHS.XoaDiemDanh(idXPN);
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dsbophancothe")) {
        double idSTDSK = Double.parseDouble(request.getParameter("idSTDSK"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.ChiTietKhamTheoIDSTDSK(idSTDSK);
//    "IDBPCT",
//    "TenBoPhan",
//    "KetLuan"
        while (rs.next()) {
//            class='tomauHover'
            out.print("<tr class='tomauHover'>");
            out.print("<td id='" + rs.getString("IDBPCT") + "'>" + rs.getString("TenBoPhan") + ": </td>");
            out.print("<td id='" + rs.getString("IDBPCT") + "'>"
                    + "<textarea id='id" + rs.getString("IDBPCT") + "' class='txtInput' style='width: 100%; height: 28px; color: darkblue; font-size:13px;'>" + rs.getString("KetLuan") + "</textarea>"
                    + "</td>");
            out.print("</tr>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("dskhamsuckhoe")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        DateFormat hf = new SimpleDateFormat("H");
        DateFormat mf = new SimpleDateFormat("m");

        String ngayGN = "01/01/1990", gioGN = "0", phutGN = "0";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucKhamSucKhoeTheoIDBDK(idBDK);
//    sk."IDSTDSK",
//    sk."NgayKham",
//    sk."CanNang",
//    sk."ChieuCao",
//    sk."KetLuan",
//    sk."MaNVLap",
//    vn1."HoTenNV" as "HoTenLap",
//    sk."MaNVKetLuan",
//    vn2."HoTenNV" as "HoTenKL",
//    sk."IDBDK"

        int stt = 1;
        while (rs.next()) {
            ngayGN = df.format(rs.getTimestamp("NgayKham"));
            gioGN = hf.format(rs.getTimestamp("NgayKham"));
            phutGN = mf.format(rs.getTimestamp("NgayKham"));

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + ngayGN + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + gioGN + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + phutGN + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + rs.getString("CanNang") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + rs.getString("ChieuCao") + "</td>");
            out.print("<td id='" + rs.getString("IDSTDSK") + "'>" + rs.getString("KetLuan") + "</td>");
            out.print("<td id='" + rs.getString("MaNVLap") + "'>" + rs.getString("HoTenLap") + "</td>");
            out.print("<td id='" + rs.getString("MaNVKetLuan") + "'>" + rs.getString("HoTenKL") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'><a href='#' title='Xem chi tiết' onclick='xemKhamSucKhoe(); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatekhamsuckhoe")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));

        String ketLuan = request.getParameter("ketLuan");
        String listNDKham = request.getParameter("listNDKham");
        String maNVLap = request.getParameter("maNVLap");
        String maNVKetLuan = request.getParameter("maNVKetLuan");

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date ngayLap = df.parse(request.getParameter("ngayLap"));

        String strTemp = "";
        strTemp = request.getParameter("canNang");
        strTemp = strTemp.replaceAll(",", "");
        double canNang = Double.parseDouble(strTemp);

        strTemp = request.getParameter("chieuCao");
        strTemp = strTemp.replaceAll(",", "");
        double chieuCao = Double.parseDouble(strTemp);

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isEdit.equals("edit")) {
            double idSTDSK = Double.parseDouble(request.getParameter("idSTDSK"));
            result = objHS.SuaSoTheoDoiSucKhoe(canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, ngayLap, idBDK, listNDKham, idSTDSK);
        } else if (isEdit.equals("add")) {
            result = objHS.ThemSoTheoDoiSucKhoe(canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, ngayLap, idBDK, listNDKham);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delkhamsuckhoe")) {
        HocSinhBusiness objHS = new HocSinhBusiness();

        double idSTDSK = Double.parseDouble(request.getParameter("idSTDSK"));
        String result = "";
        result = objHS.XoaKhamSucKhoe(idSTDSK);
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dsbangdangky")) {
        double inID = Double.parseDouble(request.getParameter("inID"));
        boolean isHocSinh = Boolean.parseBoolean(request.getParameter("isHocSinh"));

        DateFormat dfull = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucBangDangKyTheoID(inID, isHocSinh);

//    bdk."IDBDK",
//    bdk."NgayBD",
//    bdk."NgayKT",
//    bdk."GhiChu",
//    hs."MSHS",
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh",
//    hs."DiaChi",
//    hs."GhiChu",
//    lh."MaLop",
//    lh."TenLop" as "TenLopHoc",
//    l."IDLop",
//    l."TenLop",
//    hk."IDHK",
//    hk."HocKy",
//    hk."NamHoc"
        String result = "", gioiTinh = "";
        int stt = 1;
        while (rs.next()) {
            if (isHocSinh) {// Nhật ký đăng ký Lớp học              
                result = result
                        + "<tr class='tomauHover'>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + stt + "</td>"
                        + "     <td id='" + rs.getString("MaLop") + "'>" + rs.getString("TenLopHoc") + "</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + df.format(rs.getDate("NgayBD")) + "</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + df.format(rs.getDate("NgayKT")) + "</td>"
                        + "     <td id='" + rs.getString("IDBDK") + "'>" + rs.getString("TenLop") + " || HK: " + rs.getString("HocKy") + " || NH: " + rs.getString("NamHoc") + "</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'><a href='#' title='Xem chi tiết' onclick='xemBangDangKy(" + isHocSinh + "); return false;'>Xem</a></td>"
                        + "</tr>";
            } else {// Danh sách Học sinh đăng ký Lớp học
                if (rs.getBoolean("GioiTinh")) {
                    gioiTinh = "Nam";
                } else {
                    gioiTinh = "Nữ";
                }
                result = result
                        + "<tr class='tomauHover'>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + stt + "</td>"
                        + "     <td id='" + rs.getString("MSHS") + "'>" + rs.getString("HoTenHS") + " || (" + rs.getString("TenThanMat") + ")</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + df.format(rs.getDate("NgaySinh")) + "</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'>" + gioiTinh + "</td>"
                        + "     <td id='" + rs.getString("IDBDK") + "'>" + rs.getString("DiaChi") + "</td>"
                        + "     <td align='center' id='" + rs.getString("IDBDK") + "'><a href='#' title='Xem chi tiết' onclick='xemBangDangKy(" + isHocSinh + "); return false;'>Xem</a></td>"
                        + "</tr>";
            }
            stt++;
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("cbolophoc")) {
        double idLop = Double.parseDouble(request.getParameter("idLop"));
        double idHK = Double.parseDouble(request.getParameter("idHK"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhMucLopHocTheoIDLopIDHK(idHK, idLop);

//    "TenLop", "GhiChu", "IDLop", "IDHK", "MaLop"
        while (rs.next()) {
            out.print("<option value=" + rs.getString("MaLop") + ">" + rs.getString("TenLop") + "</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatebangdangky")) {
        double inID = Double.parseDouble(request.getParameter("inID"));
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Date ngayBD = df.parse(request.getParameter("ngayBD"));
        Date ngayKT = df.parse(request.getParameter("ngayKT"));
        Date ngaySinh = df.parse(request.getParameter("ngaySinh"));

        String ghiChu = request.getParameter("ghiChu");
        String hoTen = request.getParameter("hoTen");
        String tenThanMat = request.getParameter("tenThanMat");
        String quocTich = request.getParameter("quocTich");
        String diaChi = request.getParameter("diaChi");
        String ghiChuHS = request.getParameter("ghiChuHS");

        boolean gioiTinh = Boolean.parseBoolean(request.getParameter("gioiTinh"));
        boolean isHocSinh = Boolean.parseBoolean(request.getParameter("isHocSinh"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isHocSinh) {// Nhật ký đăng ký Lớp học
            if (isEdit.equals("edit")) {
                result = objHS.SuaChuyenLopDangKy(inID, ngayBD, ngayKT, ghiChu);
            } else if (isEdit.equals("add")) {
                double msHS = Double.parseDouble(request.getParameter("msHS"));
                double maLop = Double.parseDouble(request.getParameter("inMaLop"));
                result = objHS.ThemChuyenLopDangKy(maLop, ngayBD, ngayKT, ghiChu, msHS);
            }
        } else {// Danh sách Học sinh đăng ký Lớp học
            if (isEdit.equals("edit")) {
                // inID <-> idBDK
                result = objHS.SuaHocSinhDangKy(inID, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
            } else if (isEdit.equals("add")) {
                // inID <-> maLop
                result = objHS.ThemHocSinhDangKy(inID, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
            }
        }

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("delbangdangky")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));
        boolean isHocSinh = Boolean.parseBoolean(request.getParameter("isHocSinh"));

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        if (isHocSinh) {// Nhật ký đăng ký Lớp học
            result = objHS.XoaBangDangKy(idBDK, isHocSinh);
        } else {// Danh sách Học sinh đăng ký Lớp học
            result = objHS.XoaBangDangKy(idBDK, isHocSinh);
        }

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dsphuhuynh")) {
        double msHS = Double.parseDouble(request.getParameter("msHS"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String ngaySinh = "01/01/1990";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhSachPhuHuynTheoMSHS(msHS);
//    ph."MSPH",
//    ph."HoTen",
//    ph."NgaySinh",
//    ph."GioiTinh",
//    ph."DiaChi",
//    ph."NgheNghiep",
//    ph."NoiLamViec",
//    ph."SoDienThoai",
//    ph."Email",
//    qh."QuanHe"       

        String strGT = "true", valGT = "Nam";
        int stt = 1;
        while (rs.next()) {
            ngaySinh = df.format(rs.getDate("NgaySinh"));

            if (rs.getBoolean("GioiTinh")) {
                strGT = "true";
                valGT = "Nam";
            } else {
                strGT = "false";
                valGT = "Nữ";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("MSPH") + "'>" + stt + "</td>");
            out.print("<td id='" + rs.getString("MSPH") + "'>" + rs.getString("HoTen") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MSPH") + "'>" + ngaySinh + "</td>");
            out.print("<td align='center' id='" + strGT + "'>" + valGT + "</td>");
            out.print("<td id='" + rs.getString("MSPH") + "'>" + rs.getString("SoDienThoai") + "</td>");
            out.print("<td id='" + rs.getString("MSPH") + "'>" + rs.getString("Email") + "</td>");
            out.print("<td id='" + rs.getString("MSPH") + "'>" + rs.getString("NoiLamViec") + "</td>");
            out.print("<td id='" + rs.getString("MSPH") + "'>" + rs.getString("QuanHe") + "</td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("infogiaovien")) {
        String maNV = request.getParameter("maNV");
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String ngaySinh = "01/01/1990";
        String result = "", strGT = "";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.ThongTinNhanVienTheoMaNV(maNV);
//    "MaNV",
//    "HoTenNV",
//    "NgaySinh",
//    "DiaChi",
//    "SoDT",
//    "Email",
//    "CMND",
//    "GioiTinh",
//    "ChucDanh",
//    "GhiChu"

        while (rs.next()) {
            ngaySinh = df.format(rs.getDate("NgaySinh"));

            if (rs.getBoolean("GioiTinh")) {
                strGT = "Nam";
            } else {
                strGT = "Nữ";
            }

            result = rs.getString("MaNV") + "<s>"
                    + rs.getString("HoTenNV") + "<s>"
                    + ngaySinh + "<s>"
                    + strGT + "<s>"
                    + rs.getString("DiaChi") + "<s>"
                    + rs.getString("SoDT") + "<s>"
                    + rs.getString("Email") + "<s>"
                    + rs.getString("CMND") + "<s>"
                    + rs.getString("ChucDanh") + "<s>"
                    + rs.getString("GhiChu");
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dschunhiem")) {
        String maNV = request.getParameter("maNV");

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String ngayBD = "01/01/1990", ngayKT = "01/01/1990";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhSachChuNhiemTheoMaNV(maNV);
//    l."IDLL",
//    lh."IDLop",
//    lh."IDHK",
//    cn."MaNV",
//    cn."MaLop",
//    lh."TenLop",	
//    cn."NgayBD",
//    cn."NgayKT",
//    cn."GhiChu"      

        String idLL = "", idLop = "", idHK = "", maLop = "";
        int stt = 1;
        while (rs.next()) {
            idLL = rs.getString("IDLL");
            idLop = rs.getString("IDLop");
            idHK = rs.getString("IDHK");
            maLop = rs.getString("MaLop");

            ngayBD = df.format(rs.getDate("NgayBD"));
            ngayKT = df.format(rs.getDate("NgayKT"));

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("MaNV") + "'>" + stt + "</td>");
            out.print("<td id='" + rs.getString("MaLop") + "'>" + rs.getString("TenLop") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MaLop") + "'>" + ngayBD + "</td>");
            out.print("<td align='center' id='" + rs.getString("MaLop") + "'>" + ngayKT + "</td>");
            out.print("<td id='" + rs.getString("MaLop") + "'>" + rs.getString("GhiChu") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MaLop") + "'><a href='#' title='Xem chi tiết' onclick='xemChuNhiem(" + idLL + "," + idLop + "," + idHK + "," + maLop + "); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("delchunhiem")) {
        double maLop = Double.parseDouble(request.getParameter("idCNL"));
        String maNV = request.getParameter("maNV");

        HocSinhBusiness objHS = new HocSinhBusiness();
        String result = "";
        result = objHS.XoaChuNhiem(maLop, maNV);

        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("updatechunhiem")) {
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        Date ngayBD = df.parse(request.getParameter("ngayBD"));
        Date ngayKT = df.parse(request.getParameter("ngayKT"));
        String ghiChu = request.getParameter("ghiChu");
        double maLop = Double.parseDouble(request.getParameter("idCNL"));
        String maNV = request.getParameter("maNV");

        HocSinhBusiness objHS = new HocSinhBusiness();

        String result = "";
        String isEdit = request.getParameter("isEdit").toLowerCase();
        if (isEdit.equals("edit")) {
            result = objHS.SuaChuNhiem(maLop, ngayBD, ngayKT, ghiChu, maNV);
        } else if (isEdit.equals("add")) {
            result = objHS.ThemChuNhiem(maLop, ngayBD, ngayKT, ghiChu, maNV);
        }
        out.print(result);
        return;
    }

    if (caseName.trim().toLowerCase().equals("dshocsinhdangkylop")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String ngaySinh = "01/01/1990", ngayBD = "01/01/1990", ngayKT = "01/01/1990";

        HocSinhBusiness objHS = new HocSinhBusiness();
        ResultSet rs = objHS.DanhSachHocSinhDangKyTheoMaLop(maLop);
//    bdk."IDBDK",
//    bdk."NgayBD",
//    bdk."NgayKT",	
//    bdk."MSHS",
//    hs."HoTenHS",
//    hs."TenThanMat",
//    hs."NgaySinh",
//    hs."GioiTinh",
//    bdk."MaLop",
//    lh."TenLop",
//    bdk."GhiChu"

        String strGT = "true", valGT = "Nam";
        int stt = 1;
        while (rs.next()) {
            ngaySinh = df.format(rs.getDate("NgaySinh"));
            ngayBD = df.format(rs.getDate("NgayBD"));
            ngayKT = df.format(rs.getDate("NgayKT"));

            if (rs.getBoolean("GioiTinh")) {
                strGT = "true";
                valGT = "Nam";
            } else {
                strGT = "false";
                valGT = "Nữ";
            }

            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDBDK") + "'>" + stt + "</td>");
            out.print("<td id='" + rs.getString("MSHS") + "'>" + rs.getString("HoTenHS") + "</td>");
            out.print("<td id='" + rs.getString("MSHS") + "'>" + rs.getString("TenThanMat") + "</td>");
            out.print("<td align='center' id='" + rs.getString("MSHS") + "'>" + ngaySinh + "</td>");
            out.print("<td align='center' id='" + strGT + "'>" + valGT + "</td>");
            out.print("<td id='" + rs.getString("MSHS") + "'>" + rs.getString("DiaChi") + "</td>");
            out.print("<td id='" + rs.getString("MaLop") + "'>" + rs.getString("TenLop") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBDK") + "'>" + ngayBD + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBDK") + "'>" + ngayKT + "</td>");
            out.print("<td id='" + rs.getString("IDBDK") + "'>" + rs.getString("GhiChu") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBDK") + "'><a href='#' title='Xem chi tiết' onclick='xemHocSinh(); return false;'>Xem</a></td>");
            out.print("</tr>");

            stt++;
        }
        return;
    }
%>
