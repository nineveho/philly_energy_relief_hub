//cmd shift L == select all
//text ${object in js} `


//create calculator object and add title
const container = document.querySelector("#big_calculator_container");
const title = document.createElement("h1");

//Create object to hold all questions with uniform structure
// 1. title of question [one question also has a subtitle]
// 2. abbrev, question title for response page
// 3. list of options for the user to choose from
// 4. single or multiple choice?
// 5. response, as an index within listOfOptions
const calculatorQuestions = [
  {
    //nineveh note: we should change this to box to type in positive integer
    title: "How many people live in your household?",
    abbrev: "household size",
    listOfOptions: [1, 2, 3, 4, 5, 6, 7, "more"],
    questionType: "single",
    response: [],
  },
  {
    //nineveh note: we should change this to a dropdown, or maybe slider
    title: "What is your annual household income?",
    abbrev: "income",
    listOfOptions: [
      "less than $20,000",
      "$20-25,000",
      "$25-30,000",
      "$30-35,000",
      "$35-40,000",
      "$40-45,000",
      "$45-50,000",
      "$50-55,000",
      "$55-60,000",
      "$60-65,000",
      "$65-70,000",
      "$70-75,000",
      "$75-80,000",
      "$80-85,000",
      "$85-90,000",
      "greater than $90,000"
    ],
    questionType: "single",
    response: [],
  },
  {
    title: "Do you rent or own your home?",
    abbrev: "ownership",
    listOfOptions: [
      "Rent",
      "Own"
    ],
    questionType: "single",
    response: [],
  },
  {
    title: "What are your concerns?",
    subtitle: "Select all that apply.",
    abbrev: "concerns",
    listOfOptions: [
      "Direct Bill Payment",
      "Insulation",
      "Broken Heat or A/C",
      "General Home Repairs",
      "Solar Power Opportunities",
      "Other Resources",
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
  if(typeof el.subtitle == 'undefined') {
    questionTitle.innerHTML = '<h3>' + el.title + '</h3>';
  } else {
    questionTitle.innerHTML = '<h3>' + el.title + '</h3><br><h5>' + el.subtitle + '</h5>';
  }

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
    for (let i = 0; i < el.listOfOptions.length; i++) {
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
    for (let i = 0; i < el.listOfOptions.length; i++) {

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

// create a submit button!
const submitButton = document.createElement("button");
submitButton.innerHTML = "See Program Recommendations";
submitButton.classList.add("submit-button");
container.append(submitButton);

// similarly, create a back button -- will only be visible after submission
const backButton = document.createElement("button");
backButton.innerHTML = "go back";
backButton.classList.add("submit-button");
backButton.style.width = "10rem";

////.....DECIDING CALCULATOR OUTPUT.....////

//Create object to hold all programs with uniform structure
// - program full name
// - income thresholds by household size
// - concern areas pertinent to program
// - whether the program is available only to homeowners
const reliefPrograms = [
  {
    "name": 'Basic Systems Repair Program',
    "innerpage" : "basicsystems.html",
    "1": 44300,
    "2": 50600,
    "3": 56950,
    "4": 63250,
    "5": 68300,
    "6": 73400,
    "7": 78450,
    "8": 83500,
    "more": 5050,
    "tags":['Insulation', 'General Home Repairs'],
    "flagOwnersOnly": 1
  },
  {
    "name": 'LIHEAP',
    "innerpage":"liheap.html",
    //150 perfect federal poverty level
    "1": 20385,
    "2": 27465,
    "3": 34545,
    "4": 41625,
    "5": 48705,
    "6": 55785,
    "7": 62865,
    "8": 69945,
    "more": 7080,
    "tags":['Direct Bill Payment'],
    "flagOwnersOnly": 0
  },
  {
    "name": 'Heater Hotline',
    "innerpage":"heaterhotline.html",
    //150 percent federal poverty level
    "1": 20385,
    "2": 27465,
    "3": 34545,
    "4": 41625,
    "5": 48705,
    "6": 55785,
    "7": 62865,
    "8": 69945,
    "more": 7080,
    "tags":['Broken Heat or A/C'],
    "flagOwnersOnly": 1
  },
  {
    "name": 'Weatherization Assistance Program',
    "innerpage":"weatherization",
    //200 percent federal poverty level
    "1": 27180,
    "2": 36620,
    "3": 46060,
    "4": 55500,
    "5": 64940,
    "6": 74380,
    "7": 83820,
    "8": 93260,
    "more": 9440, //inferred based on above
    "tags":['Insulation', 'General Home Repairs'],
    "flagOwnersOnly": 1 //need to research this
  }
]

////.....CREATING THE RESPONSE TAB.....////

// render calculator results only upon click of "submit" button
submitButton.addEventListener("click", () => {

  // get the original calculator input and shrink it
  document.getElementById("big_calculator_container").classList.add("hidden")

  /**
   * 1. create a new grandparent div id="big_calculator_result" for result page --> done
   *      ---> move the div to a new page if needed
   * 2. create a parent A div with result
   * 3. create a parent B div with suggestions
   *
   * Final: add parents A B to grandparent's home
   */
  const calcResultContainer = document.querySelector("#big_calculator_result");
  calcResultContainer.classList.remove("hidden")

  // make the result container visible before populating contents
  calcResultContainer.style.opacity = 1
  window.scrollTo(0, 0);

  // //look here

  const calculatorTitle = document.createElement("h2")
  calculatorTitle.innerHTML = "Results:"
  const calculatorTitle2 = document.createElement("h2")
  calculatorTitle2.innerHTML = "Program Eligibility"
  calcResultContainer.append(calculatorTitle)
  calcResultContainer.append(calculatorTitle2)

  //get user's values from dropdowns
  calculatorQuestions.forEach((el) => {
    if(el.questionType == "single") {
      const proposedValue = document.getElementById(el.abbrev).value;
      el.response = [proposedValue]
    }
  });  
  
  //parameters we've gotten from the user's input
  const householdsize = calculatorQuestions[0].response[0]
  const homeowner = calculatorQuestions[2].response
  const interests = calculatorQuestions[3].response.map(x => calculatorQuestions[3].listOfOptions[x]) 

  // make annual income numeric at minimum of range
  dollar_position = calculatorQuestions[1].response[0].indexOf('$')
  const annualincome = Number(calculatorQuestions[1].response[0].substring(dollar_position + 1, dollar_position + 3) + "000")

  //QC print out those values
  console.log(householdsize)
  console.log(annualincome)
  console.log(interests)

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
  const calcResultSummaryTitle = document.createElement("h5");
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

  const calcProgramSummaryTitle = document.createElement("h5");
  calcProgramSummaryTitle.innerHTML = "Programs Suggested For You";

  calcResultSuggest.append(calcProgramSummaryTitle);

  //maintain a tally of the number of programs that the user has matched with
  countProgramMatches = 0

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
      if(homeowner == "Own" | prog.flagOwnersOnly == 0) {
        programFit.eligibility = 1
      }
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

      //add one to our tally of programs that the user matched with
      countProgramMatches++;

      //each program suggestion has a box
      const calcResultSuggestInd = document.createElement("div");
      calcResultSuggestInd.classList.add("calculator_result_suggestions_items");
      
      //format program suggestion text
      let responseEach = document.createElement("div");
      responseEach.classList.add("responseEach");
      //should do more formatting on this, like bolding program title
      //also need the block to link to the program page for this program
      responseEach.innerHTML = "<a href='" + prog.innerpage + "'>" + "Because you are interested in " + programFit.relevance.join(", ") + 
                                " and your household income is below $" + programFit.threshold + 
                                ", we believe " + prog.name + " could be a great fit for you.</a>";
      console.log(programFit.relevance)
      console.log("Because you are interested in " + programFit.relevance.join(", ") + 
      " and your household income for " + householdsize + 
      " people is below $" + programFit.threshold + 
      ", we believe " + prog.name + " could be a great fit for you.");
      
      //add children to the parent
      calcResultSuggestInd.append(responseEach);
      calcResultSuggest.append(calcResultSuggestInd);
    }

  });

  if(countProgramMatches == 0) {

    //if user didn't match with any programs, still want to have some language come up
    let responseEmpty = document.createElement("div");
    responseEmpty.classList.add("responseEach");
    // need the block to link to the program pages
    responseEmpty.innerHTML = "Based on the information you provided, it does not appear " + 
                              "that you are eligible for any of the programs we have in our " +
                              "<a href='program-resource.html'>program library</a>. As eligibility" +
                              " requirements may be flexible, we encourage you to review the programs" +
                              " and contact program providers for any programs you have interest in.";
    calcResultSuggest.append(responseEmpty)

  } 

  //finally add all elements to parent
  calcResultContainer.append(calcResultSummary);
  calcResultContainer.append(calcResultSuggest);

  // add the back button, make sure it's centered in the grid
  backButton.style.gridColumnStart = 1;
  backButton.style.gridColumnEnd = 3;
  backButton.style.placeSelf = "center";
  calcResultContainer.append(backButton);

})

// upon click on back button, return to calculator input to allow edits
backButton.addEventListener("click", () => {

  // toss the old calculator results and collapse container
  while (big_calculator_result.firstChild) {
    big_calculator_result.removeChild(big_calculator_result.firstChild);
  }
  const calcResultContainer = document.getElementById("big_calculator_result")
  calcResultContainer.classList.add("hidden")
  calcResultContainer.style.opacity = 0
  
  //re-display the original calculator input and toss the old results
  document.getElementById("big_calculator_container").classList.remove("hidden")

  // make the input container visible 
  window.scrollTo(0, 0);

})