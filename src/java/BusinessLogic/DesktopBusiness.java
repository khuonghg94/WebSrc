/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.DesktopAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Sol
 */
public class DesktopBusiness {

    DesktopAdapter desktopAdapter;

    public DesktopBusiness() throws ClassNotFoundException, SQLException {
        this.desktopAdapter = new DesktopAdapter();
    }

    public ResultSet getDesktop(String userName) throws SQLException {
        return desktopAdapter.getDesktop(userName);
    }

    public String getMenu(String userName, String strBackspace, double idRoot) throws SQLException {
        return desktopAdapter.getMenu(userName, strBackspace, idRoot);
    }

    public String listRoot(double idRoot) throws SQLException {
        return desktopAdapter.listRoot(idRoot);
    }

    public String xoaChucNang(int idForm) throws SQLException {
        return desktopAdapter.xoaChucNang(idForm);
    }

    public ResultSet timChucNang(double idLCN, String txtFind) throws SQLException {
        return desktopAdapter.timChucNang(idLCN, txtFind);
    }

    public String suaChucNang(int idForm, String tenForm, String chucNang, String tenThuMuc, String iCon, boolean isDaKhoa, boolean isDesktop, double idLCN) throws SQLException {
        return desktopAdapter.suaChucNang(idForm, tenForm, chucNang, tenThuMuc, iCon, isDaKhoa, isDesktop, idLCN);
    }
    
    public String themChucNang(String tenForm, String chucNang, String tenThuMuc, String iCon, boolean isDaKhoa, boolean isDesktop, double idLCN) throws SQLException {
        return desktopAdapter.themChucNang(tenForm, chucNang, tenThuMuc, iCon, isDaKhoa, isDesktop, idLCN);
    }
    
    public String timThuMucChucNang(String tenThuMuc, String strBackspace, double idRoot) throws SQLException {
        return desktopAdapter.timThuMucChucNang(tenThuMuc, strBackspace, idRoot);
    }
    
    public ResultSet getThongTinChucNang(int idFrom) throws SQLException {
        return desktopAdapter.getThongTinChucNang(idFrom);
    }
    
    public ResultSet getThongTinThuMuc(double idLCN) throws SQLException {
        return desktopAdapter.getThongTinThuMuc(idLCN);
    }
    
    public String xoaThuMuc(double idLCN) throws SQLException {
        return desktopAdapter.xoaThuMuc(idLCN);
    }
    
    public String suaThuMuc(double idF, String tenLoai, String ghiChu, String iCon, double idLCN) throws SQLException {
        return desktopAdapter.suaThuMuc(idF, tenLoai, ghiChu, iCon, idLCN);
    }
    
    public String themThuMuc(double idF, String tenLoai, String ghiChu, String iCon) throws SQLException {
        return desktopAdapter.themThuMuc(idF, tenLoai, ghiChu, iCon);
    }
    
    public String danhSachCayNhanVien() throws SQLException {
        return desktopAdapter.danhSachCayNhanVien();
    }
    
    public String timCayNhanVien(String tenNhap) throws SQLException {
        return desktopAdapter.timCayNhanVien(tenNhap);
    }
    
   public ResultSet danhSachPhanQuyenTheoMaNV(String maNV, String txtFind) throws SQLException {
        return desktopAdapter.danhSachPhanQuyenTheoMaNV(maNV, txtFind);
    }
    
    public ResultSet thongTinNhanVien(String maNV, int maDV) throws SQLException {
        return desktopAdapter.thongTinNhanVien(maNV, maDV);
    }
    
    public String xoaPhanQuyen(int idPQ) throws SQLException {
        return desktopAdapter.xoaPhanQuyen(idPQ);
    }
    
    public String themPhanQuyen(int idUser, int idForm) throws SQLException {
        return desktopAdapter.themPhanQuyen(idUser, idForm);
    }
}
