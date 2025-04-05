// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Step 2: Define Controller Functions
// This function constructs a SQL query to retrieve reminder details
// and sends the results as JSON.
const getAllReminders = (req, res) => {

    //Query  7: (Variation of Query 8 from Phase II)
    //Pulls all reminders for a logged in user.
    const query = `
    SELECT
    DATE_FORMAT(E.StartDateID, '%Y-%m-%d') as EventDate,
    E.EventName,
    N.NotificationMessage,
    N.ReminderFrequency
    FROM EVENT E
    JOIN NOTIFICATION N ON E.NotificationID = N.NotificationID
    JOIN USERS U ON E.UserID = U.UserID
    WHERE U.LOGGEDIN = 1;
    `;

    // Step 2.2: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

        // Step 2.3: Handle Errors
        console.error('Error fetching reminders:', err);
        res.status(500).send('Error fetching reminders');
        } else {

        // Step 2.4: Send Results
        res.json(results); // Send as a JSON response
        }
    });
};

// Step 4: Export the Controller Functions
// Export the functions so they can be used in server.js or other parts of the application.
module.exports = {
getAllReminders
};