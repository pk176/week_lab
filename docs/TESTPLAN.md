# Test Plan for COBOL Account Management System

This test plan outlines the test cases for validating the business logic of the COBOL account management application. It covers all key functionalities: viewing balance, crediting accounts, debiting accounts, and handling invalid inputs. The plan is designed to ensure the system behaves correctly and can be used as a blueprint for unit and integration tests in the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|----------------|---------------------|----------|
| TC001 | View initial balance | Application starts with balance 1000.00 | 1. Run the application<br>2. Select option 1 (View Balance) | Displays "Current balance: 1000.00" | TBD | TBD | Verifies initial state |
| TC002 | Credit account with valid amount | Balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount 500.00 | Displays "Amount credited. New balance: 1500.00" | TBD | TBD | Tests positive credit operation |
| TC003 | Debit account with sufficient funds | Balance is 1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter amount 200.00 | Displays "Amount debited. New balance: 1300.00" | TBD | TBD | Tests successful debit |
| TC004 | Debit account with insufficient funds | Balance is 1300.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter amount 2000.00 | Displays "Insufficient funds for this debit." and balance remains 1300.00 | TBD | TBD | Tests fund validation |
| TC005 | Invalid menu choice | Application is running | 1. Enter invalid choice (e.g., 5) | Displays "Invalid choice, please select 1-4." and prompts again | TBD | TBD | Tests input validation |
| TC006 | Exit application | Application is running | 1. Select option 4 (Exit) | Displays "Exiting the program. Goodbye!" and terminates | TBD | TBD | Verifies clean exit |
| TC007 | Multiple credits | Balance is 1300.00 | 1. Select option 2<br>2. Enter 100.00<br>3. Repeat credit with 50.00 | Balance updates to 1450.00 after each credit | TBD | TBD | Tests cumulative credits |
| TC008 | Multiple debits | Balance is 1450.00 | 1. Select option 3<br>2. Enter 100.00<br>3. Repeat debit with 50.00 | Balance updates to 1300.00 after each debit | TBD | TBD | Tests cumulative debits |
| TC009 | View balance after operations | Balance is 1300.00 | 1. Select option 1 | Displays "Current balance: 1300.00" | TBD | TBD | Confirms balance persistence |
| TC010 | Zero amount credit | Balance is 1300.00 | 1. Select option 2<br>2. Enter 0.00 | Balance remains 1300.00, displays new balance | TBD | TBD | Edge case for zero credit |
| TC011 | Zero amount debit | Balance is 1300.00 | 1. Select option 3<br>2. Enter 0.00 | Balance remains 1300.00, displays new balance | TBD | TBD | Edge case for zero debit |
| TC012 | Exact balance debit | Balance is 1300.00 | 1. Select option 3<br>2. Enter 1300.00 | Displays "Amount debited. New balance: 0.00" | TBD | TBD | Tests debiting entire balance |

## Notes
- All balances are in fixed-point format (PIC 9(6)V99).
- The application uses in-memory storage; no persistence across runs.
- Test cases assume sequential execution where noted (e.g., TC003 depends on TC002).
- For Node.js transformation, these test cases can be converted to unit tests using a testing framework like Jest.</content>
<parameter name="filePath">/workspaces/week_lab/docs/TESTPLAN.md