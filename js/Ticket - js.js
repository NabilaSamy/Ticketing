/* global $, alert, console */
$(function () {
    'use strict';

    // Trigger Nice Scroll
    /* $("html").niceScroll({
         railpadding: {
             top: 58,
             right: 0,
             left: 0,
             bottom: -60
         },
         cursorcolor: '#888',
         cursorwidth: '8',
         cursorborder: '1px solid #888',
         cursorborderradius: 8
     });*/
});
/* ================================================================================================== */

// open sidemenu
function openSide() {
    document.getElementById("mySidebar").style.width = "260px";
    document.getElementById("main").style.marginLeft = "260px";
}
/* ================================================================================================== */

// close sidemenu
function closeSide() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
/* ================================================================================================== */

// login
function validateLoginForm() {
    var email = document.forms["loginForm"]["email"].value;
    var psw = document.forms["loginForm"]["psw"].value;

    if (email != "" && psw != "") {
        alert("Successfully, You can login.");
        return true;
    }
}

// login api
$('#login').on('submit', function () {
    var email = $('#email').val();
    var psw = $('#psw').val();
    var rem = $('#rem').is(':checked');

    // input confirmation here

    Login(email, psw, rem);

    return false;
});

function Login(given_email, given_psw, given_remember) {
    $.ajax({
        method: "POST",
        url: 'http://webdev.exabyte-eg.com/APIs/eTicketing/user/login',
        data: "{\n\t\"email\": \"" + given_email + "\",\n\t\"psw\": \"" + given_psw + "\"\n}"
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
            var session_expiration = 0;
            if (given_remember == true) session_expiration = '30';
            setCookie('uid', user['id'], session_expiration);
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}

/* ================================================================================================== */
// validate reset pass page
function validatePass() {
    var psw = document.forms["validPass"]["psw"].value;
    var cpsw = document.forms["validPass"]["cpsw"].value;

    if (psw == "") {
        alert("Password must not be empty!");
        return false;
    } else if (cpsw == "") {
        alert("Password must not be empty!");
        return false;
    } else if (cpsw != psw) {
        alert("The Two Passwords is not the same!");
        return false;
    } else {
        alert("Successfully, the new password is created.");
        return true;
    }
}
/* ================================================================================================== */
// validate forgot page
function validationForgot() {
    'use strict';
    var email = document.forms["ForgotForm"]["email"].value;

    if (email != "") {
        alert("Your Email is valid, Now go to your mail and check it!");
        return true;
    }
}
/* ================================================================================================== */
// save user profile info. 
function userProfile() {
    'use strict';
    var f_name = document.forms["editUserProfile"]["f_name"].value;
    var m_name = document.forms["editUserProfile"]["m_name"].value;
    var l_name = document.forms["editUserProfile"]["l_name"].value;
    var ar_name = document.forms["editUserProfile"]["ar_name"].value;
    var email = document.forms["editUserProfile"]["email"].value;
    var telephone = document.forms["editUserProfile"]["telephone"].value;
    var psw = document.forms["editUserProfile"]["psw"].value;

    if (f_name != "" && m_name != "" && l_name != "" && ar_name != "" && email != "" && telephone != "" && psw != "") {
        alert("Profile Updated!");
        return true;
    }
}
/* ================================================================================================== */

// save client admin
function saveAdmin() {
    'use strict';
    var en_name = document.forms["saveClientAdmin"]["en_name"].value;
    var ar_name = document.forms["saveClientAdmin"]["ar_name"].value;
    var email = document.forms["saveClientAdmin"]["email"].value;
    var telephone = document.forms["saveClientAdmin"]["telephone"].value;
    var website = document.forms["saveClientAdmin"]["website"].value;

    if (en_name != "" && ar_name != "" && email != "" && telephone != "" && website != "") {
        alert('User Saved!');
        return true;
    }
}

// clientAdmin api
$('#saveClientAdmin').on('submit', function () {
    var en_name = $('#en_name').val();
    var ar_name = $('#ar_name').val();
    var email = $('#email').val();
    var telephone = $('#telephone').val();
    var website = $('#website').val();

    // input confirmation here

    getClientAdmin(en_name, ar_name, email, telephone, website);

    return false;
});

function getClientAdmin(given_en_name, given_ar_name, given_telephone, given_email, given_website) {
    var data = JSON.stringify({
        en_name: given_en_name,
        ar_name: given_ar_name,
        email: given_email,
        telephone: given_telephone,
        website: given_website
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/users/{1}',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================== */

// save user
function saveUser() {
    'use strict';
    var f_name = document.forms["ad_mg_cli"]["f_name"].value;
    var m_name = document.forms["ad_mg_cli"]["m_name"].value;
    var l_name = document.forms["ad_mg_cli"]["l_name"].value;
    var telephone = document.forms["ad_mg_cli"]["telephone"].value;
    var email = document.forms["ad_mg_cli"]["email"].value;
    var psw = document.forms["ad_mg_cli"]["psw"].value;

    if (f_name != "" && m_name != "" && l_name != "" && telephone != "" && email != "" && psw != "") {
        alert('User Saved!');
        return true;
    }
}

// add fields
function add_fields_adm_mgmt_client() {
    document.getElementById("ad_mg_cli_table").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" name="f_name" id="f_name" placeholder="First Name" required></td><td><input class="form-control" type="text" name="m_name" id="m_name" placeholder="Middle Name" required></td><td><input class="form-control" type="text" name="l_name" id="l_name" placeholder="Last Name" required></td><td><select name="Type" id="type"><option selected disabled>Choose here</option><option value="admin">Admin</option><option value="user">User</option></select></td><td><input class="form-control" type="number" id="telephone" placeholder="Telephone" required></td><td><input class="form-control" type="email" id="email" placeholder="Email" required></td><td><input class="form-control" type="password" name="psw" id="psw" placeholder="Password" required></td><td><select name="Status" id="status"><option selected disabled>Choose here</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td><td><input type="file" name="myFile"></td></tr>';
}

// change user type
function changeUser_adm_mgmt_client() {
    alert('You can change user type from -Status- field.');
}

// admin manage clients api
$('#ad_mg_cli').on('submit', function () {
    var f_name = $('#f_name').val();
    var m_name = $('#m_name').val();
    var l_name = $('#l_name').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();
    var psw = $('#psw').val();

    // input confirmation here

    getadminManageClient(f_name, m_name, l_name, telephone, email, psw);

    return false;
});

function getadminManageClient(given_f_name, given_m_name, given_l_name, given_telephone, given_email, given_psw) {

    var data = JSON.stringify({
        f_name: given_f_name,
        m_name: given_m_name,
        l_name: given_l_name,
        telephone: given_telephone,
        email: given_email,
        psw: given_psw,
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/users/{user id}',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ================================================================================================== */
// save ticket
function saveClientUserTicket() {
    'use strict';
    var project = document.forms["cli_use_tick"]["project"].value;
    var project_sub = document.forms["cli_use_tick"]["project_sub"].value;
    var title = document.forms["cli_use_tick"]["title"].value;
    var descripe = document.forms["cli_use_tick"]["descripe"].value;

    if (project != "" && project_sub != "" && title != "" && descripe != "") {
        alert('Ticket Saved!');
        return true;
    }
}

/* ======================================================================================================= */

// client manage user tickets api
$('#cli_use_tick').on('submit', function () {
    var project = $('#project').val();
    var project_sub = $('#project_sub').val();
    var title = $('#title').val();
    var descripe = $('#descripe').val();

    // input confirmation here

    getClientUserTick(project, project_sub, title, descripe);

    return false;
});

function getClientUserTick(given_project, given_project_sub, given_title, given_descripe) {
    var data = JSON.stringify({
        project: given_project,
        project_sub: given_project_sub,
        title: given_title,
        descripe: given_descripe
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/tickets/add/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_cli_user_mgmt_tick() {
    document.getElementById("cli_user").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" name="project" id="project" placeholder="Project" required></td><td><input class="form-control" type="text" name="project-sub" id="project-sub" placeholder="Sub Project"required></td><td><input class="form-control" type="text" name="title" id="title" placeholder="Title" required></td><td><input class="form-control" type="text" id="descripe" placeholder="Description" required=""></td><td>Raised by</td><td>Status</td><td>Raised Date</td><td><select name="Type" id="type"><option selected disabled>Choose here</option><option value="1">Issue</option><option value="2">ROI</option><option value="3">New Requirement</option></select></td><td><select name="Severity" id="severity"><option selected disabled>Choose here</option><option value="1">Very Low</option><option value="2">Low</option><option value="3">Medium</option><option value="4">High</option><option value="5">Very High</option> </select></td><td>Requested Severity</td></tr>';
}

// accept severity
function acceptSeverity() {
    alert('Send email to employee and accept this severity!');
}

// reject severity
function rejectSeverity() {
    alert('Send email to employee and reject changing severity!');
}

// escalate
function escalte() {
    alert('Chech your email to view the message!');
}
/* ======================================================================================================= */
// save Ticket
function saveTicket() {
    'use strict';
    var project = document.forms["cli_adm_mgmt_tic_name"]["project"].value;
    var project_sub = document.forms["cli_adm_mgmt_tic_name"]["project_sub"].value;
    var title = document.forms["cli_adm_mgmt_tic_name"]["title"].value;
    var descripe = document.forms["cli_adm_mgmt_tic_name"]["descripe"].value;

    if (project != "" && project_sub != "" && title != "" && descripe != "") {
        alert('Ticket Saved!');
        return true;
    }
}

/* ======================================================================================================= */

// admin manage client tickets api
$('#cli_adm_mgmt_tic_id').on('submit', function () {
    var project = $('#project').val();
    var project_sub = $('#project_sub').val();
    var title = $('#title').val();
    var descripe = $('#descripe').val();

    // input confirmation here

    getClientAdmin(project, project_sub, title, descripe);

    return false;
});

function getClientAdmin(given_project, given_project_sub, given_title, given_descripe) {
    var data = JSON.stringify({
        project: given_project,
        project_sub: given_project_sub,
        title: given_title,
        descripe: given_descripe
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/tickets/add/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_cli_adm_mgmt_tic() {
    document.getElementById("cli_adm_mgmt_tic").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" name="project" id="project" placeholder="Project" required></td><td><input class="form-control" type="text" name="project-sub" id="project-sub" placeholder="Sub Project" required></td><td><input class="form-control" type="text" name="title" id="title" placeholder="Title" required></td><td><input class="form-control" type="text" id="descripe" placeholder="Description" required=""></td><td>Raised by</td><td>Status</td><td>Raised Date</td><td><select name="Type" id="type"><option selected disabled>Choose here</option><option value="1">Issue</option><option value="2">ROI</option><option value="3">New Requirement</option></select></td><td><select name="Severity" id="severity"><option selected disabled>Choose here</option><option value="1">Very Low</option><option value="2">Low</option><option value="3">Medium</option><option value="4">High</option><option value="5">Very High</option></select></td><td>Requested Severity</td></tr>';
}
/* ======================================================================================================= */
// save org detail
function saveOrgdetail() {
    var en_org_name = document.forms["saveOrgDetail"]["en_org_name"].value;
    var ar_org_name = document.forms["saveOrgDetail"]["ar_org_name"].value;
    var email = document.forms["saveOrgDetail"]["email"].value;
    var telephone = document.forms["saveOrgDetail"]["telephone"].value;
    var website = document.forms["saveOrgDetail"]["website"].value;

    if (en_org_name != "" && ar_org_name != "" && email != "" && telephone != "" && website != "") {
        alert("Oragnization Detail Saved!");
        return true;
    }
}

// add org detail api
$('#saveOrgDetail').on('submit', function () {
    var en_org_name = $('#en_org_name').val();
    var ar_org_name = $('#ar_org_name').val();
    var email = $('#email').val();
    var telephone = $('#telephone').val();
    var website = $('#website').val();

    // input confirmation here

    saveyourOrg(en_org_name, ar_org_name, email, telephone, website);

    return false;
});

function saveyourOrg(given_en_org_name, given_ar_org_name, given_email, given_telephone, given_website) {
    var data = JSON.stringify({
        en_org_name: given_en_org_name,
        ar_org_name: given_ar_org_name,
        email: given_email,
        telephone: given_telephone,
        website: given_website
    });

    $.ajax({
        method: "PUT",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/company/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// save org user
function saveOrgUser() {
    'use strict';
    var f_name = document.forms["orgUser"]["f_name"].value;
    var m_name = document.forms["orgUser"]["m_name"].value;
    var l_name = document.forms["orgUser"]["l_name"].value;
    var telephone = document.forms["orgUser"]["telephone"].value;
    var email = document.forms["orgUser"]["email"].value;

    if (f_name != "" && m_name != "" && l_name != "" && telephone != "" && email != "") {
        alert('Organization-User Saved!');
        return true;
    }
}

// add org user api
$('#orgUser').on('submit', function () {
    var f_name = $('#f_name').val();
    var m_name = $('#m_name').val();
    var l_name = $('#l_name').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();

    // input confirmation here

    saveyourOrgUser(f_name, m_name, l_name, telephone, email);

    return false;
});

function saveyourOrgUser(given_f_name, given_m_name, given_l_name, given_telephone, given_email) {
    var data = JSON.stringify({
        f_name: given_f_name,
        m_name: given_m_name,
        l_name: given_l_name,
        telephone: given_telephone,
        email: given_email
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/users/add/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}

// add fields
function add_fields_org_user() {
    document.getElementById("add_org_user").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" name="f_name" id="f_name" placeholder="First Name" required></td><td><input class="form-control" type="text" name="m_name" id="m_name" placeholder="Middle Name" required></td><td><input class="form-control" type="text" name="l_name" id="l_name" placeholder="Last Name" required></td><td><input class="form-control" type="number" id="telephone" placeholder="Telephone" required></td><td><input class="form-control" type="email" id="email" placeholder="Email" required></td><td><select name="Type" id="type"><option selected disabled>Choose here</option><option value="admin">Admin</option><option value="user">User</option></select></td><td><select name="Status" id="status"><option selected disabled>Choose here</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td><td><input type="file" name="myFile"></td></tr>';
}

// change user type
function changeUser_org_user() {
    alert('You can change user type from -Status- field.');
}
/* ======================================================================================================= */
/*
// Dealing with Tabs
$('.manage-switch li').click(function () {
    // Add Selected Class to active link
    $(this).addClass('selected').siblings().removeClass('selected');
    // Hide All Divs
    $('.cust_ticket_manages .manages-content .manage-content-1, .cust_ticket_manages .manages-content .manage-content-2, .cust_ticket_manages .manages-content .manage-content-3, .cust_ticket_manages .manages-content .manage-content-4, .cust_ticket_manages .manages-content .manage-content-5').hide();
    // Show All Divs connected with this link
    $('.' + $(this).data('class')).show();
});
*/
// need to conect the 3 tabels with each others ----> NEXT

// save tickets
function saveTicketDetail() {
    'use strict';
    var title = document.forms["ticketProgress"]["title"].value;
    var descripe = document.forms["ticketProgress"]["descripe"].value;

    if (title != "" && descripe != "") {
        alert('Ticket Details Saved!');
        return true;
    }
}
/* ======================================================================================================= */

// user manage tickets api
$('#ticketProgress').on('submit', function () {
    var title = $('#title').val();
    var descripe = $('#descripe').val();

    // input confirmation here

    getUserTicket(title, descripe);

    return false;
});

function getUserTicket(given_title, given_descripe) {
    var data = JSON.stringify({
        title: given_title,
        descripe: given_descripe
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/tickets/add/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// solved ticket
function solved() {
    alert('This ticket is solved.');
}

// change severity
function changeSeverity() {
    alert('You changed the severity.');
}
/* ======================================================================================================= */
// Dealing with Tabs
$('.manage-switch li').click(function () {
    // Add Selected Class to active link
    $(this).addClass('selected').siblings().removeClass('selected');
    // Hide All Divs
    $('.org_manages .manages-content .manage-content-1, .org_manages .manages-content .manage-content-2, .org_manages .manages-content .manage-content-3, .org_manages .manages-content .manage-content-4, .org_manages .manages-content .manage-content-5').hide();
    // Show All Divs connected with this link
    $('.' + $(this).data('class')).show();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// save client
function saveClient() {
    'use strict';
    var en_client_name = document.forms["Saveclient"]["en_client_name"].value;
    var ar_client_name = document.forms["Saveclient"]["ar_client_name"].value;
    var telephone = document.forms["Saveclient"]["telephone"].value;
    var email = document.forms["Saveclient"]["email"].value;
    var website = document.forms["Saveclient"]["website"].value;

    if (en_client_name != "" && ar_client_name != "" && telephone != "" && email != "" && website != "") {
        alert('Client Saved!');
        return true;
    }
}

/* ======================================================================================================= */

// add client api
$('#Saveclient').on('submit', function () {
    var en_client_name = $('#en_client_name').val();
    var ar_client_name = $('#ar_client_name').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();
    var website = $('#website').val();

    // input confirmation here

    saveyourClient(en_client_name, ar_client_name, telephone, email, website);

    return false;
});

function saveyourClient(given_en_client_name, given_ar_client_name, given_telephone, given_email, given_website) {
    var data = JSON.stringify({
        en_client_name: given_en_client_name,
        ar_client_name: given_ar_client_name,
        telephone: given_telephone,
        email: given_email,
        website: given_website
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/clients/{1}',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_client() {
    document.getElementById("client").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" id="en_client_name" placeholder="English Name" required></td><td><input class="form-control" type="text" id="ar_client_name" placeholder="Arabic Name" required></td><td><input class="form-control" type="number" id="telephone" placeholder="Telephone" required></td><td><input class="form-control" type="email" id="email" placeholder="E-mail" required></td><td><input class="form-control" type="text" id="website" placeholder="Website" required></td><td><select name="Status"><option selected disabled>Choose here</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td><td><input type="file" name="myFile"></td></tr>';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// save SPOC
function saveSPOC() {
    'use strict';
    var f_name = document.forms["Savespoc"]["f_name"].value;
    var m_name = document.forms["Savespoc"]["m_name"].value;
    var l_name = document.forms["Savespoc"]["l_name"].value;
    var telephone = document.forms["Savespoc"]["telephone"].value;
    var email = document.forms["Savespoc"]["email"].value;

    if (f_name != "" && m_name != "" && l_name != "" && telephone != "" && email != "") {
        alert('SPOC Saved!');
        return true;
    }
}
/* ======================================================================================================= */

// add spoc api
$('#Savespoc').on('submit', function () {
    var f_name = $('#f_name').val();
    var m_name = $('#m_name').val();
    var l_name = $('#l_name').val();
    var telephone = $('#telephone').val();
    var email = $('#email').val();

    // input confirmation here

    saveyourSpoc(f_name, m_name, l_name, telephone, email);

    return false;
});

function saveyourSpoc(given_f_name, given_m_name, given_l_name, given_telephone, given_email) {
    var data = JSON.stringify({
        f_name: given_f_name,
        m_name: given_m_name,
        l_name: given_l_name,
        telephone: given_telephone,
        email: given_email
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/users/add/',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_spoc() {
    document.getElementById("spoc").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" id="fname" placeholder="First Name" required></td><td><input class="form-control" type="text" id="mname" placeholder="Middle Name" required></td><td><input class="form-control" type="text" id="lname" placeholder="Last Name" required></td><td><input class="form-control" type="number" id="telephone" placeholder="Telephone" required></td><td><input class="form-control" type="email" id="email" placeholder="E-mail" required></td><td><select name="Status"><option selected disabled>Choose here</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td><td><input type="file" name="myFile"></td></tr>';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// save project
function saveProject() {
    'use strict';
    var title = document.forms["Saveproject"]["title"].value;
    var descripe = document.forms["Saveproject"]["descripe"].value;

    if (title != "" && descripe != "") {
        alert('Project Saved!');
        return true;
    }
}
/* ======================================================================================================= */

// add project api
$('#Saveproject').on('submit', function () {
    var title = $('#title').val();
    var descripe = $('#descripe').val();

    // input confirmation here

    saveyourProject(title, descripe);

    return false;
});

function saveyourProject(given_title, given_descripe) {
    var data = JSON.stringify({
        title: given_title,
        descripe: given_descripe
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/projects/{1}/{1}',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_project() {
    document.getElementById("project").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" id="title" placeholder="Project Title" required></td><td><input style="width: 200px;" class="form-control" type="text" id="descripe" placeholder="Project description" required></td><td><select name="Status" id="status"><option selected disabled>Choose here</option><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></td><td><input type="file" name="myFile"></td></tr>';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// save sub-project
function saveSubProject() {
    'use strict';
    var title = document.forms["SavesubProject"]["title"].value;
    var descripe = document.forms["SavesubProject"]["descripe"].value;
    var warrenty_start = document.forms["SavesubProject"]["warrenty_start"].value;
    var warrenty_end = document.forms["SavesubProject"]["warrenty_end"].value;

    if (title != "" && descripe != "" && warrenty_start != "" && warrenty_end != "") {
        alert('Sub-Project Saved!');
        return true;
    }
}
/* ======================================================================================================= */

// add sub_project api
$('#SavesubProject').on('submit', function () {
    var title = $('#title').val();
    var descripe = $('#descripe').val();
    var warrenty_start = $('#warrenty_start').val();
    var warrenty_end = $('#warrenty_end').val();

    // input confirmation here

    saveyourSubProject(title, descripe, warrenty_start, warrenty_end);

    return false;
});

function saveyourSubProject(given_title, given_descripe, given_warrenty_start, given_warrenty_end) {
    var data = JSON.stringify({
        title: given_title,
        descripe: given_descripe,
        warrenty_start: given_warrenty_start,
        warrenty_end: given_warrenty_end
    });

    $.ajax({
        method: "POST",
        url: 'https://webdev.exabyte-eg.com/APIs/eTicketing/projects/{1}/{1}/{1}',
        data: data
    }).done(function (res) {
        if (res['user']) {
            var user = res['user'][0];
        } else {
            var type = res['type'];
            var msg = res['msg'];
            alert(type + "\n" + msg)
        }
    });
}
/* ======================================================================================================= */

// add fields
function add_fields_subProject() {
    document.getElementById("subProject").insertRow(-1).innerHTML = '<tr><td><input class="form-control" type="text" id="title" placeholder="Project Title" required></td><td><input style="width: 200px;" class="form-control" type="text" id="descripe" placeholder="Project description" required></td><td><input class="form-control" type="text" id="warrenty_start" placeholder="Warrenty Start" required></td><td><input class="form-control" type="text" id="warrenty_end" placeholder="Warrenty End" required></td><td><select name="Status" id="status"><option selected disabled>Choose here</option></select></td><td><input type="file" name="myFile"></td></tr>';
}
/* ======================================================================================================= */
/*
// Dealing with Tabs
$('.manage-switch li').click(function () {
    // Add Selected Class to active link
    $(this).addClass('selected').siblings().removeClass('selected');
    // Hide All Divs
    $('.cust_ticket_manages .manages-content .manage-content-1, .cust_ticket_manages .manages-content .manage-content-2, .cust_ticket_manages .manages-content .manage-content-3, .cust_ticket_manages .manages-content .manage-content-4, .cust_ticket_manages .manages-content .manage-content-5').hide();
    // Show All Divs connected with this link
    $('.' + $(this).data('class')).show();
});
*/
// need to conect the 3 tabels with each others ----> NEXT

// assign tickets
function assignTicket() {
    alert('you assigned this ticket to this employee.');
}

/* ======================================================================================================= */
