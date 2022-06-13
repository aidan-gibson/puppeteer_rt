import * as reg from './regexConstants'
import puppeteer = require('puppeteer')
import { Page } from 'puppeteer'
import { readFileSync } from 'fs'
const pw = readFileSync('./password.txt', 'utf-8')
const login = 'aigibson'
const reedLoginURL = 'https://weblogin.reed.edu/?cosign-help&'
const ticketURL = 'https://help.reed.edu/Ticket/Display.html?id='
const currentTicket = 210770 //336797

async function run() {
  const browser = await puppeteer.launch({
    //devtools: true, //this also forces {headless: false}
    //dumpio: true //captures all console messages to output https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
  })
  //const page = await browser.newPage()
  const [page] = await browser.pages() //this fixes extra empty tab being open instead of above line
  await page.setViewport({ width: 1692, height: 777 }) //({ width: 850, height: 800}); //doesn't matter
  await page.goto(reedLoginURL + ticketURL + currentTicket)
  await page.type('[name="login"]', login)
  await page.type('[name="password"]', pw)
  await page.click(`button[class="btn btn-primary pull-right"]`)

  ticketFix(page)
}
async function checkSpecificBox(page: Page, checkBoxSelector: string): Promise<void> {
  //required, otherwise will attempt to click too soon and throw error
  await page.waitForSelector(`input[value="${checkBoxSelector}"]`)
  // @ts-ignore TODO
  await page.$eval(`input[value="${checkBoxSelector}"]`, (check) => (check.checked = true))
  // old inefficient way, leaving so my future self can see
  //if checkbox is already checked, don't click!
  //const checkbox = await page.$(`input[value="google drive"]`);
  //let checked = await (await checkbox.getProperty('checked')).jsonValue(); //true if checked, false if unchecked
  //if (!checked){
  //await checkbox.click();//}
  //await page.click(`input[value="google drive"]`);//}

  // instead of checking if checked, then clicking, I can directly set checked to true
  //await page.$eval(`input[value="google drive"]`, check => check.checked = true);
}
async function ticketFix(page: Page): Promise<void> {
  //click "Show all quoted text" anchor; necessary if the init ticket has "show quoted text" and we need it like here https://help.reed.edu/Ticket/Display.html?id=346157
  const quotedTextSelector = `#ticket-${currentTicket}-history > div > div.titlebox-title > span.right > a:nth-child(1)`
  await page.waitForSelector(quotedTextSelector)
  await page.click(quotedTextSelector)

  //TITLE EMERITUS SECTION
  const titleSelector = `.CustomField__Title_ > span.value` //must check if there are multiple
  await page.waitForSelector(titleSelector) //TODO this waits for FIRST selector matching, what if the first loads faster than the second??
  //this was from when I didn't realize there could b mult requestors
  //let titleElement = await page.$(titleSelector);
  //let titleValue = await page.evaluate(el => el.textContent, titleElement);

  const titleElements = await page.$$(titleSelector)
  let emeritus = false
  for await (const titleElement of titleElements) {
    const titleValue = await page.evaluate((el) => el.textContent, titleElement)
    if (titleValue.includes('emeritus') || titleValue.includes('Emeritus') || titleValue.includes('emerita') || titleValue.includes('Emerita')) {
      emeritus = true
    }
  }
  //console.log("Emeritus: "+emeritus);

  //AFFILIATIONS SECTION
  //const affiliationSelector = `.CustomField__Secondary_Affiliations_ > span.value`;
  const affiliationSelector = `.CustomField__Primary_Affiliation_ > span.value`

  //let affiliationsElement = await page.$(affiliationSelector);
  //let affiliationsValue = await page.evaluate(el => el.textContent, affiliationsElement);
  let faculty = false
  let student = false
  let affiliate = false
  let alumni = false
  let staff = false

  const affiliationsElements = await page.$$(affiliationSelector)

  for await (const affiliationsElement of affiliationsElements) {
    const affiliationsValue = await page.evaluate((el) => el.textContent, affiliationsElement)
    if (affiliationsValue.includes('faculty')) {
      faculty = true
    } else if (affiliationsValue.includes('student')) {
      student = true
    } else if (affiliationsValue.includes('affiliate')) {
      affiliate = true
    } else if (affiliationsValue.includes('alumni') || affiliationsValue.includes('alum')) {
      alumni = true
    } else if (affiliationsValue.includes('staff')) {
      staff = true
    }
  }
  // console.log("Faculty: "+faculty);
  // console.log("Student: "+student);
  // console.log("Affiliate: "+affiliate);
  // console.log("Alumni: "+alumni);
  // console.log("Staff: "+staff);
  //TODO let possibleApplicant: boolean

  //EMAIL CHECK SECTION
  let nonReedEmail = false
  const emailSelector = `.EmailAddress > span.value`
  const emailElements = await page.$$(emailSelector)
  const emails: string[] = []
  for await (const emailElement of emailElements) {
    const emailValue = await page.evaluate((el) => el.textContent, emailElement)
    emails.push(emailValue)
    if (!emailValue.includes('@reed.edu')) {
      nonReedEmail = true
    }
  }
  if (!emeritus && !student && !affiliate && !alumni && !staff && !faculty && !emails.toString().includes('@reed.edu')) {
    nonReedEmail = true
  }

  // END AFFILIATION, BEGIN SUPPORT TAGS

  //the bools which actually decide
  let googleDrive = false
  let googleGroup = false
  let hardware = false
  let libraryRelated = false
  let massEmail = false
  let microsoft = false
  let network = false
  let passwordReset = false
  let phish = false
  let printing = false
  let reedAccounts = false
  let software = false
  let thesis = false
  let twoFactor = false
  let nameChange = false
  let virusMalware = false
  let noTag = false

  let messages = '' //all emails in this string
  const ticketHistorySelector = `div.history-container > div.message` //only add it if it's a comment, correspondance, or the initial ticket opening. we don't want others, esp "Support Tags xyz deleted" which could falsely re-trigger the regex for that tag. message class is only transaction we're interested in
  await page.waitForSelector(ticketHistorySelector)
  const emailStanzas = await page.$$(ticketHistorySelector)
  for await (const emailStanza of emailStanzas) {
    const emailValue = await page.evaluate((el) => el.innerText, emailStanza) //this gives proper spacing after changing textContent to innerText
    if (!emailValue.includes()) messages += emailValue + '\n'
  }
  messages += emails + '\n' //putting the email values in messages to simplify search
  await page.waitForSelector('#header > h1') //title of ticket
  const ticketTitleElement = await page.$('#header > h1')
  const ticketTitleValue = await page.evaluate((el) => el.textContent, ticketTitleElement)
  messages += ticketTitleValue + '\n'

  //HARD RULES SECTION (obvious/easy support tag selection). true no matter WHAT. nothing fuzzy/ambiguous.

  //console.log(messages)
  if (emails.toString().includes('malwarebytes.com')) {
    virusMalware = true
  } else if (emails.toString().includes('crowdstrike')) {
    virusMalware = true
  } else if (emails.toString().includes('etrieve@reed.edu')) {
    noTag = true
  } //no tag, this is the "Notification of Staff Hire" emails
  else if (ticketTitleValue.includes('Welcome to Reed College | Notes for your first day of work')) {
  } //no tag https://help.reed.edu/Ticket/Display.html?id=347871
  else if (ticketTitleValue.includes('Welcome to Reed College')) {
    noTag = true
  } //no tag
  else if (emails.toString().includes('msgappr@groups.reed.edu') || ticketTitleValue.includes('groups.reed.edu admins: Message Pending')) {
    massEmail = true
  } else if (ticketTitleValue.includes('Shared Drive Request')) {
    googleDrive = true
  } else if (ticketTitleValue.includes('Google Group Request')) {
    googleGroup = true
  } else if (ticketTitleValue.includes('[Ask a librarian]')) {
    libraryRelated = true
  } else if (emails.toString().includes('er-problem-report@reed.edu')) {
    libraryRelated = true
  } else if (emails.toString().includes('msonlineservicesteam@microsoftonline.com')) {
    microsoft = true
    passwordReset = true
  } else if (emails.toString().includes('@microsoft.com')) {
    microsoft = true
  } else if (emails.toString().includes('@microsoftonline.com')) {
    microsoft = true
  } else if (ticketTitleValue.includes('Wireless Maintenance')) {
    network = true
  } else if (ticketTitleValue.includes('ipp.reed.edu')) {
    network = true
    printing = true
  } else if (ticketTitleValue.includes('Kerberos password reset')) {
    passwordReset = true
  } //https://help.reed.edu/Ticket/Display.html?id=344626
  else if (emails.toString().includes('noreply-spamdigest@google.com')) {
    phish = true
  } else if (emails.toString().includes('xerox') || emails.toString().includes('ctx')) {
    printing = true
  } else if (ticketTitleValue.includes('Reed computing account')) {
    reedAccounts = true
  } else if (ticketTitleValue.includes('Your Reed computing accounts are scheduled to be closed')) {
    reedAccounts = true
  } else if (messages.includes('Please follow the steps below to setup your Reed account')) {
    reedAccounts = true
  } else if (ticketTitleValue.includes('Account Closure for Graduates')) {
    reedAccounts = true
  } else if (ticketTitleValue.includes('Account Tool')) {
    reedAccounts = true
  } else if (ticketTitleValue.includes('Computing at Reed')) {
    reedAccounts = true
  } else if (ticketTitleValue.includes('Duo') || ticketTitleValue.includes('DUO') || ticketTitleValue.includes('duo')) {
    twoFactor = true
  } else if (emails.toString().includes('schrodinger.com')) {
    noTag = true
  } else if (ticketTitleValue.includes('google group')) {
    googleGroup = true
  } else if (ticketTitleValue.includes('Google Group')) {
    googleGroup = true
  } else {
    //regex section, only run if no hard rules found (moved regex lists outside of fnc to b global

    //maybe score it??? +1 point for each regex hit, -1 point for each NOhit? BUT there can b mult tags...tricky

    const googleDriveMatch = reg.googleDriveRegexList.some((rx) => rx.test(messages)) && !reg.noGoogleDriveRegexList.some((rx) => rx.test(messages))
    const googleGroupMatch = reg.googleGroupRegexList.some((rx) => rx.test(messages)) && !reg.noGoogleGroupRegexList.some((rx) => rx.test(messages))
    const hardwareMatch = reg.hardwareRegexList.some((rx) => rx.test(messages)) && !reg.noHardwareRegexList.some((rx) => rx.test(messages))
    const libraryRelatedMatch = reg.libraryRelatedRegexList.some((rx) => rx.test(messages)) && !reg.noLibraryRelatedRegexList.some((rx) => rx.test(messages))
    const massEmailMatch = reg.massEmailRegexList.some((rx) => rx.test(messages)) && !reg.noMassEmailRegexList.some((rx) => rx.test(messages))
    const microsoftMatch = reg.microsoftRegexList.some((rx) => rx.test(messages)) && !reg.noMicrosoftRegexList.some((rx) => rx.test(messages))
    const networkMatch = reg.networkRegexList.some((rx) => rx.test(messages)) && !reg.noNetworkRegexList.some((rx) => rx.test(messages))
    const passwordResetMatch = reg.passwordResetRegexList.some((rx) => rx.test(messages)) && !reg.noPasswordResetRegexList.some((rx) => rx.test(messages))
    const phishMatch = reg.phishRegexList.some((rx) => rx.test(messages)) && !reg.noPhishRegexList.some((rx) => rx.test(messages))
    const printingMatch = reg.printingRegexList.some((rx) => rx.test(messages)) && !reg.noPrintingRegexList.some((rx) => rx.test(messages))
    const reedAccountsMatch = reg.reedAccountsRegexList.some((rx) => rx.test(messages)) && !reg.noReedAccountsRegexList.some((rx) => rx.test(messages))
    const softwareMatch = reg.softwareRegexList.some((rx) => rx.test(messages)) && !reg.noSoftwareRegexList.some((rx) => rx.test(messages))
    const thesisMatch = reg.thesisRegexList.some((rx) => rx.test(messages)) && !reg.noThesisRegexList.some((rx) => rx.test(messages))
    const twoFactorMatch = reg.twoFactorRegexList.some((rx) => rx.test(messages)) && !reg.noTwoFactorRegexList.some((rx) => rx.test(messages))
    const nameChangeMatch = reg.nameChangeRegexList.some((rx) => rx.test(messages)) && !reg.noNameChangeRegexList.some((rx) => rx.test(messages))
    const virusMalwareMatch = reg.virusMalwareRegexList.some((rx) => rx.test(messages)) && !reg.noVirusMalwareRegexList.some((rx) => rx.test(messages))
    const noTagMatch = reg.noTagRegexList.some((rx) => rx.test(messages)) && !reg.noNoTagRegexList.some((rx) => rx.test(messages))

    //logic of Match bools -> real bools
    //this may seem redundant to have the "match" set of bools as well, but it gives extra flexibility
    if (noTagMatch) {
      noTag = true
    } else {
      if (googleDriveMatch) {
        googleDrive = true
      }
      if (googleGroupMatch) {
        googleGroup = true
      }
      if (hardwareMatch) {
        hardware = true
      }
      if (libraryRelatedMatch) {
        libraryRelated = true
      }
      if (massEmailMatch) {
        massEmail = true
      }
      if (microsoftMatch) {
        microsoft = true
      }
      if (networkMatch) {
        network = true
      }
      if (phishMatch) {
        phish = true
      }
      if (printingMatch) {
        printing = true
      }
      if (reedAccountsMatch) {
        reedAccounts = true
      }
      if (softwareMatch) {
        software = true
      }
      if (twoFactorMatch) {
        twoFactor = true
      }
      if (nameChangeMatch) {
        nameChange = true
      }
      if (virusMalwareMatch) {
        virusMalware = true
      }

      //keep these exceptions at bottom
      if (passwordResetMatch) {
        passwordReset = true
        reedAccounts = false
      } //if password reset, NOT reed account, always
      if (thesisMatch) {
        thesis = true
        microsoft = false
      } //if thesis, NOT microsoft, always
    }
    //if no matches (no regex match AND no hard rule match(implied here)), flag for manual review
    if (!googleDriveMatch && !googleGroupMatch && !hardwareMatch && !libraryRelatedMatch && !massEmailMatch && !microsoftMatch && !networkMatch && !passwordResetMatch && !phishMatch && !printingMatch && !reedAccountsMatch && !softwareMatch && !thesisMatch && !twoFactorMatch && !nameChangeMatch && !virusMalwareMatch && !noTagMatch && !noTag) {
      console.log('FLAG NO REGEX MATCH ' + page.url())
    }
  } //end of else regex section

  //PAGE CHANGE
  const currURL: string = page.url()
  //replace Display with Modify
  const modifyURL: string = currURL.replace('Display', 'Modify')
  await page.goto(modifyURL)

  //TODO remember (for older tickets especially) the requester affiliation may have literally changed, like when ticket was made they were faculty and it was tagged as such but now they are not etc

  console.log('Current Ticket: ' + page.url())

  //checks if in t-watch or cus queue; other queues will probably MOSTLY work but I haven't tested
  const queue = await page.$$(`select.select-queue`)
  const queueValue = await page.evaluate((q) => q.value, queue[1])
  if (queueValue != 4 && queueValue != 11) {
    console.log('Not CUS or TWatch Queue' + ' ' + queueValue)
    process.exit() //ends entire script
  }

  const googleDriveCheckbox = await page.$(`input[value="google drive"]`)
  const googleDriveChecked = await (await googleDriveCheckbox.getProperty('checked')).jsonValue()
  if (googleDrive != googleDriveChecked) {
    console.log('Algo Google Drive: ' + googleDrive + 'Ticket Google Drive: ' + googleDriveChecked)
  }

  const googleGroupCheckbox = await page.$(`input[value="google group"]`)
  const googleGroupChecked = await (await googleGroupCheckbox.getProperty('checked')).jsonValue()
  if (googleGroup != googleGroupChecked) {
    console.log('Algo Google Group: ' + googleGroup + 'Ticket Google Group: ' + googleGroupChecked)
  }

  const hardwareCheckbox = await page.$(`input[value="hardware"]`)
  const hardwareChecked = await (await hardwareCheckbox.getProperty('checked')).jsonValue()
  if (hardware != hardwareChecked) {
    console.log('Algo Hardware: ' + hardware + 'Ticket Hardware: ' + hardwareChecked)
  }

  const libraryRelatedCheckbox = await page.$(`input[value="library related"]`)
  const libraryRelatedChecked = await (await libraryRelatedCheckbox.getProperty('checked')).jsonValue()
  if (libraryRelated != libraryRelatedChecked) {
    console.log('Algo LibraryRelated: ' + libraryRelated + 'Ticket LibraryRelated: ' + libraryRelatedChecked)
  }

  const massEmailCheckbox = await page.$(`input[value="mass email"]`)
  const massEmailChecked = await (await massEmailCheckbox.getProperty('checked')).jsonValue()
  if (massEmail != massEmailChecked) {
    console.log('Algo massEmail: ' + massEmail + 'Ticket massEmail: ' + massEmailChecked)
  }

  const microsoftCheckbox = await page.$(`input[value="microsoft"]`)
  const microsoftChecked = await (await microsoftCheckbox.getProperty('checked')).jsonValue()
  if (microsoft != microsoftChecked) {
    console.log('Algo microsoft: ' + microsoft + 'Ticket microsoft: ' + microsoftChecked)
    for (let i = 0; i < reg.microsoftRegexList.length; i++) {
      console.log(reg.microsoftRegexList[i].exec(messages))
    }
  }

  const networkCheckbox = await page.$(`input[value="network"]`)
  const networkChecked = await (await networkCheckbox.getProperty('checked')).jsonValue()
  if (network != networkChecked) {
    console.log('Algo network: ' + network + 'Ticket network: ' + networkChecked)
  }

  const passwordResetCheckbox = await page.$(`input[value="password reset"]`)
  const passwordResetChecked = await (await passwordResetCheckbox.getProperty('checked')).jsonValue()
  if (passwordReset != passwordResetChecked) {
    console.log('Algo passwordReset: ' + passwordReset + 'Ticket passwordReset: ' + passwordResetChecked)
  }

  const phishCheckbox = await page.$(`input[value="phish report/fwd"]`)
  const phishChecked = await (await phishCheckbox.getProperty('checked')).jsonValue()
  if (phish != phishChecked) {
    console.log('Algo phish: ' + phish + 'Ticket phish: ' + phishChecked)
  }

  const printingCheckbox = await page.$(`input[value="printers/copiers"]`)
  const printingChecked = await (await printingCheckbox.getProperty('checked')).jsonValue()
  if (printing != printingChecked) {
    console.log('Algo printing: ' + printing + 'Ticket printing: ' + printingChecked)
  }

  const reedAccountsCheckbox = await page.$(`input[value="reed accounts & access"]`)
  const reedAccountsChecked = await (await reedAccountsCheckbox.getProperty('checked')).jsonValue()
  if (reedAccounts != reedAccountsChecked) {
    console.log('Algo reedAccounts: ' + reedAccounts + 'Ticket reedAccounts: ' + reedAccountsChecked)
  }

  const softwareCheckbox = await page.$(`input[value="software"]`)
  const softwareChecked = await (await softwareCheckbox.getProperty('checked')).jsonValue()
  if (software != softwareChecked) {
    console.log('Algo software: ' + software + 'Ticket software: ' + softwareChecked)
    for (let i = 0; i < reg.softwareRegexList.length; i++) {
      console.log(reg.softwareRegexList[i].exec(messages))
    }
  }

  const thesisCheckbox = await page.$(`input[value="thesis"]`)
  const thesisChecked = await (await thesisCheckbox.getProperty('checked')).jsonValue()
  if (thesis != thesisChecked) {
    console.log('Algo thesis: ' + thesis + 'Ticket thesis: ' + thesisChecked)
  }

  const twoFactorCheckbox = await page.$(`input[value="two-factor"]`)
  const twoFactorChecked = await (await twoFactorCheckbox.getProperty('checked')).jsonValue()
  if (twoFactor != twoFactorChecked) {
    console.log('Algo twoFactor: ' + twoFactor + 'Ticket twoFactor: ' + twoFactorChecked)
  }

  const nameChangeCheckbox = await page.$(`input[value="user/name change"]`)
  const nameChangeChecked = await (await nameChangeCheckbox.getProperty('checked')).jsonValue()
  if (nameChange != nameChangeChecked) {
    console.log('Algo nameChange: ' + nameChange + 'Ticket nameChange: ' + nameChangeChecked)
  }

  const virusMalwareCheckbox = await page.$(`input[value="virus/malware"]`)
  const virusMalwareChecked = await (await virusMalwareCheckbox.getProperty('checked')).jsonValue()
  if (virusMalware != virusMalwareChecked) {
    console.log('Algo virusMalware: ' + virusMalware + 'Ticket virusMalware: ' + virusMalwareChecked)
  }

  console.log('End')
  //console.log(messages)
  //TODO also the affiliation stuff! check how the prospie logic works again. or maybe dont test it for now tbh, one thing at a time

  //
  // if (emeritus){
  //     if (faculty){checkSpecificBox(page,"emeritus/emerita");checkSpecificBox(page,"faculty");}
  //     else if(staff){checkSpecificBox(page,"emeritus/emerita");checkSpecificBox(page,"staff");}
  // }
  // else if(student){
  //     checkSpecificBox(page,"student");
  //     //if(affiliate){checkSpecificBox(page,"affiliate")}
  // }
  // else if(alumni){
  //     checkSpecificBox(page,"alumni");
  //     //if(faculty){checkSpecificBox(page,"faculty")}
  //     //if(staff){checkSpecificBox(page,"staff")}
  //     //if(affiliate){checkSpecificBox(page,"affiliate")}
  // }
  // else if(faculty){checkSpecificBox(page,"faculty")}
  // else if(staff){checkSpecificBox(page,"staff")}
  // else if(affiliate){checkSpecificBox(page,"affiliate")}
  // else if(nonReedEmail){console.log("FLAG Possible Prospie: "+modifyURL)}//TODO add to an array to print at end or console.log it or smth
  //
  // //SUPPORT TAGS CHECKING BOXES
  // if(googleDrive){checkSpecificBox(page,"google drive")}
  // if(googleGroup){checkSpecificBox(page,"google group")}
  // if(hardware){checkSpecificBox(page,"hardware")}
  // if(libraryRelated){checkSpecificBox(page,"library related")}
  // if(massEmail){checkSpecificBox(page,"mass email")}
  // if(microsoft){checkSpecificBox(page, "microsoft")}
  // if(network){checkSpecificBox(page,"network")}
  // if(passwordReset){checkSpecificBox(page,"password reset")}
  // if(phish){checkSpecificBox(page,"phish report/fwd")}
  // if(printing){checkSpecificBox(page,"printers/copiers")}
  // if(reedAccounts){checkSpecificBox(page,"reed accounts & access")}
  // if(software){checkSpecificBox(page, "software")}
  // if(thesis){checkSpecificBox(page,"thesis")}
  // if(twoFactor){checkSpecificBox(page,"two-factor")}
  // if(nameChange){checkSpecificBox(page,"user/name change")}
  // if(virusMalware){checkSpecificBox(page,"virus/malware")}

  //presses submit
  //await page.click("#TicketModify > div.submit > div.buttons > input")
}

run()
