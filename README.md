```markdown
# E-commerce Application

This repository contains the code for a simple e-commerce application built with Express.js, MongoDB, and other technologies. The application allows users to add, remove, and view products, as well as manage user accounts and cart data.

## Features

- **Product Management**: Add, remove, and view products.
- **User Authentication**: Register, login, and manage user sessions.
- **Cart Management**: Add items to cart, view cart data, and remove items from cart.
- **Image Upload**: Upload product images and serve them statically.

## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies.

   ```bash
   npm install
   ```

3. **Start the Server**: Run the application.

   ```bash
   npm start
   ```

   The application will start on port 4000.

## API Endpoints

- **GET /**: Check if the server is running.
- **POST /addproduct**: Add a new product.
- **POST /removeproducts**: Remove a product by ID.
- **GET /allproducts**: Fetch all products.
- **POST /signup**: Register a new user.
- **POST /login**: Login an existing user.
- **GET /newcollections**: Fetch new collections of products.
- **GET /popularinwomen**: Fetch popular products in the women category.
- **POST /addtocart**: Add an item to the user's cart.
- **POST /getcart**: Get the user's cart data.
- **POST /removefromcart**: Remove an item from the user's cart.
- **POST /upload**: Upload a product image.

## Technologies Used

- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing product and user data.
- **Mongoose**: MongoDB object modeling tool.
- **JSON Web Token (JWT)**: For user authentication and session management.
- **Multer**: Middleware for handling `multipart/form-data`, used for uploading files.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Contributing

Contributions are welcome. Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
```
