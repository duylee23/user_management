import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/userServices';
import {toast} from 'react-toastify'
const ModalConfirm = (props) => {

    const  {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props
    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if(res && +res.statusCode === 204) {
            handleDeleteUserFromModal(dataUserDelete)
        } else{
            toast.error('Something wrong happened!')
        }
        handleClose();
    }
  return (
    <div>
      <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm deleting user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div>
                        {dataUserDelete && `Are you sure to delete user ${dataUserDelete.first_name}?`}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ confirmDelete}>
                        Delete anyway
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    </div>
  )
}

export default ModalConfirm
