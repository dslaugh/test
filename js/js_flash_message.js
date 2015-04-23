<script type="flash-template" id="FlashTemplate">
<div class="flash_message {{flashStatus}}">
	<div class="center">
		<div class="icons icon-thin-x flash_close"></div>
		<div class="flash_text">{{message}}</div>
	</div>
</div>
</script>

var templ = $('#FlashTemplate').html();
var flash;
flash = templ.replace(/\{\{flashStatus\}\}/, 'flash_success').replace(/{{message}}/, response.message);
flash = templ.replace(/\{\{flashStatus\}\}/, 'flash_failure').replace(/{{message}}/, response.message);
$(flash).insertAfter('#Viewport > header');