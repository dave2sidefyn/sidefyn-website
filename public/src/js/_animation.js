(function ($) {
    'use strict';

    $.fn.visible = function () {

        var $t = $(this), $w = $(window), viewTop = $w.scrollTop(), viewBottom = viewTop
            + $w.height(), _top = $t.offset().top, _bottom = _top
            + $t.height(), compareTop = _bottom, compareBottom = _top;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

    $(window).scroll(animate);


    function animate() {
        $('.anim-element').each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass('animate');
            }
        });
    }

    animate();
})(jQuery);
