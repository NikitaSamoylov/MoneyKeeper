const startBtn = document.querySelector('#start');
const budgetValue = document.querySelector('.budget-value');
const dayBudgetValue = document.querySelector('.daybudget-value');
const levelValue = document.querySelector('.level-value');
const expensesValue = document.querySelector('.expenses-value');
const optExpensesValue = document.querySelector('.optionalexpenses-value');
const incomeValue = document.querySelector('.income-value');
const monthSavingsValue = document.querySelector('.monthsavings-value');
const yearSavingsValue = document.querySelector('.yearsavings-value');
const expensesItemField = document.querySelectorAll('.expenses-item');
const expensesItemBtn = document.querySelector('.expenses-item-btn');
const optExpensesBtn = document.querySelector('.optionalexpenses-btn');
const countBudgetBtn = document.querySelector('.count-budget-btn');
const optExpensesItem = document.querySelectorAll('.optionalexpenses-item');
const optExpenses = document.querySelector('.optionalexpenses');
const chooseIncome= document.querySelector('.choose-income');
const savingsCheckbox = document.querySelector('#savings');
const chooseSum = document.querySelector('.choose-sum');
const choosePercent = document.querySelector('.choose-percent');
const yearValue = document.querySelector('.year-value');
const monthValue = document.querySelector('.month-value');
const dayValue = document.querySelector('.day-value');


let money, time;

startBtn.addEventListener('click', function() {
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    };
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

});

expensesItemBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItemField.length; i++) {
        let a = expensesItemField[i].value;
            b = expensesItemField[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
            expensesValue.textContent = sum;
        } else {
            i--;
        }
    }
});

optExpensesBtn.addEventListener('click', () => {
    for (let i = 0; i < optExpensesItem.length; i++) {
		let opt = optExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

countBudgetBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayBudgetValue.textContent = 'Сначала нужно написать бюджет!';
    }
});

chooseIncome.addEventListener('change', function() {
    
    let items = chooseIncome.value;
        appData.income = items.split(", ");
        incomeValue.textContent = appData.income;

});

savingsCheckbox.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings === true) {
        let sum = +chooseSum.value;
        let percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
choosePercent.addEventListener('input', function() {
    if (appData.savings === true) {
        let sum = +chooseSum.value;
        let percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
    
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};
