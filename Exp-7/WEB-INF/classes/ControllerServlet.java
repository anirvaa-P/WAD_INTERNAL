import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class ControllerServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3307/student_db",
                "root",
                "rekhahoney"
            );

            if (action.equals("register")) {

                String name = request.getParameter("name");
                int marks = Integer.parseInt(request.getParameter("marks"));

                PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO students(name, marks) VALUES (?, ?)"
                );

                ps.setString(1, name);
                ps.setInt(2, marks);

                int result = ps.executeUpdate();

                if (result > 0) {
                    out.println("<h3>Registration Successful</h3>");
                } else {
                    out.println("<h3>Error</h3>");
                }
            }

            con.close();

        } catch (Exception e) {
            out.println(e);
        }
    }
}