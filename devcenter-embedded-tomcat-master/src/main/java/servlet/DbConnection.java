package servlet;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//CLass for Database Connection
public class DbConnection {
    public static Connection getConnection() {
        try {
            String dbURL = "jdbc:sqlserver://localhost:1433;databaseName=football_registration_form";
            String user = "sa";
            String pass = "lonuser@12345";
            return DriverManager.getConnection(dbURL, user, pass);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
