(function() {
    const session = JSON.parse(localStorage.getItem('apollo_session') || 'null');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!session && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    } else if (session && isLoginPage) {
        window.location.href = 'index.html';
        return;
    }

    const theme = JSON.parse(localStorage.getItem('apollo_theme') || '{}');
    if (theme && Object.keys(theme).length > 0) {
        applyTheme(theme);
    }

    function applyTheme(t) {
        const r = document.documentElement.style;
        if (t.apollo1) r.setProperty('--apollo-1', t.apollo1);
        if (t.apollo2) r.setProperty('--apollo-2', t.apollo2);
        if (t.apollo3) r.setProperty('--apollo-3', t.apollo3);
        if (t.bg) r.setProperty('--bg', t.bg);
        if (t.text) r.setProperty('--text', t.text);
    }
})();
