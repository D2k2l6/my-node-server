# My Node Server

This project is a simple Node.js server built using Express. It serves as a basic template for creating web applications with Node.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-node-server.git
   ```

2. Navigate to the project directory:
   ```
   cd my-node-server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

The server will start on the port specified in the `.env` file. You can access it at `http://localhost:<port>`.

## Environment Variables

This project uses a `.env` file to manage environment variables. Make sure to create a `.env` file in the root directory with the following content:

```
PORT=3000
```

You can change the `PORT` value to your desired port number.

## License

This project is licensed under the MIT License.