/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.GiaVeAdapter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

/**
 *
 * @author Administrator
 */
public class GiaVeBusiness {

    GiaVeAdapter giaVeAdapter;

    public GiaVeBusiness() throws ClassNotFoundException, SQLException {
        giaVeAdapter = new GiaVeAdapter();
    }

    public ResultSet DanhMucTheoIDVe(double idVe) throws SQLException {
        return giaVeAdapter.DanhMucTheoIDVe(idVe);
    }

    public String Them(Date ngayBD, Date ngayKT, double donGia, double idKT) throws SQLException {
        return giaVeAdapter.Them(ngayBD, ngayKT, donGia, idKT);
    }
    
    public String Xoa(Double idGiaLoaiVe) throws SQLException {
        return giaVeAdapter.Xoa(idGiaLoaiVe);
    }
}
