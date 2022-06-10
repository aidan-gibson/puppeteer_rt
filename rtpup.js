"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var pw = (0, fs_1.readFileSync)('./password.txt', 'utf-8');
var login = "aigibson";
var reedLoginURL = "https://weblogin.reed.edu/?cosign-help&";
var ticketURL = "https://help.reed.edu/Ticket/Display.html?id=";
var currentTicket = 336797;
var puppeteer = require('puppeteer');
//i means case insensitive, \b are word borders
var googleDriveRegexList = [/google drive/i, /drive request/i, /google form/i];
var NOgoogleDriveRegexList = [];
var googleGroupRegexList = [/google group/i, /@groups.google/, /group request/i];
var NOgoogleGroupRegexList = [];
var hardwareRegexList = [/iMac/];
var NOhardwareRegexList = [];
var libraryRelatedRegexList = [/e-book/i, /library/i, /librarian/i, /IMC/, /LangLab/i];
var NOlibraryRelatedRegexList = [];
var massEmailRegexList = [/release email/i, /release message/i, /groups.reed.edu admins: Message Pending/, /mass email/i, /approve(.*)Newsletter/i];
var NOmassEmailRegexList = [];
var microsoftRegexList = [/microsoft/i, /powerpoint/i, /\bexcel\b/i, /Word/, /\bmacro\b/i, /.doc\b/, /.docx\b/, /ppt\b/, /pptx\b/]; //got rid of /Office/ cuz Office of the Registrar etc can be in signatures, /csv/, /.xl/ cuz csv could be attached and it's totally unrelated, etc
var NOmicrosoftRegexList = [/template/i]; //word thesis template issues are NOT microsoft tag
var networkRegexList = [/wifi/i, /ethernet/i, /connection issue/i, /reed1x/i, /fluke/i, /MAC/, /mac address/i, /network/i, /\bdns\b/i, /trouble connect/i, /issues accessing/i, /alexa/i, /netreg/i, /xenia/, /wireless maint/i]; ///([a-z0-9]+[.])*reed[.]edu/i removed this, too ambig. ie account-tools.reed.edu is clearly password reset only.
var NOnetworkRegexList = [/groups.reed.edu/];
var passwordResetRegexList = [/password reset/i, /forgot password/i, /kerberos pass/i, /account-tools/]; //can't use just "password" cuz ben's signature is "cis will never ask for ur password" AND it'd conflict w "Software" tag looking for 1password
var NOpasswordResetRegexList = [];
var phishRegexList = [/phish/i, /scam/i, /spam/i];
var NOphishRegexList = [/Security Updates for Reed Computers/];
var printingRegexList = [/print/i, /ipp.reed.edu/, /xerox/i, /ctx/i, /laserjet/i, /toner/i];
var NOprintingRegexList = [];
var reedAccountsRegexList = [/new employee/i, /kerberos/i, /vpn/i, /dlist/i, /delegate/i, /setup your Reed account/i, /claim your Reed account/i, /account creation/i, /listserv/i, /accounts are scheduled to be closed/i, /reed computing accounts/i, /account tool/i, /online_forms\/protected\/computing.php/, /account_closing/, /auth group/i, /access IRIS/];
var NOreedAccountsRegexList = [];
var softwareRegexList = [/1password/i, /one-password/i, /onepassword/i, /OS update/i, /OS upgrade/i, /kernel/i, /adobe/i, /acrobat/i, /photoshop/i, /creative cloud/i, /premiere pro/i, /lightroom/i, /indesign/i, /CS6/, /dreamweaver/i, /premiere rush/i, /code42/i, /crash/i, /Upgrade NOT Recommended/, /Monterey/i, /RStudio/i, /mathematica/i, /wolfram/i, /medicat/i, /big sur/i, /catalina/i, /mojave/i, /high sierra/i, /operating system/i, /\bvlc\b/i, /quicktime/i, /zotero/i, /latex/i, /stata/i, /filemaker/i, /vmware/i, /software update/i, /software upgrade/i]; //removed /\bdriver\b/i
var NOsoftwareRegexList = [];
var thesisRegexList = [/thesis/i]; //[/thesis format/i, /thesis template/i, /thesis word template/i, /r template/i]
var NOthesisRegexList = [/vpn/i];
var twoFactorRegexList = [/duo/i, /twostep/i, /two-step/i, /hardware token/i];
var NOtwoFactorRegexList = [];
var nameChangeRegexList = [/name change/i, /change name/i];
var NOnameChangeRegexList = [];
var virusMalwareRegexList = [/falcon/i, /crowdstrike/i, /virus/i, /malware/i, /malicious/i, /trojan/i,];
var NOvirusMalwareRegexList = [/Security Updates for Reed Computers/];
var noTagRegexList = [/Events & Programs Newsletter for Reed Students/, /To:(.*)faculty@reed.edu/, /To:(.*)staff@reed.edu/, /Dorkbot Monthly/, /Banner Database Outage/];
var NOnoTagRegexList = [];
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                    //devtools: true, //this also forces {headless: false}
                    //dumpio: true //captures all console messages to output https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
                    })
                    //const page = await browser.newPage()
                ];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_a.sent())[0];
                    return [4 /*yield*/, page.setViewport({ width: 1692, height: 777 })];
                case 3:
                    _a.sent(); //({ width: 850, height: 800}); //doesn't matter
                    return [4 /*yield*/, page.goto(reedLoginURL + ticketURL + currentTicket)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name="login"]', login)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name="password"]', pw)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.click("button[class=\"btn btn-primary pull-right\"]")];
                case 7:
                    _a.sent();
                    ticketFix(page);
                    return [2 /*return*/];
            }
        });
    });
}
function checkSpecificBox(page, checkBoxSelector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //required, otherwise will attempt to click too soon and throw error
                return [4 /*yield*/, page.waitForSelector("input[value=\"".concat(checkBoxSelector, "\"]"))];
                case 1:
                    //required, otherwise will attempt to click too soon and throw error
                    _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, page.$eval("input[value=\"".concat(checkBoxSelector, "\"]"), function (check) { return check.checked = true; })];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function ticketFix(page) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    return __awaiter(this, void 0, void 0, function () {
        var quotedTextSelector, titleSelector, titleElements, emeritus, titleElements_1, titleElements_1_1, titleElement, titleValue, e_1_1, affiliationSelector, faculty, student, affiliate, alumni, staff, affiliationsElements, affiliationsElements_1, affiliationsElements_1_1, affiliationsElement, affiliationsValue, e_2_1, nonReedEmail, emailSelector, emailElements, emails, emailElements_1, emailElements_1_1, emailElement, emailValue, e_3_1, googleDrive, googleGroup, hardware, libraryRelated, massEmail, microsoft, network, passwordReset, phish, printing, reedAccounts, software, thesis, twoFactor, nameChange, virusMalware, noTag, messages, ticketHistorySelector, emailStanzas, emailStanzas_1, emailStanzas_1_1, emailStanza, emailValue, e_4_1, ticketTitleElement, ticketTitleValue, googleDriveMatch, googleGroupMatch, hardwareMatch, libraryRelatedMatch, massEmailMatch, microsoftMatch, networkMatch, passwordResetMatch, phishMatch, printingMatch, reedAccountsMatch, softwareMatch, thesisMatch, twoFactorMatch, nameChangeMatch, virusMalwareMatch, noTagMatch, currURL, modifyURL, googleDriveCheckbox, googleDriveChecked, googleGroupCheckbox, googleGroupChecked, hardwareCheckbox, hardwareChecked, libraryRelatedCheckbox, libraryRelatedChecked, massEmailCheckbox, massEmailChecked, microsoftCheckbox, microsoftChecked, i, networkCheckbox, networkChecked, passwordResetCheckbox, passwordResetChecked, phishCheckbox, phishChecked, printingCheckbox, printingChecked, reedAccountsCheckbox, reedAccountsChecked, softwareCheckbox, softwareChecked, i, thesisCheckbox, thesisChecked, twoFactorCheckbox, twoFactorChecked, nameChangeCheckbox, nameChangeChecked, virusMalwareCheckbox, virusMalwareChecked;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    quotedTextSelector = "#ticket-".concat(currentTicket, "-history > div > div.titlebox-title > span.right > a:nth-child(1)");
                    return [4 /*yield*/, page.waitForSelector(quotedTextSelector)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, page.click(quotedTextSelector)
                        //TITLE EMERITUS SECTION
                    ];
                case 2:
                    _e.sent();
                    titleSelector = ".CustomField__Title_ > span.value";
                    return [4 /*yield*/, page.waitForSelector(titleSelector)];
                case 3:
                    _e.sent(); //TODO this waits for FIRST selector matching, what if the first loads faster than the second??
                    return [4 /*yield*/, page.$$(titleSelector)];
                case 4:
                    titleElements = _e.sent();
                    emeritus = false;
                    _e.label = 5;
                case 5:
                    _e.trys.push([5, 11, 12, 17]);
                    titleElements_1 = __asyncValues(titleElements);
                    _e.label = 6;
                case 6: return [4 /*yield*/, titleElements_1.next()];
                case 7:
                    if (!(titleElements_1_1 = _e.sent(), !titleElements_1_1.done)) return [3 /*break*/, 10];
                    titleElement = titleElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, titleElement)];
                case 8:
                    titleValue = _e.sent();
                    if (titleValue.includes("emeritus") || titleValue.includes("Emeritus") || titleValue.includes("emerita") || titleValue.includes("Emerita")) {
                        emeritus = true;
                    }
                    _e.label = 9;
                case 9: return [3 /*break*/, 6];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _e.trys.push([12, , 15, 16]);
                    if (!(titleElements_1_1 && !titleElements_1_1.done && (_a = titleElements_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(titleElements_1)];
                case 13:
                    _e.sent();
                    _e.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    affiliationSelector = ".CustomField__Primary_Affiliation_ > span.value";
                    faculty = false;
                    student = false;
                    affiliate = false;
                    alumni = false;
                    staff = false;
                    return [4 /*yield*/, page.$$(affiliationSelector)];
                case 18:
                    affiliationsElements = _e.sent();
                    _e.label = 19;
                case 19:
                    _e.trys.push([19, 25, 26, 31]);
                    affiliationsElements_1 = __asyncValues(affiliationsElements);
                    _e.label = 20;
                case 20: return [4 /*yield*/, affiliationsElements_1.next()];
                case 21:
                    if (!(affiliationsElements_1_1 = _e.sent(), !affiliationsElements_1_1.done)) return [3 /*break*/, 24];
                    affiliationsElement = affiliationsElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, affiliationsElement)];
                case 22:
                    affiliationsValue = _e.sent();
                    if (affiliationsValue.includes("faculty")) {
                        faculty = true;
                    }
                    else if (affiliationsValue.includes("student")) {
                        student = true;
                    }
                    else if (affiliationsValue.includes("affiliate")) {
                        affiliate = true;
                    }
                    else if (affiliationsValue.includes("alumni") || affiliationsValue.includes("alum")) {
                        alumni = true;
                    }
                    else if (affiliationsValue.includes("affiliate")) {
                        affiliate = true;
                    }
                    else if (affiliationsValue.includes("staff")) {
                        staff = true;
                    }
                    _e.label = 23;
                case 23: return [3 /*break*/, 20];
                case 24: return [3 /*break*/, 31];
                case 25:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 31];
                case 26:
                    _e.trys.push([26, , 29, 30]);
                    if (!(affiliationsElements_1_1 && !affiliationsElements_1_1.done && (_b = affiliationsElements_1.return))) return [3 /*break*/, 28];
                    return [4 /*yield*/, _b.call(affiliationsElements_1)];
                case 27:
                    _e.sent();
                    _e.label = 28;
                case 28: return [3 /*break*/, 30];
                case 29:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 30: return [7 /*endfinally*/];
                case 31:
                    nonReedEmail = false;
                    emailSelector = ".EmailAddress > span.value";
                    return [4 /*yield*/, page.$$(emailSelector)];
                case 32:
                    emailElements = _e.sent();
                    emails = [];
                    _e.label = 33;
                case 33:
                    _e.trys.push([33, 39, 40, 45]);
                    emailElements_1 = __asyncValues(emailElements);
                    _e.label = 34;
                case 34: return [4 /*yield*/, emailElements_1.next()];
                case 35:
                    if (!(emailElements_1_1 = _e.sent(), !emailElements_1_1.done)) return [3 /*break*/, 38];
                    emailElement = emailElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, emailElement)];
                case 36:
                    emailValue = _e.sent();
                    emails.push(emailValue);
                    if (!(emailValue.includes("@reed.edu"))) {
                        nonReedEmail = true;
                    }
                    _e.label = 37;
                case 37: return [3 /*break*/, 34];
                case 38: return [3 /*break*/, 45];
                case 39:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 45];
                case 40:
                    _e.trys.push([40, , 43, 44]);
                    if (!(emailElements_1_1 && !emailElements_1_1.done && (_c = emailElements_1.return))) return [3 /*break*/, 42];
                    return [4 /*yield*/, _c.call(emailElements_1)];
                case 41:
                    _e.sent();
                    _e.label = 42;
                case 42: return [3 /*break*/, 44];
                case 43:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 44: return [7 /*endfinally*/];
                case 45:
                    if (!emeritus && !student && !affiliate && !alumni && !staff && !faculty && !emails.toString().includes("@reed.edu")) {
                        nonReedEmail = true;
                    }
                    googleDrive = false;
                    googleGroup = false;
                    hardware = false;
                    libraryRelated = false;
                    massEmail = false;
                    microsoft = false;
                    network = false;
                    passwordReset = false;
                    phish = false;
                    printing = false;
                    reedAccounts = false;
                    software = false;
                    thesis = false;
                    twoFactor = false;
                    nameChange = false;
                    virusMalware = false;
                    noTag = false;
                    messages = "";
                    ticketHistorySelector = "div.history-container > div.message";
                    return [4 /*yield*/, page.waitForSelector(ticketHistorySelector)];
                case 46:
                    _e.sent();
                    return [4 /*yield*/, page.$$(ticketHistorySelector)];
                case 47:
                    emailStanzas = _e.sent();
                    _e.label = 48;
                case 48:
                    _e.trys.push([48, 54, 55, 60]);
                    emailStanzas_1 = __asyncValues(emailStanzas);
                    _e.label = 49;
                case 49: return [4 /*yield*/, emailStanzas_1.next()];
                case 50:
                    if (!(emailStanzas_1_1 = _e.sent(), !emailStanzas_1_1.done)) return [3 /*break*/, 53];
                    emailStanza = emailStanzas_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, emailStanza)]; //this gives proper spacing after changing textContent to innerText
                case 51:
                    emailValue = _e.sent() //this gives proper spacing after changing textContent to innerText
                    ;
                    if (!emailValue.includes())
                        messages += emailValue + "\n";
                    _e.label = 52;
                case 52: return [3 /*break*/, 49];
                case 53: return [3 /*break*/, 60];
                case 54:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 60];
                case 55:
                    _e.trys.push([55, , 58, 59]);
                    if (!(emailStanzas_1_1 && !emailStanzas_1_1.done && (_d = emailStanzas_1.return))) return [3 /*break*/, 57];
                    return [4 /*yield*/, _d.call(emailStanzas_1)];
                case 56:
                    _e.sent();
                    _e.label = 57;
                case 57: return [3 /*break*/, 59];
                case 58:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 59: return [7 /*endfinally*/];
                case 60:
                    messages += emails + "\n"; //putting the email values in messages to simplify search
                    return [4 /*yield*/, page.waitForSelector("#header > h1")]; //title of ticket
                case 61:
                    _e.sent(); //title of ticket
                    return [4 /*yield*/, page.$("#header > h1")];
                case 62:
                    ticketTitleElement = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, ticketTitleElement)];
                case 63:
                    ticketTitleValue = _e.sent();
                    messages += ticketTitleValue + "\n";
                    //HARD RULES SECTION (obvious/easy support tag selection). true no matter WHAT. nothing fuzzy/ambiguous.
                    //console.log(messages)
                    if (emails.toString().includes("malwarebytes.com")) {
                        virusMalware = true;
                    }
                    else if (emails.toString().includes("crowdstrike")) {
                        virusMalware = true;
                    }
                    else if (emails.toString().includes("etrieve@reed.edu")) {
                        noTag = true;
                    } //no tag, this is the "Notification of Staff Hire" emails
                    else if (ticketTitleValue.includes("Welcome to Reed College | Notes for your first day of work")) { } //no tag https://help.reed.edu/Ticket/Display.html?id=347871
                    else if (ticketTitleValue.includes("Welcome to Reed College")) {
                        noTag = true;
                    } //no tag
                    else if (emails.toString().includes("msgappr@groups.reed.edu") || ticketTitleValue.includes("groups.reed.edu admins: Message Pending")) {
                        massEmail = true;
                    }
                    else if (ticketTitleValue.includes("Shared Drive Request")) {
                        googleDrive = true;
                    }
                    else if (ticketTitleValue.includes("Google Group Request")) {
                        googleGroup = true;
                    }
                    else if (ticketTitleValue.includes("[Ask a librarian]")) {
                        libraryRelated = true;
                    }
                    else if (emails.toString().includes("er-problem-report@reed.edu")) {
                        libraryRelated = true;
                    }
                    else if (emails.toString().includes("msonlineservicesteam@microsoftonline.com")) {
                        microsoft = true;
                        passwordReset = true;
                    }
                    else if (emails.toString().includes("@microsoft.com")) {
                        microsoft = true;
                    }
                    else if (emails.toString().includes("@microsoftonline.com")) {
                        microsoft = true;
                    }
                    else if (ticketTitleValue.includes("Wireless Maintenance")) {
                        network = true;
                    }
                    else if (ticketTitleValue.includes("ipp.reed.edu")) {
                        network = true;
                        printing = true;
                    }
                    else if (ticketTitleValue.includes("Kerberos password reset")) {
                        passwordReset = true;
                    } //https://help.reed.edu/Ticket/Display.html?id=344626
                    else if (emails.toString().includes("noreply-spamdigest@google.com")) {
                        phish = true;
                    }
                    else if (emails.toString().includes("xerox") || (emails.toString().includes("ctx"))) {
                        printing = true;
                    }
                    else if (ticketTitleValue.includes("Reed computing account")) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes("Your Reed computing accounts are scheduled to be closed")) {
                        reedAccounts = true;
                    }
                    else if (messages.includes("Please follow the steps below to setup your Reed account")) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes("Account Closure for Graduates")) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes("Account Tool")) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes("Computing at Reed")) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes("Duo") || ticketTitleValue.includes("DUO") || ticketTitleValue.includes("duo")) {
                        twoFactor = true;
                    }
                    else if (emails.toString().includes("schrodinger.com")) {
                        noTag = true;
                    }
                    else if (ticketTitleValue.includes("google group")) {
                        googleGroup = true;
                    }
                    else if (ticketTitleValue.includes("Google Group")) {
                        googleGroup = true;
                    }
                    else {
                        googleDriveMatch = googleDriveRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOgoogleDriveRegexList.some(function (rx) { return rx.test(messages); })));
                        googleGroupMatch = googleGroupRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOgoogleGroupRegexList.some(function (rx) { return rx.test(messages); })));
                        hardwareMatch = hardwareRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOhardwareRegexList.some(function (rx) { return rx.test(messages); })));
                        libraryRelatedMatch = libraryRelatedRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOlibraryRelatedRegexList.some(function (rx) { return rx.test(messages); })));
                        massEmailMatch = massEmailRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOmassEmailRegexList.some(function (rx) { return rx.test(messages); })));
                        microsoftMatch = microsoftRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOmicrosoftRegexList.some(function (rx) { return rx.test(messages); })));
                        networkMatch = networkRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOnetworkRegexList.some(function (rx) { return rx.test(messages); })));
                        passwordResetMatch = passwordResetRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOpasswordResetRegexList.some(function (rx) { return rx.test(messages); })));
                        phishMatch = phishRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOphishRegexList.some(function (rx) { return rx.test(messages); })));
                        printingMatch = printingRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOprintingRegexList.some(function (rx) { return rx.test(messages); })));
                        reedAccountsMatch = reedAccountsRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOreedAccountsRegexList.some(function (rx) { return rx.test(messages); })));
                        softwareMatch = softwareRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOsoftwareRegexList.some(function (rx) { return rx.test(messages); })));
                        thesisMatch = thesisRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOthesisRegexList.some(function (rx) { return rx.test(messages); })));
                        twoFactorMatch = twoFactorRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOtwoFactorRegexList.some(function (rx) { return rx.test(messages); })));
                        nameChangeMatch = nameChangeRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOnameChangeRegexList.some(function (rx) { return rx.test(messages); })));
                        virusMalwareMatch = virusMalwareRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOvirusMalwareRegexList.some(function (rx) { return rx.test(messages); })));
                        noTagMatch = noTagRegexList.some(function (rx) { return rx.test(messages); }) && (!(NOnoTagRegexList.some(function (rx) { return rx.test(messages); })));
                        //logic of Match bools -> real bools
                        //this may seem redundant to have the "match" set of bools as well, but it gives extra flexibility
                        if (noTagMatch) {
                            noTag = true;
                        }
                        else {
                            if (googleDriveMatch) {
                                googleDrive = true;
                            }
                            if (googleGroupMatch) {
                                googleGroup = true;
                            }
                            if (hardwareMatch) {
                                hardware = true;
                            }
                            if (libraryRelatedMatch) {
                                libraryRelated = true;
                            }
                            if (massEmailMatch) {
                                massEmail = true;
                            }
                            if (microsoftMatch) {
                                microsoft = true;
                            }
                            if (networkMatch) {
                                network = true;
                            }
                            if (phishMatch) {
                                phish = true;
                            }
                            if (printingMatch) {
                                printing = true;
                            }
                            if (reedAccountsMatch) {
                                reedAccounts = true;
                            }
                            if (softwareMatch) {
                                software = true;
                            }
                            if (twoFactorMatch) {
                                twoFactor = true;
                            }
                            if (nameChangeMatch) {
                                nameChange = true;
                            }
                            if (virusMalwareMatch) {
                                virusMalware = true;
                            }
                            //keep these exceptions at bottom
                            if (passwordResetMatch) {
                                passwordReset = true;
                                reedAccounts = false;
                            } //if password reset, NOT reed account, always
                            if (thesisMatch) {
                                thesis = true;
                                microsoft = false;
                            } //if thesis, NOT microsoft, always
                        }
                        //if no matches (no regex match AND no hard rule match(implied here)), flag for manual review
                        if (!googleDriveMatch && !googleGroupMatch && !hardwareMatch && !libraryRelatedMatch && !massEmailMatch && !microsoftMatch && !networkMatch && !passwordResetMatch && !phishMatch && !printingMatch && !reedAccountsMatch && !softwareMatch && !thesisMatch && !twoFactorMatch && !nameChangeMatch && !virusMalwareMatch && !noTagMatch && !noTag) {
                            console.log("FLAG NO REGEX MATCH " + page.url());
                        }
                    } //end of else regex section
                    currURL = page.url();
                    modifyURL = currURL.replace('Display', 'Modify');
                    return [4 /*yield*/, page.goto(modifyURL)];
                case 64:
                    _e.sent();
                    //COMPARE ALREADY TAGGED TIX TO SCRIPT DECISION SECTION
                    //TODO remember (for older tickets especially) the requester affiliation may have literally changed, like when ticket was made they were faculty and it was tagged as such but now they are not etc
                    console.log("Current Ticket: " + page.url());
                    return [4 /*yield*/, page.$("input[value=\"google drive\"]")];
                case 65:
                    googleDriveCheckbox = _e.sent();
                    return [4 /*yield*/, googleDriveCheckbox.getProperty('checked')];
                case 66: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 67:
                    googleDriveChecked = _e.sent();
                    if (googleDrive != googleDriveChecked) {
                        console.log("Algo Google Drive: " + googleDrive + "Ticket Google Drive: " + googleDriveChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"google group\"]")];
                case 68:
                    googleGroupCheckbox = _e.sent();
                    return [4 /*yield*/, googleGroupCheckbox.getProperty('checked')];
                case 69: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 70:
                    googleGroupChecked = _e.sent();
                    if (googleGroup != googleGroupChecked) {
                        console.log("Algo Google Group: " + googleGroup + "Ticket Google Group: " + googleGroupChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"hardware\"]")];
                case 71:
                    hardwareCheckbox = _e.sent();
                    return [4 /*yield*/, hardwareCheckbox.getProperty('checked')];
                case 72: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 73:
                    hardwareChecked = _e.sent();
                    if (hardware != hardwareChecked) {
                        console.log("Algo Hardware: " + hardware + "Ticket Hardware: " + hardwareChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"library related\"]")];
                case 74:
                    libraryRelatedCheckbox = _e.sent();
                    return [4 /*yield*/, libraryRelatedCheckbox.getProperty('checked')];
                case 75: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 76:
                    libraryRelatedChecked = _e.sent();
                    if (libraryRelated != libraryRelatedChecked) {
                        console.log("Algo LibraryRelated: " + libraryRelated + "Ticket LibraryRelated: " + libraryRelatedChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"mass email\"]")];
                case 77:
                    massEmailCheckbox = _e.sent();
                    return [4 /*yield*/, massEmailCheckbox.getProperty('checked')];
                case 78: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 79:
                    massEmailChecked = _e.sent();
                    if (massEmail != massEmailChecked) {
                        console.log("Algo massEmail: " + massEmail + "Ticket massEmail: " + massEmailChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"microsoft\"]")];
                case 80:
                    microsoftCheckbox = _e.sent();
                    return [4 /*yield*/, microsoftCheckbox.getProperty('checked')];
                case 81: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 82:
                    microsoftChecked = _e.sent();
                    if (microsoft != microsoftChecked) {
                        console.log("Algo microsoft: " + microsoft + "Ticket microsoft: " + microsoftChecked);
                        for (i = 0; i < microsoftRegexList.length; i++) {
                            console.log(microsoftRegexList[i].exec(messages));
                        }
                    }
                    return [4 /*yield*/, page.$("input[value=\"network\"]")];
                case 83:
                    networkCheckbox = _e.sent();
                    return [4 /*yield*/, networkCheckbox.getProperty('checked')];
                case 84: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 85:
                    networkChecked = _e.sent();
                    if (network != networkChecked) {
                        console.log("Algo network: " + network + "Ticket network: " + networkChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"password reset\"]")];
                case 86:
                    passwordResetCheckbox = _e.sent();
                    return [4 /*yield*/, passwordResetCheckbox.getProperty('checked')];
                case 87: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 88:
                    passwordResetChecked = _e.sent();
                    if (passwordReset != passwordResetChecked) {
                        console.log("Algo passwordReset: " + passwordReset + "Ticket passwordReset: " + passwordResetChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"phish report/fwd\"]")];
                case 89:
                    phishCheckbox = _e.sent();
                    return [4 /*yield*/, phishCheckbox.getProperty('checked')];
                case 90: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 91:
                    phishChecked = _e.sent();
                    if (phish != phishChecked) {
                        console.log("Algo phish: " + phish + "Ticket phish: " + phishChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"printers/copiers\"]")];
                case 92:
                    printingCheckbox = _e.sent();
                    return [4 /*yield*/, printingCheckbox.getProperty('checked')];
                case 93: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 94:
                    printingChecked = _e.sent();
                    if (printing != printingChecked) {
                        console.log("Algo printing: " + printing + "Ticket printing: " + printingChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"reed accounts & access\"]")];
                case 95:
                    reedAccountsCheckbox = _e.sent();
                    return [4 /*yield*/, reedAccountsCheckbox.getProperty('checked')];
                case 96: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 97:
                    reedAccountsChecked = _e.sent();
                    if (reedAccounts != reedAccountsChecked) {
                        console.log("Algo reedAccounts: " + reedAccounts + "Ticket reedAccounts: " + reedAccountsChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"software\"]")];
                case 98:
                    softwareCheckbox = _e.sent();
                    return [4 /*yield*/, softwareCheckbox.getProperty('checked')];
                case 99: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 100:
                    softwareChecked = _e.sent();
                    if (software != softwareChecked) {
                        console.log("Algo software: " + software + "Ticket software: " + softwareChecked);
                        for (i = 0; i < softwareRegexList.length; i++) {
                            console.log(softwareRegexList[i].exec(messages));
                        }
                    }
                    return [4 /*yield*/, page.$("input[value=\"thesis\"]")];
                case 101:
                    thesisCheckbox = _e.sent();
                    return [4 /*yield*/, thesisCheckbox.getProperty('checked')];
                case 102: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 103:
                    thesisChecked = _e.sent();
                    if (thesis != thesisChecked) {
                        console.log("Algo thesis: " + thesis + "Ticket thesis: " + thesisChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"two-factor\"]")];
                case 104:
                    twoFactorCheckbox = _e.sent();
                    return [4 /*yield*/, twoFactorCheckbox.getProperty('checked')];
                case 105: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 106:
                    twoFactorChecked = _e.sent();
                    if (twoFactor != twoFactorChecked) {
                        console.log("Algo twoFactor: " + twoFactor + "Ticket twoFactor: " + twoFactorChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"user/name change\"]")];
                case 107:
                    nameChangeCheckbox = _e.sent();
                    return [4 /*yield*/, nameChangeCheckbox.getProperty('checked')];
                case 108: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 109:
                    nameChangeChecked = _e.sent();
                    if (nameChange != nameChangeChecked) {
                        console.log("Algo nameChange: " + nameChange + "Ticket nameChange: " + nameChangeChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"virus/malware\"]")];
                case 110:
                    virusMalwareCheckbox = _e.sent();
                    return [4 /*yield*/, virusMalwareCheckbox.getProperty('checked')];
                case 111: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 112:
                    virusMalwareChecked = _e.sent();
                    if (virusMalware != virusMalwareChecked) {
                        console.log("Algo virusMalware: " + virusMalware + "Ticket virusMalware: " + virusMalwareChecked);
                    }
                    console.log("End");
                    return [2 /*return*/];
            }
        });
    });
}
run();
