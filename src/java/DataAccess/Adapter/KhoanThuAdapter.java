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
public class KhoanThuAdapter {

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

    public KhoanThuAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet DanhMuc() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"KhoanThu_DanhMuc\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String Them(String tenKhoanThu, Double soLan, boolean batBuoc, String ghiChu) throws SQLException {
        try {
            openConnect();

            //"KhoanThu_Them"(tenKT text, soLan bigint, batBuoc boolean, ghiChu text)          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"KhoanThu_Them\"(?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenKhoanThu);
            cs.setObject(3, soLan, Types.BIGINT);
            cs.setObject(4, batBuoc, Types.BOOLEAN);
            cs.setString(5, ghiChu);
            cs.execute();
            con.close();

            return (String) cs.getObject(1);
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public String Sua(String tenKhoanThu, Double soLan, boolean batBuoc, String ghiChu, Double idKT) throws SQLException {
        try {
            openConnect();

            //"KhoanThu_Sua"(tenKT text, soLan bigint, batBuoc boolean, ghiChu text, idKT bigint)       
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"KhoanThu_Sua\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenKhoanThu);
            cs.setObject(3, soLan, Types.BIGINT);
            cs.setObject(4, batBuoc, Types.BOOLEAN);
            cs.setString(5, ghiChu);
            cs.setObject(6, idKT, Types.BIGINT);
            cs.execute();
            con.close();

            return (String) cs.getObject(1);
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public String Xoa(Double idKhoanThu) throws SQLException {
        try {
            openConnect();

            //"KhoanThu_Xoa"(idlv bigint)          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"KhoanThu_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idKhoanThu, Types.BIGINT);
            cs.execute();
            con.close();

            return (String) cs.getObject(1);
        } catch (SQLException e) {
            //System.out.println(e.getMessage());
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public ResultSet DanhMucVeOnline() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"KhoanThu_DanhMucVeOnline\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
}
