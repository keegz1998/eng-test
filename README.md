# React App Readme

This repository contains a React application that displays a list of users fetched from the Stack Exchange API. Users can be searched, followed, unfollowed, and blocked.

## Getting Started

To get started with the React app, follow the instructions below:

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone [repository-url]
    ```
2. Clone the repository to your local machine:
   ```bash
   cd zeppz-test
    ```
3. Install the dependencies:
   ```bash
   npm install
    ```
### **Running the App**

To run the React app, use the following command:
   ```bash
   npm start
  ```
  
The app will start running in development mode. Open your browser and navigate to[http://localhost:3000](http://localhost:3000/) to view the app.


### **Testing the components **

To run the unit tests for the userItem component, use the following command:
   ```bash
   npm test
  ```
  
The app will start running in development mode. Open your browser and navigate to[http://localhost:3000](http://localhost:3000/) to view the app.

## **App Structure**

The React app follows a component-based structure. Here are the main components:

- App: The main component that renders the entire application. It imports and renders the UsersPage component.
- UsersPage: The component responsible for fetching and displaying the list of users. It also handles search, pagination, and user interactions such as follow and block. This component imports and renders the UserList component and the Pagination component.
- UserList: A functional component that receives the list of users as a prop and renders individual UserItem components for each user.
- UserItem: A functional component that represents an individual user item. It displays the user's profile image, name, reputation, and provides options to follow, unfollow, and block the user.
- Pagination: A functional component that handles pagination and displays the page numbers.

## **API Integration**

The app integrates with the Stack Exchange API to fetch the list of users. Here's how it works:

1. When the UsersPage component mounts, it checks if there are cached users in the local storage. If cached users exist, it retrieves them and sets them as the initial user data. Otherwise, it fetches users from the API.
2. The fetchUsers function is responsible for making the API call. It fetches the users from the Stack Exchange API and processes the response to extract the necessary user data. The fetched users are then stored in the state and cached in the local storage for future use.
3. The user data is passed down to the UserList component, which renders the individual UserItem components.
4. The UserItem component displays the user's details and provides options to follow, unfollow, and block the user. When these options are clicked, the respective functions in the UsersPage component are called to update the state.

## **Searching and Pagination**

The app supports searching for users by name and pagination. Here's how it works:

- Searching:
  - The search input in the UsersPage component allows users to enter a search term.
  - As the user types, the handleSearchChange function is called to update the search term in the state.
  - The list of users is filtered based on the search term, and the filtered users are displayed in the UserList component.
- Pagination:
  - The app displays a fixed number of users per page (default: 5).
  - The Pagination component calculates the total number of pages based on the total number of users and the users per page.
  - Clicking on a page number triggers the paginate function in the UsersPage component, which updates the current page in the state.
  - The list of users is sliced based on the current page and the users per page, and the sliced users are displayed in the UserList component.

## **Error Handling**

If there is an error while fetching users from the API, an error message is displayed in the UsersPage component.

## **Time Allocation**

Below is the break down of time I spent on each pillar of development when building this web app:


- Review (15 minutes):
  - I spent the first 15 minutes reading through the requirements of the project and creating a list of components and the required props I would need to create.
- Design (45 minutes +-):
  - I spent around an hour styling and adding relevant CSS to get the web app to be responsive and in a working state. This was the last pillar I worked on as I first wanted to get the core functionality of the app completed. If I had more time, I would have created more efficient and easier to read CSS.
- Implementation (70 minutes):
  - I spent around an hour and a half working on creating the components and the functions needed to achieve the desired results. I put in extra effort to add in the pagination, caching and search functionality for the app. If I had more time I would have added documentation for the app.
- Testing(30 minutes):
  - I spent around half an hour writing Jest tests for coverage of the UserItem component. If I had more time I would have added test coverage for the entire application and added end-to-end testing using play-wright.
- Documentation (30 minutes):
  - I spent around half an hour writing the documentation and readMe doc for this project. If I had more time I would create official documentation for the app so anyone who has to work on my code can refer to the documentation if they have any questions
   
