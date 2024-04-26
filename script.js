// List of student names
const studentNames = {
    1: "ADITYA J R",
    2: "AKASH V",
    3: "ANUSUYA P B",
    4: "ASHIQ S",
    5: "BHARATH R A",
    6: "DEEPADHARSHAN B",
    7: "DEEPAK KUMAR G S",
    8: "DEVAVARNINI V M",
    9: "DHINAKAR S",
    10: "DHIVISHA S",
    11: "DINESH S J",
    12: "DIVAKAR Y N",
    13: "DIVYA P",
    14: "ELAKKIYA M",
    15: "ELANKAVI M",
    16: "GIRI R",
    17: "GOKUL KANNA V",
    18: "HARIHARAN V",
    19: "HARINI SRI S L",
    20: "HARITHA O",
    21: "HASHINI M",
    22: "JAGADESH R",
    23: "JANANI T",
    24: "KAMESH J",
    25: "KANIKA S",
    26: "KATHIRAVAN M M",
    27: "KAVIN RAJ N",
    28: "KAVINRAJ VENKATACHALAM",
    29: "KEERTHI R",
    30: "KIRUTHIKA V",
    31: "KISHORE R",
    32: "KOWSIKA R",
    33: "KRISHNAVENISREE D",
    34: "MADHUMITA R",
    35: "MADHUMITHAA R S",
    36: "MALINI P",
    37: "MONICA D",
    38: "MOULEESWARAN G",
    39: "NOWFIYA S",
    40: "PARVESSHRAJH S",
    41: "POORNITHA E R",
    42: "PRAKASH B",
    43: "PRASANNA C",
    44: "PREETHI K",
    45: "RAHAVA PRASANNA SA",
    46: "RAKESH E",
    47: "RAMPRASANTH S",
    48: "SAKTHI S",
    49: "SAMYUKTHA SRI H M",
    50: "SHANMUGA SUNDARAM S",
    51: "SHOBANA B",
    52: "SUBRAMANIYA BHARATHI S",
    53: "SUJIT KUMAR K",
    54: "THANGA KUMARAN R",
    55: "THARUN R",
    56: "THARUN RAJ E",
    57: "VARUNPRASAD V",
    58: "VIMALRAJ P",
    59: "YUVAN SHANKAR M"
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
    Late = indices.filter;
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
Class: III- B.Tech (CSBS)
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
