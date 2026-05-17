import java.sql.*;

public class DBConnect {
    public static void main(String[] args) {
        try {
            String url = "jdbc:mysql://localhost:3307/student_db";
            String user = "root";
            String password = "root";

            Connection con = DriverManager.getConnection(url, user, password);
            System.out.println("Connected!");

            Statement stmt = con.createStatement();

            // INSERT DATA
            stmt.executeUpdate("INSERT INTO students VALUES (2, 'Indu', 85)");
            System.out.println("Inserted successfully");

            // FETCH DATA
            ResultSet rs = stmt.executeQuery("SELECT * FROM students");

            while (rs.next()) {
                System.out.println(
                    rs.getInt(1) + " " +
                    rs.getString(2) + " " +
                    rs.getInt(3)
                );
            }

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
