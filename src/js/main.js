function logout() {
  const session = window.localStorage.getItem('eek-session');

  if (session) {
    window.localStorage.removeItem('eek-session');
  }
}

function updateNavbar() {
  const session = window.localStorage.getItem('eek-session');
  if (!session) {
    $('.js-logout').hide();
    $('.js-user-info').hide();
  } else {
    $('.js-login').hide();
    $('.js-user-info a').text(`Welcome, ${session}!`);
  }

  $('.js-logout').on('click', function(e) {
    logout();
    window.location.href = window.location.origin;
  });
}

$(document).ready(function() {
  // Load Navbar
  $.get('/components/_navbar.html', async (data) => {
    $('body').prepend(data);
    await updateNavbar();
  });

  $.get('/components/_footer.html', (data) => {
      $('.js-template-footer').after(data);
  });
});

