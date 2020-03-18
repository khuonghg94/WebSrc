
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="BusinessLogic.HocSinhBusiness_new"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
    if (caseName.trim().toLowerCase().equals("cbohocky")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucHocKy();
        out.print("<option value='-1' selected>--Chọn Học Kỳ</option>");
//    "IDHK", "HocKy", "NamHoc", "NgayBD", "NgayKT"
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDHK") + ">" + rs.getString("HocKy") + " (" + rs.getString("NamHoc") + ")</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("cboloailop")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucLoaiLop();
//    "IDLL", "TenLoaiLop", "GhiChu"
        out.print("<option value='-1' selected>--Chọn Loại Lớp</option>");
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDLL") + ">" + rs.getString("TenLoaiLop") + "</option>");
        }
        return;
    }

    if (caseName.trim().toLowerCase().equals("cbolop")) {
        double idLL = Double.parseDouble(request.getParameter("idLL"));

        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucLopTheoIDLL(idLL);
        out.print("<option value='-1' selected>--Chọn Lớp</option>");
//    "IDLop", "TenLop", "GhiChu", "IDLL", "TuThangTuoi", "DenThangTuoi" 
        while (rs.next()) {
            out.print("<option value=" + rs.getString("IDLop") + ">" + rs.getString("TenLop") + "</option>");
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("danhmucmalop")) {
        double idLL = Double.parseDouble(request.getParameter("idLL"));
        double idLop = Double.parseDouble(request.getParameter("idLop"));
        double idHK = Double.parseDouble(request.getParameter("idHK"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucMaLop(idLL, idLop, idHK); 
        out.print("<option value='-1' selected>--Mã Lớp--</option>");
//    "MaLop"
        while (rs.next()) {
            out.print("<option value=" + rs.getString("MaLop") + ">" + rs.getString("MaLop") + "</option>");
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("thongtinlophoc")) {
        double MaLop = Double.parseDouble(request.getParameter("MaLop"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ThongTinLopHoc(MaLop); 

//    "TenLoaiLop", "TenLop", "HocKy", "NamHoc" , "GhiChu", "IDLL", "IDLop", "IDHK"
        while (rs.next()) {
            out.print(rs.getString("TenLoaiLop") + "<s>" + rs.getString("TenLop") + "<s>" + rs.getString("HocKy") + " (" + rs.getString("NamHoc") + ")" + "<s>" + rs.getString("GhiChu") + "<s>" + rs.getString("IDLL") + "<s>" + rs.getString("IDLop") + "<s>" + rs.getString("IDHK"));
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("danhsachhs")) {
        double MaLop = Double.parseDouble(request.getParameter("MaLop"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhSachHocSinh_TheoMaLop(MaLop);

//    "MSHS", "HoTenHS", "TenThanMat"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("MSHS") + "'>" + rs.getString("MSHS") + "</td>");
            out.print("<td align='center'>" + rs.getString("HoTenHS") + " || " + rs.getString("TenThanMat") + "</td>");
            out.print("<td align='center'><a href='#' title='Xem chi tiết' onclick='xemTTHS()'>Xem</a></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("thongtinchitiet_hs")) {
        double MSHS = Double.parseDouble(request.getParameter("MSHS"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ThongTinChiTiet_HS(MSHS);

// "MSHS", "HoTenHS", "TenThanMat", "NgaySinh", "GioiTinh", "QuocTich", "DiaChi", "GhiChu" 
        DateFormat dfull = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
        String gioiTinh = "";
        while (rs.next()) {
            if (rs.getBoolean("GioiTinh")) {
                gioiTinh = "Nam";
            } else {
                gioiTinh = "Nữ";
            }
            out.print(rs.getString("MSHS") + "<s>" + rs.getString("HoTenHS") + "<s>" + rs.getString("TenThanMat") + "<s>" + rs.getDate("NgaySinh").toString() + "<s>" + gioiTinh + "<s>" + rs.getString("QuocTich") + "<s>" + rs.getString("DiaChi") + "<s>" + rs.getString("GhiChu"));
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("dslophoc_hs")) {
        double MSHS = Double.parseDouble(request.getParameter("MSHS"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhSachLopHoc_TheoMSHS(MSHS);

//    "IDBDK", "TenLop", "GhiChu"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBDK") + "'>" + rs.getString("IDBDK") + "</td>");
            out.print("<td align='center'>" + rs.getString("TenLop") + "</td>");
            out.print("<td align='center'>" + rs.getString("GhiChu") + "</td>");
            out.print("<td align='center'><input type='checkbox' disabled='disabled'></input></td>");
            out.print("<td align='center'><a href='#' title='Xem chi tiết' onclick='xemTTDK()'>Xem</a></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("thongtinchitiet_dk")) {
        double IDBDK = Double.parseDouble(request.getParameter("IDBDK"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ThongTinChiTiet_DK(IDBDK);

// "IDBDK", "TenLoaiLop", "TenLop", "NgayBD", "NgayKT", "GhiChu"
        while (rs.next()) {
            out.print(rs.getString("IDBDK") + "<s>" + rs.getString("TenLoaiLop") + "<s>" + rs.getString("TenLop") + "<s>" + rs.getDate("NgayBD").toString() + "<s>" + rs.getDate("NgayKT").toString() + "<s>" + rs.getString("GhiChu"));
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("themmoilophoc")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        String result = "";
        String tenLop = request.getParameter("tenLop");
        String ghiChu = request.getParameter("ghiChu");
        double idLop = Double.parseDouble(request.getParameter("idLop"));
        double idHK = Double.parseDouble(request.getParameter("idHK"));
        result = objHS.ThemLopHoc(tenLop, idLop, idHK, ghiChu);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("updatelophoc")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        String result = "";
        String tenLop = request.getParameter("tenLop");
        String ghiChu = request.getParameter("ghiChu");
        double idLop = Double.parseDouble(request.getParameter("idLop"));
        double idHK = Double.parseDouble(request.getParameter("idHK"));
        double maLop = Double.parseDouble(request.getParameter("maLop"));
        result = objHS.SuaLopHoc(tenLop, idLop, idHK, ghiChu, maLop);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("xoalophoc")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        String result = "";
        result = objHS.XoaLopHoc(maLop);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("themdangkymoi")) {
        double maLop = Double.parseDouble(request.getParameter("maLop"));
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
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
     
        String result = "";
        result = objHS.ThemHocSinhDangKy(maLop, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("suahocsinhdangky")) {
        double idBDK = Double.parseDouble(request.getParameter("idBDK"));
        DateFormat df = new SimpleDateFormat("yyyy-mm-dd");
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
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
     
        String result = "";
        result = objHS.SuaHocSinhDangKy(idBDK, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
        out.print(result);
        return;
    }
    if (caseName.trim().toLowerCase().equals("danhmucngaykham")) {
        double MSHS = Double.parseDouble(request.getParameter("MSHS"));
        double MaLop = Double.parseDouble(request.getParameter("MaLop"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucNgayKham_TheoMSHS_MaLop(MSHS,MaLop);

//    "IDSTDSK", "NgayKham", "KetLuan"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDSTDSK") + "'>" + rs.getString("IDSTDSK") + "</td>");
            out.print("<td align='center'>" + rs.getString("NgayKham") + "</td>");
            out.print("<td align='center'>" + rs.getString("KetLuan") + "</td>");
            out.print("<td align='center'><a href='#' title='Xem chi tiết' onclick='xemChiTietKham()'>Xem</a></td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("chitietkham")) {
        double IDSTDSK = Double.parseDouble(request.getParameter("IDSTDSK"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ChiTietKham_TheoIDSTDSK(IDSTDSK);

//    "NgayKham", "CanNang", "ChieuCao", "IDBPCT", "TenBoPhan", "KetLuan", "KetLuanChung"
        while (rs.next()) {
            out.print(rs.getString("NgayKham") + "<s>" + rs.getString("CanNang") + "<s>" + rs.getString("ChieuCao") + "<s>" + rs.getString("KetLuanChung") + "<s>" + rs.getString("MaNVLap") + "<s>" + rs.getString("MaNVKetLuan"));
            break;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("chitietkham_bophan")) {
        double IDSTDSK = Double.parseDouble(request.getParameter("IDSTDSK"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ChiTietKham_TheoIDSTDSK(IDSTDSK);

//    "NgayKham", "CanNang", "ChieuCao", "IDBPCT", "TenBoPhan", "KetLuan", "KetLuanChung"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center'>" + stt + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBPCT") + "'>" + rs.getString("TenBoPhan") + "</td>");
            out.print("<td align='center'>" + rs.getString("KetLuan") + "</td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("chitietkham_upd")) {
        double IDSTDSK = Double.parseDouble(request.getParameter("IDSTDSK"));
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.ChiTietKham_TheoIDSTDSK(IDSTDSK);

//    "NgayKham", "CanNang", "ChieuCao", "IDBPCT", "TenBoPhan", "KetLuan", "KetLuanChung"
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDBPCT") + "'>" + rs.getString("TenBoPhan") + "</td>");
            out.print("<td align='center'>" + "<textarea id='txt" + rs.getString("IDBPCT") + "' class='txtInput' style='width: 100%; height: 27px; color: darkblue; font-size:16px;'>" + rs.getString("KetLuan") + "</textarea></td>");
            out.print("</tr>");
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("bophancothe_all")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucBoPhanCoThe();
//    "TenBoPhan", "GhiChu", "IDBPCT"
        int stt = 1;
        while (rs.next()) {
            out.print("<tr class='tomauHover'>");
            out.print("<td align='center' id='" + rs.getString("IDBPCT") + "'>" + rs.getString("TenBoPhan") + "</td>");
            out.print("<td align='center' id='" + rs.getString("IDBPCT") + "'>" + "<textarea id='txt" + rs.getString("IDBPCT") + "' class='txtInput' style='width: 100%; height: 27px; color: darkblue; font-size:16px;'></textarea>" + "</td>");
            out.print("</tr>");
            stt++;
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("cbonhanvien")) {
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        ResultSet rs = objHS.DanhMucNhanVien();
//    (*)
        while (rs.next()) {
            out.print("<option id=" + rs.getString("MaNV") + " value=" + rs.getString("MaNV") + ">" + rs.getString("MaNV") + "-" + rs.getString("HoTenNV") + "</option>");
        }
        return;
    }
    if (caseName.trim().toLowerCase().equals("themsotheodoisuckhoe")) {
        String tenLop = request.getParameter("tenLop");
        double maLop = Double.parseDouble(request.getParameter("maLop"));
        double MSHS = Double.parseDouble(request.getParameter("MSHS"));
        
        String ketLuan = request.getParameter("ketLuan");
        String listNDKham = request.getParameter("listNDKham");
        String maNVLap = request.getParameter("maNVLap");
        String maNVKetLuan = request.getParameter("maNVKetLuan");
        String ghiChu = request.getParameter("ghiChu");

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date ngayKham = df.parse(request.getParameter("ngayKham"));

        String strTemp = "";
        strTemp = request.getParameter("canNang");
        strTemp = strTemp.replaceAll(",", "");
        double canNang = Double.parseDouble(strTemp);

        strTemp = request.getParameter("chieuCao");
        strTemp = strTemp.replaceAll(",", "");
        double chieuCao = Double.parseDouble(strTemp);
        
        HocSinhBusiness_new objHS = new HocSinhBusiness_new();
        String result = "";
        result = objHS.ThemSoTheoDoiSucKhoe(tenLop, maLop, MSHS, ngayKham, canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, listNDKham, ghiChu);
        out.print(result);
        return;
    }
%>
