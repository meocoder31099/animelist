const useHTMLtoPlainText = (html: string) => {
  return html.replace(/<[^>]*(>|$)|&nbsp;/g, "");
};

export default useHTMLtoPlainText;
