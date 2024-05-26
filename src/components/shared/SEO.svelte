<script lang="ts">
  // Import Types
  import type { Maybe } from "@/types";

  export let pageTitle: Maybe<string>;
  export let pageDescription: string;
  export let pageHref: Maybe<string>;
  export let pageSocialImageUrl: Maybe<string>;
  export let siteName: string;
  export let siteThemeColor: string;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="title" content={pageTitle} />
  <meta name="description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageHref} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content={pageSocialImageUrl} />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageHref} />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={pageDescription} />
  <meta property="twitter:image" content={pageSocialImageUrl} />
  <meta name="application-name" content={siteName} />
  <meta name="apple-mobile-web-app-title" content={siteName} />
  <meta name="theme-color" content={siteThemeColor} />
  <meta name="msapplication-navbutton-color" content={siteThemeColor} />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <meta name="msapplication-starturl" content="/" />
  <link rel="canonical" href={pageHref} />
</svelte:head>
