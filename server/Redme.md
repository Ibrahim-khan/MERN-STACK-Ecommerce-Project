# E-commerce MERN Stack Project

- /test -> health check (D)
- /seed -> seeding some data(D)

- /api/users (D)

- POST /register -> create the user account (D)
- POST /activate -> activate the user account (D)
- GET /profile -> get the user account (D)
- DELETE /:id -> delete the user account (D)
- PUT /:id -> update the user account (D)
- PUT /update-password/:id(D) -> update the password
- POST /forget-password (D) -> forget the password
- PUT /reset-password (D) -> reset the password
- PUT - Admin /ban/:id (D) -> ban the user
- PUT - Admin /unban/:id (D) - unban the user
- GET - Admin /export-users (D) -> export all the users
- GET - Admin - /all-users -> get all users including search & pegination (D)

- /api/auth (JWT Auth)

- POST /login -> isLoggedOut -> user login (D)
- POST /login -> isLoggedIn -> usre logout (D)
- GET /refresh -> get refresh token (D)

Middleware

- isLoggedIn (D)
- isLoggedOut (D)
- isAdmin (D)
- uploadFile (D)
- getRefreshToken
- userValidation (D)
- runValidation (D)

- /api/categories (CRUD)

- POST / -> create the category (Admin)
- GET / -> get all the categories (Admin)
- GET /:id -> get single category (Admin)
- POST / -> create a category (Admin)
- DELETE /:id -> delete a category (Admin)
- PUT /:id -> update a category (Admin)

- /api/products (CRUD)

- POST / -> create the product (Admin)
- GET / -> get all the products
- GET /:id -> get single product
- POST / -> create a blog (Admin)
- DELETE /:id -> delete a product (Admin)
- PUT /:id -> update a product (Admin)

- /api/orders (CRUD)

- POST / -> create the order (User/Admin)
- GET / -> get the order (User/Admin)
- GET /all-orders -> get all the orders (Admin)
- DELETE /:id -> delete an order (Admin)

- /api/payment

- GET /token -> get the payment token (User/Admin)
- POST /process-payment -> process the payment (User/Admin)

- package that we will need

`npm install express cors http-errors multer body-parser bcrypt jsonwebtoken nodemailer cookie-parser`
`npm install --save-dev morgan nodemon`

2. Environment setup
3. Create express server -> express
4. HTTP request & response
5. nodemon and morgan package -> nodemon, morgan
6. API testing with Postman
7. Middleware & Types of Middleware
8. Express Error Handling Middleware -> body-parser
9. How to handle HTTP errors -> htt-errors
10. How to secure API -> xss-clean, express-rate-limit
11. Environment variable & .gitignore
12. MVC Architechture
13. connect to MongoDB database
14. Schema & Model for user
15. create seed route for testing
16. GET /api/users -> isAdmin -> getAllUsers ->
    searchByNAME + pagination functionality
17. responseHandler controller for error or success
18. GET /api/users/:id -> get a single user by id
19. How to create services in the backend
20. DELETE /api/users/:id -> delete a single user by id
21. Refactoring & reusability, dynamic
22. add express validator midleware
23. add multer middleware for file upload
24. POST /api/users -> create an user
25. PUT /api/users/:id -> update a single user by id
