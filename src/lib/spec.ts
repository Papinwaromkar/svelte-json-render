import type { Spec } from '@json-render/core';

export const demoSpec: Spec = {
	root: 'root',
	state: {
		count: 0,
		name: '',
		todos: [
			{ id: 1, title: 'Learn Svelte 5', completed: true },
			{ id: 2, title: 'Try @json-render/svelte', completed: false },
			{ id: 3, title: 'Build something awesome', completed: false }
		]
	},
	elements: {
		root: {
			type: 'Stack',
			props: { gap: 'lg', direction: 'vertical' },
			children: ['header', 'counter-card', 'milestone-badge', 'todos-card', 'input-card']
		},
		header: {
			type: 'Heading',
			props: {
				text: '@json-render/shadcn-svelte demo',
				level: 'h1'
			}
		},
		'counter-card': {
			type: 'Card',
			props: {
				title: 'Counter',
				description: 'Click the buttons to change the count'
			},
			children: ['counter-body']
		},
		'counter-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'horizontal', align: 'center' },
			children: ['decrement-btn', 'counter-value', 'increment-btn', 'reset-btn']
		},
		'decrement-btn': {
			type: 'Button',
			props: { label: '−', variant: 'secondary' },
			on: { press: { action: 'decrement' } }
		},
		'counter-value': {
			type: 'Heading',
			props: {
				text: { $state: '/count' },
				level: 'h2'
			}
		},
		'increment-btn': {
			type: 'Button',
			props: { label: '+', variant: 'primary' },
			on: { press: { action: 'increment' } }
		},
		'reset-btn': {
			type: 'Button',
			props: { label: 'Reset', variant: 'danger' },
			on: { press: { action: 'reset' } }
		},
		'milestone-badge': {
			type: 'Badge',
			props: { text: 'Milestone reached: 10!', variant: 'default' },
			visible: { $state: '/count', gte: 10 }
		},
		'todos-card': {
			type: 'Card',
			props: { title: 'Todo List', description: 'Your tasks' },
			children: ['todos-list']
		},
		'todos-list': {
			type: 'Stack',
			props: { gap: 'sm', direction: 'vertical' },
			repeat: { statePath: '/todos', key: 'id' },
			children: ['todo-item']
		},
		'todo-item': {
			type: 'Checkbox',
			props: {
				label: { $item: 'title' },
				name: { $item: 'id' },
				checked: { $bindItem: 'completed' }
			}
		},
		'input-card': {
			type: 'Card',
			props: {
				title: 'Bound Input',
				description: 'Type to update state and see reactive text'
			},
			children: ['input-body']
		},
		'input-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: ['name-input', 'name-display']
		},
		'name-input': {
			type: 'Input',
			props: {
				label: 'Name',
				name: 'name',
				value: { $bindState: '/name' },
				placeholder: 'Enter your name…'
			}
		},
		'name-display': {
			type: 'Text',
			props: {
				text: { $state: '/name' },
				variant: 'muted'
			}
		}
	}
};
