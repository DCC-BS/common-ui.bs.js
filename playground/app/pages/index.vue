<script setup lang="ts">
import type { DropdownMenuItem } from '#ui/types';
import { SettingsButton } from '../../../src/runtime/components';

const settingsItems = [
    {
        label: "Test Settings",
        icon: "i-lucide-shield-check"
    }
] as DropdownMenuItem[];

</script>

<template>
    <NavigationBar>
        <template #rightPostItems>
            <SettingsButton :items="settingsItems" />
        </template>
    </NavigationBar>

    <div class="min-h-[200px] md:h-[calc(100vh-120px)] flex flex-col">
        <div class="p-4 h-full">
            <SplitContainer>
                <template #header>
                    <h2 class="text-lg font-bold">This is a split container</h2>
                    <UButton variant="link" color="primary">primary test</UButton>
                    <UButton variant="link" color="secondary">secondary test</UButton>
                </template>

                <template #left>
                    <div class="relative h-full w-full p-4 min-h-[200px]">
                        <div class="overflow-y-auto h-full">
                            <h3 class="text-md font-semibold">Left Side</h3>
                            <p>This is the left side content. asd asdasdas dasd asd asd asd asd as dasd asd
                                asdasd
                                asdasd asdasdasdasdasd </p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                            <p>dasdasasdsd</p>
                        </div>

                        <div
                            class="text-neutral-500 text-sm absolute bottom-0 left-2 right-2 flex justify-between items-center">
                            <UndoRedoButtons :can-redo="true" :can-undo="true" />
                            <span> 0 / 100000 Zeichen</span>
                        </div>
                    </div>
                </template>

                <template #right>
                    <div class="relative h-full w-full p-4 min-h-[200px]">
                        <h3 class="text-md font-semibold">Right Side</h3>
                        <p>This is the right side content. adasd asdas dadas das dasd asd asdasd as dasd asd
                        </p>
                    </div>
                </template>
            </SplitContainer>
        </div>
        <DataBsFooter size="sm">
            <UButton icon="i-lucide-message-square">Feedback</UButton>
        </DataBsFooter>
    </div>
</template>
