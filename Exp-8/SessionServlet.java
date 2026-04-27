import java.io.*;
import java.util.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;
@WebServlet("/SessionServlet")
public class SessionServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/plain");
        res.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter out = res.getWriter();

        // GET or CREATE session
        HttpSession session = req.getSession(true);
        String action = req.getParameter("action");

        if ("add".equals(action)) {
            // ADD item to session
            String item = req.getParameter("item");
            List<String> items = (List<String>) session.getAttribute("items");
            if (items == null) {
                items = new ArrayList<>();
            }
            items.add(item);
            session.setAttribute("items", items);
            out.print(item + " added! Session ID: " + session.getId());

        } else if ("get".equals(action)) {
            // VIEW all items in session
            List<String> items = (List<String>) session.getAttribute("items");
            if (items == null || items.isEmpty()) {
                out.print("Session is empty.");
            } else {
                out.print("Items in session: " + items.toString());
            }

        } else if ("clear".equals(action)) {
            // DESTROY session
            session.invalidate();
            out.print("Session cleared!");
        }
    }
}