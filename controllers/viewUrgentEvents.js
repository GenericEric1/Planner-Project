const db = require('../dbConfig');
/**
* The getEventsByUgency function in a Node.js application retrieves users events by
* urgency from a database and generates an HTML response for display.
* It uses the db.query method to execute a SQL query and handles errors.
*/
const getEventsByUrgency = (req, res) => {
    const urgency = req.query.urgency; // Get urgency from query parameter

    //Query 2 - a variation of query 7 from Phase II
    //Pulls all events of a user of an urgency of 3 or greater,
    //actual implementation is dynamic and uses ? for given number.
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
    WHERE U.LoggedIn = 1 AND E.Urgency >= ?
    ORDER BY E.Urgency DESC
    `;
    db.query(query, [urgency], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching events');
        }
        // Generate HTML response
        let html = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/cerulean/bootstrap.min.css">

            <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="index.html"><img src="https://i.imgur.com/VCBpsyR.png"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor04">
            <ul class="navbar-nav me-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">View</a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="viewEvents.html">All Events</a>
                  <a class="dropdown-item" href="holidays.html">Holidays</a>
                  <a class="dropdown-item" href="viewUrgentEvents.html">Urgent Events</a>
                  <a class="dropdown-item" href="viewEventTypes.html">Event Types</a>
                  <a class="dropdown-item" href="viewReminders.html">Reminders</a>
              </li>
                <li class="nav-item">
                    <a class="nav-link" href="todolist.html">To-Do List</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="addEvent.html">Add Event</a>
                </li>
            </ul>
              <a href="login.html"><button class="btn btn-secondary btn-lg" id = "loginButton" hidden = "true">Login</button></a>
              <button class="btn btn-secondary btn-lg" id = logoutButton hidden = "true">Logout</button>
          </div>
        </div>
    </nav>

            <div class="container mt-5">
                <h3>All Events of Urgency ${urgency} or Greater</h3>
        `;
        if (results.length === 0) {
            html += `<p>No events at that urgency or greater found.</p>`;
        } else {
            html += `
                <table class="table table-bordered table-striped">
                    <thead class="table-primary">
                        <tr>
                            <th>Event Date</th>
                            <th>Event Name</th>
                            <th>Event Type</th>
                            <th>Location</th>
                            <th>Deadline</th>
                            <th>Urgency</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            results.forEach(event => {
                if (event.Note === null) {
                    event.Note = '';
                }
                html += `
                    <tr>
                        <td>${event.EventDate}</td>
                        <td>${event.EventName}</td>
                        <td>${event.EventType}</td>
                        <td>${event.Location}</td>
                        <td>${event.Deadline}</td>
                        <td>${event.Urgency}</td>
                        <td>${event.Note}</td>
                    </tr>
                `;
            });
            html += `
                    </tbody>
                </table>
            `;
        }
        html += `
                <a href="/viewUrgentEvents.html" class="btn btn-primary mt-3">Back to Search</a>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

            <script>
                    document.addEventListener('DOMContentLoaded', async () => {
                    const loginButton = document.getElementById('loginButton');
                    const logoutButton = document.getElementById('logoutButton');
                    const getStartedButton = document.getElementById('getStartedButton');

                    try {
                        // Fetch if user is logged in
                        const response = await fetch(\`/index/loggedin\`); // Backend endpoint
                        const loggedInUsers = await response.json();
                        if (loggedInUsers.length > 0) {
                            logoutButton.hidden = false //if a user is logged in, show logout button
                            getStartedButton.hidden = true //hide get started button
                            } else {
                            loginButton.hidden = false //if no user, show login button
                            getStartedButton.hidden = false //show get started button
                            }
                        } catch (error) {
                        console.error('Error fetching if user is logged in:', error);
                        }

                    // Logout all users when logout button is pressed
                    logoutButton.addEventListener('click', async (event) => {
                        //logout all users
                        try {
                            //Send a request to the backend to fetch queries.
                            const response = await fetch(\`/index/logout\`);
                            const data = await response.json();
                            location.reload();
                            //display successful logout message
                            // <div class="alert alert-dismissible alert-success">
                            //   <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            //   You have successfully been logged out.
                            // </div>
                            console.log("users logged out")

                        } catch (error) {
                            console.error('Error logging out user:', error);
                        }
                    });
                });
            </script>
            <footer>
                <div class = "navbar bottom-fixed">
                    <div class="container text-center">
                        <p class="text-muted">MixViewPlanner © 2024</p>
                    </div>
                </div>
            </footer>
        `;

        res.send(html); // Send the generated HTML as the response
    });
};

/**
* module.exports enables parts of the code to be accessible outside the file.
*/
module.exports = {
    getEventsByUrgency,
};