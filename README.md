# E-commerce

### Basic E-commerce App Backend

This project is a simple backend for an e-commerce application built with **Node.js**, **Express.js**, and **MongoDB**. It includes features such as:

- **User Authentication**: Secure login and signup for both sellers and consumers.
- **Role-Based Access**: Separate functionalities for sellers and consumers.
- **Product Management**: Sellers can add, update, and delete their products.
- **Order Management**: Consumers can view products, place orders, and view their order history.
- **Data Validation**: Ensures data integrity for all inputs.
- **Error Handling**: Comprehensive error handling for better user experience.

### Features Implemented
- **Authentication & Authorization**: JSON Web Tokens (JWT) for secure access.
- **Product Listing**: Sellers can manage their inventory, while consumers can browse available products.
- **Order Placement**: Consumers can place orders, and the backend handles all necessary relationships.
- **MongoDB Integration**: Mongoose for schema design and database operations.

### Upcoming
- **Frontend Development**: Planning to build a modern, responsive frontend using React.
- **Additional Features**: Wishlist, reviews, and enhanced order tracking.

### Collaboration
This project was developed in collaboration with [Divesh Gaonkar](https://github.com/DiveshGaonkar99). 

### Installation and Setup
1. Clone the repository:  
   ```bash
   git clone https://github.com/AryanPachandi/Basic__E-commerce_app.git
   cd Basic__E-commerce_app
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:  
   ```
   MONGO_URL=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:  
   ```bash
   npm start
   ```

### Tech Stack
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  

Feel free to fork the project, create issues, or contribute! 🚀
