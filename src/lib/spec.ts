import type { Spec } from '@json-render/core';

export const demoSpec: Spec = {
	root: 'root',
	state: {
		count: 0,
		name: '',
		bio: '',
		role: 'Developer',
		plan: 'Pro',
		notifications: true,
		marketing: false,
		volume: 40,
		activeTab: 'overview',
		dialogOpen: false,
		drawerOpen: false,
		pressed: false,
		align: 'left',
		view: 'list',
		page: 1,
		menuValue: '',
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
			children: [
				'header',
				'alert',
				'layout-card',
				'content-card',
				'feedback-card',
				'overlay-card',
				'forms-card',
				'actions-card',
				'data-card',
				'counter-card',
				'milestone-badge',
				'todos-card'
			]
		},

		header: {
			type: 'Heading',
			props: { text: '@json-render/shadcn-svelte — all components', level: 'h1' }
		},

		alert: {
			type: 'Alert',
			props: {
				title: 'Component gallery',
				message: 'Every component from @json-render/shadcn-svelte is registered and shown below.',
				type: 'info'
			}
		},

		// --- Layout ---
		'layout-card': {
			type: 'Card',
			props: { title: 'Layout', description: 'Card, Stack, Grid, Separator, Tabs, Accordion, Collapsible' },
			children: ['layout-body']
		},
		'layout-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: ['layout-tabs', 'layout-grid', 'layout-sep', 'layout-accordion', 'layout-collapsible']
		},
		'layout-tabs': {
			type: 'Tabs',
			props: {
				tabs: [
					{ label: 'Overview', value: 'overview' },
					{ label: 'Details', value: 'details' },
					{ label: 'Settings', value: 'settings' }
				],
				value: { $bindState: '/activeTab' }
			},
			children: ['layout-tab-text']
		},
		'layout-tab-text': {
			type: 'Text',
			props: { text: { $state: '/activeTab' }, variant: 'muted' }
		},
		'layout-grid': {
			type: 'Grid',
			props: { columns: 2, gap: 'md' },
			children: ['grid-a', 'grid-b']
		},
		'grid-a': {
			type: 'Badge',
			props: { text: 'Grid cell A', variant: 'secondary' }
		},
		'grid-b': {
			type: 'Badge',
			props: { text: 'Grid cell B', variant: 'outline' }
		},
		'layout-sep': {
			type: 'Separator',
			props: { orientation: 'horizontal' }
		},
		'layout-accordion': {
			type: 'Accordion',
			props: {
				type: 'single',
				items: [
					{ title: 'What is json-render?', content: 'JSON specs become real Svelte component trees.' },
					{ title: 'Why shadcn-svelte?', content: 'Pre-built Tailwind components wired for catalogs.' }
				]
			}
		},
		'layout-collapsible': {
			type: 'Collapsible',
			props: { title: 'Collapsible section', defaultOpen: false },
			children: ['collapsible-text']
		},
		'collapsible-text': {
			type: 'Text',
			props: { text: 'Hidden content inside Collapsible.', variant: 'body' }
		},

		// --- Content ---
		'content-card': {
			type: 'Card',
			props: { title: 'Content', description: 'Heading, Text, Image, Avatar, Badge, Link, Carousel' },
			children: ['content-body']
		},
		'content-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: [
				'content-heading',
				'content-text',
				'content-row',
				'content-image',
				'content-link',
				'content-carousel'
			]
		},
		'content-heading': {
			type: 'Heading',
			props: { text: 'Section heading', level: 'h3' }
		},
		'content-text': {
			type: 'Text',
			props: { text: 'Body text with a muted caption below.', variant: 'body' }
		},
		'content-row': {
			type: 'Stack',
			props: { gap: 'md', direction: 'horizontal', align: 'center' },
			children: ['content-avatar', 'content-badge-1', 'content-badge-2']
		},
		'content-avatar': {
			type: 'Avatar',
			props: { name: 'Ada Lovelace', size: 'md', src: null }
		},
		'content-badge-1': {
			type: 'Badge',
			props: { text: 'Default', variant: 'default' }
		},
		'content-badge-2': {
			type: 'Badge',
			props: { text: 'Destructive', variant: 'destructive' }
		},
		'content-image': {
			type: 'Image',
			props: { alt: 'Placeholder image', src: null, width: 320, height: 120 }
		},
		'content-link': {
			type: 'Link',
			props: { label: 'json-render docs', href: 'https://json-render.dev' }
		},
		'content-carousel': {
			type: 'Carousel',
			props: {
				items: [
					{ title: 'Slide 1', description: 'First carousel card' },
					{ title: 'Slide 2', description: 'Second carousel card' },
					{ title: 'Slide 3', description: 'Third carousel card' }
				]
			}
		},

		// --- Feedback ---
		'feedback-card': {
			type: 'Card',
			props: { title: 'Feedback', description: 'Alert, Progress, Skeleton, Spinner, Tooltip, Popover' },
			children: ['feedback-body']
		},
		'feedback-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: [
				'feedback-success',
				'feedback-progress',
				'feedback-skeleton',
				'feedback-spinner',
				'feedback-overlays'
			]
		},
		'feedback-success': {
			type: 'Alert',
			props: { title: 'Saved', message: 'Your changes were applied.', type: 'success' }
		},
		'feedback-progress': {
			type: 'Progress',
			props: { value: 65, max: 100, label: 'Upload progress' }
		},
		'feedback-skeleton': {
			type: 'Skeleton',
			props: { width: '100%', height: '16px', rounded: true }
		},
		'feedback-spinner': {
			type: 'Spinner',
			props: { size: 'md', label: 'Loading…' }
		},
		'feedback-overlays': {
			type: 'Stack',
			props: { gap: 'md', direction: 'horizontal', align: 'center' },
			children: ['feedback-tooltip', 'feedback-popover']
		},
		'feedback-tooltip': {
			type: 'Tooltip',
			props: { text: 'Hover me', content: 'Tooltip content' }
		},
		'feedback-popover': {
			type: 'Popover',
			props: { trigger: 'Open popover', content: 'Popover body text' }
		},

		// --- Overlay ---
		'overlay-card': {
			type: 'Card',
			props: { title: 'Overlay', description: 'Dialog and Drawer (toggle via setState)' },
			children: ['overlay-body']
		},
		'overlay-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'horizontal' },
			children: ['open-dialog-btn', 'open-drawer-btn', 'demo-dialog', 'demo-drawer']
		},
		'open-dialog-btn': {
			type: 'Button',
			props: { label: 'Open dialog', variant: 'primary' },
			on: {
				press: {
					action: 'setState',
					params: { statePath: '/dialogOpen', value: true }
				}
			}
		},
		'open-drawer-btn': {
			type: 'Button',
			props: { label: 'Open drawer', variant: 'secondary' },
			on: {
				press: {
					action: 'setState',
					params: { statePath: '/drawerOpen', value: true }
				}
			}
		},
		'demo-dialog': {
			type: 'Dialog',
			props: {
				title: 'Dialog',
				description: 'Opened with setState on /dialogOpen',
				openPath: '/dialogOpen'
			},
			children: ['dialog-text']
		},
		'dialog-text': {
			type: 'Text',
			props: { text: 'Dialog body content.', variant: 'body' }
		},
		'demo-drawer': {
			type: 'Drawer',
			props: {
				title: 'Drawer',
				description: 'Opened with setState on /drawerOpen',
				openPath: '/drawerOpen'
			},
			children: ['drawer-text']
		},
		'drawer-text': {
			type: 'Text',
			props: { text: 'Drawer body content.', variant: 'body' }
		},

		// --- Forms ---
		'forms-card': {
			type: 'Card',
			props: {
				title: 'Forms',
				description: 'Input, Textarea, Select, Checkbox, Radio, Switch, Slider'
			},
			children: ['forms-body']
		},
		'forms-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: [
				'form-input',
				'form-textarea',
				'form-select',
				'form-radio',
				'form-switch',
				'form-slider',
				'form-name-display'
			]
		},
		'form-input': {
			type: 'Input',
			props: {
				label: 'Name',
				name: 'name',
				value: { $bindState: '/name' },
				placeholder: 'Enter your name…'
			}
		},
		'form-textarea': {
			type: 'Textarea',
			props: {
				label: 'Bio',
				name: 'bio',
				rows: 3,
				value: { $bindState: '/bio' },
				placeholder: 'Tell us about yourself'
			}
		},
		'form-select': {
			type: 'Select',
			props: {
				label: 'Role',
				name: 'role',
				options: ['Developer', 'Designer', 'Manager'],
				value: { $bindState: '/role' },
				placeholder: 'Pick a role'
			}
		},
		'form-radio': {
			type: 'Radio',
			props: {
				label: 'Plan',
				name: 'plan',
				options: ['Free', 'Pro', 'Team'],
				value: { $bindState: '/plan' }
			}
		},
		'form-switch': {
			type: 'Switch',
			props: {
				label: 'Email notifications',
				name: 'notifications',
				checked: { $bindState: '/notifications' }
			}
		},
		'form-slider': {
			type: 'Slider',
			props: {
				label: 'Volume',
				min: 0,
				max: 100,
				step: 1,
				value: { $bindState: '/volume' }
			}
		},
		'form-name-display': {
			type: 'Text',
			props: { text: { $state: '/name' }, variant: 'muted' }
		},

		// --- Actions ---
		'actions-card': {
			type: 'Card',
			props: {
				title: 'Actions',
				description: 'Button, DropdownMenu, Toggle, ToggleGroup, ButtonGroup, Pagination'
			},
			children: ['actions-body']
		},
		'actions-body': {
			type: 'Stack',
			props: { gap: 'md', direction: 'vertical' },
			children: [
				'actions-buttons',
				'actions-dropdown',
				'actions-toggle',
				'actions-toggle-group',
				'actions-button-group',
				'actions-pagination'
			]
		},
		'actions-buttons': {
			type: 'Stack',
			props: { gap: 'sm', direction: 'horizontal' },
			children: ['btn-primary', 'btn-secondary', 'btn-danger']
		},
		'btn-primary': {
			type: 'Button',
			props: { label: 'Primary', variant: 'primary' }
		},
		'btn-secondary': {
			type: 'Button',
			props: { label: 'Secondary', variant: 'secondary' }
		},
		'btn-danger': {
			type: 'Button',
			props: { label: 'Danger', variant: 'danger' }
		},
		'actions-dropdown': {
			type: 'DropdownMenu',
			props: {
				label: 'Menu',
				items: [
					{ label: 'Profile', value: 'profile' },
					{ label: 'Billing', value: 'billing' },
					{ label: 'Logout', value: 'logout' }
				],
				value: { $bindState: '/menuValue' }
			}
		},
		'actions-toggle': {
			type: 'Toggle',
			props: {
				label: 'Bold',
				pressed: { $bindState: '/pressed' },
				variant: 'outline'
			}
		},
		'actions-toggle-group': {
			type: 'ToggleGroup',
			props: {
				type: 'single',
				items: [
					{ label: 'Left', value: 'left' },
					{ label: 'Center', value: 'center' },
					{ label: 'Right', value: 'right' }
				],
				value: { $bindState: '/align' }
			}
		},
		'actions-button-group': {
			type: 'ButtonGroup',
			props: {
				buttons: [
					{ label: 'List', value: 'list' },
					{ label: 'Grid', value: 'grid' }
				],
				selected: { $bindState: '/view' }
			}
		},
		'actions-pagination': {
			type: 'Pagination',
			props: {
				totalPages: 5,
				page: { $bindState: '/page' }
			}
		},

		// --- Data ---
		'data-card': {
			type: 'Card',
			props: { title: 'Data', description: 'Table' },
			children: ['data-table']
		},
		'data-table': {
			type: 'Table',
			props: {
				caption: 'Sample users',
				columns: ['Name', 'Role'],
				rows: [
					['Alice', 'Admin'],
					['Bob', 'User'],
					['Carol', 'Editor']
				]
			}
		},

		// --- Interactive demo (original) ---
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
			props: { title: 'Todo List', description: 'Checkbox + repeat + $bindItem' },
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
		}
	}
};
