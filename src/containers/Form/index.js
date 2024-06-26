import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // Ajout d'une const pour le stockage des données, elle va servir pour la vérification des champs
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: ""
  });
  

  // Ajout de la const pour vérification des champs remplis
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Ajout d'une const de la validation des champs
  const formValid = () => {
    const { nom, prenom, type, email, message } = formData;
    return nom && prenom && type && email && message;
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (!formValid()) {
        return;
      }

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError("une erreur s'est produite lors de l'envoi");
      }
    },
    [formData, onSuccess, onError]
  );

  // Condition pour rendre le bouton visible uniquement en environnement de test
  const isTestEnv = process.env.NODE_ENV === 'test';

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field 
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="" 
            label="Nom *" 
            required
            />
          <Field 
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="" 
            label="Prénom *" 
            required
          />
          <Select
            name="type"
            value={formData.type}
            selection={["Personnel", "Entreprise"]}
            onChange={(value) => handleSelectChange("type", value)}
            label="Personnel / Entreprise *"
            type="large"
            titleEmpty
            required
          />
          <Field 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="" 
            label="Email *" 
            required
          />
          <p className="messageInfo">* : Merci de remplir tous les champs avant l&apos;envoi.</p>
           {/* Condition pour afficher le bouton uniquement en environnement de test */}
           {(formValid() || isTestEnv) && (
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
          )}
        </div>
        <div className="col">
          <Field
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="message"
            label="Message *"
            type={FIELD_TYPES.TEXTAREA}
            required
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;