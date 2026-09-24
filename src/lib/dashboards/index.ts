export { analyticsSpec } from './analyticsSpec.js';
export { crmSpec } from './crmSpec.js';
export { ecommerceSpec } from './ecommerceSpec.js';
export { settingsSpec } from './settingsSpec.js';

export interface DashboardMeta {
	id: string;
	title: string;
	description: string;
	category: string;
	route: string;
	badge: string;
	icon: string;
}

export const DASHBOARD_METAS: DashboardMeta[] = [
	{
		id: 'analytics',
		title: 'Executive Analytics',
		description: 'Telemetry, conversion rates, MRR growth, and channel attribution breakdown.',
		category: 'Business Intelligence',
		route: '/dashboards/analytics',
		badge: 'Growth & Telemetry',
		icon: '📈'
	},
	{
		id: 'crm',
		title: 'Sales CRM & Deals',
		description: 'Funnel progression, pipeline value, qualified prospects, and quick lead ingestion.',
		category: 'Revenue Operations',
		route: '/dashboards/crm',
		badge: 'Pipeline & Leads',
		icon: '💼'
	},
	{
		id: 'ecommerce',
		title: 'E-Commerce & Orders',
		description: 'Real-time order stream, warehouse load factor, discounts, and dispatch fulfillment.',
		category: 'Operations',
		route: '/dashboards/ecommerce',
		badge: 'Logistics & Store',
		icon: '🛍️'
	},
	{
		id: 'settings',
		title: 'Workspace Settings',
		description: 'Developer credentials, cloud budgets, notification preferences, and team roles.',
		category: 'Administration',
		route: '/dashboards/settings',
		badge: 'Security & Access',
		icon: '⚙️'
	}
];
