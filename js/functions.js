$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

function urlParamRemove(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    var newHref = window.location.href;
    if (results) {
        if (results[0][0] == '?') {
            var totalIndex = results['index'] + results[0].length;
            if (results['input'].charAt(totalIndex) == '&') newHref = newHref.replace(results[0] + '&', '?');
            else if (results['input'].charAt(totalIndex) == '') newHref = newHref.replace(results[0], '');
            else newHref = newHref.replace(results[0], '');
        } else if (results[0][0] == '&') newHref = newHref.replace(results[0], '');

        window.location.replace(newHref);
    }
}



function setCookie(cname, cvalue, exdays) {
    if (exdays && exdays !== 0) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else document.cookie = cname + "=" + cvalue + ";path=/";
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
