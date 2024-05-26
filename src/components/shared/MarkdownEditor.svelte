<script lang="ts">
  // Import Libs
  import { onMount } from "svelte";
  import useDebounce from "@/hooks/useDebounce";

  // Import Actions
  import onClickOutside from "@/use-actions/onClickOutside";
  import hi from "date-fns/locale/hi/index.js";

  let isShowActionButton: boolean = false;
  let markdownEditor: HTMLTextAreaElement;
  const markdownEditorActions = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M17.061 11.22A4.46 4.46 0 0 0 18 8.5C18 6.019 15.981 4 13.5 4H6v15h8c2.481 0 4.5-2.019 4.5-4.5a4.48 4.48 0 0 0-1.439-3.28zM13.5 7c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5H9V7h4.5zm.5 9H9v-3h5c.827 0 1.5.673 1.5 1.5S14.827 16 14 16z"></path></svg>',
      title: "Bold",
      onclick: () => {
        addMarkdown({
          charBefore: "__",
          charAfter: "__",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M19 7V4H9v3h2.868L9.012 17H5v3h10v-3h-2.868l2.856-10z"></path></svg>',
      title: "Italic",
      onclick: () => {
        addMarkdown({
          charBefore: "_",
          charAfter: "_",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M20 11h-8c-4 0-4-1.816-4-2.5C8 7.882 8 6 12 6c2.8 0 2.99 1.678 3 2.014L16 8h1c0-1.384-1.045-4-5-4-5.416 0-6 3.147-6 4.5 0 .728.148 1.667.736 2.5H4v2h16v-2zm-8 7c-3.793 0-3.99-1.815-4-2H6c0 .04.069 4 6 4 5.221 0 6-2.819 6-4.5 0-.146-.009-.317-.028-.5h-2.006c.032.2.034.376.034.5 0 .684 0 2.5-4 2.5z"></path></svg>',
      title: "Strikethrough",
      onclick: () => {
        addMarkdown({
          charBefore: "~~",
          charAfter: "~~",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M8.073 12.194 4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"></path></svg>',
      title: "Spoiler",
      onclick: () => {
        addMarkdown({
          charBefore: "~!",
          charAfter: "!~",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M5.282 12.064c-.428.328-.72.609-.875.851-.155.24-.249.498-.279.768h2.679v-.748H5.413c.081-.081.152-.151.212-.201.062-.05.182-.142.361-.27.303-.218.511-.42.626-.604.116-.186.173-.375.173-.578a.898.898 0 0 0-.151-.512.892.892 0 0 0-.412-.341c-.174-.076-.419-.111-.733-.111-.3 0-.537.038-.706.114a.889.889 0 0 0-.396.338c-.094.143-.159.346-.194.604l.894.076c.025-.188.074-.317.147-.394a.375.375 0 0 1 .279-.108c.11 0 .2.035.272.108a.344.344 0 0 1 .108.258.55.55 0 0 1-.108.297c-.074.102-.241.254-.503.453zm.055 6.386a.398.398 0 0 1-.282-.105c-.074-.07-.128-.195-.162-.378L4 18.085c.059.204.142.372.251.506.109.133.248.235.417.306.168.069.399.103.692.103.3 0 .541-.047.725-.14a1 1 0 0 0 .424-.403c.098-.175.146-.354.146-.544a.823.823 0 0 0-.088-.393.708.708 0 0 0-.249-.261 1.015 1.015 0 0 0-.286-.11.943.943 0 0 0 .345-.299.673.673 0 0 0 .113-.383.747.747 0 0 0-.281-.596c-.187-.159-.49-.238-.909-.238-.365 0-.648.072-.847.219-.2.143-.334.353-.404.626l.844.151c.023-.162.067-.274.133-.338s.151-.098.257-.098a.33.33 0 0 1 .241.089c.059.06.087.139.087.238 0 .104-.038.193-.117.27s-.177.112-.293.112a.907.907 0 0 1-.116-.011l-.045.649a1.13 1.13 0 0 1 .289-.056c.132 0 .237.041.313.126.077.082.115.199.115.352 0 .146-.04.266-.119.354a.394.394 0 0 1-.301.134zm.948-10.083V5h-.739a1.47 1.47 0 0 1-.394.523c-.168.142-.404.262-.708.365v.754a2.595 2.595 0 0 0 .937-.48v2.206h.904zM9 6h11v2H9zm0 5h11v2H9zm0 5h11v2H9z"></path></svg>',
      title: "Ordered List",
      onclick: () => {
        addMarkdown({
          charBefore: "1. ",
          charAfter: "",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>',
      title: "Unordered List",
      onclick: () => {
        addMarkdown({
          charBefore: "- ",
          charAfter: "",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M18 20V4h-3v6H9V4H6v16h3v-7h6v7z"></path></svg>',
      title: "Header",
      onclick: () => {
        addMarkdown({
          charBefore: "#",
          charAfter: "",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M4 19h16v2H4zm3-4h10v2H7zm-3-4h16v2H4zm0-8h16v2H4zm3 4h10v2H7z"></path></svg>',
      title: "Center",
      onclick: () => {
        addMarkdown({
          charBefore: "~~~",
          charAfter: "~~~",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path></svg>',
      title: "Quote",
      onclick: () => {
        addMarkdown({
          charBefore: ">",
          charAfter: "",
        });
      },
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5" fill="currentColor"><path d="m7.375 16.781 1.25-1.562L4.601 12l4.024-3.219-1.25-1.562-5 4a1 1 0 0 0 0 1.562l5 4zm9.25-9.562-1.25 1.562L19.399 12l-4.024 3.219 1.25 1.562 5-4a1 1 0 0 0 0-1.562l-5-4zm-1.649-4.003-4 18-1.953-.434 4-18z"></path></svg>',
      title: "Code",
      onclick: () => {
        addMarkdown({
          charBefore: "`",
          charAfter: "`",
        });
      },
    },
  ];

  const hiddenAcctionButton = () => {
    if (window.innerWidth < 600) isShowActionButton = false;
  };

  onMount(() => {
    if (window.innerWidth > 600) {
      isShowActionButton = true;
    }
  });

  // const addMarkdown = ({
  //   charBefore,
  //   charAfter,
  // }: {
  //   charBefore: string;
  //   charAfter: string;
  // }) => {
  //   // Get getSelection.
  //   const selection = window.getSelection();
  //   if (!selection || !markdownEditor) return;
  //   // Get amchorNode.
  //   const anchorNode = selection?.anchorNode;

  //   // Get id of selection.
  //   const selectionId =
  //     anchorNode?.nodeType === Node.ELEMENT_NODE
  //       ? (anchorNode as HTMLElement)?.getAttribute("id")
  //       : anchorNode?.parentElement?.id;
  //   const markdownEditorId = markdownEditor.id;

  //   // If selectionId === markdownEditorId add markdown to selected text.
  //   // Else add to last of markdownEditor value.
  //   if (selectionId && selectionId === markdownEditorId) {
  //     const range = selection.getRangeAt(0);
  //     const selectedText = range.toString();
  //     const newTextElement = document.createTextNode(
  //       charBefore + selectedText + charAfter
  //     );
  //     range.deleteContents();
  //     range.insertNode(newTextElement);
  //   } else {
  //     // Add markdown to markdownEditor value.
  //     const range = document.createRange();
  //     range.selectNodeContents(
  //       markdownEditor.lastElementChild ?? markdownEditor
  //     );
  //     range.collapse(false);
  //     selection.removeAllRanges();
  //     const newTextElement = document.createTextNode(charBefore + charAfter);
  //     range.insertNode(newTextElement);
  //     selection.addRange(range);
  //     console.log(window.getSelection()?.getRangeAt(0).startOffset);
  //     range.
  //     // selection.collapse(range.endContainer, range.endOffset)
  //     // markdownEditor.focus()
  //   }
  // };

  const addMarkdown = ({
    charBefore,
    charAfter,
  }: {
    charBefore: string;
    charAfter: string;
  }) => {
    const { selectionStart, selectionEnd, value } = markdownEditor;
    // Get text from before cursor position.
    const beforeCursorPosition = value.substring(0, selectionStart);
    // Get text from after cursor position.
    const afterCursorPosition = value.substring(selectionEnd);

    if (selectionStart !== selectionEnd) {
      // Get selected text in textarea.
      const selectedText = value.substring(selectionStart, selectionEnd);

      // Add markdown to markdownEditor value.
      markdownEditor.value =
        beforeCursorPosition +
        charBefore +
        selectedText +
        charAfter +
        afterCursorPosition;
    } else {
      // Add markdown to markdownEditor value.
      markdownEditor.value =
        beforeCursorPosition + charBefore + charAfter + afterCursorPosition;
    }

    // Update new position of selection.
    markdownEditor.selectionStart = selectionStart + charBefore.length;
    markdownEditor.selectionEnd = selectionEnd + charBefore.length;
    markdownEditor.focus();
  };

  const markdownEditorAutoHeight = useDebounce(() => {
    markdownEditor.style.height = "auto";
    markdownEditor.style.height = markdownEditor.scrollHeight.toString() + "px";
  }, 200);
</script>

<form>
  <div
    use:onClickOutside={() => {
      hiddenAcctionButton();
    }}
    class="w-full px-2 py-1 bg-neutral-900 rounded-lg overflow-hidden"
  >
    <!-- Input -->
    <div class="p-2 rounded-b-lg relative">
      <textarea
        on:click|stopPropagation={() => {
          isShowActionButton = true;
        }}
        on:input|stopPropagation={markdownEditorAutoHeight}
        rows="1"
        bind:this={markdownEditor}
        id="editor"
        autocomplete="false"
        class="block w-full max-h-80 border-0 bg-transparent focus:ring-0 outline-none text-white placeholder-neutral-400 resize-none"
        placeholder="What are your thoughts?"
        required
      />
    </div>
    <!-- Start: markdown-editor -->
      <div class="flex items-center space-x-2 justify-between" class:hidden={!isShowActionButton}>
        <div
          class="overflow-hidden"
        >
          <div
            class="flex items-center space-x-1 overflow-x-auto scrollbar-thin scrollbar-h-[2px] scrollbar-thumb-neutral-700"
          >
            {#each markdownEditorActions as { icon, title, onclick }}
              <button
                {title}
                on:click={onclick}
                type="button"
                tabindex="-1"
                class="px-2 py-1 rounded-full cursor-pointer text-gray-400 hover:text-white hover:bg-gray-600"
              >
                {@html icon}
                <span class="sr-only">{title}</span>
              </button>
            {/each}
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <button
            type="button"
            tabindex="-1"
            class="px-2 py-1 bg-neutral-100 text-black rounded-lg text-xs font-bold"
          >
            <span>Preview</span>
          </button>
          <button
            type="button"
            tabindex="-1"
            class="p-2 rounded-full cursor-pointer text-gray-400 hover:text-white hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="w-5 h-5"
              fill="currentColor"
              ><path
                d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"
              /></svg
            >
            <span class="sr-only">Comment</span>
          </button>
        </div>
      </div>
    <!-- End: markdown-editor -->
  </div>
</form>
