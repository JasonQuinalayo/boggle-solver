const getDictionary = async () => {
  const fetchDict1 = await fetch('./wordlist/sigword.list.txt');
  const fetchDict2 = await fetch('./wordlist/word.list.txt');
  const dict1 = await fetchDict1.text();
  const dict2 = await fetchDict2.text();
  const dictionary = (dict1.split('\n')).concat(dict2.split('\n'));
  return dictionary;
};

export default getDictionary;
