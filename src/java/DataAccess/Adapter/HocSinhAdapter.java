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

public class HocSinhAdapter {

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

    public HocSinhAdapter() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }

    public ResultSet DanhMucHocKy() throws SQLException {
//        "HocKy_DanhMucAll"()
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"HocKy_DanhMucAll\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhMucLoaiLop() throws SQLException {
//        "LoaiLop_DanhMuc"()
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LoaiLop_DanhMucAll\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhMucLopTheoIDLL(double idLL) throws SQLException {
//        "Lop_DanhMucTheoLoaiLopAll"(idLL bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"Lop_DanhMucTheoLoaiLopAll\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idLL, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String ThemLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu) throws SQLException {
        try {
            openConnect();

            //"LopHoc_Them"(tenLop text, idLop bigint, idHK bigint, ghiChu text)          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LopHoc_Them\"(?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenLop);
            cs.setObject(3, idLop, Types.BIGINT);
            cs.setObject(4, idHK, Types.BIGINT);
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
                //System.out.println(e.getMessage());
                return ex.getMessage();
            }
        }
    }

    public String listRoot(double idRoot) throws SQLException {
        try {
            openConnect();

            //"LopHoc_ListRoot"(idroot bigint, strbackspace text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LopHoc_ListRoot\"(?,?)}");
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
                //System.out.println(e.getMessage());
            }
        }
    }

    public ResultSet ThongTinLopHocTheoMaLop(double maLop) throws SQLException {
//        "LopHoc_DanhMucTheoMaLop"(maLop bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LopHoc_ThongTinTheoMaLop\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, maLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String XoaLopHoc(double maLop) throws SQLException {
        try {
            openConnect();

            //"LopHoc_Xoa"(maLop bigint)     
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LopHoc_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
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

    public String SuaLopHoc(String tenLop, Double idLop, Double idHK, String ghiChu, double maLop) throws SQLException {
        try {
            openConnect();

            //"LopHoc_Sua"(tenlop text, idlop bigint, idhk bigint, ghichu text, malop bigint)          
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LopHoc_Sua\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenLop);
            cs.setObject(3, idLop, Types.BIGINT);
            cs.setObject(4, idHK, Types.BIGINT);
            cs.setString(5, ghiChu);
            cs.setObject(6, maLop, Types.BIGINT);
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

    public ResultSet DanhSachHocSinhDangKyTheoMaLop(double maLop) throws SQLException {
//        "BangDangKy_DanhSachHocSinh"(maLop bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BangDangKy_DanhSachHocSinh\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, maLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet ThongTinHocSinhDangKyTheoIDBDK(double idBDK) throws SQLException {
//        "BangDangKy_ThongTinHocSinhTheoIDBDK"(idBDK bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BangDangKy_ThongTinHocSinhTheoIDBDK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBDK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhSachSoLienLacTheoIDBDK(double idBDK) throws SQLException {
//        "SoLienLac_DanhSachTheoIDBDK"(idBDK bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"SoLienLac_DanhSachTheoIDBDK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBDK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String ThemSoLienLac(int inThang, double canNang, double chieuCao, String ghiNhanGV, String ghiNhanPH, String maNV, Date ngayGN, double idBDK) throws SQLException {
        try {
            openConnect();

            //"SoLienLac_Them"(inThang int, canNang numeric, chieuCao numeric, ghiNhanGV text, ghiNhanPH text, maNV text, ngayGN timestamp without time zone, idBDK bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoLienLac_Them\"(?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, inThang, Types.SMALLINT);
            cs.setObject(3, canNang, Types.NUMERIC);
            cs.setObject(4, chieuCao, Types.NUMERIC);
            cs.setString(5, ghiNhanGV);
            cs.setString(6, ghiNhanPH);
            cs.setString(7, maNV);
            cs.setObject(8, ngayGN, Types.TIMESTAMP);
            cs.setObject(9, idBDK, Types.BIGINT);
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

    public String SuaSoLienLac(int inThang, double canNang, double chieuCao, String ghiNhanGV, String ghiNhanPH, String maNV, Date ngayGN, double idBDK, double idSLL) throws SQLException {
        try {
            openConnect();

            //"SoLienLac_Sua"(inThang int, canNang numeric, chieuCao numeric, ghiNhanGV text, ghiNhanPH text, maNV text, ngayGN timestamp without time zone, idBDK bigint, idSLL bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoLienLac_Sua\"(?,?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, inThang, Types.SMALLINT);
            cs.setObject(3, canNang, Types.NUMERIC);
            cs.setObject(4, chieuCao, Types.NUMERIC);
            cs.setString(5, ghiNhanGV);
            cs.setString(6, ghiNhanPH);
            cs.setString(7, maNV);
            cs.setObject(8, ngayGN, Types.TIMESTAMP);
            cs.setObject(9, idBDK, Types.BIGINT);
            cs.setObject(10, idSLL, Types.BIGINT);
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

    public String XoaSoLienLac(double idSLL) throws SQLException {
        try {
            openConnect();

            //"SoLienLac_Xoa"(idSLL bigint)     
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoLienLac_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idSLL, Types.BIGINT);
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

    public ResultSet DanhSachDiemDanhTheoIDBDK(double idBDK) throws SQLException {
//        "XinPhepNghi_DanhSachTheoIDBDK"(idBDK bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"XinPhepNghi_DanhSachTheoIDBDK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBDK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String ThemDiemDanh(Date ngayBD, Date ngayKT, Date ngayGN, String ghiChu, String maNV, boolean isPhep, double idBDK) throws SQLException {
        try {
            openConnect();

            //"XinPhepNghi_Them"(ngayBD timestamp without time zone, ngayKT timestamp without time zone, ngayGN timestamp without time zone, coPhep boolean, ghiChu text, maNV text, idBDK bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"XinPhepNghi_Them\"(?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, ngayBD, Types.TIMESTAMP);
            cs.setObject(3, ngayKT, Types.TIMESTAMP);
            cs.setObject(4, ngayGN, Types.TIMESTAMP);
            cs.setObject(5, isPhep, Types.BOOLEAN);
            cs.setString(6, ghiChu);
            cs.setString(7, maNV);
            cs.setObject(8, idBDK, Types.BIGINT);
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

    public String SuaDiemDanh(Date ngayBD, Date ngayKT, Date ngayGN, String ghiChu, String maNV, boolean isPhep, double idBDK, double idXPN) throws SQLException {
        try {
            openConnect();

            //"XinPhepNghi_Sua"(ngayBD timestamp without time zone, ngayKT timestamp without time zone, ngayGN timestamp without time zone, coPhep boolean, ghiChu text, maNV text, idBDK bigint, idXPN bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"XinPhepNghi_Sua\"(?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, ngayBD, Types.TIMESTAMP);
            cs.setObject(3, ngayKT, Types.TIMESTAMP);
            cs.setObject(4, ngayGN, Types.TIMESTAMP);
            cs.setObject(5, isPhep, Types.BOOLEAN);
            cs.setString(6, ghiChu);
            cs.setString(7, maNV);
            cs.setObject(8, idBDK, Types.BIGINT);
            cs.setObject(9, idXPN, Types.BIGINT);
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

    public String XoaDiemDanh(double idXPN) throws SQLException {
        try {
            openConnect();

            //"XinPhepNghi_Xoa"(idXNP bigint)     
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"XinPhepNghi_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idXPN, Types.BIGINT);
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

    public ResultSet ChiTietKhamTheoIDSTDSK(double idSTDSK) throws SQLException {
//        "ChiTietKham_DanhMucTheoIDSTDSK"(idSTDSK bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietKham_DanhMucTheoIDSTDSK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idSTDSK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhMucKhamSucKhoeTheoIDBDK(double idBDK) throws SQLException {
//        "SoTheoDoiSucKhoe_DanhMucTheoIDBDK"(idBDK bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_DanhMucTheoIDBDK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idBDK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String ThemSoTheoDoiSucKhoe(double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, Date ngayLap, double idBDK, String listNDKham) throws SQLException {
        try {
            openConnect();

            //"SoTheoDoiSucKhoe_Them"(canNang numeric, chieuCao numeric, ketLuan text, maNVLap text, maNVKetLuan text, ngayLap timestamp without time zone, idBDK bigint, listNDKham text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_Them\"(?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, canNang, Types.NUMERIC);
            cs.setObject(3, chieuCao, Types.NUMERIC);
            cs.setString(4, ketLuan);
            cs.setString(5, maNVLap);
            cs.setString(6, maNVKetLuan);
            cs.setObject(7, ngayLap, Types.TIMESTAMP);
            cs.setObject(8, idBDK, Types.BIGINT);
            cs.setString(9, listNDKham);
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
                //System.out.println(e.getMessage()); idSTDSK
                return ex.getMessage();
            }
        }
    }

    public String SuaSoTheoDoiSucKhoe(double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, Date ngayLap, double idBDK, String listNDKham, double idSTDSK) throws SQLException {
        try {
            openConnect();

            //"SoTheoDoiSucKhoe_Sua"(canNang numeric, chieuCao numeric, ketLuan text, maNVLap text, maNVKetLuan text, ngayLap timestamp without time zone, idBDK bigint, listNDKham text, idSTDSK bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_Sua\"(?,?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, canNang, Types.NUMERIC);
            cs.setObject(3, chieuCao, Types.NUMERIC);
            cs.setString(4, ketLuan);
            cs.setString(5, maNVLap);
            cs.setString(6, maNVKetLuan);
            cs.setObject(7, ngayLap, Types.TIMESTAMP);
            cs.setObject(8, idBDK, Types.BIGINT);
            cs.setString(9, listNDKham);
            cs.setObject(10, idSTDSK, Types.BIGINT);
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

    public String XoaKhamSucKhoe(double idSTDSK) throws SQLException {
        try {
            openConnect();

            //"SoTheoDoiSucKhoe_Xoa"(idSTDSK bigint)    
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idSTDSK, Types.BIGINT);
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

    public ResultSet DanhMucBangDangKyTheoID(double inID, boolean isHocSinh) throws SQLException {
//        "BangDangKy_DanhMucTheoID"(inID bigint, isHocSinh boolean)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BangDangKy_DanhMucTheoID\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, inID, Types.BIGINT);
        cs.setObject(3, isHocSinh, Types.BOOLEAN);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhMucLopHocTheoIDLopIDHK(double idHK, double idLop) throws SQLException {
//        "LopHoc_DanhMucTheoIDLopIDHK"(idHK bigint, idLop bigint)
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LopHoc_DanhMucTheoIDLopIDHK\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idHK, Types.BIGINT);
        cs.setObject(3, idLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String ThemHocSinhDangKy(double maLop, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        try {
            openConnect();

//  "BangDangKy_ThemHocSinh"(maLop bigint, ngayBD timestamp without time zone, ngayKT timestamp without time zone, ngaySinh date, ghiChu text, 
//            hoTen text, tenThanMat text, quocTich text, diaChi text, ghiChuHS text, gioiTinh boolean)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BangDangKy_ThemHocSinh\"(?,?,?,?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
            cs.setObject(5, ngaySinh, Types.DATE);
            cs.setString(6, ghiChu);
            cs.setString(7, hoTen);
            cs.setString(8, tenThanMat);
            cs.setString(9, quocTich);
            cs.setString(10, diaChi);
            cs.setString(11, ghiChuHS);
            cs.setObject(12, gioiTinh, Types.BOOLEAN);
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

    public String SuaHocSinhDangKy(double idBDK, Date ngayBD, Date ngayKT, Date ngaySinh, String ghiChu, String hoTen, String tenThanMat, String quocTich,
            String diaChi, String ghiChuHS, boolean gioiTinh) throws SQLException {
        try {
            openConnect();

//  "BangDangKy_SuaHocSinh"(idBDK bigint, ngaybd timestamp without time zone, ngaykt timestamp without time zone, ngaysinh date, ghichu text, hoten text, tenthanmat text, 
//            quoctich text, diachi text, ghichuhs text, gioitinh boolean)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BangDangKy_SuaHocSinh\"(?,?,?,?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idBDK, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
            cs.setObject(5, ngaySinh, Types.DATE);
            cs.setString(6, ghiChu);
            cs.setString(7, hoTen);
            cs.setString(8, tenThanMat);
            cs.setString(9, quocTich);
            cs.setString(10, diaChi);
            cs.setString(11, ghiChuHS);
            cs.setObject(12, gioiTinh, Types.BOOLEAN);
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

    public String XoaBangDangKy(double idBDK, boolean isHocSinh) throws SQLException {
        try {
            openConnect();

            //"BangDangKy_Xoa"(idBDK bigint, isHocSinh boolean)   
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BangDangKy_Xoa\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idBDK, Types.BIGINT);
            cs.setObject(3, isHocSinh, Types.BOOLEAN);
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

    public String ThemChuyenLopDangKy(double maLop, Date ngayBD, Date ngayKT, String ghiChu, double msHS) throws SQLException {
        try {
            openConnect();

            //"BangDangKy_ChuyenLop"(malop bigint, ngaybd timestamp without time zone, ngaykt timestamp without time zone, ghichu text, mshs bigint)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BangDangKy_ThemChuyenLop\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
            cs.setString(5, ghiChu);
            cs.setObject(6, msHS, Types.BIGINT);
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

    public String SuaChuyenLopDangKy(double idBDK, Date ngayBD, Date ngayKT, String ghiChu) throws SQLException {
        try {
            openConnect();

            //"BangDangKy_SuaChuyenLop"(idBDK bigint, ngaybd timestamp without time zone, ngaykt timestamp without time zone, ghichu text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"BangDangKy_SuaChuyenLop\"(?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, idBDK, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
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
                //System.out.println(e.getMessage()); 
                return ex.getMessage();
            }
        }
    }

    public ResultSet DanhSachPhuHuynTheoMSHS(double msHS) throws SQLException {
        //  "CoQuanHe_DanhSachPhuHuynTheoMSHS"(msHS bigint)        
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"CoQuanHe_DanhSachPhuHuynTheoMSHS\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, msHS, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet ThongTinNhanVienTheoMaNV(String maNV) throws SQLException {
        //  "NhanVien_ThongTinNhanVienTheoMaNV"(maNV text)        
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"NhanVien_ThongTinNhanVienTheoMaNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, maNV);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public ResultSet DanhSachChuNhiemTheoMaNV(String maNV) throws SQLException {
        //  "ChiTietChuNhiem_DanhSachChuNhiemTheoMaNV"(maNV text)   
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietChuNhiem_DanhSachChuNhiemTheoMaNV\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setString(2, maNV);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }

    public String XoaChuNhiem(double maLop, String maNV) throws SQLException {
        try {
            openConnect();

            //  "ChiTietChuNhiem_Xoa"(maLop bigint, maNV text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietChuNhiem_Xoa\"(?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
            cs.setString(3, maNV);
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

    public String ThemChuNhiem(double maLop, Date ngayBD, Date ngayKT, String ghiChu, String maNV) throws SQLException {
        try {
            openConnect();

            //  "ChiTietChuNhiem_Them"(maLop bigint, ngayBD timestamp without time zone, ngayKT timestamp without time zone, ghiChu text, maNV text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietChuNhiem_Them\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
            cs.setString(5, ghiChu);
            cs.setString(6, maNV);
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

    public String SuaChuNhiem(double maLop, Date ngayBD, Date ngayKT, String ghiChu, String maNV) throws SQLException {
        try {
            openConnect();

            //  "ChiTietChuNhiem_Sua"(malop bigint, ngaybd timestamp without time zone, ngaykt timestamp without time zone, ghichu text, manv text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"ChiTietChuNhiem_Sua\"(?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
            cs.setObject(3, ngayBD, Types.TIMESTAMP);
            cs.setObject(4, ngayKT, Types.TIMESTAMP);
            cs.setString(5, ghiChu);
            cs.setString(6, maNV);
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
}
