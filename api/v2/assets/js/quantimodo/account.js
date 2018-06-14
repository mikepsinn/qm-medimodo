// prepare the form when the DOM is ready
$(document).ready(function() {

    $('#delete-account').on('click', function(event) {
        $('#confirm-delete').modal('show');
    });

    $('#delete').on('click', function(event) {
        window.location.href = "/api/v2/account/delete";
        return false;
    });
});