# Secure HTTP Server with Input Validation

This project is a simple and secure HTTP server built with Node.js. It demonstrates how to:
- Implement HTTPS (TLS/SSL) encryption for secure communication.
- Validate user input (name, email, age) to ensure data integrity and security.
- Handle form submission and provide error messages for invalid input.
  
## Features:
- **HTTPS**: The server is secured with an SSL/TLS certificate to encrypt data transmission.
- **Input Validation**:
  - `name` must only contain alphabetic characters.
  - `email` must follow a valid email format.
  - `age` must be a number between 18 and 120.
- **Error Handling**: Provides clear error messages for invalid input.
  
## Requirements:
- Node.js (LTS version recommended)
- OpenSSL (for generating self-signed certificates)

## Installation & Setup:
```bash

1. Clone the repository:

git clone https://github.com/your-username/secure-http-server.git
cd secure-http-server

2. Install dependencies:
Make sure you have Node.js installed. If not, you can download it from Node.js.
npm install

3. Generate SSL certificates (Self-Signed for testing):
Use OpenSSL to generate SSL certificates:
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365

4. Run the server:
node server.js
The server will start running on https://localhost:3000.

5. Test the server:
Open your browser and navigate to:
https://localhost:3000/?name=Alice&email=alice@example.com&age=25
Valid input:
Response: "Secure Hello, Alice!"

Invalid input (e.g., non-alphabetic characters in name):
Response: "Invalid input: Name must only contain letters."

6. Security Warning:
Since the server uses a self-signed certificate, your browser will show a security warning. You can bypass this by:

Clicking Advanced.
Selecting Proceed to localhost.
