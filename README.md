# Project Report Web Application
- _Date Created_: 09 April 2024
- _Last Modification Date_: 10 April 2024
- _GitLab Project Repository URL_: <https://git.cs.dal.ca/jhawer/csci-5709>
- _GitLab Project individual branches_ 
   - _Dheeraj Bhat_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Dheeraj_Bhat_B00928874?ref_type=heads>
   - _Sameer Amesara_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Sameer_Amesara_B00961209?ref_type=heads>
   - _Drashti Navadiya_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Drashti_Navadiya_B00948838?ref_type=heads>
   - _Om Anand_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Om_Anand_B00947378?ref_type=heads>
   - _Suyash Jhawer_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Suyash_Jhawer_B00968936?ref_type=heads>
   - _Tirth Bharatiya_: <https://git.cs.dal.ca/jhawer/csci-5709/-/tree/Tirth_Bharatiya_B00955618?ref_type=heads>
- _Netlify URL_: <https://cs5709-group11.netlify.app/>
 
## Authors
- [Dheeraj Bhat (B00928874)](dh210086@dal.ca)
- [Sameer Amesara (B00961209)](sm527221@dal.ca)
- [Drashti Navadiya (B00948838)](dr281927@dal.ca)
- [Om Anand(B00947378)](om.anand@dal.ca)
- [Suyash Jhawer(B00968936)](sy326775@dal.ca)
- [Tirth Bharatiya(B00955618)](tr608606@dal.ca)

## How to login to the application

Some Existing credentials For Login:
1. - email: johndoe@dal.ca 
   - pass: Test@123
2. - email: bhat.dheeraj@gmail.com
   - pass: Test@123

### Steps to authenticate application
1. Open the deployment link: <https://cs5709-group11.netlify.app/>
2. Click on Login or Create a new user.
3. Enter credentials and continue.

## Features

The following are the features of our application

_Must Have_
- User Management
- Messaging
- Content Feed
- Discussion Forums
- Job board
- Payment Gateway
- Advanced Networking and Connection
- User Dashboard
- Mentorship Program

_Nice to have_
- Job Application Management
- Event Planning & Management
- Referral Management System
- Video Calling
- Learning and Development Resources
 
## Features worked on by Dheeraj Bhat

1. Payments [19]
   - Payment page using Stripe[5]
   - Saved cards page using Stripe[5] including Adding new cards.
   - Transactions page for payments done
2. Booking Mentors (Related task with payment integration) [19]
   - Get Booking date and time from user
   - Process Payment for the Booking
   - Mentor Bookings page for all bookings created by user.
3. Dashboard
   - Consolidated view of jobs, bookings and networks in one place.

Here Payment page and Book mentor form page do not have any header(navigation bar) or footer. This is done to avoid user redirecting from these pages.

## Features worked on by Sameer Amesara

1. Mentorship [20]
   - Find Mentor
   - Apply as a Mentor
   - Rate a Mentor

## Features worked on by Drashti Navadiya

1. User Management [21]
   - User signup - Sign up as a new user.
   - User Signin - Sign in as a existing user.
   - User profile - View and update user details.

We have utilized some content of the following webpage templates as references for our user management system:

1. Sign-In Template: https://mui.com/material-ui/getting-started/templates/sign-in/
2. Sign-Up Template: https://mui.com/material-ui/getting-started/templates/sign-up/

Changes Made:

- Structural Adjustments: We retained the fundamental structure of the sign-in and sign-up forms provided in the referenced templates.
- Color Palette Modification: We implemented major color changes across both templates to align with our branding guidelines. This involved adjusting primary and secondary colors to establish a cohesive visual identity for our user management system.
- Customization: Beyond structural and color modifications, we tailored certain elements to meet our specific requirements, ensuring seamless integration with our existing system architecture [21].

## Features worked on by Om Anand

1. Job Board [22]
   - Creating a new job
   - Deleting your jobs
   - Ability to search and filter jobs
   - Viewing job details
2. Messaging
   - Real-time Chat with connected users

_In backend/src/socket/socket.ts_
*Lines 1 - 39*

```javascript
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: [config.FRONTEND_ORIGIN],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId: string): any => {
	return userSocketMap[receiverId];
};

interface Dic {
    [key: string]: Object
}

let userSocketMap: Dic = {}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId!! as string
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
```

