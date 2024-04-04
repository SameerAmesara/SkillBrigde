# Project Proposal

SkillBridge is a central hub for individuals to cultivate and showcase their professional identities, fostering dynamic platforms for career growth and collaboration. The application enables users to create comprehensive profiles, highlighting skills, work history, and accomplishments, facilitating meaningful networking opportunities.

- _Date Created_: 27 February 2024
- _Last Modification Date_: 28 February 2024
- _GitLab Project branch Drashti Navadiya_: https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Drashti_Navadiya_B00948838?ref_type=heads
- _Deployed application URL_: <https://cs5709-group11.netlify.app/>
- _GIT URL_: <https://git.cs.dal.ca/jhawer/csci-5709.git>

## Authors

- [Drashti Maheshbhai Navadiya (B00948838)](dr281927@dal.ca)

## Feature : User Management
- User registration 
- User login 
- View user profile 
- Update user profile 
- Forgot password 
- User logout 
- Delete user account

## How to access the Feature

Steps to Access the Feature:

email: drashtinavadiya@gmail.com

pass: Admin@1234

##

- User registration 

  Go to Sign Up Page: https://cs5709-group11.netlify.app/sign-up and fill the user registration form such as FirstName, LastName, Email, Password, ConfirmPassword, CompanyName, Profession and Date of Birth in which some the terms are required and proper validations are required to Sign Up as new user. Like for password Alphanumberic combination is required to validate. If all the details are filled then it will redirect to Home Page of SkillBridge.

- User Sign In 

  Go to Sign In Page: https://cs5709-group11.netlify.app/sign-in and fill the existing user details such as Email and Password. If the user exists in the system it will redirect to the HomePage or else it will throw an error for the particular error which does not allow the user to authenticate.

- Forgot password 

  link for Forgot password exist on Sign-in Page and while clicking the link "Forgot Password" it will redirect to forgot password link: https://cs5709-group11.netlify.app/forgot-password and enter the registered email. It will send the link to the email, if the user is registered.

- View user profile 
- Update user profile 
- User logout 
- Delete user account

  Go to the link: https://cs5709-group11.netlify.app/profile to view profile details, the form will be enabled if Edit button is clicked and when entering the data it will get updated.
  Also the user account can be deleted from the "Delete Account" button. On the right corner small drawer has option to logout, which will redirect to HomePage and session will end.

## Folder Structure

- backend\src\models\userDetails.ts
- backend\src\routes\userDetails.ts
- backend\src\services\userDetailsService.ts
- backend\src\utils\firebase.ts
- frontend\src\components\FAQ\FAQ.tsx
- frontend\src\components\Footer\Footer.tsx
- frontend\src\components\ForgotPassword\ForgotPassword.tsx
- frontend\src\components\navigation\Navigation.tsx
- frontend\src\components\SignIn\SignIn.tsx
- frontend\src\components\SignUp\SignUp.tsx
- frontend\src\pages\landing-page\LandingPage.tsx
- frontend\src\pages\profile-page\ProfilePage.tsx
- frontend\src\utils\firebase.ts

## Prerequisites

To have a local copy of this lab up and running on your local machine, you will first need to install the following software (environment).

```
Node.js version 18+
```

See the following section for detailed step-by-step instructions on how to install this software (environment).

## Installing

Download and Install Node.js for your Operating System from https://nodejs.org/en/download.

Test successful install by checking node version in Command Prompt/Terminal

```
node -v
```

Confirm if the version is the same as the one downloaded.

```
v20.11.0
```

## Deployment

Install the required dependencies

```
npm install
```

To run the development server use dev script

```
npm run dev
```

## Deployment

# Frontend

To deploy the project environment, We have used Netlify. The steps we followed for the deployment are as follows:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Netlify account using GitHub credentials.
3. Chose the repository to be deployed.
4. Set up the site configurations, including naming the site, among other settings.
5. Initiated the site deployment by clicking on the "Deploy site" button. The site went live in just a few minutes. Links to both the source code and the live site are provided above.

# Backend

To deploy the project environment, We have used Render. The steps we followed for the deployment are as follows:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Render account using GitHub credentials.
3. Chose the repository to be deployed.
4. Set up the ci/cd configurations, including naming the site, and automated build with main branch.
5. Initiated the site deployment by clicking on the "Deploy site" button. The site went live in just a few minutes. Links to both the source code and the live site are provided above.

## Testing

In the context of my application, the end-to-end tests & coding style tests which I went through are described below:

1. Testing Responsiveness

- Test: Resize the browser window to different screen sizes or use a responsive design testing tool to emulate various devices.

- Expectation: Verify that the website layout and components adapt appropriately to different screen sizes, ensuring readability and usability across devices. Elements should resize, reposition, or hide as necessary.

Note: Our application does not support responsiveness on 4K screens.

### Coding Style Tests:

1. Code formatting: Ensure that the code follows consistent indentation, spacing, and line wrapping rules. This helps improve code readability and maintainability.

- Example: Check that the components use consistent indentation with proper alignment of elements and logical grouping of code blocks.

2. Naming conventions: Verify that variables, functions, and components follow appropriate naming conventions for clarity and consistency.

- Example: Ensure that the names of functions and variables in the AvailableCalendar and Sidebar components are descriptive and follow a consistent naming convention, such as camelCase or PascalCase.

3. Modularity and organization: Assess how well the code is structured and organized, promoting maintainability and reusability.

- Example: Check that the code within the components is logically grouped, with related functions or styles placed together, and that code duplication is minimized.

## Built With

- [Node.js](https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app.
- [React](https://react.dev/learn/installation) - For building the user interface for the app.
- [Material-UI](https://mui.com/getting-started/installation/) - To improve the user interface (UI) of the application by using the UI components provided by
  Material-UI.
- [Sass](https://sass-lang.com/) - To make css files better. Short for Syntactically Awesome Style Sheets, SASS is a popular CSS pre-processor.
- [ReactRouter](https://reactrouter.com/en/main) - Router for react

NOTE: We need to have Node.js installed, which includes npm, in order to install and use React and Material-UI in our project.

## References

