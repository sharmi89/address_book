/**
 * Display Notifications
 * param type: String, the notificaton type can be danger, success, info, warning
 */
var notify = function(type, message) {
    $.notify({
        message: message
    }, {
        type: type
    });
};
