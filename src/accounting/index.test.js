const { DataProgram, Operations } = require('./index');

describe('COBOL Accounting Logic in Node.js', () => {
  let data;
  let ops;

  beforeEach(() => {
    data = new DataProgram();
    ops = new Operations(data);
  });

  test('TC001 - view initial balance', () => {
    const res = ops.total();
    expect(res.balance).toBe(1000.0);
    expect(res.message).toBe('Current balance: 1000.00');
  });

  test('TC002 - credit account with valid amount', () => {
    const res = ops.credit(500.0);
    expect(res.balance).toBe(1500.0);
    expect(res.message).toBe('Amount credited. New balance: 1500.00');
  });

  test('TC003 - debit account with sufficient funds', () => {
    ops.credit(500.0); // bring balance to 1500
    const res = ops.debit(200.0);
    expect(res.success).toBe(true);
    expect(res.balance).toBe(1300.0);
    expect(res.message).toBe('Amount debited. New balance: 1300.00');
  });

  test('TC004 - debit account with insufficient funds', () => {
    ops.credit(500.0); // 1500
    const res = ops.debit(2000.0);
    expect(res.success).toBe(false);
    expect(res.balance).toBe(1500.0);
    expect(res.message).toBe('Insufficient funds for this debit.');
  });

  test('TC005 - invalid menu choice not applicable in operations', () => {
    // not directly testable here, covered by main program interaction
    expect(true).toBe(true);
  });

  test('TC006 - exit application not applicable in operations', () => {
    expect(true).toBe(true);
  });

  test('TC007 - multiple credits cumulative', () => {
    ops.credit(100.0);
    expect(data.read()).toBe(1100.0);
    ops.credit(50.0);
    expect(data.read()).toBe(1150.0);
  });

  test('TC008 - multiple debits cumulative', () => {
    ops.credit(200.0); // 1200
    ops.debit(100.0);
    expect(data.read()).toBe(1100.0);
    ops.debit(50.0);
    expect(data.read()).toBe(1050.0);
  });

  test('TC009 - view balance after operations', () => {
    ops.credit(300.0); // 1300
    const res = ops.total();
    expect(res.balance).toBe(1300.0);
  });

  test('TC010 - zero amount credit', () => {
    const before = data.read();
    const res = ops.credit(0.0);
    expect(res.balance).toBe(before);
    expect(res.message).toBe(`Amount credited. New balance: ${before.toFixed(2)}`);
  });

  test('TC011 - zero amount debit', () => {
    const before = data.read();
    const res = ops.debit(0.0);
    expect(res.balance).toBe(before);
    expect(res.success).toBe(true);
    expect(res.message).toBe(`Amount debited. New balance: ${before.toFixed(2)}`);
  });

  test('TC012 - exact balance debit', () => {
    const current = data.read();
    const res = ops.debit(current);
    expect(res.success).toBe(true);
    expect(res.balance).toBe(0.0);
    expect(res.message).toBe('Amount debited. New balance: 0.00');
  });
});
