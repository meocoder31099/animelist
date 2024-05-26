interface ClickOutsideAction {
  destroy: () => void;
}

const onClickOutside = (
  node: HTMLElement,
  callback: () => void
): ClickOutsideAction => {
  function handleClick(event: MouseEvent) {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented
    ) {
      callback();
    }
  }
  setTimeout(() => {document.addEventListener("click", handleClick)}, 300)

  return {
    destroy() {
      document.removeEventListener("click", handleClick);
    },
  };
};

export default onClickOutside;
