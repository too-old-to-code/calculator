const snippets = {
  sequences: {
    init: [
      {
        text: "When the app loads, the first thing we do is to create some actions. These are \
        just variables that store strings. This will make more sense later, but essentially, \
        this is a good practise, which will help you to quickly know if you have made a typo \
        when you dispatch actions.",
        highlight: '3-12'
      },
      {
        text: "Next, we initialise a store object using an 'initialState' as a template. \
        We must do this to avoid mutating the 'initialState', because it \
        will be needed to reset the calculator. Notice that the initial values are all 0, \
        and the 'fn' method just returns the argument given to it. This is known as an \
        'Identity Function'. \n\
        The 'identityProperty' is the number by which, if an operation is performed on it by another \
        number, the same number will be returned. For addition, this would be 0 because 0 added to any \
        other number, would return that same number. For multiplication, it would be 1. \n\
        We have numbers stored in three different properties of the store. That is because we need \
        to keep track of the current total of all the operations so far, the number \
        in the calculator's display, and the number that has just been entered into the calculator.",
        highlight: '15-20, 24'
      },
      {
        text: "We get references to parts of the DOM that we wish to manipulate. \n\
        The calculator, the screen (which is the calculator display), and the replay button. \
        We then set the innerHTML of the screen to the value of the store's display property, which at this \
        point will be zero.",
        highlight: '31-34'
      },
      {
        text: "Then we set event handlers for mouse click events on both the replay button and the \
        calculator. Let's ignore the replay button handler for now and look at what happens when the \
        calculator is clicked.",
        highlight: '36-62'
      },
      {
        text: "So anywhere the calculator is clicked, an event is fired, which carries information about what \
        the target of the click was. In the index.html, we have added a data-id attribute to each of the \
        calculator's buttons and we can access the value of this attribute from the dataset property of \
        the target element clicked. We dispatch this value to our update function, along with the store \
        in it's current state, and we set the store to the result returned from this update invocation.",
        highlight: '53-58'
      },
      {
        text: "So anywhere the calculator is clicked, an event is fired, which carries information about what \
        the target of the click was. In the index.html, we have added a data-id attribute to each of the \
        calculator's buttons and we can access the value of this attribute from the dataset property of \
        the target element clicked. We dispatch this value to our update function, along with the store \
        in it's current state, and we set the store to the result returned from this update invocation.",
        highlight: '65-89'
      }
    ],
    number: [
      {
        text: `Here I explain stuff in fantastic detail`,
        highlight: '13, 18'
      }
    ]
  },
    code: `(function(){
        // MESSAGES
        const ADD = 'ADD'
        const SUBTRACT = 'SUBTRACT'
        const MULTIPLY = 'MULTIPLY'
        const DIVIDE = 'DIVIDE'
        const CLEAR = 'CLEAR'
        const EQUALS = 'EQUALS'
        const PERCENT = 'PERCENT'
        const DECIMAL = 'DECIMAL'
        const NEGATE = 'NEGATE'
        const NUMBER = 'NUMBER'

        // STATE
        const initialState = {
          total: 0,
          display: 0,
          current: 0,
          identityProperty: 0,
          fn (arg) { return arg }
        }

        let totalArr = []
        let store = {...initialState}

        const pause = duration =>
          new Promise((resolve, reject) =>
            setTimeout(() => resolve(), duration)
          )

        const calculator = document.getElementById('calculator')
        const screen = document.getElementById('screen')
        const replayButton = document.getElementById('btn-replay')
        screen.innerText = store.display

        replayButton.onclick = async (evt) => {
          store = {...initialState}
          let counter = 0
          screen.innerText = store.display
          while (counter < totalArr.length) {
            store = {...totalArr[counter]}
            let key = document.querySelector(\`[data-id="$\{store.key}"]\`)
            await pause(800)
            counter ++
            key.classList.toggle('pressed')
            screen.innerText = store.display
            await pause(100)
            key.classList.toggle('pressed')
          }
        }

        calculator.onclick = function (evt) {
          let button = evt.target.dataset.id
          if ('1234567890'.includes(button)) {
            store = update(store, { message: NUMBER, payload: button })
          } else {
            store = update(store, { message: button })
          }
          screen.innerText = store.display
          totalArr.push(store)
          window.totalArr = totalArr
        }

        // UTILITIES
        const ROUND = 1e5
        const roundAnswer = (num) => Math.round(num * ROUND) / ROUND
        const partialise = fn => num => nextNum => fn(parseFloat(num), nextNum)
        const multiply = (num, nextNum) => roundAnswer(num * nextNum)
        const subtract = (num, nextNum) => roundAnswer(num - nextNum)
        const add = (num, nextNum) => roundAnswer(num + nextNum)
        const divide = (num, nextNum) => roundAnswer(num / nextNum)
        const hasDecimalAlready = num => String(num).includes('.')
        const adder = partialise(add)
        const subtractor = partialise(subtract)
        const multiplier = partialise(multiply)
        const divider = partialise(divide)
        const percentor = num => (num / 100)
        const resetIdentityProperty = store => ({...store, identityProperty: 0})
        const resetCurrent = (store) => ({...store, current: 0})
        const showTotalInDisplay = (store) => ({...store, display: store.total})
        const setNewTotal = (store, newTotal) => ({...store, total: newTotal})
        const syncDisplayAndCurrent = (value) => ({display: value , current: value})
        const common = (store, newTotal) => ({
          ...showTotalInDisplay( setNewTotal( resetCurrent(store), newTotal))
        })
        const parseFloatUnlessPoint0 = ({current}, {payload}) =>
          hasDecimalAlready(current) && payload === '0' ?
            current + payload :
            parseFloat(current + payload)

        // UPDATE
        function update (store, action) {
          let total = store.fn(store.identityProperty || store.current)
          store = resetIdentityProperty(store)
          store.key = action.message

          switch (action.message){
            case NEGATE:
              return {
                ...store,
                ...syncDisplayAndCurrent(store.display * - 1)
              }
            case ADD:
              return {
                ...common(store, total),
                fn: adder(total)
              }
            case SUBTRACT:
              return {
                ...common(store, total),
                fn: subtractor(total)
              }
            case MULTIPLY:
              return {
                ...common(store, total),
                fn: multiplier(total),
                identityProperty: 1
              }
            case DIVIDE:
              return {
                ...common(store, total),
                fn: divider(total),
                identityProperty: 1
              }
            case EQUALS:
              return {
                ...common(store, total), current: total,
                fn: function(arg) { return arg }
              }
            case PERCENT:
              return {
                ...store,
                ...syncDisplayAndCurrent(percentor(store.current))
              }
            case NUMBER:
              return {
                ...store,
                ...syncDisplayAndCurrent(parseFloatUnlessPoint0(store, action)),
                key: action.payload
              }
            case DECIMAL:
              if (hasDecimalAlready(store.current)) return store
              return {
                ...store,
                ...syncDisplayAndCurrent(\`$\{store.current}.\`)
              }
            case CLEAR:
              totalArr = []
              return {
                ...initialState,
                key: action.message
              }
            default:
              return store
          }
        }
      })()`
}