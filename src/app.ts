// Logger Decorator
// - Decorators get passed different arguments depending on where you use it
// - This will be a class decorator so it only receives 1 argument
// - The argument here is a pointer to the constructor function of the target-class (the class you are applying the decorator to)
const Logger = (constructor: Function) => {
    console.warn('Hello from Logger decorator');
    // Now that the argument is added to the function, we are now able to use this as a decorator
    console.log(constructor);
}

// A factory decorator return a function
// This allows us to pass in our own variables to the main decorator functiomn
const LoggerFactory = (logString: string) => {
    console.warn('Hello from "factory" Factory decorator');

    // - Decorators get passed different arguments depending on where you use it
    // - This will be a class decorator so it only receives 1 argument
    // - The argument here is a pointer to the constructor function of the target-class (the class you are applying the decorator to)
    return (constructor: Function) => {
        console.warn('Hello from "decorator" Factory decorator')
        console.log(logString);
        // Now that the argument is added to the function, we are now able to use this as a decorator
        console.log(constructor);
    }
}

// Another Factory Class Decorator, with a more useful example
const withTemplate = (template: string, hookId: string) => {
    console.warn('Hello from "factory" withTemplate decorator');

    // Here we had to change the argument type to any in order to use the "new" keyword below
    // TS does not know that the Function being passed is a valid constructor function, so we need to go very wide
    //  on our typing here and set it to any
    return (constructor: any) => {
        console.warn('Hello from "decorator" withTemplate decorator');

        // Insert the template into a target element in the DOM
        const targetElem = document.getElementById(hookId);
        // Here we can instantiate (use the new-keyword) a person object from the constructor function
        const person = new constructor();
        if (targetElem) {
            targetElem.innerHTML = template;
            // interact with the element (template) that was inserted in the previous line
            targetElem.querySelector('h1')!.textContent = person.name;
        }
    }
}

// When you add the function in this way TS will know that you mean to use it as a decorator and apply the proper syntax checks
// - @Logger: Plain Decorator
// - @LoggerFactory: A constructor-decorator. It has to be executed, so add the parenthesis here
@Logger
@LoggerFactory('Logging the Person Object')
@withTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = "Morne";

    constructor() {
        console.log('Creating person object...');
    }
}

const pers = new Person();

console.log(pers);
