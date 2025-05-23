import { Link } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'

import { Platform } from 'react-native'

export function ExternalLink(props: React.ComponentProps<typeof Link>) {
  return (
    <Link
      target="_blank"
      {...props}
      href={props.href}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault()
          WebBrowser.openBrowserAsync(props.href as string)
        }
      }}
    />
  )
}
