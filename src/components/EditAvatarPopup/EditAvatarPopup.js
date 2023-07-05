import { useRef } from "react";
import useFormValidator from "../../utils/useFormValidator";
import PopupWithForm from "../PopupWithForms/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const input = useRef();
  const { inputValues, inputErrors, isValid, isInputValid, handleChange, resetForm } = useFormValidator();

  function closePopup() {
    onClose();
    resetForm();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ linkAvatar: input.current.value }, resetForm);
  }

  return (
    <PopupWithForm name='update-avatar' title='Обновить аватар' textButton='Сохранить' isOpen={isOpen} onClose={closePopup} onSubmit={handleSubmit} isValid={isValid}>
      <input
        ref={input}
        id="link-avatar"
        type="url"
        placeholder="Введите ссылку на аватар"
        className={`popup__input popup__input_avatar_url ${isInputValid.linkAvatar === undefined || isInputValid.linkAvatar ? '' : 'popup__input_type_error'}`}
        name="linkAvatar"
        required
        onChange={handleChange}
        value={inputValues.linkAvatar ? inputValues.linkAvatar : ''}
      />
      <span
        id="link-avatar-error"
        className="popup__error popup__error_field_third"
      >{inputErrors.linkAvatar}</span>
    </PopupWithForm>
  )
}