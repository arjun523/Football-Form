package servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import java.sql.*;

@WebServlet(
        name = "MyServlet",
        urlPatterns = {"/form"}
)
@MultipartConfig
public class Form extends HttpServlet {

//    PUT method for data updation
    protected  void doPut(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } finally {
            reader.close();
        }

        Gson gson = new Gson();
        Player player = gson.fromJson(sb.toString(), Player.class);
        try {
            Connection conn = DbConnection.getConnection();
            String qr = "SELECT * FROM Registration_data WHERE userid = ? ";
            PreparedStatement preparedStmt = conn.prepareStatement(qr);
            preparedStmt.setString(1, player.getUsername());

            ResultSet rs = preparedStmt.executeQuery();
            if (rs.next()) {
                String q = "UPDATE Registration_data SET first_name = ?, last_name = ?, pcode=?, phone= ?, email_id= ?, age_group= ?, desired_team =? , desired_position = ? ,user_address=?, pincode=?, country=?,state=?,city=? WHERE userid = ?;";
                PreparedStatement preparedStatement = conn.prepareStatement(q);
                preparedStatement.setString(1, player.getFirstname());
                preparedStatement.setString(2, player.getLastname());
                preparedStatement.setString(3, player.getPcode());
                preparedStatement.setLong(4, player.getPhone());
                preparedStatement.setString(5, player.getEmail());
                preparedStatement.setString(6, player.getAgegroup());
                preparedStatement.setString(7, player.getDesiredteam());
                preparedStatement.setString(8, player.getDesired_positions());
                preparedStatement.setString(9, player.getAddress());
                preparedStatement.setInt(10, player.getPin());
                preparedStatement.setString(11, player.getCountry());
                preparedStatement.setString(12, player.getState());
                preparedStatement.setString(13, player.getCity());
                preparedStatement.setString(14, player.getUsername());

                preparedStatement.executeUpdate();
                //yes
                JsonObject jsonData = new JsonObject();
                jsonData.addProperty("message", "User Data Updated !!!");
                jsonData.addProperty("status", 200);
                response.setStatus(200);
                response.setContentType("application/json");
                PrintWriter pw = response.getWriter();
                pw.print(player);
                pw.flush();
            } else{
                JsonObject jsonData = new JsonObject();
                jsonData.addProperty("message", "User not found!");
                jsonData.addProperty("status", 404);
                response.setStatus(404);
                response.setContentType("application/json");
                PrintWriter pw = response.getWriter();
                pw.print(jsonData);
                pw.flush();
            }
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
    }
//    GET method for data retrieval
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String username = request.getParameter("username");
        try {
            Connection conn = DbConnection.getConnection();
            String q = "SELECT * FROM Registration_data WHERE userid =  ? ";
            PreparedStatement preparedStatement = conn.prepareStatement(q);
            preparedStatement.setString(1, username);

            ResultSet rs = preparedStatement.executeQuery();
            if (rs.next()) {
                Player p = new Player(rs.getString("userid"), rs.getString("first_name"), rs.getString("last_name"),rs.getString("pcode"), rs.getLong("phone"), rs.getString("email_id"), rs.getString("age_group"), rs.getString("desired_team"), rs.getString("desired_position"), rs.getString("user_address"), rs.getInt("pincode"), rs.getString("country"), rs.getString("state"), rs.getString("city"));
                Gson gson = new Gson();
                String new_player = gson.toJson(p, Player.class);

                response.setContentType("application/json");
                PrintWriter pw = response.getWriter();
                pw.print(new_player);
                pw.flush();
            } else {
                JsonObject jsonData = new JsonObject();
                jsonData.addProperty("message", "User not found!");
                jsonData.addProperty("status", 404);
                response.setStatus(404);
                response.setContentType("application/json");
                PrintWriter pw = response.getWriter();
                pw.print(jsonData);
                pw.flush();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public boolean validatePlayer(){

        if(player.getUsername().isEmpty() || player.getFirstname().isEmpty() || player.getLastname().isEmpty() || player.getPcode().isEmpty() || player.getPhone().isEmpty() || player.getEmail().isEmpty() || player.getAgegroup().isEmpty() || player.getDesiredteam().isEmpty() || player.getDesired_positions().isEmpty() || player.getAddress().isEmpty() || player.getPin().isEmpty() || player.getCountry().isEmpty() || player.getState().isEmpty() || player.getCity().isEmpty(){
            return false;
        }
        return true;
    }

//    POST method for data insertion
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        try {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
        } finally {
            reader.close();
        }

        Gson gson = new Gson();
        Player player = gson.fromJson(String.valueOf(sb), Player.class);

        Connection conn = null;
        try {
            conn = DbConnection.getConnection();
            if (conn != null) {

                String qr = "SELECT * FROM Registration_data WHERE userid = ?";
                PreparedStatement preparedStmt = conn.prepareStatement(qr);
                preparedStmt.setString(1, player.getUsername());
                ResultSet rs = preparedStmt.executeQuery();

                if (!rs.next()) {
                    String query = "INSERT INTO Registration_data(userid,first_name,last_name,pcode,phone,email_id,age_group,desired_team,desired_position,user_address,pincode,country,state,city) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
                    PreparedStatement preparedStatement = conn.prepareStatement(query);
                    preparedStatement.setString(1, player.getUsername());
                    preparedStatement.setString(2, player.getFirstname());
                    preparedStatement.setString(3, player.getLastname());
                    preparedStatement.setString(4, player.getPcode());
                    preparedStatement.setLong(5, player.getPhone());
                    preparedStatement.setString(6, player.getEmail());
                    preparedStatement.setString(7, player.getAgegroup());
                    preparedStatement.setString(8, player.getDesiredteam());
                    preparedStatement.setString(9, player.getDesired_positions());
                    preparedStatement.setString(10,player.getAddress());
                    preparedStatement.setInt(11, player.getPin());
                    preparedStatement.setString(12, player.getCountry());
                    preparedStatement.setString(13, player.getState());
                    preparedStatement.setString(14, player.getCity());

                    preparedStatement.executeUpdate();
                    //yes
                    JsonObject jsonData = new JsonObject();
                    jsonData.addProperty("message", "User Created !!!");
                    jsonData.addProperty("status", 201);
                    response.setStatus(201);
                    response.setContentType("application/json");
                    PrintWriter pw = response.getWriter();
                    pw.print(jsonData);
                    pw.flush();

                } else {
                    //no
                    JsonObject jsonData = new JsonObject();
                    jsonData.addProperty("message", "Already Exists !!!");
                    jsonData.addProperty("status", 409);
                    response.setStatus(409);
                    response.setContentType("application/json");
                    PrintWriter pw = response.getWriter();
                    pw.print(jsonData);
                    pw.flush();

                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (conn != null && !conn.isClosed()) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

}
