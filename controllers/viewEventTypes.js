// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Step 2: Define Controller Functions
// This function constructs a SQL query to retrieve basic event type information
// and sends the results as JSON.
const getAllEventTypes = (req, res) => {

    //Query 5: (Variation of Query 9 from Phase II)
    //Pulls all event types of logged in user.
    const query = `
    SELECT DISTINCT
    ET.Name AS EventType,
    ET.Urgency AS Urgency,
    ET.Description AS Description
    FROM EVENT E
    JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
    JOIN USERS U on U.UserID = E.UserID
    WHERE U.LoggedIn = 1
    ORDER BY ET.Name;
    `;

    // Step 2.2: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

        // Step 2.3: Handle Errors
        console.error('Error fetching event types:', err);
        res.status(500).send('Error fetching event types');
        } else {

        // Step 2.4: Send Results
        res.json(results); // Send as a JSON response
        }
    });
};

// constructs a SQL query that pulls the number of events per event type.
const getEventsPerType = (req, res) => {

    //Query 6:
    //Pulls the number of events per event type for logged in user.
    const query = `
    SELECT
    ET.Name AS EventType,
    COUNT(E.EventID) AS NumberofEvents
    FROM EVENT E
    JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
    JOIN USERS U on U.UserID = E.UserID
    WHERE U.LoggedIn = 1
    GROUP BY ET.Name
    `;

    // Step 3.4: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

            // Step 3.5: Handle Errors
            console.error('Error fetching number of events per type:', err);
            res.status(500).send('Error retrieving number of events per type');
        } else {

            // Step 3.6: Send Results
            res.json(results); // Send event details as JSON
        }
    });
};

// Step 4: Export the Controller Functions
// Export the functions so they can be used in server.js or other parts of the application.
module.exports = {
getAllEventTypes,
getEventsPerType
};