import { Page } from "puppeteer";
import { readFileSync } from 'fs';
const pw = readFileSync('./password.txt','utf-8')
const login = "aigibson";
const reedLoginURL = "https://weblogin.reed.edu/?cosign-help&";
const ticketURL = "https://help.reed.edu/Ticket/Display.html?id="
let currentTicket = 336611
const puppeteer = require('puppeteer');

//i means case insensitive
const googleDriveRegexList = [/google drive/i, /drive request/i]
const NOgoogleDriveRegexList = []
const googleGroupRegexList = [/google group/i, /@groups.google/, /group request/i]
const NOgoogleGroupRegexList = []
const hardwareRegexList = []
const NOhardwareRegexList = []
const libraryRelatedRegexList = [/e-book/i,/library/i, /librarian/i, /IMC/, /LangLab/i]
const NOlibraryRelatedRegexList = []
const massEmailRegexList = [/release email/i, /groups.reed.edu admins: Message Pending/, /mass email/i]
const NOmassEmailRegexList = []
const microsoftRegexList = [/microsoft/i, /powerpoint/i, /excel/i, /Word/, /macro/i, /.doc\b/, /.docx\b/, /ppt\b/,/pptx\b/, /csv/, /.xl/] //got rid of /Office/ cuz Office of the Registrar etc can be in signatures
const NOmicrosoftRegexList = [/template/i] //word thesis template issues are NOT microsoft tag
const networkRegexList = [/wifi/i,/ethernet/i,/connection issue/i,/reed1x/i,/fluke/i, /MAC/, /mac address/i, /network/i, /\bdns\b/i,/trouble connect/i, /issues accessing/i, /alexa/i, /netreg/i, /xenia/, /wireless maint/i] ///([a-z0-9]+[.])*reed[.]edu/i removed this, too ambig. ie account-tools.reed.edu is clearly password reset only.
const NOnetworkRegexList = [/groups.reed.edu/]
const passwordResetRegexList = [/password reset/i, /forgot password/i, /kerberos pass/i, /account-tools/] //can't use just "password" cuz ben's signature is "cis will never ask for ur password" AND it'd conflict w "Software" tag looking for 1password
const NOpasswordResetRegexList = []
const phishRegexList = [/phish/i, /scam/i, /spam/i]
const NOphishRegexList = []
const printingRegexList = [/print/i, /ipp.reed.edu/, /xerox/i, /ctx/i, /laserjet/i, /toner/i]
const NOprintingRegexList = []
const reedAccountsRegexList = [/new employee/i, /kerberos/i, /vpn/i, /dlist/i, /delegate/i, /setup your Reed account/i, /claim your Reed account/i, /account creation/i, /listserv/i, /accounts are scheduled to be closed/i, /reed computing accounts/i, /account tool/i, /online_forms\/protected\/computing.php/, /account_closing/]
const NOreedAccountsRegexList = []
const softwareRegexList = [/1password/i, /one-password/i, /onepassword/i, /OS update/i, /OS upgrade/i, /kernel/i, /adobe/i, /acrobat/i, /photoshop/i, /creative cloud/i, /premiere pro/i, /lightroom/i, /indesign/i, /CS6/, /dreamweaver/i, /premiere rush/i, /code42/i, /crash/i, /Upgrade NOT Recommended/, /Monterey/i, /RStudio/i, /mathematica/i, /wolfram/i, /medicat/i, /big sur/i, /catalina/i, /mojave/i, /high sierra/i, /operating system/i, /\bvlc\b/i, /quicktime/i, /zotero/i, /latex/i, /stata/i, /filemaker/i, /vmware/i] //removed /\bdriver\b/i
const NOsoftwareRegexList = []
const thesisRegexList = [/thesis/i]//[/thesis format/i, /thesis template/i, /thesis word template/i, /r template/i]
const NOthesisRegexList = []
const twoFactorRegexList = [/duo/i, /twostep/i, /two-step/i, /hardware token/i]
const NOtwoFactorRegexList = []
const nameChangeRegexList = [/name change/i, /change name/i]
const NOnameChangeRegexList = []
const virusMalwareRegexList = [/falcon/i, /crowdstrike/i, /virus/i, /malware/i, /malicious/i, /trojan/i,]
const NOvirusMalwareRegexList = []
const noTagRegexList = []
const NOnoTagRegexList = []

