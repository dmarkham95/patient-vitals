// add new command to the existing Cypress interface
declare global {
	namespace Cypress {
		type Greeting = {
			greeting: string;
			name: string;
		};

		interface Chainable {
			/**
			 * Yields "foo"
			 *
			 * @returns {typeof foo}
			 * @memberof Chainable
			 * @example
			 *    cy.foo().then(f = ...) // f is "foo"
			 */
			foo: typeof foo;
			foo2: typeof foo2;
			seedAndVisit: typeof seedAndVisit;
			/**
		 * Yields sum of the arguments.
		 *
		 * @memberof Cypress.Chainable
		 *
		 * @example
		  ```
		  cy.sum(2, 3).should('equal', 5)
		  ```
		 */
			sum: (a: number, b: number) => Chainable<number>;

			/**
		 * Example command that passes an object of arguments.
		 * @memberof Cypress.Chainable
		 * @example
		 ```
		  cy.greeting({ greeting: 'Hello', name: 'Friend' })
		  // or use defaults
		  cy.greeting()
		 ```
		 */
			greeting: (options?: Greeting) => void;
		}
	}
}

export function seedAndVisit() {
	cy.fixture("todos").then(data => {
		cy.server();
		cy.route("GET", "https://jsonplaceholder.typicode.com/todos", data);
		cy.visit("http://localhost:3000/todo");
	});
}

/**
 * An example function "foo()"
 *
 * @returns {string} "foo"
 * @example
 *    foo() // "foo"
 */
export function foo() {
	return "foo";
}

/**
 * Uses another custom command `cy.foo()` internally.
 *
 * @returns {string} "foo"
 * @example cy.foo() // "foo"
 */
export function foo2() {
	return cy.foo();
}

/**
 * Adds two numbers
 * @example sum(2, 3) // 5
 */
export function sum(a: number, b: number): number {
	return a + b;
}

const defaultGreeting: Cypress.Greeting = {
	greeting: "hi",
	name: "there",
};

/**
 * Prints a custom greeting.
 * @example printToConsole({ greeting: 'hello', name: 'world' })
 */
export const printToConsole = (options = defaultGreeting) => {
	const { greeting, name } = options;
	console.log(`${greeting}, ${name}`);
};

Cypress.Commands.add("seedAndVisit", seedAndVisit);
Cypress.Commands.add("foo", foo);
Cypress.Commands.add("foo2", foo2);
Cypress.Commands.add("sum", sum);
Cypress.Commands.add("greeting", printToConsole);
