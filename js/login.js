document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
    let errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'index.html';
            window.location.href = redirectUrl;
        } else {
            errorMessage.textContent = 'Credenciales incorrectas';
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error al conectar con el servidor';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
});