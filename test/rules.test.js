import { expect } from 'chai';
import { remark } from 'remark';
import avoidPlease from '../src/rules/avoid-please.js';

function lint(markdown, rule) {
  const processor = remark().use(rule);
  const result = processor.processSync(markdown);
  return result.messages;
}

describe('Avoid Please Rule', () => {
  it('should detect "please" in text', () => {
    const markdown = 'Please click the button.';
    const messages = lint(markdown, avoidPlease);
    expect(messages).to.have.lengthOf(1);
    expect(messages[0].reason).to.include('Avoid using "please"');
  });

  it('should not detect "please" when not present', () => {
    const markdown = 'Click the button.';
    const messages = lint(markdown, avoidPlease);
    expect(messages).to.have.lengthOf(0);
  });
});