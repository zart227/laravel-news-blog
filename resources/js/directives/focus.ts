import type { Directive } from 'vue'

export const focus: Directive = {
    mounted: (el) => {
        el.focus()
    },
    updated: (el) => {
        el.focus()
    }
} 