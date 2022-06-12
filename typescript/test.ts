type MyPartial<T extends object> = { [K in keyof T]?: T[K] }
type MyRequire<T extends object> = { [K in keyof T]-?: T[K] }
type MyRedonly<T extends object> = { readonly [K in keyof T]: T[K] }
type MyNoRedonly<T extends object> = { -readonly [K in keyof T]: T[K] }
type MyRecord<K extends string | number | symbol, T> = { [P in K]: T }
type MyPick<T, K extends keyof T> = { [P in K]: T }
type PickO<T, K> = T extends K ? T : never
type ObjectDescriptor<D, M> = {
	data?: D
	methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
	let data: object = desc.data || {}
	let methods: object = desc.methods || {}
	return { ...data, ...methods } as D & M
}

let obj = makeObject({
	data: { x: 0, y: 0 },
	methods: {
		moveBy(dx: number, dy: number) {
			// this.x += dx // Strongly typed this
			// this.y += dy // Strongly typed this
			this.x = 1
		},
	},
})

type Dot<T extends number | string> = T extends '' ? '' : `.${T}`

type NestedKeys<T> = (
	T extends object
		? { [K in Exclude<keyof T, symbol>]: `${K}${Dot<NestedKeys<T[K]>>}` }[Exclude<keyof T, symbol>]
		: ''
) extends infer P
	? Extract<P, string>
	: never
