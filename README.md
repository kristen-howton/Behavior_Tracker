### Behavior Tracker

Behavior Tracker is a full stack web application that was built using Asp.Net with Entity Framework for the server side and React, JavaScript, reactstrap, and CSS for the client side. The app implements full CRUD functionality, and allows users to track activities and behaviors of children that they work with, so that the user can share that information with parents.

### API
The server side for Behavor Tracker is an API built in C# ASP.NET Core.

- Start this project in Visual Studio from the BehaviorTracker.sln file
- Using your NuGet Package Manager Console, run Update-Database to run the migraton
- Run your server from Visual Studio

### Client
The client side of Behavior tracker is a React App bootstrapped from create-react-app. From the command line, cd into the `client/src` directory. From here (with your api server is running) run `npm start` to spin up the client side


### Usage
1. Register a new user, user will automatically be logged into the application.
2. User with be presented with a screen that suggests that the user add activities.
3. Navigate to the Add activity link in the navbar.
4. Add activities, which have an activity, image url, and description. Once the activity is saved, the user will see it populate on the Activities page, which can be accessed via the Activities link of the navbar. The user can edit and delete the activity from this page.
5. Navigate to the Learners link in the navbar to add new learners. The user can add a learner's first and last name. Users can edit and delete learners.
6. Navigate to the Behaviors link in the navbar to to select a learner and add behaviors for the selected learner. These will populate below with the learner name and behavior. The user can edit and delete this information.
7. Navigate back to the Activities link in the navbar. Click on the "record" button to record the activity, behaviors, level of prompting, consequence, and any notes from the activity that you would want to share with parents. 
8. Navigate to the Report link in the navbar and select a learner. Reports will be populated in order by date with most recent reports on top. The user can further filter these reports by date by selecting a day using the datepicker.
9. While on the Report link in the navbar, the user can click on the activity link and see a description of the activity.
