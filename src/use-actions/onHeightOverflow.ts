// Checks to see if all content in an element is all visible or hidden because of Overflow.
// If the content is hidden, the callback function will be executed.
// Note that if the element contains image elements or parts that are not immediately available, the height of the element will be miscalculated..
const onHeightOverflow = (node: HTMLElement, callback: () => void) => {
  if (node && node.clientHeight + 2 < node.scrollHeight) {
    callback();
  }
};

export default onHeightOverflow;
