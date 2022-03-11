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
    return <T extends { new(...args: any[]): { name: string } }>(origConstructor: T) => {
        console.warn('Hello from "decorator" withTemplate decorator');
        // create a new class on-the-fly and extend the constructor that was passed in
        // extending this constructor ensures we can keep all the set-up of the this original constuctot
        return class extends origConstructor {
            constructor(..._: any[]) {
                // This calls the constructor of the origConstructor
                super();
                console.warn("Hello from the new class");
                // Insert the template into a target element in the DOM
                const targetElem = document.getElementById(hookId);
                if (targetElem) {
                    targetElem.innerHTML = template;
                    // interact with the element (template) that was inserted in the previous line
                    targetElem.querySelector('h1')!.textContent = this.name;
                }
            }
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

// -------------------------------------------------------------------------------------------------------

// This is an example of a Property Decorator
// In classes you can have two different types of properties: static or "instance" properties
// - Static properties are defined with a preceding 'static' keyword
// - Instance properties are the normal properties on the class instance (without the static-keyword)
// Property decorator paramaters:
// 'target' - for an instance property it will be the prototype of the property,
//            if it is a static property target will refer to the construtor function
//            It is typed as 'any' as TSC won't know if we intend to use this decorator on an instance-
//            or a static-property
// 'propertyName' - Self explanatory
const PropertyLogger = (target: any, propertyName: string | Symbol) => {
    console.warn('Hello from "decorator" Property decorator');
    console.log("target:", target);
    console.log("propertyName:", propertyName);
}

// This is an example of an accessor decorator - will be decorating either a getter or a setter method
// Accessor Decoratos arguments:
// 'target` - The same description as for the Property Decorator (above)
// 'name' - This will hold the name of the accessor method
// 'descriptor` - The PropertyDescriptor (a type that comes with TS)
const AccessorDecorator = (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.warn('Hello from "decorator" Accessor Decorator')
    console.log("target:", target);
    console.log("name:", name);
    console.log("descriptor:", descriptor);
}

// This is an example of a Method Decorator - will be used to decorate class methods
// Method decorator arguments:
// 'target` - The same description as for the Property Decorator (above)
// 'name' - This will hold the name of the method
// 'descriptor` - The PropertyDescriptor (a type that comes with TS)
const MethodDecorator = (target: any, name: string, descriptor: PropertyDescriptor) => {
    console.warn('Hello from "decorator" Method Decorator')
    console.log("target:", target);
    console.log("name:", name);
    console.log("descriptor:", descriptor);
}

// This is an example of a Parameter Decorator - this will be used to decorate method parameters
// Parameter decorator arguments
// 'target` - The same description as for the Property Decorator (above)
// 'name' - The name of the method of which this parameter is an argument (so not the parameter name)
// 'position' - The position (index, zero-based) of the argument in the arguments list of the method
const ParameterDecorator = (target: any, name: string, position: number) => {
    console.warn('Hello from "decorator" Parameter Decorator')
    console.log("target:", target);
    console.log("name:", name);
    console.log("position:", position);
}

// This class was created to demonstrate property decorators, accessor decorators and method decorators
class Product {
    @PropertyLogger
    title: string;
    @PropertyLogger
    static foobar: string;
    private _price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    // accessors are special methods that can be used to safely set and get private class properties
    // setter (accessor method)
    @AccessorDecorator
    set price(@ParameterDecorator val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    // basic class method
    @MethodDecorator
    getPriceWithTax(@ParameterDecorator tax: number) {
        return this._price * (1 + tax);
    }
}

const product1 = new Product('product1', 10);
const product2 = new Product('product2', 20);


// -------------------------------------------------------------------------------------------------------

const AutoBind = (_: any, _1: string, descriptor: PropertyDescriptor) => {
    console.log("descriptor: ", descriptor);
    const origMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        // So in our new descriptor we set a getter instead of trying to override the function contained "value"
        // Getters also set the value of the PropertyDescriptor (when you implement) the decorator JS will know
        //   to use the getter, because there won't be (and cannot be) a value and getter on a PropertyDescriptor
        // at the same time.
        // The reason a getter was picked is because it has the correct context for the this-keyword (the class the
        // method being decorated) belongs to.
        // Now this gives uf the opprtunity to bind the this as before end return the adjusted function as the value
        get() {
            const boundFn = origMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

class Printer {
    message = 'This works';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }

    // Just a thing to note: If you use an arrow function, there is no need for an autobind decorator.
    // Arrow function handle the this keyword in the correct way that the traditional functions don't.
    // This is, in fact, one of the main problems arrow-functions were introduced to solve.
    // showMessage = () => {
    //     console.log("two:", this.message);
    // }
}

const printer = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);