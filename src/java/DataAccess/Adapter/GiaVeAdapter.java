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

/**
 *
 * @author Administrator
 */
public class GiaVeAdapter {

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

    public GiaVeAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet DanhMucTheoIDVe(double idVe) throws SQLException {
//        "Gia_DanhMucTheoIDVe"(idGiaVe bigint)

        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"Gia_DanhMucTheoIDVe\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idVe, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String Them(Date ngayBD, Date ngayKT, double donGia, double idKT) throws SQLException {
        try {
            openConnect();

            //"Gia_Them"(ngayBD date, ngayKT date, donGia bigint, idLoaiVe bigint)       
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"Gia_Them\"(?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, ngayBD, Types.DATE);
            cs.setObject(3, ngayKT, Types.DATE);
            cs.setObject(4, donGia, Types.BIGINT);
            cs.setObject(5, idKT, Types.BIGINT);
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
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public String Xoa(Double idGiaLoaiVe) throws SQLException {
        try {
            openConnect();

            //"Gia_Xoa"(idGiaLoaiVe bigint)          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"Gia_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idGiaLoaiVe, Types.BIGINT);
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
                //Logger.getLogger(TinhTPAdapter.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
