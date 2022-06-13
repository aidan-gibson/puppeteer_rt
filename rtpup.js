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
var reg = require("./regexConstants");
var puppeteer = require("puppeteer");
var fs_1 = require("fs");
var pw = (0, fs_1.readFileSync)('./password.txt', 'utf-8');
var login = 'aigibson';
var reedLoginURL = 'https://weblogin.reed.edu/?cosign-help&';
var ticketURL = 'https://help.reed.edu/Ticket/Display.html?id=';
var currentTicket = 345842; //336797
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
                    return [4 /*yield*/, browser.pages()]; //this fixes extra empty tab being open instead of above line
                case 2:
                    page = (_a.sent()) //this fixes extra empty tab being open instead of above line
                    [0];
                    return [4 /*yield*/, page.setViewport({ width: 1692, height: 777 })]; //({ width: 850, height: 800}); //doesn't matter
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
                return [4 /*yield*/, page.waitForSelector("input[value=\"".concat(checkBoxSelector, "\"]"))
                    // @ts-ignore
                ];
                case 1:
                    //required, otherwise will attempt to click too soon and throw error
                    _a.sent();
                    // @ts-ignore
                    return [4 /*yield*/, page.$eval("input[value=\"".concat(checkBoxSelector, "\"]"), function (check) { return (check.checked = true); })
                        // old inefficient way, leaving so my future self can see
                        //if checkbox is already checked, don't click!
                        //const checkbox = await page.$(`input[value="google drive"]`);
                        //let checked = await (await checkbox.getProperty('checked')).jsonValue(); //true if checked, false if unchecked
                        //if (!checked){
                        //await checkbox.click();//}
                        //await page.click(`input[value="google drive"]`);//}
                        // instead of checking if checked, then clicking, I can directly set checked to true
                        //await page.$eval(`input[value="google drive"]`, check => check.checked = true);
                    ];
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
        var quotedTextSelector, titleSelector, titleElements, emeritus, titleElements_1, titleElements_1_1, titleElement, titleValue, e_1_1, affiliationSelector, faculty, student, affiliate, alumni, staff, affiliationsElements, affiliationsElements_1, affiliationsElements_1_1, affiliationsElement, affiliationsValue, e_2_1, nonReedEmail, emailSelector, emailElements, emails, emailElements_1, emailElements_1_1, emailElement, emailValue, e_3_1, googleDrive, googleGroup, hardware, libraryRelated, massEmail, microsoft, network, passwordReset, phish, printing, reedAccounts, software, thesis, twoFactor, nameChange, virusMalware, noTag, messages, ticketHistorySelector, emailStanzas, emailStanzas_1, emailStanzas_1_1, emailStanza, emailValue, e_4_1, ticketTitleElement, ticketTitleValue, googleDriveMatch, googleGroupMatch, hardwareMatch, libraryRelatedMatch, massEmailMatch, microsoftMatch, networkMatch, passwordResetMatch, phishMatch, printingMatch, reedAccountsMatch, softwareMatch, thesisMatch, twoFactorMatch, nameChangeMatch, virusMalwareMatch, noTagMatch, currURL, modifyURL, queue, queueValue, googleDriveCheckbox, googleDriveChecked, googleGroupCheckbox, googleGroupChecked, hardwareCheckbox, hardwareChecked, libraryRelatedCheckbox, libraryRelatedChecked, massEmailCheckbox, massEmailChecked, microsoftCheckbox, microsoftChecked, i, networkCheckbox, networkChecked, passwordResetCheckbox, passwordResetChecked, phishCheckbox, phishChecked, printingCheckbox, printingChecked, reedAccountsCheckbox, reedAccountsChecked, softwareCheckbox, softwareChecked, i, thesisCheckbox, thesisChecked, twoFactorCheckbox, twoFactorChecked, nameChangeCheckbox, nameChangeChecked, virusMalwareCheckbox, virusMalwareChecked;
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
                    titleSelector = ".CustomField__Title_ > span.value" //must check if there are multiple
                    ;
                    return [4 /*yield*/, page.waitForSelector(titleSelector)
                        //this was from when I didn't realize there could b mult requestors
                        //let titleElement = await page.$(titleSelector);
                        //let titleValue = await page.evaluate(el => el.textContent, titleElement);
                    ]; //this waits for FIRST selector matching, what if the first loads faster than the second??
                case 3:
                    _e.sent(); //this waits for FIRST selector matching, what if the first loads faster than the second??
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
                    if (titleValue.includes('emeritus') || titleValue.includes('Emeritus') || titleValue.includes('emerita') || titleValue.includes('Emerita')) {
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
                    if (affiliationsValue.includes('faculty')) {
                        faculty = true;
                    }
                    else if (affiliationsValue.includes('student')) {
                        student = true;
                    }
                    else if (affiliationsValue.includes('affiliate')) {
                        affiliate = true;
                    }
                    else if (affiliationsValue.includes('alumni') || affiliationsValue.includes('alum')) {
                        alumni = true;
                    }
                    else if (affiliationsValue.includes('staff')) {
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
                    if (!emailValue.includes('@reed.edu')) {
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
                    if (!emeritus && !student && !affiliate && !alumni && !staff && !faculty && !emails.toString().includes('@reed.edu')) {
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
                    messages = '' //all emails in this string
                    ;
                    ticketHistorySelector = "div.history-container > div.message" //only add it if it's a comment, correspondance, or the initial ticket opening. we don't want others, esp "Support Tags xyz deleted" which could falsely re-trigger the regex for that tag. message class is only transaction we're interested in
                    ;
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
                    messages += emailValue + '\n';
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
                    messages = messages.replace(reg.cusAutoReplyRegex, '');
                    messages += emails + '\n'; //putting the email values in messages to simplify search
                    return [4 /*yield*/, page.waitForSelector('#header > h1')]; //title of ticket
                case 61:
                    _e.sent(); //title of ticket
                    return [4 /*yield*/, page.$('#header > h1')];
                case 62:
                    ticketTitleElement = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, ticketTitleElement)];
                case 63:
                    ticketTitleValue = _e.sent();
                    messages += ticketTitleValue + '\n';
                    //HARD RULES SECTION (obvious/easy support tag selection). true no matter WHAT. nothing fuzzy/ambiguous.
                    if (emails.toString().includes('malwarebytes.com')) {
                        virusMalware = true;
                    }
                    else if (emails.toString().includes('crowdstrike')) {
                        virusMalware = true;
                    }
                    else if (emails.toString().includes('etrieve@reed.edu')) {
                        noTag = true;
                    } //no tag, this is the "Notification of Staff Hire" emails
                    else if (ticketTitleValue.includes('Welcome to Reed College | Notes for your first day of work')) {
                    } //no tag https://help.reed.edu/Ticket/Display.html?id=347871
                    else if (ticketTitleValue.includes('Welcome to Reed College')) {
                        noTag = true;
                    } //no tag
                    else if (emails.toString().includes('msgappr@groups.reed.edu') || ticketTitleValue.includes('groups.reed.edu admins: Message Pending')) {
                        massEmail = true;
                    }
                    else if (ticketTitleValue.includes('Shared Drive Request')) {
                        googleDrive = true;
                    }
                    else if (ticketTitleValue.includes('Google Group Request')) {
                        googleGroup = true;
                    }
                    else if (ticketTitleValue.includes('[Ask a librarian]')) {
                        libraryRelated = true;
                    }
                    else if (emails.toString().includes('er-problem-report@reed.edu')) {
                        libraryRelated = true;
                    }
                    else if (emails.toString().includes('msonlineservicesteam@microsoftonline.com')) {
                        microsoft = true;
                        passwordReset = true;
                    }
                    else if (emails.toString().includes('@microsoft.com')) {
                        microsoft = true;
                    }
                    else if (emails.toString().includes('@microsoftonline.com')) {
                        microsoft = true;
                    }
                    else if (ticketTitleValue.includes('Wireless Maintenance')) {
                        network = true;
                    }
                    else if (ticketTitleValue.includes('ipp.reed.edu')) {
                        network = true;
                        printing = true;
                    }
                    else if (ticketTitleValue.includes('Kerberos password reset')) {
                        passwordReset = true;
                    } //https://help.reed.edu/Ticket/Display.html?id=344626
                    else if (emails.toString().includes('noreply-spamdigest@google.com')) {
                        phish = true;
                    }
                    else if (emails.toString().includes('xerox') || emails.toString().includes('ctx')) {
                        printing = true;
                    }
                    else if (ticketTitleValue.includes('Reed computing account')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('Your Reed computing accounts are scheduled to be closed')) {
                        reedAccounts = true;
                    }
                    else if (messages.includes('Please follow the steps below to setup your Reed account')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('Account Closure for Graduates')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('Account Tool')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('Computing at Reed')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('Duo') || ticketTitleValue.includes('DUO') || ticketTitleValue.includes('duo')) {
                        twoFactor = true;
                    }
                    else if (emails.toString().includes('schrodinger.com')) {
                        noTag = true;
                    }
                    else if (ticketTitleValue.includes('google group')) {
                        googleGroup = true;
                    }
                    else if (ticketTitleValue.includes('Google Group')) {
                        googleGroup = true;
                    }
                    else {
                        googleDriveMatch = reg.googleDriveRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noGoogleDriveRegexList.some(function (rx) { return rx.test(messages); });
                        googleGroupMatch = reg.googleGroupRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noGoogleGroupRegexList.some(function (rx) { return rx.test(messages); });
                        hardwareMatch = reg.hardwareRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noHardwareRegexList.some(function (rx) { return rx.test(messages); });
                        libraryRelatedMatch = reg.libraryRelatedRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noLibraryRelatedRegexList.some(function (rx) { return rx.test(messages); });
                        massEmailMatch = reg.massEmailRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noMassEmailRegexList.some(function (rx) { return rx.test(messages); });
                        microsoftMatch = reg.microsoftRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noMicrosoftRegexList.some(function (rx) { return rx.test(messages); });
                        networkMatch = reg.networkRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noNetworkRegexList.some(function (rx) { return rx.test(messages); });
                        passwordResetMatch = reg.passwordResetRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noPasswordResetRegexList.some(function (rx) { return rx.test(messages); });
                        phishMatch = reg.phishRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noPhishRegexList.some(function (rx) { return rx.test(messages); });
                        printingMatch = reg.printingRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noPrintingRegexList.some(function (rx) { return rx.test(messages); });
                        reedAccountsMatch = reg.reedAccountsRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noReedAccountsRegexList.some(function (rx) { return rx.test(messages); });
                        softwareMatch = reg.softwareRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noSoftwareRegexList.some(function (rx) { return rx.test(messages); });
                        thesisMatch = reg.thesisRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noThesisRegexList.some(function (rx) { return rx.test(messages); });
                        twoFactorMatch = reg.twoFactorRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noTwoFactorRegexList.some(function (rx) { return rx.test(messages); });
                        nameChangeMatch = reg.nameChangeRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noNameChangeRegexList.some(function (rx) { return rx.test(messages); });
                        virusMalwareMatch = reg.virusMalwareRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noVirusMalwareRegexList.some(function (rx) { return rx.test(messages); });
                        noTagMatch = reg.noTagRegexList.some(function (rx) { return rx.test(messages); }) && !reg.noNoTagRegexList.some(function (rx) { return rx.test(messages); });
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
                            console.log('FLAG NO REGEX MATCH ' + page.url());
                        }
                    } //end of else regex section
                    currURL = page.url();
                    modifyURL = currURL.replace('Display', 'Modify');
                    return [4 /*yield*/, page.goto(modifyURL)];
                case 64:
                    _e.sent();
                    console.log('Current Ticket: ' + page.url());
                    return [4 /*yield*/, page.$$("select.select-queue")];
                case 65:
                    queue = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (q) { return q.value; }, queue[1])];
                case 66:
                    queueValue = _e.sent();
                    if (queueValue != 4 && queueValue != 11) {
                        console.log('Not CUS or TWatch Queue' + ' ' + queueValue);
                        process.exit(); //ends entire script
                    }
                    return [4 /*yield*/, page.$("input[value=\"google drive\"]")];
                case 67:
                    googleDriveCheckbox = _e.sent();
                    return [4 /*yield*/, googleDriveCheckbox.getProperty('checked')];
                case 68: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 69:
                    googleDriveChecked = _e.sent();
                    if (googleDrive != googleDriveChecked) {
                        console.log('Algo Google Drive: ' + googleDrive + 'Ticket Google Drive: ' + googleDriveChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"google group\"]")];
                case 70:
                    googleGroupCheckbox = _e.sent();
                    return [4 /*yield*/, googleGroupCheckbox.getProperty('checked')];
                case 71: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 72:
                    googleGroupChecked = _e.sent();
                    if (googleGroup != googleGroupChecked) {
                        console.log('Algo Google Group: ' + googleGroup + 'Ticket Google Group: ' + googleGroupChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"hardware\"]")];
                case 73:
                    hardwareCheckbox = _e.sent();
                    return [4 /*yield*/, hardwareCheckbox.getProperty('checked')];
                case 74: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 75:
                    hardwareChecked = _e.sent();
                    if (hardware != hardwareChecked) {
                        console.log('Algo Hardware: ' + hardware + 'Ticket Hardware: ' + hardwareChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"library related\"]")];
                case 76:
                    libraryRelatedCheckbox = _e.sent();
                    return [4 /*yield*/, libraryRelatedCheckbox.getProperty('checked')];
                case 77: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 78:
                    libraryRelatedChecked = _e.sent();
                    if (libraryRelated != libraryRelatedChecked) {
                        console.log('Algo LibraryRelated: ' + libraryRelated + 'Ticket LibraryRelated: ' + libraryRelatedChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"mass email\"]")];
                case 79:
                    massEmailCheckbox = _e.sent();
                    return [4 /*yield*/, massEmailCheckbox.getProperty('checked')];
                case 80: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 81:
                    massEmailChecked = _e.sent();
                    if (massEmail != massEmailChecked) {
                        console.log('Algo massEmail: ' + massEmail + 'Ticket massEmail: ' + massEmailChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"microsoft\"]")];
                case 82:
                    microsoftCheckbox = _e.sent();
                    return [4 /*yield*/, microsoftCheckbox.getProperty('checked')];
                case 83: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 84:
                    microsoftChecked = _e.sent();
                    if (microsoft != microsoftChecked) {
                        console.log('Algo microsoft: ' + microsoft + 'Ticket microsoft: ' + microsoftChecked);
                        for (i = 0; i < reg.microsoftRegexList.length; i++) {
                            console.log(reg.microsoftRegexList[i].exec(messages));
                        }
                    }
                    return [4 /*yield*/, page.$("input[value=\"network\"]")];
                case 85:
                    networkCheckbox = _e.sent();
                    return [4 /*yield*/, networkCheckbox.getProperty('checked')];
                case 86: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 87:
                    networkChecked = _e.sent();
                    if (network != networkChecked) {
                        console.log('Algo network: ' + network + 'Ticket network: ' + networkChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"password reset\"]")];
                case 88:
                    passwordResetCheckbox = _e.sent();
                    return [4 /*yield*/, passwordResetCheckbox.getProperty('checked')];
                case 89: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 90:
                    passwordResetChecked = _e.sent();
                    if (passwordReset != passwordResetChecked) {
                        console.log('Algo passwordReset: ' + passwordReset + 'Ticket passwordReset: ' + passwordResetChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"phish report/fwd\"]")];
                case 91:
                    phishCheckbox = _e.sent();
                    return [4 /*yield*/, phishCheckbox.getProperty('checked')];
                case 92: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 93:
                    phishChecked = _e.sent();
                    if (phish != phishChecked) {
                        console.log('Algo phish: ' + phish + 'Ticket phish: ' + phishChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"printers/copiers\"]")];
                case 94:
                    printingCheckbox = _e.sent();
                    return [4 /*yield*/, printingCheckbox.getProperty('checked')];
                case 95: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 96:
                    printingChecked = _e.sent();
                    if (printing != printingChecked) {
                        console.log('Algo printing: ' + printing + 'Ticket printing: ' + printingChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"reed accounts & access\"]")];
                case 97:
                    reedAccountsCheckbox = _e.sent();
                    return [4 /*yield*/, reedAccountsCheckbox.getProperty('checked')];
                case 98: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 99:
                    reedAccountsChecked = _e.sent();
                    if (reedAccounts != reedAccountsChecked) {
                        console.log('Algo reedAccounts: ' + reedAccounts + 'Ticket reedAccounts: ' + reedAccountsChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"software\"]")];
                case 100:
                    softwareCheckbox = _e.sent();
                    return [4 /*yield*/, softwareCheckbox.getProperty('checked')];
                case 101: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 102:
                    softwareChecked = _e.sent();
                    if (software != softwareChecked) {
                        console.log('Algo software: ' + software + 'Ticket software: ' + softwareChecked);
                        for (i = 0; i < reg.softwareRegexList.length; i++) {
                            console.log(reg.softwareRegexList[i].exec(messages));
                        }
                    }
                    return [4 /*yield*/, page.$("input[value=\"thesis\"]")];
                case 103:
                    thesisCheckbox = _e.sent();
                    return [4 /*yield*/, thesisCheckbox.getProperty('checked')];
                case 104: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 105:
                    thesisChecked = _e.sent();
                    if (thesis != thesisChecked) {
                        console.log('Algo thesis: ' + thesis + 'Ticket thesis: ' + thesisChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"two-factor\"]")];
                case 106:
                    twoFactorCheckbox = _e.sent();
                    return [4 /*yield*/, twoFactorCheckbox.getProperty('checked')];
                case 107: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 108:
                    twoFactorChecked = _e.sent();
                    if (twoFactor != twoFactorChecked) {
                        console.log('Algo twoFactor: ' + twoFactor + 'Ticket twoFactor: ' + twoFactorChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"user/name change\"]")];
                case 109:
                    nameChangeCheckbox = _e.sent();
                    return [4 /*yield*/, nameChangeCheckbox.getProperty('checked')];
                case 110: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 111:
                    nameChangeChecked = _e.sent();
                    if (nameChange != nameChangeChecked) {
                        console.log('Algo nameChange: ' + nameChange + 'Ticket nameChange: ' + nameChangeChecked);
                    }
                    return [4 /*yield*/, page.$("input[value=\"virus/malware\"]")];
                case 112:
                    virusMalwareCheckbox = _e.sent();
                    return [4 /*yield*/, virusMalwareCheckbox.getProperty('checked')];
                case 113: return [4 /*yield*/, (_e.sent()).jsonValue()];
                case 114:
                    virusMalwareChecked = _e.sent();
                    if (virusMalware != virusMalwareChecked) {
                        console.log('Algo virusMalware: ' + virusMalware + 'Ticket virusMalware: ' + virusMalwareChecked);
                    }
                    console.log('End');
                    return [2 /*return*/];
            }
        });
    });
}
run();
