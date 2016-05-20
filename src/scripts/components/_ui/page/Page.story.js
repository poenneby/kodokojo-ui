import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import Page from './Page.component'

const initialState = {}

const store = configureStore(initialState)

storiesOf('Page', module)
  .add('default', () => (
    <Provider store={store}>
      <Page>
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor sit amet, quo ea autem dolorum expetenda. Ei case brute liber ius, eos ut diam eius,
          graecis corrumpit molestiae in has. Velit corrumpit per ad, no democritum scribentur pro.
          Quo fabellas legendos cu, velit deserunt evertitur at eam.<br/>
          Ut quo feugait appetere vulputate. Diceret perfecto inciderint ut has, his et solum labore inimicus.
          Te probatus gloriatur has, ad est virtute mandamus adolescens. Sed dictas discere et,
          sit noster audiam efficiantur ut.<br/>
          Saepe mediocrem ne mea, ius et consul commune euripidis. At tota delenit copiosae mea.
          Quis paulo invidunt ut eos. Ex justo dicam ius, ea mel dicta legimus volutpat. Nisl facilisi no eos,
          adhuc denique accusamus id pro. Nam dicit simul choro ex.<br/>
          Ne similique appellantur vim, te his liber incorrupte.
          Pro in stet admodum splendide, clita democritum et sea. Ei elit petentium qui, munere argumentum eum eu,
          mel ei atqui nostrud consectetuer. Sale ullum falli cu ius, errem discere aliquam vis eu.
          Inermis ceteros periculis mei ne, eius tritani antiopam ex vel.
          Vel probo alterum an, sea ut quidam consequuntur.<br/>
        </p>
      </Page>
    </Provider>
  ))
