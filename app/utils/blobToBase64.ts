interface Blob64 {
  width: number;
  height: number;
  content: string;
}

const blobToBase64 = (blob: File): Promise<Blob64> => {
  return new Promise((resolve) => {
    let fileToLoad: any;
    const reader = new FileReader();

    reader.onload = (file) => {
      fileToLoad = file.target!.result;
    };
    reader.onloadend = () => {
      const image = new Image();
      image.src = fileToLoad;
      image.onload = function () {
        resolve({
          width: image.width,
          height: image.height,
          content: reader.result as string,
        });
      };
    };

    reader.readAsDataURL(blob);
  });
};

export default blobToBase64;
