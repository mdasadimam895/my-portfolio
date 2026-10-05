/* =====================================================
   MD ASAD IMAM PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */


/* ================= SETTINGS ================= */

const ADMIN_PASSWORD = "admin123";

/*
  Formspree endpoint yahan add kar sakte ho.

  Example:
  const FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";

  Agar blank rahega to form direct email option batayega.
*/
const FORM_ENDPOINT = "";

const STORAGE_KEY = "asad_portfolio_v2";


/* ================= DEFAULT DATA ================= */

const DEFAULTS = {

  name: "MD ASAD IMAM",

  title:
    "Computer Science & Engineering Student | Coder | Website Developer | Portfolio Maker",

  tagline:
    "I build modern websites, explore new technologies and turn creative ideas into practical digital experiences.",

  hero: "",

  cv: "",

  cvName: "",


  edu:
    "B.Tech in Computer Science & Engineering (2025–2029) — currently pursuing. Completed 12th from BSEB and 10th from CBSE.",


  bio:
    "I am a Computer Science and Engineering student passionate about coding, web development and creating modern digital experiences. I enjoy turning ideas into functional websites and interactive projects while continuously learning new technologies.",


  focus: [
    "Coding",
    "Web Development",
    "Problem Solving",
    "Portfolio Development"
  ],


  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "C / C++",
    "Git & GitHub"
  ],


  journey: [

    {
      y: "2025",
      t: "Started B.Tech in CSE",
      d: "Began my Computer Science & Engineering journey."
    },

    {
      y: "2025–Present",
      t: "Learning programming fundamentals",
      d: "Building a strong foundation in programming and computer science."
    },

    {
      y: "2025–Present",
      t: "Building websites and personal projects",
      d: "Creating responsive websites and experimenting with modern web technologies."
    },

    {
      y: "Future",
      t: "Internships & Open Source",
      d: "Looking forward to gaining real-world experience."
    }

  ],


  gallery: [

    {
      t: "Coding Workspace",
      img: ""
    },

    {
      t: "Developer Setup",
      img: ""
    },

    {
      t: "Project Work",
      img: ""
    }

  ],


  email: "mdasadimam895@gmail.com",

  phone: "6203220026",

  loc: "Kolkata, India",

  github: "",

  linkedin: "",

  instagram: ""

};


/* ================= LOAD DATA ================= */

let D;

try {

  const saved =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );

  D = {
    ...DEFAULTS,
    ...saved
  };

} catch {

  D = {
    ...DEFAULTS
  };

}


/* ================= HELPERS ================= */

const $ = selector =>
  document.querySelector(selector);


function escapeHTML(value) {

  return String(value ?? "").replace(
    /[&<>"']/g,

    character => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"

    })[character]
  );

}


function makeTags(items = []) {

  return items
    .map(
      item =>
        `<span class="tag">${escapeHTML(item)}</span>`
    )
    .join("");

}


function toast(message) {

  const box = $("#toast");

  box.textContent = message;

  box.style.display = "block";

  setTimeout(() => {

    box.style.display = "none";

  }, 2500);

}


/* ================= RENDER WEBSITE ================= */

