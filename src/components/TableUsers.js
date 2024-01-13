import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/userServices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEdit from './ModalEdit';
import { toast } from 'react-toastify';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import _ from 'lodash';
import { debounce } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';
const TableUsers = () => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowdedModalAddNew, setIsShowedModalAddNew] = useState(false)
    const [isShowdedModalEdit, setIsShowedModalEdit] = useState(false)
    const [isShowedModalConfirm, setIsShowedModalConfirm] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [sortBy, setSortBy] = useState('asc')
    const [sortField, setSortField] = useState('id')
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

    const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy)
      setSortField(sortField)
      let cloneListUsers = [...listUsers]
      cloneListUsers =_.orderBy(cloneListUsers, [sortField], [sortBy])
      setListUsers(cloneListUsers)
    }

    const handleSearch = debounce((event) => {
      let keyword = event.target.value
      console.log(keyword)
      if(keyword){
        let cloneListUsers = [...listUsers]
        cloneListUsers = cloneListUsers.filter(item => item.email.includes(keyword))
        setListUsers(cloneListUsers)
      } else {
        getUsers(1)
      }
    }, 300)

    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    return (    
    <>
        <div className='my-3 d-flex justify-content-between align-items-center'>
          <span>LIST USERS:</span>
          <div className='d-flex justify-content-around w-50'>
            <button className='btn btn-warning'>
              <i class="fa-solid fa-file-import px-2"></i>
              <span>Import user file</span>
            </button>
            <CSVLink data={csvData}  
                      filename={"users.csv"}
                      className="btn btn-primary">
                          <i class="fa-solid fa-file-arrow-down px-2"></i>
                          <span>Export user file</span>
            </CSVLink>

            <button className='btn btn-success add-button' onClick={() => setIsShowedModalAddNew(true)}>
              <i className="fa-solid fa-circle-plus"></i>
                <span> Add new</span>
            </button>
          </div>
          
        </div>
        <div className='search-container'>
            <input  className='form-control' 
                    placeholder='Search user by email' 
                    onChange={(event) => handleSearch(event)}
            />
        </div>
        
        <Table bordered hover>
          <thead>
            <tr>
              
              <th>
                <div className='id-container'>
                  <span>ID</span>
                  <div className="header-sort-icons">
                    <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "id")}></i>
                    <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "id")}></i>
                  </div>
                </div>
              </th>
              <th>Avatar</th>
              <th>
                <div className='id-container'>
                  <span>First name</span>
                  <div className="header-sort-icons">
                    <i className="fa-solid fa-arrow-up" onClick={() => handleSort("asc", "first_name")}></i>
                    <i className="fa-solid fa-arrow-down" onClick={() => handleSort("desc", "first_name")}></i>
                  </div>
                </div>
              </th>
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
                        <button type="button" className="btn btn-primary mx-2" onClick={() => handleEditUser(item)}>EDIT</button>
                        <button type="button" className="btn btn-danger" onClick = {() => handleDeleteUser(item)}>DELETE</button>
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
