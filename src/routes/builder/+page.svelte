<script lang="ts">
	import {
		StateProvider,
		ActionProvider,
		ValidationProvider,
		VisibilityProvider,
		Renderer
	} from '@json-render/svelte';
	import type { Spec } from '@json-render/core';
	import { registry } from '$lib/registry.js';

	// Component template definitions for the palette
	interface ComponentTemplate {
		type: string;
		label: string;
		category: 'Layout' | 'Content' | 'Forms' | 'Feedback' | 'Actions';
		description: string;
		icon: string;
		defaultProps: Record<string, any>;
		defaultChildren?: string[];
		hasChildren?: boolean;
	}

	const PALETTE: ComponentTemplate[] = [
		// Layout
		{
			type: 'Card',
			label: 'Card Container',
			category: 'Layout',
			description: 'Container with header, title & description',
			icon: '🔲',
			defaultProps: {
				title: 'Card Title',
				description: 'A brief description of this card section'
			},
			hasChildren: true
		},
		{
			type: 'Stack',
			label: 'Vertical Stack',
			category: 'Layout',
			description: 'Flex container with spacing',
			icon: '📑',
			defaultProps: {
				direction: 'vertical',
				gap: 'md'
			},
			hasChildren: true
		},
		{
			type: 'Separator',
			label: 'Separator',
			category: 'Layout',
			description: 'Horizontal divider line',
			icon: '➖',
			defaultProps: {
				orientation: 'horizontal'
			}
		},

		// Content
		{
			type: 'Heading',
			label: 'Heading',
			category: 'Content',
			description: 'Semantic header h1-h4',
			icon: '🔤',
			defaultProps: {
				text: 'Build Something Great',
				level: 'h2'
			}
		},
		{
			type: 'Text',
			label: 'Text Paragraph',
			category: 'Content',
			description: 'Typography text with variants',
			icon: '📝',
			defaultProps: {
				text: 'This UI was assembled dynamically via json-render and interactive drag-and-drop.',
				variant: 'body'
			}
		},
		{
			type: 'Badge',
			label: 'Badge',
			category: 'Content',
			description: 'Status pill badge',
			icon: '🏷️',
			defaultProps: {
				text: 'Active',
				variant: 'default'
			}
		},

		// Forms
		{
			type: 'Input',
			label: 'Text Input',
			category: 'Forms',
			description: 'Form input field',
			icon: '⌨️',
			defaultProps: {
				label: 'Full Name',
				placeholder: 'Jane Doe',
				name: 'fullname',
				value: { $bindState: '/userName' }
			}
		},
		{
			type: 'Textarea',
			label: 'Textarea',
			category: 'Forms',
			description: 'Multi-line text area',
			icon: '📜',
			defaultProps: {
				label: 'Notes / Bio',
				placeholder: 'Enter notes here...',
				rows: 3,
				value: { $bindState: '/notes' }
			}
		},
		{
			type: 'Switch',
			label: 'Toggle Switch',
			category: 'Forms',
			description: 'Boolean switch control',
			icon: '🔘',
			defaultProps: {
				label: 'Enable notifications',
				name: 'notifications',
				checked: { $bindState: '/notifications' }
			}
		},
		{
			type: 'Slider',
			label: 'Slider Range',
			category: 'Forms',
			description: 'Numeric slider input',
			icon: '🎚️',
			defaultProps: {
				label: 'Volume / Intensity',
				min: 0,
				max: 100,
				step: 5,
				value: { $bindState: '/sliderVal' }
			}
		},

		// Feedback
		{
			type: 'Alert',
			label: 'Alert Banner',
			category: 'Feedback',
			description: 'Callout notification banner',
			icon: '🔔',
			defaultProps: {
				title: 'Quick Tip',
				message: 'Drag any item or reorder components by grabbing the handle.',
				type: 'info'
			}
		},
		{
			type: 'Progress',
			label: 'Progress Bar',
			category: 'Feedback',
			description: 'Visual progress percentage',
			icon: '📊',
			defaultProps: {
				value: 70,
				max: 100,
				label: 'Completion Status'
			}
		},

		// Actions
		{
			type: 'Button',
			label: 'Action Button',
			category: 'Actions',
			description: 'Interactive button trigger',
			icon: '⚡',
			defaultProps: {
				label: 'Click Me',
				variant: 'primary'
			}
		}
	];

	// Preset Templates
	const PRESETS: Record<string, { label: string; elements: Spec['elements']; state: Record<string, any>; rootChildren: string[] }> = {
		'login-form': {
			label: 'Login / Auth Form',
			state: { email: '', remember: true },
			rootChildren: ['auth-card'],
			elements: {
				'auth-card': {
					type: 'Card',
					props: { title: 'Welcome Back', description: 'Enter your credentials to continue' },
					children: ['auth-body']
				},
				'auth-body': {
					type: 'Stack',
					props: { direction: 'vertical', gap: 'md' },
					children: ['email-input', 'remember-switch', 'submit-btn']
				},
				'email-input': {
					type: 'Input',
					props: { label: 'Email Address', placeholder: 'user@example.com', value: { $bindState: '/email' } }
				},
				'remember-switch': {
					type: 'Switch',
					props: { label: 'Keep me signed in', checked: { $bindState: '/remember' } }
				},
				'submit-btn': {
					type: 'Button',
					props: { label: 'Sign In', variant: 'primary' }
				}
			}
		},
		'feedback-panel': {
			label: 'Feature Banner & Stats',
			state: { sliderVal: 65, active: true },
			rootChildren: ['tip-alert', 'stats-card'],
			elements: {
				'tip-alert': {
					type: 'Alert',
					props: { title: 'New release ready', message: 'All Shadcn components are live.', type: 'success' }
				},
				'stats-card': {
					type: 'Card',
					props: { title: 'Project Overview', description: 'Track progress and key metrics' },
					children: ['stats-body']
				},
				'stats-body': {
					type: 'Stack',
					props: { direction: 'vertical', gap: 'md' },
					children: ['progress-bar', 'action-badge', 'explore-btn']
				},
				'progress-bar': {
					type: 'Progress',
					props: { value: 65, max: 100, label: 'Migration complete' }
				},
				'action-badge': {
					type: 'Badge',
					props: { text: 'Production Ready', variant: 'default' }
				},
				'explore-btn': {
					type: 'Button',
					props: { label: 'View Analytics', variant: 'secondary' }
				}
			}
		}
	};

	// State for the editor
	let elements = $state<Record<string, any>>({
		'welcome-heading': {
			type: 'Heading',
			props: { text: 'JSON-Render Visual Builder', level: 'h2' }
		},
		'welcome-alert': {
			type: 'Alert',
			props: {
				title: 'Drag and Drop UI Ready',
				message: 'Drag components from the left palette into the drop zone or reorder items live.',
				type: 'info'
			}
		},
		'main-card': {
			type: 'Card',
			props: {
				title: 'Interactive Form',
				description: 'Form built with shadcn-svelte JSON spec'
			},
			children: ['card-stack']
		},
		'card-stack': {
			type: 'Stack',
			props: { direction: 'vertical', gap: 'md' },
			children: ['name-input', 'notify-switch', 'submit-btn']
		},
		'name-input': {
			type: 'Input',
			props: { label: 'Your Name', placeholder: 'Enter name…', value: { $bindState: '/userName' } }
		},
		'notify-switch': {
			type: 'Switch',
			props: { label: 'Receive updates', checked: { $bindState: '/notifications' } }
		},
		'submit-btn': {
			type: 'Button',
			props: { label: 'Save Changes', variant: 'primary' }
		}
	});

	let rootChildren = $state<string[]>([
		'welcome-heading',
		'welcome-alert',
		'main-card'
	]);

	let editorState = $state<Record<string, any>>({
		userName: 'Alex Rivers',
		notifications: true,
		sliderVal: 45,
		notes: 'Crafted with Svelte 5 runes'
	});

	let selectedElementId = $state<string | null>('welcome-heading');
	let activeTab = $state<'split' | 'canvas' | 'spec'>('split');
	let searchQuery = $state('');
	let copied = $state(false);

	// Drag state
	let draggedTemplate = $state<ComponentTemplate | null>(null);
	let draggedExistingId = $state<string | null>(null);
	let dragOverIndex = $state<number | null>(null);
	let isCanvasDragOver = $state(false);

	// Computed spec for JSON renderer
	let currentSpec = $derived<Spec>({
		root: 'root',
		state: editorState,
		elements: {
			root: {
				type: 'Stack',
				props: { direction: 'vertical', gap: 'md' },
				children: rootChildren
			},
			...elements
		}
	});

	// Filtered palette categories
	let categories = ['All', 'Layout', 'Content', 'Forms', 'Feedback', 'Actions'] as const;
	let selectedCategory = $state<string>('All');

	let filteredPalette = $derived(
		PALETTE.filter((item) => {
			const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
			const matchesSearch =
				item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);

	function generateId(prefix: string) {
		return `${prefix.toLowerCase()}-${Math.random().toString(36).substring(2, 7)}`;
	}

	// Add component from template
	function addComponent(template: ComponentTemplate, targetIndex?: number) {
		const newId = generateId(template.type);
		const newProps = JSON.parse(JSON.stringify(template.defaultProps));

		if (template.type === 'Card') {
			const bodyStackId = generateId('stack');
			const initialTextId = generateId('text');
			elements = {
				...elements,
				[newId]: {
					type: 'Card',
					props: newProps,
					children: [bodyStackId]
				},
				[bodyStackId]: {
					type: 'Stack',
					props: { direction: 'vertical', gap: 'sm' },
					children: [initialTextId]
				},
				[initialTextId]: {
					type: 'Text',
					props: { text: 'Card body content goes here.', variant: 'body' }
				}
			};
		} else {
			elements = {
				...elements,
				[newId]: {
					type: template.type,
					props: newProps,
					...(template.hasChildren ? { children: [] } : {})
				}
			};
		}

		if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= rootChildren.length) {
			rootChildren = [
				...rootChildren.slice(0, targetIndex),
				newId,
				...rootChildren.slice(targetIndex)
			];
		} else {
			rootChildren = [...rootChildren, newId];
		}

		selectedElementId = newId;
	}

	function removeElement(id: string) {
		rootChildren = rootChildren.filter((childId) => childId !== id);
		const nextElements = { ...elements };
		delete nextElements[id];
		elements = nextElements;
		if (selectedElementId === id) {
			selectedElementId = rootChildren[0] ?? null;
		}
	}

	function moveElement(fromIndex: number, toIndex: number) {
		if (fromIndex === toIndex) return;
		const updated = [...rootChildren];
		const [moved] = updated.splice(fromIndex, 1);
		updated.splice(toIndex, 0, moved);
		rootChildren = updated;
	}

	function loadPreset(presetKey: string) {
		const preset = PRESETS[presetKey];
		if (!preset) return;
		elements = JSON.parse(JSON.stringify(preset.elements));
		rootChildren = [...preset.rootChildren];
		editorState = { ...editorState, ...preset.state };
		selectedElementId = rootChildren[0] || null;
	}

	function copySpecJson() {
		navigator.clipboard.writeText(JSON.stringify(currentSpec, null, 2));
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function resetSpec() {
		elements = {};
		rootChildren = [];
		selectedElementId = null;
	}

	// HTML5 Drag and Drop handlers
	function handlePaletteDragStart(e: DragEvent, template: ComponentTemplate) {
		draggedTemplate = template;
		draggedExistingId = null;
		if (e.dataTransfer) {
			e.dataTransfer.setData('text/plain', template.type);
			e.dataTransfer.effectAllowed = 'copy';
		}
	}

	function handleCanvasItemDragStart(e: DragEvent, id: string, index: number) {
		draggedExistingId = id;
		draggedTemplate = null;
		if (e.dataTransfer) {
			e.dataTransfer.setData('text/plain', id);
			e.dataTransfer.effectAllowed = 'move';
		}
	}

	function handleDragOverZone(e: DragEvent, index: number) {
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = draggedTemplate ? 'copy' : 'move';
		}
		dragOverIndex = index;
	}

	function handleDrop(e: DragEvent, index: number) {
		e.preventDefault();
		e.stopPropagation();

		if (draggedTemplate) {
			addComponent(draggedTemplate, index);
		} else if (draggedExistingId) {
			const fromIndex = rootChildren.indexOf(draggedExistingId);
			if (fromIndex !== -1) {
				let target = index;
				if (fromIndex < index) {
					target = index - 1;
				}
				moveElement(fromIndex, Math.max(0, target));
			}
		}

		draggedTemplate = null;
		draggedExistingId = null;
		dragOverIndex = null;
		isCanvasDragOver = false;
	}

	function handleCanvasDragEnd() {
		draggedTemplate = null;
		draggedExistingId = null;
		dragOverIndex = null;
		isCanvasDragOver = false;
	}

	// Update selected element prop
	function updateSelectedProp(key: string, value: any) {
		if (!selectedElementId || !elements[selectedElementId]) return;
		elements = {
			...elements,
			[selectedElementId]: {
				...elements[selectedElementId],
				props: {
					...elements[selectedElementId].props,
					[key]: value
				}
			}
		};
	}
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased">
	<!-- Top Navigation Header -->
	<header class="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur">
		<div class="flex items-center gap-3">
			<a href="/" class="flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
				<span class="rounded bg-slate-800 px-2 py-1 text-[11px] font-mono tracking-wider text-slate-300">← Gallery</span>
			</a>
			<div class="h-4 w-px bg-slate-800"></div>
			<div class="flex items-center gap-2">
				<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-sm shadow-indigo-500/30">
					⚡
				</div>
				<h1 class="text-sm font-semibold tracking-tight text-white">
					json-render <span class="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Drag & Drop Studio</span>
				</h1>
			</div>
		</div>

		<!-- Presets & View Controls -->
		<div class="flex items-center gap-2">
			<!-- Presets dropdown -->
			<div class="flex items-center gap-1.5 text-xs text-slate-400">
				<span>Preset:</span>
				<button
					onclick={() => loadPreset('login-form')}
					class="rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
				>
					Auth Form
				</button>
				<button
					onclick={() => loadPreset('feedback-panel')}
					class="rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
				>
					Dashboard Card
				</button>
				<button
					onclick={resetSpec}
					class="rounded-md border border-red-900/50 bg-red-950/30 px-2.5 py-1 text-xs font-medium text-red-300 transition hover:bg-red-900/50"
				>
					Clear All
				</button>
			</div>

			<div class="h-4 w-px bg-slate-800"></div>

			<!-- View Tabs -->
			<div class="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5 text-xs">
				<button
					class="rounded px-2.5 py-1 transition {activeTab === 'split' ? 'bg-indigo-600 font-semibold text-white' : 'text-slate-400 hover:text-white'}"
					onclick={() => (activeTab = 'split')}
				>
					Split Studio
				</button>
				<button
					class="rounded px-2.5 py-1 transition {activeTab === 'canvas' ? 'bg-indigo-600 font-semibold text-white' : 'text-slate-400 hover:text-white'}"
					onclick={() => (activeTab = 'canvas')}
				>
					Builder Only
				</button>
				<button
					class="rounded px-2.5 py-1 transition {activeTab === 'spec' ? 'bg-indigo-600 font-semibold text-white' : 'text-slate-400 hover:text-white'}"
					onclick={() => (activeTab = 'spec')}
				>
					JSON Spec
				</button>
			</div>

			<button
				onclick={copySpecJson}
				class="flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 active:scale-95"
			>
				{#if copied}
					<span class="text-emerald-400">✓ Copied!</span>
				{:else}
					<span>📋 Copy Spec</span>
				{/if}
			</button>
		</div>
	</header>

	<!-- Main Workspace -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Left: Component Palette -->
		<aside class="flex w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-900/70 select-none">
			<div class="border-b border-slate-800 p-3">
				<div class="flex items-center justify-between pb-2">
					<h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Component Palette</h2>
					<span class="text-[10px] text-slate-500">Drag or Click</span>
				</div>
				<!-- Search -->
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search components..."
					class="w-full rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
				/>
				<!-- Category Filter Chips -->
				<div class="mt-2 flex flex-wrap gap-1">
					{#each categories as cat}
						<button
							onclick={() => (selectedCategory = cat)}
							class="rounded-full px-2 py-0.5 text-[10px] transition {selectedCategory === cat ? 'bg-indigo-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}"
						>
							{cat}
						</button>
					{/each}
				</div>
			</div>

			<!-- Palette Items List -->
			<div class="flex-1 space-y-1.5 overflow-y-auto p-3">
				{#each filteredPalette as item}
					<div
						draggable="true"
						role="button"
						tabindex="0"
						ondragstart={(e) => handlePaletteDragStart(e, item)}
						onclick={() => addComponent(item)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								addComponent(item);
							}
						}}
						class="group flex cursor-grab items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/60 p-2 transition-all hover:border-indigo-500/50 hover:bg-slate-800/60 active:cursor-grabbing active:scale-[0.98]"
					>
						<div class="flex items-center gap-2.5">
							<span class="flex h-7 w-7 items-center justify-center rounded-md bg-slate-800 text-sm group-hover:bg-indigo-950/60 group-hover:text-indigo-300">
								{item.icon}
							</span>
							<div>
								<div class="text-xs font-medium text-slate-200 group-hover:text-white">{item.label}</div>
								<div class="text-[10px] text-slate-500 line-clamp-1">{item.description}</div>
							</div>
						</div>
						<span class="text-xs text-slate-600 transition group-hover:text-indigo-400">+</span>
					</div>
				{/each}
			</div>

			<div class="border-t border-slate-800/80 bg-slate-950/40 p-2.5 text-center text-[11px] text-slate-500">
				💡 Drag onto the canvas or click to append.
			</div>
		</aside>

		<!-- Center: Visual Drag & Drop Canvas & Reordering Tree -->
		<div class="flex flex-1 flex-col overflow-hidden bg-slate-950/50">
			<!-- Canvas Title & Info -->
			<div class="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 px-4 py-2">
				<div class="flex items-center gap-2 text-xs text-slate-400">
					<span class="font-medium text-slate-300">Drop Zone & Spec Tree</span>
					<span class="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
						{rootChildren.length} items
					</span>
				</div>
				<div class="text-[11px] text-slate-500">
					Select an item to customize its properties in the Inspector
				</div>
			</div>

			<!-- Canvas drop container -->
			<div
				class="flex-1 overflow-y-auto p-6"
				ondragover={(e) => {
					e.preventDefault();
					isCanvasDragOver = true;
				}}
				ondragleave={() => (isCanvasDragOver = false)}
				ondrop={(e) => handleDrop(e, rootChildren.length)}
				ondragend={handleCanvasDragEnd}
				role="region"
				aria-label="Component Drop Area"
			>
				<div class="mx-auto max-w-xl space-y-2">
					<!-- Top drop zone -->
					<div
						role="region"
						aria-label="Drop at start"
						ondragover={(e) => handleDragOverZone(e, 0)}
						ondrop={(e) => handleDrop(e, 0)}
						class="transition-all duration-150 {dragOverIndex === 0 ? 'h-8 rounded-lg border-2 border-dashed border-indigo-400 bg-indigo-500/10' : 'h-1 opacity-0 hover:opacity-100'}"
					></div>

					{#if rootChildren.length === 0}
						<!-- Empty state -->
						<div
							class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/30 p-12 text-center"
						>
							<div class="mb-3 text-4xl">🎨</div>
							<h3 class="text-sm font-semibold text-slate-200">The canvas is currently empty</h3>
							<p class="mt-1 max-w-xs text-xs text-slate-400">
								Drag any component from the left palette or select a preset from the top bar to start building.
							</p>
							<div class="mt-4 flex gap-2">
								<button
									onclick={() => loadPreset('login-form')}
									class="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
								>
									Load Auth Form
								</button>
								<button
									onclick={() => loadPreset('feedback-panel')}
									class="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
								>
									Load Dashboard Card
								</button>
							</div>
						</div>
					{/if}

					<!-- Draggable canvas cards -->
					{#each rootChildren as childId, index (childId)}
						{@const element = elements[childId]}
						{#if element}
							<div
								draggable="true"
								role="button"
								tabindex="0"
								ondragstart={(e) => handleCanvasItemDragStart(e, childId, index)}
								ondragend={handleCanvasDragEnd}
								onclick={() => (selectedElementId = childId)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										selectedElementId = childId;
									}
								}}
								class="group relative flex items-center justify-between rounded-xl border p-3 transition-all {selectedElementId === childId ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50' : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'}"
							>
								<!-- Drag handle & Identity -->
								<div class="flex items-center gap-3">
									<div class="cursor-grab text-slate-600 transition group-hover:text-slate-400 active:cursor-grabbing" title="Drag to reorder">
										⋮⋮
									</div>
									<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-mono font-semibold text-slate-300">
										{index + 1}
									</div>
									<div>
										<div class="flex items-center gap-2">
											<span class="text-xs font-semibold text-white">{element.type}</span>
											<span class="rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">{childId}</span>
										</div>
										<div class="mt-0.5 text-[11px] text-slate-400">
											{#if element.type === 'Heading'}
												"{element.props?.text ?? ''}" ({element.props?.level ?? 'h2'})
											{:else if element.type === 'Text'}
												"{element.props?.text?.slice(0, 30) ?? ''}..."
											{:else if element.type === 'Button'}
												Label: "{element.props?.label ?? ''}" ({element.props?.variant ?? 'primary'})
											{:else if element.type === 'Card'}
												Title: "{element.props?.title ?? ''}"
											{:else if element.type === 'Input'}
												Field: "{element.props?.label ?? ''}"
											{:else if element.type === 'Alert'}
												Alert: "{element.props?.title ?? ''}"
											{:else}
												Props: {Object.keys(element.props || {}).length} configured
											{/if}
										</div>
									</div>
								</div>

								<!-- Controls -->
								<div class="flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
									<!-- Move up -->
									<button
										disabled={index === 0}
										onclick={(e) => {
											e.stopPropagation();
											moveElement(index, index - 1);
										}}
										class="rounded p-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-20"
										title="Move Up"
									>
										▲
									</button>
									<!-- Move down -->
									<button
										disabled={index === rootChildren.length - 1}
										onclick={(e) => {
											e.stopPropagation();
											moveElement(index, index + 1);
										}}
										class="rounded p-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-20"
										title="Move Down"
									>
										▼
									</button>
									<!-- Delete -->
									<button
										onclick={(e) => {
											e.stopPropagation();
											removeElement(childId);
										}}
										class="rounded p-1 text-xs text-red-400 transition hover:bg-red-950/60 hover:text-red-300"
										title="Delete Component"
									>
										✕
									</button>
								</div>
							</div>

							<!-- Inter-element drop zone -->
							<div
								role="region"
								aria-label="Drop slot"
								ondragover={(e) => handleDragOverZone(e, index + 1)}
								ondrop={(e) => handleDrop(e, index + 1)}
								class="transition-all duration-150 {dragOverIndex === index + 1 ? 'h-8 rounded-lg border-2 border-dashed border-indigo-400 bg-indigo-500/10' : 'h-1 opacity-0 hover:opacity-100'}"
							></div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Side: Live Shadcn Renderer or JSON Spec Inspector -->
		{#if activeTab === 'split'}
			<section class="flex w-[460px] shrink-0 flex-col border-l border-slate-800 bg-slate-900/60">
				<!-- Header -->
				<div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2">
					<div class="flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
						<h2 class="text-xs font-semibold text-slate-200">Live JSON Render Output</h2>
					</div>
					<span class="text-[10px] text-slate-500">@json-render/shadcn-svelte</span>
				</div>

				<!-- Live Render Area -->
				<div class="flex-1 overflow-y-auto bg-slate-950/80 p-5">
					<div class="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 shadow-inner">
						<StateProvider initialState={editorState}>
							<ActionProvider
								handlers={{
									save: async () => alert('Action triggered: Save!'),
									submit: async () => alert('Action triggered: Submit!')
								}}
							>
								<VisibilityProvider>
									<ValidationProvider>
										<Renderer spec={currentSpec} {registry} />
									</ValidationProvider>
								</VisibilityProvider>
							</ActionProvider>
						</StateProvider>
					</div>
				</div>

				<!-- Element Property Inspector at the bottom -->
				<div class="border-t border-slate-800 bg-slate-950 p-3">
					<h3 class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
						Properties: {selectedElementId ? `${elements[selectedElementId]?.type} (${selectedElementId})` : 'None selected'}
					</h3>

					{#if selectedElementId && elements[selectedElementId]}
						{@const selected = elements[selectedElementId]}
						<div class="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
							{#if selected.props?.text !== undefined && typeof selected.props?.text === 'string'}
								<div>
									<label for="prop-text" class="text-[10px] text-slate-400">Text Content</label>
									<input
										id="prop-text"
										type="text"
										value={selected.props.text}
										oninput={(e) => updateSelectedProp('text', (e.target as HTMLInputElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									/>
								</div>
							{/if}

							{#if selected.props?.title !== undefined}
								<div>
									<label for="prop-title" class="text-[10px] text-slate-400">Title</label>
									<input
										id="prop-title"
										type="text"
										value={selected.props.title}
										oninput={(e) => updateSelectedProp('title', (e.target as HTMLInputElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									/>
								</div>
							{/if}

							{#if selected.props?.description !== undefined}
								<div>
									<label for="prop-desc" class="text-[10px] text-slate-400">Description</label>
									<input
										id="prop-desc"
										type="text"
										value={selected.props.description}
										oninput={(e) => updateSelectedProp('description', (e.target as HTMLInputElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									/>
								</div>
							{/if}

							{#if selected.props?.label !== undefined && typeof selected.props?.label === 'string'}
								<div>
									<label for="prop-label" class="text-[10px] text-slate-400">Label</label>
									<input
										id="prop-label"
										type="text"
										value={selected.props.label}
										oninput={(e) => updateSelectedProp('label', (e.target as HTMLInputElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									/>
								</div>
							{/if}

							{#if selected.props?.placeholder !== undefined}
								<div>
									<label for="prop-placeholder" class="text-[10px] text-slate-400">Placeholder</label>
									<input
										id="prop-placeholder"
										type="text"
										value={selected.props.placeholder}
										oninput={(e) => updateSelectedProp('placeholder', (e.target as HTMLInputElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									/>
								</div>
							{/if}

							{#if selected.props?.variant !== undefined}
								<div>
									<label for="prop-variant" class="text-[10px] text-slate-400">Variant</label>
									<select
										id="prop-variant"
										value={selected.props.variant}
										onchange={(e) => updateSelectedProp('variant', (e.target as HTMLSelectElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									>
										<option value="primary">primary</option>
										<option value="secondary">secondary</option>
										<option value="outline">outline</option>
										<option value="destructive">destructive</option>
										<option value="default">default</option>
									</select>
								</div>
							{/if}

							{#if selected.props?.level !== undefined}
								<div>
									<label for="prop-level" class="text-[10px] text-slate-400">Heading Level</label>
									<select
										id="prop-level"
										value={selected.props.level}
										onchange={(e) => updateSelectedProp('level', (e.target as HTMLSelectElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									>
										<option value="h1">h1</option>
										<option value="h2">h2</option>
										<option value="h3">h3</option>
										<option value="h4">h4</option>
									</select>
								</div>
							{/if}

							{#if selected.props?.type !== undefined && selected.type === 'Alert'}
								<div>
									<label for="prop-alert-type" class="text-[10px] text-slate-400">Alert Type</label>
									<select
										id="prop-alert-type"
										value={selected.props.type}
										onchange={(e) => updateSelectedProp('type', (e.target as HTMLSelectElement).value)}
										class="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white"
									>
										<option value="info">info</option>
										<option value="success">success</option>
										<option value="warning">warning</option>
										<option value="destructive">destructive</option>
									</select>
								</div>
							{/if}
						</div>
					{:else}
						<p class="mt-2 text-xs text-slate-500">Select any component in the center list to tweak its props.</p>
					{/if}
				</div>
			</section>
		{:else if activeTab === 'spec'}
			<!-- Raw Spec View -->
			<section class="flex w-[480px] shrink-0 flex-col border-l border-slate-800 bg-slate-900/60 font-mono">
				<div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2">
					<span class="text-xs font-semibold text-slate-200">Generated Spec Object</span>
					<button
						onclick={copySpecJson}
						class="text-[10px] text-indigo-400 hover:text-indigo-300"
					>
						{copied ? 'Copied!' : 'Copy JSON'}
					</button>
				</div>
				<pre class="flex-1 overflow-auto p-4 text-[11px] leading-relaxed text-emerald-400/90">{JSON.stringify(currentSpec, null, 2)}</pre>
			</section>
		{/if}
	</div>
</div>
