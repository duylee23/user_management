import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/userServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import { toast } from 'react-toastify';
import ModalConfirm from './ModalConfirm';

const TableUsers = () => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowdedModalAddNew, setIsShowedModalAddNew] = useState(false)
    const [isShowdedModalEdit, setIsShowedModalEdit] = useState(false)
    const [isShowedModalConfirm, setIsShowedModalConfirm] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if(res && res.data){
          setListUsers(res.data)
          setTotalUsers(res.total)
          setTotalPages(res.total_pages)
        } 
    }

    const handlePageClick = (event) => {
      getUsers(+event.selected + 1)
    } 

    const handleClose = () => {
      setIsShowedModalAddNew(false)
      setIsShowedModalEdit(false)
      setIsShowedModalConfirm(false)
    }

    const handleUpdateTable = (user) => {
      setListUsers([user,...listUsers])
    }

    const handleEditUser = (user) => {  
      setDataUserEdit(user)
      setIsShowedModalEdit(true)
    }

    const handleDeleteUser = (user) => {
      setIsShowedModalConfirm(true)
      setDataUserDelete(user)
    }

    const handleEditUserFromModal = (editedUser) => {
      let index = listUsers.findIndex(item => item.id === editedUser.id)
      if( index !== -1) {
        let updatedListUsers = [...listUsers]
        updatedListUsers[index] = {...updatedListUsers[index], first_name: `${editedUser.first_name}`}
        setListUsers(updatedListUsers)
        toast.success('Editing user successfully!')
      } else{ 
        toast.error('Something wrong!')
      }
    }

    const handleDeleteUserFromModal = (deletedUser) => {
      let updatedListUsers = listUsers.filter((item) => item.id  !== +deletedUser.id)
      setListUsers(updatedListUsers)
      toast.success('Delete user successfully!')
    }


    return (    
    <>
        <div className='my-3 d-flex justify-content-between align-items-center'>
          <span>LIST USERS:</span>
          <button className='btn btn-success' onClick={() => setIsShowedModalAddNew(true)}>Add new user</button>
        </div>
        <Table bordered hover>
          <thead>
            <tr>
              
              <th>id</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                return(
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>
                        <img src={item.avatar}/>
                    </td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td> 
                      <div className='d-flex justify-content-center'>
                        <button type="button" class="btn btn-primary mx-2" onClick={() => handleEditUser(item)}>EDIT</button>
                        <button type="button" class="btn btn-danger" onClick = {() => handleDeleteUser(item)}>DELETE</button>
                      </div>
                    </td>
                  </tr>
                )      
            })}
          </tbody>
        
        </Table>
        <div className='w-100'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={totalUsers}
          pageCount={totalPages}
          previousLabel="< previous"

          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
        />
          <ModalAddNew
            show={isShowdedModalAddNew}
            handleClose={handleClose}
            handleUpdateTable = {handleUpdateTable}
          />
          <ModalEdit
            show = {isShowdedModalEdit}
            handleClose={handleClose}
            dataUserEdit = {dataUserEdit}
            handleEditUserFromModal = {handleEditUserFromModal}
          />
          <ModalConfirm
            show = {isShowedModalConfirm}
            handleClose={handleClose}
            dataUserDelete = {dataUserDelete}
            handleDeleteUserFromModal = {handleDeleteUserFromModal}
          />
        </div>
    </>
      );
}

export default TableUsers
