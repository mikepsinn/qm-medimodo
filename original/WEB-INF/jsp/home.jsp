<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page import="com.fluxtream.Configuration"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.fluxtream.auth.AuthHelper" %>
<%@ page pageEncoding="utf-8" contentType="text/html; charset=UTF-8"%><%@ taglib
	uri="http://granule.com/tags" prefix="g"
%><%@ page import="java.util.List"
%><%@ page import="com.fluxtream.domain.Guest"
%>

<%
	ApplicationContext ac = RequestContextUtils.getWebApplicationContext(request);
	Configuration configuration = (Configuration) ac.getBean(Configuration.class);

	String pathToContent = configuration.resolvePathToPage("analyze.html");

	Long guestId = AuthHelper.getGuest().getId();
	String displayUserName = "";
	if(AuthHelper.getGuest().firstname!=null || AuthHelper.getGuest().lastname!=null){
		displayUserName=AuthHelper.getGuest().firstname + " " + AuthHelper.getGuest().lastname;	
	} else {
		displayUserName=AuthHelper.getGuest().username;
	}
	 
%>

<!DOCTYPE html>

<html lang="en">



<c:import url="<%=pathToContent%>" charEncoding="UTF-8">
</c:import>

<script type="text/javascript">
	var userId=<%=guestId%>;
	$(document).ready(function(){
		$(".user-name").html('<%=displayUserName%>');
	});
</script>

</html>

