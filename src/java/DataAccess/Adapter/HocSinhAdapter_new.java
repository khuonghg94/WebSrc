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

public class HocSinhAdapter_new {
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

    public HocSinhAdapter_new() throws ClassNotFoundException, SQLException {
        con = ConnectionAdapter.connectDataBase();
    }
    public ResultSet DanhMucLoaiLop() throws SQLException {
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
    public ResultSet DanhMucHocKy() throws SQLException{
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"HocKy_DanhMucAll\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucMaLop(double idLL, double idLop, double idHK) throws SQLException{
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LopHoc_DanhMucMaLopTheoIDLL_IDHK_IDLOP\"(?,?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, idLL, Types.BIGINT);
        cs.setObject(3, idLop, Types.BIGINT);
        cs.setObject(4, idHK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet ThongTinLopHoc(double MaLop) throws SQLException{
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LopHoc_DanhMucTheoMaLop\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MaLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhSachHSTheoMaLop(double MaLop) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"HocSinh_DanhMucTheoMaLop\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MaLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet ThongTinChiTiet_HS(double MSHS) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"HocSinh_TheoMSHS\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MSHS, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhSachLopHoc_TheoMSHS(double MSHS) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"LopHoc_TheoMSHS\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MSHS, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet ThongTinChiTiet_DK(double IDBDK) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BangDangKy_TheoIDBDK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, IDBDK, Types.BIGINT);
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
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
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
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
                return ex.getMessage();
            }
        }
    }
    public String XoaLopHoc(double maLop) throws SQLException {
        try {
            openConnect();    
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"LopHoc_Xoa\"(?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setObject(2, maLop, Types.BIGINT);
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
            return e.getMessage();
        } finally {
            try {
                con.close();
            } catch (SQLException ex) {
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
    public ResultSet DanhMucNgayKham_TheoMSHS_MaLop(double MSHS, double MaLop) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_DanhMucTheoMSHS_MaLop\"(?,?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, MSHS, Types.BIGINT);
        cs.setObject(3, MaLop, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet ChiTietKham_TheoIDSTDSK(double IDSTDSK) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"ChiTietKham_TheoIDSTDSK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, IDSTDSK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet LoadBoPhanCoThe_All() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"BoPhanCoThe_DanhMuc\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
    public ResultSet DanhMucNhanVien() throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"NhanVien_DanhMuc\"()}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    } 
    public String ThemSoTheoDoiSucKhoe(String tenLop, double maLop, double MSHS, Date ngayKham, double canNang, double chieuCao, String ketLuan, String maNVLap, String maNVKetLuan, String listNDKham, String ghiChu) throws SQLException {
        try {
            openConnect();
            //"SoTheoDoiSucKhoe_ThemMoi"(tenLop text, maLop bigint, cMSHS bigint, ngayKham timestamp without time zone, canNang numeric, chieuCao numeric, ketLuan text, maNVLap text, maNVKL text, listndkham text, ghiChu text)
            con.setAutoCommit(true);
            cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_ThemMoi\"(?,?,?,?,?,?,?,?,?,?,?)}");
            cs.registerOutParameter(1, Types.VARCHAR);
            cs.setString(2, tenLop);
            cs.setObject(3, maLop, Types.BIGINT);
            cs.setObject(4, MSHS, Types.BIGINT);
            cs.setObject(5, ngayKham, Types.TIMESTAMP);
            cs.setObject(6, canNang, Types.NUMERIC);
            cs.setObject(7, chieuCao, Types.NUMERIC);
            cs.setString(8, ketLuan);
            cs.setString(9, maNVLap);
            cs.setString(10, maNVKetLuan);           
            cs.setString(11, listNDKham);
            cs.setString(12, ghiChu);
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
    public ResultSet ThongTinInSTDSK_TheoIDSTDSK(double IDSTDSK) throws SQLException {
        openConnect();
        con.setAutoCommit(false);
        cs = con.prepareCall("{ ? = call \"SoTheoDoiSucKhoe_TheoIDSSK\"(?)}");
        cs.registerOutParameter(1, Types.OTHER);
        cs.setObject(2, IDSTDSK, Types.BIGINT);
        cs.execute();
        ResultSet rs = (ResultSet) cs.getObject(1);
        con.close();
        return rs;
    }
}
