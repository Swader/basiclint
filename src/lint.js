import fs from 'fs';
import path from 'path';
import pkg from 'glob';
import chalk from 'chalk';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkLint from 'remark-lint';
import rules from './rules/index.js';

const { glob} = pkg;

function getFiles(filePath) {
  if (fs.lstatSync(filePath).isDirectory()) {
    return glob.sync('**/*.md', { cwd: filePath, absolute: true });
  }
  return [path.resolve(filePath)];
}

function lintFile(file, options) { // eslint-disable-line
  // Options is currently unused but can be expanded on later
  const content = fs.readFileSync(file, 'utf-8');
  const processor = unified()
    .use(remarkParse)
    .use(remarkLint)
    .use(rules)
    .use(remarkStringify);

  const result = processor.processSync(content);
  return { file, messages: result.messages };
}

function lintFiles(filePath, options) {
  const files = getFiles(filePath);
  const results = files.map(file => lintFile(file, options));
  reportResults(results, options);
  return results;
}

function reportResults(results, options) {
  if (Object.keys(options).length > 0) {
    console.log('Options:', JSON.stringify(options, null, 2));
  }
  results.forEach(result => {
    console.log(chalk.underline(result.file));
    result.messages.forEach(message => {
      const severity = message.fatal ? 'error' : 'warning';
      const color = severity === 'error' ? chalk.red : chalk.yellow;
      console.log(
        `  ${color(severity)} ${message.line}:${message.column} - ${message.reason}`
      );
    });
    console.log();
  });
}

export default lintFiles;