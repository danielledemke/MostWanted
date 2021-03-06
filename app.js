"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function start(people){
  document.getElementById("search").innerHTML = app(people);
}

function app(people){
 
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo ).toLowerCase();
  var searchResults;
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      searchResults = prompt("Would you like to search by single trait or multiple traits? Enter 'single' or 'multiple'");
      if(traitSearch == "single"){
        searchResults = searchBySingleTrait(people);
        
      }else if(traitSearch == "multiple"){
        searchResults = searchByMultipleTraits(people);
        
      }else{
        app(people);
      }

      break;
      default:
       alert("Invaled input, please try again! ");
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
     displayOption = displayPerson(person);
    break;
    case "family":
     displayOption = searchForFamily(person, people);
     //displayOption = displayFamily(person, people);
   
     break;
    case "descendants":
     displayOption = searchForDescendants(person, people);  
     //displayOption = displayDescendants(person, people);    
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
  });
  // TODO: find the person using the name they entered
  return foundPerson[0];
}

function searchForDescendants(person, people){
  let children = people.filter(function(el){
    if(el.parents == person.id){
        return true;
   }else{
      return false;
}
})
displayPeople(children);
//need to use a default parameter array and use recursion to keep adding to the array
}

function searchForFamily(person, people){
  let family = people.filter(function(el){
    if(el.parents == person.id  ){
        return true;
    
    }
    else if( el.currentSpouse == person.id){

    }
    else if(el.parents == person.parents){
      
    }
    else{
        return false;
    }
  });
  displayPeople(family);
}

// function displayFamily(person, people){
//       let familyInfo = "";
//       for( let i = 0; i, people.length; i++)
//       {
//         if (person.parents.includes(people[i].Id))
//          {
//           if(people[i].gender === "male")
//           {
//              familyInfo += "Father: " + people[i].firstName + " " + people[i].lastName + "\n";
//           }
//           else if(people[i].gender === "female")
//           {
//              familyInfo +=  "Mother: " + people[i].firstName + " " + people[i].lastName + "\n";
//           }

//             if (person.parents === people[i].parents && person.id !== people[i].Id) 
//             {
//               if(people[i].gender === "male")
//               {
//                 familyInfo += "Brother: " + people[i].firstName + " " + people[i].lastName + "\n";
//               } 
//               else if(people[i].gender === "female")
//               {
//                 familyInfo +=  "Sister: " + people[i].firstName + " " + people[i].lastName + "\n";
//               }
//             }  
//            if (person.parents.includes(people[i].Id))             
//             {
//                if(people[i].gender === "male")
//              {
//                 familyInfo += "Son: " + people[i].firstName + " " + people[i].lastName + "\n";
//                }
//                else familyInfo += "Daughter: " + people[i].firstName + " " + people[i].lastName + "\n";
//               }  
//               if(person.currentSpouse == people[i].Id)
//               {
//                 familyInfo += "Spouse: " + people[i].firstName + " " + people[i].lastName + "\n";
//               }
//             }
            

//       }
//          alert(familyInfo);  
//}

function displayDesendants(person, people){
   let familyInfo = "";
   let descendantsDisplay = [];
  for(let i = 0; i < people[i].length; i++){
    if(people.parents.includes(person.id)){
      descendantsDisplay = descendantsDisplay.push(people[i]);
      displayDescendants(people[i]);
    }
  }
  displayDescendants.toString();
  console.log(descendantsDisplay);
  alert(descendantsDisplay);
  
}

function searchBySingleTrait(people){

  let traitType = promptFor("Search by trait: Gender, D.O.B(MM/DD/YYYY), Height, Weight, Eye Color, Occupation", chars).toLowerCase();
  let traitArray = []
    switch(traitType){
      case "gender":
        let inputGender = prompt("Please enter 'Male' or 'Female': " );
        traitArray = people.filter(function(el){
          if(el.gender == inputGender){
            return true;
          }
        });
        return traitArray[0];
      case "dob":
        let inputDob = prompt("Please enter 'Date of birth' MM/DD/YYYY: ");
         traitArray = people.filter(function(el){
          if(el.dob == inputDob){
            return true;
          }          
        });
        return traitArray[0];
      case "height":
        let inputHeight = prompt("Please enter 'height': ");
        let heightTraitArray = people.filter(function(el){
          if(el.height == inputHeight){
            return true;
          }
        });
        return heightTraitArray[0];
      case "weight":
        let inputWeight = prompt("Please enter 'weight': ");  
        let weightTraitArray= people.filter(function(el){
          if(el.weight == parseInt(inputWeight)){
            return true;
          }
        });
        return weightTraitArray[0];
      case "eye color":
        let inputColor = prompt("Please enter 'eye color': ");
        let colorTraitArray = people.filter(function(el){
          if (el.eyeColor == inputColor) {
            return true;
          }
        });
        return colorTraitArray[0];
      case "occupation":
        let inputOccupation = prompt( "Please enter 'occupation': ");
        let occupationTraitArray = people.filter(function(el){
          if (el.occupation == inputOccupation) {
            return true;
          }
        });
        return occupationTraitArray[0];
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
  let weight = promptFor("Please enter 'weight', type 'n/a' to skip: ", chars);
  let eyeColor = promptFor("Please enter 'eye color', type 'n/a' to skip: ",chars);
  let occupation = promptFor("Please enter 'occupation', type 'n/a' to skip: ", chars)

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
// function searchChoice(people){
//   let searchResults = promptFor("Search by single or multiple traits? Enter 'single' or 'multiple' :")
//   let Chosen;
//   switch (searchResults){
//     case 'single':
//       searchResults = searchBySingleTrait(people);
//       break;
//     case 'multiple':
//       searchResults = searchByMultipleTraits(people)
//        break;
//   }
// }return searchResults;


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
  personInfo += "Age: " + new Date(person.dob) + "\n"; // Possible correlation with date of birth? new Date(person.dob) or something
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";

     // TODO: finish getting the rest of the information to display
  alert(personInfo);
  return mainMenu(person, people);
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
