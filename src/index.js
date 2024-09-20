#!/usr/bin/env node

import { program } from 'commander';
import lintFiles from './lint.js';

program
  .name('msstylelint')
  .description('Lint Markdown files for Microsoft Style Guide compliance')
  .version('0.1.0')
  .argument('<path>', 'file or directory to lint')
  .option('--fix', 'automatically fix issues where possible')
  .option('--config <path>', 'use specified configuration file')
  .option('--format <format>', 'output format (stylish, json)', 'stylish')
  .option('--quiet', 'report errors only')
  .action((path, options) => {
    lintFiles(path, options);
  });

program.parse(process.argv);