const useAnilistDescriptionsFromat = (description: string): string => {
  if (!description) return "";
  let convertedText = description;

  //Comment phần này để hiện spoiler
  // convertedText = convertedText.replace(
  //   /__(.*?):__ (.*?)!~\n/g,
  //   '<p><span class="mr-1">$1:</span>$2</p>!~'
  // );
  // convertedText = convertedText.replace(
  //   /~!(.*?)!~/gs,
  //   '<span spoiler="true" class="bg-neutral-800 text-neutral-800 rounded cursor-pointer" onclick="this.classList.remove(\'bg-neutral-800\', \'text-neutral-800\')" >$1</span>'
  // );
  convertedText = convertedText.replace(
    /__(.*?):__ (.*?)\n|__(.*?):__ (.*?)!~/g,
    '<p><span class="mr-1">$1:</span>$2</p>'
  );

  convertedText = convertedText.replace(
    /\*\*(.*?):\*\* (.*?)\n|\*\*(.*?):\*\* (.*?)!~/g,
    '<p><span class="mr-1">$1:</span>$2</p>'
  );

  convertedText = convertedText.replace(/\[(.*?)\]\((.*?)\)/g, "$1");

  // Comment phần này nếu muốn ẩn sploiler
  convertedText = convertedText.replace(/~!|!~/g, "");

  convertedText = convertedText.replace(/\n/g, "<br>");
  return convertedText;
};

export default useAnilistDescriptionsFromat;
