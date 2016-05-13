import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/scripts/components/_ui/appBar/AppBar.story')
}

configure(loadStories, module)