---
title: "Message Body"
excerpt: ""
---
When specifying the message body in the request, the characters used as well as the length of the message affect how many actual SMS messages are sent out. When using [parameterization](doc:parameterization), the length of each message may also vary depending on the recipient-specific data.

### Supported Characters

Individual characters used in the message determine the type of encoding that will ultimately be used to send the SMS message. The API automatically detects the encoding required from the characters used, which allows us to support the delivery of SMS in any language.

#### Basic Character Set

You can send up to 160 characters in a single SMS message if all characters in your message are part of the GSM 7-bit character set: 
[block:parameters]
{
  "data": {
    "0-0": "@",
    "0-1": "Δ",
    "1-0": "£",
    "1-1": "_",
    "1-2": "!",
    "1-3": "1",
    "1-4": "A",
    "2-4": "B",
    "3-4": "C",
    "4-4": "D",
    "5-4": "E",
    "6-4": "F",
    "7-4": "G",
    "8-4": "H",
    "9-4": "I",
    "10-4": "J",
    "11-4": "K",
    "12-4": "L",
    "13-4": "M",
    "14-4": "N",
    "15-4": "O",
    "0-5": "P",
    "1-5": "Q",
    "2-5": "R",
    "3-5": "S",
    "4-5": "T",
    "5-5": "U",
    "6-5": "V",
    "7-5": "W",
    "8-5": "X",
    "9-5": "Y",
    "10-5": "Z",
    "11-5": "Ä",
    "12-5": "Ö",
    "13-5": "Ñ",
    "14-5": "Ü",
    "15-5": "§",
    "2-0": "$",
    "3-0": "¥",
    "4-0": "è",
    "5-0": "é",
    "6-0": "ù",
    "7-0": "ì",
    "8-0": "ò",
    "9-0": "Ç",
    "10-0": "`LF`",
    "11-0": "Ø",
    "12-0": "ø",
    "14-0": "Å",
    "15-0": "å",
    "13-0": "`CR`",
    "2-1": "Φ",
    "3-1": "Γ",
    "4-1": "Λ",
    "5-1": "Ω",
    "6-1": "Π",
    "7-1": "Ψ",
    "8-1": "Σ",
    "9-1": "Θ",
    "10-1": "Ξ",
    "12-1": "Æ",
    "13-1": "æ",
    "14-1": "ß",
    "15-1": "É",
    "2-2": "“",
    "3-2": "#",
    "4-2": "¤",
    "5-2": "%",
    "6-2": "&",
    "7-2": "‘",
    "8-2": "(",
    "9-2": ")",
    "10-2": "*",
    "11-2": "+",
    "12-2": ",",
    "13-2": "-",
    "14-2": ".",
    "15-2": "/",
    "2-3": "2",
    "0-3": "0",
    "3-3": "3",
    "4-3": "4",
    "5-3": "5",
    "6-3": "6",
    "7-3": "7",
    "8-3": "8",
    "9-3": "9",
    "10-3": ":",
    "11-3": ";",
    "12-3": "<",
    "13-3": "=",
    "14-3": ">",
    "15-3": "?",
    "0-2": "`SP`",
    "0-4": "¡",
    "0-6": "¿",
    "1-6": "a",
    "2-6": "b",
    "3-6": "c",
    "4-6": "d",
    "5-6": "e",
    "6-6": "f",
    "7-6": "g",
    "8-6": "h",
    "9-6": "i",
    "10-6": "j",
    "11-6": "k",
    "12-6": "l",
    "13-6": "m",
    "14-6": "n",
    "15-6": "o",
    "0-7": "p",
    "1-7": "q",
    "2-7": "r",
    "3-7": "s",
    "4-7": "t",
    "5-7": "u",
    "6-7": "v",
    "7-7": "w",
    "8-7": "x",
    "9-7": "y",
    "10-7": "z",
    "11-7": "ä",
    "12-7": "ö",
    "13-7": "ñ",
    "14-7": "ü",
    "15-7": "à",
    "11-1": "`ESC`"
  },
  "cols": 8,
  "rows": 16
}
[/block]
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
[block:parameters]
{
  "data": {
    "0-0": "1 - 60",
    "0-1": "1",
    "1-0": "161 - 304",
    "1-1": "2",
    "2-1": "3",
    "3-1": "4",
    "4-1": "5",
    "5-1": "6",
    "6-1": "7",
    "7-1": "8",
    "8-1": "9",
    "9-1": "10",
    "10-1": "11",
    "2-0": "305 - 456",
    "3-0": "457 - 608",
    "4-0": "609 - 760",
    "5-0": "761 - 912",
    "6-0": "913 - 1064",
    "7-0": "1065 - 1216",
    "8-0": "1217 - 1368",
    "9-0": "1369 - 1520",
    "10-0": "1521 - 1600",
    "h-0": "Message Length",
    "h-1": "Number of SMS Parts"
  },
  "cols": 2,
  "rows": 11
}
[/block]
Each SMS in a multi-part 7-bit encoded message, has a maximum length of 152 characters.

#### Using Unicode Characters
[block:parameters]
{
  "data": {
    "h-0": "Message Length",
    "h-1": "Number of SMS Parts",
    "0-1": "1",
    "1-1": "2",
    "2-1": "3",
    "3-1": "4",
    "4-1": "5",
    "5-1": "6",
    "6-1": "7",
    "7-1": "8",
    "8-1": "9",
    "9-1": "10",
    "10-1": "11",
    "11-1": "12",
    "12-1": "13",
    "13-1": "14",
    "14-1": "15",
    "15-1": "16",
    "16-1": "17",
    "17-1": "18",
    "18-1": "19",
    "19-1": "20",
    "20-1": "21",
    "21-1": "22",
    "22-1": "23",
    "23-1": "24",
    "24-1": "25",
    "0-0": "1 - 70",
    "1-0": "71 - 132",
    "2-0": "133 - 198",
    "3-0": "199 - 264",
    "4-0": "265 - 330",
    "5-0": "331 - 396",
    "6-0": "397 - 462",
    "7-0": "463 - 528",
    "8-0": "529 - 594",
    "9-0": "595 - 660",
    "10-0": "661 - 726",
    "11-0": "727 - 792",
    "12-0": "793 - 858",
    "13-0": "859 - 924",
    "14-0": "925 - 990",
    "15-0": "991 - 1056",
    "16-0": "1057 - 1122",
    "17-0": "1123 - 1188",
    "18-0": "1189 - 1254",
    "19-0": "1255 - 1320",
    "20-0": "1321 - 1386",
    "21-0": "1387 - 1452",
    "22-0": "1453 - 1518",
    "23-0": "1519 - 1584",
    "24-0": "1585 - 1600"
  },
  "cols": 2,
  "rows": 25
}
[/block]
Each SMS in a multi-part Unicode encoded message, has a maximum length of 66
characters.