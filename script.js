const form = document.querySelector("#registration");
const password = document.querySelector("#password");
const visibility = document.querySelector("#visibility");
const result = document.querySelector("#result");
const bug = document.querySelector("#bug");
const fix = document.querySelector("#fix");
let fixed = false;

function report(message, state = "") {
  result.textContent = message;
  result.dataset.state = state;
}

visibility.addEventListener("click", () => {
  const visible = password.type === "password";
  password.type = visible ? "text" : "password";
  visibility.setAttribute("aria-pressed", String(visible));
  visibility.setAttribute(
    "aria-label",
    visible ? "Скрыть пароль" : "Показать пароль",
  );
  visibility.title = visibility.getAttribute("aria-label");
  if (fixed)
    report(
      visible
        ? "Пароль показан. Форма не отправлена."
        : "Пароль скрыт. Форма не отправлена.",
      "success",
    );
});

// Keep native constraint validation and the accidental submit action observable.
form.addEventListener(
  "invalid",
  () => {
    report("Попытка отправки: проверьте поля формы.", "error");
  },
  true,
);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const accidental = event.submitter === visibility;
  report(
    accidental
      ? "Форма отправлена по клику на глазик!"
      : "Аккаунт создан. Форма отправлена.",
    accidental ? "error" : "success",
  );
});

function setMode(value) {
  fixed = value;
  if (fixed) visibility.setAttribute("type", "button");
  else visibility.removeAttribute("type");
  bug.setAttribute("aria-pressed", String(!fixed));
  fix.setAttribute("aria-pressed", String(fixed));
  report("Ожидание отправки");
}
bug.addEventListener("click", () => setMode(false));
fix.addEventListener("click", () => setMode(true));
document.querySelector("#reset").addEventListener("click", () => {
  form.reset();
  password.type = "password";
  visibility.setAttribute("aria-pressed", "false");
  visibility.setAttribute("aria-label", "Показать пароль");
  visibility.title = "Показать пароль";
  report("Ожидание отправки");
});
