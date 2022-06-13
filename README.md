### Assumptions / Decisions
This will only go as far back at Aug '21 at most (ergo two-factor tags are potentially valid for every ticket etc)

Not using try/catch cuz I want it to fail if it fails; this is not a production constantly in use script, it's a one-time thing.

False positives > False negatives (too many tags>none)

Ticket in CUS or T-Watcher Queue
### todo
Only go after tickets with no support tags (implicitly assuming if they have support they have affiliation)

rescope affiliation & prospie logic




remember (for older tickets especially) the requester affiliation may have literally changed, like when ticket was made they were faculty and it was tagged as such but now they are not etc

maybe tweak applicant/prospie flag logic?

Instead of flagging to console.log, simply open in a new window with an alert message w the info??

If going back thru old tickets, do not modify affiliation!!!!!!!!! only mod old tix affiliation tag if there is no entry.

look thru "TODO"s in the code, check ALL comments as well

document everything clearly, go thru warnings etc, leave clear instructions on how to run for future CUS staff

make chrome+firefox extension which is a guesser and only active when ur on help.reed.edu (: (or nah idk)

ask if i can work on testing rt5? rt5 search is mouthwatering. look thru all rt5 related tix to familiarize myself first

config prettier, consistent pretty code, no semicolons etc. maybe also eslint+other formatting stuff from obsid proj

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