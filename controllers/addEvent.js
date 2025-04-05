// Step 1: Import Required Libraries
// Import the database configuration to interact with the MySQL database.
const db = require('../dbConfig');

// Pull all event types to populate the "event type" dropdown menu
const loadEventTypes = (req, res) => {
    const query = `
    SELECT Name, EventTypeID, Description
    FROM EVENTTYPE
    `;

    db.query(query, (err, results) => {
    if (err) {
    console.error('Error fetching event types:', err);
    res.status(500).send('Error fetching event types');
    } else {
    res.json(results); 
    }});
    };

// Add event into event table using user given data
const addEvent =  (req, res) => {
    let {eventName, startDate, endDate, freqStart, freqEnd, frequency, urgency, eventType, deadline, location, eventNote, notificationType, notificationTime, reminderFrequency, notificationMessage} = req.body;

    let completion = 0;

    const EventIDQuery = `
    SELECT MAX(EventID) as EventID
    FROM EVENT
    `
    // Generate next eventID by finding max eventID and adding 1
    db.query(EventIDQuery, (err, result) => {
        if (err) {
            console.error('Error fetching event ID:', err);
        }

        let EventID = result[0]?.EventID + 1;
        
        const CurrentUserQuery = `
            SELECT UserID 
            FROM USERS
            WHERE LoggedIn = 1
        `
        // Generate next userID by finding max userID and adding 1
        db.query(CurrentUserQuery, (err, result) => {

            let UserId = result[0]?.UserID

            const NotificationIDQuery = `
                SELECT MAX(NotificationID) as NotificationID
                FROM NOTIFICATION
            `
            // Generate next notificationID by finding max notificationID and adding 1
            db.query (NotificationIDQuery, (err,result) => {

                let NotificationID = result[0]?.NotificationID + 1;

                if (!notificationType || !notificationMessage || !notificationTime || !reminderFrequency) {
                    NotificationID = null;
                }

                const createNotificationQuery = `
                INSERT INTO NOTIFICATION (NotificationID, NotificationType, NotificationTime, ReminderFrequency, NotificationMessage)
                VALUES (?, ?, ?, ?, ?)
                `
                // Create special notification before creating an event
                db.query(createNotificationQuery, [NotificationID, notificationType, notificationTime, reminderFrequency, notificationMessage], (err,result) => {
                    const query = `
                INSERT INTO EVENT (EventID, eventName, startDateID, endDateID, frequencyStart, frequencyEnd, frequency, urgency, eventTypeID, deadline, location, completionstatus, eventNote, notificationID, UserID)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                //Checking for any data that clashes with constraints in database
                const isBefore2024 = (date) => {
                    const dateObject = new Date(date);
                    const year = dateObject.getFullYear();
                    return year >= 2024;
                }
                console.log(startDate);
                if (startDate && !isBefore2024(startDate)) {
                    return res.status(500).json({ success: false, message: 'Start date must be after the year 2023' });
                }
                
                if (endDate && !isBefore2024(endDate)) {
                    return res.status(500).json({ success: false, message: 'End date must be after the year 2023' });
                }
                
                if (freqStart && !isBefore2024(freqStart)) {
                    return res.status(500).json({ success: false, message: 'Frequency start must be after the year 2023' });
                }
                
                if (freqEnd && !isBefore2024(freqEnd)) {
                    return res.status(500).json({ success: false, message: 'Frequency end must be after the year 2023' });
                }
                
                if (deadline && !isBefore2024(deadline)) {
                    return res.status(500).json({ success: false, message: 'Deadline must be after the year 2023' });
                }
                
                const isBefore = (date1, date2) => {
                    const dateObject1 = new Date(date1);
                    const dateObject2 = new Date(date2);
                    return dateObject1 <= dateObject2;
                }
                
                const isWithin = (date, startDate, endDate) => {
                    const dateObject = new Date(date);
                    const startDateObject = new Date(startDate);
                    const endDateObject = new Date(endDate);
                    return dateObject >= startDateObject && dateObject <= endDateObject;
                }
                
                if (startDate && endDate && !isBefore(startDate, endDate)) {
                    return res.status(400).json({ success: false, message: 'End date of event must occur after the start date.' });
                }
                
                if (startDate && freqStart && !isBefore(startDate, freqStart)) {
                    return res.status(400).json({ success: false, message: 'Frequency must start after the start date.' });
                }
                
                if (freqStart && startDate && endDate !== null && !isWithin(freqStart, startDate, endDate)) {
                    return res.status(400).json({ success: false, message: 'Frequency start must occur within the event time frame.' });
                }
                
                if (freqEnd && startDate && endDate !== null && !isWithin(freqEnd, startDate, endDate)) {
                    return res.status(400).json({ success: false, message: 'Frequency end must occur within the event time frame.' });
                }
                
                if (startDate && deadline && !isBefore(startDate, deadline)) {
                    return res.status(400).json({ success: false, message: 'Deadline must occur after event starts.' });
                }
                
                if (freqStart && freqEnd && !isBefore(freqStart, freqEnd)) {
                    return res.status(400).json({ success: false, message: 'Frequency end date must occur after the frequency start date.' });
                }
                
                if (frequency < 0) {
                    return res.status(500).json({ success: false, message: 'Frequency must be greater than 1' });
                }

                if (urgency < 0) {
                    return res.status(500).json({ success: false, message: 'Urgency must be greater than 1' });
                }
                
                //Changes data from empty strings to null, query doesn't work without
                if (!startDate) {
                    startDate = null;
                }
                if (!endDate) {
                    endDate = null;
                }
                if (!freqStart) {
                    freqStart = null;
                }
                if (!freqEnd) {
                    freqEnd = null;
                }
                if (!frequency) {
                    frequency = null;
                }
                if (!urgency) {
                    urgency = null;
                }
                if (!eventType) {
                    eventType = null;
                }
                if (!deadline) {
                    deadline = null;
                }
                if (!location) {
                    location = null;
                }
                if (!eventNote) {
                    eventNote = null;
                }
                if (!notificationType) {
                    notificationType = null;
                }
                if (!notificationTime) {
                    notificationTime = null;
                }
                if (!reminderFrequency) {
                    reminderFrequency = null;
                }
                if (!notificationMessage) {
                    notificationMessage = null;
                }

                // Adding event using user generated data.
                db.query(query, [EventID, eventName, startDate, endDate, freqStart, freqEnd, frequency, urgency, eventType, deadline, location, completion, eventNote, NotificationID, UserId], (err, results) => {
                    if (err) {
                    console.error('Error adding event:', err);
                    return res.status(500).send('Error adding event');
                    } 
                    return res.status(200).json({ success: true, message: 'Event added successfully' });
                    });
                });
            });
        });   
    });
};

// Exporting controller functions
module.exports = {
    addEvent,
    loadEventTypes
    };
