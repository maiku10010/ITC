

let employees = [];
let employeeIdCounter = 1;


document.getElementById("employeeForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const daysWorked = parseInt(document.getElementById("daysworked").value);
    const dailyRate = parseFloat(document.getElementById("dailyrate").value);
    const deduction = parseFloat(document.getElementById("deduction").value);

 
    if (!name || isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deduction)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const grossPay = daysWorked * dailyRate;
    const netPay = grossPay - deduction;

    employees.push({
        id: employeeIdCounter++,
        name,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay,
    });

    updateTable();
    this.reset(); 
});


function updateTable() {
    const tbody = document.getElementById("tablebody");
    tbody.innerHTML = ""; 

    let totalGrossPay = 0;
    let totalDeduction = 0;
    let totalNetPay = 0;

    employees.forEach((employee) => {
        totalGrossPay += employee.grossPay;
        totalDeduction += employee.deduction;
        totalNetPay += employee.netPay;

        const row = `<tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.daysWorked}</td>
            <td>${employee.dailyRate.toFixed(2)}</td>
            <td>${employee.grossPay.toFixed(2)}</td>
            <td>${employee.deduction.toFixed(2)}</td>
            <td>${employee.netPay.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    
    document.getElementById("tGrossPay").innerText = totalGrossPay.toFixed(2);
    document.getElementById("tDeduction").innerText = totalDeduction.toFixed(2);
    document.getElementById("tNetPay").innerText = totalNetPay.toFixed(2);
}


document.getElementById("btndeleteall").addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all employees?")) {
        employees = [];
        updateTable();
    }
});
