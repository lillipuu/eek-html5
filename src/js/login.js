/**
 * @typedef FormResponse
 * @type {Object}
 * @property {boolean} success
 * @property {string}  message
 */
function response(success, message) {
  return {
    success: success,
    message: message,
  }
}

/**
 * @param string username
 * @param string password
 *
 * @returns {FormResponse}
 */
function login(username, password) {
  const session = window.localStorage.getItem('eek-session');

  // Is user is already logged in, then there's no point trying to login again.
  if (session) {
    return;
  }

  const expectedUsername = window.localStorage.getItem(`eek-username-${username}`);
  const expectedPassword = window.localStorage.getItem(`eek-password-${username}`);

  if (username === expectedUsername && password === expectedPassword) {
    window.localStorage.setItem('eek-session', username);

    return {
      success: true,
      message: '',
    }
  }

  return {
    success: false,
    message: '<strong>Error!</strong> Invalid username or password!',
  }
}

$(document).ready(function() {
  $('#js-eek-login-form').submit(function(e) {
    // Prevent page from refreshing.
    e.preventDefault();

    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    const response = login(username, password);

    if (response.success) {
      window.location.href = window.location.origin;
      return;
    }

    // Fill alert message and make it visible.
    $('#js-alert span').html(response.message);
    $('#js-alert').toggleClass("d-none");
  });

  $('#js-alert-hide-btn').click((e) => {
    // Make alert invisible.
    $('#js-alert').toggleClass('d-none');
  });
});
