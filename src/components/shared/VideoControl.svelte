<script lang="ts">
  export let videoSrc: string;
</script>

<div class="w-full border border-neutral-800 rounded-lg overflow-hidden">
  <div class="aspect-w-16 aspect-h-9">
    <video muted={true} loop={false} controls={true}>
      <source src={videoSrc} type="video/webm" />
      <span>Your browser does not support thevideo tag.</span>
    </video>
  </div>
</div>
