"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
       searchResults = searchByMultipleTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
      let family = people.filter(function(el){
        if(el.parents == person.id || el.currentSpouse == person.id || el.parents == person.parents){
            return true;
        
        }else{
            return false;
      }
      })
      displayPeople(family);
     break;
    case "descendants":
      let children = people.filter(function(el){
          if(el.parents == person.id){
              return true;
         }else{
            return false;
      }
     })
      displayPeople(children);
     break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}
function searchBySingleTrait(people){

  let traitType = promptFor("Search by trait: Gender, D.O.B(MM/DD/YYYY), Height, Weight, Eye Color, Occupation", chars).toLowerCase();
  let traitArray = []
  let inputGender = prompt("Please enter 'Male' or 'Female': " );

    switch(traitType){
      case "gender":
        traitArray = people.filter(function(el){
          if(el.gender == inputGender){
            return true;
          }
        });
        return traitArray;
      case "dob":
        let inputDob = prompt("Please enter 'Date of birth' MM/DD/YYYY: ");
         traitArray = people.filter(function(el){
          if(el.dob == inputDob){
            return true;
          }          
        });
        //return traitArray
      case "height":
        let inputHeight = prompt("Please enter 'height': ");
        let heightTraitArray = people.filter(function(el){
          if(el.height == inputHeight){
            return true;
          }
        });
        return heightTraitArray;
      case "weight":
        let inputWeight = prompt("Please enter 'weight': ");  
        let weightTraitArray= people.filter(function(el){
          if(el.weight == parseInt(inputWeight)){
            return true;
          }
        });
        return weightTraitArray;
      case "eye color":
        let inputColor = prompt("Please eenter 'eye color': ");
        let colorTraitArray = people.filter(function(el){
          if (el.eyeColor == inputColor) {
            return true;
          }
        });
        return colorTraitArray;
      case "occupation":
        let inputOccupation = prompt( "Please enter 'occupation': ");
        let occupationTraitArray = people.filter(function(el){
          if (el.occupation == inputOccupation) {
            return true;
          }
        });
        return occupationTraitArray;
      default:
          alert("Please enter a valid response.")
         searchBySingleTrait(people);
         break;
    }     
}
function searchByMultipleTraits(people){
  let gender = promptFor("Please enter 'gender', type 'n/a' to skip: ", chars);
  let dob = promptFor("Please enter 'Date of birth',  MM/DD/YYYY, type 'n/a' to skip: ", chars);
  let height = promptFor("Please enter 'height', type 'n/a' to skip: ", chars);
  let weight = promptFor("Please enter 'weight': ", chars);
  let eyeColor = promptFor("Please enter 'eye color': ",chars);
  let occupation = promptFor("Please enter 'occupation': ")

  let peopleSearch = people;
  peopleSearch = people.filter(function(el){
    if(gender == "n/a"){
      return peopleSearch;
    }else if(el.gender == gender){
      return el;
    }  
  });
  peopleSearch = people.filter(function(el){
    if(dob == "n/a"){
      return peopleSearch;
    }else if(el.dob == dob){
      return el;
    }  
  });
  peopleSearch = people.filter(function(el){
    if(height == "n/a"){
      return peopleSearch;
    }else if(el.height == height){
      return el;
    }  
  });
  peopleSearch = people.filter(function(el){
    if(weight == "n/a"){
      return peopleSearch;
    }else if(el.weight == weight){
      return el;
    }  
  });
  peopleSearch = people.filter(function(el){
    if(eyeColor == "n/a"){
      return peopleSearch;
    }else if(el.eyeColor == eyeColor){
      return el;
    }  
  });
  peopleSearch = people.filter(function(el){
    if(occupation == "n/a"){
      return peopleSearch;
    }else if(el.occupation == occupation){
      return el;
    }  
  });
  return peopleSearch[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + new Date(person.dob) + "n"; // Possible correlation with date of birth? new Date(person.dob) or something
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";

     // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
