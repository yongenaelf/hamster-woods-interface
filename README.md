# BeanGoTown

BeanGo Town is a game built on the AELF blockchain. Inspired by Monopoly. Users need to obtain the NFT to start the game. Click the GO button to roll the dice to determine the number of steps to move, and receive corresponding point rewards based on the location the piece lands on after the move.

- The game supports multiple ways to log in or register (Web2/Web3).
- The BeanPass NFT required to play the game can be collected directly in the game.
- The number of points rolled in the game is determined by random numbers generated on the chain.

Portkey SDK Usage:

- @portkey/did-ui-react
- @portkey/contracts
- @portkey/services
- @portkey/detect-provider
- @portkey/types
- @portkey/utils

  Reference: https://github.com/Portkey-Wallet/portkey-web、https://github.com/Portkey-Wallet/portkey-providers

Smart contract functions:

- Action: Play, Bingo
- View: CheckBeanPass, getGetPlayerInformation, GetBoutInformation
- Admin: Initialize, changeAdmin, SetGameLimitSettings, GetAdmin, GetGameLimitSettings

## 📦 Getting Started

In the project directory, you can run:

```
yarn or npm install
```

Install dependencies.

```
yarn dev or npm run dev
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

```
yarn build or npm run build
```

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```
yarn start or npm start
```

Start the application in production mode. The application should be compiled with `yarn build or npm run build` first.
