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
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require('fs');
var pw = (0, fs_1.readFileSync)('./password.txt', 'utf-8');
var login = 'aigibson';
var reedLoginURL = 'https://weblogin.reed.edu/?cosign-help&';
//make sure u edit search to show unlimited rows, not just 50
var searchURL = 'https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=(%20Queue%20%3D%20%27cus%27%20OR%20Queue%20%3D%20%27twatch%27%20)%20AND%20Created%20%3C%20%272022-01-01%27%20AND%20Created%20%3E%20%272021-07-31%27%20AND%20%27CF.%7BSupport%20Tags%7D%27%20IS%20NULL%20AND%20id%20%3E%20332850&RowsPerPage=0&SavedChartSearchId=new&SavedSearchId=new';
function run(currentTicket) {
    return __awaiter(this, void 0, void 0, function () {
        var ticketURL, browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ticketURL = 'https://help.reed.edu/Ticket/Display.html?id=';
                    return [4 /*yield*/, puppeteer.launch({
                        //devtools: true, //this also forces {headless: false}
                        //dumpio: true //captures all console messages to output https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
                        })
                        //const page = await browser.newPage()
                    ];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()
                        //await page.setViewport({ width: 1692, height: 777 }) //({ width: 850, height: 800}); //doesn't matter
                    ]; //this fixes extra empty tab being open instead of above line
                case 2:
                    page = (_a.sent()) //this fixes extra empty tab being open instead of above line
                    [0];
                    //await page.setViewport({ width: 1692, height: 777 }) //({ width: 850, height: 800}); //doesn't matter
                    return [4 /*yield*/, page.goto(reedLoginURL + ticketURL + currentTicket)];
                case 3:
                    //await page.setViewport({ width: 1692, height: 777 }) //({ width: 850, height: 800}); //doesn't matter
                    _a.sent();
                    return [4 /*yield*/, page.type('[name="login"]', login)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.type('[name="password"]', pw)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click("button[class=\"btn btn-primary pull-right\"]")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, ticketFix(page, currentTicket)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 8:
                    _a.sent();
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
function ticketFix(page, currentTicket) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    return __awaiter(this, void 0, void 0, function () {
        var quotedTextSelector, emeritus, titleSelector, titleElements, titleElements_1, titleElements_1_1, titleElement, titleValue, e_1_1, error_1, affiliationSelector, faculty, student, affiliate, alumni, staff, affiliationsElements, affiliationsElements_1, affiliationsElements_1_1, affiliationsElement, affiliationsValue, e_2_1, nonReedEmail, emailSelector, emailElements, emails, emailElements_1, emailElements_1_1, emailElement, emailValue, e_3_1, googleDrive, googleGroup, hardware, libraryRelated, massEmail, microsoft, network, passwordReset, phish, printing, reedAccounts, software, thesis, twoFactor, nameChange, virusMalware, noTag, messages, ticketHistorySelector, emailStanzas, emailStanzas_1, emailStanzas_1_1, emailStanza, emailValue, e_4_1, ticketTitleElement, ticketTitleValue, googleDriveMatch, googleGroupMatch, hardwareMatch, libraryRelatedMatch, massEmailMatch, microsoftMatch, networkMatch, passwordResetMatch, phishMatch, printingMatch, reedAccountsMatch, softwareMatch, thesisMatch, twoFactorMatch, nameChangeMatch, virusMalwareMatch, noTagMatch, currURL, modifyURL, queue, queueValue;
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
                    emeritus = false;
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 19, , 20]);
                    titleSelector = ".CustomField__Title_ > span.value" //must check if there are multiple
                    ;
                    return [4 /*yield*/, page.waitForSelector(titleSelector)
                        //this was from when I didn't realize there could b mult requestors
                        //let titleElement = await page.$(titleSelector);
                        //let titleValue = await page.evaluate(el => el.textContent, titleElement);
                    ]; //this waits for FIRST selector matching, what if the first loads faster than the second??
                case 4:
                    _e.sent(); //this waits for FIRST selector matching, what if the first loads faster than the second??
                    return [4 /*yield*/, page.$$(titleSelector)];
                case 5:
                    titleElements = _e.sent();
                    _e.label = 6;
                case 6:
                    _e.trys.push([6, 12, 13, 18]);
                    titleElements_1 = __asyncValues(titleElements);
                    _e.label = 7;
                case 7: return [4 /*yield*/, titleElements_1.next()];
                case 8:
                    if (!(titleElements_1_1 = _e.sent(), !titleElements_1_1.done)) return [3 /*break*/, 11];
                    titleElement = titleElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, titleElement)];
                case 9:
                    titleValue = _e.sent();
                    if (titleValue.includes('emeritus') || titleValue.includes('Emeritus') || titleValue.includes('emerita') || titleValue.includes('Emerita')) {
                        emeritus = true;
                    }
                    _e.label = 10;
                case 10: return [3 /*break*/, 7];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _e.trys.push([13, , 16, 17]);
                    if (!(titleElements_1_1 && !titleElements_1_1.done && (_a = titleElements_1.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _a.call(titleElements_1)];
                case 14:
                    _e.sent();
                    _e.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18: return [3 /*break*/, 20];
                case 19:
                    error_1 = _e.sent();
                    console.error(error_1);
                    return [3 /*break*/, 20];
                case 20:
                    affiliationSelector = ".CustomField__Primary_Affiliation_ > span.value";
                    faculty = false;
                    student = false;
                    affiliate = false;
                    alumni = false;
                    staff = false;
                    return [4 /*yield*/, page.$$(affiliationSelector)];
                case 21:
                    affiliationsElements = _e.sent();
                    _e.label = 22;
                case 22:
                    _e.trys.push([22, 28, 29, 34]);
                    affiliationsElements_1 = __asyncValues(affiliationsElements);
                    _e.label = 23;
                case 23: return [4 /*yield*/, affiliationsElements_1.next()];
                case 24:
                    if (!(affiliationsElements_1_1 = _e.sent(), !affiliationsElements_1_1.done)) return [3 /*break*/, 27];
                    affiliationsElement = affiliationsElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, affiliationsElement)];
                case 25:
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
                    _e.label = 26;
                case 26: return [3 /*break*/, 23];
                case 27: return [3 /*break*/, 34];
                case 28:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 34];
                case 29:
                    _e.trys.push([29, , 32, 33]);
                    if (!(affiliationsElements_1_1 && !affiliationsElements_1_1.done && (_b = affiliationsElements_1.return))) return [3 /*break*/, 31];
                    return [4 /*yield*/, _b.call(affiliationsElements_1)];
                case 30:
                    _e.sent();
                    _e.label = 31;
                case 31: return [3 /*break*/, 33];
                case 32:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 33: return [7 /*endfinally*/];
                case 34:
                    nonReedEmail = false;
                    emailSelector = ".EmailAddress > span.value";
                    return [4 /*yield*/, page.$$(emailSelector)];
                case 35:
                    emailElements = _e.sent();
                    emails = [];
                    _e.label = 36;
                case 36:
                    _e.trys.push([36, 42, 43, 48]);
                    emailElements_1 = __asyncValues(emailElements);
                    _e.label = 37;
                case 37: return [4 /*yield*/, emailElements_1.next()];
                case 38:
                    if (!(emailElements_1_1 = _e.sent(), !emailElements_1_1.done)) return [3 /*break*/, 41];
                    emailElement = emailElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, emailElement)];
                case 39:
                    emailValue = _e.sent();
                    emails.push(emailValue);
                    _e.label = 40;
                case 40: return [3 /*break*/, 37];
                case 41: return [3 /*break*/, 48];
                case 42:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 48];
                case 43:
                    _e.trys.push([43, , 46, 47]);
                    if (!(emailElements_1_1 && !emailElements_1_1.done && (_c = emailElements_1.return))) return [3 /*break*/, 45];
                    return [4 /*yield*/, _c.call(emailElements_1)];
                case 44:
                    _e.sent();
                    _e.label = 45;
                case 45: return [3 /*break*/, 47];
                case 46:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 47: return [7 /*endfinally*/];
                case 48:
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
                case 49:
                    _e.sent();
                    return [4 /*yield*/, page.$$(ticketHistorySelector)];
                case 50:
                    emailStanzas = _e.sent();
                    _e.label = 51;
                case 51:
                    _e.trys.push([51, 57, 58, 63]);
                    emailStanzas_1 = __asyncValues(emailStanzas);
                    _e.label = 52;
                case 52: return [4 /*yield*/, emailStanzas_1.next()];
                case 53:
                    if (!(emailStanzas_1_1 = _e.sent(), !emailStanzas_1_1.done)) return [3 /*break*/, 56];
                    emailStanza = emailStanzas_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.innerText; }, emailStanza)]; //this gives proper spacing after changing textContent to innerText
                case 54:
                    emailValue = _e.sent() //this gives proper spacing after changing textContent to innerText
                    ;
                    messages += emailValue + '\n';
                    _e.label = 55;
                case 55: return [3 /*break*/, 52];
                case 56: return [3 /*break*/, 63];
                case 57:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 63];
                case 58:
                    _e.trys.push([58, , 61, 62]);
                    if (!(emailStanzas_1_1 && !emailStanzas_1_1.done && (_d = emailStanzas_1.return))) return [3 /*break*/, 60];
                    return [4 /*yield*/, _d.call(emailStanzas_1)];
                case 59:
                    _e.sent();
                    _e.label = 60;
                case 60: return [3 /*break*/, 62];
                case 61:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 62: return [7 /*endfinally*/];
                case 63:
                    messages = messages.replace(reg.cusAutoReplyRegex, '');
                    messages += emails + '\n'; //putting the email values in messages to simplify search
                    return [4 /*yield*/, page.waitForSelector('#header > h1')]; //title of ticket
                case 64:
                    _e.sent(); //title of ticket
                    return [4 /*yield*/, page.$('#header > h1')];
                case 65:
                    ticketTitleElement = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, ticketTitleElement)];
                case 66:
                    ticketTitleValue = _e.sent();
                    messages += ticketTitleValue + '\n';
                    //console.log(messages)
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
                        noTag = true;
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
                    else if (emails.toString().includes('email-alias-request@reed.edu')) {
                        reedAccounts = true;
                    }
                    else if (ticketTitleValue.includes('CUS Computer Maintenance Required') || ticketTitleValue.includes('Tracking Down') || ticketTitleValue.includes('tracking down')) {
                        hardware = true;
                    }
                    else if (messages.includes('Code42')) {
                        software = true;
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
                        if (noTagMatch && !massEmailMatch) {
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
                            if (noTag && massEmail) {
                                massEmail = true;
                                noTag = false;
                            }
                        }
                        //if no matches (no regex match AND no hard rule match(implied here)), flag for manual review
                        if (!googleDriveMatch && !googleGroupMatch && !hardwareMatch && !libraryRelatedMatch && !massEmailMatch && !microsoftMatch && !networkMatch && !passwordResetMatch && !phishMatch && !printingMatch && !reedAccountsMatch && !softwareMatch && !thesisMatch && !twoFactorMatch && !nameChangeMatch && !virusMalwareMatch && !noTagMatch && !noTag) {
                            console.log('FLAG NO REGEX MATCH ' + page.url());
                            fs.appendFile('lucas.txt', page.url() + '\n', function (err) {
                                if (err)
                                    throw err;
                            });
                        }
                    } //end of else regex section
                    currURL = page.url();
                    modifyURL = currURL.replace('Display', 'Modify');
                    return [4 /*yield*/, page.goto(modifyURL)
                        //checks if in t-watch or cus queue; other queues will probably MOSTLY work but I haven't tested so I'm excluding
                    ];
                case 67:
                    _e.sent();
                    return [4 /*yield*/, page.$$("select.select-queue")];
                case 68:
                    queue = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (q) { return q.value; }, queue[1])];
                case 69:
                    queueValue = _e.sent();
                    if (queueValue != 4 && queueValue != 11) {
                        console.log('Not CUS or TWatch Queue' + ' ' + queueValue);
                        process.exit(); //ends entire script
                    }
                    //comparison code; no longer needed
                    // const googleDriveCheckbox = await page.$(`input[value="google drive"]`)
                    // const googleDriveChecked = await (await googleDriveCheckbox.getProperty('checked')).jsonValue()
                    // if (googleDrive != googleDriveChecked) {
                    //   console.log('Algo Google Drive: ' + googleDrive + 'Ticket Google Drive: ' + googleDriveChecked)
                    // }
                    //
                    // const googleGroupCheckbox = await page.$(`input[value="google group"]`)
                    // const googleGroupChecked = await (await googleGroupCheckbox.getProperty('checked')).jsonValue()
                    // if (googleGroup != googleGroupChecked) {
                    //   console.log('Algo Google Group: ' + googleGroup + 'Ticket Google Group: ' + googleGroupChecked)
                    // }
                    //
                    // const hardwareCheckbox = await page.$(`input[value="hardware"]`)
                    // const hardwareChecked = await (await hardwareCheckbox.getProperty('checked')).jsonValue()
                    // if (hardware != hardwareChecked) {
                    //   console.log('Algo Hardware: ' + hardware + 'Ticket Hardware: ' + hardwareChecked)
                    // }
                    //
                    // const libraryRelatedCheckbox = await page.$(`input[value="library related"]`)
                    // const libraryRelatedChecked = await (await libraryRelatedCheckbox.getProperty('checked')).jsonValue()
                    // if (libraryRelated != libraryRelatedChecked) {
                    //   console.log('Algo LibraryRelated: ' + libraryRelated + 'Ticket LibraryRelated: ' + libraryRelatedChecked)
                    // }
                    //
                    // const massEmailCheckbox = await page.$(`input[value="mass email"]`)
                    // const massEmailChecked = await (await massEmailCheckbox.getProperty('checked')).jsonValue()
                    // if (massEmail != massEmailChecked) {
                    //   console.log('Algo massEmail: ' + massEmail + 'Ticket massEmail: ' + massEmailChecked)
                    // }
                    //
                    // const microsoftCheckbox = await page.$(`input[value="microsoft"]`)
                    // const microsoftChecked = await (await microsoftCheckbox.getProperty('checked')).jsonValue()
                    // if (microsoft != microsoftChecked) {
                    //   console.log('Algo microsoft: ' + microsoft + 'Ticket microsoft: ' + microsoftChecked)
                    //   for (let i = 0; i < reg.microsoftRegexList.length; i++) {
                    //     console.log(reg.microsoftRegexList[i].exec(messages))
                    //   }
                    // }
                    //
                    // const networkCheckbox = await page.$(`input[value="network"]`)
                    // const networkChecked = await (await networkCheckbox.getProperty('checked')).jsonValue()
                    // if (network != networkChecked) {
                    //   console.log('Algo network: ' + network + 'Ticket network: ' + networkChecked)
                    // }
                    //
                    // const passwordResetCheckbox = await page.$(`input[value="password reset"]`)
                    // const passwordResetChecked = await (await passwordResetCheckbox.getProperty('checked')).jsonValue()
                    // if (passwordReset != passwordResetChecked) {
                    //   console.log('Algo passwordReset: ' + passwordReset + 'Ticket passwordReset: ' + passwordResetChecked)
                    // }
                    //
                    // const phishCheckbox = await page.$(`input[value="phish report/fwd"]`)
                    // const phishChecked = await (await phishCheckbox.getProperty('checked')).jsonValue()
                    // if (phish != phishChecked) {
                    //   console.log('Algo phish: ' + phish + 'Ticket phish: ' + phishChecked)
                    // }
                    //
                    // const printingCheckbox = await page.$(`input[value="printers/copiers"]`)
                    // const printingChecked = await (await printingCheckbox.getProperty('checked')).jsonValue()
                    // if (printing != printingChecked) {
                    //   console.log('Algo printing: ' + printing + 'Ticket printing: ' + printingChecked)
                    // }
                    //
                    // const reedAccountsCheckbox = await page.$(`input[value="reed accounts & access"]`)
                    // const reedAccountsChecked = await (await reedAccountsCheckbox.getProperty('checked')).jsonValue()
                    // if (reedAccounts != reedAccountsChecked) {
                    //   console.log('Algo reedAccounts: ' + reedAccounts + 'Ticket reedAccounts: ' + reedAccountsChecked)
                    // }
                    //
                    // const softwareCheckbox = await page.$(`input[value="software"]`)
                    // const softwareChecked = await (await softwareCheckbox.getProperty('checked')).jsonValue()
                    // if (software != softwareChecked) {
                    //   console.log('Algo software: ' + software + 'Ticket software: ' + softwareChecked)
                    //   for (let i = 0; i < reg.softwareRegexList.length; i++) {
                    //     console.log(reg.softwareRegexList[i].exec(messages))
                    //   }
                    // }
                    //
                    // const thesisCheckbox = await page.$(`input[value="thesis"]`)
                    // const thesisChecked = await (await thesisCheckbox.getProperty('checked')).jsonValue()
                    // if (thesis != thesisChecked) {
                    //   console.log('Algo thesis: ' + thesis + 'Ticket thesis: ' + thesisChecked)
                    // }
                    //
                    // const twoFactorCheckbox = await page.$(`input[value="two-factor"]`)
                    // const twoFactorChecked = await (await twoFactorCheckbox.getProperty('checked')).jsonValue()
                    // if (twoFactor != twoFactorChecked) {
                    //   console.log('Algo twoFactor: ' + twoFactor + 'Ticket twoFactor: ' + twoFactorChecked)
                    // }
                    //
                    // const nameChangeCheckbox = await page.$(`input[value="user/name change"]`)
                    // const nameChangeChecked = await (await nameChangeCheckbox.getProperty('checked')).jsonValue()
                    // if (nameChange != nameChangeChecked) {
                    //   console.log('Algo nameChange: ' + nameChange + 'Ticket nameChange: ' + nameChangeChecked)
                    // }
                    //
                    // const virusMalwareCheckbox = await page.$(`input[value="virus/malware"]`)
                    // const virusMalwareChecked = await (await virusMalwareCheckbox.getProperty('checked')).jsonValue()
                    // if (virusMalware != virusMalwareChecked) {
                    //   console.log('Algo virusMalware: ' + virusMalware + 'Ticket virusMalware: ' + virusMalwareChecked)
                    // }
                    //console.log('End')
                    if (!massEmail) {
                        //don't set affiliation if mass email
                        if (emeritus) {
                            if (faculty) {
                                checkSpecificBox(page, 'emeritus/emerita');
                                checkSpecificBox(page, 'faculty');
                            }
                            else if (staff) {
                                checkSpecificBox(page, 'emeritus/emerita');
                                checkSpecificBox(page, 'staff');
                            }
                        }
                        else if (student) {
                            checkSpecificBox(page, 'student');
                            //if(affiliate){checkSpecificBox(page,"affiliate")}
                        }
                        else if (alumni) {
                            checkSpecificBox(page, 'alumni');
                            //if(faculty){checkSpecificBox(page,"faculty")}
                            //if(staff){checkSpecificBox(page,"staff")}
                            //if(affiliate){checkSpecificBox(page,"affiliate")}
                        }
                        else if (faculty) {
                            checkSpecificBox(page, 'faculty');
                        }
                        else if (staff) {
                            checkSpecificBox(page, 'staff');
                        }
                        else if (affiliate) {
                            checkSpecificBox(page, 'affiliate');
                        }
                        else if (nonReedEmail && (ticketTitleValue.includes('applicant') || ticketTitleValue.includes('Applicant'))) {
                            console.log('FLAG Possible Applicant: ' + modifyURL);
                        }
                    }
                    //SUPPORT TAGS CHECKING BOXES
                    if (googleDrive) {
                        checkSpecificBox(page, 'google drive');
                    }
                    if (googleGroup) {
                        checkSpecificBox(page, 'google group');
                    }
                    if (hardware) {
                        checkSpecificBox(page, 'hardware');
                    }
                    if (libraryRelated) {
                        checkSpecificBox(page, 'library related');
                    }
                    if (massEmail) {
                        checkSpecificBox(page, 'mass email');
                    }
                    if (microsoft) {
                        checkSpecificBox(page, 'microsoft');
                    }
                    if (network) {
                        checkSpecificBox(page, 'network');
                    }
                    if (passwordReset) {
                        checkSpecificBox(page, 'password reset');
                    }
                    if (phish) {
                        checkSpecificBox(page, 'phish report/fwd');
                    }
                    if (printing) {
                        checkSpecificBox(page, 'printers/copiers');
                    }
                    if (reedAccounts) {
                        checkSpecificBox(page, 'reed accounts & access');
                    }
                    if (software) {
                        checkSpecificBox(page, 'software');
                    }
                    if (thesis) {
                        checkSpecificBox(page, 'thesis');
                    }
                    if (twoFactor) {
                        checkSpecificBox(page, 'two-factor');
                    }
                    if (nameChange) {
                        checkSpecificBox(page, 'user/name change');
                    }
                    if (virusMalware) {
                        checkSpecificBox(page, 'virus/malware');
                    }
                    //presses submit
                    return [4 /*yield*/, page.click('#TicketModify > div.submit > div.buttons > input')
                        //process.abort() //exit() kills the script too soon, only abort works for some reason!
                    ];
                case 70:
                    //presses submit
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, tickets, _a, _b, _i, ticket;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.pages()];
            case 2:
                page = (_c.sent())[0];
                return [4 /*yield*/, page.goto(reedLoginURL + searchURL)];
            case 3:
                _c.sent();
                return [4 /*yield*/, page.type('[name="login"]', login)];
            case 4:
                _c.sent();
                return [4 /*yield*/, page.type('[name="password"]', pw)];
            case 5:
                _c.sent();
                return [4 /*yield*/, page.click("button[class=\"btn btn-primary pull-right\"]")
                    //wait for page load. (no network requests for idleTime ms, trying to b super generous & borderline inefficient but whatever, this could b used on lots of tickets&a shitty connection
                ];
            case 6:
                _c.sent();
                //wait for page load. (no network requests for idleTime ms, trying to b super generous & borderline inefficient but whatever, this could b used on lots of tickets&a shitty connection
                return [4 /*yield*/, page.waitForNetworkIdle({ idleTime: 10000 })];
            case 7:
                //wait for page load. (no network requests for idleTime ms, trying to b super generous & borderline inefficient but whatever, this could b used on lots of tickets&a shitty connection
                _c.sent();
                return [4 /*yield*/, page.$$eval("tbody.list-item", function (el) { return el.map(function (x) { return x.getAttribute('data-record-id'); }); })];
            case 8:
                tickets = _c.sent();
                console.log(tickets.length);
                _a = [];
                for (_b in tickets)
                    _a.push(_b);
                _i = 0;
                _c.label = 9;
            case 9:
                if (!(_i < _a.length)) return [3 /*break*/, 12];
                ticket = _a[_i];
                console.log(tickets[ticket]);
                return [4 /*yield*/, run(tickets[ticket])];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 9];
            case 12: return [4 /*yield*/, browser.close()];
            case 13:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); })();
