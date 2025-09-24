<script lang="ts" setup>
import { ref } from "vue";

const toast = useToast();

// Reactive data for testing
const variant = ref<"solid" | "outline" | "ghost" | "subtle" | "link">("solid");
const inputValue = ref("");
const textareaValue = ref("");
const selectValue = ref("");
const checkboxValue = ref(false);
const switchValue = ref(false);
const radioValue = ref("option1");
const sliderValue = ref(50);
const progressValue = ref(75);
const isModalOpen = ref(false);
const isDrawerOpen = ref(false);
const activeTab = ref("tab1");
const colorValue = ref("#3b82f6");
const pinValue = ref(["", "", "", ""]);
const numberValue = ref(10);
const tags = ref(["Vue", "Nuxt"]);

// Mock data
const selectItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
];

const tableRows = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

const tableColumns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
];

const accordionItems = [
    { label: "Section 1", content: "Content for section 1" },
    { label: "Section 2", content: "Content for section 2" },
    { label: "Section 3", content: "Content for section 3" },
];

const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Components", to: "/" },
    { label: "Theme" },
];

const timelineItems = [
    { title: "Event 1", description: "Description 1", date: "2023-01-01" },
    { title: "Event 2", description: "Description 2", date: "2023-02-01" },
    { title: "Event 3", description: "Description 3", date: "2023-03-01" },
];

const showToast = (
    color:
        | "success"
        | "error"
        | "info"
        | "warning"
        | "primary"
        | "secondary"
        | "neutral"
        | undefined,
) => {
    toast.add({
        title: "Notification",
        description: "This is a toast notification.",
        color: color,
        duration: 3000,
    });
};
</script>

