// --- 設定 ---
// 重ねたい複数の画像のURL（またはBase64データ）
const OVERLAY_IMAGE_SOURCES = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAMUExURf///wAAAAAAAPz8/EhQmH8AAAAEdFJOU/8A///TsHKUAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGmZjVEwAAAAAAAAAIAAAACAAAAAAAAAAAACnA+gBAMSI070AAAAkSURBVBiVY2BgDAUDBo2FUAYTTCRIlDCDCUM7Ay+UERo6DBgAkZ1Rn0GcLDQAAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAASUExURQAAAAAAAAAAAP///wAAAGpqamosHKIAAAAGdFJOU/kA/v///zo8CMYAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAAD9JREFUKJFjYBBEBQzKjOgCBiIuLo7IAsaMjiIoKowNXENQBYxZHFEEDBhcUbUwCjqiaGEQRLMFzV2jAgMiAACyBSWqp4yDiAAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAJUExURQAAAAAAAP///4Pdz9IAAAADdFJOUwD//0RQ1iEAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAAB1JREFUGJVjYGGAAkkYI8sByoh0QJcihiHKMJwAAPECAfNTk/eCAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEUAAAAAAAD///+D3c/SAAAAA3RSTlP/AP9p7B++AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAJUlEQVQYlWNgDYUABkUYQwPG0BKFMVphjIUwNazouuDmhA4rBgDnXlMKYsq09gAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAMUExURQAAAAAAAP8AAEVFRSzE3S4AAAAEdFJOUwD//wsJ/XaNAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGmZjVEwAAAAAAAAAIAAAACAAAAAAAAAAAACnA+gBAMSI070AAAAySURBVBiVY2AMYYAAtpVQhlSWA4SRKTUBwkhJgzIyJ0IZWW5QhtQsBzTtjOEHGIYPAAAtnwm7X5sTuAAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAASUExURQAAAP///wAAAC4uLgAAABcXF1hqS+8AAAAGdFJOUwD//wsGC7caVwMAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAADFJREFUKJFjYGBgZEADQgIkCjAKKikKosgrKSopCeBTQZQtwiaoAkCXBqA7dhTQFAAAzpUCy0WqSu0AAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAbUExURQAAAAAAAP///2pqagAAAAAAAAAAAAAAAF1dW1VrqlAAAAAJdFJOUwD////+AQMCDSKkVYQAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAAEJJREFUKJFjYBAUFGBABoxKSoooAkKYAoJKKHqEFI1RBRiF0bQA9aDawsAoyICmQhFdQCUATYsYmgqGCnSBUUBlAAA1jgQUUe1DIgAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAJUExURQAAAAAAAP/t7QiQzkkAAAADdFJOUwD//0RQ1iEAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAACRJREFUGJVjYGSAAjYHdIZYAJSRtgTKkIIx2CZAGYwwxcMUAAB2fgOT8dfkcAAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAYUExURQAAAAAAAAAAAP///wAAAAAAAAAAAFVVVf64cWYAAAAIdFJOUwD4///9+gMYOsi5tgAAAAlwSFlzAAAPYQAAD2EBqD+naQAAABpmY1RMAAAAAAAAACAAAAAgAAAAAAAAAAAApwPoAQDEiNO9AAAAQUlEQVQokWNgYGAQYEAFTEZoAsrGCqgCSkaoAkpMRkzIIkxGSkCIYgIIKOBRATKDJQCvLZjuSEJ3aQGaglFAIQAAOnkHWd413M0AAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAJUExURQAAAAAAAP///4Pdz9IAAAADdFJOUwD//0RQ1iEAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAAB1JREFUGJVjYMANWFmhDMkwBwgja9UENBG4mmEKAOiKAxdrNBITAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAYUExURQAAAAAAAP///wAAAFlZWV9fWl5eXgAAAAmdUiQAAAAIdFJOU/8A//QUMC4BT8wV9AAAAAlwSFlzAAAPYQAAD2EBqD+naQAAABpmY1RMAAAAAAAAACAAAAAgAAAAAAAAAAAApwPoAQDEiNO9AAAAQElEQVQoke3NsREAIAwCQMIEYYOczuIs7r+BraG2lPKPAwChO+BwKBnQGsjZQWKgQ1Z1EA1yOMA2tLaB3354DAfkgiIGdHG8aQAAAABJRU5ErkJggg==",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAMUExURQAAAAAAAP///wAAAMVMXScAAAAEdFJOUwD//wHpKJ+TAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGmZjVEwAAAAAAAAAIAAAACAAAAAAAAAAAACnA+gBAMSI070AAAAwSURBVBiVY2AQDWCAAKkJUAYbjCEJY6RA1QTCBNIcoIxMKM2QBRMJ9YEJGTAMfQAAGx0Gbi43vD4AAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAYUExURQAAAAAAAP/k4QCTAAAAAD8/PwAAAFdXV7UW2o0AAAAIdFJOU/8A///9CAMmPDNx+wAAAAlwSFlzAAAPYQAAD2EBqD+naQAAABpmY1RMAAAAAAAAACAAAAAgAAAAAAAAAAAApwPoAQDEiNO9AAAASElEQVQokWNgYGAURAYMDEoMqAJMCsaMqALMzAaoWgwMUJQwCBijKmEQZDYwQBUAKkHRIiiIZqigoIArmoBYIZoAKhgVoL4AAN5xIyKRh690AAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAJUExURQAAAAAAAP///4Pdz9IAAAADdFJOUwD//0RQ1iEAAAAJcEhZcwAAD2EAAA9hAag/p2kAAAAaZmNUTAAAAAAAAAAgAAAAIAAAAAAAAAAAAKcD6AEAxIjTvQAAACJJREFUGJVjYGGAAkkYI8sByoh0QJeCM+BSWRhq4AYOCwAA1kMC80rr/7MAAAAASUVORK5CYII=",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAVUExURQAAAAAAAP/t7f8AAAAAAEVFRSoqKovsNc0AAAAHdFJOUwD///8FCwapnT78AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGmZjVEwAAAAAAAAAIAAAACAAAAAAAAAAAACnA+gBAMSI070AAAA3SURBVCiRY2BgZEADQgIEBBiFBAVRhISEFI0NUVQoKRqiCDCgq2BgFBBGtwdDwDEM3W2jgM4AAOPCA195vOPtAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAACGFjVEwAAAABAAAAALQt6aAAAAAYUExURQAAAAAAAP/t7f9oIP//AMDAwGpqaioqKu3hT3EAAAAIdFJOUwD///////8GEaseigAAAAlwSFlzAAAPYQAAD2EBqD+naQAAABpmY1RMAAAAAAAAACAAAAAgAAAAAAAAAAAApwPoAQDEiNO9AAAAP0lEQVQokWNgYGRAA0ICGAKCKHxGIUFjFDVCQopKKAKMSkqoWhiEFFG1MDCKhDqiKhFJQxNgFBRHd9sooDMAADE6A5DXDHooAAAAAElFTkSuQmCC",
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACGFjVEwAAAABAAAAALQt6aAAAAAMUExURQAAAAAAAGpqai4uLv6dDCgAAAAEdFJOUwD//wsJ/XaNAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAAGmZjVEwAAAAAAAAAIAAAACAAAAAAAAAAAACnA+gBAMSI070AAAAsSURBVBiVYxANdWAAAxZGCM3AthIngzEEymBZCGM0whiKcMUHIAy4yUMZAAD3WwZ6mH0lcwAAAABJRU5ErkJggg==",
];