function render() {


  /* ---------- HERO ---------- */

  const nameParts =
    escapeHTML(D.name).split(" ");

  const lastName =
    nameParts.pop();

  $("#hName").innerHTML =
    `${nameParts.join(" ")} <span class="gradient-text">${lastName}</span>`;


  $("#hTitle").textContent =
    D.title;


  $("#hTag").textContent =
    D.tagline;


  /* ---------- PROFILE PHOTO ---------- */

  const photo =
    $("#photo");

  if (D.hero) {

    photo.src = D.hero;

    photo.style.display = "block";

  } else {

    photo.style.display = "none";

  }


  /* ---------- CV ---------- */

  const cv =
    $("#cvBtn");

  if (D.cv) {

    cv.href = D.cv;

    cv.download =
      D.cvName || "CV.pdf";

    cv.onclick = null;

  } else {

    cv.removeAttribute("href");

    cv.onclick = event => {

      event.preventDefault();

      toast(
        "CV abhi upload nahi hui. Admin panel se upload karein."
      );

    };

  }


  /* ---------- SOCIAL LINKS ---------- */

  const socialLinks = [

    ["GitHub", D.github],

    ["LinkedIn", D.linkedin],

    ["Instagram", D.instagram],

    [
      "Email",
      D.email
        ? `mailto:${D.email}`
        : ""
    ]

  ];


  $("#hSoc").innerHTML =

    socialLinks

      .filter(item => item[1])

      .map(
        ([name, url]) => `
          <a
            href="${escapeHTML(url)}"
            target="_blank"
            rel="noopener noreferrer">
            ${escapeHTML(name)}
          </a>
        `
      )

      .join("");


  $("#fSoc").innerHTML =

    socialLinks

      .slice(0, 3)

      .filter(item => item[1])

      .map(
        ([name, url]) => `
          <a
            href="${escapeHTML(url)}"
            target="_blank"
            rel="noopener noreferrer">
            ${escapeHTML(name)}
          </a>
        `
      )

      .join("");


  /* ---------- SNAPSHOT ---------- */

  $("#sEdu").textContent =
    D.edu;

  $("#sFocus").innerHTML =
    makeTags(D.focus);

  $("#sTech").innerHTML =
    makeTags(D.skills);


  /* ---------- ABOUT ---------- */

  $("#aBio").textContent =
    D.bio;

  $("#aEdu").textContent =
    D.edu;

  $("#aSk").innerHTML =
    makeTags(D.skills);


  /* ---------- JOURNEY ---------- */

  $("#tl").innerHTML =

    D.journey.length

      ? D.journey
          .map(
            item => `

              <div class="timeline-item">

                <small>
                  ${escapeHTML(item.y)}
                </small>

                <h3>
                  ${escapeHTML(item.t)}
                </h3>

                <p class="muted">
                  ${escapeHTML(item.d)}
                </p>

              </div>

            `
          )
          .join("")

      : `<p class="muted">
           Abhi kuch add nahi hua.
         </p>`;


  /* ---------- GALLERY ---------- */

  $("#gal").innerHTML =

    D.gallery.length

      ? D.gallery
          .map(
            (item, index) => {

              if (item.img) {

                return `

                  <div
                    class="gallery-item"
                    data-index="${index}">

                    <img
                      src="${item.img}"
                      alt="${escapeHTML(item.t)}"
                      loading="lazy">

                    <span>
                      ${escapeHTML(item.t)}
                    </span>

                  </div>

                `;

              }

              return `

                <div
                  class="gallery-item"
                  data-index="${index}">

                  📷
                  ${escapeHTML(item.t)}

                </div>

              `;

            }
          )
          .join("")

      : `<p class="muted">
           Abhi koi photo nahi hai.
         </p>`;


  /* ---------- CONTACT ---------- */

  $("#cNm").textContent =
    D.name;

  $("#cLo").textContent =
    D.loc || "—";

  $("#cEm").textContent =
    D.email || "—";

  $("#cPh").textContent =
    D.phone || "—";


  /* ---------- FOOTER ---------- */

  $("#fN").textContent =
    D.name;

  $("#fT").textContent =
    D.title;

}


/* INITIAL RENDER */

render();


/* =====================================================
   MOBILE MENU
===================================================== */

$("#bg").addEventListener(
  "click",
  () => {

    $("#menu")
      .classList
      .toggle("open");

  }
);


