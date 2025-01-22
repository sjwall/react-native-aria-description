import type {AriaAttributes, ComponentType} from 'react'
import type {ViewProps} from 'react-native'

export type AccessibilityHintProps = {
  /**
   * @deprecated
   * use aria-description instead
   */
  accessibilityHint?: ViewProps['accessibilityHint']
}

export type AriaDescriptionProps = Pick<AriaAttributes, 'aria-description'>

export type WithAriaDescription<P = {}> = (
  Component: ComponentType<P>,
  replaceWithDescribedBy?: boolean,
) => ComponentType<AriaDescriptionProps & P>
