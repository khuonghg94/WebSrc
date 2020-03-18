/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.HocSinhAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class HocSinhBusiness {

    HocSinhAdapter hsAdapter;

    public HocSinhBusiness() throws ClassNotFoundException, SQLException {
        hsAdapter = new HocSinhAdapter();
    }

    public ResultSet DanhMucHocKy() throws SQLException {
        return hsAdapter.DanhMucHocKy();
    }

    public ResultSet DanhMucLoaiLop() throws SQLException {
        return hsAdapter.DanhMucLoaiLop();
    }

    public ResultSet DanhMucLopTheoIDLL(double idLL) throws SQLException {
        return hsAdapter.DanhMucLopTheoIDLL(idLL);
    }

    public String ThemLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu) throws SQLException {
        return hsAdapter.ThemLopHoc(tenLop, idLop, idHK, ghiChu);
    }

    public String listRoot(double idRoot) throws SQLException {
        return hsAdapter.listRoot(idRoot);
    }

    public ResultSet ThongTinLopHocTheoMaLop(double maLop) throws SQLException {
        return hsAdapter.ThongTinLopHocTheoMaLop(maLop);
    }

    public String XoaLopHoc(double maLop) throws SQLException {
        return hsAdapter.XoaLopHoc(maLop);
    }

    public String SuaLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu, double maLop) throws SQLException {
        return hsAdapter.SuaLopHoc(tenLop, idLop, idHK, ghiChu, maLop);
    }

    public ResultSet DanhSachHocSinhDangKyTheoMaLop(double maLop) throws SQLException {
        return hsAdapter.DanhSachHocSinhDangKyTheoMaLop(maLop);
    }

    public ResultSet ThongTinHocSinhDangKyTheoIDBDK(double idBDK) throws SQLException {
        return hsAdapter.ThongTinHocSinhDangKyTheoIDBDK(idBDK);
    }

    public ResultSet DanhSachSoLienLacTheoIDBDK(double idBDK) throws SQLException {
        return hsAdapter.DanhSachSoLienLacTheoIDBDK(idBDK);
    }

    public String ThemSoLienLac(int inThang, double canNang, double chieuCao, String ghiNhanGV, String ghiNhanPH, String maNV, Date ngayGN, double idBDK) throws SQLException {
        return hsAdapter.ThemSoLienLac(inThang, canNang, chieuCao, ghiNhanGV, ghiNhanPH, maNV, ngayGN, idBDK);
    }

    public String SuaSoLienLac(int inThang, double canNang, double chieuCao, String ghiNhanGV, String ghiNhanPH, String maNV, Date ngayGN, double idBDK, double idSLL) throws SQLException {
        return hsAdapter.SuaSoLienLac(inThang, canNang, chieuCao, ghiNhanGV, ghiNhanPH, maNV, ngayGN, idBDK, idSLL);
    }

    public String XoaSoLienLac(double idSLL) throws SQLException {
        return hsAdapter.XoaSoLienLac(idSLL);
    }

    public ResultSet DanhSachDiemDanhTheoIDBDK(double idBDK) throws SQLException {
        return hsAdapter.DanhSachDiemDanhTheoIDBDK(idBDK);
    }

    public String ThemDiemDanh(Date ngayBD, Date ngayKT, Date ngayGN, String ghiChu, String maNV, boolean isPhep, double idBDK) throws SQLException {
        return hsAdapter.ThemDiemDanh(ngayBD, ngayKT, ngayGN, ghiChu, maNV, isPhep, idBDK);
    }

    public String SuaDiemDanh(Date ngayBD, Date ngayKT, Date ngayGN, String ghiChu, String maNV, boolean isPhep, double idBDK, double idXPN) throws SQLException {
        return hsAdapter.SuaDiemDanh(ngayBD, ngayKT, ngayGN, ghiChu, maNV, isPhep, idBDK, idXPN);
    }

    public String XoaDiemDanh(double idXPN) throws SQLException {
        return hsAdapter.XoaDiemDanh(idXPN);
    }

    public ResultSet ChiTietKhamTheoIDSTDSK(double idSTDSK) throws SQLException {
        return hsAdapter.ChiTietKhamTheoIDSTDSK(idSTDSK);
    }

    public ResultSet DanhMucKhamSucKhoeTheoIDBDK(double idBDK) throws SQLException {
        return hsAdapter.DanhMucKhamSucKhoeTheoIDBDK(idBDK);
    }

    public String ThemSoTheoDoiSucKhoe(double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, Date ngayLap, double idBDK, String listNDKham) throws SQLException {
        return hsAdapter.ThemSoTheoDoiSucKhoe(canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, ngayLap, idBDK, listNDKham);
    }

    public String SuaSoTheoDoiSucKhoe(double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, Date ngayLap, double idBDK, String listNDKham, double idSTDSK) throws SQLException {
        return hsAdapter.SuaSoTheoDoiSucKhoe(canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, ngayLap, idBDK, listNDKham, idSTDSK);
    }

    public String XoaKhamSucKhoe(double idSTDSK) throws SQLException {
        return hsAdapter.XoaKhamSucKhoe(idSTDSK);
    }

    public ResultSet DanhMucBangDangKyTheoID(double inID, boolean isHocSinh) throws SQLException {
        return hsAdapter.DanhMucBangDangKyTheoID(inID, isHocSinh);
    }

    public ResultSet DanhMucLopHocTheoIDLopIDHK(double idHK, double idLop) throws SQLException {
        return hsAdapter.DanhMucLopHocTheoIDLopIDHK(idHK, idLop);
    }

    public String ThemHocSinhDangKy(double maLop, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        return hsAdapter.ThemHocSinhDangKy(maLop, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
    }

    public String XoaBangDangKy(double idBDK, boolean isHocSinh) throws SQLException {
        return hsAdapter.XoaBangDangKy(idBDK, isHocSinh);
    }

    public String SuaHocSinhDangKy(double idBDK, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        return hsAdapter.SuaHocSinhDangKy(idBDK, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
    }

    public String ThemChuyenLopDangKy(double maLop, Date ngayBD, Date ngayKT, String ghiChu, double msHS) throws SQLException {
        return hsAdapter.ThemChuyenLopDangKy(maLop, ngayBD, ngayKT, ghiChu, msHS);
    }

    public String SuaChuyenLopDangKy(double idBDK, Date ngayBD, Date ngayKT, String ghiChu) throws SQLException {
        return hsAdapter.SuaChuyenLopDangKy(idBDK, ngayBD, ngayKT, ghiChu);
    }

    public ResultSet DanhSachPhuHuynTheoMSHS(double msHS) throws SQLException {
        return hsAdapter.DanhSachPhuHuynTheoMSHS(msHS);
    }

    public ResultSet ThongTinNhanVienTheoMaNV(String maNV) throws SQLException {
        return hsAdapter.ThongTinNhanVienTheoMaNV(maNV);
    }

    public ResultSet DanhSachChuNhiemTheoMaNV(String maNV) throws SQLException {
        return hsAdapter.DanhSachChuNhiemTheoMaNV(maNV);
    }

    public String XoaChuNhiem(double maLop, String maNV) throws SQLException {
        return hsAdapter.XoaChuNhiem(maLop, maNV);
    }

    public String ThemChuNhiem(double maLop, Date ngayBD, Date ngayKT, String ghiChu, String maNV) throws SQLException {
        return hsAdapter.ThemChuNhiem(maLop, ngayBD, ngayKT, ghiChu, maNV);
    }

    public String SuaChuNhiem(double maLop, Date ngayBD, Date ngayKT, String ghiChu, String maNV) throws SQLException {
        return hsAdapter.SuaChuNhiem(maLop, ngayBD, ngayKT, ghiChu, maNV);
    }
}
