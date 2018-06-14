<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@ taglib
	prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@ page
	isELIgnored="false"%><%@ page import="com.fluxtream.*"%><%@ page
	import="com.fluxtream.domain.*"%><%@ page import="java.util.*"%><%@ page
	import="net.tanesha.recaptcha.*"%>
<%
	List<String> errors = new ArrayList<String>();
	if (request.getAttribute("errors") != null)
		errors = (ArrayList<String>) request.getAttribute("errors");

	List<String> required = new ArrayList<String>();
	if (request.getAttribute("required") != null)
		required = (ArrayList<String>) request.getAttribute("required");

	String invitationCode = "";
	if (request.getAttribute("invitationCode") != null)
		invitationCode = (String) request
				.getAttribute("invitationCode");

	String email = "";
	if (request.getAttribute("email") != null){
		email = (String) request.getAttribute("email");
	}

	String signInEmail=(String)request.getSession().getAttribute("email");
	String signInPassword=(String)request.getSession().getAttribute("password");
	
	boolean doSignIn= signInEmail!=null && signInPassword!=null;
	if(doSignIn){
		request.getSession().setAttribute("password",null);
		request.getSession().setAttribute("username",null);
	}
%>
<div class="modal" id="registerModal">
	<div class="register-inner-frame">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h3 id="myModalLabel">Register</h3>
		</div>
		<form class="form-horizontal" action="javascript:void(0)">
			<div class="modal-body" style="max-height: 500px;">
				<div class="oauth_providers">
					You can register with any of the providers: <br /> <a
						href="/oauth/token?provider=google"> <img
						src="/imgs/authentication/google.png" />
					</a> <a href="/oauth/token?provider=facebook"> <img
						src="/imgs/authentication/facebook.png" />
					</a> <a href="/oauth/token?provider=twitter"> <img
						src="/imgs/authentication/twitter.png" />
					</a> <a href="/oauth/token?provider=yahoo"> <img
						src="/imgs/authentication/yahoo.png" />
					</a>
				</div>
				<p>Or you can fill the form with your own login credentials:</p>
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
						<span class="help-inline error">This e-mail address is
							already used</span>
						<% } %>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="password">Password</label>
					<div class="controls">
						<input type="password" name="password1" id="password"
							placeholder="Password">
						<%
	                    if (required.contains("password")) {
	                %>
						<span class="help-inline error">Password is required</span>
						<% } else if (errors.contains("passwordsDontMatch")) { %>
						<span class="help-inline error">Passwords don't match</span>
						<% } else if (errors.contains("passwordTooShort")) { %>
						<span class="help-inline error">Password must be at least 8
							characters long</span>
						<% } %>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="password2">re-type
						Password</label>
					<div class="controls">
						<input type="password" name="password2" id="password2"
							placeholder="Password">
						<%
	                    if (required.contains("password2")) {
	                %>
						<span class="help-inline error">Verification is required</span>
						<% } %>
					</div>
				</div>
				<div class="control-group">
					<div class="controls">
						<%
	                        if (!doSignIn) {
	                    %>
						<button type="submit" id="submitCreateAccountForm"
							class="btn btn-primary">Register</button>
						<% } else {%>
						<p>Hold on, you are being logged on...</p>
						<% } %>
					</div>
				</div>
			</div>
		</form>
	</div>

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
