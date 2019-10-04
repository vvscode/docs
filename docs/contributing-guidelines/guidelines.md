---
title: "Documentation guidelines"
excerpt: ""
---
We are changing our writing guidelines and toolset to improve the workflow
between all content creators.

The objectives for the new documentation guidelines are:

- Easy integration with any third-party services we decide to use in the
    future.

- Increase velocity on publishing

- Decrease time for corrections

- Enable others than engineers to edit and publish.

- Plan in public for:
    - Feedback on what docs are most needed.
    - To have the most helpful content on our first release. 
    - Update to make it easier to improve your documentation continuously.

We will use GitHub as the repository for our public facing documentation.

## Two types of documentation formats

Markdown and OAS/Swagger files are the two formats that we use at Sinch

### Markdown

Markdown is the standard for documenting APIs and frameworks on the web today.
It is lightweight, supports inline HTML. Markdown also has a vast choice of
tools and services for us to author and publish markdown files. We use
<https://commonmark.org/> extensions of markdown.

We use Markdown for everything but API reference guides.

### OAS/Swagger

OAS 3 or 2 is the specification for our rest APIs.

OAS enables us to:

- Build API explorers for our documentation sites
- Auto-generate Helper libraries
- You choose to either design first in OAS, or use tools for your language to generate dynamic swagger at build or runtime.

You can find a list of tools [here](#section-tools).

## Best practices and tone of voice

- Check the spelling and grammar in your articles, even if you must copy and
    paste into Microsoft Word to check.
- Use a casual and friendly voice—like you're talking to another person one-on-one.
- Use simple sentences. Easy-to-read sentences mean the reader can quickly use the guidance you share.

### Use a conversational tone

#### Appropriate style

We want our documentation to have a conversational tone. You should feel as
though you are having a conversation with the author as you read any of our
tutorials or explanations. For you, the experience should be informal,
conversational, and informative. Readers should feel as though they are
listening to the author explaining the concepts to them.

#### Inappropriate style

One might see the contrast between a conversational style and the style one
finds with more academic treatments of technical topics. Those resources are
very useful, but the authors have written those articles in a very different
style than our documentation. When one reads an academic journal, one finds a
very different tone and a very different style of writing. One feels that they
are reading a dry account of a very dry topic.

The first paragraph above follows our recommended conversational style. The
second is a more academic style. You see the difference immediately.

### Write in second person

Write as you speak to the reader.

Here are examples of writing in second person in do-it-yourself or how-to
writing:

- To make lemonade, you add the juice of lemons to water and sugar.
- You need to prepare a wall before applying the primer.
- When getting rid of a drain clog, first turn off the water.
- To calculate the area of a room, multiply the width by the length.
- You should use masking tape to hold a windowpane in place before applying glazing compounds.

As you see it doesn’t always have to be “you” in a sentence to make it second
person.

- To add oil to your car engine, unscrew the cap, place a funnel inside, and
    slowly add the oil.

### Focus on intent

Developers have a specific task in mind when they come to our documentation.
Before you start writing, take a moment to think about who the developer is and
what he or she is trying to do.

### Write short

Don’t add words that that is not useful, such as great, a lot, or qualifiers. If
you need to use a qualifier, put it in the beginning of the sentence.

### Use active voice

Remember, the active voice will always add impact to your writing. The active
voice makes it look like you are observing the action; that things are
happening. A passive voice makes it appear that people or objects are just
waiting for stuff to happen to them. The reader will be more engaged when using
active voice.

These active writing tips will help you make your work easy to understand and
coherent.

- Put the subject first. If you want to change passive sentences to active
    ones flip the sentence around so it's clear who is performing the action.
    This helps to reduce the number of words in the sentence too.

- Avoid the passive verb "to be." Overly complicated sentences with these
    additional helping verbs will slow down the reader. More streamlined
    sentences keep the flow going.

- Swap -ing for -ed. Gerunds and present participles (words ending in -ing)
    tend to be more passive that verbs ending in -ed.

- Go easy on the adverbs. While it might be more descriptive to say "quickly
    walked" or "freshly baked," too many adverbs and intensifiers are another
    surefire way to slow down your writing. If your verb isn't strong enough on
    its own, maybe choose a different one.

Read more about active voice
<https://grammar.yourdictionary.com/grammar-rules-and-tips/active-writing-tips.html>

### Screenshots

When you can use a screenshot to save words, do it!

### New concepts

If you are introducing a new service or concept, explain the concept before you
explain why it's useful. It's important to understand what something is before
you can understand the benefits of it.

### Use everyday words but not less technical

We have many users that do not speak English as their first language. Because of
this, avoid Telecom specific words and fancy English words.

Example: Use the term phone number over MSIDN.

You can use terms that are specific to the technology of the target developer.
Not everyone reading your articles has a formal computer science degree. Explain
terms like 'idempotent' if you use it:

“The Close() method is idempotent, meaning that you can call it multiple times
and the effect is the same as if you called it once.”

### Target level for English should be 5th grade

[How To enable Flesch-Kincaid Grade Level
test](https://support.office.com/en-us/article/test-your-document-s-readability-85b4969e-e80a-4777-8dd3-f7fc3c8b3fd2)
in word, or use Hemmingway

### Empathy and honesty

Focus on what matters to the customer, be supportive, and don’t use disclaimers
if possible. Be open about areas that will frustrate our developers

## Tools

### Visual Studio Code Plugins Markdown and authoring

- <https://commonmark.org/>

- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint),
    a popular linter by David Anson.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker),
    an offline spell checker by Street Side Software.

### Markdown Office integration

- <http://www.writage.com/> - Plugin for markdown

- <https://support.office.com/en-us/article/test-your-document-s-readability-85b4969e-e80a-4777-8dd3-f7fc3c8b3fd2> - How to enable readability score

### Swagger/OAS tools

- [https://app.swaggerhub.com](https://app.swaggerhub.com/)
- <http://apiworkbench.com/>
- <https://marketplace.visualstudio.com/items?itemName=mermade.openapi-lint>
- [http://swagger.io](http://swagger.io/)
- <http://editor.swagger.io>
- [https://inspector.swagger.io](https://inspector.swagger.io/)
- [https://stoplight.io](https://stoplight.io/)
- PHP code annotations - <https://github.com/zircote/swagger-php>
- .net code annotations -
    <https://github.com/domaindrivendev/Swashbuckle.AspNetCore>

### General tools for writing

[http://grammarly.com](http://grammarly.com/)

<http://www.hemingwayapp.com/>

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/contributing-guidelines/guidelines.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>