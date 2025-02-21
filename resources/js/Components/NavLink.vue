<template>
  <Link
    :class="{
      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none': true,
      'border-indigo-400 text-gray-900 focus:border-indigo-700': active,
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300': !active,
    }"
  >
    <slot />
  </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
  components: {
    Link,
  },

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script> 