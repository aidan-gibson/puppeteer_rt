
given rt search link, acquire all ticketIDs









### Assumptions / Decisions
This will only go as far back at Aug '21 at most (ergo two-factor tags are potentially valid for every ticket etc)

Not using try/catch cuz I want it to fail if it fails; this is not a production constantly in use script, it's a one-time thing.

False positives > False negatives (too many tags>none)

Ticket in CUS or T-Watcher Queue

Only go after tickets with no support tags (implicitly assuming if they have support they have affiliation)

It's possible script acts on tix w affiliation but no support tags. It will not undo affiliation tags added, it will only add more as it sees fit.

### todo
move a lot of Puppeteer RT Tags.md to here for posterity etc

### Proj Setup
* Put your kerberos password in password.txt and gitignore password.txt
* put ur kerberos username in "login"
* Webstorm-Specific Setup
  * Enabled Typescript auto-comp -> JS
  * Enabled JSON5 for all JSON (so comments work) with https://www.jetbrains.com/help/webstorm/json.html#ws_json_using_schemas (this doesn't actually allow comments in package.json, couldn't fig out tho)
  * Downloaded Puppeteer library via Languages & Frameworks > Javascript > Libraries > Download
  * If webstorm does the thing where the root dir isn't part of the proj and all files are highlighted yellow, File > Attach Project select root folder

.prettierrc.json5 is config file for prettier. opted for json5 so I can have comments
eslint-config-prettier makes sure eslint and prettier play nice