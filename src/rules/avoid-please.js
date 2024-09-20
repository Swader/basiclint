import { visit } from 'unist-util-visit';

export default function avoidPlease() {
  return function transformer(tree, file) {
    visit(tree, 'text', (node) => {
      if (node.value.toLowerCase().includes('please')) {
        file.message('Avoid using "please" in technical documentation', node);
      }
    });
  };
};