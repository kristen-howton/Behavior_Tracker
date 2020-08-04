### Behavior Tracker

Behavior Tracker is an Asp.Net MVC web app with Entity and Identity Frameworks styled with a bootstrap theme with full CRUD functionality that allows users to track activities, behaviors of children that they work with, so that the user can share that information with parents.

### Installation
In your terminal run git clone SSH KEY HERE

Open Visual Studio

Under the tools tab, open the NuGet Package Manager console and run Update-Database to run migrations

Build and run the application after migrations are complete

### Usage
1. Register a new user
2. User with be presented with a screen that suggest that they add activities
3. Navigate to the Add activity link in the navbar
4. Add activities, which have a activity, image url, and description. Once activity is saved, you will see it populate in your Activities link of the Nav bar
5. Navigate to the Learners link in the navbar to add new learners
6. Navigate to the Behaviors link in the navbar to to select a learner to add behaviors to
7. Go back to the Activities link in the navbar, click on the "record" button to record the activity, behaviors, level of prompting, consequence, and any notes from the activity. 
8. Navigate to the Report link in the navbar and select a learner and a report listed in order by date will be populated to share with the parent
9. While on the Report link in the nav bar, user can click on the activity link and see a description of the activity if the want to share this information with parents
