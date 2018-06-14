<%@page import="com.fluxtream.Configuration"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ page
	isELIgnored="false"%><%@ page import="java.util.*"%>

<%@ page import="org.brickred.socialauth.Profile"%>
<%
	boolean doCredentialVerification= (request.getSession().getAttribute("userProfile")!=null);
	String signInPassword=(String)request.getSession().getAttribute("password");
	String signInUsername=(String)request.getSession().getAttribute("username");
	boolean doSignIn= signInUsername!=null && signInPassword!=null;
	if(doSignIn){
		request.getSession().setAttribute("password",null);
		request.getSession().setAttribute("username",null);
	}
%>

<%
	ApplicationContext ac = RequestContextUtils.getWebApplicationContext(request);
	Configuration configuration = (Configuration) ac.getBean(Configuration.class);

	String pathToContent=configuration.resolvePathToPage("landing_page.html");
%>

<!DOCTYPE html>

<html lang="en" prefix="og: http://ogp.me/ns#">



<c:import url="<%=pathToContent%>" charEncoding="UTF-8"/>

<script type="text/javascript">
$(document).ready(function(){
	 var doCredentialVerification="<%=doCredentialVerification%>";
	 if('true'==doCredentialVerification){
	   	showVerification();
	 }
});
</script>


    <%
        if (doSignIn) {
     %>
	<form action="/signIn" method="post" id="hiddenlogin"
		style="display: none">
		<input name="f_username"
			value="<%=signInUsername%>"
			type="text"><br> <input
			value="<%=signInPassword%>"
			name="f_password">
	</form>
	<script>
		document.getElementById('hiddenlogin').submit();
	</script>
	<%
        }
     %>
</body>
</html>

