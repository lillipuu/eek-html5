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
 * @param {string} email
 * @param {string} username
 * @param {string} password
 *
 * @returns {FormResponse}
 */
function register(email, username, password) {
  if (window.localStorage.getItem(`eek-email-${email}`)) {
    return {
      success: false,
      message: '<strong>Error!</strong> Email is already in use!',
    }
  }
  if (window.localStorage.getItem(`eek-username-${username}`)) {
    return {
      success: false,
      message: '<strong>Error!</strong> Username is already in use!',
    }
  }

  window.localStorage.setItem(`eek-email-${username}`, email);
  window.localStorage.setItem(`eek-username-${username}`, username);
  window.localStorage.setItem(`eek-password-${username}`, password);

  return {
    success: true,
    message: '',
  }
}

$(document).ready(function() {
  $('#js-eek-register-form').submit(function(e) {
    e.preventDefault();

    const email = $('#inputEmail').val();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    const response = register(email, username, password);

    if (response.success) {
      window.localStorage.setItem('eek-session', username);
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
