import {forwardRef} from 'react'
import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  WithAriaDescriptionOptions,
} from './types'
import assignStatic from './assignStatic'

const withAriaDescription = <C extends {}, P = {}>(
  Component: C,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-expect-error
  options: WithAriaDescriptionOptions = {},
) => {
  const result = forwardRef<
    unknown,
    AriaDescriptionProps & AccessibilityHintProps & P
  >(
    (
      {accessibilityHint, 'aria-description': ariaDescription, ...props},
      ref,
    ) => (
      // @ts-expect-error P as object is too broad a type and throws ts-2322.
      <Component
        ref={ref}
        accessibilityHint={ariaDescription ?? accessibilityHint}
        {...props}
      />
    ),
  )

  const combined = assignStatic(result, Component)
  return combined
}

export default withAriaDescription
