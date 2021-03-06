import { ControllerImpl } from './controller'
import { Controller } from './types'

export function withFuncs<T>(value: () => T, onChange: (newValue: T) => void): Controller<T> {
	return new ControllerImpl(() => ({
		setValue: onChange,
		value: value(),
	}))
}

export function withMutable<T extends object>(value: T): Controller<T> {
	return new ControllerImpl(() => ({
		setValue: (newValue: T) => {
			for (const i in value) {
				if (Object.prototype.hasOwnProperty.call(value, i)) {
					delete value[i]
				}
			}

			for (const i in newValue) {
				if (Object.prototype.hasOwnProperty.call(newValue, i)) {
					value[i] = newValue[i]
				}
			}
		},
		value,
	}))
}
