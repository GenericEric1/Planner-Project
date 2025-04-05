const db = require('../dbConfig');

// Function to check if a UserID already exists in the database
function checkUserIDExists(userID, callback) {
    const checkQuery = 'SELECT UserID FROM USERS WHERE UserID = ?';
    db.query(checkQuery, [userID], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.length > 0);
        }
    });
}

const registerAccount =  (req, res) => {

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Query that checks the given email of the user registrating.
    const checkEmailQuery = 'SELECT * FROM USERS WHERE Email = ?';

    db.query(checkEmailQuery, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // If the email already exists, respond with an error
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        let userID = Math.floor(Math.random() * 1000000);

        // If the email is unique, insert the new user into the database
        const insertAccountQuery = `
            INSERT INTO USERS (UserID, firstName, lastName, email, phoneNumber, password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(insertAccountQuery, [userID, firstName, lastName, email, phoneNumber, password], (error, results) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }
            res.status(200).json({ success: true, message: 'Account registered successfully' });
        });
    });
};

module.exports = {
    registerAccount
    };