<template>
    <UContainer class="py-8">
        <div class="space-y-8">

            <!-- Header -->
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-4">Nuxt UI v3 Component Testing</h1>
                <p class="text-gray-600 dark:text-gray-400">Test all Nuxt UI components and their styling</p>
            </div>

            <!-- Element Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Element Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Buttons -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Buttons</h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <USelectMenu :items="['link', 'outline', 'soft', 'subtle', 'ghost', 'solid']"
                                v-model="variant" />
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <UButton color="primary" :variant="variant">Primary</UButton>
                            <UButton color="secondary" :variant="variant">Secondary</UButton>
                            <UButton color="success" :variant="variant">Success</UButton>
                            <UButton color="info" :variant="variant">Info</UButton>
                            <UButton color="warning" :variant="variant">Warning</UButton>
                            <UButton color="error" :variant="variant">Error</UButton>
                            <UButton :variant="variant" disabled>Disabled</UButton>
                        </div>
                    </div>

                    <!-- Alerts -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Alerts</h3>
                        <div class="space-y-2">
                            <UAlert title="Success!" description="Your action was successful." color="success" />
                            <UAlert title="Warning!" description="Please check your input." color="warning" />
                            <UAlert title="Error!" description="Something went wrong." color="error" />
                            <UAlert title="Info" description="Here's some information." color="info" />
                        </div>
                    </div>

                    <!-- Badges & Chips -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Badges & Chips</h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <UBadge>Default</UBadge>
                            <UBadge color="primary">Primary</UBadge>
                            <UBadge color="success">Success</UBadge>
                            <UBadge color="warning">Warning</UBadge>
                            <UBadge color="error">Error</UBadge>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <UChip>5</UChip>
                            <UChip color="primary">10</UChip>
                            <UChip color="success">New</UChip>
                        </div>
                    </div>

                    <!-- Avatars -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Avatars</h3>
                        <div class="flex gap-2 items-center">
                            <UAvatar src="https://via.placeholder.com/40" alt="User" />
                            <UAvatar>JD</UAvatar>
                            <UAvatar size="sm">SM</UAvatar>
                            <UAvatar size="lg">LG</UAvatar>
                        </div>
                    </div>

                    <!-- Progress & Skeleton -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Progress & Loading</h3>
                        <div class="space-y-4">
                            <UProgress :value="progressValue" />
                            <div class="space-y-2">
                                <USkeleton class="h-4 w-full" />
                                <USkeleton class="h-4 w-3/4" />
                                <USkeleton class="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>

                    <!-- Icons & Kbd -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Icons & Keyboard</h3>
                        <div class="flex gap-4 items-center">
                            <UIcon name="i-heroicons-heart" class="text-red-500" />
                            <UIcon name="i-heroicons-star" class="text-yellow-500" />
                            <UIcon name="i-heroicons-check" class="text-green-500" />
                            <div class="flex gap-1">
                                <UKbd>⌘</UKbd>
                                <UKbd>K</UKbd>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Form Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Form Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Text Inputs -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Text Inputs</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UInput v-model="inputValue" placeholder="Text input" />
                            <UInput type="email" placeholder="Email input" />
                            <UInput type="password" placeholder="Password input" />
                            <UInputNumber v-model="numberValue" placeholder="Number input" />
                        </div>
                    </div>

                    <!-- Textarea -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Textarea</h3>
                        <UTextarea v-model="textareaValue" placeholder="Enter your message..." :rows="3" />
                    </div>

                    <!-- Select & Menu -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Select & Menu</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <USelect v-model="selectValue" :options="selectItems" placeholder="Select option" />
                            <USelectMenu v-model="selectValue" :options="selectItems" placeholder="Select menu" />
                        </div>
                    </div>

                    <!-- Checkboxes & Radio -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Checkboxes & Radio</h3>
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <UCheckbox v-model="checkboxValue" label="Checkbox option" />
                                <USwitch v-model="switchValue" />
                            </div>
                            <URadioGroup v-model="radioValue" :options="[
                                { value: 'option1', label: 'Option 1' },
                                { value: 'option2', label: 'Option 2' },
                                { value: 'option3', label: 'Option 3' }
                            ]" />
                        </div>
                    </div>

                    <!-- Slider & Color Picker -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Slider & Color</h3>
                        <div class="space-y-4">
                            <USlider v-model="sliderValue" :min="0" :max="100" />
                            <UColorPicker v-model="colorValue" />
                        </div>
                    </div>

                    <!-- Special Inputs -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Special Inputs</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UPinInput v-model="pinValue" :length="4" placeholder="0" />
                            <UInputTags v-model="tags" placeholder="Add tags..." />
                        </div>
                    </div>

                    <!-- File Upload -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">File Upload</h3>
                        <UFileUpload />
                    </div>
                </div>
            </UCard>

            <!-- Data Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Data Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Table -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Table</h3>
                        <UTable :rows="tableRows" :columns="tableColumns" />
                    </div>

                    <!-- Accordion -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Accordion</h3>
                        <UAccordion :items="accordionItems" />
                    </div>

                    <!-- Timeline -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Timeline</h3>
                        <UTimeline :items="timelineItems" />
                    </div>

                    <!-- Carousel -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Carousel</h3>
                        <UCarousel :items="[
                            { src: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Slide+1' },
                            { src: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Slide+2' },
                            { src: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Slide+3' }
                        ]" />
                    </div>
                </div>
            </UCard>

            <!-- Navigation Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Navigation Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Breadcrumbs -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Breadcrumbs</h3>
                        <UBreadcrumb :items="breadcrumbItems" />
                    </div>

                    <!-- Tabs -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Tabs</h3>
                        <UTabs v-model="activeTab" :items="[
                            { key: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
                            { key: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
                            { key: 'tab3', label: 'Tab 3', content: 'Content for tab 3' }
                        ]" />
                    </div>

                    <!-- Pagination -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Pagination</h3>
                        <UPagination :total="100" :page-size="10" />
                    </div>

                    <!-- Links -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Links</h3>
                        <div class="space-y-2">
                            <ULink to="/" class="block">Home Link</ULink>
                            <ULink to="/" class="block">About Link</ULink>
                            <ULink href="https://nuxt.com" target="_blank" class="block">External Link</ULink>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Overlay Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Overlay Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Modal & Drawer Triggers -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Modals & Drawers</h3>
                        <div class="flex gap-4">
                            <UButton @click="isModalOpen = true">Open Modal</UButton>
                            <UButton @click="isDrawerOpen = true">Open Drawer</UButton>
                            <UButton @click="showToast('primary')">Show Primary Toast</UButton>
                            <UButton @click="showToast('secondary')">Show Secondary Toast</UButton>
                            <UButton @click="showToast('neutral')">Show Secondary Toast</UButton>
                            <UButton @click="showToast('info')">Show Info Toast</UButton>
                            <UButton @click="showToast('error')">Show Error Toast</UButton>
                            <UButton @click="showToast('warning')">Show Warning Toast</UButton>
                            <UButton @click="showToast('success')">Show Success Toast</UButton>
                        </div>
                    </div>

                    <!-- Popover -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Popover</h3>
                        <UPopover>
                            <UButton>Open Popover</UButton>

                            <template #content>
                                <div class="p-4">
                                    <h4 class="font-medium mb-2">Popover Content</h4>
                                    <p class="text-sm text-gray-600">This is the popover content.</p>
                                </div>
                            </template>
                        </UPopover>
                    </div>

                    <!-- Dropdown Menu -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Dropdown Menu</h3>
                        <UDropdownMenu :items="[
                            [{ label: 'Profile', icon: 'i-heroicons-user' }],
                            [{ label: 'Settings', icon: 'i-heroicons-cog' }],
                            [{ label: 'Logout', icon: 'i-heroicons-arrow-right-on-rectangle' }]
                        ]">
                            <UButton trailing-icon="i-heroicons-chevron-down">
                                Menu
                            </UButton>
                        </UDropdownMenu>
                    </div>
                </div>
            </UCard>

            <!-- Layout Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Layout Components</h2>
                </template>

                <div class="space-y-6">
                    <!-- Container -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Container</h3>
                        <UContainer class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                            <p>This content is inside a UContainer component.</p>
                        </UContainer>
                    </div>

                    <!-- Separator -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Separator</h3>
                        <div class="flex items-center gap-4">
                            <span>Before</span>
                            <USeparator orientation="vertical" class="h-6" />
                            <span>After</span>
                        </div>
                        <USeparator class="my-4" />
                    </div>

                    <!-- Collapsible -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Collapsible</h3>
                        <UCollapsible>
                            <template #header>
                                <span>Click to expand</span>
                            </template>
                            <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded">
                                <p>This content can be collapsed and expanded.</p>
                            </div>
                        </UCollapsible>
                    </div>
                </div>
            </UCard>

            <!-- Color Mode & Theme -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Theme & Color Mode</h2>
                </template>
                
                <div class="space-y-6">
                    <!-- Color Mode Controls -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Color Mode</h3>
                        <div class="flex gap-4 items-center">
                            <UColorModeButton />
                            <UColorModeSelect />
                            <UColorModeSwitch />
                        </div>
                    </div>

                    <!-- Color Mode Images -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Color Mode Elements</h3>
                        <div class="flex gap-4 items-center">
                            <UColorModeAvatar 
                                :light-src="'https://via.placeholder.com/40/3b82f6/ffffff'"
                                :dark-src="'https://via.placeholder.com/40/1f2937/ffffff'"
                                alt="Theme Avatar" 
                            />
                            <UColorModeImage
                                :light-src="'https://via.placeholder.com/60x40/3b82f6/ffffff'"
                                :dark-src="'https://via.placeholder.com/60x40/1f2937/ffffff'"
                                alt="Theme Image"
                                class="rounded"
                            />
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- Additional Components -->
            <UCard>
                <template #header>
                    <h2 class="text-2xl font-semibold">Additional Components</h2>
                </template>
                
                <div class="space-y-6">
                    <!-- Command Palette -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Command Palette</h3>
                        <UCommandPalette :options="[
                            { label: 'Search...', value: 'search' },
                            { label: 'Create new...', value: 'create' },
                            { label: 'Settings', value: 'settings' }
                        ]" />
                    </div>

                    <!-- Calendar -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Calendar</h3>
                        <UCalendar />
                    </div>

                    <!-- Stepper -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Stepper</h3>
                        <UStepper :items="[
                            { title: 'Step 1', description: 'First step' },
                            { title: 'Step 2', description: 'Second step' },
                            { title: 'Step 3', description: 'Final step' }
                        ]" />
                    </div>

                    <!-- Context Menu -->
                    <div>
                        <h3 class="text-lg font-medium mb-3">Context Menu</h3>
                        <UContextMenu :items="[
                            [{ label: 'Cut', icon: 'i-heroicons-scissors' }],
                            [{ label: 'Copy', icon: 'i-heroicons-document-duplicate' }],
                            [{ label: 'Paste', icon: 'i-heroicons-clipboard' }]
                        ]">
                            <div class="p-4 border-2 border-dashed border-gray-300 rounded text-center">
                                Right-click me for context menu
                            </div>
                        </UContextMenu>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Modal -->
        <UModal v-model:open="isModalOpen">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Modal Title</h3>
                </template>

                <p>This is the modal content. You can put any content here.</p>

                <template #footer>
                    <div class="flex justify-end gap-2">
                        <UButton color="neutral" @click="isModalOpen = false">Cancel</UButton>
                        <UButton @click="isModalOpen = false">Confirm</UButton>
                    </div>
                </template>
            </UCard>
        </UModal>

        <!-- Drawer -->
        <UDrawer v-model:open="isDrawerOpen">
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Drawer Title</h3>
                </template>

                <p>This is the drawer content. Drawers slide in from the side of the screen.</p>

                <template #footer>
                    <div class="flex justify-end">
                        <UButton @click="isDrawerOpen = false">Close</UButton>
                    </div>
                </template>
            </UCard>
        </UDrawer>

    </UContainer>
</template>
