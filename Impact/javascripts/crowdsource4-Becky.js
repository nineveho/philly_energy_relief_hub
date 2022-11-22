//cmd shift L == select all
//text ${object in js} `


//create calculator object and add title
const container = document.querySelector("#big_calculator_container");
const title = document.createElement("h1");

//Create object to hold all questions with uniform structure
// 1. title of question
// 2. abbrev, question title for response page
// 3. number of options
// 4. list of options for the user to choose from
// 5. single or multiple choice?
// 6. response, as an index within listOfOptions
const calculatorQuestions = [
  {
    //nineveh note: we should change this to box to type in positive integer
    title: "How many people live in your household?",
    abbrev: "household size",
    numberOfOptions: 8,
    listOfOptions: [1, 2, 3, 4, 5, 6, 7, "more"],
    questionType: "single",
    response: [],
  },
  {
    //nineveh note: we should change this to a dropdown, or maybe slider
    title: "What is your annual household income?",
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
    //one additional element here: numeric range equivalent
    rangeMin: [
      10000,
      20000,
      30000,
      40000,
      50000,
      60000,
      70000,
      80000
    ],
    questionType: "single",
    response: [],
  },
  {
    title: "Do you rent or own your home?",
    abbrev: "ownership",
    numberOfOptions: 2,
    listOfOptions: [
      "Rent",
      "Own"
    ],
    questionType: "single",
    response: [],
  },
  {
    title: "What are your concerns?",
    abbrev: "concerns",
    numberOfOptions: 6,
    listOfOptions: [
      "Direct Bill Payment",
      "Insulation",
      "Broken Heat or A/C",
      "General Home Repairs",
      "Solar Power Opportunities",
      "Other",
    ],
    questionType: "multiple",
    response: [],
  }
];

