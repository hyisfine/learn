# 使用ts+react hook制作一个上拉、下拉刷新的DragView组件

**不多逼逼直接上代码**

```tsx
import './drag-view.scss'

import { useState, TouchEvent, CSSProperties } from 'react'

interface DragViewProps {
	dragDown?: boolean
	dragUp?: boolean
	onDragDown?: (cb?: any) => void
	onDragUp?: (cb?: any) => void
}

// 触发上拉下拉刷新点
const MAX_OFFSET_Y = 35

// 存放上次touchmove时间
let prevTimeStamp = 0

// 节流时间
const TIME_STAMP_INTERVAL = 50

export const DragView = (props: DragViewProps) => {
	const { onDragDown, onDragUp } = props

	const [tip, setTip] = useState<string>()
	const [touchStart, setTouchStart] = useState<TouchEvent<HTMLDivElement>>()
	const [tipStyle, setTipStyle] = useState<CSSProperties>()
	const [state, setState] = useState<'can-down' | 'down' | 'none' | 'up' | 'can-up'>('none')

	const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		setTouchStart(e)
	}

	const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		// 节流
		if (e.timeStamp - prevTimeStamp < TIME_STAMP_INTERVAL) return
		prevTimeStamp = e.timeStamp

		// 除以3.5是为了产生一种拖拽感，其实有专门的算法可以模拟，懒得找了
		const offsetY = (e.changedTouches[0].clientY - touchStart!.changedTouches[0].clientY) / 3.5
		switch (true) {
			case offsetY < -MAX_OFFSET_Y:
				setTip('释放刷新')
				setState('can-up')
				break
			case offsetY < 0:
				setTip('上拉刷新')
				setState('up')
				break
			case offsetY < MAX_OFFSET_Y:
				setTip('下拉刷新')
				setState('down')
				break
			case offsetY >= MAX_OFFSET_Y:
				setTip('释放刷新')
				setState('can-down')
		}

		setTipStyle({ height: `${Math.abs(offsetY)}px` })
	}

	const handleTouchEnd = () => {
		const reset = () => {
			setTipStyle({ height: `0px`, transition: 'all 0.5s' })
			setState('none')
		}

		switch (state) {
			case 'can-down':
				setTipStyle({ height: `${MAX_OFFSET_Y}px`, transition: 'all 0.5s' })
				if (onDragDown) onDragDown(reset)
				else reset()
				break
			case 'can-up':
				if (onDragUp) onDragUp(reset)
				else reset()
				break
			default:
				setTipStyle({ height: '0px', transition: 'all 0.5s' })
		}
	}

	const tipCls = `drag-view__tip ${state}`
	return (
		<div className='drag-view'>
			<div className={tipCls} style={tipStyle}>
				<span>{tip}</span>
			</div>
			<div
				className='drag-view__content'
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				1234
			</div>
		</div>
	)
}

```

```scss
.drag-view {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	&__tip {
		height: 0;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.85);
		display: flex;
		justify-content: center;
		align-items: center;

		&.up,
		&.can-up {
			order: 1;
		}

		&.down,
		&.can-down {
			order: 0;
		}
	}

	&__content {
		width: 100%;
		height: 100%;
		transform: translateY(0);
		background-color: #ffffff;
		z-index: 9;
	}
}

```

