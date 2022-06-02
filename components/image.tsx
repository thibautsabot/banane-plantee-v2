import sanitize from "../lib/sanitize";

const textToImage = {
  name: "Text To Image",
  keyCommand: "text2image",
  buttonProps: { "aria-label": "Insert title3" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 20 20">
      <path
        fill="currentColor"
        d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
      ></path>
    </svg>
  ),
  execute: (state: any, api: any) => {
    const input = document.getElementById("file-input");

    if (input) {
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];

        if (file) {
          const img = new Image();
          const objectUrl = URL.createObjectURL(file);
          const reader = new FileReader();
          const filename = sanitize(file.name);
          const slug = document.location.href.substring(
            document.location.href.indexOf("admin/") + 6
          );

          // Convert file to base64 to send to the API
          reader.readAsDataURL(file);
          reader.onloadend = async function () {
            const base64data = reader.result;

            // Upload the file to the API route
            await fetch("/api/uploadImage", {
              method: "POST",
              body: JSON.stringify({
                file: base64data,
                name: filename,
                slug,
              }),
            });

            // Load the image to get its dimensions
            img.src = objectUrl;
          };

          img.onload = function () {
            URL.revokeObjectURL(objectUrl);

            // Insert the image into the editor
            api.replaceSelection(
              // @ts-ignore
              `<Image src='/assets/blog/${slug}/${filename}' width={${this.width}} height={${this.height}} />`
            );
          };
        }
      };

      input.click();
    }
  },
};

export default textToImage;
