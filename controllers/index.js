// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Step 2: Define Controller Functions
// This function constructs a SQL query to retreive all logged in users.
// and sends the results as JSON.
const isUserLoggedIn = (req, res) => {

    //Query 9:
    //Basic query for pulling all data of logged in users.
    const query = `
    SELECT *
    FROM USERS
    WHERE LOGGEDIN = 1
    `;

    // Step 2.2: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

        // Step 2.3: Handle Errors
        console.error('Error fetching if a user is logged in:', err);
        res.status(500).send('Error fetching if a user is logged in');
        } else {

        // Step 2.4: Send Results
        res.json(results); // Send as a JSON response
        }
    });
};

// Logs out all users
const logoutAllUsers = (req, res) => {

    //Basic query to logout all users
    const query = `
    UPDATE USERS SET LOGGEDIN = 0 WHERE LOGGEDIN = 1
    `;

    // Step 3.4: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

            // Step 3.5: Handle Errors
            console.error('Error logging out all users:', err);
            res.status(500).send('Error logging out all users');
        } else {

            // Step 3.6: Send Results
            res.json(results); // Send event details as JSON
        }
    });
};

// Step 4: Export the Controller Functions
// Export the functions so they can be used in server.js or other parts of the application.
module.exports = {
isUserLoggedIn,
logoutAllUsers
};