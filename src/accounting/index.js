const readline = require('readline-sync');

class DataProgram {
  constructor(initialBalance = 1000.0) {
    this.storageBalance = initialBalance;
  }

  read() {
    return this.storageBalance;
  }

  write(newBalance) {
    this.storageBalance = newBalance;
    return this.storageBalance;
  }
}

class Operations {
  constructor(dataProgram) {
    this.dataProgram = dataProgram;
  }

  total() {
    const balance = this.dataProgram.read();
    return { success: true, balance, message: `Current balance: ${balance.toFixed(2)}` };
  }

  credit(amount) {
    let balance = this.dataProgram.read();
    balance += amount;
    this.dataProgram.write(balance);
    return { success: true, balance, message: `Amount credited. New balance: ${balance.toFixed(2)}` };
  }

  debit(amount) {
    let balance = this.dataProgram.read();
    if (balance >= amount) {
      balance -= amount;
      this.dataProgram.write(balance);
      return { success: true, balance, message: `Amount debited. New balance: ${balance.toFixed(2)}` };
    } else {
      return { success: false, balance, message: 'Insufficient funds for this debit.' };
    }
  }
}

class MainProgram {
  constructor() {
    this.data = new DataProgram();
    this.ops = new Operations(this.data);
  }

  run() {
    let continueFlag = true;
    while (continueFlag) {
      console.log('--------------------------------');
      console.log('Account Management System');
      console.log('1. View Balance');
      console.log('2. Credit Account');
      console.log('3. Debit Account');
      console.log('4. Exit');
      console.log('--------------------------------');
      const choice = readline.question('Enter your choice (1-4): ');
      switch (choice) {
        case '1':
          console.log(this.ops.total().message);
          break;
        case '2': {
          const amtStr = readline.question('Enter credit amount: ');
          const amt = parseFloat(amtStr);
          console.log(this.ops.credit(amt).message);
          break;
        }
        case '3': {
          const amtStr = readline.question('Enter debit amount: ');
          const amt = parseFloat(amtStr);
          const res = this.ops.debit(amt);
          console.log(res.message);
          break;
        }
        case '4':
          continueFlag = false;
          break;
        default:
          console.log('Invalid choice, please select 1-4.');
      }
    }
    console.log('Exiting the program. Goodbye!');
  }
}

// if run directly
if (require.main === module) {
  const app = new MainProgram();
  app.run();
}

module.exports = { DataProgram, Operations, MainProgram };
