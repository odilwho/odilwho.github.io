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
    <div class="win-body">
      <h1>About Me</h1>
      <p>Hello! I'm Odilwho — I am 15 years old and I'm in 10th Grade.</p>
      <p>I do Digital Art, Graphic Design, and Programming. </p>
      <img src="assets/Profile.jpg" alt="my pfp" style="width: 250px; height: 250px;">
    </div>`;

    if (app === "favorites")
        return `
    <div class="win-body scrollable">
      <h1>My Favorites</h1>
      <p>Here are some of the things I like ♡</p>
      <img src="assets/tribbie.jpg" alt="hsr" style="width: 300px; height: 300px;"><p>A game I play often is HSR, my main DPS is Phainon.</p>
      <p>Other than HSR I like playing REVERSE:1999 too.</p>
      <img src="assets/noo.jpg" alt="noodle" style="width: 300px; height: 300px;"><p>I love eating noodles, especially the spicy ones.</p>
      <img src="assets/tig.jpg" alt="tiger" style="width: 300px; height: 300px;"><p>My favorite animal.</p> 
      <p>Why? Well because they're cute and also amazing in the same time,</p> 
      <p>Other than that it's because I was born in the year of the tiger.</p>
    </div>`;

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



const carousel = new bootstrap.Carousel('#myCarousel')

