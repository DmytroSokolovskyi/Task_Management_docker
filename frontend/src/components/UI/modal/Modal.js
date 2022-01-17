import cl from "./Modal.module.scss";

export default function Modal ({active, setActive, children}) {
    return (
        <div
            className={active ? cl.modalActive : cl.modal}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? cl.modalContentActive : cl.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
