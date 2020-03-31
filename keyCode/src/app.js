const keyEl = document.getElementById("key");
const container = document.getElementById("container");
const notify = document.getElementById("notify");
let key, keyCode, eventWhich, eventLocation;
const copyToClipboard = () => {};
const getKey = e => {
  key = e.key;
  keyCode = e.code;
  eventWhich = e.which;
  eventLocation = e.location;

  const root = `
  <h1>${eventWhich}</h1>
  <div id="result" class="grid">
      <div class="key">
        <div class="title">event.key</div>
        <h3>${key}</h3>
      </div>

      <div class="key">
        <div class="title">event.location</div>
         <h3>${eventLocation}</h3>
     </div>

     <div class="key">
       <div class="title">event.which</div>
       <h3>${eventWhich}</h3>
    </div>

    <div class="key">
      <div class="title">event.code</div>
       <h3>${keyCode}</h3>
    </div>

  </div>

  <footer>
  <p class="footer">Inspired from Wes Bos <a href="https://keycode.info/" target="_blank" class="footer-link">keycode.info</a>
  </footer>
  `;

  container.innerHTML = root;
};

const addStatus = () => {
  const p = document.createElement("p");
  p.className = "status";
  p.innerText = "Text Copied To Clipboard 👍";

  notify.appendChild(p);
  setTimeout(function() {
    p.remove();
  }, 1500);
};

window.addEventListener("keydown", getKey);

document.body.addEventListener("click", e => {
  const textarea = document.createElement("textarea");
  const value = e.target.innerText;

  if (!value) {
    return;
  }

  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.select();
  textarea.remove();

  addStatus();
});
