import { useEffect, useRef } from "react";

import '../styles/modal.scss'

const Modal = ({children, isOpen}) => {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) {
            return
        }

        if (isOpen) {
            ref.current.showModal();
        } else {
            ref.current.close();
        }
    }, [isOpen])

    return (
        <dialog ref={ref}>
            {children}
            <form method="dialog">
                <button className="btn btn-close btn-close-white" aria-label="Close"></button>
            </form>
        </dialog>
    );
}

export default Modal;