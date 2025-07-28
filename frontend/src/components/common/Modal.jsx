import React from 'react';

export const Modal = ({ children, on_close }) =>
{
    return (
        <div className="modal-backdrop" onClick={on_close}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={on_close}>&times;</button>
                {children}
            </div>
        </div>
    );
};
