/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;
import DataAccess.Adapter.HocSinhAdapter_new;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class HocSinhBusiness_new {
    HocSinhAdapter_new hsAdapter;

    public HocSinhBusiness_new() throws ClassNotFoundException, SQLException {
        hsAdapter = new HocSinhAdapter_new();
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
    public ResultSet DanhMucMaLop(double idLL, double idLop, double idHK) throws SQLException {
        return hsAdapter.DanhMucMaLop(idLL, idLop, idHK);
    }
    public ResultSet ThongTinLopHoc(double MaLop) throws SQLException {
        return hsAdapter.ThongTinLopHoc(MaLop);
    }
    public ResultSet DanhSachHocSinh_TheoMaLop(double MaLop) throws SQLException {
        return hsAdapter.DanhSachHSTheoMaLop(MaLop);
    }
    public ResultSet ThongTinChiTiet_HS(double MSHS) throws SQLException {
        return hsAdapter.ThongTinChiTiet_HS(MSHS);
    }
    public ResultSet DanhSachLopHoc_TheoMSHS(double MSHS) throws SQLException {
        return hsAdapter.DanhSachLopHoc_TheoMSHS(MSHS);
    }
    public ResultSet ThongTinChiTiet_DK(double IDBDK) throws SQLException {
        return hsAdapter.ThongTinChiTiet_DK(IDBDK);
    }
    public String ThemLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu) throws SQLException {
        return hsAdapter.ThemLopHoc(tenLop, idLop, idHK, ghiChu);
    }
    public String SuaLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu, double maLop) throws SQLException {
        return hsAdapter.SuaLopHoc(tenLop, idLop, idHK, ghiChu, maLop);
    }
    public String XoaLopHoc(double maLop) throws SQLException {
        return hsAdapter.XoaLopHoc(maLop);
    }
    public String ThemHocSinhDangKy(double maLop, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        return hsAdapter.ThemHocSinhDangKy(maLop, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
    }
    public String SuaHocSinhDangKy(double idBDK, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        return hsAdapter.SuaHocSinhDangKy(idBDK, ngayBD, ngayKT, ngaySinh, ghiChu, hoTen, tenThanMat, quocTich, diaChi, ghiChuHS, gioiTinh);
    }
    public ResultSet DanhMucNgayKham_TheoMSHS_MaLop(double MSHS, double MaLop) throws SQLException {
        return hsAdapter.DanhMucNgayKham_TheoMSHS_MaLop(MSHS, MaLop);
    } 
    public ResultSet ChiTietKham_TheoIDSTDSK(double IDSTDSK) throws SQLException {
        return hsAdapter.ChiTietKham_TheoIDSTDSK(IDSTDSK);
    } 
    public ResultSet DanhMucBoPhanCoThe() throws SQLException {
        return hsAdapter.LoadBoPhanCoThe_All();
    }
    public ResultSet DanhMucNhanVien() throws SQLException {
        return hsAdapter.DanhMucNhanVien();
    }
    public String ThemSoTheoDoiSucKhoe(String tenLop, double maLop, double MSHS, Date ngayKham, double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, String listNDKham, String ghiChu) throws SQLException {
        return hsAdapter.ThemSoTheoDoiSucKhoe(tenLop, maLop, MSHS, ngayKham, canNang, chieuCao, ketLuan, maNVLap, maNVKetLuan, listNDKham, ghiChu);
    }
    public ResultSet ThongTinInSTDSK_TheoIDSTDSK(double IDSTDSK) throws SQLException {
        return hsAdapter.ThongTinInSTDSK_TheoIDSTDSK(IDSTDSK);
    } 
}
