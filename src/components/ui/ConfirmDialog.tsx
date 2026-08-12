interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isConfirming?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export function ConfirmDialog({
    isOpen,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    isConfirming = false,
    onConfirm,
    onCancel,
  }: ConfirmDialogProps) {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div
        className="dialog-backdrop"
        role="presentation"
        onMouseDown={onCancel}
      >
        <div
          className="confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          <h2 id="confirm-dialog-title">
            {title}
          </h2>
  
          <p id="confirm-dialog-description">
            {description}
          </p>
  
          <div className="confirm-dialog-actions">
            <button
              type="button"
              disabled={isConfirming}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
  
            <button
              type="button"
              className="danger-button"
              disabled={isConfirming}
              onClick={onConfirm}
            >
              {isConfirming
                ? 'Deleting...'
                : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }