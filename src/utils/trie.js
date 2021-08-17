function Trie() {
  const children = [];
  for (let i = 0; i < 26; i += 1) {
    children[i] = null;
  }
  this.children = children;
  this.score = 0;
}

Trie.prototype.addWord = function add(word, index, score) {
  if (index === word.length) {
    this.score = score;
    return;
  }
  const childIndex = word.charCodeAt(index) - 97;
  let node = this.children[childIndex];
  if (node == null) {
    node = new Trie();
    this.children[childIndex] = node;
  }
  node.addWord(word, index + 1, score);
};

Trie.prototype.print = function print(stringArray) {
  // eslint-disable-next-line no-console
  if (this.end === true) console.log(stringArray.join(''));
  for (let i = 0; i < 26; i += 1) {
    if (this.children[i]) {
      stringArray.push(String.fromCharCode(97 + i));
      this.children[i].print(stringArray);
      stringArray.splice(stringArray.length - 1);
    }
  }
};

Trie.prototype.printAll = function printAll() {
  const stringArray = [];
  this.print(stringArray);
};

export default Trie;
