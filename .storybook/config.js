import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/scripts/components/_ui/appBar/AppBar.story')
  require('../src/scripts/components/_ui/layout/Layout.story')
  require('../src/scripts/components/_ui/panel/Panel.story')
}

configure(loadStories, module)