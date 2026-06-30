// List of student names
const studentNames = {
    1: "AATHMIKA  P S",
    2: "AKHILESH  R",
    3: "AKSHAYAN  R",
    4: "BARANI SRI  S",
    5: "BHARATHRAJ  B V",
    6: "CHARAN  G S",
    7: "DEEPAK  V",
    8: "DHAKSHA  S",
    9: "DHANUSH KARAN  M",
    10: "DHARSHINI  O",
    11: "DHARSHINI  S",
    12: "DINESH  S M G",
    13: "GAYATHRI  M",
    14: "HARIKRISHNA  V S",
    15: "HARINI  M",
    16: "JAGADHEEP  M",
    17: "KARTHIKEYAN  J",
    18: "KAVIPRIYA  K",
    19: "KAVIYARASI  D",
    20: "KIRUTHICK  S",
    21: "KIRUTHIGA  M S",
    22: "KRITHIGA  I G",
    23: "MADHUMITHA  R",
    24: "MAGINAV  M",
    25: "MEYYARASAN  M",
    26: "MIRUTHALA  M K",
    27: "MUZIBUR RAHMAN  F",
    28: "MYTHREYAN  M",
    29: "NEELAKSHI  K",
    30: "NIDHEESH  S",
    31: "NISHANTH  G",
    32: "NITHEESH  C",
    33: "OBUVARSHINI  O",
    34: "OVIYAPRIYA  K",
    35: "PRAVEEN KUMAR  S",
    36: "PREETHI  S",
    37: "PRIYADHARSHINI  M",
    38: "RAMAKRISHNAN  R S",
    39: "RENUKA  S",
    40: "RITHIKA  C",
    41: "SAIRADHA  V",
    42: "SANTHOSH  B",
    43: "SANTHOSH  C",
    44: "SANTHOSH  S",
    45: "SARATHY  M",
    46: "SENTHIL KUMAR  K",
    47: "SHARMILA  S",
    48: "SIBIKA  K S",
    49: "SIVAPERUMAL  B",
    50: "SONALI  D",
    51: "SREE KAVI  A",
    52: "SRI YOGESHWAR  K",
    53: "SRINITHI  M",
    54: "SUDHARSAN  K",
    55: "SUDHARSAN  S M",
    56: "SURESHKRISHNA  B",
    57: "SUVETHA  T K",
    58: "SWETHA  S",
    59: "THENNARASAN  P",
    60: "VAISHNAVI  S",
    61: "VARSHA  R S",
    62: "VIGASS  M",
    63: "VIMALMUKESH  M"
};
let leave = [];
let onDuty = [];
let Late = [];
len=Object.keys(studentNames).length
function recordAttendance(type) {
    if (type === "Leave") {
        document.getElementById("leave-input").style.display = "block";
        document.getElementById("on-duty-input").style.display = "none";
        document.getElementById("LateComers-input").style.display = "none";
    } else if (type === "On-duty") {
        document.getElementById("on-duty-input").style.display = "block";
        document.getElementById("leave-input").style.display = "none";
        document.getElementById("LateComers-input").style.display = "none";
    } else if (type === "LateComers") {
        document.getElementById("LateComers-input").style.display = "block";
        document.getElementById("on-duty-input").style.display = "none";
        document.getElementById("leave-input").style.display = "none";
    }
    
    updateMessage(`Recording ${type}...`);
}

function recordLeave() {
    const input = document.getElementById("leave-input-field").value;
    const indices = input.split(" ").map(Number);
    leave = indices;
    updateMessage(`Leave recorded for indices: ${leave.join(", ")}`);
    document.getElementById("leave-input").style.display = "none";
}

function recordOnDuty() {
    const input = document.getElementById("on-duty-input-field").value;
    const indices = input.split(" ").map(Number);
    onDuty = indices;
    updateMessage(`On Duty recorded for indices: ${onDuty.join(", ")}`);
    document.getElementById("on-duty-input").style.display = "none";  
}

function recordLateComers() {
    const input = document.getElementById("LateComers-input-field").value;
    const indices = input.split(" ").map(Number);
    Late = indices;
    updateMessage(`Late Comers recorded for indices: ${Late.join(", ")}`);
    document.getElementById("LateComers-input").style.display = "none";
}

function printAttendance() {
    const presentCount = len- leave.length;
    const absentCount = leave.length;
    const attendancePercentage = (presentCount / len) * 100;

    const now = new Date();
    let greeting = "Good Morning";
    if (now.getHours() >= 12) {
        greeting = "Good Afternoon";
    }

    let report = `
${greeting} Sir, Today's Attendance

Date: ${now.toLocaleDateString()}
Class: II- B.Tech (CSBS)
Total Strength: ${len}
No. of Present: ${presentCount}
No. of Absent: ${absentCount}

`
if(leave.length>=1)
{
report+="\nAbsentees\n";

    for (let i = 0; i < leave.length; i++) {
        const index = leave[i];
        report += `\t${i + 1}. ${studentNames[index]}\n`;
    }
}
    if(onDuty.length>=1)
    {
    report += "\nOn-duty Students:\n";
    for (let i = 0; i < onDuty.length; i++) {
        const index = onDuty[i];
        report += `\t${i + 1}. ${studentNames[index]}\n`;
    }}
    if(Late.length>=1)
    {
    report += "\nLate Comers:\n";
    for (let i = 0; i < Late.length; i++) {
        const index = Late[i];
        report += `\t${i + 1}. ${studentNames[index]}\n`;
    }
}
    report += `
Percentage: ${attendancePercentage.toFixed(2)}%

Thank you Sir.`;

    document.getElementById("attendance-report").innerText = report;
}


function updateMessage(message) {
    document.getElementById("message").innerText = message;
}

function copyReport() {
    const reportText = document.getElementById("attendance-report").innerText;
    navigator.clipboard.writeText(reportText);
    alert("Attendance report copied to clipboard!");
}

function shareOnWhatsApp() {
    const reportText = document.getElementById("attendance-report").innerText;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(reportText)}`;
    window.open(whatsappURL, "_blank");
}

function toggleHelp() {
    const helpText = document.getElementById("help-text");
    const leaveInput = document.getElementById("leave-input");
    const onDutyInput = document.getElementById("on-duty-input");
    const LateComersInput = document.getElementById("LateComers-input");

    if (helpText.style.display === "none") {
        helpText.style.display = "block";
        leaveInput.style.display = "none";
        onDutyInput.style.display = "none";
        LateComersInput.style.display = "none";
    } else {
        helpText.style.display = "none";
    }
}
