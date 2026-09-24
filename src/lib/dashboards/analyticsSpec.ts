import type { Spec } from '@json-render/core';

export const analyticsSpec: Spec = {
	root: 'root',
	state: {
		dateRange: '30d',
		autoRefresh: true,
		alertThreshold: 90,
		searchQuery: '',
		statusFilter: 'all',
		refreshCount: 0
	},
	elements: {
		root: {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'lg' },
			children: [
				'analytics-header',
				'system-alert',
				'metrics-grid',
				'traffic-channels-card',
				'top-campaigns-card'
			]
		},

		// Header Section
		'analytics-header': {
			type: 'Stack',
			props: { direction: 'horizontal', align: 'center', justify: 'between', gap: 'md' },
			children: ['header-titles', 'header-controls']
		},
		'header-titles': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['header-heading', 'header-sub']
		},
		'header-heading': {
			type: 'Heading',
			props: { text: 'Executive Analytics Overview', level: 'h1' }
		},
		'header-sub': {
			type: 'Text',
			props: {
				text: 'Real-time performance telemetry, growth metrics, and customer acquisition channels.',
				variant: 'muted'
			}
		},
		'header-controls': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'sm', align: 'center' },
			children: ['export-btn', 'refresh-btn']
		},
		'export-btn': {
			type: 'Button',
			props: { label: 'Export CSV', variant: 'secondary' },
			on: { press: { action: 'exportData' } }
		},
		'refresh-btn': {
			type: 'Button',
			props: { label: 'Refresh Data', variant: 'primary' },
			on: { press: { action: 'refreshMetrics' } }
		},

		// System Status Alert
		'system-alert': {
			type: 'Alert',
			props: {
				title: 'Operational Status: All Systems Optimal',
				message: 'Data ingestion pipeline latency is at 42ms. Zero anomalies detected in the past 24 hours.',
				type: 'success'
			}
		},

		// 4 Metric Cards in a Grid
		'metrics-grid': {
			type: 'Grid',
			props: { columns: 4, gap: 'md' },
			children: [
				'metric-mrr',
				'metric-users',
				'metric-conversion',
				'metric-retention'
			]
		},

		// Metric 1: MRR
		'metric-mrr': {
			type: 'Card',
			props: { title: 'Monthly Recurring Revenue', description: 'Across all active subscriptions' },
			children: ['mrr-body']
		},
		'mrr-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['mrr-val', 'mrr-footer']
		},
		'mrr-val': {
			type: 'Heading',
			props: { text: '$58,420.00', level: 'h2' }
		},
		'mrr-footer': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'xs', align: 'center' },
			children: ['mrr-badge', 'mrr-caption']
		},
		'mrr-badge': {
			type: 'Badge',
			props: { text: '+18.4%', variant: 'default' }
		},
		'mrr-caption': {
			type: 'Text',
			props: { text: 'vs last month', variant: 'muted' }
		},

		// Metric 2: Active Users
		'metric-users': {
			type: 'Card',
			props: { title: 'Active Accounts', description: 'Daily unique active organizations' },
			children: ['users-body']
		},
		'users-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['users-val', 'users-footer']
		},
		'users-val': {
			type: 'Heading',
			props: { text: '14,290', level: 'h2' }
		},
		'users-footer': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'xs', align: 'center' },
			children: ['users-badge', 'users-caption']
		},
		'users-badge': {
			type: 'Badge',
			props: { text: '+9.2%', variant: 'default' }
		},
		'users-caption': {
			type: 'Text',
			props: { text: 'daily volume', variant: 'muted' }
		},

		// Metric 3: Conversion Rate
		'metric-conversion': {
			type: 'Card',
			props: { title: 'Avg Conversion', description: 'Visitor to registered trial' },
			children: ['conv-body']
		},
		'conv-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['conv-val', 'conv-footer']
		},
		'conv-val': {
			type: 'Heading',
			props: { text: '3.85%', level: 'h2' }
		},
		'conv-footer': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'xs', align: 'center' },
			children: ['conv-badge', 'conv-caption']
		},
		'conv-badge': {
			type: 'Badge',
			props: { text: '+0.54%', variant: 'default' }
		},
		'conv-caption': {
			type: 'Text',
			props: { text: '30-day trailing', variant: 'muted' }
		},

		// Metric 4: Net Retention
		'metric-retention': {
			type: 'Card',
			props: { title: 'Net Dollar Retention', description: 'Expansion minus churn' },
			children: ['ret-body']
		},
		'ret-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['ret-val', 'ret-footer']
		},
		'ret-val': {
			type: 'Heading',
			props: { text: '124.8%', level: 'h2' }
		},
		'ret-footer': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'xs', align: 'center' },
			children: ['ret-badge', 'ret-caption']
		},
		'ret-badge': {
			type: 'Badge',
			props: { text: 'Target: >120%', variant: 'secondary' }
		},
		'ret-caption': {
			type: 'Text',
			props: { text: 'enterprise tier', variant: 'muted' }
		},

		// Traffic Channels & Progress
		'traffic-channels-card': {
			type: 'Card',
			props: {
				title: 'Acquisition Channels & Traffic Distribution',
				description: 'Breakdown of verified inbound sessions across marketing channels'
			},
			children: ['channels-body']
		},
		'channels-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'chan-organic',
				'chan-direct',
				'chan-referral',
				'chan-social'
			]
		},
		'chan-organic': {
			type: 'Progress',
			props: { value: 68, max: 100, label: 'Organic Search (Google & Bing) — 68,400 visits (68%)' }
		},
		'chan-direct': {
			type: 'Progress',
			props: { value: 46, max: 100, label: 'Direct Traffic & Bookmarks — 46,200 visits (46%)' }
		},
		'chan-referral': {
			type: 'Progress',
			props: { value: 32, max: 100, label: 'GitHub & Developer Portals — 32,100 visits (32%)' }
		},
		'chan-social': {
			type: 'Progress',
			props: { value: 19, max: 100, label: 'X / LinkedIn / Tech Communities — 19,000 visits (19%)' }
		},

		// Top Campaigns Table
		'top-campaigns-card': {
			type: 'Card',
			props: {
				title: 'Active Campaigns & Attribution',
				description: 'Live performance metrics of ongoing growth experiments'
			},
			children: ['campaigns-table']
		},
		'campaigns-table': {
			type: 'Table',
			props: {
				caption: 'Attribution modeling based on last-touch conversion',
				columns: ['Campaign Name', 'Impressions', 'Clicks', 'CTR', 'Spend', 'Status'],
				rows: [
					['Spring Developer Outreach', '184,200', '9,410', '5.1%', '$2,450', 'Active'],
					['shadcn-svelte Ecosystem Launch', '420,500', '31,800', '7.5%', '$4,100', 'Scaling'],
					['Open Source Sponsorships', '92,100', '6,120', '6.6%', '$1,800', 'Active'],
					['Product Hunt Showcase', '210,000', '18,400', '8.7%', '$950', 'Completed']
				]
			}
		}
	}
};
