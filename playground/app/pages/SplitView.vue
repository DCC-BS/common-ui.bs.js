<script setup lang="ts">
import { SplitView } from "@dcc-bs/common-ui.bs.js";

</script>

<template>
    <div class="h-[800px]">
        <SplitView :isHorizontal="false">
            <template #a>
                <div>Pane A Content</div>
            </template>
            <template #b>
                <div>Pane B Content</div>
            </template>
        </SplitView>
    </div>
</template>