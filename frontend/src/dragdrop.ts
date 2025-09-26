import { fileInput, fileField } from "./dom";

function updateFileDisplay(file: File) {
  const container = document.getElementById(
    "filePlaceholder"
  ) as HTMLDivElement;
  if (!container) return;

  container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 20 20" 
         class="w-14 h-14 fill-indigo-500">
      <path d="M4 2h8l4 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"/>
    </svg>

    <p class="text-sm text-zinc-200 text-center">${file.name}</p>
  `;
}

export function setupFileDragAndDrop() {
  fileInput.addEventListener("click", () => {
    fileField.click();
  });

  fileInput.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileInput.classList.add("bg-zinc-600");
  });

  fileInput.addEventListener("dragleave", () => {
    fileInput.classList.remove("bg-zinc-600");
  });

  fileInput.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.classList.remove("bg-zinc-600");

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      fileField.files = files;
      updateFileDisplay(files[0]);
    }
  });

  fileField.addEventListener("change", () => {
    const file = fileField.files?.[0];
    if (file) {
      updateFileDisplay(file);
    }
  });
}
