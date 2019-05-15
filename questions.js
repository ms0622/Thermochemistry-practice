export default [
    {
      q: `A heated copper penny with a mass of 3.0g at a temperature of 150&deg;C is dropped into a cup of 25ml of water at 25&deg;C.
  
      When the penny is left in the water, what is the final temperature of both the water and the penny? (answer in &deg;C)
      `,
      a: '26',
      hint: 'mc(T<sub>f</sub> - T<sub>i</sub>)<sub>Cu</sub> = -mc(T<sub>f</sub> - T<sub>i</sub>)<sub>Water</sub>'
    }, {
      q: 'When water is frozen and becomes ice, it is a(n) ________ reaction.',
      a: 'exothermic',
      choices: [
        'programmable',
        'endothermic',
        'thermodynamic',
        'exothermic',
        'questionable'
      ],
      hint: 'Ice has lesss energy than water.'
    }, {
      q: 'Which will burn your hand more, water at 100&deg;C or steam at 100&deg;C?',
      a: 'Steam',
      choices: [
        'They both burn equally',
        'Maybe they burn you but my hand is indestructible',
        'Liquid water',
        'Steam',
        "Plot twist: they don't"
      ],
      hint: 'Plot twist: they will and steam has more energy than water.'
    }, {
      q: '10.00 Cal = ___ J',
      a: '41860',
      hint: '1000cal = 1Cal'
    }, {
      q: '10.0 J = ___ cal',
      a: '2.39',
      hint: '4.186J = 1cal'
    }, {
      q: 'Calculate the &Delta;H in J when 0.444 mol of steam at 180&deg;C is cooled to ice at -5.0&deg;C',
      a: '-22000',
      hint: '<img src="cooling-curve.png">'
    }, {
      q: `12.0 g of benzene decomposes into hydrogen gas and carbon. If the temperature of 128mL of the surrounding water decreases from 298K to 291K,
      what was the change in heat for the system? (Answer in J)`,
      a: '3750',
      hint: 'q<sub>water</sub> = 128g * 4.186 \\({J \\over g&deg;C}\\) * -7&deg;C'
    }, {
      q: 'Calculate the &Delta;H<sub>rxn</sub> for the combustion of propanol(C<sub>3</sub>H<sub>8</sub>). (Answer in \\({kJ \\over mol}\\))',
      a: '-2054',
      hint: `<pre>
                                     H     H
      H H H       O=O                |     |
      | | |       O=O      O=C=O     O-H   O-H
    H-C-C-C-H  +  O=O  ->  O=C=O  + 
      | | |       O=O      O=C=O     O-H   O-H
      H H H       O=O                |     |
                                     H     H
  </pre>`
    }, {
      q: `Calculate the &Delta;H of 2C<sub>(s)</sub>+H<sub>2(g)</sub> -> C<sub>2</sub>H<sub>2(g)</sub> given the following step reactions:
  
  1) C<sub>(s)</sub> + O<sub>2(g)</sub> -> CO<sub>2(g)</sub> &Delta;H = -393.5kJ
  2) H<sub>2(g)</sub> + &frac12;O<sub>2(g)</sub> -> H<sub>2</sub>O<sub>(l)</sub> &Delta;H = -285.8kJ
  3) C<sub>2</sub>H<sub>2(g)</sub> + \\({5 \\over 2}\\) O<sub>2(g)</sub> -> 2CO<sub>2(g)</sub> + H<sub>2</sub>O<sub>(l)</sub> &Delta;H = -1299.8kJ
      
      Answer in kJ`,
      a: '227.0',
      hint: `
  1) 2*[C<sub>(s)</sub> + O<sub>2(g)</sub> -> CO<sub>2(g)</sub>] &Delta;H = 2*(-393.5kJ)
  2) Unchanged
  3) flip it [C<sub>2</sub>H<sub>2(g)</sub> + \\({5 \\over 2}\\) O<sub>2(g)</sub> -> 2CO<sub>2(g)</sub> + H<sub>2</sub>O<sub>(l)</sub>] &Delta;H = -(-1299.8kJ)
  `
    }
  ]
  
