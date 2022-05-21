addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
        (err) => new Response(err.stack, { status: 500 })
        )
    );
});

const codes = {
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative",
    "204": "No Content",
    "206": "Partial Content",
    "207": "Multi-Status",
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "304": "Not Modified",
    "305": "Use Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    /* LOL */
    "418": "I'm a teapot",
    /*...*/
    "422": "Unprocessable Entity",
    /*...*/
    "500": "Internal Server Error",
    /*...*/
    "521": "Web Server Is Down",
};

const categories = [
    "Informational",
    "Successful",
    "Redirection",
    "Client error",
    "Server error"
];

async function handleRequest(request) {
    const { pathname } = new URL(request.url);

    // codes.js request
    if (pathname == "/codes.js") {
        return new Response("let codes=" + JSON.stringify(codes) + ";", {
            headers: {
                "content-type": "text/javascript",
            },
        });
    }

    // No extension or .png request
    if (pathname.length == 4 || (pathname.length == 8 && pathname.substring(4, 8).toLowerCase() == ".png")) {
        let code = pathname.substring(1, 4);
        if (Object.keys(codes).indexOf(code) > -1) {
            return fetch("https://pweth.github.io/status.pizza/srv/" + code + ".png");
        }
    }

    // .json request
    if (pathname.length == 9 && pathname.substring(4, 9).toLowerCase() == ".json") {
        let code = pathname.substring(1, 4);
        if (Object.keys(codes).indexOf(code) > -1) {
            return new Response(JSON.stringify({
                "code": code,
                "title": codes[code],
                "image": "https://status.pizza/" + code,
                "raw": "https://status.pizza/img/" + code + ".png",
                "category": categories[Math.floor(parseInt(code) / 100) - 1]
            }), {
                headers: {
                    "Content-Type": "application/json" 
                },
            });
        }
    }

    // favicon.ico request
    if (pathname == "/favicon.ico") {
        return fetch("https://pweth.github.io/status.pizza/favicon.png");
    }

    // Attempt to return static asset from GitHub
    let static = await fetch("https://pweth.github.io/status.pizza" + pathname);
    if (static.status == 200) {
        return static;
    } else {
        return fetch("https://pweth.github.io/status.pizza/srv/404.png");
    }
}
