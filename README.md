### Assumptions / Decisions
This will only go as far back at Aug '21 at most (ergo two-factor tags are potentially valid for every ticket etc)

Generally not using try/catch cuz I want it to fail if it fails; this is not a production constantly in use script, it's a one-time thing.

False positives > False negatives (too many tags>none)

Ticket in CUS or T-Watcher Queue

Only go after tickets with no support tags (implicitly assuming if they have support they have affiliation)

It's possible script acts on tix with existing affiliation but no support tags. It will not undo affiliation tags added, it will only add more as it sees fit.

It will also apply affiliation even if noTag

NoRegexMatches appended to `lucas.txt`

### Proj Setup
* Put your kerberos password in password.txt and gitignore password.txt
* put ur kerberos username in "login"
* replace searchURL variable with an RT search of all the tickets you want this to apply to. Be sure to set Sorting > Rows per page: Unlimited



* Webstorm-Specific Setup
  * Enabled Typescript auto-comp -> JS
  * Enabled JSON5 for all JSON (so comments work) with https://www.jetbrains.com/help/webstorm/json.html#ws_json_using_schemas (this doesn't actually allow comments in package.json, couldn't fig out tho)
  * Downloaded Puppeteer library via Languages & Frameworks > Javascript > Libraries > Download
  * If webstorm does the thing where the root dir isn't part of the proj and all files are highlighted yellow, File > Attach Project select root folder

`.prettierrc.json5` is config file for prettier. opted for json5 so I can have comments

eslint-config-prettier makes sure eslint and prettier play nice

### searching RT
find untagged via Advanced `AND 'CF.{Support Tags}' IS NULL`

Queue = 'cus' AND 'CF.{Support Tags}' IS NULL

all Support tagged

Queue = 'cus' AND 'CF.{Support Tags}' IS NOT NULL

all

Queue = 'cus' AND 'CF.{Primary Affiliation}' IS NOT NULL

You have to add cus queue and THEN primary affiliation and support tags show up as option



`search fulltext:"duo" any` to look at active (open, new) **and** inactive (resolved) tickets

other modifiers are initial, inactive, active

document.querySelector("#TicketModify > div.submit > div.buttons > input")

Unless you specify a specific status, only tickets with active statuses (new, applied, new, under review, approved, to be ordered, open, stalled, in student hands, waitlisted, to be returned, renewal pending, payment pending, hold for data, destroy data, hold, okay to erase, erased, reopened, awaiting assets, assets attached, preparation in progress, hold for data transfer, ready for pickup, pending) are searched.
### affiliation logic
-   1 primary affiliation UNLESS Faculty or Staff Emeritus
-   There can be mult requestors, use primary affiliation for each of those
    (If non reed.edu email && none of the others) Applicant (incoming student), special flag for review

