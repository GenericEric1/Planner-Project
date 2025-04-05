// Step 1: Import Required Libraries
const express = require('express');
const app = express();

// Step 2: Import Controllers
const eventController = require('./controllers/viewEvents');
const todoController = require('./controllers/todolist');
const loginController = require('./controllers/login');
const registerAccountController = require('./controllers/registerAccount');
const indexController = require('./controllers/index');
const urgentEventsController = require('./controllers/viewUrgentEvents');
const holidayController = require('./controllers/holidays');
const eventTypesController = require('./controllers/viewEventTypes');
const remindersController = require('./controllers/viewReminders');
const addEventController = require('./controllers/addEvent')

// Step 3: Middleware Setup
// Use express.json() to parse incoming JSON requests.
// Use express.static() to serve static files from the 'public' directory.
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Step 4: Define Routes
app.post('/login', loginController.loginUser);
app.post('/login', (req, res) => {
    console.log('Route /login hit');
    console.log('Request body:', req.body);
    loginController.loginUser(req, res);
});
app.post('/registerAccount', registerAccountController.registerAccount);
app.post('/registerAccount', (req, res) => {
    console.log('Route /registerAccount hit');
    console.log('Request body:', req.body);
    registerAccountController.loginUser(req, res);
});

app.get('/viewEvents', eventController.getAllEvents);
app.get('/viewEvents/sortByStartDate', eventController.getSortByStartDate);
app.get('/viewEvents/sortByUrgency', eventController.getSortByUrgency);
app.get('/viewEvents/sortByDeadline', eventController.getSortByDeadline);
app.get('/viewEvents/sortByEventType', eventController.getSortByEventType);
app.get('/todolist', todoController.getAllEventsToday);
app.get('/todolist/eventname', todoController.sortTodaysEventName);
app.get('/todolist/deadline', todoController.sortTodaysEventDeadline);
app.get('/todolist/location', todoController.sortTodaysEventLocation);
app.get('/addEvent/load', addEventController.loadEventTypes);
app.post('/addEvent', addEventController.addEvent);
app.get('/index/loggedin', indexController.isUserLoggedIn);
app.get('/index/logout', indexController.logoutAllUsers);
app.get('/viewUrgentEvents', urgentEventsController.getEventsByUrgency);
app.get('/holidays', holidayController.getAllHolidays);
app.get('/holidays/holidayEventCount', holidayController.getHolidayEventCount);
app.get('/holidays/holidayEvents', holidayController.getEventsOnHolidays);
app.get('/viewEventTypes', eventTypesController.getAllEventTypes);
app.get('/viewEventTypes/eventsPerType', eventTypesController.getEventsPerType);
app.get('/viewReminders', remindersController.getAllReminders);

// Step 5: Start the Server
// Define the port the server will listen on,
// defaulting to 5000 if not specified in environment variables.
const PORT = process.env.PORT || 5000;
// Start the server and log a message indicating the URL.
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});