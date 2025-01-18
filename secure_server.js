const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Load SSL certificates
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

// Validation functions
function validateName(name) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateAge(age) {
  const parsedAge = parseInt(age, 10);
  return Number.isInteger(parsedAge) && parsedAge >= 18 && parsedAge <= 120;
}

// Create the HTTPS server
const server = https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // Serve the HTML file for the root route
  if (pathname === '/') {
    if (!query.name && !query.email && !query.age) {
      // Serve the frontend HTML
      const filePath = path.join(__dirname, 'index.html');
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      });
    } else {
      // Handle the validation logic
      const { name, email, age } = query;
      let errors = [];

      if (!validateName(name)) {
        errors.push('Invalid name: Name must only contain letters.');
      }
      if (!validateEmail(email)) {
        errors.push('Invalid email: Please provide a valid email address.');
      }
      if (!validateAge(age)) {
        errors.push('Invalid age: Age must be a number between 18 and 120.');
      }

      if (errors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(errors.join('\n'));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Secure Hello, ${name}! Your email is ${email}, and you are ${age} years old.`);
      }
    }
  } else {
    // Handle 404 for any other route
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Secure server running at https://localhost:3000/');
});
