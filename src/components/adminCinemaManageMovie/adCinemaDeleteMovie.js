import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AdminCinemaDeleteMovie = (props) => {
    const { show, handleClose, dataMovieDelete, handleMovieDelete } = props

    // Checking if dataMovieDelete and dataMovieDelete.movie are available before rendering
    if (!dataMovieDelete || !dataMovieDelete.movie) {
        return null; // or you could return a loader or some placeholder content
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Show Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataMovieDelete.movie.name}</b>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleMovieDelete(dataMovieDelete)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AdminCinemaDeleteMovie