// login.js

// ================================
// Elementos do DOM
// ================================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');

const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

const regUsername = document.getElementById('regUsername');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');

const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');

// ================================
// Funções Auxiliares
// ================================
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidUsername(username) {
  return username.length >= 3;
}

// ================================
// Troca entre Login e Registro
// ================================
showRegisterBtn.addEventListener('click', () => {
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  formTitle.textContent = 'Registrar';
});

showLoginBtn.addEventListener('click', () => {
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  formTitle.textContent = 'Login';
});

// ================================
// Eventos de Submit
// ================================

// MOCK: Usuário admin
const MOCK_USER = {
  username: 'admin123',
  password: 'admin123',
};

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!isValidUsername(username)) {
    alert('O nome de usuário deve ter pelo menos 3 caracteres.');
    return;
  }
  if (!isValidPassword(password)) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  // ================================
  // MOCK: Autenticação simples
  // ================================
  if (username === MOCK_USER.username && password === MOCK_USER.password) {
    window.location.href = 'dashboard.html';
  } else {
    // Usuário não encontrado -> mostra registro
    alert('Usuário não encontrado. Redirecionando para registro...');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.textContent = 'Registrar';
    // Preenche automaticamente o nome de usuário
    regUsername.value = username;
  }
});

// Registro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = regUsername.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!isValidUsername(username)) {
    alert('O nome de usuário deve ter pelo menos 3 caracteres.');
    return;
  }
  if (!isValidEmail(email)) {
    alert('Email inválido.');
    return;
  }
  if (!isValidPassword(password)) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  alert(`Usuário ${username} registrado com sucesso!\nRedirecionando para o Dashboard...`);
  window.location.href = 'dashboard.html';
});
