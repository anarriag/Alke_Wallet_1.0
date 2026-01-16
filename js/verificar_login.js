document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que el formulario recargue la página

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const mensaje = document.getElementById('mensaje');

  // Credenciales válidas
  const emailCorrecto = 'clientes@alkewallet.com';
  const passwordCorrecta = '123';

  if (email === emailCorrecto && password === passwordCorrecta) {
    mensaje.style.color = 'green';
    mensaje.textContent = 'Acceso correcto. Redirigiendo...';

    // Redirigir al menú principal
    setTimeout(() => {
      window.location.href = 'menu.html';
    }, 1000);
  } else {
    mensaje.style.color = 'red';
    mensaje.textContent = 'Email o contraseña incorrectos';
  }
});
