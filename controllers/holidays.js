// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Step 2: Define Controller Functions
// This function constructs a SQL query to retrieve basic holiday information
// and sends the results as JSON.
const getAllHolidays = (req, res) => {

    // Query 8:
    // Basic query to pull all holidays.
    // Step 2.1: Construct SQL Query
    const query = `
    SELECT  DATE_FORMAT(HOLIDAY.DATEOFHOLIDAY, '%Y-%m-%d') AS DATEOFHOLIDAY, HOLIDAYNAME, HOLIDAYTYPE
    FROM HOLIDAY
    `;

    // Step 2.2: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

        // Step 2.3: Handle Errors
        console.error('Error fetching holidays:', err);
        res.status(500).send('Error fetching holidays');
        } else {

        // Step 2.4: Send Results
        res.json(results); // Send as a JSON response
        }
    });
};

//constructs a SQL query to get number of events that fall on a holiday.
const getHolidayEventCount = (req, res) => {

    //Query 3: (Variation of Query 2 from Phase II).
    //Pulls number of events that fall on a holiday for logged in user.
    const query = `
    SELECT COUNT(E.EventName) AS "NumberofEventsCoincidingwithaHoliday"
    FROM EVENT E
    JOIN USERS U ON U.UserID = E.UserID
    WHERE U.LOGGEDIN = 1
    AND DATE(E.STARTDATEID)
    IN (SELECT DateOfHoliday FROM HOLIDAY);
    `;

    // Step 3.4: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

            // Step 3.5: Handle Errors
            console.error('Error fetching events on holiday count details:', err);
            res.status(500).send('Error retrieving events on holiday count details');
        } else {

            // Step 3.6: Send Results
            res.json(results); // Send event details as JSON
        }
    });
};


const getEventsOnHolidays = (req, res) => {

   // Query 4:
   // Pulls all events that fall on a holiday for logged in user.
   const query = `
    SELECT
    DATE_FORMAT(E.StartDateID, '%Y-%m-%d') AS "Date",
    E.EventName AS "EventName"
    FROM EVENT E
    JOIN USERS U ON U.UserID = E.UserID
    WHERE U.LOGGEDIN = 1
    AND DATE(E.STARTDATEID)
    IN (SELECT DateOfHoliday FROM HOLIDAY);
    `;

   // Step 3.4: Execute the Query
   db.query(query, (err, results) => {
       if (err) {

           // Step 3.5: Handle Errors
           console.error('Error fetching events on holidays:', err);
           res.status(500).send('Error fetching events on holidays');
       } else {

           // Step 3.6: Send Results
           res.json(results); // Send event details as JSON
       }
   });
};

// Step 4: Export the Controller Functions
// Export the functions so they can be used in server.js or other parts of the application.
module.exports = {
getAllHolidays,
getHolidayEventCount,
getEventsOnHolidays,
};