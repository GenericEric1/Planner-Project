// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Based on Query 2 from phase 2, uses today's date instead of holidays
// Pulls all events that are NOT completed and...
// where todays date is in between the start and end date
// OR the deadline is today or before
// All the querys below are the same, just changing the ordering
const getAllEventsToday = (req, res) => {
const query = `
SELECT e.EventName as EventName,
DATE_FORMAT(e.StartDateID, '%Y-%m-%d') as StartDate,
DATE_FORMAT(e.EndDateID, '%Y-%m-%d') as EndDate,
DATE_FORMAT(e.Deadline, '%Y-%m-%d') as Deadline,
e.Location as Location,
e.EventNote as EventNote,
DATEDIFF(e.EndDateID, e.StartDateID) as DaysBetween,
et.Name AS EventType
FROM EVENT e
JOIN USERS u ON e.UserID = u.UserID
JOIN EVENTTYPE et ON e.EventTypeID = et.EventTypeID
WHERE (CURDATE() BETWEEN DATE(e.StartDateID) AND DATE(e.EndDateID)
OR DATE(e.Deadline) <= CURDATE())
AND e.CompletionStatus = 0
AND u.LoggedIn = 1;
`;
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching today\'s events:', err);
res.status(500).send('Error fetching event list');
} else {
res.json(results); 
}
});
};

// Sorting today's events by event name
const sortTodaysEventName = (req, res) => {
const query = `
SELECT e.EventName as EventName,
DATE_FORMAT(e.StartDateID, '%Y-%m-%d') as StartDate,
DATE_FORMAT(e.EndDateID, '%Y-%m-%d') as EndDate,
DATE_FORMAT(e.Deadline, '%Y-%m-%d') as Deadline,
e.Location as Location,
e.EventNote as EventNote,
DATEDIFF(e.EndDateID, e.StartDateID) as DaysBetween,
et.Name AS EventType
FROM EVENT e
JOIN USERS u ON e.UserID = u.UserID
JOIN EVENTTYPE et ON e.EventTypeID = et.EventTypeID
WHERE (CURDATE() BETWEEN DATE(e.StartDateID) AND DATE(e.EndDateID)
OR DATE(e.Deadline) <= CURDATE())
AND e.CompletionStatus = 0
AND u.LoggedIn = 1
ORDER BY e.EventName;
`;
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching today\'s events:', err);
res.status(500).send('Error fetching event list');
} else {
res.json(results); 
}});
};

// Sorting today's events by deadline
const sortTodaysEventDeadline = (req, res) => {
const query = `
SELECT e.EventName as EventName,
DATE_FORMAT(e.StartDateID, '%Y-%m-%d') as StartDate,
DATE_FORMAT(e.EndDateID, '%Y-%m-%d') as EndDate,
DATE_FORMAT(e.Deadline, '%Y-%m-%d') as Deadline,
e.Location as Location,
e.EventNote as EventNote,
DATEDIFF(e.EndDateID, e.StartDateID) as DaysBetween,
et.Name AS EventType
FROM EVENT e
JOIN USERS u ON e.UserID = u.UserID
JOIN EVENTTYPE et ON e.EventTypeID = et.EventTypeID
WHERE (CURDATE() BETWEEN DATE(e.StartDateID) AND DATE(e.EndDateID)
OR DATE(e.Deadline) <= CURDATE())
AND e.CompletionStatus = 0
AND u.LoggedIn = 1
ORDER BY e.Deadline;
`;
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching today\'s events:', err);
res.status(500).send('Error fetching event list');
} else {
res.json(results); 
}});
};

// Sorting today's events by location
const sortTodaysEventLocation = (req, res) => {
const query = `
SELECT e.EventName as EventName,
DATE_FORMAT(e.StartDateID, '%Y-%m-%d') as StartDate,
DATE_FORMAT(e.EndDateID, '%Y-%m-%d') as EndDate,
DATE_FORMAT(e.Deadline, '%Y-%m-%d') as Deadline,
e.Location as Location,
e.EventNote as EventNote,
DATEDIFF(e.EndDateID, e.StartDateID) as DaysBetween,
et.Name AS EventType
FROM EVENT e
JOIN USERS u ON e.UserID = u.UserID
JOIN EVENTTYPE et ON e.EventTypeID = et.EventTypeID
WHERE (CURDATE() BETWEEN DATE(e.StartDateID) AND DATE(e.EndDateID)
OR DATE(e.Deadline) <= CURDATE())
AND e.CompletionStatus = 0
AND u.LoggedIn = 1
ORDER BY e.Location;
`;
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching today\'s events:', err);
res.status(500).send('Error fetching event list');
} else {
res.json(results); 
}});
};

// Exporting controller functions
module.exports = {
getAllEventsToday,
sortTodaysEventName,
sortTodaysEventDeadline,
sortTodaysEventLocation
};