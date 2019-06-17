setTimeout(function () {

  Prism.hooks.add('before-highlight', function (env) {
    env.code = env.element.innerText
  });

  const calculator = document.getElementById('calculator')
  const codeblock = document.getElementById('codeblock')
  const explanation = document.getElementById('explanation')
  const title = document.getElementsByClassName('explanation-title')[0]
  const nextButton = document.getElementById('btn-next')
  const prevButton = document.getElementById('btn-prev')
  const dataIdVal = document.getElementsByClassName('data-id-value')[0]
  const storeDisplay = document.getElementsByClassName('store')[0]
  const sequenceIndexDOM = document.getElementsByClassName('sequence-index')[0]

  let currentSequence = snippets.sequences.init
  let sequenceIndex = 0
  let previousStoreState = {}
  let lastOperatorPressed = null
  let currentOperator = null
  let pendingFn = 'num => num'
  dataIdVal.innerText = pendingFn

  changeDisplay()

  nextButton.onclick = () => {
    if (currentSequence[sequenceIndex + 1]) {
      sequenceIndex++
      changeDisplay()
    }
  }

  prevButton.onclick = () => {
    if (currentSequence[sequenceIndex - 1]) {
      sequenceIndex--
      changeDisplay()
    }
  }

  calculator.addEventListener('click', function() {
    const lastAction = window.totalArr.slice(-1)[0]
    // dataIdVal.innerText = lastAction.key
    const numFrom1To9 = (/[1-9]/).test(lastAction.key)

    if (numFrom1To9) {
      currentSequence = snippets.sequences.number
      title.innerText = 'Number pressed - '
    } else {
      // This is so I can track pending operators to describe the
      // partialised function better in the talkthrough
      // if (lastAction.key !== null) {
      //   currentOperator = lastAction.key
      // }
      switch (lastAction.key) {
        case ('ADD'):
          currentSequence = snippets.sequences.add
          title.innerText = 'Add pressed - '
          pendingFn = `num => ${lastAction.total} + num`
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('SUBTRACT'):
          currentSequence = snippets.sequences.subtract
          title.innerText = 'Subtract pressed - '
          pendingFn = `num => ${lastAction.total} - num`
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('MULTIPLY'):
          currentSequence = snippets.sequences.multiply
          title.innerText = 'Multiply pressed - '
          pendingFn = `num => ${lastAction.total} * num`
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('DIVIDE'):
          currentSequence = snippets.sequences.divide
          title.innerText = 'Divide pressed - '
          pendingFn = `num => ${lastAction.total} / num`
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('CLEAR'):
          currentSequence = snippets.sequences.clear
          title.innerText = 'AC pressed - '
          pendingFn = 'num => num'
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('EQUALS'):
          currentSequence = snippets.sequences.equals
          title.innerText = 'Equals pressed - '
          pendingFn = 'num => num'
          lastOperatorPressed = currentOperator
          currentOperator = lastAction.key
          break;
        case ('PERCENT'):
          currentSequence = snippets.sequences.percent
          title.innerText = 'Percent pressed - '
          break;
        case ('DECIMAL'):
          currentSequence = snippets.sequences.decimal
          title.innerText = 'Decimal pressed - '
          break;
        case ('NEGATE'):
          currentSequence = snippets.sequences.negate
          title.innerText = 'Negate pressed - '
          break;
        default:
          console.log('hello:')
      }
    }
    // This is so I can track pending operators to describe the
    // partialised function better in the talkthrough
    // if (lastAction.key !== null) {
    //   currentOperator = lastAction.key
    // }
    dataIdVal.innerText = pendingFn
    sequenceIndex = 0
    changeDisplay()
  })

  function scrollToHighlighted () {
    let highlighted = document.querySelector('.line-highlight')
    if (highlighted) {
      highlighted.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  function changeDisplay () {
    let store
    if (window.totalArr) {
      store = {...window.totalArr.slice(-1)[0]}
      // delete store.key
    } else {
      store = {
        "total": 0,
        "display": 0,
        "current": 0,
        "identityProperty": 0,
        "key": null
      }
    }
    console.log('fn:')
    if (store.fn){
      console.log(store.fn.toString() )
    }

    codeblock.innerText = snippets.code
    codeblock.parentNode.dataset.line = currentSequence[sequenceIndex].highlight
    sequenceIndexDOM.innerText = `${sequenceIndex + 1}/${currentSequence.length}`
    explanation.innerText = currentSequence[sequenceIndex].text({
      ...store,
      operator: lastOperatorPressed
    })
    storeDisplay.innerText = JSON.stringify(store, null, 4)
    Prism.highlightElement(codeblock);
    scrollToHighlighted()
    previousStoreState = {...store}
    // lastOperatorPressed = currentOperator
  }
}, 0)
