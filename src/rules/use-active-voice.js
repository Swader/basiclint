import { visit } from 'unist-util-visit';
import { retext } from 'retext';
import retextEnglish from 'retext-english';
import retextPassive from 'retext-passive';

export default function useActiveVoice() {
  return function transformer(tree, file) {
    visit(tree, 'paragraph', (node) => {
      const text = node.children.map(child => child.value).join('');
      
      retext()
        .use(retextEnglish)
        .use(retextPassive)
        .process(text)
        .then((result) => {
          if (result.messages.length > 0) {
            file.message('Use active voice instead of passive voice', node);
          }
        });
    });
  };
};