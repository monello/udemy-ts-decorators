# udemy-ts-decorators
The project code from the Udemy course. The section on decorators

# Code Progression notes

At the bottom of most commits you will find notes about the code changes made during that commit. I only did this for commits with code changes that progress from the provious commit, so README.md updates don't have notes or navigation.
I manually added page-navigation to the commits that show progress in the form of code-changes as applied by following the course.

Some commits deal with key learning points, these I will try to list below in the "Key Commits" section.

# Set-up
1. Clone the repo
2. Install Node.js if you haven't got it installed on your system yet.
3. In the Terminal run `npm install` in the root dir
4. Run `tsc init`
5. Run `npm start` (leave it running)
6. Open a new Terminal and run `tsc -w` (leave it running)

# Key Commits

Comment | Description | Commit Shortcut
| :--- | :--- | :---:
Initial Commit  | Listed here to be able to get to the first commit that starts the pagnation | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/8ce641d020a14bf46da2856df86e7f141b35a5c5)
Basic Decorator | Just a very basic decorator to illustrate the concept of decorators as simply as possible | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/fb94778c0ea192678831236dc54df580ad76702c)
Factory Decorator | This shows how to wrap a decorator inside a function that returns the decorator function (ie. create a decorator as a Factory function). Some of the MANY benefits of doing this is to pass in your own arguments or you can override class contructors and a lot more powerful oprions. | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/795bd93d1929d8bfb41f89676280e776a80608b6)
Factory Decorator with Arguments | This shows how you can add your custom arguments to a Factory decorator | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/6f1f2972b1c3bac01dba168474a9efda2b6f3e89)
More useful example | This shows a factory decorator with a more useful example, instead of just console.logs. This decorator adds a snippet of HTML to the page before any other code runs. (This is a VERY basic version of how AngularJS uses decorators | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/84a6323a2b9487d9ff79e7b6e2d36b07d839d778)
Accessing a class `constructor()` | This commit shows how powerful decorators can by  accessing the class `contructor()` of the class being decorated from within the decorator | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/0b8108067661d38b24858c4278290f84f9e10c58)
Order of Execution | In this commit investigates the order that decorators execute. Very interresting. | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/db5d1a18097255ebcee82f61c7756284ae52bb88)
Property Decorator | Here you can see how to define a Property decorator to decorate properties of a class and what arguments to expect | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/a16b3eed94a8fc75bc30f8d1c1145b74130bfdd8)
Accessor Decorator | Here you can see how to define an Accesssor decorator to decorate properties of accessor methods (getters and setters) and what arguments to expect | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/96620de616787d84068209ad64e7af8ed162589e)
Method Decorator | Very similar to accessor decorators. Use these to decorate class methods, again note the properties you can expect | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/d1162cf713d6280bae6f0ef22ce4884be9326e7b)
Parameter Decorator | Shows how you can decorate the parameters/arguments of class methods. | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/c14f45a9e5ae2bfd640f9d106fc1daa5971ec276)
When are decorators executed? | This commit investigates when and how many times decorators are executed | [:octocat:](https://github.com/monello/udemy-ts-decorators/commit/ef7a9846cc5664c54df123e70b9476549ef2369c)
