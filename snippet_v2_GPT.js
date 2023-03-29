// Code von Chat GPT adaptiert
let is_admin_test;
let _3rd_party_cookie;

// translate date to correct format for userflow
var userflow_currentUserCreatedOn = new Date(currentUserCreatedOn * 1000).toISOString();
const uf_key = 'XXXXXX' // key for userflow req

$(document).ready(function () {
  //append userflow js script to head
  var uf_js = document.createElement('script')
  uf_js.src = 'https://js.getuserflow.com/userflow.js'
  uf_js.async = true
  document.head.appendChild(uf_js)
  console.log("userflow.js appended to head");

  // checks if user is logged in
  if ($('.dropdown-menu > #tl-myinfo-option').length === 1) {
    // appending of iFrame (Role dropdown element is available for all users) that will insert 3rd party cookie
    // Wait for X seconds before adding that event listener that calls the function above (X000 milliseconds)
    setTimeout(function() {
      // Execute the code after X seconds
      $('<iframe src="https://digital-medical-academy.github.io/3rdpartycookiecheck/start.html" style="display:none"></iframe>').appendTo('#tl-dropdown-roles');
      console.log("iFrame for 3rd Party Cookie Detection added");
    }, 2000);
    
    // check if user is admin
    if ($('.dropdown-menu > #tl-administrator-option').length === 1) {
      is_admin_test = true;
      console.log("is_admin:" + is_admin_test);
    } else {
      is_admin_test = false;
      console.log("is_admin:" + is_admin_test);
    }
    console.log("Check value of is_admin if statement check: " + is_admin_test);

    // init userflow
    uf_js.onload = function () {
      userflow.init(uf_key)
      console.log("Userflow initialized");
      userflow.identify(currentUserId, {
        name: currentUserName,
        email: currentUserEmail,
        signed_up_at: userflow_currentUserCreatedOn,
        device_type: window.innerWidth > 800 ? 'desktop' : 'mobile',
        is_admin: is_admin_test,
        firefox: navigator.userAgent.includes('Firefox'), //true or false
      })
      console.log("Userflow user identified");

      // define receiveMessage function here
      var receiveMessage = function (evt) {
        if (evt.data === 'MM:3PCunsupported') {
          console.log('third party cookies are not supported');
          _3rd_party_cookie = false;
          userflow.updateUser({
            third_party_cookie: _3rd_party_cookie
          });
          console.log("Userflow user updated, with 3 party cookie check result: " + _3rd_party_cookie);

        } else if (evt.data === 'MM:3PCsupported') {
          console.log('third party cookies are supported');
          _3rd_party_cookie = true;
          userflow.updateUser({
            third_party_cookie: _3rd_party_cookie
          });
          console.log("Userflow user updated, with 3 party cookie check result: " + _3rd_party_cookie);
        }
      };
      window.addEventListener("message", receiveMessage, false);
      console.log("Event listener added for message event.");

    }
  } else {
    console.log("user not logged in");
  }

});