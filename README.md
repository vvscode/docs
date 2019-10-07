# Publication and deployment

We have chosen to go with an solution provided by [readme](www.readme.io) to host our documentation.

There's not many steps needed to get your content up.

## 1. Clone the repo

```text
https://github.com/sinch/docs.git
```

## 2. Write!

If you're new to Markdown or need to update your knowledge check out this [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

### Callouts

To use callouts and the benefit of having them styled with CSS they should be written as follows:

```text
> **Note**
>
> Here's some very informational text.
```

You can use any of the following titles in the note:
- note
- info
- information
- success
- warning
- important
- update

[](images/callouts.png)

### Filenames

The structure is important and so are the filenames.

[](images/structure.png)

A folder in `docs/...` level will be the *category name*. In the example above the folder `whatsapp` will the category name on the hosted site. To add a new category to the documentation, it is needed to edit the file `config.yml` in the root folder.
