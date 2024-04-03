
 ## ✨Overview

This POS KEY is built using [`Node.js`](https://nodejs.org/) and [`Express`](https://expressjs.com/). It integrates with [`POS-BACKEND`](https://github.com/ds2pro/pos-backend) for client key activation. This POS KEY software generates a license key for the client and activates it for a specified duration, including the option for deactivating the key.

## ✨Prerequisite

- Account in Github
- Account in Postman


## ✨Installation

- Visual Studio Code for All [ Platforms](https://code.visualstudio.com/)
- Git for [Windows](https://git-scm.com/download/win) or [Mac](https://git-scm.com/download/mac)
- Node for [Windows](https://nodejs.org/en/download) or [Mac](https://nodejs.org/en/download)
- Postman for [Windows](https://www.postman.com/downloads/) or [Mac](https://www.postman.com/downloads/)
-  POS BACKEND project

## ✨Setup 

#### To set up the project locally, follow these steps:

#### 1. Clone the repository:

- `git clone https://github.com/ds2pro/pos-keys.git`

#### 2. Install dependencies:
- `npm i`

#### 3. Configure the environment variables (.env file):

#### 4. _Build the project :_
-  `npm run build`

#### 5. Start the project:
- `npm run dev`


## ✨Login to the project

#### 1. Make sure the project is running

#### 2. Open Postman

#### 3. Navigation to:

- `POS Keys > Login`

#### 4. Change the environment:

- `local`

#### 5. send a request and you should expect a 400 response.

## ✨Usage
### Generating an Active License Key process (Owner side):
#### 1. _Create a new customer :_
Navigation to:
- `POS Keys > Customers > Create Customer`

#### 2. _Generate a key :_
Navigation to:
- `POS Keys > Keys> Create Key`
#### 3. _Activate the key :_
Navigation to:
- `POS Keys > Keys> Activate Key`

### Deactivating  an Active License Key:
#### 1. _Deactivate the key :_
Navigation to:
- `POS Keys > Keys> Activate Key`

###  Generating an Activate License Key process (Client side):
#### 1. _Generate a key :_
Navigation to:
- `POS Keys > Keys> Create Key`
#### 2. _Activate the key :_
Navigation to:
- `POS > Keys> Activate Key`


## ✨ Contributing

The Project is tracked by Jira, If you wish to make changes, **please follow the guidelines below:**

_Checkout:_

- Make sure to checkout from the `main` branch

_Branching_

- Make sure to use the same branch name from Jira Ticket

_PR before merging into testing_

- Make sure to PR before merging into testing, and assign your peer to review
