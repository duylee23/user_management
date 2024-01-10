import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { putUpdateUser } from '../services/userServices';
import { toast } from 'react-toastify';


const ModalEdit = (props) => {

    const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    
    useEffect(() => {
        if(show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    const handleEditUser =  async () => {
        let res = await putUpdateUser(name, job)
        if(res) {
            //success
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
        }
        handleClose()
    }
      
    
    




   

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <form>
                            <div class="mb-3">
                                <label className="form-label">User's name</label>
                                <input  type="text"
                                        value={name}
                                        className="form-control"
                                        onChange = {(event) => setName(event.target.value)}
                                 />
                        
                            </div>
                            <div class="mb-3">
                                <label class="form-label">User's job</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                   
                                    onChange = {(event) => setJob(event.target.value)}
                                />
                            </div>  
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEdit
