
const checkBoxList = document.querySelectorAll('.coustom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const error = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progressBar-value')
const progressBarText = document.querySelector('.progressBar-label')

const allQuots = [
  "Raise the bar by compling your goals !",
  'well begun is half done !',
  'Just a step away, keep going',
  'whoa! You just completed all the goals, time for chill'

]

// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//   first: {
//     name: '',
//     completed: false,
//   },
//   second: {
//     name: '',
//     completed: false,
//   },
//   third: {
//     name: '',
//     completed: false,
//   },
// }
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`
progressValue.firstElementChild.innerHTML = `${(completedGoalsCount)}/3 Completed`
progressBarText.innerText = allQuots[completedGoalsCount];
switch (completedGoalsCount) {
  case 0:
    progressValue.style.backgroundColor = 'red';
    break;
  case 1:
    progressValue.style.backgroundColor = 'orange';
    break;
  case 2:
    progressValue.style.backgroundColor = 'yellowgreen';
    break;
  case 3:
    progressValue.style.backgroundColor = 'green';
    break;
  default:
    progressValue.style.backgroundColor = 'gray'; // fallback color
}

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value
    })
    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle('completed')
      const inputId = checkBox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
      localStorage.setItem('allGoals', JSON.stringify(allGoals))
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`
      progressValue.firstElementChild.innerHTML = `${(completedGoalsCount)}/${inputFields.length} Completed`
      progressBarText.innerText = allQuots[completedGoalsCount]
       localStorage.setItem('allGoals', JSON.stringify(allGoals))
      switch (completedGoalsCount) {
        case 0:
          progressValue.style.backgroundColor = 'red';
          break;
        case 1:
          progressValue.style.backgroundColor = 'orange';
          break;
        case 2:
          progressValue.style.backgroundColor = 'yellowgreen';
          break;
        case 3:
          progressValue.style.backgroundColor = 'green';
          break;
        default:
          progressValue.style.backgroundColor = 'gray'; // fallback color
      }
      

    }
    else {
      progressBar.classList.add('show-error')
    }
  })
})

inputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }

  input.addEventListener('focus', () => {
    progressBar.classList.remove('show-error')
  })

  input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

    localStorage.setItem('allGoals', JSON.stringify(allGoals))
  })
})


