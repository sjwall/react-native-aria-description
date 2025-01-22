import {useEffect, useId, useRef} from 'react'
import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  WithAriaDescription,
} from './types'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
})

const withDescribedBy =
  <P extends object>(
    Component: Parameters<WithAriaDescription<P>>[0],
  ): ReturnType<WithAriaDescription<P>> =>
  ({
    accessibilityHint,
    ...props
  }: AriaDescriptionProps & AccessibilityHintProps & P) => {
    const id = useId()
    const ref = useRef(null)

    useEffect(() => {
      if (ref.current) {
        // Manually add the aria-describedby attribute
        ;(ref.current as HTMLElement)?.setAttribute('aria-describedby', id)
      }
    }, [id])

    // As per the aria guidelines if the content is already on the screen then reference that instead
    if (!(props as any)['aria-describedby']) {
      return [
        // @ts-expect-error P as object is too broad a type and throws ts-2322.
        <Component
          ref={ref}
          key="component"
          {...props}
          aria-describedby={id}
        />,
        <p
          key="described-by"
          style={styles.hidden}
          id={id}>
          {accessibilityHint ?? props['aria-description']}
        </p>,
      ]
    }
    // @ts-expect-error P as object is too broad a type and throws ts-2322.
    return <Component {...props} />
  }

const withDescription =
  <P extends object>(
    Component: Parameters<WithAriaDescription<P>>[0],
  ): ReturnType<WithAriaDescription<P>> =>
  ({
    accessibilityHint,
    ...props
  }: AriaDescriptionProps & AccessibilityHintProps & P) => {
    const ref = useRef(null)
    const description = props['aria-description'] ?? accessibilityHint

    useEffect(() => {
      if (ref.current && description) {
        // Manually add the aria-description attribute
        ;(ref.current as HTMLElement)?.setAttribute(
          'aria-description',
          description,
        )
      }
    }, [])

    return (
      // @ts-expect-error P as object is too broad a type and throws ts-2322.
      <Component
        {...props}
        aria-description={description}
      />
    )
  }

const withAriaDescription = <P extends object>(
  Component: Parameters<WithAriaDescription<P>>[0],
  replaceWithDescribedBy: Parameters<WithAriaDescription<P>>[1] = true,
): ReturnType<WithAriaDescription<P>> => {
  let result: ReturnType<WithAriaDescription<P>>
  if (replaceWithDescribedBy) {
    result = withDescribedBy<P>(Component)
  } else {
    result = withDescription<P>(Component)
  }

  return Object.assign(result, Component)
}

export default withAriaDescription
