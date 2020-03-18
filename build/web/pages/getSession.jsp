<%-- 
    Document   : getSession
    Created on : Nov 15, 2014, 11:23:47 AM
    Author     : Administrator
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String username = (String) session.getAttribute("userName");
    out.print(username);
%>
