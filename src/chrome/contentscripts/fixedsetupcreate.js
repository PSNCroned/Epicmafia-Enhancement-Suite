//Because Lucid is too lazy to fix the minor bugs in his code
window.creategame_update = function(data) {
	var button, o, status, str, redirect, msg;
	if ($.isArray(data)) {
		status = data[0], o = data[1];
		if (o.redirect) {
			window.location.reload(true);
		}
		if (!status) {
			if (o.redirect) {
				window.location.href = o.redirect;
			}
			poptog('#pop_warn');
			errordisplay('.error', o.msg);
			if (o.code) {
				button = $("<a href='/lobby/setup/" + o.id + "' class='button create'>Setup " + o.id + "</a>");
				$('#createbuttons').append(button);
			}
			return $('#setupsubmit').attr('disabled', false);
		}
		else {
			str = '/game/' + o.table;
			if (o.password) {
				str += '?password=' + o.password;
			}
			return window.location = str;
		}
	}
	else {
		status = data.status, redirect = data.redirect, msg = data.msg;
		if (redirect) {
			window.location.href = redirect;
		}
		poptog('#pop_warn');
		errordisplay('.error', msg);
		return $('#setupsubmit').attr('disabled', false);
	}
};