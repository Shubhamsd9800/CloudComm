# CloudComm

**CloudComm** is a full-stack social media platform where users can share their thoughts, post content (including images), make friends, and explore many other features. The application is built using a modern tech stack to deliver a fast, responsive, and secure user experience.

## Features

- **User Authentication**: Secure sign-up and login using JSON Web Tokens (JWT) for authentication.
- **Create and Share Posts**: Users can create posts, including text and images.
- **Friendship Management**: Users can send friend requests, accept or decline them, and manage their friend list.
- **Real-Time Updates**: Posts and friend activities are updated in real-time.
- **Responsive UI**: A user-friendly and fully responsive interface designed with Material UI (MUI).
- **Secure Backend**: Robust backend API developed with Express and Node.js.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **MUI (Material-UI)**: React component library for building responsive and modern UIs.
- **Redux Toolkit**: State management for managing global state in the application.

### Backend
- **Express**: Web framework for Node.js to build RESTful APIs.
- **Node.js**: JavaScript runtime environment to run backend logic.
- **MongoDB**: NoSQL database for data storage.
- **JWT (JSON Web Tokens)**: For user authentication and session management.

## Installation and Setup

Follow these steps to set up the project locally:

### Frontend Setup:

1. **Navigate to the frontend directory:**
    ```bash
    cd client
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the React development server:**
    ```bash
    npm start
    ```

### Backend Setup:

1. **Navigate to the backend directory:**
    ```bash
    cd server
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file in the backend directory and add your environment variables:**
    ```plaintext
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the Express server:**
    ```bash
    npm run dev
    ```

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `PORT`: The port number for the backend server (default: 5000).
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.

## Usage

Once the application is set up and running, you can access it in your browser:

- Open your browser and navigate to `http://localhost:3000` for the frontend.
- The backend API will be running on `http://localhost:5000`.

## Project Structure

The repository is divided into two main parts:

- **client/**: Contains the frontend code built with React, MUI, and Redux Toolkit.
- **server/**: Contains the backend code developed with Express, Node.js, and MongoDB.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and create a pull request with your proposed changes.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [your.email@example.com](mailto:your.email@example.com).

---

Replace placeholders like `yourusername`, `your_mongodb_uri`, `your_jwt_secret`, and `your.email@example.com` with your actual details.
