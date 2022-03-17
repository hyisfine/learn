const MiniReact = {}

const createDom = fiber => {
    const dom = fiber.type === 'text' ? document.createTextNode('') : document.createElement(fiber.type)
    Object.keys(fiber.props)
        .filter(item => item !== 'children')
        .forEach(item => {
            dom[item] = fiber.props[item]
        })
    return dom
}

const createElement = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.map(item => (typeof item === 'object' ? item : createTextElement(item)))
        }
    }
}
const createTextElement = nodeValue => {
    return {
        type: 'text',
        props: { nodeValue, children: [] }
    }
}

let nextUnitOfWork = null
let currentRoot = null
let wipRoot = null
let deletions = null
function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}

function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }
    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }

    const domParent = domParentFiber.dom

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

function updateDom(dom, oldProps, newProps) { }

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletions = []
    nextUnitOfWork = wipRoot
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    // if (fiber.parent) {
    // 	fiber.parent.dom.appendChild(fiber.dom)
    // }

    if (fiber.child) return fiber.child
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) return nextFiber.sibling
        nextFiber = nextFiber.parent
    }
}

let wipFiber = null
let hookIndex = null

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber)
}

function useState(initial) {
    const oldHook = wipFiber.alternate?.hooks?.[hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
    }

    const actions = oldHook?.queue || []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })

    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }

    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber)
}

function reconcileChildren(fiber) {
    const children = fiber.props.children
    const oldFiber = fiber.alternate?.child
    let index = 0
    let prevSibling = null

    while (index < children.length || oldFiber) {
        let child = children[index]
        let newFiber = null

        const sameType = oldFiber && child && child.type == oldFiber.type
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: children.props,
                dom: oldFiber.dom,
                parent: fiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            }
        }
        if (child && !sameType) {
            newFiber = {
                type: child.type,
                props: child.props,
                dom: null,
                parent: fiber,
                alternate: null,
                effectTag: 'PLACEMENT'
            }
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }

        if (index === 0) fiber = child = newFiber
        else prevSibling.sibling = newFiber
        prevSibling = newFiber
        index++
    }
}
