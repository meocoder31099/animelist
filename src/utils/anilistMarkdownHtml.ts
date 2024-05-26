// Import Types
import { MediaType } from "@/types/anilistv2";

export interface MarkdownImageComponents {
  type: "image";
  target: string;
  props: {
    src: string;
  };
}
export interface MarkdownYoutubeComponents {
  type: "youtube";
  target: string;
  props: {
    youtubeId: string;
  };
}
export interface MarkdownVideoComponents {
  type: "video";
  target: string;
  props: {
    videoSrc: string;
  };
}
export interface MarkdownMediaComponents {
  type: "media";
  target: string;
  props: {
    mediaId: number;
    mediaType: MediaType;
  };
}
export type MarkdownChildrenComponents =
  | MarkdownImageComponents
  | MarkdownYoutubeComponents
  | MarkdownVideoComponents
  | MarkdownMediaComponents;

export type AnilistMarkdownHTML = {
  text: string;
  childrenComponents?: MarkdownChildrenComponents[];
};

// Import Libs
import { marked } from "@/utils/markedWithAnilistFlavored";
import DOMPurify from "dompurify";

export const sanitize = (stringHTML: string): string => {
  const e = DOMPurify(window);
  return (
    e.addHook("afterSanitizeAttributes", (currentNode) => {
      "target" in currentNode &&
        (currentNode.setAttribute("target", "_blank"),
        currentNode.setAttribute("rel", "noopener noreferrer"));
    }),
    e.sanitize(stringHTML, {
      ALLOWED_TAGS: [
        "a",
        "b",
        "blockquote",
        "br",
        "center",
        "del",
        "div",
        "em",
        "font",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "hr",
        "i",
        "img",
        "li",
        "ol",
        "p",
        "pre",
        "code",
        "span",
        "strike",
        "strong",
        "ul",
      ],
      ALLOWED_ATTR: [
        "align",
        "height",
        "href",
        "src",
        "target",
        "width",
        "rel",
      ],
    })
  );
};

const uniqueId = (): string => Math.random().toString();

const domainBlackList = [
  /(doko\.moe)/gi,
  /(nyaa\.si)/gi,
  /(horriblesubs\.info)/gi,
  /(kissanime)/gi,
  /(9anime)/gi,
];

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`;
const lexer = new marked.Lexer();
lexer.rules.heading = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/;

marked.setOptions({
  renderer,
  lexer,
});

const anilistMarkdownHtml = (markdown: string): AnilistMarkdownHTML => {
  const childrenComponents: MarkdownChildrenComponents[] = [];
  markdown = markdown.replace(
    /(http)(:([\/|.|\w|\s|-])*\.(?:jpg|.jpeg|gif|png|mp4|webm))/gi,
    "$1s$2"
  );
  markdown = markdown.replace(
    /img\s?(\d+%?)?\s?\((.[\S]+)\)/gi,
    //   (_, $1, $2) => {
    //     const target = `image_${$2}`;
    //     childrenComponents.push({
    //       type: "image",
    //       target: `[rel="${target}"]`,
    //       props: { src: $2 },
    //     });
    //     return `<span rel="${target}"></span>`;
    //     // "<img width='$1' src='$2'>"
    //   }
    "<img width='$1' src='$2'>"
  );
  markdown = markdown.replace(
    /(^|>| )@([A-Za-z0-9]+)/gm,
    "$1<a target='_blank' href='/user/$2'>@$2</a>"
  );
  markdown = markdown.replace(
    /youtube\s?\([^]*?([-_0-9A-Za-z]{10,15})[^]*?\)/gi,
    (_, $1) => {
      const target = uniqueId();
      childrenComponents.push({
        type: "youtube",
        target: `[rel="${target}"]`,
        props: { youtubeId: $1 },
      });
      return `<span rel="${target}"></span>`;
      // "youtube ($1)"
    }
  );
  markdown = markdown.replace(
    /webm\s?\(h?([A-Za-z0-9-._~:\/?#\[\]@!$&()*+,;=%]+)\)/gi,
    (_, $1) => {
      const target = uniqueId();
      childrenComponents.push({
        type: "video",
        target: `[rel="${target}"]`,
        props: { videoSrc: `h${$1}` },
      });
      return `<span rel="${target}"></span>`;
      // "webmv(`$1`)"
    }
  );
  markdown = markdown.replace(/~{3}([^]*?)~{3}/gm, "+++$1+++");
  markdown = markdown.replace(/~!([^]*?)!~/gm, '<div rel="spoiler">$1</div>');
  markdown = marked(markdown);
  markdown = sanitize(markdown);
  markdown = markdown.replace(/\+{3}([^]*?)\+{3}/gm, "<center>$1</center>");
  markdown = markdown.replace(
    /<div rel="spoiler">([\s\S]*?)<\/div>/gm,
    "<p><span onclick='showSpoiler(this)' class='markdown-spoiler'>$1</span></p>"
  );
  // (markdown = markdown.replace(
  //   /youtube\s?\(([-_0-9A-Za-z]{10,15})\)/gi,
  //   "<span class='youtube' id='$1' style='width: 100%; height: 200px; max-width: 500px;'><span class='play'></span></span>"
  // )),
  // (markdown = markdown.replace(
  //   /webmv\s?\(<code>([A-Za-z0-9-._~:\/?#\[\]@!$&()*+,;=%]+)<\/code>\)/gi,
  //   "<video muted loop controls><source src='h$1' type='video/webm'>Your browser does not support the video tag.</video>"
  // )),
  markdown = markdown.replace(
    /(?:<a href="https?:\/\/anilist.co\/(anime|manga)\/)([0-9]+).*?>(?:https?:\/\/anilist.co\/(?:anime|manga)\/[0-9]+).*?<\/a>/gm,
    (_, $1, $2) => {
      const target = uniqueId();
      const mediaType = $1 === "anime" ? MediaType.Anime : MediaType.Manga;
      childrenComponents.push({
        type: "media",
        target: `[rel="${target}"]`,
        props: { mediaType: mediaType, mediaId: parseInt($2) },
      });
      return `<span rel="${target}"></span>`;
      // '<span class="media-embed" data-media-type="$1" data-media-id="$2"></span>'
    }
  );

  domainBlackList.forEach((e) => {
    markdown = markdown.replace(e, "");
  });

  return {
    text: markdown,
    ...(childrenComponents.length && {
      childrenComponents: childrenComponents,
    }),
  };
};

export default anilistMarkdownHtml;
