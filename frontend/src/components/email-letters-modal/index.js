import EmailLettersModal from './email-letters-modal';
import connect from './email-letters-modal.container';
const ConnectedEmailLettersModal = connect(EmailLettersModal);
export {
  EmailLettersModal,
  ConnectedEmailLettersModal,
};
