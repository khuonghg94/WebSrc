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
import java.util.Date;
import java.lang.String;
/**
 *
 * @author Administrator
 */
public class PhanQuyenAdapter {
    Connection con;
    Statement stm;
    CallableStatement cs;
    
    private void openConnect() {
        try {
            if (con.isClosed()) {
                con = ConnectionAdapter.connectDataBase();
            }
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.println(ex.getMessage());
        }
    }

    public PhanQuyenAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }
    public ResultSet DanhMucPhong() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"Phong_DanhMucAll\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucNhaVien_TheoHoTen(String hoTen) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"NhanVien_DanhMucTheoHoTenNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, hoTen, Types.VARCHAR, 32);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucNhaVien_TheoHoTen_IDPhong(String hoTen, double IDPhong) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"NhanVien_DanhMucTheoHoTenNV_IDPhong\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, hoTen, Types.VARCHAR, 32);
        cs.setObject(3, IDPhong, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucFormChucNang() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"DMucForm_DanhMucAll\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucFormChucNang_ChuaCapQuyen(String MaNV) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"DMucForm_KhacMaNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MaNV, Types.VARCHAR, 8);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucFormChucNang_TheoMaNV(String MaNV) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"DMucForm_TheoMaNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MaNV, Types.VARCHAR, 8);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public String ThemPhanQuyen(String MaNV, Double IDForm) throws SQLException {
        try {
            openConnect();          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_themPhanQuyen\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, MaNV);
            cs.setObject(3, IDForm, Types.BIGINT);
            cs.execute();
            con.close();
            return (String) cs.getObject(1);
        } catch (SQLException e) {
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
            }
        }
    }
    public String XoaPhanQuyen(Double IDPhanQuyen) throws SQLException {
        try {
            openConnect();          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_xoaPhanQuyen\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, IDPhanQuyen, Types.BIGINT);
            cs.execute();
            con.close();
            return (String) cs.getObject(1);
        } catch (SQLException e) {
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
            }
        }
    }
    
}
