# Publication and deployment

We have chosen to go with an solution provided by [readme](https://www.readme.io) to host our documentation.

There's not many steps needed to get your content up.

Anyone can fork and submit pull requests!

## 1. Clone the repo

```text
https://github.com/sinch/docs.git
```

## 2. Write

If you're new to Markdown or need to update your knowledge check out this [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Tips on how to write useful and easy to read [docs](CONTRIBUTING.md)

### Callouts

To use callouts and the benefit of having them styled with CSS they should be written as follows:

```text
> **Note**
>
> Here's some very informational text.
```

You can use any of the following keywords in the note title:
- note
- info
- information
- success
- warning
- important
- update

![Callout examples](/images/callouts.png)

### Filenames

The structure is important and so are the filenames. The filename will be the page slug in the url. I.e. a file that is named `whatsapp-http-rest.md` will have the url: https://developers.sinch.com/docs/whatsapp-http-rest

![Project structure](/images/structure.png)

A folder in `docs/...` level will be the *category name*. In the example above, `docs/whatsapp`, where *Whatsapp* will be the category name on the hosted site. To add a new category to the documentation, it is needed to edit the file `config.yml` in the root folder.

#### Add a New Category

To be able to add a new category you have to have access to [readme dashboard](https://dash.readme.io). There you can add an category, i.e. you want to create a new SMS category called "SMS SMPP", in `/docs` the corresponding folder name would be `sms-smpp` and the path `/docs/sms-smpp`. If you do not have access do the dashboard you can ask [Amar V](mailto:amar.vrbanjac@sinch.com) to give you access, or to create the desired category.

An `.md` file in `whatsapp`-directory will also be on the first level in the side navigation. Examples in the above picture are `whatsapp-introduction.md` and `whatsapp-http-rest.md`.

#### Sub-navigation

If you wish to have sub-navigation in the side-navigation in the hosted site - create a folder with the same name as the file that you wish to have sub-navigation. There are only two navigation levels possible in the side navigation. In the picture above: we want `WhatsApp REST API` to have sub-levels and therefore need to add a folder that has the same name as the file that has the title of `WhatsApp REST API`, in this case `whatsapp-http-rest.md`. Any files placed in the created folder `whatsapp-http-rest` will be in the sub-navigation.

### Cross-referencing

You can cross reference to a document or to a section within an document.

To reference to the Introduction in the WhatsApp category just use the page slug (file name), like this `[readable text](doc:whatsapp-introduction)`. This reference can be used on any page. If you want to reference to a section in the introduction  `[readable text](doc:whatsapp-introduction#section-[heading title])`. `#section-` should be prepended to the heading title that you want to reference.

All headings will be referenceable.

### URLs

When you want to create an link such as `[sinch](https://wwww.sinch.com)` make sure to use the full URL, with `https://`. Otherwise the URL will not work.

### Images

Images are referenced relative to the document that shows the image.

![Image reference](/images/image-ref.png)

## 3. Deploy

To deploy you just have to push to master - it will be live within minutes.
