/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.ChiTietPhanQuyenAdapter;
import DataAccess.Entity.ChiTietPhanQuyenEntity;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Administrator
 */
public class ChiTietPhanQuyenBusiness {

    ChiTietPhanQuyenAdapter chiTietPhanQuyenAdapter;
    public ChiTietPhanQuyenEntity chiTietPhanQuyenEntity = new ChiTietPhanQuyenEntity();

    public ChiTietPhanQuyenBusiness() throws ClassNotFoundException, SQLException {
        this.chiTietPhanQuyenAdapter = new ChiTietPhanQuyenAdapter();
    }

    public ResultSet DanhMuc() throws SQLException {
        return chiTietPhanQuyenAdapter.getData();
    }
    
    public ResultSet TimTheoIDUser(Integer _iDUser) throws SQLException
    {
        return chiTietPhanQuyenAdapter.getData_ByIDUser(_iDUser);
    }
    
     public String KTQuyen(Integer _iDUser, String _tenForm) throws SQLException
    {
        return chiTietPhanQuyenAdapter.getData_KT(_iDUser, _tenForm);
    }   
   
    
    public String ThemKtTrung() throws SQLException
    {
        return chiTietPhanQuyenAdapter.insertKtTrung(chiTietPhanQuyenEntity);
    }
    
    public boolean Xoa()
    {
        return chiTietPhanQuyenAdapter.delete(chiTietPhanQuyenEntity);
    }
    
    public boolean Sua() throws SQLException
    {
        return chiTietPhanQuyenAdapter.update(chiTietPhanQuyenEntity);
    }

}
