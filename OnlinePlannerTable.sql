-- MixView Online Planner SQL Script

--
-- 	TCSS 445 Project - Phase II - Autumn '24
-- 	Amanda, Bindi, Eric, Kylie
--

-- **********************************************************************
-- Part A - SQL DDL Statements
-- **********************************************************************

DROP DATABASE IF EXISTS PLANNER;
CREATE DATABASE PLANNER;
USE PLANNER;

SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') AS formatted_date;
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS formatted_timestamp;


-- Event Type table stores information about what kind of
-- event type an event is. For example, is it a chore? Is it an
-- appointment? This table will be filled with user provided
-- entries as well as some default category types.

CREATE TABLE EVENTTYPE
	( EventTypeID    INT           	NOT NULL,
	  Name           VARCHAR(50),
	  Description 	 VARCHAR(50) 	DEFAULT 'No description provided',
	  Urgency        INT		DEFAULT 1,
	  PRIMARY KEY (EventTypeID));


-- 	Notification table stores the type of notifications there
-- 	are. Specifies what kind of notification (email, phone, etc.),
-- 	how frequent the notification is, etc.

CREATE TABLE NOTIFICATION
	( NotificationID	INT		NOT NULL,
	  NotificationType	INT,
	  NotificationTime	INT,
	  ReminderFrequency	INT,
	  NotificationMessage	VARCHAR(50)	DEFAULT 'Reminder',
	  PRIMARY KEY (NotificationID));


-- Holiday table stores all the holidays from the
-- upcoming year.

CREATE TABLE HOLIDAY
	( HolidayName	VARCHAR(50)	NOT NULL,
	  DateofHoliday	DATE,
	  Description	VARCHAR(50)	DEFAULT 'No description provided',
	  HolidayType	VARCHAR(20),
      EventTypeID   INT DEFAULT 0,
	  PRIMARY KEY (HolidayName),
      FOREIGN KEY (EventTypeID) REFERENCES EVENTTYPE(EventTypeID) ON DELETE CASCADE);


-- Users table stores information about the user.

CREATE TABLE USERS
	(UserID	INT		NOT NULL,
	  FirstName	VARCHAR(30)	NOT NULL,
	  LastName	VARCHAR(30)	NOT NULL,
	  Email		VARCHAR(30),
	  PhoneNumber	VARCHAR(14),
	  Password	VARCHAR(30)	NOT NULL,
      LoggedIn  TINYINT(1) DEFAULT 0,
	  PRIMARY KEY (UserID),
	  CONSTRAINT Validate_Email CHECK (Email LIKE '%@%'),
	  CONSTRAINT Validate_Password CHECK (LENGTH(Password) >= 10),
	  CONSTRAINT Validate_PhoneNumber CHECK (LENGTH(PhoneNumber) >= 10));


-- Event table stores information about all events. Stores
-- information about notification, event type, and users as
-- ID values.

CREATE TABLE EVENT
	(EventID             INT             NOT NULL,
  	  EventName          VARCHAR(50)     NOT NULL,
  	  StartDateID        TIMESTAMP       UNIQUE,
  	  EndDateID          TIMESTAMP       UNIQUE,
  	  FrequencyStart     DATE,
  	  FrequencyEnd       DATE,
  	  Frequency          INT,
      Urgency            INT,
	  EventTypeID        INT,
	  Deadline           DATE,
	  Location           VARCHAR(100)    DEFAULT 'TBD',
	  CompletionStatus   TINYINT(1)      DEFAULT 0,
	  EventNote          TEXT,
	  NotificationID     INT,
	  UserID             INT,
	  PRIMARY KEY (EventID),
	  FOREIGN KEY (NotificationID) REFERENCES NOTIFICATION (NotificationID) ON DELETE SET NULL,
	  FOREIGN KEY (UserID) REFERENCES USERS (UserID) ON DELETE CASCADE,
	  FOREIGN KEY (EventTypeID) REFERENCES EVENTTYPE(EventTypeID) ON DELETE SET NULL,
	  CONSTRAINT StartDateID_Check CHECK (YEAR(StartDateID) >= 2024),
	  CONSTRAINT EndDateID_Check CHECK (YEAR(EndDateID) >= 2024)
);

