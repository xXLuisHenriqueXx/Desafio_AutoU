import {
  fileInput,
  fileField,
  textarea,
  form,
  resultContainer,
  category,
  result,
  loader,
  classifyText,
  classifyButton,
} from "./dom";

export function setupForm() {
  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const isFileInputVisible = !fileInput.classList.contains("hidden");

  if (isFileInputVisible) {
    const file = fileField.files?.[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      loader.classList.remove("hidden");
      loader.classList.add("flex");
      classifyText.classList.add("hidden");
      classifyButton.disabled = true;

      const resp = await fetch(
        `https://backend-production-8a67.up.railway.app/api/process_email/file`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await resp.json();

      resultContainer.classList.remove("hidden");
      resultContainer.classList.add("flex");
      category.textContent = data.categoria;
      result.textContent = data.resposta;

      loader.classList.remove("flex");
      loader.classList.add("hidden");
      classifyText.classList.remove("hidden");
      classifyButton.disabled = false;
    } catch (err) {
      console.error("Erro no upload:", err);
    }
  } else {
    const text = textarea.value.trim();
    if (!text) {
      alert("Please paste or type some text.");
      return;
    }

    try {
      classifyText.classList.add("hidden");
      loader.classList.remove("hidden");
      loader.classList.add("flex");
      classifyButton.disabled = true;

      const resp = await fetch(
        `https://backend-production-8a67.up.railway.app/api/process_email/text`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await resp.json();

      resultContainer.classList.remove("hidden");
      resultContainer.classList.add("flex");
      category.textContent = data.categoria;
      result.textContent = data.resposta;

      loader.classList.remove("flex");
      loader.classList.add("hidden");
      classifyText.classList.remove("hidden");
      classifyButton.disabled = false;
    } catch (err) {
      console.error("Erro no envio do texto:", err);
    }
  }
}
