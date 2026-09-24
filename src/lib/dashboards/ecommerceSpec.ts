import type { Spec } from '@json-render/core';

export const ecommerceSpec: Spec = {
	root: 'root',
	state: {
		storeStatus: 'open',
		freeShippingThreshold: 50,
		promoCode: 'AUTUMN26',
		inventoryAlerts: true,
		currency: 'USD'
	},
	elements: {
		root: {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'lg' },
			children: [
				'ecom-header',
				'flash-sale-alert',
				'ecom-stats-grid',
				'fulfillment-card',
				'recent-orders-card',
				'store-controls-card'
			]
		},

		// Header
		'ecom-header': {
			type: 'Stack',
			props: { direction: 'horizontal', align: 'center', justify: 'between', gap: 'md' },
			children: ['ecom-header-titles', 'ecom-header-actions']
		},
		'ecom-header-titles': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['ecom-heading', 'ecom-sub']
		},
		'ecom-heading': {
			type: 'Heading',
			props: { text: 'Store Operations & Fulfillment', level: 'h1' }
		},
		'ecom-sub': {
			type: 'Text',
			props: {
				text: 'Real-time order throughput, inventory levels, logistics velocity, and customer transactions.',
				variant: 'muted'
			}
		},
		'ecom-header-actions': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'sm', align: 'center' },
			children: ['batch-ship-btn', 'download-receipts-btn']
		},
		'batch-ship-btn': {
			type: 'Button',
			props: { label: 'Print Shipping Labels', variant: 'primary' },
			on: { press: { action: 'printLabels' } }
		},
		'download-receipts-btn': {
			type: 'Button',
			props: { label: 'Export Invoices', variant: 'secondary' },
			on: { press: { action: 'exportInvoices' } }
		},

		// Alert banner
		'flash-sale-alert': {
			type: 'Alert',
			props: {
				title: 'Fall Season Special Active',
				message: 'Storewide discount code AUTUMN26 is live with 15% discount. Cart conversion increased by 22%.',
				type: 'info'
			}
		},

		// Stats
		'ecom-stats-grid': {
			type: 'Grid',
			props: { columns: 4, gap: 'md' },
			children: [
				'ecom-stat-sales',
				'ecom-stat-orders',
				'ecom-stat-aov',
				'ecom-stat-fulfillment'
			]
		},

		'ecom-stat-sales': {
			type: 'Card',
			props: { title: "Today's Gross Sales", description: 'Settled payment volume' },
			children: ['sales-stat-body']
		},
		'sales-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['sales-stat-val', 'sales-stat-tag']
		},
		'sales-stat-val': {
			type: 'Heading',
			props: { text: '$18,940.50', level: 'h2' }
		},
		'sales-stat-tag': {
			type: 'Badge',
			props: { text: '+24.1% vs yesterday', variant: 'default' }
		},

		'ecom-stat-orders': {
			type: 'Card',
			props: { title: 'Units Dispatched', description: 'Processed warehouse orders' },
			children: ['orders-stat-body']
		},
		'orders-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['orders-stat-val', 'orders-stat-tag']
		},
		'orders-stat-val': {
			type: 'Heading',
			props: { text: '342 Orders', level: 'h2' }
		},
		'orders-stat-tag': {
			type: 'Badge',
			props: { text: '98.5% on-time', variant: 'default' }
		},

		'ecom-stat-aov': {
			type: 'Card',
			props: { title: 'Average Order Value', description: 'Basket size benchmark' },
			children: ['aov-stat-body']
		},
		'aov-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['aov-stat-val', 'aov-stat-tag']
		},
		'aov-stat-val': {
			type: 'Heading',
			props: { text: '$88.25', level: 'h2' }
		},
		'aov-stat-tag': {
			type: 'Badge',
			props: { text: '+$6.40 uplift', variant: 'secondary' }
		},

		'ecom-stat-fulfillment': {
			type: 'Card',
			props: { title: 'Awaiting Packing', description: 'Queue in fulfillment bay' },
			children: ['fulf-stat-body']
		},
		'fulf-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['fulf-stat-val', 'fulf-stat-tag']
		},
		'fulf-stat-val': {
			type: 'Heading',
			props: { text: '16 Pending', level: 'h2' }
		},
		'fulf-stat-tag': {
			type: 'Badge',
			props: { text: 'Priority SLA', variant: 'destructive' }
		},

		// Warehouse Capacity Progress
		'fulfillment-card': {
			type: 'Card',
			props: {
				title: 'Regional Fulfillment Distribution & Warehouse Capacity',
				description: 'Stock load factor across automated regional distribution hubs'
			},
			children: ['warehouses-body']
		},
		'warehouses-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'wh-us-east',
				'wh-us-west',
				'wh-eu-central',
				'wh-asia-pacific'
			]
		},
		'wh-us-east': {
			type: 'Progress',
			props: { value: 84, max: 100, label: 'US East (New Jersey Hub) — 84% capacity utilization' }
		},
		'wh-us-west': {
			type: 'Progress',
			props: { value: 62, max: 100, label: 'US West (California Hub) — 62% capacity utilization' }
		},
		'wh-eu-central': {
			type: 'Progress',
			props: { value: 71, max: 100, label: 'EU Central (Frankfurt Hub) — 71% capacity utilization' }
		},
		'wh-asia-pacific': {
			type: 'Progress',
			props: { value: 45, max: 100, label: 'APAC (Tokyo Hub) — 45% capacity utilization' }
		},

		// Recent Orders Table
		'recent-orders-card': {
			type: 'Card',
			props: {
				title: 'Live Order Stream',
				description: 'Latest customer transactions requiring logistics clearance'
			},
			children: ['orders-table']
		},
		'orders-table': {
			type: 'Table',
			props: {
				caption: 'Live streaming from Shopify / Stripe gateway integration',
				columns: ['Order ID', 'Customer', 'Product Bundle', 'Total', 'Payment', 'Fulfillment'],
				rows: [
					['#ORD-8921', 'Emma Watson', 'Svelte 5 Developer Kit + Hoodie', '$142.00', 'Apple Pay', 'Shipped (FedEx)'],
					['#ORD-8920', 'Lucas Vane', 'Mechanical Keyboard + Deskmat', '$189.50', 'Credit Card', 'In Packing'],
					['#ORD-8919', 'Aria Thorne', 'shadcn UI Component Library License', '$99.00', 'Stripe Instant', 'Delivered (Digital)'],
					['#ORD-8918', 'Klaus Weber', 'Studio Monitoring Headphones', '$265.00', 'PayPal', 'Shipped (DHL Express)'],
					['#ORD-8917', 'Maya Lin', 'Ergonomic Palm Rest + Cable Set', '$54.00', 'Google Pay', 'Awaiting Pick']
				]
			}
		},

		// Quick Store Settings
		'store-controls-card': {
			type: 'Card',
			props: {
				title: 'Cart & Promotion Controls',
				description: 'Adjust real-time storefront parameters'
			},
			children: ['store-controls-body']
		},
		'store-controls-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'promo-input',
				'free-ship-slider',
				'alerts-switch'
			]
		},
		'promo-input': {
			type: 'Input',
			props: {
				label: 'Active Promotion Banner Code',
				placeholder: 'PROMO2026',
				value: { $bindState: '/promoCode' }
			}
		},
		'free-ship-slider': {
			type: 'Slider',
			props: {
				label: 'Free Shipping Order Minimum ($USD)',
				min: 25,
				max: 150,
				step: 5,
				value: { $bindState: '/freeShippingThreshold' }
			}
		},
		'alerts-switch': {
			type: 'Switch',
			props: {
				label: 'SMS alerts when regional inventory drops below 15 units',
				checked: { $bindState: '/inventoryAlerts' }
			}
		}
	}
};
