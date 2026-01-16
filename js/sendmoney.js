const form = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const sendMoneyBtn = document.getElementById('sendMoneyBtn');
const searchContact = document.getElementById('searchContact');
const autocompleteList = document.getElementById('autocompleteList');

let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Variable global para contacto seleccionado
window.contactoSeleccionado = null;

// Renderizar contactos con opción de filtro
function renderContactos(filtro = '') {
  contactList.innerHTML = '';

  contactos.forEach((contacto, index) => {
    const nombreCompleto = contacto.nombre.toLowerCase();
    const alias = contacto.alias.toLowerCase();
    const banco = contacto.banco.toLowerCase();

    if (!nombreCompleto.includes(filtro) && !alias.includes(filtro) && !banco.includes(filtro)) {
      return;
    }

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.style.cursor = 'pointer';

    li.innerHTML = `
      <strong>${contacto.nombre}</strong><br>
      CBU: ${contacto.cbu}<br>
      Alias: ${contacto.alias}<br>
      Banco: ${contacto.banco}
    `;

    li.addEventListener('click', () => {
      window.contactoSeleccionado = index;

      // Resaltar seleccionado
      document
        .querySelectorAll('#contactList li')
        .forEach((item) => item.classList.remove('active'));
      li.classList.add('active');

      // Autocompletar campo de búsqueda
      searchContact.value = contacto.nombre;

      // Ocultar autocompletado
      autocompleteList.innerHTML = '';
    });

    contactList.appendChild(li);
  });
}

// Guardar nuevo contacto
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoContacto = {
    nombre: document.getElementById('nombre').value,
    cbu: document.getElementById('cbu').value,
    alias: document.getElementById('alias').value,
    banco: document.getElementById('banco').value,
  };

  contactos.push(nuevoContacto);
  localStorage.setItem('contactos', JSON.stringify(contactos));

  window.contactoSeleccionado = null;
  form.reset();
  renderContactos(searchContact.value.toLowerCase());
});

// Filtrado y autocompletado
searchContact.addEventListener('input', () => {
  const filtro = searchContact.value.toLowerCase();
  renderContactos(filtro);

  // Autocompletado
  autocompleteList.innerHTML = '';
  if (filtro === '') return;

  contactos
    .filter((c) => c.nombre.toLowerCase().includes(filtro))
    .forEach((c) => {
      const li = document.createElement('li');
      li.textContent = c.nombre;
      li.addEventListener('click', () => {
        searchContact.value = c.nombre;
        window.contactoSeleccionado = contactos.indexOf(c);

        // Resaltar en la lista
        renderContactos(c.nombre.toLowerCase());

        autocompleteList.innerHTML = '';
      });
      autocompleteList.appendChild(li);
    });
});

// Ocultar autocompletado al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!searchContact.contains(e.target) && !autocompleteList.contains(e.target)) {
    autocompleteList.innerHTML = '';
  }
});

// Enviar dinero con validación de contacto
sendMoneyBtn.addEventListener('click', () => {
  const montoInput = document.getElementById('monto');
  const monto = parseFloat(montoInput.value);

  if (isNaN(monto) || monto <= 0) {
    alert('Ingrese un monto válido');
    return;
  }

  if (window.contactoSeleccionado === null) {
    alert('Debe seleccionar un contacto antes de ingresar el monto');
    montoInput.value = '';
    return;
  }

  const contacto = contactos[window.contactoSeleccionado];
  const nuevaTransaccion = {
    fecha: new Date().toLocaleString(),
    nombre: contacto.nombre,
    banco: contacto.banco,
    monto: monto.toFixed(2),
    tipo: 'Transferencia enviada',
  };

  transactions.push(nuevaTransaccion);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  alert('Transferencia realizada con éxito');
  montoInput.value = '';
  window.contactoSeleccionado = null;

  document.querySelectorAll('#contactList li').forEach((item) => item.classList.remove('active'));
});

// Render inicial
renderContactos();