-- **********************************************************************
-- Part B - Sample Data
-- **********************************************************************

-- Sample Data for Users Table
INSERT INTO USERS VALUES (1, 'John', 'Smith', 'jsmith@gmail.com', '2531231234', 'jsJS123!@#', 1);
INSERT INTO USERS VALUES (2, 'Jane', 'Doe', 'jdoe@yahoo.com', '2534495625', 'jdJD123!@#', 0);
INSERT INTO USERS VALUES (3, 'Julie', 'Boyle', 'jboyle@gmail.com', '2068199140', 'jbJB123!@#', 0);
INSERT INTO USERS VALUES (4, 'Dexter', 'Wilkins', 'dwilkins@outlook.com', '2065079300', 'dwDW123!@#', 0);
INSERT INTO USERS VALUES (5, 'Katie', 'McCoy', 'kmccoy@gmail.com', '2532614168', 'kmKM123!@#', 0);
INSERT INTO USERS VALUES (6, 'Angela', 'Mosley', 'amosley@yahoo.com', '4255865467', 'amAM123!@#', 0);
INSERT INTO USERS VALUES (7, 'Jack', 'McClure', 'jmcclure@gmail.com', '4256889382', 'jmJM123!@#', 0);
INSERT INTO USERS VALUES (8, 'Jordan', 'Carlton', 'jcarlton@gmail.com', '2065119033', 'jcJC123!@#', 0);
INSERT INTO USERS VALUES (9, 'Charles', 'Haynes', 'chaynes@outlook.com', '4257215333', 'chCH123!@#', 0);
INSERT INTO USERS VALUES (10, 'Matthew', 'Wells', 'mwells@gmail.com', '3602159986', 'mwMW123!@#', 0);

-- Sample Data for Event Type Table
INSERT INTO EVENTTYPE VALUES (0, 'Holiday', 'Federal holidays and Observances', 1);
INSERT INTO EVENTTYPE VALUES (1, 'Meeting', 'Meeting someone or a friend', 1);
INSERT INTO EVENTTYPE VALUES (2, 'Appointment', 'Doctor Appointment', 2);
INSERT INTO EVENTTYPE VALUES (3, 'Appointment', 'Dentist Appointment', 2);
INSERT INTO EVENTTYPE VALUES (4, 'Chore', 'Cleaning bedroom', 1);
INSERT INTO EVENTTYPE VALUES (5, 'To-Do', 'Studying', 3);
INSERT INTO EVENTTYPE VALUES (6, 'Chore', 'Taking out trash', 1);
INSERT INTO EVENTTYPE VALUES (7, 'Hangout', 'Movie Night', 2);
INSERT INTO EVENTTYPE VALUES (8, 'Event', 'Gaming competition', 4);
INSERT INTO EVENTTYPE VALUES (9, 'Interview', 'Coding Interview', 5);
INSERT INTO EVENTTYPE VALUES (10, 'Get together', 'Family Reunion', 3);
INSERT INTO EVENTTYPE VALUES (11, 'Volunteer', 'Shelter, Church, etc.', 5);
INSERT INTO EVENTTYPE VALUES (12, 'Celebration', 'Parade, Party, etc.', 5);
INSERT INTO EVENTTYPE VALUES (13, 'Chore', 'Getting Groceries', 1);
INSERT INTO EVENTTYPE VALUES (14, 'Practice', 'Sports Practice', 3);

