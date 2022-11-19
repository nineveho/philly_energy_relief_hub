//cmd shift L == select all
//text ${object in js} `

const container = document.querySelector("#big_calculator_container");
const title = document.createElement("h1");
title.innerHTML = "Resource Calculator (Think Abt Naming)";
container.append(title);

const calculatorQuestions = [
  {
    title: "What is your household size?",
    abbrev: "household size",
    numberOfOptions: 8,
    listOfOptions: [1, 2, 3, 4, 5, 6, 7, "more"],
    questionType: "single",
    response: [],
    answers:"",
  },
  {
    //do we wanna do this as a slider
    title: "What is your income",
    abbrev: "income",
    numberOfOptions: 8,
    listOfOptions: [
      "10K-20K",
      "20K-30K",
      "30K-40K",
      "40K-50K",
      "50k-60k",
      "60k-70k",
      "70k-80k",
      "80k-90k",
    ],
    questionType: "single",
    response: [],
    answers:"",
  },
  {
    title: "how old is your house",
    abbrev: "house age",
    numberOfOptions: 5,
    listOfOptions: [
      "<1 year",
      "2-10years",
      "20-50years",
      "freaking old crippling",
    ],
    questionType: "single",
    response: [],
    answers:"",
  },
  {
    title: "What are your concerns?",
    abbrev: "concerns",
    numberOfOptions: 5,
    listOfOptions: [
      "energy bills",
      "summer heat",
      "solar opportunities",
      "others",
    ],
    questionType: "multiple",
    response: [],
    answers:"",
  },
  {
    title: "what is your favourite dessert",
    abbrev: "fruit",
    numberOfOptions: 5,
    listOfOptions: ["tiramisu", "affogato", "lava cake", "gelato", "I'm healthy no sweets"],
    questionType: "multiple",
    response: [],
    answers:"",
  },
];

calculatorQuestions.forEach((el, index) => {
  // Grand Parent: create original container that is the parent to specific question
  const calculatorContainer = document.createElement("div");
  calculatorContainer.classList.add("calculator_question_container");

  // Parent A:create the tile
  const questionTitle = document.createElement("h3");
  questionTitle.innerHTML = el.title;

  /** this is called doc string
   * Add all of the other elements here below
   */

  // Parent B - Parent: create parent container of choices
  const choicesContainer = document.createElement("div");
  choicesContainer.classList.add("calculator_choices_container");

  // Childrens of Parent B - iterative
  for (let i = 0; i < el.numberOfOptions; i++) {
    const choices = document.createElement("button");
    choices.classList.add("choices_normal");
    choices.innerHTML = el.listOfOptions[i];

    // create a function to handle the click
    function handleClick() {
      const proposedValue = i;
      /**WHEN CLICKED
       * if, multiple type,
       *  if, already stored in response array-> remove,
       *  else, store in response array
       * if single type,
       *  store in response array (replace previous item)
       */
      if (el.questionType === "multiple") {
        if (el.response.includes(proposedValue)) {
          const indexToRemove = el.response.indexOf(proposedValue);
          el.response.splice(indexToRemove, 1);
          choices.classList.remove("choices_selected");
        } else {
          el.response.push(proposedValue);
          choices.classList.add("choices_selected");
          //console.log(el.response)
        }
      } else {
        el.response = [proposedValue];
        /**
         * if, choice contain class "choices_selected"
         *  remove "choices_selected"
         * else,
         *  add "choices_selected"
         */
        if (choices.classList.contains("choices_selected")) {
          choices.classList.remove("choices_selected");
        } else {
          choices.classList.add("choices_selected");
          //console.log(el.response)
        }
        for (let i = 0; i < choicesContainer.children.length; i++) {
          if (i != el.response) {
            choicesContainer.children[i].classList.remove("choices_selected");
          }
        }
      }
    }
    choices.addEventListener("click", handleClick);
    choicesContainer.append(choices);
  }

  //   const pickedAnswer = document.createElement("div");
  //   pickedAnswer.id = `${index}_item`;
  //choicesContainer.append(pickedAnswer);

  //   append all objects to the parent container
  calculatorContainer.append(questionTitle);
  calculatorContainer.append(choicesContainer);

  //   append the parent container of this question to the existing dom object "#calculator-contain"
  container.append(calculatorContainer);
});

//LASTLY... create a submit button!
const submitButton = document.createElement("button");
submitButton.innerHTML = "submit!";
submitButton.classList.add("submit-button");
container.append(submitButton);

////.....CREATING THE RESPONSE TAB.....////

/**
 * 1. create a new grandparent div id="big_calculator_result" for result page --> done
 *      ---> move the div to a new page if neded
 * 2. create a parent A div with result
 * 3. create a parent B div with suggestions
 *
 * Final: add parents A B to grandparent's home
 */

//1
const calcResultContainer = document.querySelector("#big_calculator_result");

//2
/**create Parent A *
 * for each question,
 *  create div parent_s
 *  get title -> create div -> add text string via innerHTML
 *      parent_s A. append()
 *  get responses ->
 *      for each item in list > create div -> add text strings
 *      parent_s A. append()
 *  Parent A.append(parent_s)
 */
const calcResultSummary = document.createElement("div");
calcResultSummary.classList.add("calculator_result_summary");
const calResultSummaryTitle = document.createElement("h4");
calResultSummaryTitle.innerHTML = "Your Responses";

calcResultSummary.append(calResultSummaryTitle);

calculatorQuestions.forEach((el) => {
  //each response has a
  const calcResultSummaryInd = document.createElement("div");
  calcResultSummaryInd.classList.add("calculator_result_summary_items");
  //title
  const title_abbrev = document.createElement("h5");
  title_abbrev.innerHTML = el.abbrev;
  //responses
  let responseEach = document.createElement("div");
  responseEach.classList.add("responseEach");
  submitButton.addEventListener("click", () => {
    el.answers = el.listOfOptions[el.response[0]]
    responseEach.innerHTML = el.answers;
    console.log(el.response);
  });
  ////responseEach.innerHTML = el.response[0]
  ////console.log(el.response)
  //console.log(el.response)
  //add children to the parent
  calcResultSummaryInd.append(title_abbrev);
  calcResultSummaryInd.append(responseEach);
  calcResultSummary.append(calcResultSummaryInd);
});


/**
 * think about how user can share the information (email?pdf?)
 */

//3 Create a block for suggestions 
const calcResultSuggest = document.createElement("div");
calcResultSuggest.classList.add("calculator_result_suggestions");


//final
calcResultContainer.append(calcResultSummary);
calcResultContainer.append(calcResultSuggest);
calcResultContainer.append(calcResultSuggest);

