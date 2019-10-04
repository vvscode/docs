---
title: "Encoding"
excerpt: ""
---
### Default SMSC encoding

<div class="magic-block-html">
    <div class="marked-table">
        <table>
            <thead valign="bottom">
            <tr class="row-odd">
                <th class="head" colspan="2">Data Coding</th>
            </tr>
            </thead>
            <tbody valign="top">
            <tr class="row-even">
                <td>0x00</td>
                <td>Default GSM 7 bit encoding</td>
            </tr>
            <tr class="row-odd">
                <td>0x01</td>
                <td>US-ASCII</td>
            </tr>
            <tr class="row-even">
                <td>0x02</td>
                <td>Binary</td>
            </tr>
            <tr class="row-odd">
                <td>0x03</td>
                <td>ISO8859-1 (Latin-1), only characters within GSM-7 character table can be parsed to handset</td>
            </tr>
            <tr class="row-even">
                <td>0x04</td>
                <td>Binary</td>
            </tr>
            <tr class="row-odd">
                <td>0x08</td>
                <td>UCS2/UTF-16BE</td>
            </tr>
            <tr class="row-even">
                <td>&gt;0xF0</td>
                <td>Same as DCS value. See SMPP v3.4 Issue1.2 specification</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

### GSM 7 bit default alphabet and extension table

**3GPP TS 23.038 / GSM 03.38**

||||||||||||||||||
|------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
||x0 |x1 |x2 |x3 |x4 |x5 |x6 |x7 |x8 |x9 |xA |xB |xC |xD |xE |xF |
|0x    |@  |£  |$  |¥  |è  |é  |ù  |ì  |ò  |Ç  |LF |Ø  |ø  |CR |Å  |å  |
|1x    |Δ  |_  |Φ  |Γ  |Λ  |Ω  |Π  |Ψ  |Σ  |Θ  |Ξ  |ESC|Æ  |æ  |ß  |É  |
|2x    |SP |!  |“  |#  |¤  |%  |&  |‘  |(  |)  |*  |+  |,  |   |.  |/  |
|3x    |0  |1  |2  |3  |4  |5  |6  |7  |8  |9  |:  |;  |<  |=  |>  |?  |
|4x    |¡  |A  |B  |C  |D  |E  |F  |G  |H  |I  |J  |K  |L  |M  |N  |O  |
|5x    |P  |Q  |R  |S  |T  |U  |V  |W  |X  |Y  |Z  |Ä  |Ö  |Ñ  |Ü  |§  |
|6x    |¿  |a  |b  |c  |d  |e  |f  |g  |h  |i  |j  |k  |l  |m  |n  |o  |
|7x    |p  |q  |r  |s  |t  |u  |v  |w  |x  |y  |z  |ä  |ö  |ñ  |ü  |à  |
|1B 0x |   |   |   |   |   |   |   |   |   |   |FF |   |   |   |   |   |
|1B 1x |   |   |   |   |^  |   |   |   |   |   |   |   |   |   |   |   |
|1B 2x |   |   |   |   |   |   |   |   |{  |}  |   |   |   |   |   |\  |
|1B 3x |   |   |   |   |   |   |   |   |   |   |   |   |[  |~  |]  |   |
|1B 4x |&#124; |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|1B 5x |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|1B 6x |   |   |   |   |   |€  |   |   |   |   |   |   |   |   |   |   |
|1B 7x |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |


### ISO/IEC 8859-1 table, Latin-1

**ISO/IEC8859-1**

||||||||||||||||||
|------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
||x0 |x1 |x2 |x3 |x4 |x5 |x6 |x7 |x8 |x9 |xA |xB |xC |xD |xE |xF |
|0x    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|1x    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|2x    |SP |!  |”  |#  |$  |%  |&  |‘  |(  |)  |*  |+  |,  |   |.  |/  |
|3x    |0  |1  |2  |3  |4  |5  |6  |7  |8  |9  |:  |;  |<  |=  |>  |?  |
|4x    |@  |A  |B  |C  |D  |E  |F  |G  |H  |I  |J  |K  |L  |M  |N  |O  |
|5x    |P  |Q  |R  |S  |T  |U  |V  |W  |X  |Y  |Z  |[  |\  |]  |^  |_  |
|6x    |`  |a  |b  |c  |d  |e  |f  |g  |h  |i  |j  |k  |l  |m  |n  |o  |
|7x    |p  |q  |r  |s  |t  |u  |v  |w  |x  |y  |z  |{  |{  |}  |~  |   |
|8x    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|9x    |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |
|Ax    |NBSP|¡  |¢  |£  |¤  |¥  |¦  |§  |¨  |©  |ª  |«  |¬  |SHY|®  |¯  |
|Bx    |°  |±  |²  |³  |´  |µ  |¶  |·  |¸  |¹  |º  |»  |¼  |½  |¾  |¿  |
|Cx    |À  |Á  |Â  |Ã  |Ä  |Å  |Æ  |Ç  |È  |É  |Ê  |Ë  |Ì  |Í  |Î  |Ï  |
|Dx    |Ð  |Ñ  |Ò  |Ó  |Ô  |Õ  |Ö  |×  |Ø  |Ù  |Ú  |Û  |Ü  |Ý  |Þ  |ß  |
|Ex    |à  |á  |â  |ã  |ä  |å  |æ  |ç  |è  |é  |ê  |ë  |ì  |í  |î  |ï  |
|Fx    |ð  |ñ  |ò  |ó  |ô  |õ  |ö  |÷  |ø  |ù  |ú  |û  |ü  |ý  |þ  |ÿ  |


### US-ASCII

||||||||||||||||||
|------|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
||x0 |x1 |x2 |x3 |x4 |x5 |x6 |x7 |x8 |x9 |xA |xB |xC |xD |xE |xF |
|0x    |   |   |   |   |   |   |   |   |   |   |LF |   |FF |CR |   |   |
|1x    |   |   |   |   |   |   |   |   |   |   |   |ESC|   |   |   |   |
|2x    |SP |!  |“  |#  |$  |%  |&  |‘  |(  |)  |*  |+  |,  |   |.  |/  |
|3x    |0  |1  |2  |3  |4  |5  |6  |7  |8  |9  |:  |;  |<  |=  |>  |?  |
|4x    |@  |A  |B  |C  |D  |E  |F  |G  |H  |I  |J  |K  |L  |M  |N  |O  |
|5x    |P  |Q  |R  |S  |T  |U  |V  |W  |X  |Y  |Z  |[  |\  |]  |^  |_  |
|6x    |`  |a  |b  |c  |d  |e  |f  |g  |h  |i  |j  |k  |l  |m  |n  |o  |
|7x    |p  |q  |r  |s  |t  |u  |v  |w  |x  |y  |z  |{  |&#124; |}  |~  |   |

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-smpp/sms-smpp-encoding.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>