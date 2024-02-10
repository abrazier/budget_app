import Sidebar from '../components/Sidebar'
import React, { useState, useEffect } from 'react'
import api from '..//api'


const App = () => {
    const [ categories, setCategories ] = useState([]);
    const [ formaData, setFormData ] = useState({
        category: '',
    });

    const fetchCategories = async () => {
        const response = await api.get('/budget_categories/');
        setCategories(response.data)
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formaData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/budget_categories/', formaData);
        fetchCategories();
        setFormData({
            category: '',
        });
    };

    return (
        <>
    <div>
        <div class="d-flex" id="wrapper">
            <Sidebar />
            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
                {/* <!-- Page content--> */}
                <div class="container-fluid">
                    <div className='container'>
                        <form onSubmit={handleFormSubmit}>

                            <div className='mb-3 mt-3'>
                                <label htmlFor='category' className='form-label'>
                                    Category
                                </label>
                                <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={FormData.category} />
                            </div>


                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>

                        </form>

                        <table className='table table-striped table-bordered table-hover mt-3'>
                        <thead>
                            <tr>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.category}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default App;