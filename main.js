const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

function validateInput(input) {
  const errorMsg = input.parentElement.querySelector("p");
  let isValid = true;

  
  if (input.type === "radio") {
    const group = form.querySelectorAll(`input[name="${input.name}"]`);
    const anyChecked = Array.from(group).some((radio) => radio.checked);
    const groupError = input.closest("label").querySelector("p");
    if (!anyChecked) {
      if (groupError) groupError.textContent = "Please select a query type.";
      isValid = false;
    }
    if (!isValid) {
      if (groupError) groupError.classList.remove("hidden");
    } else {
      if (groupError) groupError.classList.add("hidden");
    }
    return isValid;
  }

//  Checkbox
  if (input.type === "checkbox") {
    if (!input.checked) {
      if (errorMsg)
        errorMsg.textContent = "You must consent before submitting.";
      isValid = false;
    }
    if (!isValid) {
      if (errorMsg) errorMsg.classList.remove("hidden");
    } else {
      if (errorMsg) errorMsg.classList.add("hidden");
    }
    return isValid;
  }

  // Text, Email, Textarea
  if (!input.value.trim()) {
    if (errorMsg) errorMsg.textContent = `${input.name} is required.`;
    isValid = false;
  } else if (
    input.dataset.min &&
    input.value.trim().length < input.dataset.min
  ) {
    if (errorMsg)
      errorMsg.textContent = `${input.name} must be at least ${input.dataset.min} characters.`;
    isValid = false;
  } else if (input.type === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
      if (errorMsg) errorMsg.textContent = "Enter a valid email address.";
      isValid = false;
    }
  }

  if (!isValid) {
    input.classList.add("border-Red-errors");
    if (errorMsg) errorMsg.classList.remove("hidden");
  } else {
    input.classList.remove("border-Red-errors");
    if (errorMsg) errorMsg.classList.add("hidden");
  }

  return isValid;
}

//validation
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => validateInput(input));
  if (input.type === "radio" || input.type === "checkbox") {
    input.addEventListener("change", () => validateInput(input));
  }
});

// submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  
  form.querySelectorAll("input, textarea").forEach((input) => {
    if (!validateInput(input)) isFormValid = false;
  });

  if (!isFormValid) {
   
    return;
  }

  
  toast.classList.remove("opacity-0", "-translate-y-10", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  
  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "-translate-y-10", "pointer-events-none");
  }, 2500);

  form.reset();
});
