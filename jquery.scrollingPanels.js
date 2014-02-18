
/* ========================================================================
* scrollingPanel.js
* version:	1.0
* author:	Brad Williams <brad.lee.williams@gmail.com>
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
		offsetTop: 0,
		offsetBottom: 25,
		scrollbarPadding: 10
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
		var eOffsetTop = 0;

		if ($e.is(':visible')) {
			eOffsetTop = e.getBoundingClientRect().top;
		} else {
			eOffsetTop = $e.parents(':visible')[0].getBoundingClientRect().top;
		}
		$e.css('height',
			window.innerHeight - eOffsetTop - (this.options.offsetTop + this.options.offsetBottom))
			.css('paddingRight', this.options.scrollbarPadding + 'px')
			.css('overflow-x', 'none')
			.css('overflow-y', 'auto');
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

} (jQuery);

