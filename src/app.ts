// Logger Decorator
// - Decorators get passed different arguments depending on where you use it
// - This will be a class decorator so it only receives 1 argument
// - The argument here is a pointer to the constructor function of the target-class (the class you are applying the decorator to)
const Logger = (constructor: Function) => {
    console.log('Logging...');
    // Now that the argument is added to the function, we are now able to use this as a decorator
    console.log(constructor);
}

// When you add the function in this way TS will know that you mean to use it as a decorator and apply the proper syntax checks
@Logger
class Person {
    name = "Morne";

    constructor() {
        console.log('Creating person object...');
    }
}

const pers = new Person();

console.log(pers);
