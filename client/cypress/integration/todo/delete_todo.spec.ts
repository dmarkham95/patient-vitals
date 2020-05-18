context("Delete Todo", () => {
	it("can delete todo", () => {
		cy.seedAndVisit();

		cy.get("#todo_table_list tbody tr", { timeout: 5000 })
			.first()
			.find("[aria-label=Delete]")
			.click();

		cy.get("#todo_table_list tbody tr").should("have.length", 9);
	});
});
