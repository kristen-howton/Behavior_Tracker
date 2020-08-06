### Behavior Tracker

Behavior Tracker is an full stack application that was built using Asp.Net web app with Entity Framework for the server side and React and JavaScript. App was styled with a bootstrap theme with full CRUD functionality that allows users to track activities, behaviors of children that they work with, so that the user can share that information with parents.

### Installation
In your terminal run git clone SSH KEY HERE

Open Visual Studio

Under the tools tab, open the NuGet Package Manager console and run Update-Database to run migrations

Build and run the application after migrations are complete

### Usage
1. Register a new user, user will automatically be logged into the application
2. User with be presented with a screen that suggest that they add activities
3. Navigate to the Add activity link in the navbar
4. Add activities, which have a activity, image url, and description. Once activity is saved, you will see it populate in your Activities link of the Nav bar. User can edit and delete this information.
5. Navigate to the Learners link in the navbar to add new learners. User can add learner's first and last name. Users can edit and delete learners.
6. Navigate to the Behaviors link in the navbar to to select a learner and add behaviors for that learner. These will populate below with the learner name and behavior. User can edit and delete this information.
7. Navigate back to the Activities link in the navbar, click on the "record" button to record the activity, behaviors, level of prompting, consequence, and any notes from the activity that you would want to share with parents 
8. Navigate to the Report link in the navbar and select a learner and a report listed in order by date will be populated with most recent reports on top. You can further filter these reports by date
9. While on the Report link in the nav bar, user can click on the activity link and see a description of the activity if the want to see this information
