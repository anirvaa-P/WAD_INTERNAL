import java.io.*;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/CookieServlet")
public class CookieServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/plain");
        res.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter out = res.getWriter();

        String action = req.getParameter("action");

        if ("set".equals(action)) {
            // CREATE and SET a cookie
            String name = req.getParameter("name");
            Cookie cookie = new Cookie("username", name);
            cookie.setMaxAge(60 * 60);   // expires in 1 hour
            res.addCookie(cookie);
            out.print("Cookie set! Welcome " + name);

        } else if ("get".equals(action)) {
            // READ cookie from browser
            Cookie[] cookies = req.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("username".equals(c.getName())) {
                        out.print("Welcome back, " + c.getValue() + "!");
                        return;
                    }
                }
            }
            out.print("No cookie found. Please set your name first.");
        }
    }
}