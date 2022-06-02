import { buildLexer, rule, tok, list_sc, str, seq, alt, lrec, apply, kmid, rep_sc } from 'typescript-parsec'

enum TokenKind {
	Keyword,
	Fragment,
	BraceL, BraceR,
	NewLine, Whitespace,
}

const keywords = [
	'sup', 'sub',
]

export const lexer = buildLexer([
	// ...(keywords.map(keyword => [true, new RegExp(keyword), TokenKind.Keyword])),
	[true, new RegExp(`^(${keywords.join("|")})`, 'g'), TokenKind.Keyword],
	[true, /^\S*/g, TokenKind.Fragment],
	[true, /^{/g, TokenKind.BraceL],
	[true, /^}/g, TokenKind.BraceR],
	[true, /^(\n|\r\n)+/g, TokenKind.NewLine],
	[false, /^\s+/g, TokenKind.Whitespace],
])

interface Atom {
	children: string[],
}

const ATOM = rule<TokenKind, Atom>()

// const KEYWORD = apply(lexer, )

// const ATOM = alt()
// const NESTED = seq(tok(), ATOM, tok())

// list_sc(tok(TokenKind.))
