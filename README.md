# react-native-aria-description

<h3 align="center">
  Cross-platform aria-description.
</h3>

[![npm version](https://badge.fury.io/js/react-native-aria-description.svg)][npm]
[![npm downloads](https://img.shields.io/npm/dw/react-native-aria-description?logo=npm&label=NPM%20downloads&cacheSeconds=3600)][npm]
[![GitHub license](https://img.shields.io/github/license/sjwall/react-native-aria-description)][license]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)][pr]

Maps [aria-description](https://w3c.github.io/aria/#aria-description) to [accessibilityHint](https://reactnative.dev/docs/accessibility#accessibilityhint) on native and on web polyfills with [aria-describedby](https://w3c.github.io/aria/#aria-describedby) to link to a hidden `<p>` containing the description.

If you pass `aria-describedby` on web as a prop it won't override it.

## Installing

To install react-native-aria-description:

```bash
npm install react-native-aria-description
```

## Using

Wrap your component with `withAriaDescription`:

```diff
import {View, Text, Button} from 'react-native'
+import {withAriaDescription} from 'react-native-aria-description'
+
+const CustomButton = withAriaDescription(Button)

export default function App() {
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
-      <Button
+      <CustomButton
        title="Press me"
-        accessibilityHint="Pressing this button will print a statement in the console."
+        aria-description="Pressing this button will print a statement in the console."
        onPress={() => console.log('button has been pressed')}
      />
    </View>
  )
}
```

If you want the web element to use `aria-description` instead of the `aria-describedby` polyfill then call with `false`: `withAriaDescription(Button, false)`.

<!-- Definitions -->

[license]: https://github.com/sjwall/react-native-aria-description/blob/main/LICENSE

[npm]: https://www.npmjs.com/package/react-native-aria-description

[pr]: http://makeapullrequest.com
