/**
 * Apollo Auth Guard
 * Prevents unauthorized access by checking the localStorage session.
 */
(function() {
    const session = JSON.parse(localStorage.getItem('apollo_session') || 'null');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!session && !isLoginPage) {
        // Redirect to login if no session found
        window.location.href = 'login.html';
    } else if (session && isLoginPage) {
        // Optional: Redirect to home if already logged in and trying to access login page
        window.location.href = 'index.html';
    }
})();
