context("Add Todo", () => {
	it("can add todo", () => {
		cy.seedAndVisit();
		cy.get("#add_btn", { timeout: 5000 }).click();

		cy.get("#todo_input")
			.type("Input Testing")
			.should("have.value", "Input Testing");

		cy.get("#save_todo")
			.should("exist")
			.click();

		cy.get("#todo_table_list tbody tr").should(
			"contain.text",
			"Input Testing"
		);

		cy.get("#todo_table_list tbody tr").should("have.length", 11);
	});
});
