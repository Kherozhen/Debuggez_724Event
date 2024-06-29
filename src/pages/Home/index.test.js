import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is rendered", () => {
  it("displays the form fields", async () => {
    render(<Home />);
    
    await screen.findByLabelText("Nom *");
    await screen.findByLabelText("Prénom *");
    await screen.findByLabelText("Personnel / Entreprise *");
    await screen.findByLabelText("Email *");

  });

  describe("and a click is triggered on the submit button", () => {
    it("displays the success message on successful form submission", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Home onSuccess={onSuccess} onError={onError} />);
      
      // Remplir les champs fields de façon fictive 
      fireEvent.change(screen.getByLabelText("Nom *"), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText("Prénom *"), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText("Email *"), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText("Message *"), { target: { value: 'Hello there!' } });

      // Trouver tous les éléments avec le même data-testid
      const collapseButtons = screen.queryAllByTestId("collapse-button-testid");

      // Sélectionner le deuxième élément trouvé (index 1 car les index commencent à 0)
      const collapseButton = collapseButtons[1];

      // Vérifier que l'élément a bien été trouvé
      expect(collapseButton).toBeInTheDocument();
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
      const submitButton = screen.getByText('Envoyer');
      fireEvent.click(submitButton);

      // Attendre que la modale s'ouvre avec le message de succès
      await waitFor(() => {
        const modalMessage = screen.getByText('Message envoyé !');
        expect(modalMessage).toBeInTheDocument();
      });
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  })
  it("a list a people is displayed", () => {
    // to implement
  })
  it("a footer is displayed", () => {
    // to implement
  })
  it("an event card, with the last event, is displayed", () => {
    // to implement
  })
});
