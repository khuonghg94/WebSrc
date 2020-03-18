/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.BienNhanAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class BienNhanBusiness {
    BienNhanAdapter bnAdapter;

    public BienNhanBusiness() throws ClassNotFoundException, SQLException {
        bnAdapter = new BienNhanAdapter();
    }

    public ResultSet ChiTietBienNhan(double idBDK, Date ngayLap, double idBN) throws SQLException {
        return bnAdapter.ChiTietBienNhan(idBDK, ngayLap, idBN);
    }
    
    public String LapBienNhan(String listChiTiet, String noiDung, String maNV, Date ngayLap, double idBDK, String sumTT, String ndXNDeNghi, String ndTaiChinh) throws SQLException {
        return bnAdapter.LapBienNhan(listChiTiet, noiDung, maNV, ngayLap, idBDK, sumTT, ndXNDeNghi, ndTaiChinh);
    }
    
    public ResultSet DanhSachBienNhan(String nameTab, Date tuNgayLap, Date denNgayLap) throws SQLException {
        return bnAdapter.DanhSachBienNhan(nameTab, tuNgayLap, denNgayLap);
    }
    
    public ResultSet ThongTinBienNhanTheoIDBN(double idBN) throws SQLException {
        return bnAdapter.ThongTinBienNhanTheoIDBN(idBN);
    }
    
    public String CapNhatXNBienNhan(String tabName, String maNV, boolean isXacNhan, double idBN, String noiDung) throws SQLException {
        return bnAdapter.CapNhatXNBienNhan(tabName, maNV, isXacNhan, idBN, noiDung);
    }
    
    public String XoaBienNhan(double idBN) throws SQLException {
        return bnAdapter.XoaBienNhan(idBN);
    }
    
    public String XoaChiTietKhoanThu(double idBN, double idKT) throws SQLException {
        return bnAdapter.XoaChiTietKhoanThu(idBN, idKT);
    }
    
    public String TangSLKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        return bnAdapter.TangSLKhoanThu(idBN, idKT, tyLe);
    }
    
    public String GiamSLKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        return bnAdapter.GiamSLKhoanThu(idBN, idKT, tyLe);
    }
    
    public String capNhatTyLeKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        return bnAdapter.capNhatTyLeKhoanThu(idBN, idKT, tyLe);
    }
}
