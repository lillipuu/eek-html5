class AuthService {
  getSession() {
    return window.localStorage.getItem('eek-session');
  }

  setSession(username) {
    window.localStorage.setItem('eek-session', username);
  }

  getUsername(username) {
    return window.localStorage.getItem(`eek-username-${username}`);
  }

  setUsername(username) {
    window.localStorage.setItem(`eek-username-${username}`, username);
  }

  getPassword(username) {
    return window.localStorage.getItem(`eek-password-${username}`);
  }

  setPassword(username, password) {
    window.localStorage.setItem(`eek-password-${username}`, password);
  }

  getEmail(username) {
    return window.localStorage.getItem(`eek-email-${username}`);
  }

  setEmail(username, email) {
    window.localStorage.setItem(`eek-email-${username}`, email);
  }

  isLoggedIn() {
    return !!this.getSession();
  }

  /**
   *
   * @param string email
   * @param string username
   * @param string password
   */
  register(email, username, password) {
    if (window.localStorage.getItem(`eek-email-${email}`)) {
      return {
        success: false,
        errorMessage: 'Email is already in use!',
      }
    }
    if (window.localStorage.getItem(`eek-username-${username}`)) {
      return {
        success: false,
        errorMessage: 'Username is already in use!',
      }
    }

    this.setEmail(username, email);
    this.setUsername(username);
    this.setPassword(username, password);

    return {
      success: true,
      errorMessage: null,
    }
  }

  /**
   *
   * @param string username
   * @param string password
   */
  login(username, password) {
    const session = this.getSession();

    // Is user is already logged in, then there's no point trying to login again.
    if (session) {
      return;
    }

    const expectedUsername = this.getUsername(username);
    const expectedPassword = this.getPassword(username);

    if (username === expectedUsername && password === expectedPassword) {
      window.localStorage.setItem('eek-session', username);
    }

    return {
      success: true,
      errorMessage: null,
    }
  }

  logout() {
    const session = this.getSession();

    if (session) {
      window.localStorage.removeItem('eek-session');
    }
  }

  clearLocalStorage() {
    window.localStorage.clear();
  }
}

function updateUI(authService) {
  const session = authService.getSession();
  if (!session) {
    $('.js-logout').hide();
    $('.js-user-info').hide();
  } else {
    $('.js-login').hide();
    $('.js-user-info a').text(`Welcome, ${authService.getSession()}!`);
  }
}

$(document).ready(function() {
  const authService = new AuthService();
  // Load Navbar
  $.get('/components/_navbar.html', async (data) => {
    $('body').prepend(data);
    await updateUI(authService);
});

  $('#js-eek-login-form').submit(function(e) {
    e.preventDefault();

    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    const response = authService.login(username, password);

    if (response.success) {
      window.location.href = window.location.origin;
    }

    // @todo display error
  });

  $('#js-eek-register-form').submit(function(e) {
    e.preventDefault();

    const email = $('#inputEmail').val();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();

    const response = authService.register(email, username, password);

    if (response.success) {
      authService.setSession(username);
      window.location.href = window.location.origin;
    }

    // @todo display error
  });

  $('.js-logout').on('click', function(e) {
    authService.logout();
    window.location.href = window.location.origin;
  });
});

