import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type Component,
  type ComponentType,
  type ForwardRefExoticComponent,
  type MutableRefObject,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react'
import {StyleSheet} from 'react-native'
import type {
  AccessibilityHintProps,
  AriaDescriptionProps,
  OptionalAccessibilityHint,
  WithAriaDescriptionOptions,
} from './types'
import mergeDefaultShallow from './mergeDefaultShallow'

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
})

const withDescribedBy = <T, P = {}>(
  Component: Component<P> | ComponentType<P> | ForwardRefExoticComponent<P>,
) =>
  forwardRef<T, AriaDescriptionProps & AccessibilityHintProps & P>(
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

const withDescribedByUseEffect = <T, P = {}>(
  Component: Component<P> | ComponentType<P> | ForwardRefExoticComponent<P>,
) =>
  forwardRef<T, AriaDescriptionProps & AccessibilityHintProps & P>(
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

const withDescription = <T, P = {}>(
  Component: Component<P> | ComponentType<P> | ForwardRefExoticComponent<P>,
) =>
  forwardRef<T, AriaDescriptionProps & AccessibilityHintProps & P>(
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

const withDescriptionUseEffect = <T, P = {}>(
  Component: Component<P> | ComponentType<P> | ForwardRefExoticComponent<P>,
) =>
  forwardRef<T, AriaDescriptionProps & AccessibilityHintProps & P>(
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

const withAriaDescription = <T, C, P>(
  Component: C,
  {web}: WithAriaDescriptionOptions = {},
) => {
  let result: ReturnType<typeof forwardRef<T, AriaDescriptionProps & P>>
  const replaceWithDescribedBy =
    web?.replaceWithDescribedBy === undefined || web.replaceWithDescribedBy
  if (web?.useEffect) {
    if (replaceWithDescribedBy) {
      result = withDescribedByUseEffect<T, P>(Component as ComponentType<P>)
    } else {
      result = withDescriptionUseEffect<T, P>(Component as ComponentType<P>)
    }
  } else if (replaceWithDescribedBy) {
    result = withDescribedBy<T, P>(Component as ComponentType<P>)
  } else {
    result = withDescription<T, P>(Component as ComponentType<P>)
  }

  const combined = mergeDefaultShallow(result, Component)
  return combined as C &
    ForwardRefExoticComponent<
      PropsWithoutRef<OptionalAccessibilityHint<P> & AriaDescriptionProps> &
        RefAttributes<T>
    >
}

export default withAriaDescription
