/**
 * Created by radik on 05.11.17.
 */
define([
    'pace'
    ],
    function (pace) {
        pace.start({
            ajax: {
                trackMethods: ['GET', 'POST']
            }
            // restartOnRequestAfter: false
        });

    return {};
});