// List of student names
const studentNames = [ "ADITYA J R", "AKASH V", "ANUSUYA P B", "ASHIQ S", "BHARATH R A", "DEEPADHARSHAN B", "DEEPAK KUMAR G S", "DEVAVARNINI V M", "DHINAKAR S", "DHIVISHA S", "DINESH S J", "DIVAKAR Y N", "DIVYA P", "ELAKKIYA M", "ELANKAVI M", "GIRI R", "GOKUL KANNA V", "HARIHARAN V", "HARINI SRI S L", "HARITHA O", "HASHINI M", "JAGADESH R", "JANANI T", "KAMESH J", "KANIKA S", "KATHIRAVAN M M", "KAVIN RAJ N", "KAVINRAJ VENKATACHALAM", "KEERTHI R", "KIRUTHIKA V", "KISHORE R", "KOWSIKA R", "KRISHNAVENISREE D", "MADHUMITA R", "MADHUMITHAA R S", "MALINI P", "MONICA D", "MOULEESWARAN G", "NOWFIYA S", "PARVESSHRAJH S", "POORNITHA E R", "PRAKASH B", "PRASANNA C", "PREETHI K", "RAHAVA PRASANNA SA", "RAKESH E", "RAMPRASANTH S", "SAKTHI S", "SAMYUKTHA SRI H M", "SHANMUGA SUNDARAM S", "SHOBANA B", "SUBRAMANIYA BHARATHI S", "SUJIT KUMAR K", "THANGA KUMARAN R", "THARUN R", "THARUN RAJ E", "VARUNPRASAD V", "VIMALRAJ P", "YUVAN SHANKAR M" ];
let leave = [];
let onDuty = [];

function recordAttendance(type) {
    if (type === "Leave") {
        document.getElementById("leave-input").style.display = "block";
        document.getElementById("on-duty-input").style.display = "none";
    } else if (type === "On-duty") {
        document.getElementById("on-duty-input").style.display = "block";
        document.getElementById("leave-input").style.display = "none";
    }
    updateMessage(`Recording ${type}...`);
}

function recordLeave() {
    const input = document.getElementById("leave-input-field").value;
    const indices = input.split(" ").map(Number);
    leave = indices.filter(index => index >= 0 && index < studentNames.length);
    updateMessage(`Leave recorded for indices: ${leave.join(", ")}`);
    document.getElementById("leave-input").style.display = "none";
     // Call printAttendance after updating leave
}

function recordOnDuty() {
    const input = document.getElementById("on-duty-input-field").value;
    const indices = input.split(" ").map(Number);
    onDuty = indices.filter(index => index >= 0 && index < studentNames.length);
    updateMessage(`On Duty recorded for indices: ${onDuty.join(", ")}`);
    document.getElementById("on-duty-input").style.display = "none";  
}

function printAttendance() {
    const presentCount = studentNames.length-1 - leave.length;
    const absentCount = leave.length;
    const attendancePercentage = (presentCount / (studentNames.length-1)) * 100;

    let report = `
Good Morning Sir, Today's Attendance

Date: ${new Date().toLocaleDateString()}
Class: I- B.Tech (CSBS)
Total Strength: ${studentNames.length-1}
No. of Present: ${presentCount}
No. of Absent: ${absentCount}

Absentees:
`;
    for (let i = 0; i < leave.length; i++) {
        const index = leave[i];
        report += `\t${i + 1}. ${studentNames[index]}\n`;
    }
    report += "\nOn-duty Students:\n";
    for (let i = 0; i < onDuty.length; i++) {
        const index = onDuty[i];
        report += `\t${i + 1}. ${studentNames[index]}\n`;
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
