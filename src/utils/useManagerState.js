import { useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import Notifier from './Notifier';

/**
 * @param {Notifier} notifier
 * @param {function(): *} getManagerState
 *
 * @return {*}
 */
export default function useManagerState(notifier, getManagerState) {
	const [state, setState] = useState(getManagerState());

	useEffect(() => {
		const removeNotifierCallback = notifier.addCallback(() => setState(getManagerState()));

		return () => removeNotifierCallback();
	}, [notifier, getManagerState]);

	return state;
}
