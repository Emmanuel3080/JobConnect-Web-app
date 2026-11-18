import React, { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

/**
 * Accessible Native <dialog> Modal styled in Warm Sand & Midnight Navy (#FFFCF6 / #14243A)
 */
const NativeModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = "max-w-xl",
  children,
}) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose?.();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const isOutsideDialog = (e, dialog) => {
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };

  const handlePointerDown = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    pressedOutsideRef.current = isOutsideDialog(e, dialog);
  };

  const handlePointerUp = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pressedOutsideRef.current && isOutsideDialog(e, dialog)) {
      dialog.close();
    }
    pressedOutsideRef.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...{ closedby: "any" }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`m-auto w-[calc(100%-2rem)] ${maxWidth} rounded-2xl bg-[#FFFCF6] border border-[#E5DED2] p-0 text-[#14243A] shadow-xl open:flex open:flex-col max-h-[90dvh]`}
    >
      <div className="px-6 py-4 border-b border-[#E5DED2] flex items-start justify-between gap-4 bg-[#F4F1EA] shrink-0">
        <div className="min-w-0">
          <h2 id={titleId} className="text-base font-bold text-[#14243A]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#526174] mt-0.5">{subtitle}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close modal"
          className="p-1.5 rounded-lg text-[#526174] hover:text-[#14243A] hover:bg-[#E5DED2]/50 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="p-6 scrollable-pane flex-1">{children}</div>
    </dialog>
  );
};

export default NativeModal;