// --- 要素の取得 ---
const fileInput = document.getElementById("uploadInput");
const canvas = document.getElementById("output-canvas");
const ctx = canvas.getContext("2d");
const resultContainer = document.getElementById("output-container");
const downloadAllBtn = document.getElementById("downloadAll");

let generatedImages = [];
const overlayImages = [];
let loadedCount = 0;

// --- 事前準備: すべての重ねる画像をあらかじめロードしておく ---
OVERLAY_IMAGE_SOURCES.forEach((src) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedCount++;
  };
  overlayImages.push(img);
});

// PNG形式のDataURL（またはBlob）から、Windows標準の「本物の.curバイナリ」を自作する関数
function convertPngToCur(pngDataUrl) {
  // DataURLから純粋なPNGのバイナリ配列（Uint8Array）を取り出す
  const bin = atob(pngDataUrl.split(",")[1]);
  const pngBytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    pngBytes[i] = bin.charCodeAt(i);
  }

  const pngSize = pngBytes.length;

  // CURファイルの構造（ヘッダー6バイト + ディレクトリ16バイト = 22バイトの土台を作る）
  const curHeader = new Uint8Array(22 + pngSize);
  const view = new DataView(curHeader.buffer);

  // 1. ICONHEADER (6 bytes)
  view.setUint16(0, 0, true); // 予約領域 (常に0)
  view.setUint16(2, 2, true); // タイプ (1=アイコン, 2=カーソル) ★ここを2に設定
  view.setUint16(4, 1, true); // 含まれる画像の枚数 (1枚)

  // 2. ICONDIRENTRY (16 bytes)
  view.setUint8(6, 32); // 画像の幅 (32ピクセル)
  view.setUint8(7, 32); // 画像の高さ (32ピクセル)
  view.setUint8(8, 0); // カラーパレットの色数 (256色以上の場合は0)
  view.setUint8(9, 0); // 予約領域 (常に0)

  // ★最重要：マウスでクリックしたときに反応する「中心点（ホットスポット）」の座標設定
  // 通常の矢印カーソルに合わせて、左上端（X=0, Y=0）を起点に設定しています
  view.setUint16(10, 0, true); // ホットスポット X座標 (0～31)
  view.setUint16(12, 0, true); // ホットスポット Y座標 (0～31)

  view.setUint32(14, pngSize, true); // PNG画像データのサイズ
  view.setUint32(18, 22, true); // 画像データが始まる位置（オフセット：22バイト目から開始）

  // 3. 22バイト目以降の残りの部分に、実際のPNG画像データをそのまま流し込む
  curHeader.set(pngBytes, 22);

  return curHeader;
}

