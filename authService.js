class AuthService {
  getSession() {
    return window.localStorage.getItem('eek-session');
  }

  setSession(username) {
    window.localStorage.setItem('eek-session', username);
  }

  getUsername() {
    return window.localStorage.getItem(`eek-username-${getSession()}`);
  }

  setUsername(username) {
    window.localStorage.setItem(`eek-username-${username}`, username);
  }

  getPassword() {
    return window.localStorage.getItem(`eek-password-${getSession()}`);
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
    const email = window.localStorage.getItem(`eek-email-${email}`);
    const username = window.localStorage.getItem(`eek-username-${username}`);
    if (email) {
      console.log('Email is already in use!');
      return;
    }
    if (username) {
      console.log('Username is alreadt in use!');
      return;
    }

    this.setEmail(username, email);
    this.setUsername(username);
    this.setPassword(username, password);
  }

  /**
   *
   * @param string username
   * @param string passwor
   */
  login(username, password) {
    const session = this.getSession();

    // Is user is already logged in, then there's no point trying to login again.
    if (session) {
      return;
    }

    const expectedUsername = this.getUsername();
    const expectedPassword = this.getPassword();

    if (username === expectedUsername && password === expectedPassword) {
      window.localStorage.setItem('eek-session', username);
    }
  }

  logout() {
    const session = this.getSession();

    if (session) {
      this.window.localStorage.removeItem('eek-session');
    }
  }

  clearLocalStorage() {
    window.localStorage.clear();
  }
}


const authService = new AuthService();
