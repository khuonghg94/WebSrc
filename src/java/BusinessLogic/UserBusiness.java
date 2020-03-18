/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package BusinessLogic;

import DataAccess.Adapter.UserAdapter;
import DataAccess.Entity.UserEntity;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Administrator
 */
public class UserBusiness {
        public UserEntity userEntity = new UserEntity();
    
    UserAdapter userAdapter;

    public UserBusiness() throws ClassNotFoundException, SQLException {
        this.userAdapter = new UserAdapter();
    }

    public ResultSet DanhMuc() throws SQLException {
        return userAdapter.getData();
    }

    public ResultSet TimTheoMaNV(String _maNV) throws SQLException {
        return userAdapter.getData_ByMaNV(_maNV);
    }

    public ResultSet TimTheoMaKhoaMaNV(int _maKhoa, String _maNV) throws SQLException {
        return userAdapter.getData_ByMaKhoaMaNV(_maKhoa, _maNV);
    }
        
    //by Sol
    public ResultSet KiemTraDangNhap(String userName, String passWord) throws SQLException {
        return userAdapter.KiemTraDangNhap(userName, passWord);
    }

    public String Them() throws SQLException {
        return userAdapter.insert(userEntity);
    }

    public boolean Xoa() {
        return userAdapter.delete(userEntity);
    }

    public boolean Sua() throws SQLException {
        return userAdapter.update(userEntity);
    }
    
    public String SuaPass(String _username, String _oldpass, String _newpass) throws SQLException {
        return userAdapter.updatePass(_username,_oldpass,_newpass);
    }
}
