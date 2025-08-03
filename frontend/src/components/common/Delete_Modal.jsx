import React from 'react';

import { Modal } from './Modal';

export const Delete_Modal = ({ item_name, on_confirm, on_cancel }) =>
{
    return (
        <Modal on_close={on_cancel}>
            <article className="content">
                <header className="content-header">
                    <h1>Confirm Deletion</h1>
                </header>
                <div className="content-body">
                    <p>Are you sure you want to permanently delete the following item?</p>
                    <h3>"{item_name}"</h3>
                    <p>This action cannot be undone.</p>
                </div>
                <footer className="content-footer form-actions">
                    <button onClick={on_confirm} className="button danger">Yes, Delete</button>
                    <button onClick={on_cancel} className="button secondary">Cancel</button>
                </footer>
            </article>
        </Modal>
    );
};
