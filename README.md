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

- POS BACKEND project

## ✨Setup

#### To set up the project locally, follow these steps:

#### 1. Clone the repository:
  
-  `git clone https://github.com/ds2pro/pos-keys.git`

#### 2. Install dependencies:

-  `npm i`

  

#### 3. Configure the environment variables (.env file):

  

  

- [ ] PORT

  

  

- [ ] DB_NAME

  

  

- [ ] DB_HOST= localhost

  

  

- [ ] DB_PORT

  

  

- [ ] DB_USER

  

  

- [ ] DB_PASS

  

  

- [ ] NODE_ENV= local

  

  

- [ ] SECRET_KEY

  

  

  

#### 4. _Build the project :_

  

  

-  `npm run build`

  

  

  

#### 5. Start the project:

  

  

-  `npm run dev`

  

  

  

## ✨Login to the project

  

  

#### 1. Make sure the project is running

  

  

#### 2. Open Postman

  

  

#### 3. Navigation to:

  

-  `POS Keys > Login`

  

  

Log into the system as a super user.

  

  

#### 4. Change the environment:

  

  

-  `local`

  

  

#### 5. send a request and you should expect a 400 response.

  

  

  

## ✨Usage

  

  

### Generating an Active License Key process (Owner side):

  

  

#### 1. _Create a new customer :_

  

Navigation to:

  

-  `POS Keys > Customers > Create Customer`

A new customer record will be inserted into POS-KEY Database.

  

Copy the customer Id from the response.

  

  

#### 2. _Generate a key :_

  

Navigation to:

  

-  `POS Keys > Keys> Create Key`

  

  

The generated key record will be inserted into POS-KEY Database.

  

Paste the customer Id into the body of the request.

  

Copy the key from the response.

  
  
  

**Difference between period and expiry:**
  

Period: It denotes the duration, expressed in days, for which a license key remains valid.

Expiry: It determines the expiry date field. It should either be -1 or a positive number greater than 0. If it greater than 0, the calculation of the `expiryDate` is contingent upon the `period`.

To generate a one-year license for the client:
period: 365 
expiry: 1 

#### 3. _Activate the key :_

  

  

Navigation to:

  

  

-  `POS Keys > Keys> Activate Key`

  

  

Paste the copied key here.

  

Update the key in POS-KEY Database to be active.

  

  

### Deactivating an Active License Key:

  

  

#### 1. _Deactivate the key :_

  

  

Navigation to:

  

  

-  `POS Keys > Keys> Activate Key`

  

  

Update the key in POS-KEY Database to be deactivated.

  

  

### Generating an Activate License Key process (Client side):

  

  

#### 1. _Generate a key :_

  

  

Navigation to:

  

  

-  `POS Keys > Keys> Create Key`

  

  

The generated key record will be inserted into POS-KEY Database.

  

Copy the key from the response.

  

#### 2. _Activate the key :_

  

  

Navigation to:

  

  

-  `POS > Keys> Activate Key`

  

  

Paste the copied key here.

  

In POS-BACKEND database, insert a new record into **mechaeem_licensing** table.

  

In POS-KEY database, update the key to be active.

  

### Revoke all licenses:

  

**Owner Side (POS KEY Database):**

  

Delete the records in the **tblKeys** table within the **mechaeem_licensing** Database.

  

  

**Client Side (POS BACKEND Database):**

  

Delete the records in the **tblLicense** table within the **pointpro_dev** Database.

  

  

## ✨ Contributing

  

  

  

The Project is tracked by Jira, If you wish to make changes, **please follow the guidelines below:**

  

  

  

_Checkout:_

  

  

  

- Make sure to checkout from the `main` branch

  

  

  

_Branching_

  

  

  

- Make sure to use the same branch name from Jira Ticket

  

  

  

_PR before merging into testing_

  

  

  

- Make sure to PR before merging into testing, and assign your peer to review