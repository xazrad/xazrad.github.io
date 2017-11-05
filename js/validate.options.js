/**
 * Created by radik on 05.11.17.
 */

define([
    'jquery'
],
function ($) {
    return {
        highlight: function(element) {
            $(element).parent().addClass("has-error");
        },
        unhighlight: function(element) {
            $(element).parent().removeClass("has-error");
        },
        rules: {
            password: {
                required: true,
                minlength: 6
            }
        }
    }
});
