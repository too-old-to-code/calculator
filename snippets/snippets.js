const common = [
  // 0
  (s) => "When the " + (s.key && s.key.toLowerCase()) + " button is clicked, the condition in the 'if' \
    statement is not satisfied and so the update function is invoked with two arguments; the store in \
    its current state, and an object with a 'message' property. The message contains the action " +
    s.key + " (taken from the data-id of the HTML element).",

  // 1
  (s) => "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
    The 'fn' function is determined by a keypress prior to the current key pressed.\
    It is set whenever (i) a binary operator is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed.\n" + "\n" +
    (function () {
      switch (s.operator){
        case ('ADD'):
          return "The last of these buttons you pressed before now, was the "+ s.operator +" button. This will have set the 'fn' method to be a partialised, \
          'add' function, with a value in its scope equal to the calculator's current total. The 'store.current' value that is passed in as an argument will \
          be added to that total, returned, and assigned to the local 'total' variable. If there was no 'store.current' value, for example if \
          the ADD button was pressed multiple times in a row, the value 0 would be passed in. This is the 'Identity property' for addition, so the \
          total from the partialised 'add' function's scope would be assigned to the local 'total' unchanged."
        case ('SUBTRACT'):
          return "The last of these buttons you pressed before now, was the "+ s.operator +" button. This will have set the 'fn' method to be a partialised, \
          'subtract' function, with a value in its scope equal to the calculator's current total. The 'store.current' value that is passed into this, will \
          be subtracted from that total and returned and assigned to the local 'total' variable. If there was no 'store.current' value, for example if \
          the SUBTRACT button was pressed multiple times in a row, the value 0 would be passed in. This is the 'Identity property' for subtraction, so the \
          value from the partialised 'subtract' function's scope would be assigned to the local 'total' unchanged."
        case ('MULTIPLY'):
          return "The last of these buttons you pressed before now, was the "+ s.operator +" button. This will have set the 'fn' method to be a partialised, \
          'multiply' function, with a value in its scope equal to the calculator's current total. The 'store.current' value that is passed into this, will \
          be added to that total and returned and assigned to the local 'total' variable. If there was no 'store.current' value, for example if \
          the MULTIPLY button was pressed multiple times in a row, the 'store.identityProperty' would be passed in as an argument. This is set to 1 whenever \
          the MULTIPLY button is pressed, which is truthy and therefore short-circuits the evaluation. This is the 'Identity property' for multiplication, so the \
          total from the partialised 'multiply' function's scope would be assigned to the local 'total' unchanged."
        case ('DIVIDE'):
          return "The last of these buttons you pressed before now, was the "+ s.operator +" button. This will have set the 'fn' method to be a partialised, \
          'divide' function, with a value in its scope equal to the calculator's current total. The 'store.current' value that is passed into this, will \
          be added to that total and returned and assigned to the local 'total' variable. If there was no 'store.current' value, for example if \
          the DIVIDE button was pressed multiple times in a row, the 'store.identityProperty' would be passed in as an argument. This is set to 1 whenever \
          the DIVIDE button is pressed, which is truthy and therefore short-circuits the evaluation. This is the 'Identity property' for division, so the \
          total from the partialised 'divide' function's scope would be assigned to the local 'total' unchanged."
        case ('EQUALS'):
        case ('CLEAR'):
          return "The last of these buttons you pressed before now, was the "+ s.operator +" button. This will have reset the store, and the 'fn' method would be \
          an 'Identity function', which will return the argument given to it unchanged."
        default:
          return "You have pressed neither of these buttons before now, and so the 'fn' method will be an 'Identity function', because that is what it \
          was initialised with. This will return the argument given to it unchanged."
      }
    })(),

  // 2
  (s) => "The 'common' function, the result of which is being spread into the object returned from the " + s.key + " case, is a composition \
    of three other functions that are used frequently together.",

  // 3
  (s) => "These functions are fairly self-descriptive: \n\n\
    'resetCurrent' returns a clone of the store with the 'current' value set to 0 \n\n\
    'setNewTotal' returns a clone of the store with the 'total' value set to the 'newTotal' \
    argument passed in. \n\n\
    'showTotalInDisplay' returns a clone of the store with the 'display' value set to match the total.",

  // 4
  (s) => "So, returned from the "+ s.key + " case is a new store object with updated values for the 'current', 'total', \
    'display' and 'fn' properties.",

  // 5
  (s) => "This object is assigned as the new store, and then the calculator display in the DOM is updated to reflect \
    the updated 'store.display' value."
]

