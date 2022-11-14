

//general structural goals:
//main thing: one array per program with income thresholds by house size
//also need some categories, or like tags: if someone is looking for solar
//then LIHEAP isn't relavant to them, etc.
//perhaps tags could be: heating, cooling, insulation, payment help, solar, home repairs

//parameters we've gotten from the user's input 
//needs to be responsive, hard-coded for testing
interests = ['heat', 'insulation'] //will have set options for user to select from
householdsize = 4 //integer input, slider, or dropdown? if type input, control input type from here, or elsewhere?
annualincome = 25000 //this needs to be a slider or a dropdown

//Basic Services Repair Program 
const bsrp = {
    "name": 'Basic Services Repair Program',
    "1": 44300,
    "2": 50600,
    "3": 56950,
    "4": 63250,
    "5": 68300,
    "6": 73400,
    "7": 78450,
    "8": 83500,
    "more": 5050,
    "tags":['insulation', 'general']
}

//LIHEAP, but also these cutoffs can be used for multiple programs...
const fedpovlvl_150 = {
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
    "tags":['payment']
}

//need it such that: if household size is greater
//than 8, do multiplier. What multiplier options
//should we offer? gets me thinking that both
//HHsize and Income should be sliding scales
//or dropdowns rather than selecting boxes
//can still select box for areas of interest
//maybe other thing to ask is what heating system they have?
//or like what could we do with that information
//actually, I think HHsize should be an input box that only accepts positive integers 

// funciton to evaluate program eligibility
function evaluateProgram(program_params) {

    // create array to store results
    const programFit = {
        "name":program_params.name,
        "eligibility": 0,
    }

    //***INCOME ELIGIBILITY CHECK***

    if(householdsize <= 8) {
        // if 8 or fewer people in the household, simple threshold
        programFit.threshold = program_params[householdsize]
    } else {
        // if 9 or more people in household, need a little math
        programFit.threshold <- program_params[8] + program_params[householdsize]*(householdsize - 8)
    }

    // toggle flag if the user meets criteria
    if(programFit.threshold >= annualincome) {
        programFit.eligibility = 1
    } 

    //***RELEVANCE CHECK***

    // return the overlapping keywords between program's tags
    // and user's interests
    programFit.relevance = new Array(
        program_params.tags.filter(x => interests.includes(x))
    )

    //return
    return(programFit)
}

// try out function on defined programs
bsrp_evaluated = evaluateProgram(bsrp)
console.log(bsrp_evaluated)
console.log(evaluateProgram(fedpovlvl_150))

//for each program should we have a sentence like this? obviously not actually console logged
if(bsrp_evaluated.eligibility == 1) {
    console.log("Because you are interested in " + bsrp_evaluated.relevance.join() + 
                " and your household income for " + householdsize + " people is below $" + 
                bsrp_evaluated.threshold + ", we believe " + 
                bsrp_evaluated.name + " could be a great fit for you.")
} else {
    console.log("Because your household income for " + householdsize + 
                " people exceeds $" + bsrp_evaluated.threshold +
                ", you likely do not qualify for " + bsrp_evaluated.name + ".")
}



