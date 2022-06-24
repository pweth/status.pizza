<div align="center">
<h1>🍕 Status Pizza</h1>

[![406: Not Acceptable](https://status.pizza/406.png)](https://status.pizza)
</div>

## ⚙️ How do I use it?

### Standard

To request a captioned status code image, simply format the request as shown below:

`https://status.pizza/[CODE]`

You can optionally specify a PNG file extension:

`https://status.pizza/[CODE].png`

### JSON

To receive a JSON object containing status code metadata and URLs for both the captioned and raw images, add a JSON file extension:

`https://status.pizza/[CODE].json`

The object you receive will have the following format:

```
{
	"code": "[CODE]",
	"title": "[CODE_TITLE]",
	"image": "https://status.pizza/[CODE]",
	"raw": "https://static.status.pizza/[CODE].png",
	"category": "[CODE_CATEGORY]"
}
```

That\'s it; you are now a certified Status Pizza expert!

## 📮 Can I submit pizzas?

Yes please!

Feel free to create PRs on this repository, updating `.cloudflare/worker.js` and `img/[CODE].png` accordingly.

Alternatively please email a **500x500 PNG**, along with the status code, to [hello@status.pizza](mailto:hello@status.pizza).

## 🙌 Acknowledgements

- Status Pizza is powered by [GitHub Pages](https://pages.github.com/) and [Cloudflare Workers](https://workers.cloudflare.com/)
- This project was inspired by [HTTP Cats](https://http.cat)
- There was a [previous Status Pizza project](https://github.com/cmrnh/status.pizza); so long, and thanks for all the fish
