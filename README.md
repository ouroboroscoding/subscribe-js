# @ouroboros/subscribe

[![npm version](https://img.shields.io/npm/v/@ouroboros/subscribe.svg)](https://www.npmjs.com/package/@ouroboros/subscribe) ![MIT License](https://img.shields.io/npm/l/@ouroboros/subscribe.svg)

A class that allows adding easy subscription and notification abilities by
extending it

## Installation
npm
```bash
npm install @ouroboros/subscribe
```

## Extending Subscribe
To add subscription and notification to your class it's as easy as extending it from Subscribe
##### MyClass.js
```javascript
import Subscribe from '@ouroboros/subscribe';

export default class MyClass extends Subscribe {

	// Constructor
	constructor() {
		super('Hello, World!');
	}

	// do class stuff
}
```

MyForm is passed an instance of MyClass via props.my
##### MyForm.js
```javascript
import React from 'react';

export default function MyForm(props) {
	return (
		<button onClick={props.my.set('Goodbye')}>
			Say Goodbye
		</button>
	);
}
```
MyComponent subscribes to changes to `oMy` and adds each one it's notified about to the list of `messages`
##### MyComponent.js
```javascript
import MyClass from './MyClass';
import MyForm from './MyForm';
import React, { useEffect, useState } from 'react';

// Create a new instance of the subscription
const oMy = new MyClass();

// Create a React Component
function MyComponent(props) {

	const [ messages, setMessages ] = useState([]);

	useEffect(() => {

		// Subscribe to MyClass instance
		const r = oMy.subscribe(data => {

			// Add each new message we are notified about to the end of the list
			setMessages(val => [...messages, data]);
		})

		// Unsubscribe
		return () => {
			r.unsubscribe();
		}

	}, []);

	return () {
		<div>
			<MyForm my={o} />
			{msgs.map(s =>
				<p>{s}</p>
			)}
		</div>
	}
}
```

In the example, clicking the button a single time would result in

	<div>
		<button>Say Goodbye</button>
		<p>Hello, World!</p>
		<p>Goodbye</p>
	</div>

And a second click...

	<div>
		<button>Say Goodbye</button>
		<p>Hello, World!</p>
		<p>Goodbye</p>
		<p>Goodbye</p>
	</div>
