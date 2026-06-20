
function renderWithTemplate(template, parentElement) {
  // if clear is true we need to clear out the contents of the parent.
  parentElement.innerHTML = template;
}

async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("./public/partials/header.html");
 const footerTemplate = await loadTemplate("./public/partials/footer.html");
  const headerElement = document.querySelector("#m-header");
  const footerElement = document.querySelector("#m-footer");
  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }
  else {
    console.error("No element with id #m-header found");
  }
  renderWithTemplate(footerTemplate, footerElement);
}
