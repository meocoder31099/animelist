<script lang="ts">
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Web Share API Demo",
          text: "Check out this demo of the Web Share API!",
          url: "https://example.com",
        })
        .then(() => console.log("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      window.alert('Web Share API is not supported on your browser')
      console.log("Web Share API is not supported on your browser.");
    }
  };
</script>

<div
  class="flex flex-wrap justify-evenly md:justify-center gap-x-3 md:gap-x-24 gap-y-4"
>
  <button
    class="flex flex-col gap-y-2.5 items-center justify-between text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-7 h-7 3xl:w-8 3xl:h-8 fill-current"
      ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg
    >
    <span class="text-xs md:text-sm scale-90 3xl:scale-100 3xl:text-sm"
      >Danh sách</span
    >
  </button>
  <button
    on:click={() => {
      share();
    }}
    name="share"
    class="flex flex-col gap-y-2.5 items-center justify-between text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-7 h-7 3xl:w-8 3xl:h-8 fill-current scale-90"
      ><path
        d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"
      /></svg
    >
    <span class="text-xs md:text-sm scale-90 3xl:scale-100 3xl:text-sm"
      >Chia sẻ</span
    >
  </button>
  <button
    class="flex flex-col gap-y-2.5 items-center justify-between text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-7 h-7 3xl:w-8 3xl:h-8 fill-current scale-90"
      ><path
        d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"
      /></svg
    >
    <span class="text-xs md:text-sm scale-90 3xl:scale-100 3xl:text-sm"
      >Xếp hạng</span
    >
  </button>
  <button
    class="flex flex-col gap-y-2.5 items-center justify-between text-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="w-7 h-7 3xl:w-8 3xl:h-8 fill-current scale-90"
      ><path d="m14.303 6-3-2H6V2H4v20h2v-8h4.697l3 2H20V6z" /></svg
    >
    <span class="text-xs md:text-sm scale-90 3xl:scale-100 3xl:text-sm"
      >Báo vi phạm</span
    >
  </button>
</div>
