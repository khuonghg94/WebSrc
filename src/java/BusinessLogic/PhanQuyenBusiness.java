/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;
import DataAccess.Adapter.PhanQuyenAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
/**
 *
 * @author Administrator
 */
public class PhanQuyenBusiness {
    PhanQuyenAdapter pqAdapter;

    public PhanQuyenBusiness() throws ClassNotFoundException, SQLException {
        pqAdapter = new PhanQuyenAdapter();
    }
    public ResultSet DanhMucPhong() throws SQLException {
        return pqAdapter.DanhMucPhong();
    }
    public ResultSet DanhMucNhaVien_TheoHoTen(String hoTen) throws SQLException {
        return pqAdapter.DanhMucNhaVien_TheoHoTen(hoTen);
    }
    public ResultSet DanhMucNhaVien_TheoHoTen_IDPhong(String hoTen, double IDPhong) throws SQLException {
        return pqAdapter.DanhMucNhaVien_TheoHoTen_IDPhong(hoTen, IDPhong);
    }
    public ResultSet DanhMucFormChucNang() throws SQLException {
        return pqAdapter.DanhMucFormChucNang();
    }
    public ResultSet DanhMucFormChucNang_ChuaCapQuyen(String maNV) throws SQLException {
        return pqAdapter.DanhMucFormChucNang_ChuaCapQuyen(maNV);
    }
    public ResultSet DanhMucFormChucNang_TheoMaNV(String maNV) throws SQLException {
        return pqAdapter.DanhMucFormChucNang_TheoMaNV(maNV);
    }
    public String ThemPhanQuyen(String MaNV, Double IDForm) throws SQLException {
        return pqAdapter.ThemPhanQuyen(MaNV, IDForm);
    }
    public String XoaPhanQuyen(Double IDPhanQuyen) throws SQLException {
        return pqAdapter.XoaPhanQuyen(IDPhanQuyen);
    }
}
