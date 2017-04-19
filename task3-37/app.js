/**
 * Created by Chris Cai on 2017/2/25.
 */
(function() {
    var layer = createFloatLayer($('#divFloat'));
    layer.show();

    addEvent($('#btnLogin'), 'click', function() {
        layer.show();
    })

    addEvent($('#btnSure'), 'click', function() {
        layer.hide();
    })

    addEvent($('#btnCancel'), 'click', function() {
        layer.hide();
    })
})()