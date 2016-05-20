import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf, action } from '@kadira/storybook'

// contexte
import configureStore from '../../../store/configureStore'

// component to story
import AppBar from './AppBar.component'

const initialState = {}


// Add the reducer to your store on the `routing` key
const store = configureStore(initialState)

storiesOf('AppBar', module)
  .add('default', () => (
    <Provider store={store}>
      <AppBar />
    </Provider>
  ))
  .add('with flat prop', () => (
    <Provider store={store}>
      <AppBar
        flat
      />
    </Provider>
  ))
  .add('with fixed prop', () => (
      <Provider store={store}>
        <div>
          <AppBar
            fixed
          />
          <div>
            <br/>
            <br/>
            <br/>
            <br/>
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
            Sint ceteros similique id eos, ex omnis facilisis scribentur duo. Primis eligendi voluptatibus at duo.
            Quo at lorem hendrerit. Et vim odio accusamus. Nec an animal recusabo erroribus. Unum menandri id vim.<br/>
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
            Sint ceteros similique id eos, ex omnis facilisis scribentur duo. Primis eligendi voluptatibus at duo.
            Quo at lorem hendrerit. Et vim odio accusamus. Nec an animal recusabo erroribus. Unum menandri id vim.<br/>
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
            Sint ceteros similique id eos, ex omnis facilisis scribentur duo. Primis eligendi voluptatibus at duo.
            Quo at lorem hendrerit. Et vim odio accusamus. Nec an animal recusabo erroribus. Unum menandri id vim.<br/>
          </div>
        </div>
      </Provider>
  ))
  .add('with children', () => (
      <Provider store={store}>
        <AppBar
          fixed
        >
           - children -
        </AppBar>
      </Provider>
  ))
