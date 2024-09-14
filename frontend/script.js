const apiUrl = 'http://localhost:3000';
let token = '';
let userRole = ''; // Hold the role of the logged-in user

// Register User
async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  });

  const result = await response.text();
  document.getElementById('response').innerText = result;
}

// Login User
async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();
  
  if (response.ok) {
    token = result.token; // Save the token
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
    userRole = decodedToken.role; // Save the user's role
    document.getElementById('response').innerText = `Logged in as ${userRole}. Token: ${token}`;
    
    // Display appropriate routes based on the user's role
    displayContentBasedOnRole();
  } else {
    document.getElementById('response').innerText = 'Login failed';
  }
}

// Access Public Route
async function getPublicRoute() {
  const response = await fetch(`${apiUrl}/routes/public`);
  const result = await response.text();
  document.getElementById('response').innerText = result;
}

// Access User Route
async function getUserRoute() {
    console.log('hiii') 
  const response = await fetch(`${apiUrl}/routes/user`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const result = await response.text();
  document.getElementById('response').innerText = result;
}

// Access Admin Route
async function getAdminRoute() {
  const response = await fetch(`${apiUrl}/routes/admin`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const result = await response.text();
  document.getElementById('response').innerText = result;
}

// Conditionally show/hide buttons based on user role
function displayContentBasedOnRole() {
  // Hide all buttons first
  document.getElementById('adminRouteButton').style.display = 'none';
  document.getElementById('userRouteButton').style.display = 'none';
  document.getElementById('publicRouteButton').style.display = 'none';

  // Show routes based on role
  if (userRole === 'Admin') {
    document.getElementById('adminRouteButton').style.display = 'block';
    document.getElementById('userRouteButton').style.display = 'block';
    document.getElementById('publicRouteButton').style.display = 'block';
    document.getElementById('response').innerText = 'Welcome Admin!';
  } else if (userRole === 'User') {
    document.getElementById('userRouteButton').style.display = 'block';
    document.getElementById('publicRouteButton').style.display = 'block';
    document.getElementById('response').innerText = 'Welcome User!';
  } else {
    document.getElementById('publicRouteButton').style.display = 'block';
    document.getElementById('response').innerText = 'Welcome Guest!';
  }
}
