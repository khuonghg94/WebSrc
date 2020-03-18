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

public class BienNhanAdapter {

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

    public BienNhanAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet ChiTietBienNhan(double idBDK, Date ngayLap, double idBN) throws SQLException {
//        "BienNhan_NoiDungChiTiet"(idBDK bigint, ngayLap date, idBN bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BienNhan_NoiDungChiTiet\"(?,?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBDK, Types.BIGINT);
        cs.setObject(3, ngayLap, Types.DATE);
        cs.setObject(4, idBN, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String LapBienNhan(String listChiTiet, String noiDung, String maNV, Date ngayLap, double idBDK, String sumTT, String ndXNDeNghi, String ndTaiChinh) throws SQLException {
        try {
            openConnect();        
            //"BienNhan_Them"(listchitiet text, noidung text, manv text, ngaylap timestamp without time zone, idbdk bigint, tongtien text, ndXNDeNghi text, ndTaiChinh text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BienNhan_Them\"(?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, listChiTiet);
            cs.setString(3, noiDung);
            cs.setString(4, maNV);
            cs.setObject(5, ngayLap, Types.TIMESTAMP);
            cs.setObject(6, idBDK, Types.BIGINT);
            cs.setString(7, sumTT);
            cs.setString(8, ndXNDeNghi);
            cs.setString(9, ndTaiChinh);
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
                //System.out.println(e.getMessage()); 
                return ex.getMessage();
            }
        }
    }

    public ResultSet DanhSachBienNhan(String nameTab, Date tuNgayLap, Date denNgayLap) throws SQLException {
//        "BienNhan_DanhSachPhieu"(nameTab text, tuNgayLap date, denNgayLap date)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BienNhan_DanhSachPhieu\"(?,?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, nameTab);
        cs.setObject(3, tuNgayLap, Types.DATE);
        cs.setObject(4, denNgayLap, Types.DATE);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet ThongTinBienNhanTheoIDBN(double idBN) throws SQLException {
//        "BienNhan_ThongTinTheoIDBN"(idBN bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BienNhan_ThongTinTheoIDBN\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBN, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String CapNhatXNBienNhan(String tabName, String maNV, boolean isXacNhan, double idBN, String noiDung) throws SQLException {
        try {
            openConnect();

            //"BienNhan_CapNhatXacNhan"(tabname text, manv text, isxacnhan boolean, idbn bigint, noiDung text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BienNhan_CapNhatXacNhan\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tabName);
            cs.setString(3, maNV);
            cs.setBoolean(4, isXacNhan);
            cs.setObject(5, idBN, Types.BIGINT);
            cs.setString(6, noiDung);
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

    public String XoaBienNhan(double idBN) throws SQLException {
        try {
            openConnect();

            //"BienNhan_Xoa"(idBN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BienNhan_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idBN, Types.BIGINT);
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

    public String XoaChiTietKhoanThu(double idBN, double idKT) throws SQLException {
        try {
            openConnect();

            //"ChiTietBienNhan_Xoa"(idBN bigint, idKT bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietBienNhan_Xoa\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idBN, Types.BIGINT);
            cs.setObject(3, idKT, Types.BIGINT);
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

    public String TangSLKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        try {
            openConnect();

            //"ChiTietBienNhan_TangSLKhoanThu"(inTyLe numeric, inIDKT bigint, inIDBN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietBienNhan_TangSLKhoanThu\"(?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, tyLe, Types.NUMERIC);
            cs.setObject(3, idKT, Types.BIGINT);
            cs.setObject(4, idBN, Types.BIGINT);
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

    public String GiamSLKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        try {
            openConnect();

            //"ChiTietBienNhan_GiamSLKhoanThu"(inTyLe numeric, inIDKT bigint, inIDBN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietBienNhan_GiamSLKhoanThu\"(?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, tyLe, Types.NUMERIC);
            cs.setObject(3, idKT, Types.BIGINT);
            cs.setObject(4, idBN, Types.BIGINT);
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

    public String capNhatTyLeKhoanThu(double idBN, double idKT, double tyLe) throws SQLException {
        try {
            openConnect();

            //"ChiTietBienNhan_CapNhatTyLeKhoanThu"(inTyLe numeric, inIDKT bigint, inIDBN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietBienNhan_CapNhatTyLeKhoanThu\"(?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, tyLe, Types.NUMERIC);
            cs.setObject(3, idKT, Types.BIGINT);
            cs.setObject(4, idBN, Types.BIGINT);
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
