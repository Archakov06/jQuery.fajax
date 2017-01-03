;(function ($) {

    $.fn.fajax = function (options) {

        var settings = $.extend({
            beforeSend: function(){},
            afterSend: function(){return true},
            success: function(){},
            error: function(){},
            complete: function(){},
        }, options);

        return this.each(function() {

            $(this).on('submit', function(e){

                e.preventDefault();

                var action = $(this).attr('action');
                var method = $(this).attr('method');
                
                if (method.toUpperCase() == 'GET')
                {
                    var data = $(this).serialize();
                }
                else
                {
                    var data = new FormData(this);
                }
                
                if ( settings.afterSend() )
                $.ajax({
                    url: action,
                    type: method,
                    data: data,
                    processData: false,
                    contentType: false,
                    beforeSend: function(data){
                        settings.beforeSend(data);
                    },
                    success: function(data){
                        settings.success(data);
                    },
                    error: function(data){
                        settings.error(data);
                    },
                    complete: function(data){
                        settings.complete(data);
                    },
                });

            });

        });

    };

})(jQuery);