// --- メイン処理: ファイルが選択された時のイベント ---
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // 単一ファイルを取得

  if (!file || !file.type.startsWith("image/")) {
    alert("画像ファイルを選択してください。");
    return;
  }

  if (loadedCount < OVERLAY_IMAGE_SOURCES.length) {
    alert("素材画像の準備中です。もう一度お試しください。");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const userImg = new Image();
    userImg.onload = () => {
      resultContainer.innerHTML = "";
      generatedImages = [];
      downloadAllBtn.disabled = true;

      overlayImages.forEach((overlayImg, index) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(userImg, 0, 0, 32, 32);
        ctx.drawImage(overlayImg, 0, 0, 32, 32);

        const resultDataUrl = canvas.toDataURL("image/png");
        const fileName = `cursor_${String(index + 1).padStart(2, "0")}.cur`;

        // ★ここでPNGを本物のWindows用.curバイナリデータに変換する
        const curBinaryData = convertPngToCur(resultDataUrl);

        generatedImages.push({ data: curBinaryData, name: fileName });

        // プレビュー表示用
        const resultImgTag = document.createElement("img");
        resultImgTag.src = resultDataUrl;
        resultImgTag.title = fileName;
        resultImgTag.style.margin = "5px";
        resultImgTag.style.border = "1px solid #ccc";
        resultContainer.appendChild(resultImgTag);
      });

      if (generatedImages.length > 0) {
        downloadAllBtn.disabled = false;
      }
    };
    userImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// --- ZIP生成＆ダウンロード処理 ---
