import { expect } from 'chai';
import path from 'path';
import lintFiles from '../src/lint.js';

const __dirname = path.resolve("./test/");

describe('lintFiles', () => {

  it('should lint a single valid file without errors', () => {
    const filePath = path.resolve(__dirname, 'fixtures/single-file/valid.md');
    const results = lintFiles(filePath, {});

    expect(results).to.be.an('array').with.lengthOf(1);
    expect(results[0].messages).to.have.lengthOf(0);
  });

  it('should lint a single invalid file and report errors', () => {
    const filePath = path.resolve(__dirname, 'fixtures/single-file/invalid.md');
    const results = lintFiles(filePath, {});

    expect(results).to.be.an('array').with.lengthOf(1);
    expect(results[0].messages).to.have.length.above(0);
    // Additional assertions about specific messages can be added here
  });

  it('should lint multiple files and report errors appropriately', () => {
    const dirPath = path.resolve(__dirname, 'fixtures/multiple-files');
    const results = lintFiles(dirPath, {});

    expect(results).to.be.an('array').with.lengthOf(3);
    // Additional assertions for each file can be added here
  });

});