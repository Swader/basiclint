import { visit } from 'unist-util-visit';

function isSentenceCase(text) {
  return text === text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default function sentenceCaseHeadings() {
  return function transformer(tree, file) {
    visit(tree, 'heading', (node) => {
      if (node.children && node.children[0] && node.children[0].type === 'text') {
        const headingText = node.children[0].value;
        if (!isSentenceCase(headingText)) {
          file.message('Use sentence case for headings', node);
        }
      }
    });
  };
};