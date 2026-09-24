import type { Spec } from '@json-render/core';

export const settingsSpec: Spec = {
	root: 'root',
	state: {
		fullName: 'Alex Morgan',
		email: 'alex.morgan@antigravity.dev',
		bio: 'Staff Frontend Architect working on Svelte 5 and declarative JSON-driven UI systems.',
		role: 'Lead Architect',
		emailDigests: true,
		securityAlerts: true,
		marketingEmails: false,
		twoFactorAuth: true,
		monthlyBudget: 250,
		apiTier: 'Pro',
		teamSeats: 8
	},
	elements: {
		root: {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'lg' },
			children: [
				'settings-header',
				'profile-card',
				'preferences-card',
				'security-card',
				'billing-card',
				'danger-zone-card'
			]
		},

		// Header
		'settings-header': {
			type: 'Stack',
			props: { direction: 'horizontal', align: 'center', justify: 'between', gap: 'md' },
			children: ['settings-header-titles', 'settings-header-actions']
		},
		'settings-header-titles': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'xs' },
			children: ['settings-heading', 'settings-sub']
		},
		'settings-heading': {
			type: 'Heading',
			props: { text: 'Workspace Settings & Profile', level: 'h1' }
		},
		'settings-sub': {
			type: 'Text',
			props: {
				text: 'Manage developer credentials, team permissions, security preferences, and cloud resource quotas.',
				variant: 'muted'
			}
		},
		'settings-header-actions': {
			type: 'Button',
			props: { label: 'Save Changes', variant: 'primary' },
			on: { press: { action: 'saveSettings' } }
		},

		// Profile Card
		'profile-card': {
			type: 'Card',
			props: {
				title: 'Developer Profile',
				description: 'Personal info visible across your public repositories and team audits'
			},
			children: ['profile-body']
		},
		'profile-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'profile-grid',
				'bio-textarea',
				'role-select'
			]
		},
		'profile-grid': {
			type: 'Grid',
			props: { columns: 2, gap: 'md' },
			children: ['name-input', 'email-input']
		},
		'name-input': {
			type: 'Input',
			props: {
				label: 'Full Legal Name',
				placeholder: 'Alex Morgan',
				value: { $bindState: '/fullName' }
			}
		},
		'email-input': {
			type: 'Input',
			props: {
				label: 'Primary Work Email',
				placeholder: 'alex@example.com',
				value: { $bindState: '/email' }
			}
		},
		'bio-textarea': {
			type: 'Textarea',
			props: {
				label: 'Professional Summary',
				rows: 3,
				value: { $bindState: '/bio' }
			}
		},
		'role-select': {
			type: 'Select',
			props: {
				label: 'Organization Permission Role',
				options: ['Lead Architect', 'Senior Engineer', 'DevOps / SRE', 'Product Manager', 'Designer'],
				value: { $bindState: '/role' }
			}
		},

		// Notification Preferences
		'preferences-card': {
			type: 'Card',
			props: {
				title: 'Communications & Event Notifications',
				description: 'Configure automated webhook signals and email broadcasts'
			},
			children: ['prefs-body']
		},
		'prefs-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'switch-security',
				'switch-digests',
				'switch-marketing'
			]
		},
		'switch-security': {
			type: 'Switch',
			props: {
				label: 'Critical security alerts & API key rotation reminders (recommended)',
				checked: { $bindState: '/securityAlerts' }
			}
		},
		'switch-digests': {
			type: 'Switch',
			props: {
				label: 'Weekly project deployment telemetry & performance summary',
				checked: { $bindState: '/emailDigests' }
			}
		},
		'switch-marketing': {
			type: 'Switch',
			props: {
				label: 'Quarterly product survey and community event invitations',
				checked: { $bindState: '/marketingEmails' }
			}
		},

		// Security & Access
		'security-card': {
			type: 'Card',
			props: {
				title: 'Authentication & Session Shield',
				description: 'Hardware key tokens and multi-factor authentication policies'
			},
			children: ['security-body']
		},
		'security-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'switch-2fa',
				'revoke-tokens-btn'
			]
		},
		'switch-2fa': {
			type: 'Switch',
			props: {
				label: 'Enforce hardware security key (FIDO2 / WebAuthn / Passkey)',
				checked: { $bindState: '/twoFactorAuth' }
			}
		},
		'revoke-tokens-btn': {
			type: 'Button',
			props: { label: 'Revoke All Active CLI Sessions', variant: 'secondary' },
			on: { press: { action: 'revokeSessions' } }
		},

		// Billing & Quota
		'billing-card': {
			type: 'Card',
			props: {
				title: 'Cloud Budget & API Quotas',
				description: 'Monthly spend allocation and team seat provisioning'
			},
			children: ['billing-body']
		},
		'billing-body': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: [
				'budget-slider',
				'plan-radio'
			]
		},
		'budget-slider': {
			type: 'Slider',
			props: {
				label: 'Monthly Cloud Compute Hard Cap ($USD)',
				min: 50,
				max: 1000,
				step: 25,
				value: { $bindState: '/monthlyBudget' }
			}
		},
		'plan-radio': {
			type: 'Radio',
			props: {
				label: 'Subscription Tier',
				options: ['Starter ($19/mo)', 'Pro ($79/mo)', 'Enterprise (Custom Dedicated Cloud)'],
				value: { $bindState: '/apiTier' }
			}
		},

		// Danger Zone
		'danger-zone-card': {
			type: 'Card',
			props: {
				title: 'Danger Zone',
				description: 'Permanent irreversible destructive workspace actions'
			},
			children: ['danger-body']
		},
		'danger-body': {
			type: 'Stack',
			props: { direction: 'horizontal', justify: 'between', align: 'center', gap: 'md' },
			children: ['danger-text', 'danger-btn']
		},
		'danger-text': {
			type: 'Text',
			props: {
				text: 'Deleting this organization will terminate all live JSON-render deployments and purge all stored specs.',
				variant: 'muted'
			}
		},
		'danger-btn': {
			type: 'Button',
			props: { label: 'Delete Organization', variant: 'danger' },
			on: { press: { action: 'deleteOrg' } }
		}
	}
};
