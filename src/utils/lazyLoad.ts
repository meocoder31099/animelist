export const lazyImage = (img: HTMLImageElement) => {
  img.setAttribute(
    "src",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  );
  const observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        // img.setAttribute("lazy", "loading");
        const urlImage = img.getAttribute("data-lazy") as string;
        const temp = new Image();
        temp.src = urlImage;
        temp.onload = () => {
          // img.classList.remove("opacity-0");
          img.src = urlImage;
          // img.setAttribute("lazy", "loaded");
        };
        img.removeAttribute("data-lazy");
        observer.unobserve(img);
      }
    });
  });
  observer.observe(img);
};


// Nếu bạn muốn thêm một hiệu ứng khi thay thế `src` của hình ảnh bằng địa chỉ URL của hình ảnh thực sự, bạn có thể làm điều đó bằng cách sử dụng CSS hoặc JavaScript. Đây là một ví dụ về cách thêm một hiệu ứng fade khi thay thế `src` của hình ảnh bằng cách sử dụng CSS:

// ```html
// <style>
//   .fade {
//     opacity: 0;
//     transition: opacity 1s;
//   }
// </style>

// <script>
//   import { onMount } from 'svelte';

//   let observer;

//   onMount(() => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0
//     };

//     observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const image = entry.target;
//           image.classList.add('fade');
//           image.onload = () => image.classList.remove('fade');
//           image.src = image.dataset.src;
//           observer.unobserve(image);
//         }
//       });
//     }, options);

//     const images = document.querySelectorAll('img.lazyload');
//     images.forEach((image) => {
//       observer.observe(image);
//     });
//   });

//   onDestroy(() => {
//     const images = document.querySelectorAll('img.lazyload');
//     images.forEach((image) => {
//       observer.unobserve(image);
//     });
//   });
// </script>

// <img data-src="image1.jpg" src="placeholder1.jpg" class="lazyload" alt="image" />
// <img data-src="image2.jpg" src="placeholder2.jpg" class="lazyload" alt="image" />
// <img data-src="image3.jpg" src="placeholder3.jpg" class="lazyload" alt="image" />
// ```

// Trong đó, chúng ta sử dụng lớp CSS `fade` để thiết lập độ mờ của hình ảnh thành `0` và thêm một hiệu ứng chuyển tiếp cho thuộc tính `opacity`. Khi hình ảnh hiển thị trong khung nhìn, chúng ta thêm lớp `fade` vào hình ảnh để làm cho nó mờ dần và đặt sự kiện `onload` để loại bỏ lớp `fade` khi hình ảnh được tải xong. Điều này sẽ tạo ra một hiệu ứng fade khi thay thế `src` của hình ảnh.

// Đây chỉ là một ví dụ và bạn có thể điều chỉnh mã và CSS để phù hợp với nhu cầu của mình. Bạn cũng có thể sử dụng JavaScript để thêm các hiệu ứng khác khi thay thế `src` của hình ảnh.