$("#menu").addEventListener(
  "click",
  event => {

    if (
      event.target.tagName === "A"
    ) {

      $("#menu")
        .classList
        .remove("open");

    }

  }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll(
    "header, section"
  );

const navLinks =
  document.querySelectorAll(
    "#menu a"
  );


function updateNavigation() {

  let current = "";

  sections.forEach(section => {

    if (
      window.scrollY >=
      section.offsetTop - 160
    ) {

      current =
        section.getAttribute("id");

    }

  });


  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${current}`
    ) {

      link.classList.add("active");

    }

  });

}


window.addEventListener(
  "scroll",
  updateNavigation
);

updateNavigation();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target
            .classList
            .add("visible");

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.08
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(element =>
    observer.observe(element)
  );


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

$("#gal").addEventListener(
  "click",
  event => {

    const item =
      event.target.closest(
        ".gallery-item"
      );

    if (!item) return;


    const index =
      Number(
        item.dataset.index
      );


    const data =
      D.gallery[index];


    if (!data || !data.img) {

      toast(
        "Is gallery item mein image nahi hai."
      );

      return;

    }


    $("#lb img").src =
      data.img;

    $("#lbc").textContent =
      data.t;


    $("#lb")
      .classList
      .add("active");

  }
);


$("#lb").addEventListener(
  "click",
  () => {

    $("#lb")
      .classList
      .remove("active");

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      $("#lb")
        .classList
        .remove("active");

      closeAd();

    }

  }
);


/* =====================================================
   HERO TYPING
===================================================== */

const codeLines = [

  `<span class="keyword">const</span> developer = <span class="string">"MD ASAD IMAM"</span>;`,

  ``,

  `<span class="keyword">function</span> <span class="function">buildWebsite</span>() {`,

  `  <span class="keyword">return</span> <span class="string">"Creative Digital Experience"</span>;`,

  `}`

];


const codeSource =
  codeLines.join("\n");


const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


let charCount = 0;


const totalCharacters =
  codeSource.replace(
    /<[^>]+>/g,
    ""
  ).length;


function typeCode() {

  charCount++;

  let output = "";

  let visibleCharacters = 0;

  let insideTag = false;


  for (
    const character of codeSource
  ) {

    if (
      character === "<"
    ) {

      insideTag = true;

    }


    if (
      !insideTag &&
      visibleCharacters >= charCount
    ) {

      break;

    }


    output += character;


    if (!insideTag) {

      visibleCharacters++;

    }


    if (
      character === ">"
    ) {

      insideTag = false;

    }

  }


  $("#code").innerHTML =
    output +
    `<span class="cursor"></span>`;


  if (
    charCount < totalCharacters
  ) {

    setTimeout(
      typeCode,
      reduceMotion ? 0 : 35
    );

  }

}


typeCode();


/* =====================================================
   CONTACT FORM
===================================================== */

$("#cf").addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    const form =
      event.target;


    const data =
      Object.fromEntries(
        new FormData(form)
      );


    const errors = {};


    if (
      data.name.trim().length < 2
    ) {

      errors.name =
        "Please enter your name.";

    }


    if (
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/
        .test(data.email)
    ) {

      errors.email =
        "Please enter a valid email.";

    }


    if (
      data.message.trim().length < 10
    ) {

      errors.message =
        "Message should contain at least 10 characters.";

    }


    document
      .querySelectorAll(
        ".error[data-e]"
      )
      .forEach(element => {

        element.textContent =
          errors[
            element.dataset.e
          ] || "";

      });


    if (
      Object.keys(errors).length
    ) {

      return;

    }


    const status =
      $("#st");


    /* No endpoint */

    if (!FORM_ENDPOINT) {

      status.style.color =
        "var(--accent)";

      status.innerHTML = `
        Form validation successful.
        <br>
        <a
          href="mailto:${D.email}?subject=Portfolio Contact&body=${encodeURIComponent(
            data.message
          )}">
          Click here to send through email →
        </a>
      `;

      return;

    }


    /* Form endpoint available */

    status.textContent =
      "Sending...";


    try {

      const response =
        await fetch(
          FORM_ENDPOINT,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "Accept":
                "application/json"
            },

            body:
              JSON.stringify(data)

          }
        );


      if (!response.ok) {

        throw new Error(
          "Request failed"
        );

      }


      status.style.color =
        "var(--success)";

      status.textContent =
        "Message Sent ✓";


      form.reset();


    } catch {

      status.style.color =
        "var(--danger)";

      status.textContent =
        "Something went wrong. Please try again.";

    }

  }
);


/* =====================================================
   ADMIN PANEL
===================================================== */

const admin =
  $("#ad");


let workingData;


function closeAd() {

  admin.classList
    .remove("active");

}


$("#adminOpen").addEventListener(
  "click",
  event => {

    event.preventDefault();

    admin.classList
      .add("active");


    if (
      sessionStorage.getItem(
        "asad_admin"
      ) === "1"
    ) {

      openPanel();

    }

  }
);


/* ================= ADMIN LOGIN ================= */

$("#loginBtn").addEventListener(
  "click",
  loginAdmin
);


$("#pw").addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      loginAdmin();

    }

  }
);


function loginAdmin() {

  if (
    $("#pw").value ===
    ADMIN_PASSWORD
  ) {

    sessionStorage.setItem(
      "asad_admin",
      "1"
    );

    openPanel();

  } else {

    $("#pwe").textContent =
      "Incorrect password.";

  }

}


/* ================= IMAGE PROCESSING ================= */

function processImage(
  file,
  maxSize,
  callback
) {

  const reader =
    new FileReader();


  reader.onload = () => {

    const image =
      new Image();


    image.onload = () => {

      const scale =
        Math.min(
          1,
          maxSize /
          Math.max(
            image.width,
            image.height
          )
        );


      const canvas =
        document.createElement(
          "canvas"
        );


      canvas.width =
        image.width * scale;

      canvas.height =
        image.height * scale;


      const context =
        canvas.getContext("2d");


      context.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );


      callback(
        canvas.toDataURL(
          "image/jpeg",
          0.8
        )
      );

    };


    image.src =
      reader.result;

  };


  reader.readAsDataURL(file);

}


/* ================= OPEN ADMIN ================= */

function openPanel() {

  workingData =
    JSON.parse(
      JSON.stringify(D)
    );


  $("#login").style.display =
    "none";


  $("#panel").style.display =
    "block";


  drawPanel();

}


/* ================= FORM FIELD ================= */

function adminField(
  label,
  key,
  textarea = false
) {

  if (textarea) {

    return `

      <label>
        ${label}
      </label>

      <textarea
        rows="4"
        data-key="${key}"
      >${escapeHTML(
        workingData[key]
      )}</textarea>

    `;

  }


  return `

    <label>
      ${label}
    </label>

    <input
      data-key="${key}"
      value="${escapeHTML(
        workingData[key]
      )}">

  `;

}


/* ================= DRAW ADMIN ================= */

function drawPanel() {

  $("#panel").innerHTML = `

    <h2>
      ⚙ Admin Panel
    </h2>


    <!-- HERO -->

    <h3>Hero Section</h3>

    ${adminField(
      "Name",
      "name"
    )}

    ${adminField(
      "Professional Title",
      "title"
    )}

    ${adminField(
      "Tagline",
      "tagline",
      true
    )}


    <label>
      Profile Photo
    </label>

    <input
      type="file"
      id="heroUpload"
      accept="image/*">


    ${
      workingData.hero
        ? `
          <img
            src="${workingData.hero}"
            width="90"
            style="
              margin-top:8px;
              border-radius:50%;
            ">
        `
        : ""
    }


    <label>
      CV PDF
    </label>

    <input
      type="file"
      id="cvUpload"
      accept="application/pdf">


    <div class="muted">
      ${
        workingData.cv
          ? `✅ ${escapeHTML(
              workingData.cvName
            )}`
          : "No CV uploaded"
      }
    </div>


    <!-- ABOUT -->

    <h3>About</h3>

    ${adminField(
      "Education",
      "edu",
      true
    )}

    ${adminField(
      "Bio",
      "bio",
      true
    )}


    <label>
      Focus
      <small>
        comma separated
      </small>
    </label>

    <input
      data-list="focus"
      value="${escapeHTML(
        workingData.focus.join(", ")
      )}">


    <label>
      Skills
      <small>
        comma separated
      </small>
    </label>

    <input
      data-list="skills"
      value="${escapeHTML(
        workingData.skills.join(", ")
      )}">


    <!-- JOURNEY -->

    <h3>Journey</h3>

    ${
      workingData.journey
        .map(
          (item, index) => `

            <div class="admin-row">

              <button
                class="admin-delete"
                data-delete="journey,${index}">
                ✕
              </button>


              <label>
                Year
              </label>

              <input
                data-array="journey,${index},y"
                value="${escapeHTML(
                  item.y
                )}">


              <label>
                Title
              </label>

              <input
                data-array="journey,${index},t"
                value="${escapeHTML(
                  item.t
                )}">


              <label>
                Description
              </label>

              <input
                data-array="journey,${index},d"
                value="${escapeHTML(
                  item.d
                )}">

            </div>

          `
        )
        .join("")
    }


    <button
      class="btn"
      data-add="journey">
      + Add Journey
    </button>


    <!-- GALLERY -->

    <h3>Gallery</h3>

    ${
      workingData.gallery
        .map(
          (item, index) => `

            <div class="admin-row">

              <button
                class="admin-delete"
                data-delete="gallery,${index}">
                ✕
              </button>


              <label>
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                data-gallery="${index}">


              ${
                item.img
                  ? `
                    <img
                      src="${item.img}"
                      width="100"
                      style="
                        display:block;
                        margin-top:8px;
                        border-radius:8px;
                      ">
                  `
                  : ""
              }


              <label>
                Title
              </label>

              <input
                data-array="gallery,${index},t"
                value="${escapeHTML(
                  item.t
                )}">

            </div>

          `
        )
        .join("")
    }


    <button
      class="btn"
      data-add="gallery">
      + Add Photo
    </button>


    <!-- CONTACT -->

    <h3>
      Contact & Social
    </h3>

    ${adminField(
      "Email",
      "email"
    )}

    ${adminField(
      "Phone",
      "phone"
    )}

    ${adminField(
      "Location",
      "loc"
    )}

    ${adminField(
      "GitHub URL",
      "github"
    )}

    ${adminField(
      "LinkedIn URL",
      "linkedin"
    )}

    ${adminField(
      "Instagram URL",
      "instagram"
    )}


    <!-- BUTTONS -->

    <div class="save-bar">

      <button
        class="btn primary"
        id="saveData">
        💾 Save
      </button>

      <button
        class="btn"
        id="resetData">
        Reset
      </button>

      <button
        class="btn"
        onclick="closeAd()">
        Close
      </button>

    </div>

  `;

}


/* ================= ADMIN INPUT ================= */

$("#panel").addEventListener(
  "input",
  event => {

    const element =
      event.target;


    /* Normal field */

    if (
      element.dataset.key
    ) {

      workingData[
        element.dataset.key
      ] =
        element.value;

    }


    /* List */

    if (
      element.dataset.list
    ) {

      workingData[
        element.dataset.list
      ] =
        element.value
          .split(",")
          .map(
            item => item.trim()
          )
          .filter(Boolean);

    }


    /* Array */

    if (
      element.dataset.array
    ) {

      const [
        arrayName,
        index,
        property
      ] =
        element.dataset.array
          .split(",");


      workingData[
        arrayName
      ][
        Number(index)
      ][property] =
        element.value;

    }

  }
);


/* ================= ADMIN CLICKS ================= */

$("#panel").addEventListener(
  "click",
  event => {

    const element =
      event.target;


    /* Delete */

    if (
      element.dataset.delete
    ) {

      const [
        arrayName,
        index
      ] =
        element.dataset.delete
          .split(",");


      workingData[
        arrayName
      ].splice(
        Number(index),
        1
      );


      drawPanel();

      return;

    }


    /* Add */

    if (
      element.dataset.add
    ) {

      if (
        element.dataset.add ===
        "journey"
      ) {

        workingData.journey.push({

          y: "2026",

          t: "New Journey",

          d: "Description"

        });

      }


      if (
        element.dataset.add ===
        "gallery"
      ) {

        workingData.gallery.push({

          t: "New Photo",

          img: ""

        });

      }


      drawPanel();

      return;

    }


    /* SAVE */

    if (
      element.id ===
      "saveData"
    ) {

      try {

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(
            workingData
          )
        );


        D = {
          ...DEFAULTS,
          ...workingData
        };


        render();


        toast(
          "✅ Portfolio saved successfully!"
        );

      } catch {

        toast(
          "Storage full. Use smaller images."
        );

      }

      return;

    }


    /* RESET */

    if (
      element.id ===
      "resetData"
    ) {

      if (
        confirm(
          "Are you sure you want to reset everything?"
        )
      ) {

        localStorage.removeItem(
          STORAGE_KEY
        );


        D = {
          ...DEFAULTS
        };


        render();

        openPanel();

        toast(
          "Portfolio reset."
        );

      }

    }

  }
);


/* ================= FILE UPLOADS ================= */

$("#panel").addEventListener(
  "change",
  event => {

    const element =
      event.target;


    const file =
      element.files &&
      element.files[0];


    if (!file) return;


    /* PROFILE PHOTO */

    if (
      element.id ===
      "heroUpload"
    ) {

      processImage(
        file,
        600,
        image => {

          workingData.hero =
            image;

          drawPanel();

        }
      );

      return;

    }


    /* CV */

    if (
      element.id ===
      "cvUpload"
    ) {

      if (
        file.size >
        2 * 1024 * 1024
      ) {

        toast(
          "CV 2MB se chhoti rakhein."
        );

        return;

      }


      const reader =
        new FileReader();


      reader.onload = () => {

        workingData.cv =
          reader.result;

        workingData.cvName =
          file.name;

        drawPanel();

      };


      reader.readAsDataURL(
        file
      );

      return;

    }


    /* GALLERY */

    if (
      element.dataset.gallery !==
      undefined
    ) {

      const index =
        Number(
          element.dataset.gallery
        );


      processImage(
        file,
        1200,
        image => {

          workingData.gallery[
            index
          ].img =
            image;

          drawPanel();

        }
      );

    }

  }
);


/* =====================================================
   ADMIN HASH
   Open with:

   yourwebsite.com/#admin
===================================================== */

if (
  window.location.hash ===
  "#admin"
) {

  $("#adminOpen").click();

}


/* =====================================================
   OPTIONAL: LOGOUT FROM CONSOLE

   sessionStorage.removeItem("asad_admin");
===================================================== */
