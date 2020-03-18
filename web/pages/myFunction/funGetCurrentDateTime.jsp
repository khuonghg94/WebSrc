<%-- 
    Document   : funGetCurrentDateTime
    Created on : Jun 29, 2017, 2:17:15 PM
    Author     : sol
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    request.setCharacterEncoding("UTF-8");
    String caseName = request.getParameter("caseName");
//    out.print(caseName);
    if (caseName.trim().toLowerCase().equals("getcurrentdatetime")) {
        java.util.Date currentDate = new java.util.Date();
        java.text.SimpleDateFormat fDate = new java.text.SimpleDateFormat("dd/MM/yyyy");
        java.text.SimpleDateFormat fHour = new java.text.SimpleDateFormat("H");
        java.text.SimpleDateFormat fMinute = new java.text.SimpleDateFormat("m");
        java.text.SimpleDateFormat fSecond = new java.text.SimpleDateFormat("s");

        // dd/M/yyyy H:m:s
        out.print(fDate.format(currentDate) + "<sos>" + fHour.format(currentDate) + "<sos>" + fMinute.format(currentDate) + "<sos>" + fSecond.format(currentDate));
        return;
    }
%>