// create the calculator input view and buttons within
calculatorQuestions.forEach((el, index) => {
  // Grand Parent: create original container that is the parent to specific question
  const calculatorContainer = document.createElement("div");
  calculatorContainer.classList.add("calculator_question_container");

  // Parent A: create the title, i.e. state the question
  const questionTitle = document.createElement("h3");
  questionTitle.innerHTML = el.title;

  /** this is called doc string
   * Add all of the other elements here below
   */

  // Parent B - Parent: create parent container of choices
  const choicesContainer = document.createElement("div");

  // Childrens of Parent B - iterative
  if(el.questionType == "single") {

    // add dropdown element
    const choices = document.createElement("select");
    choices.id = el.abbrev;
    choices.classList.add("choices_normal");

    // populate dropdown with options
    for (let i = 0; i < el.numberOfOptions; i++) {
      // create dropdown for single choice questions
      if (el.questionType == "single") {
        var option = document.createElement("option");
        option.value = el.listOfOptions[i];
        option.text = option.value;
        choices.appendChild(option)
      }
    }

    // nest dropdown in the parent container of choices
    choicesContainer.append(choices);

  // create little select boxes for multi choice questions
  } else if (el.questionType == "multiple") {

    choicesContainer.classList.add("calculator_choices_container");

    //loop over options for this question
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
  }

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


////.....DECIDING CALCULATOR OUTPUT.....////

//Create object to hold all programs with uniform structure
// - program full name
// - income thresholds by household size
// - concern areas pertinent to program
const reliefPrograms = [
  {
    "name": 'Basic Systems Repair Program',
    "1": 44300,
    "2": 50600,
    "3": 56950,
    "4": 63250,
    "5": 68300,
    "6": 73400,
    "7": 78450,
    "8": 83500,
    "more": 5050,
    "tags":['Insulation', 'General Home Repairs']
  },
  {
    "name": 'LIHEAP',
    "1": 20385,
    "2": 27465,
    "3": 34545,
    "4": 41625,
    "5": 48705,
    "6": 55785,
    "7": 62865,
    "8": 69945,
    "more": 7080,
    "tags":['Direct Bill Payment']
  }
]

////.....CREATING THE RESPONSE TAB.....////
//nineveh note of to do after meeting with niko:
// - add a "back" button
// - use CSS classes efficiently to allow flexibility of presentation
// - need to translate string to numeric for income range
// - left align text for "What are your concerns", idk why it's not doing that...


// render calculator results only upon click of "submit" button
submitButton.addEventListener("click", () => {

  // get the original calculator input and shrink it
  document.getElementById("big_calculator_container").classList.add("hidden_input")

  // make the result container visible before populating contents
  const resultContainer = document.getElementById("big_calculator_result")
  resultContainer.style.opacity = 1
  window.scrollTo(0, 0);

  //get user's values from dropdowns
  calculatorQuestions.forEach((el) => {
    if(el.questionType == "single") {
      const proposedValue = document.getElementById(el.abbrev).value;
      el.response = [proposedValue]
    }
  });  
  
  //parameters we've gotten from the user's input
  const householdsize = calculatorQuestions[0].response[0]
  const annualincome = calculatorQuestions[1].response[0] //nineveh note: need to make this numeric
  const interests = calculatorQuestions[3].response 

  //QC print out those values
  console.log(householdsize)
  console.log(annualincome)
  console.log(interests)

  /**
   * 1. create a new grandparent div id="big_calculator_result" for result page --> done
   *      ---> move the div to a new page if needed
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
  const calcResultSummaryTitle = document.createElement("h4");
  calcResultSummaryTitle.innerHTML = "Your Responses";

  calcResultSummary.append(calcResultSummaryTitle);

  calculatorQuestions.forEach((el) => {
    //each response has a div
    const calcResultSummaryInd = document.createElement("div");
    calcResultSummaryInd.classList.add("calculator_result_summary_items");
    //title
    const title_abbrev = document.createElement("h5");
    title_abbrev.innerHTML = el.abbrev;
    //responses
    let responseEach = document.createElement("div");
    responseEach.classList.add("responseEach");

    //need to make sure multiple choice shows all objects
    if (el.questionType == "single") {
      responseEach.innerHTML = el.response;
    } else {
      responseEach.innerHTML = el.response.map(x => el.listOfOptions[x]).join(', ')
    }
      
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

  // flesh out suggestions: function to evaluate program eligibility
  // and populate suggestions on calculator results page
  reliefPrograms.forEach((prog) => {
    
    // create array to store results
    const programFit = {
      "eligibility": 0,
    }

    //***INCOME ELIGIBILITY CHECK***
    if(householdsize <= 8) {
      // if 8 or fewer people in the household, simple threshold
      programFit.threshold = prog[householdsize]
    } else {
      // if 9 or more people in household, need a little math
      programFit.threshold = prog[8] + prog[householdsize]*(householdsize - 8)
    }

    // toggle flag if the user meets criteria
    if(programFit.threshold >= annualincome) {
      programFit.eligibility = 1
    } 

    //***RELEVANCE CHECK***
    // return the overlapping keywords between program's tags
    // and user's interests
    programFit.relevance = new Array(
      prog.tags.filter(x => interests.includes(x))
    )

    //***PRESENT SUGGESTION***
    // only populate on results page if user is eligible based on income
    if(programFit.eligibility != 0) {

      //each program suggestion has a box
      const calcResultSuggestInd = document.createElement("div");
      calcResultSuggestInd.classList.add("calculator_result_suggestions_items");
      
      //format program suggestion text
      let responseEach = document.createElement("div");
      responseEach.classList.add("responseEach");
      //should do more formatting on this, like bolding program title
      //also need the block to link to the program page for this program
      responseEach.innerHTML = "Because you are interested in " + programFit.relevance.join(", ") + 
                                " and your household income is below $" + programFit.threshold + 
                                ", we believe " + prog.name + " could be a great fit for you.";

      console.log("Because you are interested in " + programFit.relevance.join(", ") + 
      " and your household income for " + householdsize + 
      " people is below $" + programFit.threshold + 
      ", we believe " + prog.name + " could be a great fit for you.");
      
      //add children to the parent
      calcResultSuggestInd.append(responseEach);
      calcResultSuggest.append(calcResultSuggestInd);
    }

  });

  //final
  calcResultContainer.append(calcResultSummary);
  calcResultContainer.append(calcResultSuggest);
  calcResultContainer.append(calcResultSuggest);

})



 




