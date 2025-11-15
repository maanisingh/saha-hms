// import { Modal as BSModal } from 'react-bootstrap';
// import Button from './Button';

// export const Modal = ({
//   show,
//   onHide,
//   title,
//   children,
//   size = 'lg',
//   centered = true,
//   footer,
//   showCloseButton = true,
//   ...props
// }) => {
//   return (
//     <BSModal
//       show={show}
//       onHide={onHide}
//       size={size}
//       centered={centered}
//       backdrop="static"
//       {...props}
//     >
//       {title && (
//         <BSModal.Header closeButton={showCloseButton}>
//           <BSModal.Title>{title}</BSModal.Title>
//         </BSModal.Header>
//       )}
//       <BSModal.Body>{children}</BSModal.Body>
//       {footer && <BSModal.Footer>{footer}</BSModal.Footer>}
//     </BSModal>
//   );
// };

// export const ConfirmModal = ({
//   show,
//   onHide,
//   onConfirm,
//   title = 'Confirm Action',
//   message,
//   confirmText = 'Confirm',
//   cancelText = 'Cancel',
//   variant = 'danger',
//   loading = false,
// }) => {
//   return (
//     <Modal show={show} onHide={onHide} size="md" centered>
//       <BSModal.Header closeButton>
//         <BSModal.Title>{title}</BSModal.Title>
//       </BSModal.Header>
//       <BSModal.Body>{message}</BSModal.Body>
//       <BSModal.Footer>
//         <Button variant="secondary" onClick={onHide} disabled={loading}>
//           {cancelText}
//         </Button>
//         <Button variant={variant} onClick={onConfirm} loading={loading}>
//           {confirmText}
//         </Button>
//       </BSModal.Footer>
//     </Modal>
//   );
// };

// export default Modal;




import { Modal as BSModal } from "react-bootstrap";
import Button from "./Button";

/**
 * 🧩 Generic Reusable Modal
 */
export const Modal = ({
  show,
  onHide,
  title,
  children,
  size = "lg",
  centered = true,
  footer,
  showCloseButton = true,
  scrollable = true, // 👈 Added for mobile usability
  ...props
}) => {
  return (
    <BSModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop="static"
      scrollable={scrollable}
      className="rounded-3"
      {...props}
    >
      {title && (
        <BSModal.Header
          closeButton={showCloseButton}
          className="border-0 pb-0 px-4 pt-3"
        >
          <BSModal.Title className="fw-semibold">{title}</BSModal.Title>
        </BSModal.Header>
      )}

      <BSModal.Body className="px-4 py-3">{children}</BSModal.Body>

      {footer && (
        <BSModal.Footer className="border-0 pt-0 px-4 pb-3">
          {footer}
        </BSModal.Footer>
      )}
    </BSModal>
  );
};

/**
 * ⚠️ Confirm Modal — for Delete / Logout / Critical actions
 */
export const ConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) => {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <div className="text-center p-3">
        <h5 className="fw-bold mb-3">{title}</h5>
        <p className="text-muted mb-4">{message}</p>
      </div>

      <BSModal.Footer className="d-flex justify-content-center gap-2 border-0 pb-4">
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={loading}
          className="px-4"
        >
          {cancelText}
        </Button>
        <Button
          variant={variant}
          onClick={onConfirm}
          loading={loading}
          className="px-4"
        >
          {confirmText}
        </Button>
      </BSModal.Footer>
    </Modal>
  );
};

export default Modal;