The code above was created by adapting the code in [MERN Chat App, Github](https://github.com/burakorkmez/mern-chat-app/blob/master/backend/socket/socket.js) as shown below: 

```javascript
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
```

## Features worked on by Suyash Jhawer

1. Content feed [23]
   - Paginated view of existing feeds.
   - Creation of new feeds.
   - Like and comment on feeds.
   - Search, filter and sort feeds.
2. Advanced Networking 
   - View and search users to connect with.
   - Request to connect with users.
   - Accept connection requests.

## Features worked on by Tirth Bharatiya

1. Discussions forum [24]
   - View existing discussions.
   - Search, filter and sort discussions.
   - Create a new discussion.
   - View, like/dislike and add replies to a discussion.
2. Advanced Networking 
   - View and search users to connect with.
   - Request to connect with users.
   - Accept connection requests.

_In discussion.ts_

*Lines 100 - 109*

```javascript
export const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
        if (line.trim().startsWith('- ')) {
        return React.createElement('li', { key: index }, line.trim().substring(2));
        } else if (line.trim().match(/^\d+\. /)) {
        return React.createElement('li', { key: index }, line.trim().substring(line.indexOf('.') + 1));
        }
        return React.createElement('p', { key: index }, line);
    });
 } 
```

The code above was created by adapting the code in [How to render a multi-line text string in React, StackOverflow](https://stackoverflow.com/questions/35351706/how-to-render-a-multi-line-text-string-in-react) as shown below: 

```javascript
render() {
    var text = "One\nTwo\nThree";
    return (
    <div>
        {text.split("\n").map((i,key) => {
            return <div key={key}>{i}</div>;
        })}
    </div>);
}
```
 
_In discussionService.ts_

*Lines 54 - 60*

```javascript
let discussions = await DiscussionModel.aggregate([
      { $match: query },
      { $addFields: { numLikes: { $size: "$likedBy" } } },
      { $sort: sortCriteria },
      { $skip: skip },
      { $limit: DISCUSSION_PAGE_SIZE },
    ]); 
```

The code above was created by adapting the code in [Aggregation, MongoDB](https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation#:~:text=Aggregation%20operations%20are%20expressions%20you,specific%20operation%20on%20your%20data) as shown below: 

```javascript
// Define an aggregation pipeline with a match stage and a group stage
const pipeline = [
    { $match: { categories: "Bakery" } },
    { $group: { _id: "$stars", count: { $sum: 1 } } }
];

// Execute the aggregation
const aggCursor = coll.aggregate(pipeline);

// Print the aggregated results
for await (const doc of aggCursor) {
    console.log(doc);
}
```

### Test cards for Payments

&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; _*Table 1: Test cards:* [6][19]_ <br/>
|BRAND			       | NUMBER			  |  CVC		       |  DATE            |
|---------------------|------------------|----------------|------------------|
|Visa			          | 4242424242424242 |  Any 3 digits  |	 Any future date |
|Visa (debit)		    | 4000056655665556 |  Any 3 digits  |	 Any future date |
|Mastercard		       | 5555555555554444 |  Any 3 digits  |	 Any future date |
|Mastercard (2-series)| 2223003122003222 |  Any 3 digits  |	 Any future date |
|Mastercard (debit)	 | 5200828282828210 |  Any 3 digits  |	 Any future date |
|Mastercard (prepaid) |	5105105105105100 |  Any 3 digits  |	 Any future date |

## Deployment
### Frontend 
To deploy the project environment, We have used Netlify[12]. The steps we followed for the deployment are as follows[19]:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Netlify account using GitHub credentials.
3. Chose the repository to be deployed.
4. Set up the site configurations, including naming the site, among other settings.
5. Initiated the site deployment by clicking on the "Deploy site" button. The site went live in just a few minutes. Links to both the source code and the live site are provided above. 


### Backend
To deploy the project environment, We have used Render[13]. The steps we followed for the deployment are as follows[19]:

1. Mirrored our code into a private GitHub repository from GitLab.
2. Accessed our Render account using GitHub credentials.
3. Chose the repository to be deployed.
4. Set up the ci/cd configurations, including naming the site, and automated build with main branch.
5. Initiated the site deployment by clicking on the "Deploy site" button. The site went live in just a few minutes. Links to both the source code and the live site are provided above. 
 
## Testing

In the context of my application, the end-to-end tests & coding style tests which I went through are described below[19]:

1. Testing Responsiveness

- Test: Resize the browser window to different screen sizes or use a responsive design testing tool to emulate various devices.

- Expectation: Verify that the website layout and components adapt appropriately to different screen sizes, ensuring readability and usability across devices. Elements should resize, reposition, or hide as necessary.

2. API integrations

- Test: Test for various requests with and without data. Test with invalid values. Test through postman[6] with different data.

- Expectation: Verify that the backend apis give the appropriate response or error

3. Stripe integration

- Test with various test cards[7] and amounts. Test with saved cards and new cards.

- Expectation: User should be shown the error messages sent by stripe. User should be able to pay with new or saved cards. 

4. Form validations

- Test form with invalid or blank information

- Expectation: User is shown the right error messages to fix issues.

## Frontend Folder structure (Vite build) [19]
- frontend/src/assets/ - used for storing images
- frontend/src/components/ - used for react components. Each component has a folder with tsx and scss(if needed since most stying through mui)
- frontend/src/models/ - used for typescript interfaces
- frontend/src/pages - used for react pages. Each folder has one of more related pages
- frontend/src/stores - used for various mobx store class
- frontend/src/utils - for .ts helper functions

## Backend Folder structure [19]
- backend/src/models/ - used for mongoose schemas
- backend/src/routes/ - used for individual route files
- backend/src/services/ - used for services to be used in the route files
- backend/src/utils/ - for .ts helper functions

## Local deployment
Below are the requirements and steps for both frontend and backend local deployment and testing. After cloning the repository, switch to either frontend or backend folder and follow the below instructions.

### Prerequisites

To have a local copy of this lab up and running on your local machine, you will first need to install the following software (environment).

```
Node.js version 18+
```

See the following section for detailed step-by-step instructions on how to install this software (environment).

### Installing

Download and Install Node.js for your Operating System from https://nodejs.org/en/download.

Test successful install by checking node version in Command Prompt/Terminal

```
node -v
```

Confirm if the version is the same as the one downloaded.

```
v20.11.0
```

### Deploying

Install the required dependencies

```
npm install
```

To run the development server use dev script

```
npm run dev
```
 
## References
 
[1] [Node.js](https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management. <br/>
[2] [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app. <br/>
[3] [React](https://react.dev/learn/installation) - For building the user interface for the app. <br/>
[4] [Material-UI](https://mui.com/getting-started/installation/) - To improve the user interface (UI) of the application by using the UI components provided by   Material-UI. <br/>
[5] [Stripe](https://docs.stripe.com/) -  For quick and secure payment integration in the application <br/>
[6] [Stripe-testing](https://docs.stripe.com/testing) - For testing using test cards <br/>
[7] [FontAwesome](https://fontawesome.com/start) -  For various icons and images <br/>
[8] [Postman](https://www.postman.com/downloads/) - Testing was done by using Postman. <br/>
[9] [VisualStudio-code](https://code.visualstudio.com/docs) - lightweight but powerful source code editor. <br/>
[10] [StickPng](https://www.stickpng.com/img/icons-logos-emojis/iconic-brands/visa-logo) - Visa logo for payments and cards <br/>
[11] [MasterCard](https://brand.mastercard.com/debit/mastercard-brand-mark/downloads.html) - Downloadable logo for mastercard <br/>
[12] [Netlify](https://docs.netlify.com/) - Platform to deploy react application <br/>
[13] [Render](https://docs.render.com/) - Platform to deploy backend node application <br/>
[14] [MobX](https://mobx.js.org/README.html) - Simple, scalable state management. <br/>
[15] [PaginateMongo-Stackoverflow](https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js) - ReferencedSolution for paginating data from mongo <br/>
[16] [StripeElement-Styling-LinkedIn](https://www.linkedin.com/pulse/stripe-custom-styled-card-elements-tanjir-antu/) - Referenced solution for styling stripe elements <br />
[17] [Combining-stores-DevCommunity](https://dev.to/cakasuma/using-mobx-hooks-with-multiple-stores-in-react-3dk4 ) - Referenced for combining various stores in mobx <br/>
[18] [Axios](https://axios-http.com/docs/api_intro) - Library used for making api calls to backend <br/>
[19] D. Bhat, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/>
[20] S. Amesara, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/>
[21] D.M. Navadiya, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/> 
[22] O. Anand, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/>
[23] S. Jhawer, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/>
[24] T. Bharatiya, "Assignment 2" Dalhousie University, [online document], 2024. [Accessed 09-Apr-2024] <br/>
