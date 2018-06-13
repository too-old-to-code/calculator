(function(){
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
  const replay = document.getElementById('replay')
  screen.innerText = store.display

  replay.onclick = async (evt) => {
    store = {...initialState}
    let counter = 0
    screen.innerText = store.display
    while (counter < totalArr.length) {
      store = {...totalArr[counter]}
      let key = document.querySelector(`[data-id="${store.key}"]`)
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
    if ('1234567890'.split('').includes(button)) {
      store = update(store, { message: NUMBER, payload: button })
    } else {
      store = update(store, { message: button })
    }
    screen.innerText = store.display
    totalArr.push(store)
    console.log(totalArr);
  }

  // UTILITIES
  const ROUND = 1e5
  const roundAnswer = (num) => Math.round(num * ROUND) / ROUND
  const partialise = fn => num => nextNum => fn(num, nextNum)
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
        return { ...store, ...syncDisplayAndCurrent(store.display * - 1) }
      case ADD:
        return {...common(store, total), fn: adder(total) }
      case SUBTRACT:
        return {...common(store, total), fn: subtractor(total) }
      case MULTIPLY:
        return {...common(store, total), fn: multiplier(total), identityProperty: 1}
      case DIVIDE:
        return {...common(store, total), fn: divider(total), identityProperty: 1}
      case EQUALS:
        return {...common(store, total), current: total, fn: function(arg) {return arg}}
      case PERCENT:
        return {...store, ...syncDisplayAndCurrent(percentor(store.current))}
      case NUMBER:
        return {...store,...syncDisplayAndCurrent(parseFloatUnlessPoint0(store, action)), key: action.payload}
      case DECIMAL:
        if (hasDecimalAlready(store.current)) return store
        return {...store, ...syncDisplayAndCurrent(`${store.current}.`)}
      case CLEAR:
        totalArr = []
        return { ...initialState, key: action.message}
      default:
        return store
    }
  }
})()

