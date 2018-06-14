<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ page
	isELIgnored="false"%><%@ page import="java.util.*"%><%@ page
	import="net.tanesha.recaptcha.*"%>
<%@ page import="org.brickred.socialauth.Profile"%>
<%
	List<String> errors = new ArrayList<String>();
	if (request.getAttribute("errors") != null)
		errors = (ArrayList<String>) request.getAttribute("errors");
	
	List<String> required = new ArrayList<String>();
	if (request.getAttribute("required") != null)
		required = (ArrayList<String>) request.getAttribute("required");
	
	Profile userProfile = (Profile) request.getSession().getAttribute("userProfile");

	if (userProfile == null) {
		throw new RuntimeException("User profile is null");
	}

	String email = userProfile.getEmail()==null ? "" : userProfile.getEmail();
	
	String providerId = userProfile.getProviderId();
	String validatedId = userProfile.getValidatedId();
	
	String signInEmail=(String)request.getSession().getAttribute("email");
	String signInPassword=(String)request.getSession().getAttribute("password");
	
	boolean doSignIn= signInEmail!=null && signInPassword!=null;
	if(doSignIn){
		request.getSession().setAttribute("password",null);
		request.getSession().setAttribute("email",null);
		request.getSession().setAttribute("userProfile",null);
	}
%>
<div class="modal" id="verifyModal">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3 id="myModalLabel">Verify</h3>
    </div>
	<form class="form-horizontal" action="javascript:void(0)">
	<div class="modal-body" style="max-height: 500px;">
		<p>Please verify your credentials:</p>
		<div class="control-group">
			<label class="control-label" for="email">Email</label>
			<div class="controls">
				<input type="email" value="<%=email%>" autocorrect="off"
					autocapitalize="off" id="email" name="email"
					placeholder="ex: example@example.com">
				<%
                    if (required.contains("email")) {
                %>
                <span class="help-inline error">E-mail is required</span>
                <% } else if (errors.contains("userExists")) { %>
                <span class="help-inline error">This e-mail address is already used</span>
                <% } %>
			</div>
		</div>
		<input type="hidden" value="<%=providerId %>" name="providerId" id="providerId">
		<input type="hidden" value="<%=validatedId %>" name="validatedId" id="validatedId">
		<div class="control-group">
			<div class="controls">
			      <%
                        if (!doSignIn) {
                 %>
				<button type="submit" id="submitVerifyCredentialsForm"
					class="btn btn-primary">Verify</button>
				<% } else {%>
					<p>Hold on, you are being logged on...</p>
					<% } %>
			</div>
		</div>
	</div>
	</form>
	<%
        if (doSignIn) {
     %>
	<form action="/signIn" method="post" id="hiddenlogin"
		style="display: none">
		<input name="f_username"
			value="<%=signInEmail%>"
			type="text"><br> <input
			value="<%=signInPassword%>"
			name="f_password">
	</form>
	<script>
		document.getElementById('hiddenlogin').submit();
	</script>
	<% } %>
</div>
