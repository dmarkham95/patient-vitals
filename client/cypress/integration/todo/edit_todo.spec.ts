context("Edit Todo", () => {
	it("can edit todo", () => {
		cy.seedAndVisit();

		cy.get("#todo_table_list tbody tr", { timeout: 5000 })
			.first()
			.find("[aria-label=Edit]")
			.click();

		cy.get("#todo_input")
			.type("Input Edit Testing")
			.should("have.value", "Input Edit Testing");

		cy.get("#save_todo")
			.should("exist")
			.click();

		cy.get("#todo_table_list tbody tr", { timeout: 5000 })
			.first()
			.find("[id=title-cell-1]")
			.click();

		cy.get("#todo_table_list tbody tr").should("have.length", 10);
	});
});
