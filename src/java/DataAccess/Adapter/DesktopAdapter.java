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
 * @author Sol
 */
public class DesktopAdapter {

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

    public DesktopAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet getDesktop(String userName) throws SQLException {
        //"ChiTietPhanQuyen_DanhSachTheoUserName"(userName text)        

        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_DanhSachTheoUserName\"(?)}");
        cs.setString(2, userName);
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String getMenu(String userName, String strBackspace, double idRoot) throws SQLException {
        try {
            openConnect();

            //"LoaiFormChucNang_ListRoot"(idRoot bigint, strBackspace text, userName text)  
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_ListRoot\"(?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idRoot, Types.BIGINT);
            cs.setString(3, "");
            cs.setString(4, userName);
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

    public String listRoot(double idRoot) throws SQLException {
        try {
            openConnect();

            //"LoaiFormChucNang_ListRoot"(idroot bigint, strbackspace text) 
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_ListRoot\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idRoot, Types.BIGINT);
            cs.setString(3, "");
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

    public String xoaChucNang(int idForm) throws SQLException {
        try {
            openConnect();

            //"DMFormChucNang_XoaChucNang"(idForm integer)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"DMFormChucNang_XoaChucNang\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idForm, Types.SMALLINT);
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

    public ResultSet timChucNang(double idLCN, String txtFind) throws SQLException {
        //"DMFormChucNang_TimDanhSachChucNang"(idLCN bigint, txtFind text)    

        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"DMFormChucNang_TimDanhSachChucNang\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idLCN, Types.BIGINT);
        cs.setString(3, txtFind);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String suaChucNang(int idForm, String tenForm, String chucNang, String tenThuMuc, String iCon, boolean isDaKhoa, boolean isDesktop, double idLCN) throws SQLException {
        try {
            openConnect();

            //"DMFormChucNang_SuaChucNang"(idForm smallint, tenForm text, chucNang text, tenThuMuc text, iCon text, isDaKhoa boolean, isDesktop boolean, idLCN bigint)    
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"DMFormChucNang_SuaChucNang\"(?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idForm, Types.SMALLINT);
            cs.setString(3, tenForm);
            cs.setString(4, chucNang);
            cs.setString(5, tenThuMuc);
            cs.setString(6, iCon);
            cs.setObject(7, isDaKhoa, Types.BOOLEAN);
            cs.setObject(8, isDesktop, Types.BOOLEAN);
            cs.setObject(9, idLCN, Types.BIGINT);
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

    public String themChucNang(String tenForm, String chucNang, String tenThuMuc, String iCon, boolean isDaKhoa, boolean isDesktop, double idLCN) throws SQLException {
        try {
            openConnect();

            //"DMFormChucNang_ThemChucNang"(tenForm text, chucNang text, tenThuMuc text, iCon text, isDaKhoa boolean, isDesktop boolean, idLCN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"DMFormChucNang_ThemChucNang\"(?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenForm);
            cs.setString(3, chucNang);
            cs.setString(4, tenThuMuc);
            cs.setString(5, iCon);
            cs.setObject(6, isDaKhoa, Types.BOOLEAN);
            cs.setObject(7, isDesktop, Types.BOOLEAN);
            cs.setObject(8, idLCN, Types.BIGINT);
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

    public String timThuMucChucNang(String tenThuMuc, String strBackspace, double idRoot) throws SQLException {
        try {
            openConnect();
            //"LoaiFormChucNang_TimThuMucChucNang"(idroot bigint, strbackspace text, tenThuMuc text) 
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_TimThuMucChucNang\"(?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idRoot, Types.BIGINT);
            cs.setString(3, strBackspace);
            cs.setString(4, tenThuMuc);
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

    public ResultSet getThongTinChucNang(int idFrom) throws SQLException {
        //"DMFormChucNang_getThongTinChucNang"(idFrom int)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"DMFormChucNang_getThongTinChucNang\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idFrom, Types.INTEGER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet getThongTinThuMuc(double idLCN) throws SQLException {
        //"LoaiFormChucNang_getThongTinThuMuc"(idLCN bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_getThongTinThuMuc\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idLCN, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String xoaThuMuc(double idLCN) throws SQLException {
        try {
            openConnect();
            //"LoaiFormChucNang_xoaThuMuc"(idLCN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_xoaThuMuc\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idLCN, Types.BIGINT);
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

    public String suaThuMuc(double idF, String tenLoai, String ghiChu, String iCon, double idLCN) throws SQLException {
        try {
            openConnect();

            //"LoaiFormChucNang_suaThuMuc"(idF bigint, tenLoai text, ghiChu text, iCon text, idLCN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_suaThuMuc\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idF, Types.BIGINT);
            cs.setString(3, tenLoai);
            cs.setString(4, ghiChu);
            cs.setString(5, iCon);
            cs.setObject(6, idLCN, Types.BIGINT);
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

    public String themThuMuc(double idF, String tenLoai, String ghiChu, String iCon) throws SQLException {
        try {
            openConnect();

            //"LoaiFormChucNang_themThuMuc"(idF bigint, tenLoai text, ghiChu text, iCon text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LoaiFormChucNang_themThuMuc\"(?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idF, Types.BIGINT);
            cs.setString(3, tenLoai);
            cs.setString(4, ghiChu);
            cs.setString(5, iCon);
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

    public String danhSachCayNhanVien() throws SQLException {
        try {
            openConnect();

            //"DonVi_DanhSachCayNhanVien"()
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"DonVi_DanhSachCayNhanVien\"()}");
            cs.registerOutParameter(1, Types.VARCHAR);
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

    public String timCayNhanVien(String tenNhap) throws SQLException {
        try {
            openConnect();

            //"DonVi_TimCayNhanVien"(tenNhap text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"DonVi_TimCayNhanVien\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenNhap);
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

    public ResultSet danhSachPhanQuyenTheoMaNV(String maNV, String txtFind) throws SQLException {
        //"ChiTietPhanQuyen_DanhSachTheoMaNV"(manv text, txtFind text)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_DanhSachTheoMaNV\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, maNV);
        cs.setString(3, txtFind);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet thongTinNhanVien(String maNV, int maDV) throws SQLException {
        //"User_TimTheoMaNV_MaDV"(maNV text, maDV int)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"User_TimTheoMaNV_MaDV\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, maNV);
        cs.setObject(3, maDV, Types.INTEGER);
        cs.execute();

        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String xoaPhanQuyen(int idPQ) throws SQLException {
        try {
            openConnect();

            //"ChiTietPhanQuyen_xoaPhanQuyen"(idPQ smallint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_xoaPhanQuyen\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idPQ, Types.SMALLINT);
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

    public String themPhanQuyen(int idUser, int idForm) throws SQLException {
        try {
            openConnect();

            //"ChiTietPhanQuyen_themPhanQuyen"(idUser int, idForm int)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietPhanQuyen_themPhanQuyen\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idUser, Types.INTEGER);
            cs.setObject(3, idForm, Types.INTEGER);
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
}
