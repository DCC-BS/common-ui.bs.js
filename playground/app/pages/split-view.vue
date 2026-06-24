<template>
    <div class="h-[800px]">
        <SplitView :is-horizontal="false">
            <template #a>
                <div>Pane A Content</div>
            </template>
            <template #b>
                <div>Pane B Content</div>
            </template>
        </SplitView>
    </div>
</template>
