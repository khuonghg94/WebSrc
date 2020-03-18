/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DataAccess.Adapter;

/**
 *
 * @author manhgia
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionAdapter {

    public static String serverIP = "192.168.1.188";
    public static String dataName = "QLMamNon";
    public static String userName = "ttcnpmvtt";
    public static String passWord = "cvGtr1vt2";

    public static Connection connectDataBase() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        Connection con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/QLMamNon", "postgres", "1234");   
                
//        Connection con = DriverManager.getConnection("jdbc:postgresql://192.168.1.17:5432/" + dataName, userName, passWord);
        return con;
    }
}
