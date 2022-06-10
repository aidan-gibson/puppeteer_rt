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
var month = "https://help.reed.edu/Search/Results.html?Format=%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__id__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3A%23%27%2C%0A%27%3Cb%3E%3Ca%20href%3D%22__WebPath__%2FTicket%2FDisplay.html%3Fid%3D__id__%22%3E__Subject__%3C%2Fa%3E%3C%2Fb%3E%2FTITLE%3ASubject%27%2C%0AStatus%2C%0AQueueName%2C%0AOwner%2C%0APriority%2C%0A%27__NEWLINE__%27%2C%0A%27__NBSP__%27%2C%0A%27%3Csmall%3E__Requestors__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__CreatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__ToldRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__LastUpdatedRelative__%3C%2Fsmall%3E%27%2C%0A%27%3Csmall%3E__TimeLeft__%3C%2Fsmall%3E%27&Order=ASC%7CASC%7CASC%7CASC&OrderBy=id%7C%7C%7C&Query=Queue%20%3D%20%27cus%27%20AND%20Created%20%3C%20%272022-04-01%27%20AND%20Created%20%3E%20%272022-02-28%27&RowsPerPage=50&SavedChartSearchId=new&SavedSearchId=new"; //click on links which propagate, but swap Display with Modify in URL; ie from https://help.reed.edu/Ticket/Display.html?id=339418 to https://help.reed.edu/Ticket/Modify.html?id=339418
var puppeteer = require('puppeteer'); //a
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        devtools: true, //this also forces {headless: false}
                        //dumpio: true //captures all console messages to output https://stackoverflow.com/questions/47539043/how-to-get-all-console-messages-with-puppeteer-including-errors-csp-violations
                    })
                    //const page = await browser.newPage()
                ];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.pages()];
                case 2:
                    page = (_a.sent())[0];
                    return [4 /*yield*/, page.setViewport({ width: 850, height: 800 })];
                case 3:
                    _a.sent(); //doesn't matter
                    return [4 /*yield*/, page.goto(reedLoginURL + "https://help.reed.edu/Ticket/Display.html?id=344331")];
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
        var titleSelector, titleElements, emeritus, titleElements_1, titleElements_1_1, titleElement, titleValue, e_1_1, affiliationSelector, faculty, student, affiliate, alumni, staff, affiliationsElements, affiliationsElements_1, affiliationsElements_1_1, affiliationsElement, affiliationsValue, e_2_1, nonReedEmail, emailSelector, emailElements, emails, emailElements_1, emailElements_1_1, emailElement, emailValue, e_3_1, googleDrive, googleGroup, hardware, libraryRelated, massEmail, microsoft, network, passwordReset, phish, printing, reedAccounts, software, thesis, twoFactor, nameChange, virusMalware, noTag, messages, ticketHistorySelector, emailStanzas, emailStanzas_1, emailStanzas_1_1, emailStanza, emailValue, e_4_1, ticketTitleElement, ticketTitleValue, googleDriveRegexList, NOgoogleDriveRegexList, googleGroupRegexList, NOgoogleGroupRegexList, hardwareRegexList, NOhardwareRegexList, libraryRelatedRegexList, NOlibraryRelatedRegexList, massEmailRegexList, NOmassEmailRegexList, microsoftRegexList, NOmicrosoftRegexList, networkRegexList, NOnetworkRegexList, passwordResetRegexList, NOpasswordResetRegexList, phishRegexList, NOphishRegexList, printingRegexList, NOprintingRegexList, reedAccountsRegexList, NOreedAccountsRegexList, softwareRegexList, NOsoftwareRegexList, thesisRegexList, NOthesisRegexList, twoFactorRegexList, NOtwoFactorRegexList, nameChangeRegexList, NOnameChangeRegexList, virusMalwareRegexList, NOvirusMalwareRegexList, noTagRegexList, NOnoTagRegexList, googleDriveMatch, googleGroupMatch, hardwareMatch, libraryRelatedMatch, massEmailMatch, microsoftMatch, networkMatch, passwordResetMatch, phishMatch, printingMatch, reedAccountsMatch, softwareMatch, thesisMatch, twoFactorMatch, nameChangeMatch, virusMalwareMatch, noTagMatch;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    titleSelector = ".CustomField__Title_ > span.value";
                    return [4 /*yield*/, page.waitForSelector(titleSelector)];
                case 1:
                    _e.sent(); //TODO this waits for FIRST selector matching, what if the first loads faster than the second??
                    return [4 /*yield*/, page.$$(titleSelector)];
                case 2:
                    titleElements = _e.sent();
                    emeritus = false;
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 9, 10, 15]);
                    titleElements_1 = __asyncValues(titleElements);
                    _e.label = 4;
                case 4: return [4 /*yield*/, titleElements_1.next()];
                case 5:
                    if (!(titleElements_1_1 = _e.sent(), !titleElements_1_1.done)) return [3 /*break*/, 8];
                    titleElement = titleElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, titleElement)];
                case 6:
                    titleValue = _e.sent();
                    if (titleValue.includes("emeritus") || titleValue.includes("Emeritus") || titleValue.includes("emerita") || titleValue.includes("Emerita")) {
                        emeritus = true;
                    }
                    _e.label = 7;
                case 7: return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _e.trys.push([10, , 13, 14]);
                    if (!(titleElements_1_1 && !titleElements_1_1.done && (_a = titleElements_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _a.call(titleElements_1)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    console.log("Emeritus: " + emeritus);
                    affiliationSelector = ".CustomField__Primary_Affiliation_ > span.value";
                    faculty = false;
                    student = false;
                    affiliate = false;
                    alumni = false;
                    staff = false;
                    return [4 /*yield*/, page.$$(affiliationSelector)];
                case 16:
                    affiliationsElements = _e.sent();
                    _e.label = 17;
                case 17:
                    _e.trys.push([17, 23, 24, 29]);
                    affiliationsElements_1 = __asyncValues(affiliationsElements);
                    _e.label = 18;
                case 18: return [4 /*yield*/, affiliationsElements_1.next()];
                case 19:
                    if (!(affiliationsElements_1_1 = _e.sent(), !affiliationsElements_1_1.done)) return [3 /*break*/, 22];
                    affiliationsElement = affiliationsElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, affiliationsElement)];
                case 20:
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
                    _e.label = 21;
                case 21: return [3 /*break*/, 18];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _e.trys.push([24, , 27, 28]);
                    if (!(affiliationsElements_1_1 && !affiliationsElements_1_1.done && (_b = affiliationsElements_1.return))) return [3 /*break*/, 26];
                    return [4 /*yield*/, _b.call(affiliationsElements_1)];
                case 25:
                    _e.sent();
                    _e.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29:
                    console.log("Faculty: " + faculty);
                    console.log("Student: " + student);
                    console.log("Affiliate: " + affiliate);
                    console.log("Alumni: " + alumni);
                    console.log("Staff: " + staff);
                    nonReedEmail = false;
                    emailSelector = ".EmailAddress > span.value";
                    return [4 /*yield*/, page.$$(emailSelector)];
                case 30:
                    emailElements = _e.sent();
                    emails = [];
                    _e.label = 31;
                case 31:
                    _e.trys.push([31, 37, 38, 43]);
                    emailElements_1 = __asyncValues(emailElements);
                    _e.label = 32;
                case 32: return [4 /*yield*/, emailElements_1.next()];
                case 33:
                    if (!(emailElements_1_1 = _e.sent(), !emailElements_1_1.done)) return [3 /*break*/, 36];
                    emailElement = emailElements_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, emailElement)];
                case 34:
                    emailValue = _e.sent();
                    emails.push(emailValue);
                    if (!(emailValue.includes("@reed.edu"))) {
                        nonReedEmail = true;
                    }
                    _e.label = 35;
                case 35: return [3 /*break*/, 32];
                case 36: return [3 /*break*/, 43];
                case 37:
                    e_3_1 = _e.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 43];
                case 38:
                    _e.trys.push([38, , 41, 42]);
                    if (!(emailElements_1_1 && !emailElements_1_1.done && (_c = emailElements_1.return))) return [3 /*break*/, 40];
                    return [4 /*yield*/, _c.call(emailElements_1)];
                case 39:
                    _e.sent();
                    _e.label = 40;
                case 40: return [3 /*break*/, 42];
                case 41:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 42: return [7 /*endfinally*/];
                case 43:
                    if (!emeritus && !student && !affiliate && !alumni && !staff && !faculty && !emails.includes("@reed.edu")) {
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
                    ticketHistorySelector = "div.history-container";
                    return [4 /*yield*/, page.waitForSelector(ticketHistorySelector)];
                case 44:
                    _e.sent();
                    return [4 /*yield*/, page.$$(ticketHistorySelector)];
                case 45:
                    emailStanzas = _e.sent();
                    _e.label = 46;
                case 46:
                    _e.trys.push([46, 52, 53, 58]);
                    emailStanzas_1 = __asyncValues(emailStanzas);
                    _e.label = 47;
                case 47: return [4 /*yield*/, emailStanzas_1.next()];
                case 48:
                    if (!(emailStanzas_1_1 = _e.sent(), !emailStanzas_1_1.done)) return [3 /*break*/, 51];
                    emailStanza = emailStanzas_1_1.value;
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, emailStanza)];
                case 49:
                    emailValue = _e.sent();
                    messages += emailValue;
                    _e.label = 50;
                case 50: return [3 /*break*/, 47];
                case 51: return [3 /*break*/, 58];
                case 52:
                    e_4_1 = _e.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 58];
                case 53:
                    _e.trys.push([53, , 56, 57]);
                    if (!(emailStanzas_1_1 && !emailStanzas_1_1.done && (_d = emailStanzas_1.return))) return [3 /*break*/, 55];
                    return [4 /*yield*/, _d.call(emailStanzas_1)];
                case 54:
                    _e.sent();
                    _e.label = 55;
                case 55: return [3 /*break*/, 57];
                case 56:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 57: return [7 /*endfinally*/];
                case 58:
                    messages += emails; //putting the email values in messages to simplify search
                    console.log(messages);
                    return [4 /*yield*/, page.waitForSelector("#header > h1")]; //title of ticket
                case 59:
                    _e.sent(); //title of ticket
                    return [4 /*yield*/, page.$("#header > h1")];
                case 60:
                    ticketTitleElement = _e.sent();
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, ticketTitleElement)];
                case 61:
                    ticketTitleValue = _e.sent();
                    messages += ticketTitleValue;
                    //HARD RULES SECTION (obvious/easy support tag selection). true no matter WHAT. nothing fuzzy/ambiguous.
                    if (emails.includes("malwarebytes.com")) {
                        virusMalware = true;
                    }
                    else if (emails.includes("etrieve@reed.edu")) { } //no tag, this is the "Notification of Staff Hire" emails
                    else if (ticketTitleValue.includes("Welcome to Reed College")) { } //no tag
                    else if (emails.includes("msgappr@groups.reed.edu") || ticketTitleValue.includes("groups.reed.edu admins: Message Pending")) {
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
                    else if (emails.includes("er-problem-report@reed.edu")) {
                        libraryRelated = true;
                    }
                    else if (emails.includes("msonlineservicesteam@microsoftonline.com")) {
                        microsoft = true;
                        passwordReset = true;
                    }
                    else if (emails.includes("@microsoft.com")) {
                        microsoft = true;
                    }
                    else if (emails.includes("@microsoftonline.com")) {
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
                    else if (emails.includes("noreply-spamdigest@google.com")) {
                        phish = true;
                    }
                    else if (emails.includes("xerox") || (emails.includes("ctx"))) {
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
                    else {
                        googleDriveRegexList = [/google drive/i, /drive request/i];
                        NOgoogleDriveRegexList = [];
                        googleGroupRegexList = [/google group/i, /@groups.google/, /group request/i];
                        NOgoogleGroupRegexList = [];
                        hardwareRegexList = [];
                        NOhardwareRegexList = [];
                        libraryRelatedRegexList = [/e-book/i, /library/i, /librarian/i, /IMC/, /LangLab/i];
                        NOlibraryRelatedRegexList = [];
                        massEmailRegexList = [/release email/i, /groups.reed.edu admins: Message Pending/];
                        NOmassEmailRegexList = [];
                        microsoftRegexList = [/microsoft/i, /powerpoint/i, /excel/i, /Word/, /macro/i, /Office/, /.doc\b/, /.docx\b/, /ppt\b/, /pptx\b/, /csv/, /.xl/];
                        NOmicrosoftRegexList = [/template/i] //word thesis template issues are NOT microsoft tag
                        ;
                        networkRegexList = [/wifi/i, /ethernet/i, /connection issue/i, /reed1x/i, /fluke/i, /MAC/, /mac address/i, /network/i, /\bdns\b/i, /trouble connect/i, /issues accessing/i, /alexa/i, /netreg/i, /xenia/, /wireless maint/i] ///([a-z0-9]+[.])*reed[.]edu/i removed this, too ambig. ie account-tools.reed.edu is clearly password reset only.
                        ;
                        NOnetworkRegexList = [/groups.reed.edu/];
                        passwordResetRegexList = [/password reset/i, /forgot password/i, /kerberos pass/i, /account-tools/] //can't use just "password" cuz ben's signature is "cis will never ask for ur password" AND it'd conflict w "Software" tag looking for 1password
                        ;
                        NOpasswordResetRegexList = [];
                        phishRegexList = [/phish/i, /scam/i, /spam/i];
                        NOphishRegexList = [];
                        printingRegexList = [/print/i, /ipp.reed.edu/, /xerox/i, /ctx/i, /laserjet/i, /toner/i];
                        NOprintingRegexList = [];
                        reedAccountsRegexList = [/new employee/i, /kerberos/i, /vpn/i, /dlist/i, /delegate/i, /setup your Reed account/i, /claim your Reed account/i, /account creation/i];
                        NOreedAccountsRegexList = [];
                        softwareRegexList = [/1password/i, /one-password/i, /onepassword/i];
                        NOsoftwareRegexList = [];
                        thesisRegexList = [];
                        NOthesisRegexList = [];
                        twoFactorRegexList = [/duo/i, /twostep/i, /two-step/i];
                        NOtwoFactorRegexList = [];
                        nameChangeRegexList = [/name change/i, /change name/i];
                        NOnameChangeRegexList = [];
                        virusMalwareRegexList = [/falcon/i, /crowdstrike/i, /virus/i, /malware/i, /malicious/i, /trojan/i,];
                        NOvirusMalwareRegexList = [];
                        noTagRegexList = [];
                        NOnoTagRegexList = [];
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
                        //TODO logic of Match bools -> real bools
                        //if no matches, flag for review
                        //if thesis, NOT microsoft
                        //if noTag or noTagMatch, nothing tagged
                    } //end of else regex section
                    return [2 /*return*/];
            }
        });
    });
}
run();
