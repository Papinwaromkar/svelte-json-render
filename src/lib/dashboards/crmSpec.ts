import type { Spec } from '@json-render/core';

export const crmSpec: Spec = {
	root: 'root',
	state: {
		leadFilter: 'all',
		quickLeadName: '',
		quickLeadCompany: '',
		quickLeadValue: '$25,000',
		quickLeadStage: 'Qualified',
		activeTab: 'all',
		newLeadOpen: false
	},
	elements: {
		root: {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'lg' },
			children: [
				'crm-header',
				'crm-stats-grid',
				'pipeline-stages-card',
				'deals-table-card',
				'quick-add-lead-card'
			]
		},

		// Header
		'crm-header': {
			type: 'Stack',
			props: { direction: 'horizontal', align: 'center', justify: 'between', gap: 'md' },
			children: ['crm-header-titles', 'crm-header-actions']
		},
		'crm-header-titles': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['crm-heading', 'crm-sub']
		},
		'crm-heading': {
			type: 'Heading',
			props: { text: 'Sales Pipeline & Customer CRM', level: 'h1' }
		},
		'crm-sub': {
			type: 'Text',
			props: {
				text: 'Track enterprise deals, qualified leads, and account executive stage progression.',
				variant: 'muted'
			}
		},
		'crm-header-actions': {
			type: 'Stack',
			props: { direction: 'horizontal', gap: 'sm', align: 'center' },
			children: ['new-lead-btn', 'pipeline-report-btn']
		},
		'new-lead-btn': {
			type: 'Button',
			props: { label: '+ New Enterprise Lead', variant: 'primary' },
			on: { press: { action: 'openNewLeadModal' } }
		},
		'pipeline-report-btn': {
			type: 'Button',
			props: { label: 'Quarterly Forecast', variant: 'secondary' },
			on: { press: { action: 'viewForecast' } }
		},

		// Stats Grid
		'crm-stats-grid': {
			type: 'Grid',
			props: { columns: 4, gap: 'md' },
			children: [
				'crm-stat-pipeline',
				'crm-stat-deals',
				'crm-stat-winrate',
				'crm-stat-cycledays'
			]
		},

		'crm-stat-pipeline': {
			type: 'Card',
			props: { title: 'Total Pipeline Value', description: 'Weighted active opportunities' },
			children: ['pipeline-stat-body']
		},
		'pipeline-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['pipeline-stat-val', 'pipeline-stat-tag']
		},
		'pipeline-stat-val': {
			type: 'Heading',
			props: { text: '$1,480,000', level: 'h2' }
		},
		'pipeline-stat-tag': {
			type: 'Badge',
			props: { text: '42 Active Deals', variant: 'default' }
		},

		'crm-stat-deals': {
			type: 'Card',
			props: { title: 'Deals Won this Q3', description: 'Closed contracts signed' },
			children: ['deals-stat-body']
		},
		'deals-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['deals-stat-val', 'deals-stat-tag']
		},
		'deals-stat-val': {
			type: 'Heading',
			props: { text: '$612,500', level: 'h2' }
		},
		'deals-stat-tag': {
			type: 'Badge',
			props: { text: '18 Closed Won', variant: 'secondary' }
		},

		'crm-stat-winrate': {
			type: 'Card',
			props: { title: 'Opportunity Win Rate', description: 'Discovery to closed conversion' },
			children: ['winrate-stat-body']
		},
		'winrate-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['winrate-stat-val', 'winrate-stat-tag']
		},
		'winrate-stat-val': {
			type: 'Heading',
			props: { text: '41.6%', level: 'h2' }
		},
		'winrate-stat-tag': {
			type: 'Badge',
			props: { text: '+4.8% QoQ', variant: 'default' }
		},

		'crm-stat-cycledays': {
			type: 'Card',
			props: { title: 'Average Sales Cycle', description: 'Time from demo to contract' },
			children: ['cycle-stat-body']
		},
		'cycle-stat-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['cycle-stat-val', 'cycle-stat-tag']
		},
		'cycle-stat-val': {
			type: 'Heading',
			props: { text: '23.4 Days', level: 'h2' }
		},
		'cycle-stat-tag': {
			type: 'Badge',
			props: { text: '⚡ 4 days faster', variant: 'secondary' }
		},

		// Pipeline Stages Progress
		'pipeline-stages-card': {
			type: 'Card',
			props: {
				title: 'Funnel Stage Volume ($USD)',
				description: 'Current contract distribution across deal progression checkpoints'
			},
			children: ['pipeline-bars-stack']
		},
		'pipeline-bars-stack': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'stage-discovery',
				'stage-qualified',
				'stage-proposal',
				'stage-negotiation'
			]
		},
		'stage-discovery': {
			type: 'Progress',
			props: { value: 35, max: 100, label: '1. Discovery & Needs Assessment ($420k - 14 deals)' }
		},
		'stage-qualified': {
			type: 'Progress',
			props: { value: 60, max: 100, label: '2. Technical Evaluation & Proof of Concept ($540k - 11 deals)' }
		},
		'stage-proposal': {
			type: 'Progress',
			props: { value: 78, max: 100, label: '3. Proposal & Procurement Review ($310k - 9 deals)' }
		},
		'stage-negotiation': {
			type: 'Progress',
			props: { value: 90, max: 100, label: '4. Legal Redlines & Signature ($210k - 8 deals)' }
		},

		// Deals Table
		'deals-table-card': {
			type: 'Card',
			props: {
				title: 'Active High-Priority Deals',
				description: 'Opportunities over $20,000 scheduled for closure this quarter'
			},
			children: ['deals-table']
		},
		'deals-table': {
			type: 'Table',
			props: {
				caption: 'Synchronized with CRM webhook streaming',
				columns: ['Account / Company', 'Contact Person', 'Contract Value', 'Stage', 'Owner', 'Close Date'],
				rows: [
					['Acme Global Corp', 'Marcus Chen', '$120,000', 'Legal Review', 'Sarah Jenkins', 'Oct 15, 2026'],
					['HyperScale Cloud Ltd', 'Elena Rostova', '$85,000', 'Security Assessment', 'David Kim', 'Oct 22, 2026'],
					['NextGen Financial', 'Rajesh Patel', '$190,000', 'Executive Sponsor Call', 'Sarah Jenkins', 'Nov 02, 2026'],
					['Starlight Media Labs', 'Chloe Dupont', '$45,000', 'POC Demo Pass', 'Alex Rivers', 'Nov 14, 2026'],
					['Vortex Autonomous Systems', 'Liam O’Connor', '$110,000', 'Proposal Review', 'David Kim', 'Nov 20, 2026']
				]
			}
		},

		// Quick Add Lead Form
		'quick-add-lead-card': {
			type: 'Card',
			props: {
				title: 'Quick Lead Ingestion',
				description: 'Directly dispatch a new prospect to the SDR qualification queue'
			},
			children: ['lead-form-stack']
		},
		'lead-form-stack': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'lead-form-row1',
				'lead-form-row2',
				'lead-submit-btn'
			]
		},
		'lead-form-row1': {
			type: 'Grid',
			props: { columns: 2, gap: 'md' },
			children: ['lead-name-input', 'lead-company-input']
		},
		'lead-name-input': {
			type: 'Input',
			props: {
				label: 'Lead Contact Name',
				placeholder: 'e.g. Jordan Miller',
				value: { $bindState: '/quickLeadName' }
			}
		},
		'lead-company-input': {
			type: 'Input',
			props: {
				label: 'Organization Name',
				placeholder: 'e.g. Stripe or Vercel',
				value: { $bindState: '/quickLeadCompany' }
			}
		},
		'lead-form-row2': {
			type: 'Grid',
			props: { columns: 2, gap: 'md' },
			children: ['lead-value-select', 'lead-notes-input']
		},
		'lead-value-select': {
			type: 'Select',
			props: {
				label: 'Estimated Annual Contract Value',
				options: ['$10,000 - $25,000', '$25,000 - $50,000', '$50,000 - $100,000', '$100,000+'],
				value: { $bindState: '/quickLeadValue' }
			}
		},
		'lead-notes-input': {
			type: 'Input',
			props: {
				label: 'Key Tech Stack / Requirement',
				placeholder: 'e.g. SvelteKit, High-Volume Data Streaming'
			}
		},
		'lead-submit-btn': {
			type: 'Button',
			props: { label: 'Submit Lead to Pipeline', variant: 'primary' },
			on: { press: { action: 'submitLead' } }
		}
	}
};
