import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  WithAriaDescription,
} from './types'

const withAriaDescription = <P extends object>(
  Component: Parameters<WithAriaDescription<P>>[0],
): ReturnType<WithAriaDescription<P>> => {
  const result: ReturnType<WithAriaDescription<P>> = ({
    accessibilityHint,
    ...props
  }: AriaDescriptionProps & AccessibilityHintProps & P) => (
    // @ts-expect-error P as object is too broad a type and throws ts-2322.
    <Component
      accessibilityHint={props['aria-description'] ?? accessibilityHint}
      {...props}
    />
  )

  return Object.assign(result, Component)
}

export default withAriaDescription
