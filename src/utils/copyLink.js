// fonte https://www.30secondsofcode.org/articles/s/copy-text-to-clipboard-with-javascript
const copyToClipboard = (str) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str);
  }
};

export default copyToClipboard;
