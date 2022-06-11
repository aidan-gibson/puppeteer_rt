### Assumptions / Decisions
This will only go as far back at Aug '21 at most (ergo two-factor tags are potentially valid for every ticket etc)

Not using try/catch cuz I want it to fail if it fails; this is not a production constant script it's a one-time thing.

False positives > False negatives
### todo
maybe tweak applicant/prospie flag logic?

Can cycle thru tickets by just using the ticket number! don't have to click links or anything. best way.

finish up last remaining tags and write the comparison code to see where this program diverges from actually tagged tix. don't actually change any tix; but look at al prev tagged tix

currently finding hard rules and looser regex, currently on software. pull up all tickets in both twatch and cus queue for that tag to understand it, also look at the criteria in the md file from the taylor writeup
  explicit rules AND regex stuff

when done, run against all currently tagged tickets and look at divergences

Instead of flagging to console.log, simply open in a new window with an alert message w the info??



If going back thru old tickets, do not modify affiliation!!!!!!!!! only mod old tix affiliation tag if there is no entry.


resolve when mult correct

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