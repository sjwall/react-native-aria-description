import {
  forwardRef,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react'
import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  OptionalAccessibilityHint,
  WithAriaDescriptionOptions,
} from './types'
import mergeDefaultShallow from './mergeDefaultShallow'

const withAriaDescription = <T, C, P>(
  Component: C,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-expect-error
  options: WithAriaDescriptionOptions = {},
) => {
  const result = forwardRef<
    T,
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

  const combined = mergeDefaultShallow(result, Component)
  return combined as C &
    ForwardRefExoticComponent<
      PropsWithoutRef<OptionalAccessibilityHint<P> & AriaDescriptionProps> &
        RefAttributes<T>
    >
}

export default withAriaDescription
