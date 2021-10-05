# David Lyon - Pipes Puzzle - Evolution

## Solved Puzzles

### Level 1

JustWarmingUp

## Limitations

- Loading level 5/6 maps takes a considerable amount of time.
- Visibility for level 3+ maps is not great.
- There's no reconnect functionality should the websocket fail.

## Decisions

- Kept all state and server calls in a single context/hook solution. On a bigger level I would've further split local and server contexts.

## Public URL

[https://dvlyon-evolution-xkqty.ondigitalocean.app](https://dvlyon-evolution-xkqty.ondigitalocean.app)

## Autosolver

Currently autosolver doesn't actually autosolve the puzzle but gives you a console log with the solution map you can change yourself.

## Notes

Initially went for a brute-force autosolver, but with maps bigger than 5x5 it was taking absurd amounts of time, thus disabled all related functionality.

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

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