~~All emeritus are also faculty~~ marty ringle is [emeritus and staff](https://help.reed.edu/User/Summary.html?id=2752) , [nora](https://help.reed.edu/User/Summary.html?id=136157) as well, hanawalkt as well

Ed Segel is Emeritus but no longer listed as such on RT bc deceased

Paul Bragdon also deceased no title

tags are set to ticket requestor on ticket creation

if ticket requestor is updated, affiliations field is, but not tags

applicant logic:
if all non-reed emails && doesn't match any affiliation && title includes /applicant/i, flag

remember (for older tickets especially) the requester affiliation may have literally changed, like when ticket was made they were faculty and it was tagged as such but now they are not etc
### support tags
[wiki rules](https://ciswikis.reed.edu/doku.php?id=cus:rt-support-tags)
[excel retroactive tagging sheet](https://docs.google.com/spreadsheets/d/1EfZhidGR3DsxsI__mE9TmgOAjzyiR3LwHd3cO5JwIvA/edit#gid=0) [source ticket](https://help.reed.edu/Ticket/Display.html?id=344164)
[all sam tagged tix link](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20Created%20%3C%20%272022-03-01%27%20AND%20Created%20%3E%20%272022-01-31%27%20AND%20id%20%3C%20337918&RowsPerPage=0&SavedChartSearchId=new&SavedSearchId=new) it lazy loads so might need to scroll or smth
* **Multiple support tags** may be appropriate in some cases:
  -   Microsoft Office/365 password reset ticket? Tag both **microsoft** and **password reset**
  -   Printer in the library having problems? Tag both **library related** and **printing**
  -   User having trouble printing from an Office application? Tag both **microsoft** and **printing**
  * Are there clear rules when there are and are not mult tags??
    * if thesis, NOT microsoft (this is really the only assumption i can make, tickets can really be about a million things)
* **no tag**
  * t-watcher task
  * Do not tag “informational” tickets that come into the queue, where we aren't really doing any work:
    -   “Welcome to Reed College/Notes for your first day…” email from HR to new employees (see [example](https://help.reed.edu/Ticket/Display.html?id=344322 "https://help.reed.edu/Ticket/Display.html?id=344322"))
    -   “Notification of staff hire” email from etrieve (see [example](https://help.reed.edu/Ticket/Display.html?id=343836 "https://help.reed.edu/Ticket/Display.html?id=343836"))
-   [**google drive**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27google%20drive%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Request to create new shared drive, modify permissions to existing shared drive.
  -   Questions or issues related to google docs, sheets, forms, etc.
  -   Back-ups/data transfer of google drive.
  -   Do not tag for other google services (calendar, gmail, etc.)
-   [**google group**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27google%20group%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Request to create new google group.
  -   Request to create course autolist (these are automated google groups)
  -   Update member access to google group.
  -   Do not tag for mass-email pending messages–subject like “fa - groups.reed.edu admins: Message Pending” (see [example](https://help.reed.edu/Ticket/Display.html?id=344110 "https://help.reed.edu/Ticket/Display.html?id=344110"))
-   [**hardware**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27hardware%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Broken keyboards, mice, etc.
  -   liquid spills, laptop battery issues.
  -   Monitor connection issues.
  -   other hardware issues that may be moved to the shop queue
-   [**library related**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27library%20related%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Anything involving the library (IMC, LangLab, Library Printers, access for library student workers, etc).
-   [**mass email**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27mass%20email%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Message pending, authorization to release mass email. (see [example](https://help.reed.edu/Ticket/Display.html?id=344302 "https://help.reed.edu/Ticket/Display.html?id=344302"))
  -   Do not tag the released message that gets copied to cus (see [example](https://help.reed.edu/Ticket/Display.html?id=344046 "https://help.reed.edu/Ticket/Display.html?id=344046")). Do not set the affiliation either.
  - msgappr@groups.reed.edu or  groups.reed.edu admins: Message Pending in title
-   [**microsoft**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27microsoft%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Microsoft office/365 Password resets.
  -   Any office application (Word, PowerPoint, Excel).
  -   Do not tag Word Thesis Template issues.
-   [**network**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27network%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Poor/unreliable wireless or wired.
  -   General connection issues to any network including Reed1x
  -   Network device registration.
-   [**password reset**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27password%20reset%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Kerberos account. ([hard coded by subject line](https://help.reed.edu/Ticket/Display.html?id=344626))
  -   Microsoft office/365 Password resets. (hard coded by sender, done)
  -   ==Administrative AD Account.==
-   [**phish report/fwd**](https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27phish%20report%2Ffwd%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new)
  -   Suspected phishing emails that user reports or asks for confirmation.
-   [printing/copier](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27printers%2Fcopiers%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   Any printer or copier issue
  -   The CTX Service Request tickets in the T-Watch queue.
  -   Installing printers/copiers.
-   [**reed accounts & access**](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27reed%20accounts%20%26%20access%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   New employee/student/faculty account claim.
  -   Request to be added/removed from delegated account/dList.
  -   VPN requests/approvals
  * blackboard
  * [auth group](https://help.reed.edu/Ticket/Display.html?id=336699)
-   [**software**](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27software%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   OS updates/upgrades.
  -   Signing into Adobe apps.
  -   Computer crash, kernel panics.
  -   Other software/applications, such as 1Password
-   [**thesis**](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27thesis%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   Thesis formatting
-   [**two-factor**](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27two-factor%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   Duo enrollment issues (new or replacement device).
  -   Duo lockout reports
  -   Assigning Hardware tokens.
  - "two-step" "duo" "two step"
  - must be newer than Oct 2018 [source](https://help.reed.edu/Ticket/Display.html?id=231671)
    - at most we'd go back to last August for a full academic year but we're starting with Jan-current_day for now
-   [user/name change](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27user%2Fname%20change%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   Notification of legal name change.
  -   Request to change user name.
-   [virus/malware](<https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20%27CF.%7BSupport%20Tags%7D%27%20LIKE%20%27virus%2Fmalware%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new>)
  -   Crowd Strike notifications.
  -   Suspected virus/malware issues.
  - Look for:
    - noreply@malwarebytes.com
    - falcon crowdstrike virus malware malicious trojan




Newly created tickets will auto-tag based on requestor (If I create a ticket, it will auto-tag as "Student"). *but* if i then change requestor to Ben Salz, it still stays student.