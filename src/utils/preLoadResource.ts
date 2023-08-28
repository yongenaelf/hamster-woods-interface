const urlList: Array<string> = [];

export function preLoad() {
  let count = 0;
  for (let i = 0; i < urlList.length; i++) {
    const img = new Image();
    img.src = urlList[i];
    img.width = 0;
    img.height = 0;

    img.onload = img.onerror = function () {
      count++;
      if (count == urlList.length) {
        return;
      }
    };
  }
}
