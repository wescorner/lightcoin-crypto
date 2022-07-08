class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (const t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.amount <= this.account.balance;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Deposit(120.0, myAccount);
console.log(t1.commit());
console.log("Transaction 1:", t1);

t2 = new Withdrawal(50.25, myAccount);
console.log(t2.commit());
console.log("Transaction 2:", t2);

t3 = new Withdrawal(100, myAccount);
console.log(t3.commit());
console.log("Transaction 3:", t3);

console.log("Balance:", myAccount.balance);