downloadAllBtn.addEventListener("click", () => {
  if (generatedImages.length === 0) return;

  class MiniZip {
    constructor() {
      this.files = [];
    }
    add(name, u8Array) {
      this.files.push({ name, data: u8Array });
    }
    generate() {
      let localHeaders = [];
      let centralDirectories = [];
      let offset = 0;
      const textEnc = new TextEncoder();
      const crcTable = [];
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
          c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }
        crcTable[i] = c;
      }
      const getCRC32 = (data) => {
        let crc = 0 ^ -1;
        for (let i = 0; i < data.length; i++) {
          crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xff];
        }
        return (crc ^ -1) >>> 0;
      };

      this.files.forEach((file) => {
        const nameBytes = textEnc.encode(file.name);
        const crc = getCRC32(file.data);
        const size = file.data.length;
        const time = 0x0000;
        const date = 0x5c21;

        const lfh = new Uint8Array(30 + nameBytes.length);
        lfh.set([0x50, 0x4b, 0x03, 0x04]);
        lfh.set([10, 0], 4);
        lfh.set([0, 0], 6);
        lfh.set([0, 0], 8);
        lfh.set([time & 0xff, (time >> 8) & 0xff], 10);
        lfh.set([date & 0xff, (date >> 8) & 0xff], 12);
        lfh.set(
          [
            crc & 0xff,
            (crc >> 8) & 0xff,
            (crc >> 16) & 0xff,
            (crc >> 24) & 0xff,
          ],
          14,
        );
        lfh.set(
          [
            size & 0xff,
            (size >> 8) & 0xff,
            (size >> 16) & 0xff,
            (size >> 24) & 0xff,
          ],
          18,
        );
        lfh.set(
          [
            size & 0xff,
            (size >> 8) & 0xff,
            (size >> 16) & 0xff,
            (size >> 24) & 0xff,
          ],
          22,
        );
        lfh.set([nameBytes.length & 0xff, (nameBytes.length >> 8) & 0xff], 26);
        lfh.set([0, 0], 28);
        lfh.set(nameBytes, 30);
        localHeaders.push(lfh, file.data);

        const cdh = new Uint8Array(46 + nameBytes.length);
        cdh.set([0x50, 0x4b, 0x01, 0x02]);
        cdh.set([10, 0], 4);
        cdh.set([10, 0], 6);
        cdh.set([0, 0], 8);
        cdh.set([0, 0], 10);
        cdh.set([time & 0xff, (time >> 8) & 0xff], 12);
        cdh.set([date & 0xff, (date >> 8) & 0xff], 14);
        cdh.set(
          [
            crc & 0xff,
            (crc >> 8) & 0xff,
            (crc >> 16) & 0xff,
            (crc >> 24) & 0xff,
          ],
          16,
        );
        cdh.set(
          [
            size & 0xff,
            (size >> 8) & 0xff,
            (size >> 16) & 0xff,
            (size >> 24) & 0xff,
          ],
          20,
        );
        cdh.set(
          [
            size & 0xff,
            (size >> 8) & 0xff,
            (size >> 16) & 0xff,
            (size >> 24) & 0xff,
          ],
          24,
        );
        cdh.set([nameBytes.length & 0xff, (nameBytes.length >> 8) & 0xff], 28);
        cdh.set([0, 0], 30);
        cdh.set([0, 0], 32);
        cdh.set([0, 0], 34);
        cdh.set([0, 0], 36);
        cdh.set([0, 0, 0, 0], 38);
        cdh.set(
          [
            offset & 0xff,
            (offset >> 8) & 0xff,
            (offset >> 16) & 0xff,
            (offset >> 24) & 0xff,
          ],
          42,
        );
        cdh.set(nameBytes, 46);
        centralDirectories.push(cdh);
        offset += lfh.length + file.data.length;
      });

      let cdLength = centralDirectories.reduce(
        (acc, cur) => acc + cur.length,
        0,
      );
      const eocd = new Uint8Array(22);
      eocd.set([0x50, 0x4b, 0x05, 0x06]);
      eocd.set([0, 0], 4);
      eocd.set([0, 0], 6);
      eocd.set([this.files.length & 0xff, (this.files.length >> 8) & 0xff], 8);
      eocd.set([this.files.length & 0xff, (this.files.length >> 8) & 0xff], 10);
      eocd.set(
        [
          cdLength & 0xff,
          (cdLength >> 8) & 0xff,
          (cdLength >> 16) & 0xff,
          (cdLength >> 24) & 0xff,
        ],
        12,
      );
      eocd.set(
        [
          offset & 0xff,
          (offset >> 8) & 0xff,
          (offset >> 16) & 0xff,
          (offset >> 24) & 0xff,
        ],
        16,
      );
      eocd.set([0, 0], 20);

      return new Blob([...localHeaders, ...centralDirectories, eocd], {
        type: "application/zip",
      });
    }
  }

  const mz = new MiniZip();
  generatedImages.forEach((item) => {
    mz.add(item.name, item.data);
  });
  const blob = mz.generate();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mouse_cursors.zip";
  link.click();
  URL.revokeObjectURL(link.href);
});
