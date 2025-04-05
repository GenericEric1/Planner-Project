// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Step 2: Define Controller Functions
// This function constructs a SQL query to retrieve basic event information
// and sends the results as JSON.
const getAllEvents = (req, res) => {


    // Query 1 - a variation of query 1 from Phase II
    //Pulls all events for logged in user, this query is also implemented with various
    //order by statements to sort results by date, urgency, deadline, or event type.
    const query = `
    SELECT
    E.EventName AS EventName,
    DATE_FORMAT(e.StartDateID, '%Y-%m-%d') AS EventDate,
    ET.Name AS EventType,
    E.Location AS Location,
    E.Urgency AS Urgency,
    DATE_FORMAT(e.Deadline, '%Y-%m-%d') AS Deadline,
    E.EventNote AS Note
    FROM EVENT E
    JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
    JOIN USERS U on U.UserID = E.UserID
    WHERE U.LoggedIn = 1
    `;

    // Step 2.2: Execute the Query
    db.query(query, (err, results) => {
        if (err) {

        // Step 2.3: Handle Errors
        console.error('Error fetching events:', err);
        res.status(500).send('Error fetching events');
        } else {

        // Step 2.4: Send Results
        res.json(results); // Send as a JSON response
        }
    });
};

// This function constructs a SQL query to retrieve basic event information
// sorted by date and sends the results as JSON.
const getSortByStartDate = (req, res) => {

     //Extract Parameters
     const { SortBy } = req.query;

    // QUERY #1 SORT BY START DATE
    // Pulls event details sorted by date.
    const query = `
    SELECT
    E.EventName AS EventName,
    ET.Name AS EventType,
    DATE_FORMAT(e.StartDateID, '%Y-%m-%d') AS EventDate,
    E.Location AS Location,
    E.Urgency AS Urgency,
    DATE_FORMAT(e.Deadline, '%Y-%m-%d') AS Deadline,
    E.EventNote AS Note
    FROM EVENT E
    JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
    JOIN USERS U on U.UserID = E.UserID
    WHERE U.LoggedIn = 1
    ORDER BY STARTDATEID
    `;

    // Step 3.4: Execute the Query
    db.query(query, [SortBy], (err, results) => {
        if (err) {

            // Step 3.5: Handle Errors
            console.error('Error fetching sortBy details:', err);
            res.status(500).send('Error retrieving sortBy details');
        } else {

            // Step 3.6: Send Results
            res.json(results); // Send event details as JSON
        }
    });
};

// This function constructs a SQL query to retrieve basic event information
// sorted by urgency and sends the results as JSON.
const getSortByUrgency = (req, res) => {

    //Extract Parameters
    const { SortBy } = req.query;

   // QUERY #1 SORT BY URGENCY
   // Pulls events details sorted by urgency.
   const query = `
   SELECT
   E.EventName AS EventName,
   ET.Name AS EventType,
   DATE_FORMAT(e.StartDateID, '%Y-%m-%d') AS EventDate,
   E.Location AS Location,
   E.Urgency AS Urgency,
   DATE_FORMAT(e.Deadline, '%Y-%m-%d') AS Deadline,
   E.EventNote AS Note
   FROM EVENT E
   JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
   JOIN USERS U on U.UserID = E.UserID
   WHERE U.LoggedIn = 1
   ORDER BY Urgency DESC
   `;

   // Step 3.4: Execute the Query
   db.query(query, [SortBy], (err, results) => {
       if (err) {

           // Step 3.5: Handle Errors
           console.error('Error fetching sortBy details:', err);
           res.status(500).send('Error retrieving sortBy details');
       } else {

           // Step 3.6: Send Results
           res.json(results); // Send event details as JSON
       }
   });
};

// This function constructs a SQL query to retrieve basic event information
// sorted by deadline and sends the results as JSON.
const getSortByDeadline = (req, res) => {

    //Extract Parameters
    const { SortBy } = req.query;

   // QUERY #1 SORT BY DEADLINE
   // Pulls event details sorted by deadline.
   const query = `
   SELECT
   E.EventName AS EventName,
   ET.Name AS EventType,
   DATE_FORMAT(e.StartDateID, '%Y-%m-%d') AS EventDate,
   E.Location AS Location,
   E.Urgency AS Urgency,
   DATE_FORMAT(e.Deadline, '%Y-%m-%d') AS Deadline,
   E.EventNote AS Note
   FROM EVENT E
   JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
   JOIN USERS U on U.UserID = E.UserID
   WHERE U.LoggedIn = 1
   ORDER BY Deadline
   `;

   // Step 3.4: Execute the Query
   db.query(query, [SortBy], (err, results) => {
       if (err) {

           // Step 3.5: Handle Errors
           console.error('Error fetching sortBy details:', err);
           res.status(500).send('Error retrieving sortBy details');
       } else {

           // Step 3.6: Send Results
           res.json(results); // Send event details as JSON
       }
   });
};

// This function constructs a SQL query to retrieve basic event information
// sorted by event type and sends the results as JSON.
const getSortByEventType = (req, res) => {

    //Extract Parameters
    const { SortBy } = req.query;

   // QUERY #1 SORT BY EVENTTYPE
   // Pulls event details sorted by event type.
   const query = `
   SELECT
   E.EventName AS EventName,
   ET.Name AS EventType,
   DATE_FORMAT(e.StartDateID, '%Y-%m-%d') AS EventDate,
   E.Location AS Location,
   E.Urgency AS Urgency,
   DATE_FORMAT(e.Deadline, '%Y-%m-%d') AS Deadline,
   E.EventNote AS Note
   FROM EVENT E
   JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
   JOIN USERS U on U.UserID = E.UserID
   WHERE U.LoggedIn = 1
   ORDER BY ET.Name
   `;

   // Step 3.4: Execute the Query
   db.query(query, [SortBy], (err, results) => {
       if (err) {

           // Step 3.5: Handle Errors
           console.error('Error fetching sortBy details:', err);
           res.status(500).send('Error retrieving sortBy details');
       } else {

           // Step 3.6: Send Results
           res.json(results); // Send event details as JSON
       }
   });
};

// Step 4: Export the Controller Functions
// Export the functions so they can be used in server.js or other parts of the application.
module.exports = {
getAllEvents,
getSortByStartDate,
getSortByUrgency,
getSortByDeadline,
getSortByEventType,
};