import {
  fileInput,
  fileField,
  textarea,
  form,
  resultContainer,
  category,
  result,
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
      const resp = await fetch("http://localhost:8000/process_email/file", {
        method: "POST",
        body: formData,
      });

      const data = await resp.json();

      resultContainer.classList.remove("hidden");
      resultContainer.classList.add("flex");
      category.textContent = data.categoria;
      result.textContent = data.resultado;
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
      const resp = await fetch("http://localhost:8000/process_email/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await resp.json();

      resultContainer.classList.remove("hidden");
      resultContainer.classList.add("flex");
      category.textContent = data.categoria;
      result.textContent = data.resposta;
    } catch (err) {
      console.error("Erro no envio do texto:", err);
    }
  }
}
