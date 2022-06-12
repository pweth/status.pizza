let files = [];
for (let code of Object.keys(codes)) {
    let anchor = document.createElement("a");
    anchor.href = "https://status.pizza/" + code;
    anchor.setAttribute("target", "_blank");
    let content = document.createElement("content");
    let image = document.createElement("img");
    image.src = "https://static.status.pizza/" + code + ".png";
    image.draggable = false;
    content.appendChild(image);
    let disp = document.createElement("span");
    disp.innerHTML = code;
    content.appendChild(disp);
    let desc = document.createElement("span");
    desc.innerHTML = codes[code];
    content.appendChild(desc);
    anchor.appendChild(content);
    document.getElementById("ship").appendChild(anchor);
    files.push(code);
}
new Typed("#code", {
    strings: files,
    shuffle: true,
    typeSpeed: 100,
    backSpeed: 50,
    smartBackspace: false,
    loop: true,
    backDelay: 2500
});
document.getElementById("scroll").addEventListener("click", () => {
    document.getElementById("pizza").scrollIntoView({ 
        behavior: "smooth" 
    });
});
