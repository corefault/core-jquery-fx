/**
 * progressbar jQuery plugin
 * @author Daniel Kagemann
 * @date   10.10.2014
 */
(function($) {
    $.fn.extend ({
        //# extend with typewriter function
        progressbar: function (opts) {
            return this.each (function() {
                // attributes: text, barcolor, percent, height
                var text = opts.text || "not specified";
                var barcolor = opts.barcolor || "#000";
                var width = opts.percent || "0%";
                var height = opts.height || "5px";
                var bgcolor = opts.backgroundcolor || '#eee';
                var obj = $(this);
                var elText = '<div style="font-size:12px; text-transform:uppercase;">' + text + '</div>';
                var elBar = '<div style="width:100%;background-color:'+bgcolor+';position:relative;height:'+height+'">'
                        + '<div style="background-color:' + barcolor + ';position:absolute;left:0;top:0;height:100%;width:' + width + ';"></div></div>';
                obj.html('<div>' + elText + elBar + '</div>');
            });
        }
    });
})(jQuery);        
