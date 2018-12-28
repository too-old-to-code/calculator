 (function () {
  const calculator = document.getElementById('calculator')
  const codeblock = document.getElementById('codeblock')
  const explanation = document.getElementById('explanation')
  const nextButton = document.getElementById('btn-next')
  const prevButton = document.getElementById('btn-prev')

  let currentSequence = snippets.sequences.init
  let sequenceIndex = 0

  codeblock.innerText = snippets.code
  codeblock.parentNode.dataset.line = currentSequence[sequenceIndex].highlight
  explanation.innerText = currentSequence[sequenceIndex].text

  nextButton.onclick = () => {
    sequenceIndex++
    changeDisplay()
    // codeblock.innerText = snippets.code
    // codeblock.parentNode.dataset.line = currentSequence[sequenceIndex].highlight
    // explanation.innerText = currentSequence[sequenceIndex].text
    // Prism.highlightElement(codeblock);
  }

  prevButton.onclick = () => {
    sequenceIndex--
    changeDisplay()
  }

  calculator.addEventListener('click', function() {
    const lastAction = window.totalArr.slice(-1)[0]
    const numFrom1To9 = (/[1-9]/).test(lastAction.key)

    if (numFrom1To9) {
      changeDisplay()
      // codeblock.innerText = snippets.code
      // codeblock.parentNode.dataset.line = snippets.sequences.number[0].highlight

    } else {
      switch (lastAction.key) {
        case ('ADD'):
          console.log('you pressed +')
          codeblock.parentNode.dataset.line = snippets.sequences.number[0].highlight
          break;
        case ('SUBTRACT'):
          console.log('You pressed -')
          break;
        case ('MULTIPLY'):
          console.log('You pressed *')
          break;
        case ('DIVIDE'):
          console.log('You pressed /')
          break;
        case ('CLEAR'):
          console.log('You pressed AC')
          break;
        case ('EQUALS'):
          console.log('You pressed =')
          break;
        case ('PERCENT'):
          console.log('You pressed %')
          break;
        case ('DECIMAL'):
          console.log('You pressed .')
          break;
        case ('NEGATE'):
          console.log('You pressed +/-')
          break;
        default:
          console.log('hello:')
      }
    }
    // let a = document.querySelector('.line-highlight')
    // if (a) {
    //   console.log('a:', a.offsetTop)
    //   // codeblock.parentNode.scrollTop = a.offsetTop
    //   a.scrollIntoView({
    //     behavior: 'smooth'
    //   });
    // }

    // Prism.highlightElement(codeblock);
  })

  function scrollToHighlighted () {
    let highlighted = document.querySelectorAll('.line-highlight')
    let a = highlighted[0]
    // console.log(highlighted.length - 1)
    // console.dir(highlighted[highlighted.length - 1])
    // let a = highlighted[highlighted.length - 1]
    // console.log(a.dataset.range )
    if (a) {
      a.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  function changeDisplay () {

    codeblock.innerText = snippets.code
    codeblock.parentNode.dataset.line = currentSequence[sequenceIndex].highlight
    explanation.innerText = currentSequence[sequenceIndex].text
    Prism.highlightElement(codeblock);
    scrollToHighlighted()
  }

})()
