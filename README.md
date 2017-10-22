# Set up the project

Follow these steps to run the project on your local machine:

### Links

* [node.js](https://nodejs.org/en/download/)
* [node.js installation](https://nodejs.org/en/download/package-manager/)
* [Linux CLI for Windows](https://git-scm.com/downloads)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Webpack](https://webpack.js.org/guides/installation/#pre-requisites)
* [Jest](https://facebook.github.io/jest/)

First, we need to install node:

```
sudo apt-get install node
```
 - OR
download the node.js package needed for your operating system and follow the steps. For windows I recommend to use a linux like CLI, ether git bash or a CLI integrated in common js editors like Visual Studio Code.


Clone the project on your hard drive

```
git clone https://github.com/BogdanRazvan/transaction_matching.git
```

#### Note: All the following console commands should be run in the transaction_matching root folder.

The next step would be to bring the project dependencies in
```
npm install
```

After bringing in the project dependencies you need to build everything in a single file, and for this we need webpack

To install webpack:
```
npm install -g webpack
```
- or follow the instructions in the provided link

To test the project you need to ether, set it up on a remote server where you need to copy index.html and bundle.js or start a local server. I have setup a webpack dev server for testing.
```
npm start
```
This should open a connection to https://localhost:8080 or other open port. If you navigate there you should see a working app.

For tests, install jest
```
npm install -g jest
```
- or follow the instructions in the provided link

To run the test file
```
npm test
```

## Project structure

There are two main pieces two the project. One is related to the interface and how each component is related to each other, this is a collection of views, templates and css code using backbone standards. The other is the actual matching component which resides in the app/lib/fileMatch folder and is writen in javascript with underscore.js. 

### Project components and interface

app/main.js - just as the name suggests, this is the main component, it includes all the other components

There are three parent views which serve as a connector and placeholder for the child views:

Parent views
app/views/mainFileUploadView.js - this is just a placeholder view for the upload file fields.
app/views/mainFileCompareView.js - placeholder view for the number of transactions matched versus the number of transactions unmatched
app/views/mainUnmatchedReportView.js - Fetches the data from the files and sends it to the child view

Child views
app/views/fileUploadView.js - this is responsible for rendering and triggering event related to these fields such as to get the data from the selected file or validation. Here we parse the CSV files as they get picked.
app/views/fileCompareView.js - used only to render the report received from mainFileCompareView.js 
app/views/unmatchedReportView.js - Fetches the data from the parent and renders it in the table

### Matching component

app/lib/fileMatch.js - this is the matching component, here we have the logic for the matching. Other files have been separated just for the sake of modularity. I belive the comments here should explain how each matching is made.
