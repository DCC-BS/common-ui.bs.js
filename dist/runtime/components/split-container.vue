<template>
    <div class="shadow-[2px_2px_1px_1px_#0000000D] ring-1 ring-default rounded-md flex flex-col">
        <div class="border-b-1 border-default p-4">
            <slot name="header" />
        </div>

        <div class="flex-grow flex flex-col md:flex-row justify-stretch items-stretch">
            <div class="flex-1">
                <slot name="left" />
            </div>

            <div class="border-t-1 md:border-l-1 md:border-t-0 border-default"></div>

            <div class="flex-1">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>
