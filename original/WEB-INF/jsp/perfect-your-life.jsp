<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page import="com.fluxtream.Configuration"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ page
	isELIgnored="false"%><%@ page import="java.util.*"%><%@ page
	import="net.tanesha.recaptcha.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
	ApplicationContext ac = RequestContextUtils.getWebApplicationContext(request);
	Configuration configuration = (Configuration) ac.getBean(Configuration.class);

	String pathToContent=configuration.resolvePathToPage("perfect_your_life.html");
%>

<!DOCTYPE html>

<html lang="en">



<c:import url="<%=pathToContent%>" charEncoding="UTF-8"/>

<script type="text/javascript">
$(document).ready(function(){
	 var doCredentialVerification="false";
	 if('true'==doCredentialVerification){
	   	showVerification();
	 }
});
</script>


</html>

