# Microsoft Style Guide Markdown Linter

A command-line tool to lint Markdown files for compliance with the
[Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome-to-the-style-guide/).

## Installation

```bash
bash
npm install -g msstylelint
```

## Usage

```bash
bash
msstylelint [options] <path>
```

### Options

- `--fix`: Automatically fix issues where possible
- `--config <path>`: Use specified configuration file
- `--format <format>`: Output format (stylish, json), default: `stylish`
- `--quiet`: Report errors only

## Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm test` to run tests
4. Run `npm run lint` to lint the code

### Steps to add and test a rule

Let's go through creating a new rule: disallow "....." (five periods in a row)
in the text.

### Structure of Tests

- Tests are located in the `test/` directory.
- We use [Mocha](https://mochajs.org/) as the test framework and
  [Chai](https://www.chaijs.com/) for assertions.
- Test files should be named with the `.test.js` extension.

1. Create a Test File

   - If you're adding tests for existing rules, modify the corresponding
     `.test.js` file.
   - For new rules, create a new test file in the `test/` directory, e.g.,
     `test/your-rule.test.js`.

2. Write the Test Cases

   - Import the necessary modules:

     ```javascript:test/sequence-of-periods.test.js
     import { expect } from 'chai';
     import { remark } from 'remark';
     import sequenceOfPeriodsRule from '../src/rules/sequence-of-periods.js';
     ```

   - Define a helper function to run the linter with your rule:

     ```javascript:test/sequence-of-periods.test.js
     function lint(markdown, rule) {
       const processor = remark().use(rule);
       const result = processor.processSync(markdown);
       return result.messages;
     }
     ```

   - Write test cases using `describe` and `it` blocks:

     ```javascript:test/sequence-of-periods.test.js
     describe('Sequence of Periods Rule', () => {
       it('should detect a sequence of five periods', () => {
         const markdown = 'This is an ellipsis..... in text.';
         const messages = lint(markdown, sequenceOfPeriodsRule);
         expect(messages).to.have.lengthOf(1);
         expect(messages[0].reason).to.include('Avoid using a sequence of five periods');
       });

       it('should not detect sequences shorter than five periods', () => {
         const markdown = 'This is an ellipsis... in text.';
         const messages = lint(markdown, sequenceOfPeriodsRule);
         expect(messages).to.have.lengthOf(0);
       });
     });
     ```

3. Implement the Rule

   - Add your new rule in the `src/rules/` directory, e.g., `src/rules/sequence-of-periods.js`.

     ```javascript:src/rules/sequence-of-periods.js
     import { visit } from 'unist-util-visit';

     export default function sequenceOfPeriodsRule() {
       return function transformer(tree, file) {
         visit(tree, 'text', (node) => {
           if (node.value.includes('.....')) {
             file.message('Avoid using a sequence of five periods (.....)', node);
           }
         });
       };
     }
     ```

   - Register the rule in `src/rules/index.js`:

     ```javascript:src/rules/index.js
     import avoidPlease from './avoid-please.js';
     import sentenceCaseHeadings from './sentence-case-headings.js';
     import useActiveVoice from './use-active-voice.js';
     import sequenceOfPeriodsRule from './sequence-of-periods.js';

     export default [
       avoidPlease,
       sentenceCaseHeadings,
       useActiveVoice,
       sequenceOfPeriodsRule,
     ];
     ```

### Tips for Writing Tests

- **Be Specific:** Write test cases that cover both positive and negative scenarios.
- **Follow the Style Guide:** Ensure your code adheres to the project's coding
  standards. ESLint configuration is available for your use, apply it.
- **Run Tests Frequently:** Test your code often to catch issues early.
- **Document Your Code:** Include comments where necessary to explain complex logic.

## License

This project is licensed under the MIT License.