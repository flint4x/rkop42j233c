(function() {
    const session = JSON.parse(localStorage.getItem('apollo_session') || 'null');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!session && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (session && isLoginPage) {
        window.location.href = 'index.html';
    }
})();
