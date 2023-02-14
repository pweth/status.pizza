const pizza = async () => {
    const response = await fetch("/all.json");
    const codes = await response.json();
    const files = [];
    console.log(codes);
    for (let code of Object.keys(codes)) {
        const anchor = document.createElement("a");
        anchor.href = `/${code}`;
        anchor.setAttribute("target", "_blank");
        const content = document.createElement("content");
        const image = document.createElement("img");
        image.src = `/img/${code}.png`;
        image.draggable = false;
        content.appendChild(image);
        const disp = document.createElement("span");
        disp.innerHTML = code;
        content.appendChild(disp);
        const desc = document.createElement("span");
        desc.innerHTML = codes[code];
        content.appendChild(desc);
        anchor.appendChild(content);
        document.getElementById("codes").appendChild(anchor);
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
};
document.getElementById("scroll").addEventListener("click", () => {
    document.getElementById("pizza").scrollIntoView({ 
        behavior: "smooth" 
    });
});
pizza();
