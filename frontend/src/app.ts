import { setupSwitching, switchToText } from "./switcher";
import { setupFileDragAndDrop } from "./dragdrop";
import { setupForm } from "./form";

function initApp() {
  setupSwitching();
  setupFileDragAndDrop();
  setupForm();
  switchToText();
}

document.addEventListener("DOMContentLoaded", initApp);
