## v2.1.0, July 29th, 2019

Special thanks to @ayhid, @MichelFloyd, @mrwisu, @h4de5, and @aferreol for help on this release :)

- Document [#25](https://github.com/cleverbeagle/pup/issues/25) Add documentation about ESLint to docs.
- Complete [#205](https://github.com/cleverbeagle/pup/issues/205) Remove unnecessary yarn.lock file.
- Add [#234](https://github.com/cleverbeagle/pup/issues/234) Add ability to blacklist certain routes from SSR.
- Improve [#261](https://github.com/cleverbeagle/pup/issues/261) Rename "Share" button to "Post Comment" in comment composer.
- Add [#263](https://github.com/cleverbeagle/pup/issues/263) Add sorting option to comments (newest or oldest first) on documents.
- Complete [#277](https://github.com/cleverbeagle/pup/issues/277) Correct path in error message in createIndex.js module.
- Improve [#283](https://github.com/cleverbeagle/pup/issues/283) Update Meteor and NPM dependencies.
- Add [#284](https://github.com/cleverbeagle/pup/issues/284) Merge PupQL functionality into Pup and deprecate @cleverbeagle/pupql.
- Fix [#293](https://github.com/cleverbeagle/pup/issues/293) Fix sendEmail always sending text template.
- Fix [#299](https://github.com/cleverbeagle/pup/issues/299) Fix old sendVerificationEmail Meteor method being used instead of GraphQL mutation.
- Fix [#307](https://github.com/cleverbeagle/pup/issues/307) Fix incorrect image size in manifest.json.
- Complete [#314](https://github.com/cleverbeagle/pup/issues/314) Fix linter errors.

## v2.0.1, November 15th, 2018

- Fix [#265](https://github.com/cleverbeagle/pup/issues/265) Fix seeder creating 100 instead of 5 users.
- Fix [#267](https://github.com/cleverbeagle/pup/issues/267) Fix webhooks not receiving query params.
- Fix [#270](https://github.com/cleverbeagle/pup/issues/270) Fix GDPR modal not closing when moving between pages after user clicks "Save Settings."

## v2.0.0, November 9th, 2018

- Add [#125](https://github.com/cleverbeagle/pup/issues/125) GraphQL support to replace usage of Meteor's publications and subscriptions.
- Add [#174](https://github.com/cleverbeagle/pup/issues/174) Add sitemap.xml generator (h/t @merlinpatt for this).
- Improve [#183](https://github.com/cleverbeagle/pup/issues/183) Folder structure to simplify import paths (h/t @merlinpatt for this).
- Add [#204](https://github.com/cleverbeagle/pup/issues/204) Add prettier and pre-commit hook (h/t @merlinpatt for this).
- Add [#208](https://github.com/cleverbeagle/pup/issues/208) Add browser-policy support (h/t @merlinpatt for this).
- Add [#211](https://github.com/cleverbeagle/pup/issues/211) Add webhooks template (h/t @merlinpatt for this).
- Improve [#220](https://github.com/cleverbeagle/pup/issues/220) Overhaul documents feature to include public/private documents and a new comments feature.
- Improve [#225](https://github.com/cleverbeagle/pup/issues/225) Migrate to v4 of `styled-components` (h/t @merlinpatt for this).
- Add [#235](https://github.com/cleverbeagle/pup/issues/235) Add input sanitization when editing documents (h/t @merlinpatt for this).
- Improve [#239](https://github.com/cleverbeagle/pup/issues/239) Migrate `babel-plugin-lodash` to a production dependency (h/t @fknipp for this).
- Improve [#240](https://github.com/cleverbeagle/pup/issues/240) Move actions to dedicated /actions directory under each /api directory.
- Add [#250](https://github.com/cleverbeagle/pup/issues/250) Unit, integration, and end-to-end testing.
- Add [#255](https://github.com/cleverbeagle/pup/issues/255) Continuous integration support via CircleCI (h/t @merlinpatt for this).
- Improve [#259](https://github.com/cleverbeagle/pup/issues/259) Update Meteor to v1.8.

## v1.6.1, June 26th, 2018

- Fix [#176](https://github.com/cleverbeagle/pup/issues/176). Fix flash of /login page while SSR is loading. Needed to do a patch because the fix for this was breaking SSR.

## v1.6.0, June 26th, 2018

- Fix [#176](https://github.com/cleverbeagle/pup/issues/176). Fix flash of /login page while SSR is loading.
- Improve [#166](https://github.com/cleverbeagle/pup/issues/166). Add minimum character length validation to update password on `<Profile />`.
- Improve [#165](https://github.com/cleverbeagle/pup/issues/165). Upgrade to Meteor 1.7.0.1+.
- Fix [#161](https://github.com/cleverbeagle/pup/issues/161). Fix `PropTypes` warning on `<BlankState />` component.
- Improve [#162](https://github.com/cleverbeagle/pup/issues/162). Remove `fourseven:scss` dependency.
- Add [#156](https://github.com/cleverbeagle/pup/issues/156). Add `<Authorized />` route component for roles-based routing.
- Add [#155](https://github.com/cleverbeagle/pup/issues/155). Add settings panel (relates to #149).
- Add [#151](https://github.com/cleverbeagle/pup/issues/151). Add a simple admin panel for users.
- Add [#149](https://github.com/cleverbeagle/pup/issues/149). Add a pattern for acquiring GDPR consent.

## v1.5.1, May 3rd, 2018

- Fix [#159](https://github.com/cleverbeagle/pup/issues/159). Fix incorrect CSS variable referencing old Sass syntax. H/t [@mbessieres](https://github.com/mbessieres) for the tip.

## v1.5.0, April 26th, 2018

- Improve [#157](https://github.com/cleverbeagle/pup/issues/157). Bump Meteor to 1.6.1.1 and all dependencies to their latest compatible versions.
- Add [#154](https://github.com/cleverbeagle/pup/issues/154). Add blank state component.
- Improve [#144](https://github.com/cleverbeagle/pup/issues/144). Migrate to base template for transactional emails. H/t [@michelfloyd](https://github.com/michelfloyd) for this one.
- Improve [#140](https://github.com/cleverbeagle/pup/issues/140). Move "Application Name" and support email into settings file instead of hard-coding it into the source. H/t [@michelfloyd](https://github.com/michelfloyd) for this one.
- Improve [#138](https://github.com/cleverbeagle/pup/issues/138). Correct all linter errors. H/t [@merlinpatt](https://github.com/merlinpatt) for this one.
- Improve [#134](https://github.com/cleverbeagle/pup/issues/134). Prevent welcome email sending before a user has verified their email address. h/t [@toinevk](https://github.com/toinevk).
- Improve [#130](https://github.com/cleverbeagle/pup/issues/130). Remove unnecessary Babel presets. h/t [@toinevk](https://github.com/toinevk).
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
