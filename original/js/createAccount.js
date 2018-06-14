

//$(document).ready(function() {
//    $("#submitCreateAccountForm").click(function submitCreateAccountForm() {
//        var email = $("input#email").val(),
//        password = $("input#password").val(),
//        password2 = $("input#password2").val(),
//        username = $("input#username").val(),
//        firstname = $("input#firstname").val(),
//        lastname = $("input#lastname").val();
//	    $.ajax({
//	        url:"/createAccount",
//	        type: "POST",
//	        data: {email: email,
//	            password1: password, password2: password2,
//	            username: username, firstname: firstname,
//	            lastname: lastname},
//	        success: function(html) {
//	            $(".modal-backdrop").remove();
//	            $("#registerModal").replaceWith(html);
//	            $("#registerModal").modal("show");
//	            $("#submitCreateAccountForm").click(submitCreateAccountForm);
//	        }
//	    });
//	});
//});