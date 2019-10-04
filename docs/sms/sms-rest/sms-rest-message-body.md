---
title: "Message Body"
excerpt: ""
---
When specifying the message body in the request, the characters used as well as the length of the message affect how many actual SMS messages are sent out. When using [parameterization](doc:sms-rest-parameterization), the length of each message may also vary depending on the recipient-specific data.

### Supported Characters

Individual characters used in the message determine the type of encoding that will ultimately be used to send the SMS message. The API automatically detects the encoding required from the characters used, which allows us to support the delivery of SMS in any language.

#### Basic Character Set

You can send up to 160 characters in a single SMS message if all characters in your message are part of the GSM 7-bit character set:

|      |       |      |     |     |     |     |       |
|-- -  | ---   | ---  | --- | --- | --- | --- | --- --|
| @    | Δ     | `SP` | 0   | ¡   | P   | ¿   | p     |
| £    | _     | !    | 1   | A   | Q   | a   | q     |
| $    | Φ     | "    | 2   | B   | R   | b   | r     |
| ¥    | Γ     | #    | 3   | C   | S   | c   | s     |
| è    | Λ     | ¤    | 4   | D   | T   | d   | t     |
| é    | Ω     | %    | 5   | E   | U   | e   | u     |
| ù    | Π     | &    | 6   | F   | V   | f   | v     |
| ì    | Ψ     | '    | 7   | G   | W   | g   | w     |
| ò    | Σ     | (    | 8   | H   | X   | h   | x     |
| Ç    | Θ     | )    | 9   | I   | Y   | i   | y     |
| `LF` | Ξ     | *    | :   | J   | Z   | j   | z     |
| Ø    | `ESC` | +    | ;   | K   | Ä   | k   | ä     |
| ø    | Æ     | ,    | <   | L   | Ö   | l   | ö     |
| `CR` | æ     | -    | =   | M   | Ñ   | m   | ñ     |
| Å    | ß     | .    | >   | N   | Ü   | n   | ü     |
| å    | É     | /    | ?   | O   | §   | o   | à     |

`LF` is the Line Feed character - for JSON format, provide it as `\n`
`SP` is the Space character

#### Extended Character Set

The following characters are also available, but they are counted as two characters in the SMS message rather than one:

`|` , `^` , `€` , `{` , `}` , `[` , `]` , `~` , `\`

#### Other Characters

If other characters are required for different languages, 16-bit Unicode (UCS-2) encoding will be used. When using UCS-2 encoding, each character will take 2 bytes, which means up to 70 characters can be sent per UCS-2 encoded SMS message.

### Long Messages

The message body in a request can contain up to 1600 characters. Longer messages will be split and sent as multiple distinct SMS messages. In most cases, those messages will be re-assembled on the handset and displayed to the end-user as a single long message. You can use the tables below to determine the actual number of SMS messages your message will use depending on its length and encoding.

#### Using only 7-bit Characters

| Message Length | Number of SMS Parts |
|-- -            | ---               --|
| 1 - 60         | 1                   |
| 161 - 304      | 2                   |
| 305 - 456      | 3                   |
| 457 - 608      | 4                   |
| 609 - 760      | 5                   |
| 761 - 912      | 6                   |
| 913 - 1064     | 7                   |
| 1065 - 1216    | 8                   |
| 1217 - 1368    | 9                   |
| 1369 - 1520    | 10                  |
| 1521 - 1600    | 11                  |

Each SMS in a multi-part 7-bit encoded message, has a maximum length of 152 characters.

#### Using Unicode Characters

| Message Length | Number of SMS Parts |
|-- -            | ---               --|
| 1 - 70         | 1                   |
| 71 - 132       | 2                   |
| 133 - 198      | 3                   |
| 199 - 264      | 4                   |
| 265 - 330      | 5                   |
| 331 - 396      | 6                   |
| 397 - 462      | 7                   |
| 463 - 528      | 8                   |
| 529 - 594      | 9                   |
| 595 - 660      | 10                  |
| 661 - 726      | 11                  |
| 727 - 792      | 12                  |
| 793 - 858      | 13                  |
| 859 - 924      | 14                  |
| 925 - 990      | 15                  |
| 991 - 1056     | 16                  |
| 1057 - 1122    | 17                  |
| 1123 - 1188    | 18                  |
| 1189 - 1254    | 19                  |
| 1255 - 1320    | 20                  |
| 1321 - 1386    | 21                  |
| 1387 - 1452    | 22                  |
| 1453 - 1518    | 23                  |
| 1519 - 1584    | 24                  |
| 1585 - 1600    | 25                  |

Each SMS in a multi-part Unicode encoded message, has a maximum length of 66
characters.


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-message-body.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>