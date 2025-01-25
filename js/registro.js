document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email-registro').value;
    const password = document.getElementById('password-registro').value;

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
    });

    if (response.ok) {
        alert('Usuario registrado exitosamente');
        document.getElementById('registro-modal').classList.add('hidden');
    } else {
        alert('Error en el registro');
    }
    location.href = 'login.html';
});