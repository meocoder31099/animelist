// Type
type updateStickyOptions = {
  scrollDirection: number;
  distanceHeight: number;
};

type onStickySidebarOptions = {
  topSpacing?: string;
  bottomSpacing?: string;
};

const onStickySidebar = (
  node: HTMLElement,
  { topSpacing = "0px", bottomSpacing = "0px" }: onStickySidebarOptions = {}
) => {
  if (!node) return;

  let viewportHeight: number = window.innerHeight;
  let stickySidebarHeight: number = 0;
  let lastScrollPosition: number = window.pageYOffset || window.scrollY;
  // Value 0 is scrolling up and 1 is scrolling down.
  let scrollDirection: 0 | 1 = 1;
  let distanceHeight: number = 0;
  // Create divForMarginTop.
  const divForMarginTop = document.createElement("div");

  // Add divForMarginTop to DOM.
  node.parentNode?.insertBefore(divForMarginTop, node);
  node.style.position = "sticky";

  const detectScrollDirection = (): void => {
    const currentScrollPosition = window.pageYOffset || window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
      // Scrolling down.
      if (scrollDirection !== 1) {
        scrollDirection = 1;
        updateSticky({
          scrollDirection,
          distanceHeight,
        });
      }
    } else if (currentScrollPosition < lastScrollPosition) {
      // Scrolling up.
      if (scrollDirection !== 0) {
        scrollDirection = 0;
        updateSticky({
          scrollDirection,
          distanceHeight,
        });
      }
    }

    lastScrollPosition = currentScrollPosition;
  };
  window.addEventListener("scroll", detectScrollDirection);

  const updateSticky = ({
    scrollDirection,
    distanceHeight,
  }: updateStickyOptions) => {
    const { top } = node.getBoundingClientRect();
    if (scrollDirection) {
      // Scolling down.
      node.style.top = `${distanceHeight}px`;
      node.style.removeProperty("bottom");
      divForMarginTop.style.marginTop = `calc(${
        (window.pageYOffset || window.scrollY) + top
      }px - ${topSpacing})`;
      // sidebar.style.marginTop = `${distanceHeight}px`;
    } else {
      // Scolling up.
      node.style.bottom = `calc(${distanceHeight}px - ${topSpacing})`;
      node.style.removeProperty("top");
      divForMarginTop.style.marginTop = `calc(${
        (window.pageYOffset || window.scrollY) + top
      }px - ${topSpacing})`;
    }
  };

  const handleWindowResize = (): void => {
    const currentWindowHeight = window.innerHeight;

    if (currentWindowHeight !== viewportHeight) {
      // Cập nhật giá trị lastWindowHeight
      viewportHeight = currentWindowHeight;
      // Cập nhật giá trị distanceHeight với giá trị mới của viewportHeight.
      distanceHeight = Math.ceil(viewportHeight - stickySidebarHeight);
      // Cập nhật lại sticky.
      updateSticky({
        scrollDirection,
        distanceHeight,
      });
    }
  };

  // Đăng ký trình xử lý sự kiện 'resize'
  window.addEventListener("resize", handleWindowResize);

  const handleStickyResize = (entries: ResizeObserverEntry[]): void => {
    for (let entry of entries) {
      if (!node) return;
      const { height } = entry.contentRect;
      stickySidebarHeight = height;
      distanceHeight = Math.ceil(viewportHeight - stickySidebarHeight);
      updateSticky({
        scrollDirection,
        distanceHeight,
      });
    }
  };

  const observer = new ResizeObserver(handleStickyResize);
  observer.observe(node);

  const handleFullscreenChange = (): void => {
    console.log("full");
    updateSticky({
      scrollDirection,
      distanceHeight,
    });
  };

  return {
    destroy() {
      window.removeEventListener("scroll", detectScrollDirection);
      window.removeEventListener("resize", handleWindowResize);
      observer.unobserve(node);
      observer.disconnect();
      divForMarginTop.parentNode?.removeChild(divForMarginTop);
    },
  };
};

export default onStickySidebar;
