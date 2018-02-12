## v.NEXT

- Improve [#81](https://github.com/cleverbeagle/pup/issues/81). Migrate to `styled-components` for CSS.
- Add [#69](https://github.com/cleverbeagle/pup/issues/69). Support for SSR with examples for dynamic data.

## v1.4.0, February 12th, 2018

- Add [#119](https://github.com/cleverbeagle/pup/issues/119). Add examples of indexing MongoDB collections and module for simplifying process of defining indexes.
- Improve [#117](https://github.com/cleverbeagle/pup/issues/117). Simplify form handling. h/t [@merlinpatt](https://github.com/merlinpatt) for this one.
- Improve [#114](https://github.com/cleverbeagle/pup/issues/114). Migrate profile updates to Accounts API. h/t [@ninjaPixel](https://github.com/ninjaPixel) for this one.
- Improve [#113](https://github.com/cleverbeagle/pup/issues/113). Simplify static pages implementation. h/t [@sw-yx](https://github.com/sw-yx) for this one.
- Add [#111](https://github.com/cleverbeagle/pup/issues/111). Basic data export functionality.
- Add [#110](https://github.com/cleverbeagle/pup/issues/110). Ability for users to delete their accounts (and data).
- Add [#109](https://github.com/cleverbeagle/pup/issues/109). Add redirect back to initial request after login.
- Fix [#106](https://github.com/cleverbeagle/pup/issues/106). Fix missing `medium` link on `<Index />` component.
- Add [#105](https://github.com/cleverbeagle/pup/issues/105). Add `staging` and `production` commands to `package.json`.
- Fix [#104](https://github.com/cleverbeagle/pup/issues/104). Fix `onCreateUser` not applying default roles to new users.
- Add [#49](https://github.com/cleverbeagle/pup/issues/49). Add better handling for schema errors inside of Methods. h/t to [@Bandit](https://github.com/Bandit) for the solution.

## v1.3.0, November 13th, 2017

- Improve [#46](https://github.com/cleverbeagle/pup/issues/46). Move the resend verification email bar into its own component (h/t [@pilarArr](https://github.com/pilarArr) for implementing this).
- Improve [#47](https://github.com/cleverbeagle/pup/issues/47). Move `getUserName()` function in `/imports/ui/layouts/App/App.js` into its own file (h/t [@pilarArr](https://github.com/pilarArr) for implementing this).
- Improve [#48](https://github.com/cleverbeagle/pup/issues/48). Improve error handling in action methods so that they actual stop the Promise as soon as an error occurs.
- Improve [#53](https://github.com/cleverbeagle/pup/issues/53). Move method imports to be on both the client and the server to leverage Meteor's latency compensation by default (h/t [@zodern](https://github.com/zodern) for refactoring this).
- Fix [#59](https://github.com/cleverbeagle/pup/issues/59). Fix ESLint throwing a tantrum about line endings on Windows (h/t [@pilarArr](https://github.com/pilarArr) for implementing this).
- Improve [#60](https://github.com/cleverbeagle/pup/issues/60). Move to `babel-preset-env` from `babel-preset-es2015` (h/t [@pilarArr](https://github.com/pilarArr) for implementing this).
- Improve [#78](https://github.com/cleverbeagle/pup/issues/78). Deprecate `@cleverbeagle/dates` package in favor of a local file of date helpers (h/t [@zodern](https://github.com/zodern) for refactoring this).
- Improve [#79](https://github.com/cleverbeagle/pup/issues/79). Add `babel-plugin-lodash` to reduce footprint of Lodash to only methods that are used in the project (h/t [@ninjaPixel](https://github.com/ninjaPixel) for finding/implementing this).
- Improve [#80](https://github.com/cleverbeagle/pup/issues/80). Add exception to disable `max-len` ESLint rule (h/t [@ninjaPixel](https://github.com/ninjaPixel) for implementing this).
- Improve [#94](https://github.com/cleverbeagle/pup/issues/94). Bump Meteor to v1.6 and bump Atmosphere and NPM deps.
- Improve [#95](https://github.com/cleverbeagle/pup/issues/95). Migrate from `createContainer` method to `withTracker` for data containers (h/t [@cdolek](https://github.com/cdolek) for sniffing these out).
- Improve [#96](https://github.com/cleverbeagle/pup/issues/96). Fix miscellaneous ESLint errors (h/t [@cdolek](https://github.com/cdolek) for sniffing these out).

## v1.2.2, September 30th, 2017

- Fix [#66](https://github.com/cleverbeagle/pup/issues/66). Remove unnecessary `callback` argument causing trouble in `/imports/modules/server/send-email.js`.

- Fix [#74](https://github.com/cleverbeagle/pup/issues/74). Fix typo in `/imports/ui/components/Public/Public.js`.

## v1.2.1, September 24th, 2017

- Fix [#68](https://github.com/cleverbeagle/pup/issues/68). Update Meteor to v1.5.2 and bump Atmosphere dependencies to latest versions.

## v1.2.0, September 7th, 2017

- Fix [#31](https://github.com/cleverbeagle/pup/issues/31). Fix name not rendering for users logged in via OAuth with Google.
- Fix [#32](https://github.com/cleverbeagle/pup/issues/32). Fix route props not being passed to rendered component in `<Authenticated />` and `<Public />`. h/t @pilarArr for the fix.
- Improve [#37](https://github.com/cleverbeagle/pup/issues/37). Bump Atmosphere and NPM dependencies to latest versions. h/t @pilarArr for the refactor.
- Improve [#40](https://github.com/cleverbeagle/pup/issues/40). Move `Meteor.logout()` call to be triggered by visiting the `/logout` route.
- Add [#44](https://github.com/cleverbeagle/pup/issues/44). Add support for transactional emails with HTML and text templates via Handlebars.
- Improve [#45](https://github.com/cleverbeagle/pup/issues/45). Clean up the UI/UX of the "Edit Profile" view for users who are logged in via OAuth.

## v1.1.1, August 6th, 2017

- Fix [#27](https://github.com/cleverbeagle/pup/issues/27). Fix incorrect method name in rate limiter list in `/imports/api/Users/server/methods.js`.
- Fix [#28](https://github.com/cleverbeagle/pup/issues/28). Fix verify email message displaying for users who log in via OAuth.
- Fix [#29](https://github.com/cleverbeagle/pup/issues/29). Fix `@cleverbeagle/seeder` and `@cleverbeagle/dates` dependencies breaking initial startup. Also add `core-js` dependency as it was breaking some apps on startup.

## v1.1.0, August 1st, 2017

- Improve [#16](https://github.com/cleverbeagle/pup/issues/16). Adds missing import for `/imports/startup/server/accounts/on-create-user.js` in `/imports/startup/server/accounts/index.js`.
 [Add documentation on usage of `Accounts.onCreateUser()`](/pup/v1/accounts/on-create-user-hook).

- Improve [#17](https://github.com/cleverbeagle/pup/issues/17). Move setting of user password in editing profile to client to ensure the user's current password is actually checked (implements Meteor's `Accounts.changePassword()` method).

- Add [#20](https://github.com/cleverbeagle/pup/issues/20). Add support for `lodash` package via NPM and swap usage of `capitalize()` method from `@cleverbeagle/strings` package with lodash's `_.capitalize()` method. Remove `@cleverbeagle/strings` from NPM dependencies.

- Add [#21](https://github.com/cleverbeagle/pup/issues/21). Add support for (non-blocking) email verification on user signup. [Add documentation on email verification process](/pup/v1/accounts/email-verification).

- Fix [#23](https://github.com/cleverbeagle/pup/issues/23). Fixes a React PropTypes warning showing up when accessing a non-existing document on `/documents/:_id/edit`. Also improve 404 handling on `/documents/:_id/edit` and `/documents/:_id` when no document is passed.

- Fix [#24](https://github.com/cleverbeagle/pup/issues/24). Remove unnecessary `_.pluck()` call obscuring the method names passed to the `rateLimit()` options object.

## v1.0.3, July 9th, 2017

- Fix [#14](https://github.com/cleverbeagle/pup/issues/14). Remove unnecessary `loggingIn` check that was forcing the page to re-render.

## v1.0.2, June 27th, 2017

- Fix [#12](https://github.com/cleverbeagle/pup/issues/12). Fixes prop type warning being thrown when transitioning to the `ViewDocument` page component from the `NewDocument` page component.

## v1.0.1, June 14th, 2017

- Fix [#1](https://github.com/cleverbeagle/pup/issues/1). h/t to [@sczk](https://github.com/sczk) for pointing out the fix.

## v1.0.0, June 13th, 2017

- Initial release of Pup.