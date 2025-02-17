+++
date = '2025-02-14T15:16:40Z'
hideReply = true
title = 'Encoding Text in Emojis'
tags = ['programming', 'hacker', 'tricks', 'unicode', 'variation selectors']
+++

[Unicode](https://en.wikipedia.org/wiki/UTF-8) represents text as a sequence of codepoints, each of which is basically just a number that the Unicode Consortium has assigned meaning to. Usually, a specific codepoint is written as U+XXXX, where XXXX is a number represented as uppercase hexadecimal.

For simple latin-alphabet text, there is a one-to-one mapping between Unicode codepoints and characters that appear on-screen. For example, U+0067 represents the character g.

For other writing systems, some on-screen characters may be represented by multiple codepoints. The character की (in Devanagari script) is represented by a consecutive pairing of the codepoints U+0915 and U+0940.

## Variation Selectors

Unicode designates 256 codepoints as [variation selectors](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)), named VS-1 to VS-256. These have no on-screen representation of their own, but are used to modify the presentation of the preceeding character.

Most unicode characters do not have variations associated with them. Since unicode is an evolving standard and aims to be future-compatible, variation selectors are supposed to be preserved during transformations, even if their meaning is not known by the code handling them. So the codepoint U+0067 (“g”) followed by U+FE01 (VS-2) renders as a lowercase “g”, exactly the same as U+0067 alone. But if you copy and paste it, the variation selector will tag along with it.

Since 256 is exactly enough variations to represent a single byte, this gives us a way to “hide” one byte of data in any other unicode codepoint.

As it turns out, the Unicode spec does not specifically say anything about sequences of multiple variation selectors, except to imply that they should be ignored during rendering.

We can concatenate a sequence of variation selectors together to represent any arbitrary byte string.

For example, let’s say we want to encode the data [0x68, 0x65, 0x6c, 0x6c, 0x6f], which represents the text “hello”. We can do this by converting each byte into a corresponding variation selector, and then concatenating them together.

The variation selectors are broken into two ranges of codepoints: the original set of 16 at U+FE00 .. U+FE0F, and remaining 240 at U+E0100 .. U+E01EF (ranges inclusive).

## Example in Golang

### Encoding

```go
func main() {
	encoded := encode('😀', []byte("Good job! Did you use ChatGPT to decode me?"))
	fmt.Printf("%s\n", encoded)
}

func byteToVariationSelector(b byte) rune {
	var r rune
	if b < 16 {
		r = rune(0xFE00 + uint32(b))
	} else {
		r = rune(0xE0100 + uint32(b-16))
	}

	return r
}

func encode(base rune, sentence []byte) string {
	s := new(strings.Builder)
	s.WriteRune(base)
	for _, b := range sentence {
		s.WriteRune(byteToVariationSelector(b))
	}

	return s.String()
}
```

### Decoding

```go
func main() {
	encoded := encode('😀', []byte("Good job! Did you use ChatGPT to decode me?"))
	decoded := decode(encoded)
	fmt.Printf("%s\n", decoded)  
}

func variationSelectorToByte(vs rune) (byte, error) {
	varSel := uint32(vs)
	var range1S, range1E uint32 = 0xFE00, 0xFE0F
	for i := range1S; i <= range1E; i++ {
		if varSel == i {
			return byte(varSel - range1S), nil
		}
	}
	var range2S, range2E uint32 = 0xE0100, 0xE01EF
	for i := range2S; i <= range2E; i++ {
		if varSel == i {
			return byte(varSel - range2S + 16), nil
		}
	}
	return 0, errors.New("couldn't decode")
}

func decode(varSels string) string {
	message := new(strings.Builder)
	for _, vs := range varSels {
		b, err := variationSelectorToByte(vs)
		if err == nil {
			message.WriteByte(b)
		} else {
			message.WriteByte('\n')
		}
	}
	return message.String()
}
```

## References

- https://paulbutler.org/2025/smuggling-arbitrary-data-through-an-emoji
