let z = 10;

function openWindow(app) {
    const openSound = document.getElementById("openSound");
    openSound.currentTime = 0;
    openSound.play();

    const win = document.createElement("div");
    win.classList.add("window");
    win.style.left = "100px";
    win.style.top = "100px";
    win.style.zIndex = ++z;

    win.innerHTML = `
        <div class="titlebar">
            <span>${app.toUpperCase()}</span>
            <button class="close-btn">×</button>
        </div>
        <div class="win-body">
            ${getWindowContent(app)}
        </div>
    `;

    document.body.appendChild(win);
    makeDraggable(win);

    document.getElementById("empty-desktop-message").classList.add("hidden");

    win.querySelector(".close-btn").addEventListener("click", () => closeWindow(win));

    document.body.appendChild(win);
    
    if (app === "about") {
    const first = win.querySelector(".polaroid");
    if (first) first.classList.add("active");

    if (app === "about") {
    initPolaroidCarousel(win);

    
}

}


}

function closeWindow(win) {
    const closeSound = document.getElementById("closeSound");
    closeSound.currentTime = 0;
    closeSound.play();

    win.remove();

    if (document.querySelectorAll(".window").length === 0) {
        document.getElementById("empty-desktop-message").classList.remove("hidden");
    }
}

function makeDraggable(win) {
    const bar = win.querySelector(".titlebar");
    let x = 0, y = 0, isDown = false;

    bar.addEventListener("mousedown", e => {
        isDown = true;
        x = e.clientX - win.offsetLeft;
        y = e.clientY - win.offsetTop;
        win.style.zIndex = ++z;
    });

    document.addEventListener("mousemove", e => {
        if (!isDown) return;
        win.style.left = (e.clientX - x) + "px";
        win.style.top = (e.clientY - y) + "px";
    });

    document.addEventListener("mouseup", () => isDown = false);
}

function getWindowContent(app) {
    if (app === "home")
        return `
    <div class="win-body">
      <h1>Welcome!</h1>
      <p>This is my little website where I share what I like! ♡</p>
      <p>Here you can get to know a bit about me </p>
      <img src="assets/tree.png.gif" alt="home image" style=" width: 500px; height: 238px;">
    </div>`;

    if (app === "about")
        return `<h3>
    <div class="win-body scrollable">
      <h1>About Me</h1>
      <p>Hello! I'm Odilwho — I am 15 years old and I'm in 10th Grade.</p>
      <p>I do Digital Art, Graphic Design, and Programming. </p>
      <img src="assets/Profile.jpg" alt="my pfp" style="width: 300px; height: 300px;">
      <h2>My Hobbies!</h2>
        <!-- About content (use inside your About window HTML) -->
        <div class="polaroid-carousel">
         <div class="polaroid-frame">
         <button class="arrow left">‹</button>
        <div class="polaroid active" data-caption="Playing Cello">
         <img src="assets/cello.jpg" alt="cello">
        </div>
        <div class="polaroid" data-caption="Gaming!">
        <img src="assets/game.gif" alt="gamin">
        </div>
        <div class="polaroid" data-caption="Drawing">
        <img src="assets/art.jpg" alt="draw">
        </div>
        <button class="arrow right">›</button>
        </div>
        <div class="polaroid-caption">Me enjoying a sunny day!</div>
      </div>
    </div>`;

    if (app === "favorites") {
    return `
        <div class="win-body scrollable">

            <h2 class="section-title">My Favorites ♡</h2>
            <p style="text-align:center; max-width:400px; margin:0 auto 20px; color:#6b5860;">
                Here are three things that make me super happy - that makes me, me:
            </p>

            <div class="about-card-group">

                <div class="about-card">
                    <img src="assets/tribbie.jpg" style="width: 300px; height: 300px;">
                    <h3>🎮 Game</h3>
                    <p>I've been playing HSR a lot lately, my main DPS is Phainon.</p>
                    <p>Other than HSR, I like playing REVERSE:1999 ♡</p>
                </div>

                <div class="about-card">
                    <img src="assets/noo.jpg" style="width: 300px; height: 300px;">
                    <h3>🍜 Food</h3>
                    <p>Love eating noodles every once a red moon.</p>
                </div>

                <div class="about-card">
                    <img src="assets/tig.jpg" style="width: 300px; height: 300px;">
                    <h3>🐯 Animal</h3>
                    <p>Tigers are my goats ♡. They're like big cats yet more vicious.</p>
                </div>

            </div>
            
        </div>
    `;
}

    return "";
}

/* DARK MODE */
document.getElementById("darkModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

win.innerHTML = `
    <div class="titlebar">
        <span>${app.toUpperCase()}</span>
        <button class="close-btn">×</button>
    </div>
    <div class="win-body">
        ${getWindowContent(app)}
    </div>
    <div class="resize-handle"></div>
`;

win.innerHTML = `
    <div class="titlebar">
        <span>${app.toUpperCase()}</span>
        <button class="close-btn">×</button>
    </div>
    <div class="win-body">
        ${getWindowContent(app)}
    </div>
    <div class="resize-handle nw"></div>
    <div class="resize-handle ne"></div>
    <div class="resize-handle sw"></div>
    <div class="resize-handle se"></div>
    <div class="resize-handle n"></div>
    <div class="resize-handle s"></div>
    <div class="resize-handle e"></div>
    <div class="resize-handle w"></div>
`;

/* -----------------------------------
     POLAROID CAROUSEL LOGIC
----------------------------------- */
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("pol-btn")) {
        const win = e.target.closest(".window");
        const photos = win.querySelectorAll(".polaroid");

        if (!photos.length) return;

        let index = parseInt(win.getAttribute("data-pol-index") || "0");

        if (e.target.classList.contains("left")) {
            index = (index - 1 + photos.length) % photos.length;
        } else {
            index = (index + 1) % photos.length;
        }

        // hide all
        photos.forEach(p => p.classList.remove("active"));

        // show new one
        photos[index].classList.add("active");

        // save index
        win.setAttribute("data-pol-index", index);
    }
});

/* ---------------------------------------------------------
   POLAROID CAROUSEL LOGIC
--------------------------------------------------------- */
function initPolaroidCarousel(win) {
  const frame = win.querySelector(".polaroid-frame");
  if (!frame) return;

  const polaroids = Array.from(frame.querySelectorAll(".polaroid"));
  const left = frame.querySelector(".arrow.left");
  const right = frame.querySelector(".arrow.right");
  const captionBox = win.querySelector(".polaroid-caption");

  if (!polaroids.length) return;

  let index = 0;

  function show(i) {
    polaroids.forEach(p => p.classList.remove("active"));
    polaroids[i].classList.add("active");
    if (captionBox) captionBox.textContent = polaroids[i].dataset.caption || "";
    // ensure active is top visual
    polaroids[i].style.zIndex = 10;
  }

  // arrows
  if (right) right.addEventListener("click", (e) => {
    e.stopPropagation();
    index = (index + 1) % polaroids.length;
    show(index);
  });
  if (left) left.addEventListener("click", (e) => {
    e.stopPropagation();
    index = (index - 1 + polaroids.length) % polaroids.length;
    show(index);
  });

  // click to next
  polaroids.forEach(p => {
    p.addEventListener("click", (e) => {
      e.stopPropagation();
      index = (index + 1) % polaroids.length;
      show(index);
    });
  });

  // init
  show(0);
}
