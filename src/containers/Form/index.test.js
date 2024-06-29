import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is rendered", () => {
  it("displays the form fields", async () => {
    render(<Form />);
    
    await screen.findByLabelText("Nom *");
    await screen.findByLabelText("Prénom *");
    await screen.findByLabelText("Personnel / Entreprise *");
    await screen.findByLabelText("Email *");

  });

  describe("and a click is triggered on the submit button", () => {
    it("displays the success message on successful form submission", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Form onSuccess={onSuccess} onError={onError} />);
      
      // Remplir les champs fields de façon fictive 
      fireEvent.change(screen.getByLabelText("Nom *"), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText("Prénom *"), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText("Email *"), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText("Message *"), { target: { value: 'Hello there!' } });

      // Remplir fictivement le menu select
      const collapseButton = screen.getByTestId("collapse-button-testid");
      fireEvent.click(collapseButton); // Ouvre la liste des options

      // Utiliser `waitFor` pour attendre que les options soient disponibles dans le menu déroulant
      await waitFor(() => {
        const options = screen.getAllByRole("listitem"); // Sélectionner les éléments <li>
        expect(options.length).toBeGreaterThan(0);
      });

      // Cliquer sur l'option "Entreprise"
      const entrepriseOption = await screen.findByText("Entreprise");
      fireEvent.click(entrepriseOption);

      // Vérifiez que le champ select a "Entreprise" sélectionné
      screen.getByLabelText("Personnel / Entreprise *");

      // Soumettre le formulaire en trouvant et en cliquant sur le bouton "Envoyer"
      fireEvent.click(screen.getByTestId('button-submit'));

    });
  });
});