const codes = {
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",
    "103": "Early Hints",
    "110": "Response is Stale",
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
    "306": "Switch Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "406": "Not Acceptable",
    "410": "Gone",
    "414": "URI Too Long",
    "416": "Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "420": "Enhance Your Calm",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "425": "Too Early",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "521": "Web Server Is Down",
    "530": "Site is Frozen"
};

const categories = [
    "Informational",
    "Successful",
    "Redirection",
    "Client error",
    "Server error"
];

export async function onRequestGet(context) {
    const code = context.params.code;
    if (code == "all") {
        return new Response(JSON.stringify(codes), {
            headers: {
                "content-type": "application/json",
            },
        });
    } else if (Object.keys(codes).indexOf(code) > -1) {
        return new Response(JSON.stringify({
            "code": code,
            "title": codes[code],
            "image": `https://status.pizza/${code}`,
            "raw": `https://status.pizza/img/${code}.png`,
            "category": categories[Math.floor(parseInt(code) / 100) - 1]
        }), {
            headers: {
                "content-type": "application/json" 
            }
        });
    }
    return await context.next();
};
