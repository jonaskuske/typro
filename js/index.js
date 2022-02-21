'use strict';
/* global typroDB, google */
var currentUser; // reference to currently logged in user
// no jQM transitions
$(document).bind('mobileinit', () => {
  $.mobile.defaultPageTransition = 'none';
});
// move to home after displaying splash for 1.5s
setTimeout(() => {
  if ($.mobile.activePage[0].id === 'splash') $(':mobile-pagecontainer').pagecontainer('change', $('#home'));
}, 1500);
// deactivate right click
var rClick;
$(() => {
  $(this).bind('contextmenu', e => {
    if (!rClick) { e.preventDefault(); }
  });
});
// open panel on swipe
$(() => {
  $('#menu').enhanceWithin().panel();
  $(document).on('swiperight', () => {
    $('#menu').panel('open');
  });
});
// handle navigation from panel
$(document).on('click', '.menuHref', function (evt) {
  evt.preventDefault();
  $('#menu').panel('close');
  $(':mobile-pagecontainer').pagecontainer('change', $(evt.target.hash));
});
// prevent automatic deletion of data if possible
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then(granted => {
    if (granted) {
      // data won't get deleted
    }
  });
}
//
// logout and reset options on settings page
$(document).on('click touchstart', '#l_ja', () => {
  logout();
});
$(document).on('click touchstart', '#b_ja', () => {
  var transaction = typroDB.transaction('photos', 'readwrite');
  transaction.objectStore('photos').clear();
  transaction.oncomplete = () => {
    logout();
  };
});
// Google Maps auf contact page
$(document).on('pageinit', '#map-page', () => {
  var HS = new google.maps.LatLng(53.539973, 8.583219); // HS Bremerhaven
  drawMap(HS);
  function drawMap(HS) {
    var myOptions = {
      zoom: 15,
      center: HS,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($('#map-canvas')[0], myOptions);
    // Marker
    var marker = new google.maps.Marker({ // eslint-disable-line no-unused-vars
      position: HS,
      map: map,
      title: 'Hallo!'
    });
    google.maps.event.addListenerOnce(map, 'idle', () => {
      google.maps.event.trigger(map, 'resize'); // resize map once loaded
      map.setCenter(HS); // re-center again
    });
  }
});
//
// multiple user functionality (login/out)
const allUsers = [
  { 'username': 'admin', 'passwort': 'futura', 'img': 'admin.png', 'bg': 'bright' },
  { 'username': 'test', 'passwort': 'comicsans', 'img': 'test.png', 'bg': 'bright' },
  { 'username': 'darth vader', 'passwort': 'darkside', 'img': 'darth.png', 'bg': 'dark' },
  { 'username': 'Jonas', 'passwort': 'Serifen', 'img': 'jonas.jpg', 'bg': 'dark' }
];
// check login state when loading page
$(() => { logCheck('auto'); });
// let user press enter to continue login process
$(document).on('keypress', '#username', key => (key.which === 13) ? $('#passwort').focus() : '');
$(document).on('keypress', '#passwort', key => (key.which === 13) ? $('#loginBtn').click() : '');
// check and validate login data
function logCheck(mode) {
  let userEntry, passwortEntry;
  if (mode !== 'auto') {
    userEntry = $('#username').val();
    passwortEntry = $('#passwort').val();
  } else {
    userEntry = localStorage.getItem('username');
    passwortEntry = localStorage.getItem('passwort');
  }
  // iterates over user array to validate entry
  let loginSuccess = (() => {
    for (let i in allUsers) {
      if ((userEntry === allUsers[i].username && passwortEntry === allUsers[i].passwort) && storeUser(userEntry, passwortEntry)) {
        login(i);
        return true;
      }
    }
  })();
  if (!loginSuccess) {
    (mode !== 'auto') ? loginFeedback('nosuccess') : logout();
  } else if (mode !== 'auto') {
    loginFeedback('success');
  }
}
// save logged-in user to local storgae
function storeUser(user, passwort) {
  if (window.localStorage) {
    localStorage.setItem('username', user);
    localStorage.setItem('passwort', passwort);
    return true;
  } else {
    console.warn('Login nicht möglich, Local Storage nicht verfügbar!');
  }
}
// log in user: configure welcome msg + currentUser var
function login(user) {
  currentUser = allUsers[user].username;
  $('#pUser').text(`Hallo, ${currentUser}`);
  $('#user').css('background-image', `url(img/user/${allUsers[user].img})`);
  (allUsers[user].bg === 'dark') ? $('#pUser').addClass('darkUser') : $('#pUser').removeClass('darkUser');
}
// log out user: configure welcome msg, set currentUser var, delete data from local storage
function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('passwort');
  currentUser = 'noLogin';
  $('#pUser').text('Einloggen');
  $('#user').css('background-image', 'url(img/user/placeholder.png)');
  $('#pUser').removeClass('darkUser');
}
// feedback msg whether login successful or not
function loginFeedback(state) {
  if (state === 'success') {
    $('#loginFeedback').html('Erfolgreich eingeloggt: ' + currentUser);
    $('#menu').panel('open');
  } else {
    $('#loginFeedback').html('Falsche Nutzer-Passwort-Kombination!');
  }
  setTimeout(() => {
    $('#loginFeedback').empty();
  }, 1700);
}