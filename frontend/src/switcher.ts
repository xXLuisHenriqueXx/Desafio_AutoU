import { textBtn, fileBtn, textInput, fileInput } from "./dom";

export function switchToText() {
  textInput.classList.remove("hidden");
  fileInput.classList.add("hidden");
  fileInput.classList.remove("flex");

  textBtn.classList.remove("bg-zinc-400");
  textBtn.classList.add("bg-indigo-500");
  fileBtn.classList.remove("bg-indigo-500");
  fileBtn.classList.add("bg-zinc-400");
}

export function switchToFile() {
  fileInput.classList.remove("hidden");
  fileInput.classList.add("flex");
  textInput.classList.add("hidden");

  fileBtn.classList.remove("bg-zinc-400");
  fileBtn.classList.add("bg-indigo-500");
  textBtn.classList.remove("bg-indigo-500");
  textBtn.classList.add("bg-zinc-400");
}

export function setupSwitching() {
  textBtn.addEventListener("click", switchToText);
  fileBtn.addEventListener("click", switchToFile);
}
