/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.KhoanThuAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Administrator
 */
public class KhoanThuBusiness {

    KhoanThuAdapter loaiVeAdapter;

    public KhoanThuBusiness() throws ClassNotFoundException, SQLException {
        loaiVeAdapter = new KhoanThuAdapter();
    }

    public ResultSet DanhMuc() throws SQLException {
        return loaiVeAdapter.DanhMuc();
    }

    public ResultSet DanhMucVeOnline() throws SQLException {
        return loaiVeAdapter.DanhMucVeOnline();
    }
    
    public String Them(String tenKhoanThu, Double soLan, boolean batBuoc, String ghiChu) throws SQLException {
        return loaiVeAdapter.Them(tenKhoanThu, soLan, batBuoc, ghiChu);
    }

    public String Sua(String tenKhoanThu, Double soLan, boolean batBuoc, String ghiChu, Double idKT) throws SQLException {
        return loaiVeAdapter.Sua(tenKhoanThu, soLan, batBuoc, ghiChu, idKT);
    }
    
    public String Xoa(Double idLoaiVe) throws SQLException {
        return loaiVeAdapter.Xoa(idLoaiVe);
    }
}