-- Sample Data for Holiday Table
INSERT INTO HOLIDAY VALUES ('Mothers Day', '2025-05-11', NULL, 'Observance', 0);
INSERT INTO HOLIDAY VALUES ('Memorial Day', '2025-05-26', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Fathers Day', '2025-06-15', NULL, 'Observance', 0);
INSERT INTO HOLIDAY VALUES ('Juneteenth National Independence Day', '2025-06-19', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Independence Day', '2025-07-04', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Labor Day', '2025-09-01', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Columbus Day', '2025-10-13', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Halloween', '2025-10-31', NULL, 'Observance', 0);
INSERT INTO HOLIDAY VALUES ('Veterans Day', '2025-11-11', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Thanksgiving Day', '2025-11-27', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('Christmas  Eve', '2025-12-24', NULL, 'Observance', 0);
INSERT INTO HOLIDAY VALUES ('Christmas Day', '2025-12-25', NULL, 'Federal', 0);
INSERT INTO HOLIDAY VALUES ('New Years Eve', '2025-12-31', NULL, 'Observance', 0);

-- Sample Data for Notification Table
INSERT INTO NOTIFICATION VALUES (1, 1, 8, 1, 'Meeting a friend');
INSERT INTO NOTIFICATION VALUES (2, 1, 10, 1, 'Physical Check Up');
INSERT INTO NOTIFICATION VALUES (3, 1, 9, 1, 'Contacts Appointment');
INSERT INTO NOTIFICATION VALUES (4, 1, 2, 3, 'Need to clean up the room');
INSERT INTO NOTIFICATION VALUES (5, 1, 12, 3, 'Study for upcoming exam!');
INSERT INTO NOTIFICATION VALUES (6, 1, 18, 3, 'Did you take out the trash yet?');
INSERT INTO NOTIFICATION VALUES (7, 1, 22, 2, 'Get ready for movie night!');
INSERT INTO NOTIFICATION VALUES (8, 1, 15, 2, 'Upcoming tournament for Tekken! Are you ready?');
INSERT INTO NOTIFICATION VALUES (9, 2, 13, 2, 'Coding interview');
INSERT INTO NOTIFICATION VALUES (10, 1, 12, 2, 'Family Reunion');
INSERT INTO NOTIFICATION VALUES (11, 1, 9, 2, 'Bring shoes and headgear');

-- Sample Data for Event Table
INSERT INTO EVENT VALUES (1, 'Meeting with Friend', '2025-01-09 10:00:00', '2025-01-09 11:30:00', '2025-01-09', '2025-01-09', 1,1,1,'2025-01-09', 'Park', 0, 'Meeting with friend at a nearby park', 1, 1);
INSERT INTO EVENT VALUES (2, 'Doctor Appointment', '2025-03-24 13:00:00', '2025-03-24 15:00:00', '2025-03-24', '2025-03-24', 1,1,2,'2025-03-24', 'Tacoma', 0, 'Yearly checkup', 2, 10);
INSERT INTO EVENT VALUES (3, 'Eye Appointment', '2025-10-25 7:30:00', '2025-10-25 8:30:00', '2025-10-25', '2025-10-25', 1,1,3,'2025-10-25', 'Tacoma', 0, 'Only once', 3, 2);
INSERT INTO EVENT VALUES (4, 'Cleanup Apartment', '2025-11-01 0:00:00', '2025-11-01 23:59:59', '2025-11-01', '2025-11-02', 1,1,4,'2025-11-02', 'Tacoma', 0, 'Clean apartment every week', 4, 9);
INSERT INTO EVENT VALUES (5, 'Upcoming Exam', '2025-11-11 0:00:00', '2025-11-11 23:59:59', '2025-11-11', '2025-11-12', 1,1,5,'2025-11-12', 'UW Tacoma', 0, 'Upcoming exam.', 5, 3);
INSERT INTO EVENT VALUES (6, 'Taking out trash', '2025-11-21 0:00:00', '2025-11-21 23:59:59', '2025-11-21', '2025-11-22', 1,1,6,'2025-11-22', 'UW Tacoma', 0, 'Reminder to take out trash.', 6, 8);
INSERT INTO EVENT VALUES (7, 'Movie Night!', '2025-11-02 22:30:00', '2025-11-03 00:30:00', '2025-11-02', '2025-11-03', 1,1,7,'2025-11-03', 'Tacoma', 0, 'Watching Terrifier 3!', 7, 4);
INSERT INTO EVENT VALUES (8, 'Gaming tournament', '2025-11-08 17:00:00', '2025-11-08 22:00:00', '2025-11-08', '2025-11-08', 1,1,8,'2025-11-08', 'Ellensburg', 0, 'Tekken 8 tournament', 8, 7);
INSERT INTO EVENT VALUES (9, 'Coding interview', '2025-11-28 11:00:00', '2025-11-28 13:00:00', '2025-11-28', '2025-11-28', 1,1,9,'2025-11-28', 'Apartment', 0, 'Virtual Interview', 9, 5);
INSERT INTO EVENT VALUES (10, 'Family Reunion', '2025-05-23 12:00:00', '2025-05-28 12:00:00', '2025-05-23', '2025-05-28', 1,1,10,'2025-05-28', 'California', 0, 'Family Reunion', 10, 6);
INSERT INTO EVENT VALUES (11, 'Volunteer at Food Shelter', '2025-12-25 10:00:00', '2025-12-25 15:30:00', '2025-12-25', '2025-12-25', 1,5,11,'2025-01-09', 'Park', 0, NULL, NULL, 1);
INSERT INTO EVENT VALUES (12, 'Veterans Day Parade', '2025-11-11 13:00:00', '2025-11-11 15:00:00', NULL, NULL, 1,5,12,'2025-11-11', 'Tacoma', 0, NULL, NULL, 1);
INSERT INTO EVENT VALUES (13, 'Dinner', '2025-02-14 17:30:00', '2025-02-14 18:30:00', NULL, NULL, 1,1,1,'2025-02-14', 'El Gaucho', 0, 'Buy Flowers!', NULL, 1);
INSERT INTO EVENT VALUES (14, 'Buy Thanksgiving Groceries', '2025-11-10 0:00:00', '2025-11-10 23:59:59', NULL, NULL, 1,1,13,'2025-11-26', 'Fred Meyers', 0, NULL, NULL, 1);
INSERT INTO EVENT VALUES (15, 'Owens Wrestling Practice', '2025-11-01 18:00:00', '2025-11-11 19:15:00', '2025-11-01', '2025-01-01', 1,3,14, '2025-01-01', 'Wicker Gym', 0, 'Bring shoes and headgear', 11, 1);



-- **********************************************************************
-- Part C - Queries
-- **********************************************************************

-- Query 1: (Variation of Query 1 from Phase II)
-- Pulls all events for logged in user,
-- this query is also implemented with various order by statements to
-- sort results by date, urgency, deadline, or event type.

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
ORDER BY STARTDATEID;

-- Query 2: (Variation of Query 7 from Phase II)
-- Pulls all events of a user of an urgency of 3 or greater,
-- actual implementation is dynamic and uses ? for given number.

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
WHERE U.LoggedIn = 1 AND E.Urgency >= 3
ORDER BY E.Urgency DESC;

-- Query 3: (Variation of Query 2 from Phase II).
-- Pulls number of events that fall on a holiday for logged in user.

SELECT COUNT(E.EventName) AS "NumberofEventsCoincidingwithaHoliday"
FROM EVENT E
JOIN USERS U ON U.UserID = E.UserID
WHERE U.LOGGEDIN = 1
AND DATE(E.STARTDATEID)
IN (SELECT DateOfHoliday FROM HOLIDAY);

-- Query 4:
-- Pulls all events that fall on a holiday for logged in user.

SELECT
DATE_FORMAT(E.StartDateID, '%Y-%m-%d') AS "Date",
E.EventName AS "EventName"
FROM EVENT E
JOIN USERS U ON U.UserID = E.UserID
WHERE U.LOGGEDIN = 1
AND DATE(E.STARTDATEID)
IN (SELECT DateOfHoliday FROM HOLIDAY);

-- Query 5: (Variation of Query 9 from Phase II)
-- Pulls all event types of logged in user.

SELECT DISTINCT
ET.Name AS EventType,
ET.Urgency AS Urgency,
ET.Description AS Description
FROM EVENT E
JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
JOIN USERS U on U.UserID = E.UserID
WHERE U.LoggedIn = 1
ORDER BY ET.Name;

-- Query 6:
-- Pulls the number of events per event type for logged in user.

SELECT
ET.Name AS EventType,
COUNT(E.EventID) AS NumberofEvents
FROM EVENT E
JOIN EVENTTYPE ET ON E.EventTypeID = ET.EventTypeID
JOIN USERS U on U.UserID = E.UserID
WHERE U.LoggedIn = 1
GROUP BY ET.Name;

-- Query  7: (Variation of Query 8 from Phase II)
-- Pulls all reminders for a logged in user.

SELECT
DATE_FORMAT(E.StartDateID, '%Y-%m-%d') as EventDate,
E.EventName,
N.NotificationMessage,
N.ReminderFrequency
FROM EVENT E
JOIN NOTIFICATION N ON E.NotificationID = N.NotificationID
JOIN USERS U ON E.UserID = U.UserID
WHERE U.LOGGEDIN = 1;

-- Query 8:
-- Basic query to pull all holidays.

SELECT  DATE_FORMAT(HOLIDAY.DATEOFHOLIDAY, '%Y-%m-%d') AS DATEOFHOLIDAY,
HOLIDAYNAME, HOLIDAYTYPE
FROM HOLIDAY;

-- Query 9:
-- Basic query for pulling all data of logged in users.

SELECT *
FROM USERS
WHERE LOGGEDIN = 1;

-- Query 10:
-- Basic query for pulling the a users email to authorize login, actual query used utilizes ? for dynamic implementation for given email

SELECT *
FROM USERS
WHERE Email = 'jsmith@gmail.com';

-- Query 11:
-- Pulls relevant event data for the currently logged-in user where the event is not completed and the date of the event is currently occurring or the due date is today or earlier. This query is used multiple times with different OrderBy statements

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

-- Query 12:
-- Pulls all relevant event type data, used to populate the event type drop-down menu.

SELECT Name, EventTypeID, Description
FROM EVENTTYPE;

-- Query 13:
-- Pulls the max eventID to create the next eventID

SELECT MAX(EventID) as EventID
FROM EVENT;

-- Query 14:
-- Pulls the current user’s UserID

SELECT UserID
FROM USERS
WHERE LoggedIn = 1;

-- Query 15:
-- Pulls the max notificationID to create the next notificationID.

SELECT MAX(NotificationID) as NotificationID
FROM NOTIFICATION;

-- Query 16:
-- Creates a new notification.
-- Inside the values would be a ? to represent that it is supposed to be executed during runtime.

INSERT INTO NOTIFICATION (NotificationID, NotificationType, NotificationTime, ReminderFrequency, NotificationMessage)
VALUES (12, 1, 1, 1, 'Temporary notification message');
DELETE FROM NOTIFICATION WHERE NotificationID = 11;

-- Query 17:
-- Creates a new event.
-- Inside the values would be a ? to represent that it is supposed to be executed during runtime.

 INSERT INTO EVENT (EventID, eventName, startDateID, endDateID, frequencyStart, frequencyEnd, frequency, urgency, eventTypeID, deadline, location, completionstatus, eventNote, notificationID, UserID)
 VALUES (16, 'TempEvent', '2025-01-19 10:00:00', '2025-01-19 11:30:00', '2025-01-19', '2025-01-19', 1,1,1,'2025-01-19', 'Park', 0, 'Meeting with friend at a nearby park', 1, 1);
DELETE FROM EVENT WHERE EventId = 16;

-- Query 18:
-- Creates a new user.
-- Inside the values would be a ? to represent that it is supposed to be executed during runtime.

INSERT INTO USERS (UserID, firstname, lastName, email, phoneNumber, password, LoggedIn)
VALUES (11, 'Temporary', 'Value', 'tempValue@gmail.com', 1234567890, 'tempValuePassword', 1);
DELETE FROM USERS WHERE UserID = 11;