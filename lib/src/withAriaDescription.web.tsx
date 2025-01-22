import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type MutableRefObject,
} from 'react'
import {StyleSheet} from 'react-native'
import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  WithAriaDescriptionOptions,
} from './types'
import assignStatic from './assignStatic'

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
})

const withDescribedBy = <C extends {}, P = {}>(Component: C) =>
  forwardRef<C, AriaDescriptionProps & AccessibilityHintProps & P>(
    (
      {accessibilityHint, 'aria-description': ariaDescription, ...props},
      ref,
    ) => {
      const id = useId()
      const description = ariaDescription ?? accessibilityHint

      // As per the aria guidelines if the content is already on the screen then reference that instead
      if (!(props as any)['aria-describedby'] && description) {
        return [
          // @ts-expect-error P as object is too broad a type and throws ts-2322.
          <Component
            key="component"
            ref={ref}
            {...props}
            aria-describedby={id}
          />,
          <p
            key="described-by"
            style={styles.hidden}
            id={id}>
            {description}
          </p>,
        ]
      }
      return (
        // @ts-expect-error P as object is too broad a type and throws ts-2322.
        <Component
          ref={ref}
          {...props}
        />
      )
    },
  )

const withDescribedByUseEffect = <C extends {}, P = {}>(Component: C) =>
  forwardRef<C, AriaDescriptionProps & AccessibilityHintProps & P>(
    (
      {accessibilityHint, 'aria-description': ariaDescription, ...props},
      ref,
    ) => {
      const internalRef = useRef(null)
      const id = useId()
      const description = ariaDescription ?? accessibilityHint

      useEffect(() => {
        const refToUse = (ref as MutableRefObject<unknown>) ?? internalRef
        if (refToUse?.current && description) {
          // Manually add the aria-describedby attribute
          ;(refToUse?.current as HTMLElement)?.setAttribute(
            'aria-describedby',
            id,
          )
        }
      }, [ref, description, id])

      // As per the aria guidelines if the content is already on the screen then reference that instead
      if (!(props as any)['aria-describedby'] && description) {
        return [
          // @ts-expect-error P as object is too broad a type and throws ts-2322.
          <Component
            key="component"
            ref={ref ?? internalRef}
            {...props}
          />,
          <p
            key="described-by"
            style={styles.hidden}
            id={id}>
            {description}
          </p>,
        ]
      }
      return (
        // @ts-expect-error P as object is too broad a type and throws ts-2322.
        <Component
          ref={ref}
          {...props}
        />
      )
    },
  )

const withDescription = <C extends {}, P = {}>(Component: C) =>
  forwardRef<C, AriaDescriptionProps & AccessibilityHintProps & P>(
    (
      {accessibilityHint, 'aria-description': ariaDescription, ...props},
      ref,
    ) => {
      const description = ariaDescription ?? accessibilityHint

      return (
        // @ts-expect-error P as object is too broad a type and throws ts-2322.
        <Component
          ref={ref}
          {...props}
          aria-description={description}
        />
      )
    },
  )

const withDescriptionUseEffect = <C extends {}, P = {}>(Component: C) =>
  forwardRef<C, AriaDescriptionProps & AccessibilityHintProps & P>(
    (
      {accessibilityHint, 'aria-description': ariaDescription, ...props},
      ref,
    ) => {
      const internalRef = useRef(null)
      useEffect(() => {
        const refToUse = (ref as MutableRefObject<unknown>) ?? internalRef
        const description = ariaDescription ?? accessibilityHint
        if (refToUse?.current && description) {
          // Manually add the aria-description attribute
          ;(refToUse?.current as HTMLElement)?.setAttribute(
            'aria-description',
            description,
          )
        }
      }, [ref, ariaDescription, accessibilityHint])

      return (
        // @ts-expect-error P as object is too broad a type and throws ts-2322.
        <Component
          ref={ref ?? internalRef}
          {...props}
        />
      )
    },
  )

const withAriaDescription = <C extends {}, P = {}>(
  Component: C,
  {web}: WithAriaDescriptionOptions = {},
) => {
  let result: ReturnType<
    typeof forwardRef<C, AriaDescriptionProps & AccessibilityHintProps & P>
  >
  const replaceWithDescribedBy =
    web?.replaceWithDescribedBy === undefined || web.replaceWithDescribedBy
  if (web?.useEffect) {
    if (replaceWithDescribedBy) {
      result = withDescribedByUseEffect<C, P>(Component)
    } else {
      result = withDescriptionUseEffect<C, P>(Component)
    }
  } else if (replaceWithDescribedBy) {
    result = withDescribedBy<C, P>(Component)
  } else {
    result = withDescription<C, P>(Component)
  }

  const combined = assignStatic(result, Component)
  return combined
}

export default withAriaDescription
