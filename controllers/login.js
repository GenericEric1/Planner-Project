const db = require('../dbConfig');

const loginUser = (req, res) => {

    const { email, password } = req.body;
    // Query to find the correct user with the given email/
    const findUserQuery = 'SELECT * FROM USERS WHERE Email = ?';

    // If able to find the correct user, set the LoggedIn attribute to 1
    const loginUserQuery = 'UPDATE USERS SET LOGGEDIN = 1 WHERE Email = ?';

    db.query(findUserQuery, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare passwords (ensure you hash passwords in real applications)
        if (password !== user.Password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        } else {
            // If credentials are correct, send success response log in user
            res.status(200).json({ success: true, message: 'Login successful' });

            // Log in user
            db.query(loginUserQuery, [email], (error, results) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Internal server error' });
                } else {
                    //res.json(results); // Send event details as JSON
                }
            })
        }
    });
};

module.exports = {
    loginUser
    };