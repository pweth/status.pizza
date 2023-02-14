<div align="center">
	<h1>🍕 Status Pizza</h1>
	<a href="https://status.pizza">
		<img src="https://status.pizza/201" width="180">
		<img src="https://status.pizza/406" width="180">
		<img src="https://status.pizza/305" width="180">
	</a>
</div>

---

## How do I use it?

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
	"raw": "https://status.pizza/img/[CODE].png",
	"category": "[CODE_CATEGORY]"
}
```

That\'s it; you are now a certified Status Pizza expert!

## Can I submit a pizza photo?

Yes please!

Feel free to create a PR on this repository or email in your submission to [hello@status.pizza](mailto:hello@status.pizza).

## Acknowledgements

- Status Pizza is powered by [Cloudflare Pages](https://pages.cloudflare.com)
- This project was inspired by [HTTP Cats](https://http.cat)
- There was a [previous Status Pizza project](https://github.com/cmrnh/status.pizza); so long, and thanks for all the fish
