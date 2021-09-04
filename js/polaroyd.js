jQuery(document).ready(function($) {
    if( $('#photostack-1').length) {
        new Photostack(document.getElementById('photostack-1'), {
            callback: function(item) {
                console.log(item)
            }
        });
    }
});