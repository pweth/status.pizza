addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request, event).catch(
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
    "406": "Not Acceptable",
    "410": "Gone",
    "416": "Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "425": "Too Early",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "521": "Web Server Is Down",
};

const categories = [
    "Informational",
    "Successful",
    "Redirection",
    "Client error",
    "Server error"
];



async function handleRequest(request, event) {
    const { pathname } = new URL(request.url);
    const cache = caches.default;

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
            // Check if request has been cached
            let response = await cache.match(request);
            // Otherwise, return image from KV
            if (!response) {
                let file = await PIZZA.get(code, {type: "arrayBuffer"});
                response = new Response(file, {
                    headers: {
                        "content-type": "image/png; charset=UTF-8",
                    },
                    status: 200
                });
                event.waitUntil(cache.put(request, response.clone()));
            }
            return response;
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
                "raw": "https://static.status.pizza/" + code + ".png",
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
        return Response.redirect("https://status.pizza/404", 302);
    }
}