async function run() {
    const browser = await puppeteer.launch({
                                               devtools: true, //this also forces {headless: false}
                                               //dumpio: true //captures all console messages to output https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
                                           })
    //const page = await browser.newPage()
    const [page] = await browser.pages(); //this fixes extra empty tab being open instead of above line
    await page.setViewport({ width: 1692, height: 777});//({ width: 850, height: 800}); //doesn't matter
    await page.goto(reedLoginURL+ticketURL+currentTicket)
    await page.type('[name="login"]', login)
    await page.type('[name="password"]', pw)
    await page.click(`button[class="btn btn-primary pull-right"]`)

    ticketFix(page);




}
async function checkSpecificBox(page : Page, checkBoxSelector: string) : Promise<void> {
    //required, otherwise will attempt to click too soon and throw error
    await page.waitForSelector(`input[value="${checkBoxSelector}"]`);
    // @ts-ignore
    await page.$eval(`input[value="${checkBoxSelector}"]`, check => check.checked = true);
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
async function ticketFix(page : Page) : Promise<void> {

    //click "Show all quoted text" anchor; necessary if the init ticket has "show quoted text" and we need it like here https://help.reed.edu/Ticket/Display.html?id=346157
    const quotedTextSelector = `#ticket-${currentTicket}-history > div > div.titlebox-title > span.right > a:nth-child(1)`
    await page.waitForSelector(quotedTextSelector)
    await page.click(quotedTextSelector)

    //TITLE EMERITUS SECTION
    const titleSelector = `.CustomField__Title_ > span.value`;//must check if there are multiple
    await page.waitForSelector(titleSelector); //TODO this waits for FIRST selector matching, what if the first loads faster than the second??
    //this was from when I didn't realize there could b mult requestors
    //let titleElement = await page.$(titleSelector);
    //let titleValue = await page.evaluate(el => el.textContent, titleElement);

    let titleElements = await page.$$(titleSelector);
    let emeritus : boolean = false;
    for await(let titleElement of titleElements){
        let titleValue = await page.evaluate(el => el.textContent, titleElement);
        if(titleValue.includes("emeritus") || titleValue.includes("Emeritus") || titleValue.includes("emerita") || titleValue.includes("Emerita")){
            emeritus = true;
        }

    }
    //console.log("Emeritus: "+emeritus);

    //AFFILIATIONS SECTION
    //const affiliationSelector = `.CustomField__Secondary_Affiliations_ > span.value`;
    const affiliationSelector = `.CustomField__Primary_Affiliation_ > span.value`;


    //let affiliationsElement = await page.$(affiliationSelector);
    //let affiliationsValue = await page.evaluate(el => el.textContent, affiliationsElement);
    let faculty: boolean = false;
    let student: boolean = false;
    let affiliate: boolean = false;
    let alumni: boolean = false;
    let staff: boolean = false;

    let affiliationsElements = await page.$$(affiliationSelector);

    for await(let affiliationsElement of affiliationsElements){
        let affiliationsValue = await page.evaluate(el => el.textContent, affiliationsElement);
        if(affiliationsValue.includes("faculty")){
            faculty = true;
        }
        else if(affiliationsValue.includes("student")){
            student = true;
        }
        else if(affiliationsValue.includes("affiliate")){
            affiliate = true;
        }
        else if(affiliationsValue.includes("alumni")|| affiliationsValue.includes("alum")){
            alumni = true;
        }
        else if(affiliationsValue.includes("affiliate")){
            affiliate = true;
        }
        else if(affiliationsValue.includes("staff")){
            staff = true;
        }

    }
    // console.log("Faculty: "+faculty);
    // console.log("Student: "+student);
    // console.log("Affiliate: "+affiliate);
    // console.log("Alumni: "+alumni);
    // console.log("Staff: "+staff);
    //TODO let possibleApplicant: boolean

    //EMAIL CHECK SECTION
    let nonReedEmail : boolean = false;
    const emailSelector = `.EmailAddress > span.value`;
    let emailElements = await page.$$(emailSelector);
    let emails : string[] = [];
    for await(let emailElement of emailElements){
        let emailValue = await page.evaluate(el => el.textContent, emailElement);
        emails.push(emailValue);
        if(!(emailValue.includes("@reed.edu"))){nonReedEmail=true;}
    }
    if (!emeritus && !student && !affiliate && !alumni && !staff && !faculty && !emails.includes("@reed.edu")){
        nonReedEmail = true;
    }

    // END AFFILIATION, BEGIN SUPPORT TAGS

    //the bools which actually decide
    let googleDrive: boolean = false;
    let googleGroup: boolean = false;
    let hardware: boolean = false;
    let libraryRelated: boolean = false;
    let massEmail: boolean = false;
    let microsoft: boolean = false;
    let network: boolean = false;
    let passwordReset: boolean = false;
    let phish: boolean = false;
    let printing: boolean = false;
    let reedAccounts: boolean = false;
    let software: boolean = false;
    let thesis: boolean = false;
    let twoFactor: boolean = false;
    let nameChange: boolean = false;
    let virusMalware: boolean = false;
    let noTag: boolean = false;

    let messages: string = ""; //all emails in this string
    const ticketHistorySelector = `div.history-container > div.message`; //only add it if it's a comment, correspondance, or the initial ticket opening. we don't want others, esp "Support Tags xyz deleted" which could falsely re-trigger the regex for that tag. message class is only transaction we're interested in
    await page.waitForSelector(ticketHistorySelector);
    let emailStanzas = await page.$$(ticketHistorySelector);
    for await(let emailStanza of emailStanzas){
        let emailValue = await page.evaluate(el => el.innerText, emailStanza) //this gives proper spacing after changing textContent to innerText
        messages+=emailValue+"\n"
    }
    messages+=emails+"\n" //putting the email values in messages to simplify search
    await page.waitForSelector("#header > h1") //title of ticket
    let ticketTitleElement = await page.$("#header > h1");
    let ticketTitleValue = await page.evaluate(el => el.textContent, ticketTitleElement);
    messages+=ticketTitleValue+"\n"

    //HARD RULES SECTION (obvious/easy support tag selection). true no matter WHAT. nothing fuzzy/ambiguous.

    if (emails.includes("malwarebytes.com")){virusMalware=true}
    else if(emails.includes("crowdstrike")){virusMalware=true}
    else if(emails.includes("etrieve@reed.edu")){noTag=true}//no tag, this is the "Notification of Staff Hire" emails
    else if(ticketTitleValue.includes("Welcome to Reed College | Notes for your first day of work")){}//no tag https://help.reed.edu/Ticket/Display.html?id=347871
    else if(ticketTitleValue.includes("Welcome to Reed College")){noTag=true}//no tag
    else if(emails.includes("msgappr@groups.reed.edu")||ticketTitleValue.includes("groups.reed.edu admins: Message Pending")){massEmail=true}
    else if(ticketTitleValue.includes("Shared Drive Request")){googleDrive=true}
    else if(ticketTitleValue.includes("Google Group Request")){googleGroup=true}
    else if(ticketTitleValue.includes("[Ask a librarian]")){libraryRelated=true}
    else if(emails.includes("er-problem-report@reed.edu")){libraryRelated=true}
    else if(emails.includes("msonlineservicesteam@microsoftonline.com")){microsoft=true; passwordReset=true;}
    else if(emails.includes("@microsoft.com")){microsoft=true}
    else if(emails.includes("@microsoftonline.com")){microsoft=true}
    else if(ticketTitleValue.includes("Wireless Maintenance")){network=true}
    else if(ticketTitleValue.includes("ipp.reed.edu")){network=true; printing = true;}
    else if(ticketTitleValue.includes("Kerberos password reset")){passwordReset=true} //https://help.reed.edu/Ticket/Display.html?id=344626
    else if(emails.includes("noreply-spamdigest@google.com")){phish=true}
    else if(emails.includes("xerox")||(emails.includes("ctx"))){printing=true}
    else if(ticketTitleValue.includes("Reed computing account")){reedAccounts=true}
    else if(ticketTitleValue.includes("Your Reed computing accounts are scheduled to be closed")){reedAccounts=true}
    else if(messages.includes("Please follow the steps below to setup your Reed account")){reedAccounts=true}
    else if(ticketTitleValue.includes("Account Closure for Graduates")){reedAccounts=true}
    else if(ticketTitleValue.includes("Account Tool")){reedAccounts=true}
    else if(ticketTitleValue.includes("Computing at Reed")){reedAccounts=true}
    else if(ticketTitleValue.includes("Duo")||ticketTitleValue.includes("DUO")||ticketTitleValue.includes("duo")){twoFactor=true}








    else {
        //regex section, only run if no hard rules found (moved regex lists outside of fnc to b global

        //maybe score it??? +1 point for each regex hit, -1 point for each NOhit? BUT there can b mult tags...tricky




        const googleDriveMatch = googleDriveRegexList.some(rx => rx.test(messages)) && (!(NOgoogleDriveRegexList.some(rx => rx.test(messages))))
        const googleGroupMatch = googleGroupRegexList.some(rx => rx.test(messages)) && (!(NOgoogleGroupRegexList.some(rx => rx.test(messages))))
        const hardwareMatch = hardwareRegexList.some(rx => rx.test(messages)) && (!(NOhardwareRegexList.some(rx => rx.test(messages))))
        const libraryRelatedMatch = libraryRelatedRegexList.some(rx => rx.test(messages)) && (!(NOlibraryRelatedRegexList.some(rx => rx.test(messages))))
        const massEmailMatch = massEmailRegexList.some(rx => rx.test(messages)) && (!(NOmassEmailRegexList.some(rx => rx.test(messages))))
        const microsoftMatch = microsoftRegexList.some(rx => rx.test(messages)) && (!(NOmicrosoftRegexList.some(rx => rx.test(messages))))
        const networkMatch = networkRegexList.some(rx => rx.test(messages)) && (!(NOnetworkRegexList.some(rx => rx.test(messages))))
        const passwordResetMatch = passwordResetRegexList.some(rx => rx.test(messages)) && (!(NOpasswordResetRegexList.some(rx => rx.test(messages))))
        const phishMatch = phishRegexList.some(rx => rx.test(messages)) && (!(NOphishRegexList.some(rx => rx.test(messages))))
        const printingMatch = printingRegexList.some(rx => rx.test(messages)) && (!(NOprintingRegexList.some(rx => rx.test(messages))))
        const reedAccountsMatch = reedAccountsRegexList.some(rx => rx.test(messages)) && (!(NOreedAccountsRegexList.some(rx => rx.test(messages))))
        const softwareMatch = softwareRegexList.some(rx => rx.test(messages)) && (!(NOsoftwareRegexList.some(rx => rx.test(messages))))
        const thesisMatch = thesisRegexList.some(rx => rx.test(messages)) && (!(NOthesisRegexList.some(rx => rx.test(messages))))
        const twoFactorMatch = twoFactorRegexList.some(rx => rx.test(messages)) && (!(NOtwoFactorRegexList.some(rx => rx.test(messages))))
        const nameChangeMatch = nameChangeRegexList.some(rx => rx.test(messages)) && (!(NOnameChangeRegexList.some(rx => rx.test(messages))))
        const virusMalwareMatch = virusMalwareRegexList.some(rx => rx.test(messages)) && (!(NOvirusMalwareRegexList.some(rx => rx.test(messages))))
        const noTagMatch = noTagRegexList.some(rx => rx.test(messages)) && (!(NOnoTagRegexList.some(rx => rx.test(messages))))


        //logic of Match bools -> real bools
        //this may seem redundant to have the "match" set of bools as well, but it gives extra flexibility
        if(googleDriveMatch){googleDrive=true}
        if(googleGroupMatch){googleGroup=true}
        if(hardwareMatch){hardware=true}
        if(libraryRelatedMatch){libraryRelated=true}
        if(massEmailMatch){massEmail=true}
        if(microsoftMatch){microsoft=true}
        if(networkMatch){network=true}
        if(phishMatch){phish=true}
        if(printingMatch){printing=true}
        if(reedAccountsMatch){reedAccounts=true}
        if(softwareMatch){software=true}
        if(twoFactorMatch){twoFactor=true}
        if(nameChangeMatch){nameChange=true}
        if(virusMalwareMatch){virusMalware=true}
        if(noTagMatch){noTag=true}

        //keep these exceptions at bottom
        if(passwordResetMatch){passwordReset=true;reedAccounts=false} //if password reset, NOT reed account, always
        if(thesisMatch){thesis=true; microsoft=false} //if thesis, NOT microsoft, always

        //if no matches (no regex match AND no hard rule match(implied here)), flag for manual review
        if(!googleDriveMatch&&!googleGroupMatch&&!hardwareMatch&&!libraryRelatedMatch&&!massEmailMatch&&!microsoftMatch&&!networkMatch&&!passwordResetMatch&&!phishMatch&&!printingMatch&&!reedAccountsMatch&&!softwareMatch&&!thesisMatch&&!twoFactorMatch&&!nameChangeMatch&&!virusMalwareMatch&&!noTagMatch){console.log("FLAG NO REGEX MATCH "+page.url())}

    }//end of else regex section





    //PAGE CHANGE
    let currURL:string = page.url();
    //replace Display with Modify
    let modifyURL:string = currURL.replace('Display', 'Modify');
    await page.goto(modifyURL);

    //COMPARE ALREADY TAGGED TIX TO SCRIPT DECISION SECTION

    //TODO remember (for older tickets especially) the requester affiliation may have literally changed, like when ticket was made they were faculty and it was tagged as such but now they are not etc

    console.log("Current Ticket: "+page.url())

    const googleDriveCheckbox = await page.$(`input[value="google drive"]`);
    const googleDriveChecked = await (await googleDriveCheckbox.getProperty('checked')).jsonValue();
    if(googleDrive!=googleDriveChecked){console.log("Algo Google Drive: "+googleDrive+ "Ticket Google Drive: "+googleDriveChecked)}

    const googleGroupCheckbox = await page.$(`input[value="google group"]`);
    const googleGroupChecked = await (await googleGroupCheckbox.getProperty('checked')).jsonValue();
    if(googleGroup!=googleGroupChecked){console.log("Algo Google Group: "+googleGroup+ "Ticket Google Group: "+googleGroupChecked)}

    const hardwareCheckbox = await page.$(`input[value="hardware"]`);
    const hardwareChecked = await (await hardwareCheckbox.getProperty('checked')).jsonValue();
    if(hardware!=hardwareChecked){console.log("Algo Hardware: "+hardware+ "Ticket Hardware: "+hardwareChecked)}

    const libraryRelatedCheckbox = await page.$(`input[value="library related"]`);
    const libraryRelatedChecked = await (await libraryRelatedCheckbox.getProperty('checked')).jsonValue();
    if(libraryRelated!=libraryRelatedChecked){console.log("Algo LibraryRelated: "+libraryRelated+ "Ticket LibraryRelated: "+libraryRelatedChecked)}

    const massEmailCheckbox = await page.$(`input[value="mass email"]`);
    const massEmailChecked = await (await massEmailCheckbox.getProperty('checked')).jsonValue();
    if(massEmail!=massEmailChecked){console.log("Algo massEmail: "+massEmail+ "Ticket massEmail: "+massEmailChecked)}

    const microsoftCheckbox = await page.$(`input[value="microsoft"]`);
    const microsoftChecked = await (await microsoftCheckbox.getProperty('checked')).jsonValue();
    if(microsoft!=microsoftChecked){console.log("Algo microsoft: "+microsoft+ "Ticket microsoft: "+microsoftChecked)}

    const networkCheckbox = await page.$(`input[value="network"]`);
    const networkChecked = await (await networkCheckbox.getProperty('checked')).jsonValue();
    if(network!=networkChecked){console.log("Algo network: "+network+ "Ticket network: "+networkChecked)}

    const passwordResetCheckbox = await page.$(`input[value="password reset"]`);
    const passwordResetChecked = await (await passwordResetCheckbox.getProperty('checked')).jsonValue();
    if(passwordReset!=passwordResetChecked){
        console.log("Algo passwordReset: "+passwordReset+ "Ticket passwordReset: "+passwordResetChecked)

    }


    const phishCheckbox = await page.$(`input[value="phish report/fwd"]`);
    const phishChecked = await (await phishCheckbox.getProperty('checked')).jsonValue();
    if(phish!=phishChecked){console.log("Algo phish: "+phish+ "Ticket phish: "+phishChecked)}

    const printingCheckbox = await page.$(`input[value="printers/copiers"]`);
    const printingChecked = await (await printingCheckbox.getProperty('checked')).jsonValue();
    if(printing!=printingChecked){console.log("Algo printing: "+printing+ "Ticket printing: "+printingChecked)}

    const reedAccountsCheckbox = await page.$(`input[value="reed accounts & access"]`);
    const reedAccountsChecked = await (await reedAccountsCheckbox.getProperty('checked')).jsonValue();
    if(reedAccounts!=reedAccountsChecked){console.log("Algo reedAccounts: "+reedAccounts+ "Ticket reedAccounts: "+reedAccountsChecked)}

    const softwareCheckbox = await page.$(`input[value="software"]`);
    const softwareChecked = await (await softwareCheckbox.getProperty('checked')).jsonValue();
    if(software!=softwareChecked){
        console.log("Algo software: "+software+ "Ticket software: "+softwareChecked)
        for(let i=0;i<softwareRegexList.length;i++) {
            console.log(softwareRegexList[i].exec(messages))
        }
    }

    const thesisCheckbox = await page.$(`input[value="thesis"]`);
    const thesisChecked = await (await thesisCheckbox.getProperty('checked')).jsonValue();
    if(thesis!=thesisChecked){console.log("Algo thesis: "+thesis+ "Ticket thesis: "+thesisChecked)}

    const twoFactorCheckbox = await page.$(`input[value="two-factor"]`);
    const twoFactorChecked = await (await twoFactorCheckbox.getProperty('checked')).jsonValue();
    if(twoFactor!=twoFactorChecked){console.log("Algo twoFactor: "+twoFactor+ "Ticket twoFactor: "+twoFactorChecked)}

    const nameChangeCheckbox = await page.$(`input[value="user/name change"]`);
    const nameChangeChecked = await (await nameChangeCheckbox.getProperty('checked')).jsonValue();
    if(nameChange!=nameChangeChecked){console.log("Algo nameChange: "+nameChange+ "Ticket nameChange: "+nameChangeChecked)}

    const virusMalwareCheckbox = await page.$(`input[value="virus/malware"]`);
    const virusMalwareChecked = await (await virusMalwareCheckbox.getProperty('checked')).jsonValue();
    if(virusMalware!=virusMalwareChecked){console.log("Algo virusMalware: "+virusMalware+ "Ticket virusMalware: "+virusMalwareChecked)}

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