<script lang="ts">
  export let isLoading: boolean = false;

  let width: number = 0;
  let progress: ReturnType<typeof setInterval>; // for setInterval
  let stepSizes: number[] = [0, 0.005, 0.01, 0.02];

  const randomStep: number =
    stepSizes[Math.floor(Math.random() * stepSizes.length)];
  const getIncrement = (number: number): number => {
    if (number >= 0 && number < 20) return 10;
    else if (number >= 20 && number < 50) return 4;
    else if (number >= 50 && number < 80) return 2;
    else if (number >= 80 && number < 99) return 0.05;
    return 0;
  };
  const randomTime = (): number => Math.floor(Math.random() * 60);
  const start = () => {
    width = width + getIncrement(width) + randomStep;
    progress = setInterval(() => {
      if (width >= 96) clearInterval(progress);
      width = width + getIncrement(width) + randomStep;
    }, randomTime());
  };

  const end = () => {
    setTimeout(() => {
      clearInterval(progress);
      width = 100;
      setTimeout(() => {
        width = 0;
      }, 300);
    }, 300);
  };

  $: if (isLoading) {
    clearInterval(progress);
    width = 0;
    start();
  } else end();
</script>

<div class="fixed top-0 left-0 right-0 w-full h-0.5 z-[999]">
  <div
    class="bg-rose-500 h-full transition-[width] duration-100"
    style:width={`${width}%`}
  />
</div>
