# Project Proposal

SkillBridge is a central hub for individuals to cultivate and showcase their professional identities, fostering dynamic platforms for career growth and collaboration. The application enables users to create comprehensive profiles, highlighting skills, work history, and accomplishments, facilitating meaningful networking opportunities.

- _Date Created_: 27 February 2024
- _Last Modification Date_: 28 February 2024
- _Deployed application URL_: <https://cs5709-group11.netlify.app/>
- _GIT URL_: <https://git.cs.dal.ca/jhawer/csci-5709.git>

## Authors

* [Dheeraj Bhat (B00928874)](dh210086@dal.ca)
* [Drashti Maheshbhai Navadiya (B00948838)](dr281927@dal.ca) 
* [Om Anand (B00947378)](om.anand@dal.ca)
* [Sameer Amesara (B00961209)](sameer.amesara@dal.ca)
* [Suyash Jhawer (B00968936)](sy326775@dal.ca)
* [Tirth Bharatiya (B00955618)](tr608606@dal.ca)

## Features

The following are the features of our application

Must Have
- User Management
- Messaging
- Content Feed
- Discussion Forums
- Job board
- Payment Gateway
- Advanced Networking and Connection
- User Dashboard
- Mentorship Program

Nice to have
- Job Application Management
- Event Planning & Management
- Referral Management System
- Video Calling
- Learning and Development Resources

## Folder Structure

Our approach to organizing projects into distinct folder structures is aimed at improving the management, maintainability, and reusability of the code. By segregating related files into dedicated folders, we create a modular and loosely coupled codebase. This segmentation enables focused development on individual components or features without impacting the rest, enhancing the efficiency of the development workflow.

For frontend development tasks, employing a tiered folder setup simplifies the process of finding and handling resources such as CSS, JavaScript, images, and fonts. This method of organizing files ensures a clean separation between different aspects of the frontend, thereby improving code legibility and supporting smoother teamwork.

Furthermore, a strategically planned folder architecture facilitates the reuse of code across the project. This allows for easy incorporation of reusable components in different areas of the application, minimizing duplication and increasing the overall efficiency of the codebase.

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

* [Node.js](https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management.
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app.
* [React](https://react.dev/learn/installation) - For building the user interface for the app.
* [Material-UI](https://mui.com/getting-started/installation/) - To improve the user interface (UI) of the application by using the UI components provided by 
Material-UI.
* [Sass](https://sass-lang.com/) - To make css files better. Short for Syntactically Awesome Style Sheets, SASS is a popular CSS pre-processor.
* [ReactRouter](https://reactrouter.com/en/main) - Router for react

NOTE: We need to have Node.js installed, which includes npm, in order to install and use React and Material-UI in our project.

