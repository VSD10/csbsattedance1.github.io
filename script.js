// List of student names
const studentNames = [ "demo","ADITYA J R", "AKASH V", "ANUSUYA P B", "ASHIQ S", "BHARATH R A", "DEEPADHARSHAN B", "DEEPAK KUMAR G S", "DEVAVARNINI V M", "DHINAKAR S", "DHIVISHA S", "DINESH S J", "DIVAKAR Y N", "DIVYA P", "ELAKKIYA M", "ELANKAVI M", "GIRI R", "GOKUL KANNA V", "HARIHARAN V", "HARINI SRI S L", "HARITHA O", "HASHINI M", "JAGADESH R", "JANANI T", "KAMESH J", "KANIKA S", "KATHIRAVAN M M", "KAVIN RAJ N", "KAVINRAJ VENKATACHALAM", "KEERTHI R", "KIRUTHIKA V", "KISHORE R", "KOWSIKA R", "KRISHNAVENISREE D", "MADHUMITA R", "MADHUMITHAA R S", "MALINI P", "MONICA D", "MOULEESWARAN G", "NOWFIYA S", "PARVESSHRAJH S", "POORNITHA E R", "PRAKASH B", "PRASANNA C", "PREETHI K", "RAHAVA PRASANNA SA", "RAKESH E", "RAMPRASANTH S", "SAKTHI S", "SAMYUKTHA SRI H M", "SHANMUGA SUNDARAM S", "SHOBANA B", "SUBRAMANIYA BHARATHI S", "SUJIT KUMAR K", "THANGA KUMARAN R", "THARUN R", "THARUN RAJ E", "VARUNPRASAD V", "VIMALRAJ P", "YUVAN SHANKAR M" ];
let leave = [];
let onDuty = [];

function recordAttendance(type) {
    if (type === "Leave") {
        if (leave.length > 0) {
            updateMessage("You have already entered leave information. Please clear it before entering new information.");
            return;
        }
        document.getElementById("leave-input").style.display = "block";
        document.getElementById("on-duty-input").style.display = "none";
    } else if (type === "On-duty") {
        if (onDuty.length > 0) {
            updateMessage("You have already entered on-duty information. Please clear it before entering new information.");
            return;
        }
        document.getElementById("on-duty-input").style.display = "block";
        document.getElementById("leave-input").style.display = "none";
    }
    updateMessage(`Recording ${type}...`);
}

function recordLeave() {
    const input = document.getElementById("leave-input-field").value;
    const indices = input.split(" ").map(Number);
    leave = indices.filter(index => index >= 0 && index < studentNames.length && !onDuty.includes(index));
    updateMessage(`Leave recorded for indices: ${leave.join(", ")}`);
    document.getElementById("leave-input").style.display = "none";
    // Call printAttendance after updating leave
}

function recordOnDuty() {
    const input = document.getElementById("on-duty-input-field").value;
    const indices = input.split(" ").map(Number);
    onDuty = indices.filter(index => index >= 0 && index < studentNames.length && !leave.includes(index));
    updateMessage(`On Duty recorded for indices: ${onDuty.join(", ")}`);
    document.getElementById("on-duty-input").style.display = "none";
}
// ... Previous code ...

// Add a function to toggle the help text
function toggleHelp() {
    const helpText = document.getElementById("help-text");
    const leaveInput = document.getElementById("leave-input");
    const onDutyInput = document.getElementById("on-duty-input");
  
    if (helpText.style.display === "none") {
      helpText.style.display = "block";
      leaveInput.style.display = "none";
      onDutyInput.style.display = "none";
    } else {
      helpText.style.display = "none";
    }
  }
  
  // ... Previous code ...
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
        report += `\t${i+ 1}. ${studentNames[index]}\n`;
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

// Add a function to check if the input is valid
function isValidInput(input, type) {
    const indices = input.split(" ").map(Number);
    const uniqueIndices = new Set(indices);
    if (type === "Leave") {
        return indices.length === uniqueIndices.size && indices.every(index => index >= 0 && index < studentNames.length && !onDuty.includes(index));
    } else if (type === "On-duty") {
        return indices.length === uniqueIndices.size && indices.every(index => index >= 0 && index < studentNames.length && !leave.includes(index));
    }
}

// Add a function to display an error message if the input is invalid
function showErrorMessage(input, type) {
    let message = "";
    if (input.length === 0) {
        message = "Please enter a valid input.";
    } else if (!isValidInput(input, type)) {
        message = "The input contains invalid indices. Please re-enter the input.";
    } else if (input.split(" ").length > studentNames.length) {
        message = "The number of indices exceeds the total number of students. Please re-enter the input.";
    }
    updateMessage(message);
}

// Modify the recordLeave and recordOnDuty functions to check for valid input
function recordLeave() {
    const input = document.getElementById("leave-input-field").value;
    if (isValidInput(input, "Leave")) {
        leave = input.split(" ").map(Number);
        updateMessage(`Leave recorded for indices: ${leave.join(", ")}`);
        document.getElementById("leave-input").style.display = "none";
        printAttendance();
    } else {
        showErrorMessage(input, "Leave");
    }
}

function recordOnDuty() {
    const input = document.getElementById("on-duty-input-field").value;
    if (isValidInput(input, "On-duty")) {
        onDuty = input.split(" ").map(Number);
        updateMessage(`On Duty recorded for indices: ${onDuty.join(", ")}`);
        document.getElementById("on-duty-input").style.display = "none";
        printAttendance();
    } else {
        showErrorMessage(input, "On-duty");
    }
}// ... Previous code ...


  // ... Previous code ...
