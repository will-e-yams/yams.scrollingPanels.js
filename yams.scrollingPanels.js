
/* ========================================================================
* yams.scrollingPanel.js
* version:	1.0
* author:	Brad Williams <brad.lee.williams@gmail.com>
*           thanks Bootstrap for the plugin template
* ======================================================================== */

+function ($) {
    'use strict';

    // scrollingPanel PUBLIC CLASS DEFINITION
    // ===============================

    var ScrollingPanel = function (element, options) {
        this.type =
		this.options =
		this.$element = null

        this.init('scrollingPanel', element, options)
    }

    ScrollingPanel.DEFAULTS = {
        minHeight: 100,
        //maxHeight: disables auto-height
        offsetTop: 0,
        offsetBottom: 25,
        scrollbarPadding: 10,
        marginBottom: 0
    }

    ScrollingPanel.prototype.init = function (type, element, options) {
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)

        // initiale adjust
        this.adjust();
        // adjust on resize
        this.$window = $(window)
			.on('resize.yams.scrollingPanel', $.proxy(this.adjust, this))
    }

    ScrollingPanel.prototype.getDefaults = function () {
        return ScrollingPanel.DEFAULTS
    }

    ScrollingPanel.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        return options
    }

    ScrollingPanel.prototype.adjust = function () {
        var $e = this.$element
        var e = this.$element[0]
        var rect = null;
        var setHeight = this.options.minHeight;

        if ($e.is(':visible')) {
            rect = e.getBoundingClientRect();
        } else {
            rect = $e.parents(':visible')[0].getBoundingClientRect();
        }

        if (this.options.maxHeight) {
            if (e.scrollHeight > this.options.maxHeight)
                setHeight = this.options.maxHeight;
            else if (e.scrollHeight > this.options.minHeight)
                setHeight = e.scrollHeight;
        }
        else {
            var calcHeight = window.innerHeight - rect.top - (this.options.offsetTop + this.options.offsetBottom);
            if (calcHeight > setHeight)
                setHeight = calcHeight;
        }
        $e.css('height', setHeight)
			.css('paddingRight', this.options.scrollbarPadding + 'px')
			.css('overflow-x', 'none')
			.css('overflow-y', 'auto');

        var marginBottomTarget = $e;
        if ($e.parents('.panel-body').length > 0)
            marginBottomTarget = $e.parents('.panel');

        marginBottomTarget.css('marginBottom', this.options.marginBottom + 'px')
    }

    // scrollingPanel PLUGIN DEFINITION
    // =========================

    var old = $.fn.scrollingPanel

    $.fn.scrollingPanel = function (option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('yams.scrollingPanel')
            var options = typeof option == 'object' && option

            if (!data) $this.data('yams.scrollingPanel', (data = new ScrollingPanel(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.scrollingPanel.Constructor = ScrollingPanel


    // scrollingPanel NO CONFLICT
    // ===================

    $.fn.scrollingPanel.noConflict = function () {
        $.fn.scrollingPanel = old
        return this
    }

}(jQuery);

