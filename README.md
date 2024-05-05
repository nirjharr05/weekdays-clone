# Project Title

Weekdays Clone: Search Job Functionality Implementation

# Github

Switch to 'master' branch

# Getting Started

To start the project, run:
npm start

# Prerequisites

Before starting, install the necessary dependencies:
npm install

# Key Considerations

1. Data Source: Utilizes "https://api.weekday.technology/adhoc/getSampleJdJSON" to fetch the initial 30 items.

2. Incomplete API Data: Due to the absence of specific fields in the API data, filtering based on the 'Tech stack' was omitted (as per document) and filter based on 'Number of Emplyees' was ommited (as per UI of extension).

3. Filter Implementation for Remote:
   Remote: Returns all jobs where the location is explicitly "remote".
   In-office: Returns all jobs that do not list "remote" as a location.
   Hybrid: Targets jobs that include "hybrid" in the location description (Note: No test data available for this case).

4. TypeScript: Enhanced type checking and reduced type errors by using TypeScript.

5. Path Aliasing: Simplified imports using path aliasing with Craco.
   Project Structure: Standardized folder structure segregating components, data, hooks, etc.

6. API Service Layer: Created a centralized API service for network requests, currently supporting POST requests with potential for expansion.

7. Interactive Elements: Implemented dummy buttons for "Easy Apply" and "Unlock Referral Link" due to lack of corresponding API data.

8. Salary Display Adjustments: Adjusted the estimated salary component to align with the currency format provided by the API, omitting 'LPA'.

9. Infinite Scrolling: Added infinite scrolling to load more jobs as the user scrolls.

10. Expanded Job Card View: Enabled viewing detailed job information upon clicking 'view job'.

11. Randomized Data: Randomized data for 'Posted x days ago' and 'type' in the expanded job card view due to missing API data.

12. Responsive Design : Tested responsiveness to an extant. One card at a time can be seen on mobile.

# Built With

React - The web framework used.
TypeScript - Programming language used.
Craco - For managing webpack configurations.

# Authors

Nirjhar Roy
