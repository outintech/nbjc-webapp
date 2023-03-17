# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development
### Prerequisites
* This repo uses `node`. 
* TDB - Specify versions for node
* To install node consider using a version manager like [nvm](https://github.com/nvm-sh/nvm)

### Setting up the repo locallay
```bash
$ git clone git@github.com:outintech/nbjc-webapp.git
$ cd nbjc-webapp
$ npm install
```

#### Installation Issue with multiple react-router-dom
If you have issues with compiling with multiple versions of react-router-dom installed locally, downgrade to version 5 by using:

```npm install react-router-dom@5 --save```

### Running the repo locally
The following will start the repo locally with watchers and hmr in localhost:3000

```bash
$ npm start
```
If 3030 is already in use it will prompt you to run in a different port like so. Hit `Y` to allow 
```
? Something is already running on port 3000. Probably:
...
Would you like to run the app on another port instead? (Y/n)
```

### Creating components
New standalone React components can be scaffolded using a plop script. 

To run the generator: 

```
$ npm run generate
```
In the prompt, provide a name to your compoenent in [PascalCase](https://wiki.c2.com/?PascalCase)
The script will create :
1. A new directory in `src/components` 
2. Four new files:

    1. `.jsx` file for the component
    2. `.md` file for styleguide
    3. `.test.jsx` file for unit testing
    4. `index.js` file for ease of import. 

Example: 
```
$ npm run generate component
nbjc-webapp@0.1.0 generate
$ plop component
? What is your component name? FilterDialog
✔  ++ /src/components/FilterDialog/FilterDialog.jsx
✔  ++ /src/components/FilterDialog/FilterDialog.md
✔  ++ /src/components/FilterDialog/FilterDialog.test.jsx
✔  ++ /src/components/FilterDialog/index.js
✨  Done in 6.64s.
```
### Styleguide
* This repo uses a styleguide based on `react-styleguidist` to develop components locally. 
* It looks for any components with a .md file in `src/components` folder
* The files are wrapped with the `src/Provider.js` component to theme the stylguide according to the NBJC theme

To run the styleguide
```
$ npm run styleguide
```
go to localhost:6060 to see the styleguide and modify the examples.

To add styleguide to component in the `src/components` folder simply add a `.md` file with `jsx` codeblocks. 

### Linting
* Run `npm run lint` to lint all *.js and *.jsx files in the src folder
* CSS lint tbd
* This repo uses `eslint` with `airbnb` rules.

### Testing
* Run `npm run test` to run all tests with a watcher. 
* Tests will automatically run based on changes.
* Standalone components use snapshot testing to test the rendered component.

## Environment variables
* Copy into `.env` file into `.env.local` 
* Replace `REACT_APP_API_HOST` with host for the API server you wish to hit.
* Replace placeholder values for `REACT_APP_AUTH0_DOMAIN` and  `REACT_APP_AUTH0_CLIENT_ID`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
