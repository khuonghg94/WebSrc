/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DataAccess.Adapter;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;

/**
 *
 * @author Administrator
 */
public class ChiTietPhanQuyenAdapter {

    Connection con;
    Statement stm;
    CallableStatement cs;

    public ChiTietPhanQuyenAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    private void openConnect() {
        try {
            if (con.isClosed()) {
                con = ConnectionAdapter.connectDataBase();
            }
        } catch (ClassNotFoundException | SQLException ex) {
            //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ResultSet getData() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_DanhMuc\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet getData_ByIDUser(Integer _iDUser) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_TimTheoIDUser\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setInt(2, _iDUser);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String getData_KT(Integer _iDUser, String _tenForm) throws SQLException {
        openConnect();
        try {

            con.setAutoCommit(false);
            cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_KT\"(?,?)}");
            cs.registerOutParameter(1, Types.LONGVARCHAR);
            cs.setInt(2, _iDUser);
            cs.setString(3, _tenForm);
            cs.execute();
            return cs.getString(1);
        } catch (SQLException ex) {
            return ex.getMessage();
        } 
        finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
   
    
    public String insertKtTrung(DataAccess.Entity.ChiTietPhanQuyenEntity chiTietPhanQuyenEntity) throws SQLException {
        openConnect();
        try {
        con.setAutoCommit(true);
        cs = con.prepareCall("{?=call \"ChiTietPhanQuyen_ThemKTTrung\"(?,?,?,?,?,?)}");
        cs.registerOutParameter(1, Types.LONGVARCHAR);
        cs.setInt(2, chiTietPhanQuyenEntity.IDUser);
        cs.setInt(3, chiTietPhanQuyenEntity.IDForm);
        cs.setBoolean(4, chiTietPhanQuyenEntity.Them);
        cs.setBoolean(5, chiTietPhanQuyenEntity.Sua);
        cs.setBoolean(6, chiTietPhanQuyenEntity.Xoa);
        cs.setBoolean(7, chiTietPhanQuyenEntity.Xem);
        cs.execute();
        return cs.getString(1);
        } catch (SQLException ex) {
            return ex.getMessage();
        }        
        finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public boolean update(DataAccess.Entity.ChiTietPhanQuyenEntity chiTietPhanQuyenEntity) throws SQLException {
        openConnect();
        try {
        con.setAutoCommit(true);
        cs = con.prepareCall("{call \"ChiTietPhanQuyen_Sua\"(?,?,?,?,?,?,?)}");
        cs.setInt(1, chiTietPhanQuyenEntity.IDPhanQuyen);
        cs.setInt(2, chiTietPhanQuyenEntity.IDUser);
        cs.setInt(3, chiTietPhanQuyenEntity.IDForm);
        cs.setBoolean(4, chiTietPhanQuyenEntity.Them);
        cs.setBoolean(5, chiTietPhanQuyenEntity.Sua);
        cs.setBoolean(6, chiTietPhanQuyenEntity.Xoa);
        cs.setBoolean(7, chiTietPhanQuyenEntity.Xem);
        cs.execute();
        return true;
        } catch (SQLException ex) {
            return false;
        }        
        finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
    }

    public boolean delete(DataAccess.Entity.ChiTietPhanQuyenEntity chiTietPhanQuyenEntity) {
        openConnect();
        try {
            con.setAutoCommit(true);
            cs = con.prepareCall("{call \"ChiTietPhanQuyen_Xoa\"(?)}");
            cs.setInt(1, chiTietPhanQuyenEntity.IDPhanQuyen);
            cs.execute();
            return true;
        } catch (SQLException ex) {
            return false;
        }        
        finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
