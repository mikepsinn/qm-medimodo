<%@page import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ page
	isELIgnored="false"%><%@ page import="com.fluxtream.*"%><%@ page
	import="com.fluxtream.domain.*"%><%@ page import="java.util.*"%>

<%
	ApplicationContext ac = RequestContextUtils.getWebApplicationContext(request);
	Configuration configuration = (Configuration) ac.getBean(Configuration.class);

	String pathToContent=configuration.resolvePathToPage("upload_popup.html");
%>

<c:import url="<%=pathToContent%>" charEncoding="UTF-8">
</c:import>

<script type="text/javascript">
	$(document).ready(function(){
		$("#f_username").val('<%=request.getParameter("username") != null ? request.getParameter("username") : ""%>');
	});
</script>


