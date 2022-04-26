const parser = require('@babel/parser')
const template = require('@babel/template').default
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

const collectWrapper = template(`
	console.log(%%ERROR_NAME%%,'12345678')
	%%BODY%%
`)

const loader = source => {
	const ast = parser.parse(source, { sourceType: 'module' })
	traverse(ast, {
		ModuleSpecifier(path) {
			console.log(path.parent.val)
		},
		CatchClause(path) {
			// @ts-ignore
			const ERROR_NAME = path.node.param.name
			let BODY = path.node.body.body
			path.get('body').replaceWithMultiple(
				// @ts-ignore
				collectWrapper({
					ERROR_NAME,
					BODY,
				}),
			)
		},
	})
	let { code } = generator(ast)
	code = 'gfrt4rr32t4rte;' + code
	return code
}
module.exports = loader
