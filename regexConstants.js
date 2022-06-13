"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNoTagRegexList = exports.noTagRegexList = exports.noVirusMalwareRegexList = exports.virusMalwareRegexList = exports.noNameChangeRegexList = exports.nameChangeRegexList = exports.noTwoFactorRegexList = exports.twoFactorRegexList = exports.noThesisRegexList = exports.thesisRegexList = exports.noSoftwareRegexList = exports.softwareRegexList = exports.noReedAccountsRegexList = exports.reedAccountsRegexList = exports.noPrintingRegexList = exports.printingRegexList = exports.noPhishRegexList = exports.phishRegexList = exports.noPasswordResetRegexList = exports.passwordResetRegexList = exports.noNetworkRegexList = exports.networkRegexList = exports.noMicrosoftRegexList = exports.microsoftRegexList = exports.noMassEmailRegexList = exports.massEmailRegexList = exports.noLibraryRelatedRegexList = exports.libraryRelatedRegexList = exports.noHardwareRegexList = exports.hardwareRegexList = exports.noGoogleGroupRegexList = exports.googleGroupRegexList = exports.noGoogleDriveRegexList = exports.googleDriveRegexList = exports.cusAutoReplyRegex = void 0;
// /i means case-insensitive, \b are word borders
exports.cusAutoReplyRegex = /This inbox is monitored 8:30am - 5pm, Monday through Friday.(.*)AMAZON ECHO, ETC.\)\*\*(.*?)phone: 503-777-7525/s;
exports.googleDriveRegexList = [/google drive/i, /drive request/i, /google form/i];
exports.noGoogleDriveRegexList = [];
exports.googleGroupRegexList = [/google group/i, /@groups.google/, /group request/i];
exports.noGoogleGroupRegexList = [];
exports.hardwareRegexList = [/iMac/, /hardware store/i];
exports.noHardwareRegexList = [];
exports.libraryRelatedRegexList = [/e-book/i, /library/i, /librarian/i, /IMC/, /LangLab/i];
exports.noLibraryRelatedRegexList = [];
exports.massEmailRegexList = [/release email/i, /release message/i, /groups.reed.edu admins: Message Pending/, /mass email/i, /approve(.*)Newsletter/i, /message(.*)release/i, /released/i];
exports.noMassEmailRegexList = [];
exports.microsoftRegexList = [/microsoft/i, /powerpoint/i, /\bexcel\b/i, /Word/, /\bmacro\b/i, /.doc\b/, /.docx\b/, /ppt\b/, /pptx\b/]; //got rid of /Office/ cuz Office of the Registrar etc can be in signatures, /csv/, /.xl/ cuz csv could be attached and it's totally unrelated, etc
exports.noMicrosoftRegexList = [/template/i]; //word thesis template issues are NOT microsoft tag
exports.networkRegexList = [/wifi/i, /ethernet/i, /connection issue/i, /reed1x/i, /fluke/i, /MAC/, /mac address/i, /network/i, /\bdns\b/i, /trouble connect/i, /issues accessing/i, /alexa/i, /netreg/i, /xenia/, /wireless maint/i, /smart-devices/, /authentication s/]; ///([a-z0-9]+[.])*reed[.]edu/i removed this, too ambig. ie account-tools.reed.edu is clearly password reset only.
exports.noNetworkRegexList = [/groups.reed.edu/];
exports.passwordResetRegexList = [/password reset/i, /forgot password/i, /kerberos pass/i, /account-tools/]; //can't use just "password" cuz ben's signature is "cis will never ask for ur password" AND it'd conflict w "Software" tag looking for 1password
exports.noPasswordResetRegexList = [];
exports.phishRegexList = [/phish/i, /scam/i, /spam/i];
exports.noPhishRegexList = [/Security Updates for Reed Computers/];
exports.printingRegexList = [/print/i, /ipp.reed.edu/, /xerox/i, /ctx/i, /laserjet/i, /toner/i];
exports.noPrintingRegexList = [];
exports.reedAccountsRegexList = [/new employee/i, /kerberos/i, /vpn/i, /dlist/i, /delegate/i, /setup your Reed account/i, /claim your Reed account/i, /account creation/i, /listserv/i, /accounts are scheduled to be closed/i, /reed computing accounts/i, /account tool/i, /online_forms\/protected\/computing.php/, /account_closing/, /auth group/i, /access IRIS/, /computing account/i, /email-alias-request@reed.edu/];
exports.noReedAccountsRegexList = [];
exports.softwareRegexList = [/1password/i, /one-password/i, /onepassword/i, /OS update/i, /OS upgrade/i, /kernel/i, /adobe/i, /acrobat/i, /photoshop/i, /creative cloud/i, /premiere pro/i, /lightroom/i, /indesign/i, /CS6/, /dreamweaver/i, /premiere rush/i, /code42/i, /crash/i, /Upgrade NOT Recommended/, /Monterey/i, /RStudio/i, /mathematica/i, /wolfram/i, /medicat/i, /big sur/i, /catalina/i, /mojave/i, /high sierra/i, /operating system/i, /\bvlc\b/i, /quicktime/i, /zotero/i, /latex/i, /stata/i, /filemaker/i, /vmware/i, /software update/i, /software upgrade/i, /uninstall/i]; //removed /\bdriver\b/i
exports.noSoftwareRegexList = [];
exports.thesisRegexList = [/thesis/i]; //[/thesis format/i, /thesis template/i, /thesis word template/i, /r template/i]
exports.noThesisRegexList = [/vpn/i];
exports.twoFactorRegexList = [/duo/i, /twostep/i, /two-step/i, /hardware token/i];
exports.noTwoFactorRegexList = [];
exports.nameChangeRegexList = [/name change/i, /change name/i];
exports.noNameChangeRegexList = [];
exports.virusMalwareRegexList = [/falcon/i, /crowdstrike/i, /virus/i, /malware/i, /malicious/i, /trojan/i];
exports.noVirusMalwareRegexList = [/Security Updates for Reed Computers/];
exports.noTagRegexList = [/Events & Programs Newsletter for Reed Students/, /To:(.*)faculty@reed.edu/, /To:(.*)staff@reed.edu/, /Dorkbot Monthly/, /Banner Database Outage/, /To:(.*)enrolled@reed.edu/, /reed-community@reed.edu/];
exports.noNoTagRegexList = [];
