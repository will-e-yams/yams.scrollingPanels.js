# Scrolling Panels

automatically resize oversized containers to the height of the screen and scroll the contents

- auto-sizes containers within 25px of the bottom of viewport (customizable with option.offsetBottom)
- sets padding-right of the container to 10px to account for scrollbar (customizable with option.scrollbarPadding)
- resizes anytime the viewport is resized
- works with [Bootstrap](#http://getbootstrap.com) tabs content

### Requires

- [jQuery](#http://jQuery.com)

### Usage

_*Note:* requires [jQuery](http://jQuery.com)_

```
<script type="text/javascript">
	$(function() {
		$('.scrolling-panels')..scrollingPanel();
	})
</script>

```
