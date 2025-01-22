import type {AriaAttributes} from 'react'
import type {ViewProps} from 'react-native'

export type AccessibilityHintProps = {
  /**
   * @deprecated
   * use aria-description instead
   */
  accessibilityHint?: ViewProps['accessibilityHint']
}

export type AriaDescriptionProps = Pick<AriaAttributes, 'aria-description'>

export type WithAriaDescriptionOptionsWeb = {
  useEffect?: boolean
  replaceWithDescribedBy?: boolean
}

export type WithAriaDescriptionOptions = {
  web?: WithAriaDescriptionOptionsWeb
}
