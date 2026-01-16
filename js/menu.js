function redirigir(opcion) {
  const mensaje = document.getElementById('mensaje');

  mensaje.style.color = 'green';
  mensaje.textContent = 'Acceso correcto. Redirigiendo...';

  setTimeout(() => {
    if (opcion === 'depositar') {
      window.location.href = 'deposit.html';
    } else if (opcion === 'enviar') {
      window.location.href = 'sendmoney.html';
    } else if (opcion === 'movimientos') {
      window.location.href = 'transactions.html';
    }
  }, 1000);
}
