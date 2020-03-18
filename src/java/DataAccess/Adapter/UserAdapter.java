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
public class UserAdapter {

    Connection con;
    Statement stm;
    CallableStatement cs;

    private void openConnect() {
        try {
            if (con.isClosed()) {
                con = ConnectionAdapter.connectDataBase();
            }
        } catch (ClassNotFoundException | SQLException ex) {
            //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public UserAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet getData() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"User_DanhMuc\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet getData_ByMaNV(String _maNV) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"User_TimTheoMaNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, _maNV);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet getData_ByMaKhoaMaNV(Integer _maKhoa, String _maNV) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"User_TimTheoMaKhoaMaNV\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setInt(2, _maKhoa);
        cs.setString(3, _maNV);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    //by Sol
    public ResultSet KiemTraDangNhap(String userName, String passWord) throws SQLException {
        //"User_KiemTraDangNhap"(cusername text, cpassword text)        
        openConnect();

        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"User_KiemTraDangNhap\"(?,?)}");
        cs.setString(2, userName);
        cs.setString(3, passWord);
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String insert(DataAccess.Entity.UserEntity userEntity) throws SQLException {
        try {

        openConnect();
        con.setAutoCommit(true);
        cs = con.prepareCall("{?=call \"User_Them\"(?,?,?,?)}");
        cs.registerOutParameter(1, Types.LONGVARCHAR);
        cs.setString(2, userEntity.userName);
        cs.setString(3, userEntity.passWord);
        cs.setString(4, userEntity.maNV);
        cs.setInt(5, userEntity.maKhoa);
        cs.execute();
        con.close();
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

    public boolean update(DataAccess.Entity.UserEntity userEntity) throws SQLException {
        try {
            openConnect();
            con.setAutoCommit(true);
            cs = con.prepareCall("{call \"User_Sua\"(?,?,?,?,?)}");
            cs.setInt(1, userEntity.iDUser);
            cs.setString(2, userEntity.userName);
            cs.setString(3, userEntity.passWord);
            cs.setString(4, userEntity.maNV);
            cs.setInt(5, userEntity.maKhoa);
            cs.execute();
            return true;
        } catch (SQLException ex) {
            return false;
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public String updatePass(String _userName, String _oldPass, String _newPass) throws SQLException {
        try {
            openConnect();
            con.setAutoCommit(true);
            cs = con.prepareCall("{?=call \"User_SuaPass\"(?,?,?)}");
            cs.registerOutParameter(1, Types.LONGVARCHAR);
            cs.setString(2, _userName);
            cs.setString(3, _oldPass);
            cs.setString(4, _newPass);
            cs.execute();
            return cs.getString(1);
        } catch (SQLException ex) {
            return ex.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public boolean delete(DataAccess.Entity.UserEntity userEntity) {
        try {
            openConnect();
            con.setAutoCommit(true);
            cs = con.prepareCall("{call \"User_Xoa\"(?)}");
            cs.setInt(1, userEntity.iDUser);
            cs.execute();
            return true;
        } catch (SQLException ex) {
            return false;
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

}
