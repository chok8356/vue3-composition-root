<template>
  <button
    :class="[
      $style.button,
      {
        [$style.disabled]: disabled,
        [$style.primary]: type === 'primary',
        [$style.secondary]: type === 'secondary',
      },
    ]"
    :disabled="disabled">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
    text: string
    type?: 'primary' | 'secondary'
  }>(),
  {
    disabled: false,
    text: '',
    type: 'primary',
  },
)
</script>

<style module>
.button {
  appearance: none;
  background-color: var(--color-primary);
  border: none;
  border-radius: 0.5rem;
  color: var(--color-white);
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    filter: var(--filter-hover);
  }

  &.disabled {
    filter: brightness(90%) saturate(50%);
    pointer-events: none;
  }

  &.primary {
    background-color: var(--color-primary);
  }

  &.secondary {
    background-color: var(--color-secondary);
  }
}
</style>