const snippets = {
  sequences: {

    init: [
      {
        text: (s) => "When the app loads, the first thing we do is to create some actions. These are \
        just variables that store strings. This will make more sense later, but essentially, \
        this is a good practise, which will help you to quickly know if you have made a typo \
        when you dispatch actions.",
        highlight: '3-12'
      },
      {
        text: (s) => "Next, we initialise a store object using an 'initialState' as a template. \
        We don't want to mutate the 'initialState', because it \
        will be needed to reset the calculator, so we spread its properties into a new object instance. \
        Notice that the initial values are all 0, and the 'fn' method just returns the argument given \
        to it. This is known as an 'Identity Function'. \n\
        The 'identityProperty' is the number by which, if an operation is performed on it by another \
        number, the same number will be returned. For addition, this would be 0 because 0 added to any \
        other number, would return that same number. For multiplication, it would be 1. \n\
        We have numbers stored in three different properties of the store. That is because we need \
        to keep track of the current total of all the operations so far, the number \
        in the calculator's display, and the number that has just been entered into the calculator.",
        highlight: '15-22, 25'
      },
      {
        text: (s) => "After any of the calculator's buttons are pressed, a new store object is created as opposed \
        to the store being mutated. Each old copy of the store will be pushed into this 'totalArr' array, so that we \
        can revisit the store as it was in the past using the replay button.",
        highlight: '24'
      },
      {
        text: (s) => "We get references to the DOM elements that we wish to manipulate or to listen to for events.\n\n\
        calculator: we will listen for click events on this element - using the event delegation pattern to determine which \
        button was pressed.\n\n\
        replayButton: we will listen for click events on this element too.\n\n\
        screen: we need to update the innerText of this element as appropriate to the state of the calculator. \n\n\
        We then set the innerHTML of the screen to the value of the store's display property, which at this \
        point will be zero.",
        highlight: '32-35'
      },
      {
        text: (s) => "Then we assign handler functions for mouse click events on both the replay button and the \
        calculator. Let's ignore the replay button handler for now and look at what happens when the \
        calculator is clicked.",
        highlight: '37-63'
      },
      {
        text: (s) => "Anywhere the calculator is clicked, an event is fired, which carries information including what \
        the target element of the click was. \n\n In the index.html, we have added a data-id attribute to each of the \
        calculator's buttons and we can access the value of this attribute from the dataset property of \
        the target element clicked. \n\n The details differ depending on which button was pressed, but we dispatch this \
        value to our update function, along with the store in it's current state. \n\nThe returned value will be an updated store, \
        which we reassign to the 'store' variable.",
        highlight: '54-59'
      },
      {
        text: (s) => "Here we define a few functions based loosely on the functional programming paradigm. \
        These will give us the raw logic to deal with the operations. For now, let's just understand \
        the first few assignments here.",
        highlight: '66-90'
      },
      {
        text: (s) => "These two lines determine how many numbers will appear after a decimal point. \
        Assigning the value 1e5 to ROUND means that a maximum of 5 digits can appear after the point. \
        A value of 1e6 would mean a maximum of 6, etc.",
        highlight: '66-67'
      },
      {
        text: (s) => "The curry function is a helper to curry other functions. It takes a function as \
        an argument and returns another function. The returned function will itself take a single argument \
        and return another (partially-applied) function. The argument is enclosed in this function's scope and \
        will be available when this partially-applied function is itself invoked with another argument. In the calculator \
        pane above, you can see what function the 'fn' method of the store points to. If that function is a partially applied \
        function, you will see the value currently in its scope too and the operation that it is waiting to perform.",
        highlight: '68'
      }
    ],
    number: [
      {
        text: (s) => "When a number is clicked, the condition in the 'if' statement is satisfied and so the update \
        function is invoked with two arguments; the store in its current state, and an object with a 'message' \
        and a 'payload' property. The message contains the NUMBER action (which was assigned the string value \
        'NUMBER' when the app initialised) and the payload is the actual numerical value of the button pressed.",
        highlight: '53-56'
      },
      {
        text: (s) => {
          return "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
          The 'fn' method is determined by a keypress prior to the current key pressed.\
          It is set whenever (i) a binary operator button is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed. \
          This is not relevant when a number button is pressed (as you just have) because the local 'total' variable, to which the result \
          of this function is assigned, is not used in this circumstance. \n\n\
          This is because we cannot perform an operation on the 'store.current' value until we know the number is completely formed. The \
          user presses one button at a time and we cannot know in advance how many digits they intend to use. The only way we can know if \
          the user has finished forming the number is if they press one of the aforementioned buttons (i-iii above)."
        },
        highlight: '94'
      },
      {
        text: (s) => "The NUMBER case in the switch statement is matched. From here we return a copy of the store \
        with updated properties from the result of the 'syncDisplayAndCurrent' function, and a key property. We can ignore \
        the 'key' property for now because it is only used for the replay functionality. \n\
        When functions are composed as they are on line 140, remember that the innermost (rightmost) function \
        is invoked first, and the result of that is invoked by the function to its left. So let's look at the \
        'parseFloatUnlessPoint0' function.",
        highlight: '137-142'
      },
      {
        text: (s) => "This function concatenates the current value with the payload value, and conditionally casts the result to a float. \
        Understand this as how the user forms a multiple digit number. \n\n\
        To retain trailing zeros after a decimal point it is important to keep the value a string until a number other than \
        zero has been added to the end. Otherwise, converting it to a float will strip the trailing zeros. For leading \
        zeros before the decimal point, we DO want them stripped, and this is achieved when casting the concatenated \
        value to a float. For example, in javascript: \n\
          parseFloat('000.1') will result in 0.1\n\
          parseFloat('0.000') will result in 0\n\
          parseFloat('0.001') will result in 0.001\n\
        This is why if there is a decimal point in the current value and the payload is 0, the result is kept as a string.\
        When the payload is a number other than zero, we can safely cast the number to a float",
        highlight: '87-90'
      },
      {
        text: (s) => "Very simply, this synchronises the 'store.value' and 'store.current' properties. The new values for \
        these properties are returned from the syncDisplayAndCurrent function...",
        highlight: '83'
      },
      {
        text: (s) => "...where they are destructured into the object to be returned from the switch statement's NUMBER case, \
        overwriting those same fields already destructured from the original store object...",
        highlight: '138-142'
      },
      {
        text: (s) => "...and finally being returned and assigned as the new store object. The DOM element that represents the \
        display screen of the calculator is then populated with the newly updated store's 'display' value",
        highlight: '56,60'
      }

    ],
    add: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: common[1],
        highlight: '94'
      },
      {
        text: (s) => {
          return "The ADD case in the switch statement is matched. From here we return a copy of the store \
        with updated properties. The 'fn' property is assigned the result of an 'adder' \
        function invocation with the local 'total' variable passed as an argument. The result of this invocation is a \
        partialised 'add' function that will eventually take a single argument and return the sum of that argument and the 'total' \
        just passed in."
        },
        highlight: '104-108'
      },
      {
        text: (s) => {
          return "The 'adder' function is simply the 'add' function that has been curried using the 'curry' function. \
          It takes the single argument given to it, and adds it to the value it already has in its scope."
        },
        highlight: '68, 74, 71'
      },
      {
        text: common[2],
        highlight: '84-86, 106'
      },
      {
        text: common[3],
        highlight: '80-82'
      },
      {
        text: common[4],
        highlight: '105-108'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    subtract: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: common[1],
        highlight: '94'
      },
      {
        text: (s) => {
          return "The SUBTRACT case in the switch statement is matched. From here we return a copy of the store \
        with updated properties. The 'fn' property is assigned the result of a 'subtractor' \
        function invocation with the local 'total' variable passed as an argument. The result of this invocation is a \
        partialised function that will take one argument and return the result of that argument subtracted from the 'total' \
        just passed in."
        },
        highlight: '109-113'
      },
      {
        text: (s) => {
          return "The 'subtractor' function is simply the 'subtract' function that has been curried using the 'curry' function. \
          It takes the single argument given to it, and subtracts it from the value it already has in its scope."
        },
        highlight: '68, 70, 75'
      },
      {
        text: common[2],
        highlight: '84-86, 106'
      },
      {
        text: common[3],
        highlight: '80-82'
      },
      {
        text: common[4],
        highlight: '109-113'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    multiply: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: common[1],
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key +" case in the switch statement is matched. From here we return a copy of the store \
        with updated properties. The 'fn' property is assigned the result of a 'multiplier' \
        function invocation with the local 'total' variable passed as an argument. The result of this invocation is a \
        partialised function that will take one argument and return the result of that argument multiplied with the 'total' \
        just passed in."
        },
        highlight: '114-119'
      },
      {
        text: (s) => {
          return "The 'multiplier' function is simply the 'multiply' function that has been curried using the 'curry' function. \
          It takes the single argument given to it, and multiplies it with the value it already has in its scope."
        },
        highlight: '68, 69, 76'
      },
      {
        text: common[2],
        highlight: '84-86, 106'
      },
      {
        text: common[3],
        highlight: '80-82'
      },
      {
        text: common[4],
        highlight: '109-113'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    divide: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: common[1],
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key +" case in the switch statement is matched. From here we return a copy of the store \
          with updated properties. The 'fn' property is assigned the result of a 'multiplier' function invocation with the \
          local 'total' variable passed as an argument. The result of this invocation is a \
          partialised function that will take one argument and return the result of that argument multiplied with the 'total' \
          just passed in."
        },
        highlight: '120-125'
      },
      {
        text: (s) => {
          return "The 'divider' function is simply the 'divide' function that has been curried using the 'curry' function. \
          It takes the single argument given to it, and divides it by the value it already has in its scope."
        },
        highlight: '68, 69, 76'
      },
      {
        text: common[2],
        highlight: '84-86, 106'
      },
      {
        text: common[3],
        highlight: '80-82'
      },
      {
        text: common[4],
        highlight: '109-113'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    negate: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: (s) => {
          return "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
          The 'fn' method is determined by a keypress prior to the current key pressed.\
          It is set whenever (i) a binary operator button is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed. \
          This is not relevant when a unary operator button is pressed (as you just have) because the local 'total' variable, to which the result \
          of this function is assigned, is not used in this circumstance. \n\n\
          This is because we don't need another value in order to complete the operation. A unary operator is agnostic about the calculator's current \
          total. It simply performs the required operation on the number currently visible in the calculator's display."
        },
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key + " case in the switch statement is matched. From here we return a copy of the store \
          with updated properties. The updated properties come from the result of the 'syncDisplayAndCurrent' function \
          invocation. This function is invoked with an expression to negate the 'store.display' value, as an argument."
        },
        highlight: '99-103'
      },
      {
        text: (s) => "Here we can see that the 'syncDisplayAndCurrent' function assigns its single parameter (the negated display value) \
        to the 'display' and 'current' properties of the object it returns...",
        highlight: '83'
      },
      {
        text: (s) => "...where is is destructured into an object that is returned from the case statement.",
        highlight: '100-103'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    percent: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: (s) => {
          return "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
          The 'fn' method is determined by a keypress prior to the current key pressed.\
          It is set whenever (i) a binary operator button is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed. \
          This is not relevant when a unary operator button is pressed (as you just have) because the local 'total' variable, to which the result \
          of this function is assigned, is not used in this circumstance. \n\n\
          This is because we don't need another value in order to complete the operation. A unary operator is agnostic about the calculator's current \
          total. It simply performs the required operation on the number currently visible in the calculator's display."
        },
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key + " case in the switch statement is matched. From here we return a copy of the store \
          with updated properties. The updated properties come from the result of the 'syncDisplayAndCurrent' function \
          invocation. This function is invoked with another function as an argument - the 'percentor' function."
        },
        highlight: '132-136'
      },
      {
        text: (s) => "The 'percentor' function can operate in two different ways. If there is no running total, i.e. if the \
        percentage button was the first operator pressed then it will simple divide the current number on the screen by 100. \
        If there is a running total however, the current number on the screen will be multiplied by one-hundredth of the total. \
        ",
        highlight: '78'
      },
      {
        text: (s) => "The percentor function returns and is popped off the stack. And then...",
        highlight: '132-136'
      },
      {
        text: (s) => "...the syncDisplayAndCurrent function returns and is popped off the stack. An object is returned.",
        highlight: '58'
      },
      {
        text: common[5],
        highlight: '60'
      }
    ],
    clear: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: (s) => {
          return "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
          The 'fn' method is determined by a keypress prior to the current key pressed.\
          It is set whenever (i) a binary operator button is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed. \
          This is not relevant when a unary operator button is pressed (as you just have) because the local 'total' variable, to which the result \
          of this function is assigned, is not used in this circumstance. \n\n\
          This is because, although the clear button will set the 'fn' method for the next operation performed, it doesn't do anything with the \
          result of the pending operation in the 'fn' method when it is assigned to the local 'total' variable."
        },
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key + " case in the switch statement is matched. From here we return a new store object created from the 'initialState' \
          template. This is a store reset. The newly initialised store is returned."
        },
        highlight: '149-154'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    decimal: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: (s) => {
          return "Inside the update function, the first thing we do is to invoke the store's 'fn' method. \
          The 'fn' method is determined by a keypress prior to the current key pressed.\
          It is set whenever (i) a binary operator button is pressed, (ii) the equals button is pressed, or (iii) the clear button is pressed. \n\n\
          This is not relevant when the decimal point button is pressed (as you just have) because the local 'total' variable, to which the result \
          of this function is assigned, is not used in this circumstance."
        },
        highlight: '94'
      },
      {
        text: (s) => {
          return "The " + s.key + " case in the switch statement is matched."
        },
        highlight: '143-148'
      },
      {
        text: (s) => {
          return "If the number we are forming already has a decimal point, we return the original store. This is because we don't want a \
          user to be able to form an invalid number with more than one decimal point."
        },
        highlight: '144'
      },
      {
        text: (s) => {
          return "Otherwise, we return a clone of the store with some updated values from the invocation of the 'syncDisplayAndCurrent' function. \
          We pass in a string to this argument, made up of the number formed so far with a '.' at the end of it."
        },
        highlight: '147'
      },
      {
        text: (s) => "Very simply, this synchronises the 'store.value' and 'store.current' properties. The new values for \
        these properties are returned from this function...",
        highlight: '83'
      },
      {
        text: (s) => "...where they are destructured into an object that is returned from the case statement.",
        highlight: '145-148'
      },
      {
        text: common[5],
        highlight: '58,60'
      }
    ],
    equals: [
      {
        text: common[0],
        highlight: '53-55,58'
      },
      {
        text: (s) => "Once the equals button has been pressed",
        highlight: '23'
      },
      {
        text: (s) => "Second page of the equals sequence",
        highlight: ''
      }
    ],
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
          key: null,
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
          totalArr.push(store) // store each action, for replay

        }

        // UTILITIES
        const ROUND = 1e5
        const roundAnswer = (num) => Math.round(num * ROUND) / ROUND
        const curry = fn => num => nextNum => fn(parseFloat(num), nextNum)
        const multiply = (num, nextNum) => roundAnswer(num * nextNum)
        const subtract = (num, nextNum) => roundAnswer(num - nextNum)
        const add = (num, nextNum) => roundAnswer(num + nextNum)
        const divide = (num, nextNum) => roundAnswer(num / nextNum)
        const hasDecimalAlready = num => String(num).includes('.')
        const adder = curry(add)
        const subtractor = curry(subtract)
        const multiplier = curry(multiply)
        const divider = curry(divide)
        const percentor = (total, curr) => roundAnswer(total ? total / 100 * curr : curr / 100)
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
                ...common(store, total),
                current: total,
                fn: function(arg) { return arg }
              }
            case PERCENT:
              return {
                ...store,
                ...syncDisplayAndCurrent(percentor(store.total, store.current))
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