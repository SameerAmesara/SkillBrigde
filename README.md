# Assignment 3

- _Date Created_: 01 April 2024
- _Last Modification Date_: 03 April 2024
- _GitLab Project branches Sameer Amesara_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Sameer_Amesara_B00961209?ref_type=heads>
- _GitLab Group Project Repository URL_: <https://git.cs.dal.ca/jhawer/csci-5709>
- _Netlify URL_: <https://cs5709-group11.netlify.app>

## Authors

- [Sameer Sanjay Amesara (B00961209)](sm527221@dal.ca)

## Feature : Mentorship

In this feature, the user can connect with a mentor who is an expert in their field of interest and ask questions to get clarity on a given topic and can seek their guidance in order to excel in their career. There are mainly 3 tasks in this feature:

1. Find Mentor
2. Apply as a Mentor
3. Rate a Mentor

## How to access

Steps to Access the Feature:

- email: iamsameer@gmail.com
- pass: Pass@123

### Find a Mentor

1. Open the deployment link: <https://cs5709-group11.netlify.app>
2. Login or Create a new user.
3. Go to Mentorship either by following the link: <https://cs5709-group11.netlify.app/mentors> or click on "Mentorship" from the navigation bar.
4. It will display "Find a Mentor" Task, which will display a list of Mentors in the database and an option to view details about them using the "View Details" Button.
5. When clicked on "View Details", users will redirected to the Profile of the Mentor which displays more details about them.
6. Users can also filter the mentors as per their requirements on Area of Expertise, name, Ratings etc. using the Filter options on "Find Mentor" Page.

### Apply as a Mentor

1. To see "Apply as a Mentor" Task, go to Apply Mentor either by following the link: <https://cs5709-group11.netlify.app/applymentor> or click on the "Become a Mentor" button on the "Find Mentor" Page.
2. Here, the users can fill out the mentor application form and can click on Register Button to register them as a mentor on our portal.
3. After all the required validation checks, the data is successfully stored in the database and the "Find Mentor" page is updated with the new mentor.

### Rate a Mentor

1. To see the "Rate Mentor" Task, you need to be logged in and should have at least one mentorship session booked with any mentor. (You need to create a Booking for Mentorship Session from the MentorProfile page).
2. Open the link: <https://cs5709-group11.netlify.app/bookings>
3. Click on "Rate Mentor" Button to open the "Rate Mentor" Page.
4. The users would see a Rating form for rating the mentor on given 5 criterias. On submitting the ratings, the ratings for the Mentor would be updated in the Database.

## Folders Created

- frontend\src\pages\mentorship
- frontend\src\components\AvailabilityComponent
- frontend\src\components\MentorList
- frontend\src\components\MentorCard
- frontend\src\components\MentorSearchFilter
- frontend\src\components\RatingTable
- frontend\src\utils\MentorFormValidations.ts
- backend\src\models\mentor.ts
- backend\src\routes\mentor.ts
- backend\src\services\mentorService.ts

## Deployment

### Frontend

To deploy the project environment, We have used Netlify. The steps we followed for the deployment are as follows:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Netlify account using GitHub credentials.
3. Chose the repository to be deployed.
4. Set up the site configurations, including naming the site, among other settings.
5. Initiated the site deployment by clicking on the "Deploy site" button. The site went live in just a few minutes. Links to both the source code and the live site are provided above.

Note: We ensured that the code is properly pushed to the GitHub repository before proceeding with the Netlify deployment.

### Backend

To deploy the project environment, We have used Render. The steps we followed for the deployment are as follows:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Render account using GitHub credentials.
3. Selected the repository we want to deploy.
4. Configured the site settings, such as providing a name for the site, etc.
5. Clicked on the "Deploy site" button. The site was deployed within a few minutes. The link to the code and the deployed site is also provided above.

Note: We ensured that the code is properly pushed to the GitHub repository before proceeding with the Render deployment.

## End-to-End Test

- List of Mentors is displayed: When the user click on "Mentorship" in navigation bar, the list of all available mentors is displayed.
- User is registered as Mentor: After filling out the Form on "Apply Mentor" page, the data is stored successfully to the database and List of mentors is updated.
- Ratings of Given mentor are updated: After submitting the ratings form with valid inputs, the ratings of the Mentors are updated as expected in the database and updated ratings can also be seen on the "Find Mentor" page.

## Built With

- [Node.js](https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app.
- [React](https://react.dev/learn/installation) - For building the user interface for the app.
- [Material-UI](https://mui.com/getting-started/installation/) - To improve the user interface (UI) of the application by using the UI components provided by Material-UI.
- [Postman](https://www.postman.com/downloads/) - Testing was done by using Postman.

## Attributions

- [Randomuser](https://randomuser.me/) - Used for generating random user images based on the gender selected when applying as a Mentor.
